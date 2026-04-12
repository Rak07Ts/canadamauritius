# Canada Mauritius Trade and Investment Venture — Website Documentation

Live site: `https://rak07ts.github.io/canadamauritius` (test domain)
Future domain: `canadamauritius.com`

---

## 1. How the site was built

This is a **pure static website** — HTML, CSS and JavaScript only. No framework, no CMS, no database, no server.

### Tech stack

| Layer | Technology |
|---|---|
| Pages | HTML5 |
| Styling | CSS3 (single file: `css/style.css`) |
| Interactivity | Vanilla JavaScript (`js/main.js`) |
| Hosting | GitHub Pages (free, permanent) |
| Fonts | Google Fonts (loaded via CDN) |

### Why this matters for maintenance costs

- **GitHub Pages is free forever** for public repositories — no hosting fees, no renewal, no surprise invoices.
- **No CMS licence** (no WordPress, no Webflow, no monthly subscription).
- **No build tools** — every file can be opened and edited directly in a text editor. No compilation step, no dependencies to update.
- The only recurring potential cost is the **domain name** (`canadamauritius.com`), typically ~$15–20 CAD/year depending on the registrar.

### File structure

```
/
├── index.html                   Homepage
├── about.html                   About Us
├── membership.html              Membership
├── sponsorship.html             Sponsorship (content TBC)
├── news.html                    News & Events (article list)
├── news-mission.html            Article: Exploratory Business Mission
├── news-padminee.html           Article: Leadership Spotlight Padminee
├── news-corridor.html           Article: Canada-Mauritius Business Corridor
├── news-gateway.html            Article: Mauritius as a Gateway to Africa
├── focus-areas.html             Focus Areas
├── programs-young-leaders.html  Program: Young Leaders Program
├── programs-diaspora.html       Program: Diaspora Engagement
├── contact.html                 Contact
├── css/
│   └── style.css                All styles (single file)
├── js/
│   └── main.js                  All interactivity (news cards, nav, dropdown, animations)
└── images/                      All site images
```

---

## 2. Responsiveness

The site is designed to work across **desktop, tablet and mobile**.

### Navigation menu order
Home → About Us → Focus Areas → Programs (dropdown) → News & Events → Membership → Sponsorship → Contact

The **Programs** item uses a CSS hover dropdown on desktop and a click-toggle on mobile. Sub-pages:
- `programs-young-leaders.html` — Young Leaders Program
- `programs-diaspora.html` — Diaspora Engagement

### Breakpoints in `css/style.css`

| Breakpoint | Target devices |
|---|---|
| `max-width: 1024px` | Small laptops, large tablets |
| `max-width: 900px` | Tablets (article sidebar stacks, pillars grid goes 2-column) |
| `max-width: 768px` | Mobile (hamburger menu, all grids go 1-column, hero shrinks) |
| `max-width: 600px` | Small mobile (pillars go 1-column, CTA list stacks) |
| `max-width: 480px` | Very small phones (font adjustments, tighter padding) |

### What adapts on mobile
- Navigation collapses to **hamburger menu** with slide-in drawer
- All multi-column grids (news cards, focus areas, team, footer) stack to **1 column**
- Article sidebar moves **below the article body**
- Hero images shrink in height
- Buttons go **full-width**

---

## 3. Newsletter

### Current state
The newsletter form in the footer is **visual only** — it collects no data and sends no emails. The form has `onsubmit="return false;"` which prevents any action.

```html
<!-- Current placeholder — not connected to anything -->
<form class="newsletter-form" onsubmit="return false;">
    <input type="email" placeholder="Your email">
    <button type="submit">Sign Up</button>
</form>
```

### How to connect it (recommended: Brevo or Mailchimp)

Both platforms have a **free tier** and integrate with static HTML sites via a simple copy-paste embed code.

**Recommended: [Brevo](https://brevo.com)** (formerly Sendinblue) — free up to 300 emails/day, bilingual interface, GDPR-compliant, based in Europe.

Steps:
1. Create a free Brevo account
2. Create a **subscription form** in the Brevo dashboard
3. Copy the embed code they provide (it replaces the current `<form>` element)
4. Paste it into all HTML pages inside the footer

---

## 4. Future integrations

Because this is a plain HTML site, integrating third-party tools is straightforward — it always involves **adding a script tag or replacing a form element**. No rebuild required.

| Feature | Tool | Integration method |
|---|---|---|
| Newsletter | Brevo / Mailchimp | Replace `<form>` with embed code |
| Payments (membership) | Stripe / PayPal | Add a `<script>` + hosted payment button |
| Contact form | Formspree / Netlify Forms | Change `action=` attribute on the form |
| Analytics | Google Analytics / Plausible | Add one `<script>` tag in `<head>` |
| LinkedIn posts (automated) | LinkedIn API + GitHub Actions | GitHub Action writes a JSON file daily; JS reads it |
| Live chat | Tawk.to / Crisp | Add one `<script>` tag before `</body>` |
| Cookie consent | Cookiebot / Onetrust | Add one `<script>` tag in `<head>` |

### Membership area
When ready to make membership functional, the recommended approach is:
- **Payment**: Stripe Checkout (hosted page, no backend needed)
- **Member content**: A password-protected page via a service like [Memberstack](https://www.memberstack.com) or simply a private GitHub repo with a separate members site
- **Members directory**: A JSON file (`data/members.json`) read by JavaScript, same pattern as the news cards

---

## 5. LinkedIn automation (in progress)

Goal: automatically display the 3 latest LinkedIn posts on the homepage.

### Architecture
```
LinkedIn API → GitHub Action (runs daily) → data/linkedin-posts.json → main.js reads it → homepage renders posts
```

### Status
- [ ] LinkedIn Developer App created (Client ID + Client Secret needed from page admin)
- [ ] OAuth token generated and stored in GitHub Secrets
- [ ] GitHub Action workflow created (`.github/workflows/fetch-linkedin-posts.yml`)
- [ ] `data/linkedin-posts.json` schema defined
- [ ] `main.js` updated to render LinkedIn posts

### Notes
- LinkedIn access tokens expire every **60 days** — the GitHub Action handles refresh automatically
- The LinkedIn Developer App's redirect URL must be updated if/when the domain changes from `rak07ts.github.io` to `canadamauritius.com` (30-second change in LinkedIn Developer settings)

---

## 6. Moving to the real domain (`canadamauritius.com`)

When the domain is acquired:

1. **In your domain registrar** — add a CNAME DNS record pointing `canadamauritius.com` to `rak07ts.github.io`
2. **In GitHub repository settings** → Pages → Custom domain → type `canadamauritius.com`
3. Enable **Enforce HTTPS** (GitHub handles the SSL certificate automatically, free via Let's Encrypt)
4. **In the LinkedIn Developer App** — add `canadamauritius.com` to the allowed redirect URLs

No code changes required. The site works identically on the new domain.

---

## 7. Changelog

| Date | Change |
|---|---|
| April 2026 | Initial site build: all pages, CSS, JS news card system |
| April 2026 | Hero images unified to `page-hero-bg` style across all pages |
| April 2026 | Homepage rewritten: "From Vision to Action" content + new CSS components |
| April 2026 | Button hover bug fixed (text was hidden) |
| April 2026 | Hero background-position tuned for focus-areas, membership, news, article pages |
| April 2026 | All news article content rewritten in past tense |
| April 2026 | Programs dropdown added (Young Leaders, Diaspora Engagement); Sponsorship placeholder; README updated |
