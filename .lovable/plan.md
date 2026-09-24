# Beyond the Echoes — Website Build Plan

## Goal
Build a complete premium author, historical archive, and direct book-sales website for James E. Craver, grounded only in the supplied cover, manuscript, and service agreement.

## Experience
- Create a cinematic editorial system inspired by the cover: parchment, charcoal, antique bronze, archival linework, restrained texture, strong serif display type, and clean sans-serif UI type.
- Add a sticky responsive header, full-screen mobile navigation, consistent “Buy the Book” actions, subtle reveal/lift motion, accessible focus states, and a museum-quality footer.
- Use the supplied cover prominently throughout; use manuscript pages and non-representational archival/patent imagery where appropriate, never invented historical portraits.

## Pages
- **Home:** cinematic book-led opening, editorial statement, factual scale, featured inventors, timeline preview, archive preview, historical-method note, interior preview, author placeholder, and purchase section.
- **The Book:** editorial overview, coverage, chronology, featured profiles, real interior previews, historical significance, and purchase path.
- **The Author:** restrained page with clearly marked editable content gaps; no invented biography, portrait, credentials, or awards.
- **Inventors:** searchable, filterable, sortable, paginated data-driven archive populated from the manuscript.
- **Inventor Profile:** reusable dynamic page preserving documented contributions, chronology, patent/document status, technical context, uncertainty, evidence notes, and related profiles.
- **Timeline:** interactive chronology from 1753 through the manuscript’s latest documented entry, adapting to a vertical mobile exhibition.
- **Shop / Cart / Checkout / Confirmation:** polished purchase flow with quantity and order summary, while clearly withholding price, shipping, refund terms, and real payment submission until supplied.
- **Contact:** accessible inquiry form with requested categories and editable contact placeholders.
- **Journal:** future-ready “Coming Soon” page with no fabricated articles.
- **Legal/support placeholders:** shipping, privacy, terms, and refund pages clearly marked for client completion.

## Content and Data
- Extract the manuscript’s profile index into one maintainable inventor dataset and use only manuscript-supported names, years, contributions, fields, descriptions, and status notes.
- Use fuller narrative details only where the supplied manuscript pages support them; avoid flattening uncertain claims into facts.
- Keep book price, shipping, refund policy, author biography/photo, domain, sales email, and social links as explicit configuration placeholders.

## Commerce and Administration
- Enable Lovable Cloud for protected order, customer, product, and sales records owned by the author’s account.
- Prepare secure payment-provider integration points without fake keys or transactions.
- Validate checkout and contact input in the page and on the server; keep purchaser information private and restricted to authorized administration.
- Do not activate real ordering until price, shipping, policies, domain email, and payment account are supplied.

## Quality and Search
- Give every page unique search/social metadata, correct heading structure, canonical URL, and appropriate Book, Person, Product, and breadcrumb structured data without invented values.
- Optimize images, lazy-load supporting media, respect reduced-motion preferences, and verify keyboard navigation and contrast.
- Test desktop and small-mobile layouts for navigation, forms, archive controls, timeline interaction, checkout usability, overflow, overlap, and broken links.

## Required Client Inputs Before Launch
- Final retail price and currency
- Shipping rates/regions and return/refund policy
- Author domain and `sales@…` address
- Payment-provider account/credentials
- Approved author biography, portrait, contact details, and social links
