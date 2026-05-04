/**
 * ============================================================
 * Google Apps Script — Tagore Jayanti Registration Backend
 * ============================================================
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to https://sheets.google.com and create a new spreadsheet
 *    - Name it: "Tagore Jayanti Registrations"
 *    - In Row 1, add these headers (exactly):
 *      A1: Timestamp
 *      B1: Name
 *      C1: Class
 *      D1: Section
 *      E1: Roll No
 *      F1: Activity
 * 
 * 2. Go to Extensions → Apps Script
 * 
 * 3. Delete any existing code in the editor
 * 
 * 4. Paste the doPost function below into the script editor
 * 
 * 5. Click "Deploy" → "New deployment"
 *    - Type: Web app
 *    - Description: "Tagore Jayanti Registration"
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click "Deploy"
 * 
 * 6. Authorize the script when prompted
 * 
 * 7. Copy the Web App URL (looks like: https://script.google.com/macros/s/AKf.../exec)
 * 
 * 8. Paste it in your project's .env.local file as:
 *    GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
 * 
 * ============================================================
 */

// ---- PASTE THIS INTO GOOGLE APPS SCRIPT EDITOR ----

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Map activity codes to readable names
    var activityMap = {
      "poetry": "Poetry Recitation",
      "art": "Art Drawing",
      "writing": "Decorative Poem Writing"
    };

    sheet.appendRow([
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.name,
      data.class,
      data.section,
      data.rollNo,
      activityMap[data.activity] || data.activity
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var count = Math.max(0, sheet.getLastRow() - 1); // minus header row
  return ContentService
    .createTextOutput(JSON.stringify({ count: count }))
    .setMimeType(ContentService.MimeType.JSON);
}
