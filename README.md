# Clarity Process Consulting — website

**Domain:** https://www.clarityprocessconsulting.com/  
**Hosting:** GitHub → Cloudflare Pages  
**Business model:** Independent, 100% remote process improvement and operations consulting. No on-site visits.

## Main navigation

Home · Services · Insights · FAQ · Contact (desktop and mobile). The homepage and footer additionally link to About, Results, case studies, process specialty pages and industry examples.

## Package offers

- **The Why?** Starting at $1,500; 10 hours of remote workflow diagnosis, recommendations and a detailed PDF report. **Analysis only**—no implementation or SOP changes.
- **The What Next?** Starting at $3,750; includes The Why? plus 15+ hours of process redesign and SOP creation (25+ hours total).
- **Keep on Improving** Starting at $5,250/month; 35+ hours monthly for ongoing process analysis, SOPs, operational redesign and restructuring.
- Optional add-ons: training videos; system cleaning and approved data transition. Both are independently scoped and priced.
- Standard starting scope: one or two business processes/teams. Expansion requires agreed additional hours/cost.

## Positioning

Clarity is **industry-flexible** for remotely observable, digitally managed workflows. Sector examples include SaaS, insurance operations, finance, HR, nonclinical healthcare administration, e-commerce, logistics coordination, real estate administration, education, nonprofit operations, customer support, professional services and back-office functions.

## Evidence-backed expertise expansion (October 26, 2026)

New public content:
- `/about/`: founder Nadya Uzmack, B.S. Marketing (Franklin University), Lean Six Sigma Yellow Belt, corporate analyst experience since 2022, tools, methodology, and remote model.
- `/results/`: selected *reported corporate experience outcomes*: roughly 3→1.5 hours review time; average error rates ~10%→~4% across review work; adoption of 12 automation solutions supported; 50+ learning/process resources created; training across 6 teams; multiple product launches supported.
- Four `/case-studies/` pages documenting the real problem domains, founder's contribution, results or scope, transferability and methods. These are **prior enterprise-team experience**, not Clarity client engagements.
- Four service SEO pillars: `/process-audit/`, `/sop-development/`, `/workflow-automation-consulting/`, `/cross-functional-workflow-consulting/`.
- Four firsthand experience essays: three-hour reviews, automation adoption, knowledge management/training and cross-functional product launches.
- Every existing blog post connects to related real operational experience and founder profile.
- Updated Homepage, Services, Insights index, Industries, FAQ and Contact pages with internal links, proof of experience and relevant service-specific copy.

**Truthfulness/permission:** Case studies deliberately omit the employer's name, proprietary documents, confidential procedures, individual customer data, and unverified savings claims. Metrics reflect user-reported approximate outcomes during team-led corporate initiatives; avoid implying exclusive authorship, external audit, employer endorsement, or Clarity client results. The previous hypothetical POV articles remain distinct from these real experience pages.

**SEO:** 28 articles and 46 indexable routes including all main pages, service pillars, and results/case studies. All have canonical URLs. `sitemap.xml` enumerates every indexable page. Submit the sitemap in Google Search Console once the latest Cloudflare deployment is confirmed. Exact rankings are not guaranteed; maintain useful, original, helpful content and review performance in Search Console.

**CSS:** All HTML pages use the new `assets/clarity-authority-v20261026.css` stylesheet based on logo-aligned sage and olive. This uses a fresh asset URL to avoid stale CSS caching.

## Contact form setup

The Contact page is a **consultation inquiry**, not a calendar booking. Users can specify a package, team count, preferred video meeting windows and time zone. Consultations are coordinated by email only after request.

The form sends to `/api/contact` through Cloudflare Pages Functions and Resend. The private destination Gmail address must be set via Cloudflare **encrypted** `CONTACT_TO_EMAIL` secret, never stored in GitHub. The sender identity comes from `CONTACT_FROM_EMAIL` (verified domain) and Resend API key `RESEND_API_KEY`. Optional Cloudflare Turnstile site and secret keys must be configured together. Deploy again after secret changes, test mail provider acceptance, and verify arrival in the inbox. The form intentionally stays disabled if not configured rather than claiming a submission succeeded.

Please validate latest production deployment, redirects, contact delivery, mobile layout and Google Search Console. Do not claim live deployment solely because GitHub has a commit.
