# Carroll Consulting

Website for **Carroll Consulting**, a strategic people advisory firm for growing companies. The site covers HR strategy, workplace risk, and HR infrastructure, under the tagline **People. Risk. Strategy.**

## Pages

| File | Page | Purpose |
| --- | --- | --- |
| `index.html` | Home | Hero, introduction, three pillars, "Start with the problem," founder section, approach, results, insights teaser, call to action |
| `pages/services.html` | Services | People, Risk and Strategy services, engagement models, legal note |
| `pages/about.html` | About | Founder bio and credentials, philosophy, "Beyond HR" |
| `pages/insights.html` | Insights | "The Carroll Consulting Brief" featured and archive article listing |
| `pages/contact.html` | Contact | Advisory consultation request form and what to expect |

Shared styles live in `css/styles.css`. Every page links to it, so update colors and typography there.

## Running locally

No build step is needed. Open `index.html` in a browser, or serve the folder with any static server, for example:

```bash
npx serve .
```

Fonts load from Google Fonts (Inter), so an internet connection is needed for the intended typography. The page still works offline with a fallback font.

## Design

- **Palette:** navy `#13213f`, teal `#1f6e6a`, light teal `#7fd0c9`, off-white `#f6f7f9`. Defined as CSS variables in `css/styles.css`.
- **Layout:** responsive, with breakpoints at 960px and 600px. Phone width uses a 16px side gutter.
- **Tone:** practical, executive-level, and free of HR jargon, following the approved website copy.

## Open items

These need content or decisions before launch:

- [ ] Hero photo on the home page (placeholder block)
- [ ] Founder photo of Imani Carroll on the home and About pages (placeholder blocks)
- [ ] Contact email address (currently `[add email]` in the footer and on the Contact page)
- [ ] Contact form backend. Currently the form has no submit handler and does not send anything.
- [ ] Booking tool link for "Book an Advisory Consultation" buttons (currently `pages/contact.html`)
- [ ] Real URLs for the insight articles (currently `#`)
- [ ] Logo. The mark is a plain "C" until a logo file is provided.

## Legal note

The site states that Carroll Consulting provides strategic HR, people, and workplace-risk advisory services and does not provide legal representation or legal advice. Keep this wording on every page, including the footer.

---

© 2026 Carroll Consulting. All rights reserved.
