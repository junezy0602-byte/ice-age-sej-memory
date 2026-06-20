# Y4 SEJ Memory Google Sheet Backend

This game can send completed student results to a Google Sheet.

## Files

- `google-sheet-backend.gs` contains the Google Apps Script backend.
- `index.html` contains `GOOGLE_SHEET_WEB_APP_URL`. Paste the deployed Web App URL there.

## Google Sheet Setup

1. Create a Google Sheet named `Y4 SEJ Ice Age Game Results`.
2. In the Sheet, open `Extensions > Apps Script`.
3. Paste the content from `google-sheet-backend.gs`.
4. Click `Deploy > New deployment`.
5. Choose type `Web app`.
6. Set:
   - Execute as: `Me`
   - Who has access: `Anyone`
7. Copy the Web App URL.
8. In `index.html`, replace:
   ```js
   const GOOGLE_SHEET_WEB_APP_URL = "";
   ```
   with:
   ```js
   const GOOGLE_SHEET_WEB_APP_URL = "YOUR_WEB_APP_URL";
   ```
9. Commit and push `index.html` again.

## Data Saved

The Sheet receives:

- submitted time
- student name
- score
- stars
- best combo
- treasure pattern
- treasure bonus
- learning note
- parent report
- page URL
- game completed time

If the backend URL is empty or submission fails, the game keeps a local backup in the browser and allows CSV download.
