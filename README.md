# Stamena4Life GitHub Pages Site

Static GitHub Pages rebuild for `stamena4life.com`.

## What is included

- Professional single-page redesign with sections for mission, about, H.O.P. Lane, programs, resources, media, testimonies, support, and contact.
- Preserved core live-site links for Square, Google Forms, PDFs, Spotify/Podcasters, YouTube, booking, and donation flows.
- A `/member/` page for subscriber-only PDF resources.
- A `member-backend/` Cloudflare Worker starter for Square webhooks, subscriber login, KV sessions, and R2-protected downloads.
- Local logo and core image assets under `assets/`.
- Required footer disclaimer.
- Legacy path redirects for `/aboutus`, `/hop`, `/resources`, `/booking`, `/pmc`, `/donate`, `/plans-pricing`, and `/members`.

## Deploy

1. Push this folder to a GitHub repository.
2. In GitHub, open **Settings > Pages**.
3. Set source to the `main` branch and `/ (root)`.
4. Leave **Custom domain** empty if you want to preview at the default project URL.
5. Visit `https://YOUR-GITHUB-USERNAME.github.io/stamena4life-pages/`.

To attach `stamena4life.com` later, add the custom domain back in GitHub Pages settings and configure DNS at that time.

## Member Resources

The public site now sends these PDF resources to `/member/` instead of linking directly to the files:

- Core Fear Test
- Communication Styles
- H.O.P. Lane Resource
- Book Sneak Peek

The H.O.P. Lane promo video remains public. To make the PDFs truly subscriber-only, upload them to the private Cloudflare R2 bucket described in `member-backend/README.md`; do not commit the protected PDFs into this GitHub Pages repo.

After deploying the Cloudflare Worker, update `member/index.html`:

```js
window.S4L_MEMBER_CONFIG = {
  apiBase: "https://s4l-member-api.YOUR-SUBDOMAIN.workers.dev",
  subscribeUrl: "https://square.link/u/YOUR_SUBSCRIPTION_LINK"
};
```

## Content Notes

The site copy and outbound links were rebuilt from the live Stamena4Life pages captured on June 24, 2026. Some event dates on the current live site were already dated by then, so the new site labels those as current listed details and asks visitors to confirm availability before promoting live dates.
