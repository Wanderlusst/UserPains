# SEO Setup Guide

This project includes comprehensive SEO optimization. Here's what's been implemented:

## ✅ What's Included

### 1. Meta Tags
- Title tags with template support
- Meta descriptions
- Keywords
- Author and publisher information
- Canonical URLs
- Format detection settings

### 2. Open Graph Tags
- og:type, og:title, og:description
- og:image (needs to be created)
- og:url, og:site_name
- og:locale

### 3. Twitter Card Tags
- Card type: summary_large_image
- Title, description, images
- Creator handle

### 4. JSON-LD Structured Data
- **Organization** schema
- **WebApplication** schema
- **FAQPage** schema
- **BreadcrumbList** schema

### 5. Technical SEO
- robots.txt file
- XML sitemap (auto-generated)
- Proper HTML lang attribute
- Semantic HTML structure

## 📝 Configuration Needed

### 1. Update Site URL

Add to `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

For local development, it defaults to `http://localhost:3000`.

### 2. Create OG Image

Create an Open Graph image at `/public/og-image.png`:
- Size: 1200x630 pixels
- Format: PNG or JPG
- Should include: Zynva logo, tagline, and branding

### 3. Update Contact Information

In `app/json-ld.tsx`, update:
- Email: `hello@zynva.com` → your actual email
- Social media links (when available)
- Logo URL

### 4. Add Verification Codes

In `app/layout.tsx`, uncomment and add:
- Google Search Console verification
- Yandex verification (if needed)
- Other verification codes

### 5. Update Social Media

In `app/layout.tsx`:
- Twitter creator: `@zynva` → your actual handle
- Add social media URLs in `json-ld.tsx`

## 🔍 Testing SEO

### 1. Google Rich Results Test
https://search.google.com/test/rich-results

Paste your URL to test structured data.

### 2. Facebook Sharing Debugger
https://developers.facebook.com/tools/debug/

Test Open Graph tags.

### 3. Twitter Card Validator
https://cards-dev.twitter.com/validator

Test Twitter Card tags.

### 4. Google Search Console
1. Add your property
2. Verify ownership
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

## 📊 SEO Checklist

- [x] Meta title and description
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] JSON-LD structured data
- [x] robots.txt
- [x] XML sitemap
- [ ] OG image created
- [ ] Site URL configured
- [ ] Contact info updated
- [ ] Social media links added
- [ ] Google Search Console verified
- [ ] Sitemap submitted

## 🚀 Next Steps

1. **Create OG image** (1200x630px)
2. **Set NEXT_PUBLIC_SITE_URL** in production
3. **Update contact information** in json-ld.tsx
4. **Submit sitemap** to Google Search Console
5. **Test all structured data** using validation tools

---

Your site is now optimized for search engines! ✦
