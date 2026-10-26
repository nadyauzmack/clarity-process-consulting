# Clarity Process Consulting — website

Static website: homepage, Lean Six Sigma services page, blog index, **18 SEO-oriented articles** (including five clearly labeled illustrative first-person scenarios), sitemap, robots.txt, structured data, responsive styles.

## Before publishing (required)
1. **Verify business name** with state records and trademark counsel/search; name has not been legally cleared.
2. Preferred canonical domain is `https://www.clarityprocessconsulting.com/`; verify Cloudflare DNS, HTTPS, and that the apex redirects to `www`. Canonical URLs, `og:url`, structured data, robots.txt, and sitemap have been updated.
3. Set up the secure private contact form as documented below before accepting inquiries.
4. Review all service claims, remove any unsupported credentials, and personalize the About section.
5. **Important: five narrative articles are clearly marked illustrative scenarios, not real client case studies.** Replace with factual first-person accounts only after you verify details and remove identifying/confidential information. The triple-review story is inspired by the example supplied by the business owner, but the article intentionally does not claim a verified outcome.
6. Optionally add a privacy policy and consent controls before using analytics or collecting visitor data.

## Deploy with Cloudflare Pages
Upload this folder through Pages Direct Upload, or connect a GitHub repository; static files need no build command. Configure the custom domain and HTTPS, then update canonicals and sitemap.

## SEO
Unique page titles/descriptions, semantic article headings, canonical placeholders, BlogPosting JSON-LD, internal links, sitemap with all 10 posts, and responsive design. After launch submit sitemap in Google Search Console and monitor indexing. SEO rankings are not guaranteed.


## October 26 SEO and visual refresh
- Straightened the homepage process-flow card and matched the palette to official sage/olive and near-black company logos.
- Added a Lean Six Sigma service landing page and 8 detailed, topic-specific guides (18 posts total).
- Interlinked DMAIC, Lean wastes, SIPOC, Five Whys, value stream mapping, control plans, and insurance operations.
- This business describes a Lean Six Sigma-informed approach; it does not claim advanced belt credentials.
- User supplied `https://www.clarityprocessconsulting.com/` as the official domain. Added fully qualified canonicals and XML sitemap. External verification of live Cloudflare/DNS was unavailable.


## Domain SEO configuration (2026-10-26)
All 21 indexable routes use `https://www.clarityprocessconsulting.com/` as canonical origin (homepage, service page, blog index, and 18 articles). The sitemap enumerates all 21. The 404 page remains noindex. Verify live DNS, Cloudflare deployment, and redirects; then submit `https://www.clarityprocessconsulting.com/sitemap.xml` in Google Search Console. Do not publish the site with the homepage's contact-email placeholder; configure real lead capture before using it commercially.

## Private inquiry form setup (Cloudflare Pages Functions)
Contact submissions are POSTed to `/api/contact`; a Cloudflare Pages Function sends email via Resend. The destination Gmail address must be set as a **Cloudflare encrypted secret**, never in GitHub or frontend code.

1. Set up [Resend](https://resend.com) and verify `clarityprocessconsulting.com` for email sending. Add the domain-authentication DNS records Resend specifies to your Cloudflare DNS.
2. Open Cloudflare → Workers & Pages → clarity-process-consulting → Settings → Variables and Secrets. Add these **Production encrypted secrets**:
   - `RESEND_API_KEY`: email sending API key from Resend.
   - `CONTACT_TO_EMAIL`: the Gmail inbox to receive inquiries; configure this only in Cloudflare, never commit it to Git.
   - `CONTACT_FROM_EMAIL`: verified sender at your domain (for example, `contact@clarityprocessconsulting.com`).
3. Save the secrets and redeploy production.
4. Recommended: set up Cloudflare Turnstile for `www.clarityprocessconsulting.com`; add `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` as a pair in Cloudflare (encrypt the secret key). The page loads the public key via `/api/contact-config`, and the Pages Function validates each token server-side.
5. Test a form submission yourself. Confirm a delivery was accepted, then confirm arrival in your Gmail inbox and check your spam folder.

The public form shows "being connected" and disables sending until required private settings are present; it never fakes a successful delivery. `/api/contact-config` exposes only a ready boolean and optional public Turnstile site key, not mailbox identity or credentials. The endpoint validates message lengths and Origin, uses a honeypot, and has a fixed server-side recipient. Add Cloudflare rate limiting to `/api/contact` if spam becomes a problem. Remember to keep `.dev.vars` and `.env` files out of Git.
