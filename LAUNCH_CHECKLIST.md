# Backhouse Trading Website — Pre-Launch Checklist

Last updated: May 2026

---

## REQUIRED before going live

- [ ] **Contact form endpoint** — Replace `YOUR_FORM_ID` in `index.html` (line ~633) with your real Formspree ID. Create a free account at formspree.io, create a new form, and copy the ID from the form's action URL.

- [x] **NFA ID number** — NFA ID **0537236** has been added to `legal.html` in the "Regulatory Registration" section. Verify at basicnet.nfa.futures.org.

- [ ] **Set up generic email addresses** — The site references these addresses; make sure they're created and forwarded before launch:
  - `ir@backhousetrading.com` (investor relations / general inquiries)
  - `compliance@backhousetrading.com` (legal, privacy, and regulatory)

- [ ] **Compliance attorney review** — Have an NFA-registered compliance consultant or attorney review the full site before launch, especially `legal.html` and `performance.html`. NFA Compliance Rule 2-29 governs advertising; performance data and risk disclosures must be reviewed.

- [ ] **Performance data currency** — Verify all monthly returns in `index.html` and `performance.html` are current. The NFA expects performance data to be updated within 3 months of the most recent month-end.

---

## STRONGLY RECOMMENDED before going live

- [ ] **Official partner logos** — The SVG logos in `assets/img/partners/` are clean typographic approximations. Before launch, contact the marketing/communications team at each partner to request official white-version logo files (PNG or SVG). Replace the files in `assets/img/partners/` with the same filenames:
  - `rjobrien.svg` — request from RJO'Brien
  - `stonex.svg` — request from StoneX
  - `rcmalternatives.svg` — request from RCM Alternatives
  - `adm.svg` — request from ADM Investor Services
  - `mjttechnologies.svg` — request from MJT Technologies
  - `marex.svg` — request from Marex

- [ ] **Eric's photo** — Replace the "EL" initials avatar in the Team section (`index.html`) with a professional headshot. Add an `<img>` tag inside `.team-card__avatar` pointing to a photo file (e.g., `assets/img/team/eric-lin.jpg`).

- [ ] **Physical / registered address** — Add a mailing or registered agent address to the `legal.html` contact section. NFA members should have a registered address on record.

- [ ] **robots.txt** — Create a `robots.txt` at the project root to control search engine indexing. The site currently uses `<meta name="robots" content="noindex, nofollow">` on all pages (a compliance best practice—many CTAs do not want their performance data indexed). To also block crawlers at the server level, add:
  ```
  User-agent: *
  Disallow: /
  ```
  Or selectively allow/disallow specific pages.

- [ ] **GitHub Pages setup** — In your GitHub repo: Settings → Pages → Source: Deploy from branch → Branch: `main` → Folder: `/(root)`. The `.nojekyll` file is already in place to prevent Jekyll processing.

- [ ] **Custom domain** (optional) — If using a custom domain (e.g., backhousetrading.com), add a `CNAME` file to the repo root containing just the domain name. Then configure a CNAME DNS record pointing to `yourusername.github.io`.

- [ ] **HTTPS** — GitHub Pages enforces HTTPS automatically. Confirm the "Enforce HTTPS" checkbox is enabled in repo Settings → Pages after deployment.

---

## NICE TO HAVE (post-launch)

- [ ] **Analytics** — Add a privacy-respecting analytics tool (e.g., Plausible, Fathom, or GA4 with IP anonymization) if you want to track visitor behavior. Update `privacy.html` to disclose the specific tool used.

- [ ] **Cookie banner** — If you add analytics cookies, a brief cookie notice banner is required. Add one to all HTML files just before `</body>`.

- [ ] **LinkedIn / social** — If Backhouse Trading has a LinkedIn company page, add a link in the footer.

- [ ] **Sitemap** — Create a `sitemap.xml` at the project root for search engines (only relevant if you decide to allow indexing in the future).

- [ ] **Update frequency** — Establish a monthly cadence to update the performance tables in both `index.html` and `performance.html` after each month-end close.

---

## Email addresses used across the site

| Address | Used on | Purpose |
|---|---|---|
| `ir@backhousetrading.com` | `index.html` contact section | General investor inquiries |
| `eric@backhousetrading.com` | `index.html` team section | Direct to Eric |
| `compliance@backhousetrading.com` | `legal.html`, `privacy.html` | Compliance, legal, privacy inquiries |
| Formspree endpoint | `index.html` contact form | Form submission routing |
