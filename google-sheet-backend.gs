const SHEET_NAME = "Submissions";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getSubmissionSheet_();
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    sheet.appendRow([
      new Date(),
      data.studentName || "",
      Number(data.score || 0),
      Number(data.stars || 0),
      Number(data.bestCombo || 0),
      data.treasurePattern || "",
      Number(data.treasureBonus || 0),
      data.learningNote || "",
      data.parentReport || "",
      data.pageUrl || "",
      data.completedAt || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput("Y4 SEJ Memory backend is ready.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function getSubmissionSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Submitted At",
      "Student Name",
      "Score",
      "Stars",
      "Best Combo",
      "Treasure Pattern",
      "Treasure Bonus",
      "Learning Note",
      "Parent Report",
      "Page URL",
      "Game Completed At"
    ]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}
