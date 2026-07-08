# Stamena4Life Wix Custom Elements

This folder gives you a Wix-friendly mirror of the GitHub Pages redesign using Wix Custom Elements.

It is **not** a full native Wix rebuild. The coded sections are edited in code, but you can place normal Wix tools between them.

This is **not** an iframe embed of the GitHub Pages site. The sections are registered web components using `customElements.define(...)`, which is Wix's non-iframe custom element route.

## Exact Mirror Use

If you want the Wix page to look as close as possible to the GitHub Pages site, use **one** custom element:

```text
s4l-full-site
```

That tag renders the full coded page: header, hero, mission/about, H.O.P. Lane, programs, resources, playable H.O.P. Lane promo video, member resource cards, book/podcast/3ABN cards, playable horizontal TV interview reel, testimonies with profile images, contact, footer, and disclaimer.

For the full-page mirror, use this source file:

```text
https://buddyjt.github.io/Stamena4Life/wix-custom-elements/s4l-exact-mirror.js
```

This is the closest non-iframe Wix option because Wix is loading the coded layout instead of asking Wix AI to reinterpret it.

## Modular Use

Use the coded sections as modular design blocks:

```text
Wix page
  Wix header/nav
  s4l-hero-section
  Wix donation / booking / button / strip
  s4l-mission-about-section
  Wix bookings or forms
  s4l-hop-programs-section
  Wix pricing plans / members area
  s4l-resources-media-section
  s4l-testimonials-section
  s4l-contact-footer-section
```

This lets you keep the upgraded look while still using Wix tools around the coded sections.

The TV interview area uses playable YouTube embeds in the same compact horizontal reel style as the GitHub Pages version.

## Files

- `s4l-wix-sections.js` - one shared JavaScript file that defines all the custom elements.
- `s4l-exact-mirror.js` - the preferred full-page Wix mirror loader. It loads the shared section file and defines `s4l-full-site`.
- `demo.html` - local browser preview of the elements.
- `demo-full.html` - local browser preview of the full-page mirror.

## Custom Element Tag Names

Use the same JavaScript source file for each custom element, but set a different tag name:

```text
s4l-full-site
s4l-hero-section
s4l-mission-about-section
s4l-hop-programs-section
s4l-resources-media-section
s4l-testimonials-section
s4l-contact-footer-section
s4l-member-portal-section
```

## How To Add One In Wix

1. Publish this GitHub Pages site so the JavaScript file has a public HTTPS URL.
2. In Wix, turn on Velo/Dev Mode if needed.
3. Add a **Custom Element**.
4. For the exact full-page mirror, set the source URL to:

```text
https://buddyjt.github.io/Stamena4Life/wix-custom-elements/s4l-exact-mirror.js
```

5. Set the tag name to:

```text
s4l-full-site
```

6. Stretch the element to the page width.
7. Set the element height in the Wix editor. Start around `7200px`.
8. Add Wix tools above or below it if needed.

For modular section use, set the source URL to:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/wix-custom-elements/s4l-wix-sections.js
```

Then set the tag name to one of the modular tags above, for example:

```text
s4l-hero-section
```

Wix custom elements require a public HTTPS source URL. Wix also notes that custom elements require a premium site connected to a domain and without Wix ads.

Official Wix custom element overview:

```text
https://support.wix.com/en/article/velo-about-custom-elements
```

## Suggested Heights

These are starting points. Adjust in the Wix editor after previewing.

```text
s4l-full-site                 7200 px
s4l-hero-section              760 px
s4l-mission-about-section     1700 px
s4l-hop-programs-section      1450 px
s4l-resources-media-section   2100 px
s4l-testimonials-section      850 px
s4l-contact-footer-section    1150 px
s4l-member-portal-section     1250 px
```

On mobile, you may need taller heights because cards stack.

## Optional Attributes

Most URLs can be customized with attributes on the custom element.

Examples:

```html
<s4l-hero-section
  asset-base="https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/assets/"
  member-url="/member"
  contact-url="/contact">
</s4l-hero-section>
```

Useful attributes:

```text
asset-base
member-url
contact-url
booking-url
donate-url
grief-register-url
book-purchase-url
book-amazon-url
podcast-url
youtube-url
series-url
```

If you host `s4l-wix-sections.js` inside this GitHub Pages repo, `asset-base` usually does not need to be set. The script figures out the assets folder automatically.

## How To Use Wix Tools With This

Add Wix tools **between** custom elements:

- Wix Forms after `s4l-contact-footer-section` or before it.
- Wix Bookings after `s4l-hop-programs-section`.
- Wix Pricing Plans before `s4l-member-portal-section`.
- Wix Members Area as the actual login/membership tool.
- Wix Donation/Payment buttons after the hero or support section.

Avoid trying to put Wix tools *inside* a custom element. Wix does not treat the content inside the custom element as normal drag-and-drop Wix elements.

Do not use **Embed a Site** for this package. That Wix option creates an iframe, which is exactly what this package is avoiding.

## Editing The Design

To change text, links, or layout inside the coded sections, edit:

```text
wix-custom-elements/s4l-wix-sections.js
```

Then commit/push the change to GitHub Pages. Wix will load the updated script after cache refresh.

## Paywall Note

If you want Wix to handle memberships and pricing plans, use Wix Members/Pricing Plans around these custom elements.

If you want the Cloudflare/Square backend from the GitHub Pages version, keep the real login/download page at `/member/` and point member buttons there.
