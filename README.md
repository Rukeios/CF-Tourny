# CF-Tourny

Static CaribbeanFye tournament site pages:

- `index.html` - Home page
- `standings.html` - League standings
- `stats.html` - Player statistics
- `rules.html` - Competition rules
- `faq.html` - Frequently asked questions
- `highlights.html` - League highlights
- `contact.html` - Contact information
- `privacy.html` - Privacy policy
- `terms.html` - Terms of service
- `admin/bracket.html` - Bracket administration
- `admin/stats.html` - Statistics administration

Shared presentation and behavior live in `css/main.css`, `css/pages.css`, and
the files under `js/`. Page renderers are in `js/pages/`; editable homepage,
standings, statistics, highlights, rules, and FAQ content is in `data/`.
See `data/README.md` for the JSON shapes and offline-editing notes.

## GitHub Pages

This is a static site and can be deployed with GitHub Pages using the included
workflow in `.github/workflows/pages.yml`. In the repository settings, set
**Pages > Build and deployment > Source** to **GitHub Actions**.

The public site is available at the repository Pages URL. Administration pages
are kept under `/admin/` so they can be protected later by a hosting provider
without changing the public site structure.
The current admin password gate is a client-side curtain, not authentication;
use edge/server-side access control before accepting paid or sensitive data.