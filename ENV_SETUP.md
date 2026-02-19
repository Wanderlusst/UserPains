# Environment Variables Setup

Create a `.env.local` file in the root directory with the following:

```bash
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with your actual Google Apps Script Web App URL.

**Note:** After creating or updating `.env.local`, restart your Next.js dev server:
```bash
npm run dev
```

See `GOOGLE_APPS_SCRIPT_SETUP.md` for complete setup instructions.
