# Google Apps Script Setup Guide

This guide will help you set up Google Apps Script to collect form submissions from Zynva into a Google Sheet.

## Step 1 — Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Add headers in **Row 1**:
   ```
   Timestamp | Name | Email | Clinic | Role | Size | Pain Type | Pain Level | Tools | Rant
   ```
4. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/THIS_PART_HERE/edit
   ```
   The ID is the part between `/d/` and `/edit`

## Step 2 — Create Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click **"New project"** (or **"Blank project"**)
3. In the code editor, delete the default `myFunction()` code
4. Open the file `google-apps-script.js` from this project
5. Copy the entire contents and paste it into the Google Apps Script editor
6. Replace `YOUR_SPREADSHEET_ID` with the actual Spreadsheet ID you copied in Step 1
7. Click **"Save"** (💾 icon) and give your project a name like "Zynva API"

## Step 3 — Deploy as Web App

1. Click **"Deploy"** → **"New deployment"** (top right)
2. Click the **gear icon ⚙️** next to "Select type"
3. Choose **"Web app"**
4. Configure the deployment:
   - **Description**: `Zynva Pain Points API`
   - **Execute as**: `Me` (your email)
   - **Who has access**: **`Anyone`** ← **IMPORTANT!** This allows your Next.js app to POST to it
5. Click **"Deploy"**
6. **Authorize the script** when prompted:
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to [Project Name] (unsafe)" (if shown)
   - Click "Allow"
7. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfy.../exec
   ```

## Step 4 — Configure Next.js App

1. Create a `.env.local` file in the root of this project (if it doesn't exist)
2. Add your Web App URL:
   ```bash
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Restart your Next.js dev server:
   ```bash
   npm run dev
   ```

## Step 5 — Test It

1. Fill out the form on your Zynva app
2. Submit the form
3. Check your Google Sheet — you should see a new row with the submitted data!

## Troubleshooting

### Form submits but data doesn't appear in Sheet
- Check that the Spreadsheet ID is correct in the script
- Make sure the sheet headers match exactly (Row 1)
- Check the Google Apps Script execution log: **Executions** → View logs

### CORS errors in browser console
- This is normal! Google Apps Script requires `no-cors` mode, which means we can't read the response
- The data is still being sent successfully

### "Who has access" must be "Anyone"
- If you set it to "Only myself", the Next.js app won't be able to POST to it
- You'll need to redeploy with "Anyone" access

## Updating the Script

If you need to update the script:
1. Make changes in the Google Apps Script editor
2. Click **"Deploy"** → **"Manage deployments"**
3. Click the **pencil icon ✏️** next to your deployment
4. Click **"New version"**
5. Click **"Deploy"**
6. The URL stays the same — no need to update `.env.local`

---

**That's it!** Your Zynva form is now connected to Google Sheets. ✦
