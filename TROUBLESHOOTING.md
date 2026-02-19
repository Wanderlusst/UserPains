# Troubleshooting: Data Not Appearing in Google Sheet

If data isn't appearing in your Google Sheet, follow these steps:

## 1. Check Environment Variable

Make sure `.env.local` exists and has the correct URL:
```bash
cat .env.local
```

Should show:
```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**Important:** After creating/updating `.env.local`, you MUST restart the dev server:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

## 2. Verify Google Apps Script Deployment

1. Go to [script.google.com](https://script.google.com)
2. Open your project
3. Click **Deploy** → **Manage deployments**
4. Make sure:
   - Status is "Active"
   - "Who has access" is set to **"Anyone"** (not "Only myself")
   - The URL ends with `/exec` (not `/dev`)

## 3. Check Google Apps Script Logs

1. In Google Apps Script, click **Executions** (left sidebar)
2. Look for recent executions
3. Click on one to see logs
4. Check for any errors

## 4. Test the Script Directly

Test if your script works by visiting the GET endpoint:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Should return: `{"status":"Zynva API is live ✦"}`

## 5. Check Browser Console

1. Open your app in browser
2. Open Developer Tools (F12)
3. Go to Console tab
4. Submit the form
5. Look for:
   - `Submitting to: https://...`
   - `Data being sent: {...}`
   - `✅ Data submitted to Google Sheets`

If you see errors, note them down.

## 6. Verify Spreadsheet ID

Make sure the Spreadsheet ID in `google-apps-script.js` matches your actual sheet:
- Your sheet ID: `1Mlj76LTkciQXaN0dHRJRRO-4L3fhxbpH9wN-HY4dT3U`
- Check line 14 of `google-apps-script.js`

## 7. Check Sheet Headers

Your Google Sheet must have these exact headers in Row 1:
```
Timestamp | Name | Email | Clinic | Role | Size | Pain Type | Pain Level | Tools | Rant
```

## 8. Redeploy the Script

If you updated the script code:
1. In Google Apps Script, click **Deploy** → **Manage deployments**
2. Click the pencil icon ✏️
3. Click **New version**
4. Click **Deploy**

## 9. Common Issues

### Issue: 401 Unauthorized Error
**This is the most common issue!** See `FIX_401_ERROR.md` for detailed steps.

**Quick fix:** Redeploy your Google Apps Script with "Who has access" set to **"Anyone"** (not "Only myself")

### Issue: "Who has access" is "Only myself"
**Fix:** Redeploy with "Anyone" access

### Issue: Using `/dev` URL instead of `/exec`
**Fix:** Use the `/exec` URL for production

### Issue: Server not restarted after adding `.env.local`
**Fix:** Stop and restart `npm run dev`

### Issue: CORS errors in console
**Note:** This is normal with `no-cors` mode. The data is still being sent.

## 10. Manual Test

You can test the script manually using curl:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","clinic":"Test Clinic","q1":"Owner","q2":"Small","q3":"Scheduling","pain":5,"q5":"None","rant":"Test"}' \
  https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with your actual script ID.

---

If none of these work, check the Google Apps Script execution logs for detailed error messages.
