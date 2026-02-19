# Environment Variables Setup

## Local Development

Create a `.env.local` file in the root directory with the following:

```bash
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
# OR (for backwards compatibility)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with your actual Google Apps Script Web App URL.

**Note:** After creating or updating `.env.local`, restart your Next.js dev server:
```bash
npm run dev
```

## Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add a new variable:
   - **Name:** `GOOGLE_SCRIPT_URL`
   - **Value:** `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
   - **Environment:** Production, Preview, Development (select all)
4. Redeploy your application

**Important:** Use `GOOGLE_SCRIPT_URL` (server-side only) instead of `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` for better security. The API route will work with either, but server-side variables are preferred.

See `GOOGLE_APPS_SCRIPT_SETUP.md` for complete setup instructions.
