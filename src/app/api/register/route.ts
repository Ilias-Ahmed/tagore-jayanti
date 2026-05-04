import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

/** Send registration to Google Sheets */
async function sendToGoogleSheets(entry: Record<string, string>): Promise<{ success: boolean; error?: string }> {
  if (!GOOGLE_SCRIPT_URL) {
    return { success: false, error: "Google Sheets is not configured." };
  }

  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });

    // Google Apps Script redirects (302) on success, so follow it
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return { success: data.success ?? true };
    } catch {
      // If response isn't JSON but status is OK, treat as success
      return { success: res.ok };
    }
  } catch (err) {
    console.error("Google Sheets POST error:", err);
    return { success: false, error: "Failed to connect to Google Sheets." };
  }
}

/** Fetch count from Google Sheets */
async function getGoogleSheetsCount(): Promise<number> {
  if (!GOOGLE_SCRIPT_URL) return 0;

  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "GET",
      cache: "no-store",
    });
    const text = await res.text();
    const data = JSON.parse(text);
    return data.count ?? 0;
  } catch (err) {
    console.error("Google Sheets GET error:", err);
    return 0;
  }
}

export async function GET() {
  const count = await getGoogleSheetsCount();
  return NextResponse.json({ count });
}

export async function POST(request: NextRequest) {
  // Parse body
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, class: classLevel, section, rollNo, activity } = body;

  // Validation
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
  }

  const classNum = parseInt(classLevel, 10);
  if (isNaN(classNum) || classNum < 1 || classNum > 9) {
    return NextResponse.json({ error: "Class must be between 1 and 9." }, { status: 400 });
  }

  if (!section || typeof section !== "string" || !section.trim()) {
    return NextResponse.json({ error: "Section is required." }, { status: 400 });
  }

  if (!rollNo || typeof rollNo !== "string" || !rollNo.trim()) {
    return NextResponse.json({ error: "Roll number is required." }, { status: 400 });
  }

  const validActivities = ["poetry", "art", "writing"];
  if (!activity || !validActivities.includes(activity)) {
    return NextResponse.json({ error: "Please select a valid activity." }, { status: 400 });
  }

  const entry = {
    name: name.trim(),
    class: String(classNum),
    section: section.trim().toUpperCase(),
    rollNo: rollNo.trim(),
    activity,
    timestamp: new Date().toISOString(),
  };

  // Send to Google Sheets
  const result = await sendToGoogleSheets(entry);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Failed to save registration." },
      { status: 500 }
    );
  }

  // Fetch updated count
  const count = await getGoogleSheetsCount();

  return NextResponse.json({ success: true, count });
}
