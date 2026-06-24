# Y4 SEJ Memory Google Sheet Backend

This game can send completed student results to a Google Sheet.

## Current Backend

- Google Sheet: https://docs.google.com/spreadsheets/d/1YiW9oSyXsHIT_v_VbAkGkQNtzd8E2QddacP_EDaJR-Y/edit
- Web App URL: https://script.google.com/macros/s/AKfycbwxjcYuLfB0NXYZedrlbPseRZUpm3qXLADXEm_Oj4lZaU6xEGi_RSYVTlsCE9hiyH_3yQ/exec
- Apps Script project: `Y4 Science Game Database`
- Data tab: `Submissions`

## Files

- `google-sheet-backend.gs` contains the Google Apps Script backend.
- `index.html` contains `GOOGLE_SHEET_WEB_APP_URL`. It is already connected to the deployed Web App URL.

## Google Sheet Setup

These steps have already been completed. Keep them here only for future reference if a new backend is needed.

1. Create a Google Sheet named `Y4 SEJ Ice Age Game Results`.
2. In the Sheet, open `Extensions > Apps Script`.
3. Paste the content from `google-sheet-backend.gs`.
4. Click `Deploy > New deployment`.
5. Choose type `Web app`.
6. Set:
   - Execute as: `Me`
   - Who has access: `Anyone`
7. Copy the Web App URL.
8. In `index.html`, replace the backend URL:
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
- correct answers
- wrong answers
- accuracy
- missed topics
- missed questions
- practice advice
- parent report
- page URL
- game completed time

If the backend URL is empty or submission fails, the game keeps a local backup in the browser and allows CSV download.
