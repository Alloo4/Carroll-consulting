# Carroll Consulting

Website for **Carroll Consulting**, a strategic people advisory firm for growing companies. The site covers HR strategy, workplace risk, and HR infrastructure, under the tagline **People. Risk. Strategy.**

## Pages

| File | Page | Purpose |
| --- | --- | --- |
| `index.html` | Home | Hero, introduction, three pillars, "Start with the problem," founder section, approach, results, insights teaser, call to action |
| `services.html` | Services | People, Risk and Strategy services, engagement models, legal note |
| `about.html` | About | Founder bio and credentials, philosophy, "Beyond HR" |
| `insights.html` | Insights | "The Carroll Consulting Brief" featured and archive article listing |
| `contact.html` | Contact | Advisory consultation request form and what to expect |

Shared styles live in `styles.css`. Every page links to it, so update colors and typography there.

Shared behaviour lives in `js/site.js` (loaded with `defer` on every page): the mobile menu toggle and the contact form's sending/success/error states. The site works without JavaScript except for the mobile menu; footer links remain available.

## Running locally

No build step is needed. Open `index.html` in a browser, or serve the folder with any static server, for example:

```bash
npx serve .
```

Fonts load from Google Fonts (Inter), so an internet connection is needed for the intended typography. The page still works offline with a fallback font.

## Design

- **Palette:** navy `#13213f`, teal `#1f6e6a`, light teal `#7fd0c9`, off-white `#f6f7f9`. Defined as CSS variables in `styles.css`.
- **Layout:** responsive, with breakpoints at 960px and 600px. Phone width uses a 16px side gutter.
- **Tone:** practical, executive-level, and free of HR jargon, following the approved website copy.

## Open items

These need content or decisions before launch:

- [ ] Hero photo on the home page. Replace the `.hero-media` placeholder with an `<img>` that has `width` and `height` attributes so the layout does not shift while it loads.
- [ ] Founder photo of Imani Carroll on the home and About pages (placeholder blocks showing "IC"); same `width`/`height` note applies.
- [ ] Contact email address (currently `[add email]` in the footer and on the Contact page). The form's "not connected yet" and error messages tell visitors to email instead, so this matters once the site is live.
- [ ] Contact form backend. In `pages/contact.html`, set `data-endpoint` (and `action`) on the form to a form-handling service URL (Formspree, Basin, Netlify Forms, etc.). Until it is set, submitting shows a notice that the form is not connected rather than silently reloading.
- [ ] Booking tool link for "Book an Advisory Consultation" buttons (currently `pages/contact.html`)
- [ ] Real URLs for the insight articles. Cards currently show "Coming soon"; swap each `<span class="link link-soon">` back to `<a class="link" href="...">Read the insight →</a>` as articles are published.
- [ ] Logo. The mark is a plain "C" until a logo file is provided. The favicon is an inline SVG of the same mark in each page's `<head>`.
- [ ] Final domain. Once known, add `<link rel="canonical">`, `og:url` and `og:image` to each page and `url` to the JSON-LD block in `index.html`.

## Legal note

The site states that Carroll Consulting provides strategic HR, people, and workplace-risk advisory services and does not provide legal representation or legal advice. Keep this wording on every page, including the footer.

---

© 2026 Carroll Consulting. All rights reserved.
