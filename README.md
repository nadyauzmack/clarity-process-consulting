# Clarity Process Consulting — Remote business process improvement website

Live domain: https://www.clarityprocessconsulting.com/

GitHub + Cloudflare Pages static site with Cloudflare Pages Functions for private consultation requests.

## Structure and navigation

Primary five-page menu:
- **Home**: `/`
- **Services**: `/services/`
- **Insights**: `/blog/`
- **FAQ**: `/faq/`
- **Contact**: `/contact/`

Also linked via homepage/footer:
- **Industries & remote workflow examples**: `/industries/`
- **Lean Six Sigma consulting**: `/lean-six-sigma-consulting/`
- **Privacy Notice**: `/privacy/`

All services are **100% remote-only**: video conversations, screen-shared workflow observation, approved digital documents and systems. No on-site visits. Industry-neutral positioning with examples covering SaaS, insurance, finance, healthcare administration, HR, agencies, retail/e-commerce, education, nonprofits, real estate, logistics, customer support, and more. This is business process work, not regulated legal, medical or industry-specific compliance advice.

## Packages: indicative starting prices, not guaranteed quotes

| Package | Hours | Starting price | Scope |
| --- | ---: | ---: | --- |
| **The Why?** | 10 total hours, once | **$1,500/project** | Remote analysis + practical advice + in-depth PDF report; **no implementation or changes** |
| **The What Next?** | 10 + 15+ additional = **25+ total hours** | **$3,750/project** | Everything in The Why? + future-state redesign + new/revised SOPs |
| **Keep on Improving** | **35+ hours/month** | **$5,250/month** | Retained analysis, process redesign, SOPs and more extensive business operations work |

Starting scope typically covers **one or two defined processes or teams**. Additional processes, departments, interviews, systems, or complexity may increase the agreed hours and cost. Monthly hours, priorities and deliverables are scoped in writing; the retainer is not unlimited additional work.

Optional separately priced add-ons:
- **Training videos** (screen-recorded walkthroughs, materials).
- **System cleaning & data transition** (record/document cleanup and approved migration to new software; scope, permissions, backups and validation assessed before work).

## Consultation requests — NOT instant bookings

The Contact page lets prospects:
- Select a package (deep-linked from a package card via `?package=why`, `what-next`, `keep-improving`).
- Describe the process and number of teams.
- State their time zone and preferred video-call windows.

The form requests a consultation only. An appointment is **not booked until confirmed by reply**. No personal email address appears anywhere in GitHub or public site code.

## Configure private email forwarding (required)

Form endpoint: `functions/api/contact.js` (Cloudflare Pages Function).
Browser script: `assets/consultation-form-v20261026.js`.

Set up [Resend](https://resend.com) and verify your sending domain. Add the provider DNS records in Cloudflare. On the Cloudflare Pages project, add these **Production variables/secrets** in Settings → Variables and Secrets:

- `RESEND_API_KEY` — Resend API key, **encrypted secret**.
- `CONTACT_TO_EMAIL` — your private destination mailbox, **encrypted secret** (never store the value in GitHub).
- `CONTACT_FROM_EMAIL` — authorized, domain-verified sender address, preferably encrypted.
- Optional spam protection: `TURNSTILE_SITE_KEY` (public) and `TURNSTILE_SECRET_KEY` (encrypted), configured together.

Redeploy after saving. Check `/api/contact-config`: it returns only a `ready` boolean and optional public Turnstile site key. The form stays disabled rather than simulating success until required settings exist. Then send a test consultation request, verify provider acceptance and actual inbox delivery. Consider per-IP Cloudflare rate limits if spam occurs.

The website cannot directly confirm an appointment or insert a calendar event from the inquiry alone.

## Technical SEO and quality

- Responsive five-page navigation across every page, including mobile menu.
- Official logo-aligned sage and olive design in `assets/clarity-remote-packages-v20261026.css`.
- Canonical URLs use `https://www.clarityprocessconsulting.com`.
- `sitemap.xml` lists every public page, including all 24 blog posts.
- `robots.txt` references the sitemap.
- Site includes schema.org Organization, ProfessionalService/Service, FAQPage, and BlogPosting markup where appropriate.
- No invented client testimonials. Earlier narrative case stories are framed hypothetically in their content; do not represent them as verified client case studies or disclose employer information.
- Keywords target actual services and multiple digitally managed industries, not keyword stuffing or unsupported certification claims.
- Submit the sitemap to Google Search Console after deployment. Search rankings are not guaranteed.

Verify the latest Cloudflare production deployment uses the latest GitHub `main` commit. Site deployment or functioning contact delivery cannot be inferred solely from GitHub pushes.

## Cross-industry remote workflow SEO articles (2026-10-26)
In addition to 18 existing process / Lean Six Sigma articles, six original, industry-specific remote workflow guides were added:
- Remote virtual process audits and video walkthroughs.
- SaaS customer onboarding workflow redesign.
- Remote HR / staffing onboarding SOPs.
- Nonclinical healthcare administration processes.
- E-commerce returns, orders, and fulfillment administration.
- Professional services client intake and approvals.

Blog index now exposes 24 posts in distinct remote-workflow and process-improvement sections. Industry examples page links to individual guides. The sitemap has 32 indexable pages; check Google Search Console after production deployment and confirm that each referenced URL returns HTTP 200.
