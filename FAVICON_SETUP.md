# Favicon Setup

The Zynva logo has been set up as the favicon and added to the page header.

## ✅ What's Been Added

1. **SVG Favicon** (`app/icon.svg`)
   - Next.js 13+ automatically uses this as the favicon
   - Works in modern browsers
   - Scalable vector format

2. **SVG Favicon** (`public/favicon.svg`)
   - Fallback for older browsers
   - Referenced in metadata

3. **Logo in Header**
   - Added to top-left of the page
   - Shows Zynva logo + text
   - Fixed position, always visible

4. **Metadata Icons**
   - Configured in `app/layout.tsx`
   - Includes Apple Touch Icon support

## 📝 For Production

### Convert SVG to ICO (Optional)

For better browser compatibility, convert the SVG to ICO format:

1. Use an online converter:
   - https://convertio.co/svg-ico/
   - https://www.icoconverter.com/
   - https://favicon.io/favicon-converter/

2. Or use ImageMagick:
   ```bash
   convert public/favicon.svg -resize 32x32 public/favicon.ico
   ```

3. Replace the placeholder `public/favicon.ico` file

### Apple Touch Icon

Next.js will automatically generate `apple-touch-icon.png` from `app/icon.svg` during build.

If you want a custom one:
- Size: 180x180 pixels
- Save as: `public/apple-touch-icon.png`

## 🎨 Current Setup

- ✅ Logo visible in browser tab (favicon)
- ✅ Logo visible in page header (top-left)
- ✅ Works in all modern browsers
- ✅ Responsive and scalable

---

Your favicon is ready! The logo will appear in browser tabs and the page header. ✦
