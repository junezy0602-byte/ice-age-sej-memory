const SPREADSHEET_ID = "1YiW9oSyXsHIT_v_VbAkGkQNtzd8E2QddacP_EDaJR-Y";
const SHEET_NAME = "Submissions";
const HEADERS = [
  "Submitted At",
  "Student Name",
  "Score",
  "Stars",
  "Best Combo",
  "Treasure Pattern",
  "Treasure Bonus",
  "Learning Note",
  "Correct Answers",
  "Wrong Answers",
  "Accuracy",
  "Missed Topics",
  "Missed Questions",
  "Practice Advice",
  "Parent Report",
  "Page URL",
  "Game Completed At"
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getSubmissionSheet_();
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    sheet.appendRow([
      new Date(),
      cleanText(data.studentName, 80),
      toNumber(data.score),
      toNumber(data.stars),
      toNumber(data.bestCombo),
      cleanText(data.treasurePattern, 80),
      toNumber(data.treasureBonus),
      cleanText(data.learningNote, 500),
      toNumber(data.correctAnswers),
      toNumber(data.wrongAnswers),
      cleanText(data.accuracy, 20),
      cleanText(data.missedTopics, 1000),
      cleanMultiline(data.missedQuestions, 2500),
      cleanText(data.practiceAdvice, 1000),
      cleanMultiline(data.parentReport, 5000),
      cleanText(data.pageUrl, 500),
      cleanText(data.completedAt, 80)
    ]);

    return jsonOutput({ ok: true });
  } catch (error) {
    return jsonOutput({ ok: false, error: String(error) });
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
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  ensureHeaders_(sheet);

  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  } else {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight("bold")
    .setBackground("#e8f8ff");
  sheet.autoResizeColumns(1, HEADERS.length);
}

function cleanText(value, maxLength) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanMultiline(value, maxLength) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function jsonOutput(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
