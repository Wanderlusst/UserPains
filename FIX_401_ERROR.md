# Fix 401 Unauthorized Error

The **401 Unauthorized** error means your Google Apps Script deployment doesn't have the correct permissions.

## Quick Fix (5 minutes)

### Step 1: Redeploy with Correct Permissions

1. Go to [script.google.com](https://script.google.com)
2. Open your **Zynva API** project
3. Click **Deploy** → **Manage deployments**
4. Click the **pencil icon ✏️** next to your deployment
5. Click **New version**
6. **IMPORTANT:** Under "Who has access", select **"Anyone"** (NOT "Only myself")
7. Click **Deploy**
8. **Authorize** if prompted:
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to [Project Name] (unsafe)" if shown
   - Click "Allow"

### Step 2: Verify the URL

Make sure your `.env.local` uses the `/exec` URL (not `/dev`):
```bash
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbzOrW0Yn_HI3J6C1sxRx_Ru7imjh_mUBhFhaxABi1A/exec
```

### Step 3: Test

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Submit the form
3. Check your Google Sheet - data should appear!

## Why This Happens

- **"Only myself"** = Only you can access it (causes 401 for external requests)
- **"Anyone"** = Anyone with the URL can access it (required for your Next.js app)

## Still Getting 401?

1. **Check the deployment status:**
   - Deploy → Manage deployments
   - Status should be "Active"
   - "Who has access" must be "Anyone"

2. **Check the script code:**
   - Make sure `google-apps-script.js` is pasted correctly
   - Verify the Spreadsheet ID matches your sheet

3. **Check browser console:**
   - Look for any CORS errors (these are normal with `no-cors` mode)
   - The 401 should disappear after redeploying with "Anyone" access

---

**The fix is simple: Redeploy with "Anyone" access!** ✦
