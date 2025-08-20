# B Step Changes

## SEO
- Added meta tags, Open Graph, Twitter card, canonical and hreflang links.
- Injected JSON-LD for WebApplication and FAQPage.
- Added robots.txt and sitemap.xml.

## Export & Share
- Added `exporter.js` with SVG, PNG, PDF export and share link generation.
- Integrated LZ-String and jsPDF via CDN.
- Added export and share UI with file size estimation and analytics hooks.

## PWA
- Added manifest and service worker using Workbox for offline use and caching of `opencv.js`.

## Styles & Misc
- Added print styles, version display and build time.
- Added footer with open source attribution.

### External CDN Used
- lz-string 1.4.4
- jsPDF 2.5.1
- workbox-sw 6.5.4

### Test Steps
- Run `npm run serve` and open `http://localhost:8080`.
- Verify meta tags, robots and sitemap accessible.
- Generate art, export SVG/PNG/PDF, copy share link and reload with `?state=`.
- Enable offline mode after first load and reload to confirm PWA caching.
