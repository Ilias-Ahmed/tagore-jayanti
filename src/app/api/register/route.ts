import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src", "data", "registrations.json");
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

interface Registration {
  name: string;
  class: string;
  section: string;
  rollNo: string;
  activity: string;
  timestamp: string;
}

function readRegistrations(): Registration[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeRegistrations(data: Registration[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

/** Send registration to Google Sheets (non-blocking) */
async function sendToGoogleSheets(entry: Registration): Promise<void> {
  if (!GOOGLE_SCRIPT_URL) return;

  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });

    if (!res.ok) {
      console.error("Google Sheets error:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Failed to send to Google Sheets:", err);
  }
}

/** Fetch count from Google Sheets */
async function getGoogleSheetsCount(): Promise<number | null> {
  if (!GOOGLE_SCRIPT_URL) return null;

  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, { next: { revalidate: 0 } });
    if (res.ok) {
      const data = await res.json();
      return data.count ?? null;
    }
  } catch (err) {
    console.error("Failed to fetch count from Google Sheets:", err);
  }
  return null;
}

export async function GET() {
  // Prefer Google Sheets count if connected, fallback to local JSON
  const sheetsCount = await getGoogleSheetsCount();
  if (sheetsCount !== null) {
    return NextResponse.json({ count: sheetsCount, source: "sheets" });
  }

  const registrations = readRegistrations();
  return NextResponse.json({ count: registrations.length, source: "local" });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, class: classLevel, section, rollNo, activity } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters." },
        { status: 400 }
      );
    }

    const classNum = parseInt(classLevel, 10);
    if (isNaN(classNum) || classNum < 1 || classNum > 9) {
      return NextResponse.json(
        { error: "Class must be between 1 and 9." },
        { status: 400 }
      );
    }

    if (!section || typeof section !== "string" || !section.trim()) {
      return NextResponse.json(
        { error: "Section is required." },
        { status: 400 }
      );
    }

    if (!rollNo || typeof rollNo !== "string" || !rollNo.trim()) {
      return NextResponse.json(
        { error: "Roll number is required." },
        { status: 400 }
      );
    }

    const validActivities = ["poetry", "art", "writing"];
    if (!activity || !validActivities.includes(activity)) {
      return NextResponse.json(
        { error: "Please select a valid activity." },
        { status: 400 }
      );
    }

    const newEntry: Registration = {
      name: name.trim(),
      class: String(classNum),
      section: section.trim().toUpperCase(),
      rollNo: rollNo.trim(),
      activity,
      timestamp: new Date().toISOString(),
    };

    // Save locally (always — acts as backup)
    const registrations = readRegistrations();
    registrations.push(newEntry);
    writeRegistrations(registrations);

    // Send to Google Sheets (if configured)
    await sendToGoogleSheets(newEntry);

    // Return count from Sheets if available, else local
    const sheetsCount = await getGoogleSheetsCount();
    const count = sheetsCount ?? registrations.length;

    return NextResponse.json({ success: true, count });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
