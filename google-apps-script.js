/**
 * Zynva Pain Points API - Google Apps Script
 * 
 * Instructions:
 * 1. Open https://script.google.com
 * 2. Create a new project
 * 3. Paste this entire file into the Code.gs editor
 * 4. Replace YOUR_SPREADSHEET_ID with your actual spreadsheet ID
 * 5. Deploy as Web App (see README for details)
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById("1Mlj76LTkciQXaN0dHRJRRO-4L3fhxbpH9wN-HY4dT3U").getActiveSheet();
    
    // Handle different data formats
    var data;
    if (e.postData && e.postData.contents) {
      // JSON sent directly with Content-Type: application/json
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      // Form-encoded data - may be URL-encoded, try to decode first
      try {
        var decodedData = decodeURIComponent(e.parameter.data);
        data = JSON.parse(decodedData);
      } catch (err) {
        // If decode fails, try parsing directly
        data = JSON.parse(e.parameter.data);
      }
    } else {
      // Direct parameters
      data = e.parameter || {};
    }

    // Log for debugging (check Executions tab in Apps Script)
    Logger.log('Received data: ' + JSON.stringify(data));

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.clinic || "",
      data.q1 || "",
      data.q2 || "",
      data.q3 || "",
      data.pain || "",
      data.q5 || "",
      data.rant || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Log error for debugging
    Logger.log('Error: ' + err.toString());
    Logger.log('Stack: ' + err.stack);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Zynva API is live ✦" }))
    .setMimeType(ContentService.MimeType.JSON);
}
