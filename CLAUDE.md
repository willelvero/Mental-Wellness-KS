# Mental Wellness KS — project guide

> **Source of truth for this client.** Claude Code reads this every session. Keep accurate. The agency-level `~/.claude/CLAUDE.md` covers shared conventions — this file is for facts unique to Mental Wellness KS.

## Client identity (NAP)

- **Name**: Mental Wellness KS
- **Address**: 947 N Cibola Cir, Palm Springs, CA 92262
- **Phone (display)**: (866) 460-4462
- **Phone (`tel:` format)**: +18664604462
- **Email**: info@mentalwellnessks.com
- **Canonical URL**: https://mentalwellnessks.com
- **Geo**: latitude 33.83639, longitude -116.52527
- **Hours**:
  - Residential: 24/7
  - PHP: Mon–Fri, 08:00–15:00 (6 hrs/day)
  - IOP: Mon–Fri, 08:00–11:00 or 12:00–15:00 (3 hrs/day)

## Brand & practitioners

- **Vertical**: Mental health & trauma (NOT primary SUD — SUD detox sits at the sister site, Ken Seeley Communities)
- **Primary GBP category**: Mental health clinic (suggested — confirm before publishing)
- **Brand voice**: Serious, evidence-based, family-inclusive, trauma-focused. Plainspoken. Speaks to the outcome ("mental wellness") rather than the problem.
- **Ethos adjectives**: life-changing, loving, long-term support
- **Veteran-owned**: yes — both founders are certified trauma professionals
- **Parent group**: The Ken Seeley Group (sister brands: Intervention 911, Ken Seeley Communities). Use sister-site framing for SUD continuity-of-care, not as services of MWKS itself.

### Founders / owners

- **Ken Seeley** — Founder. Credentials: CCMI-M, CIP, CTP, CADC, CAS. Sober since 1989-07-14. Nationally recognized interventionist; A&E *Intervention* (2005–). Founded Intervention 911 (2002) and Ken Seeley Communities (2011).
- **Eric McLaughlin** — Founder & CEO of The Ken Seeley Group. Credentials: ASW, CCMI-M, CIP, CTT-2. USC School of Social Work MSW (Magna Cum Laude, Dec 2016). Oversees clinical services across all KSG brands.

### Clinical leadership

- **Dr. Christian Small, MD** — Medical Director & Chief Psychiatrist. Board-certified in psychiatry + family medicine. Co-founder of Bold Health (Encinitas). Continues to practice at the VA in La Jolla. UH John A. Burns School of Medicine; combined psych + family med residency at UCSD.
- **Kelly Mullins, PMHNP-BC** — Psychiatric Nurse Practitioner. Former Army Healthcare Specialist (Iraq, Honduras), RN at UCSD, FNP/Psych NP from Azusa Pacific University.

## Programs offered (here, at MWKS — not at the sister site)

- Residential inpatient mental-health treatment (30–45 days)
- Partial Hospitalization Program (PHP) — 6–12 weeks
- Intensive Outpatient Program (IOP) — 6–12 weeks
- Supportive housing alongside PHP/IOP
- Family support and education
- Pricing reference: $30,000 / 30 days. Accepts INN and OON.

## Conditions treated

Anxiety, Depression, Bipolar disorder, OCD, Veteran PTSD, Schizophrenia, Self-harm, Social anxiety, Psychosis, Trauma & PTSD, Suicidal ideation. (Client confirmed all 11 — including schizophrenia/psychosis — should appear on the site even though the intake form initially listed active psychosis as an admissions exclusion. Treat as: those conditions are treated; admissions still screens for *acute active* presentations on a case-by-case basis.)

## Admissions exclusions (do NOT advertise as treated)

- Active eating disorders
- Adolescents (under 18)
- Autism spectrum
- Violent offenders
- Arson history
- Chronic pain (case-by-case review)

## Therapies / modalities

CBT, DBT, EMDR, Cognitive Processing Therapy (CPT), Psychodynamic therapy, individual + group therapy, family therapy, psychiatric care + medication management, art therapy, mindfulness, fitness, psychoeducation, outings.

## Insurance

INN & OON. Carriers: United Healthcare, United Behavioral Health, Cigna, Aetna, BCBS, Value Options, TRICARE, TriWest, Meritain, Premera, PCIP, Anthem, Medica, Regence, + others.

## Areas served (for local SEO)

Palm Springs, Cathedral City, Rancho Mirage, Palm Desert, Indio, La Quinta, Coachella, Desert Hot Springs. Plus nationwide reach — majority of admissions find them online and travel to Palm Springs from across the U.S. and internationally. Local-pack signals stay focused on the Coachella Valley list; national/international reach lives in body copy.

## Visual brand (ported from the existing mentalwellnessks.com)

- **Primary**: `#1f3a5f` (deep navy — headings, hero text accents, theme-color)
- **Secondary**: `#68A0BF` (steel blue — hover states, accent rules)
- **Alt**: `#4f6d8a` (mid blue-gray — supportive UI)
- **Background**: `#F7F9F8` (warm off-white)
- **Surface**: `#FFFFFF`
- **Text**: `#2b2b2b`
- **Border**: `#E8E8E8`
- **Border radius**: 5px (10px on larger cards)
- **Typography**: Adobe Typekit kit `jnw1waj` — `utile` for headings, `utile-display` for body. Loaded in `partials/head-assets.html`.
  - Headings: **UPPERCASE**, font-weight 400, navy `#1f3a5f`
  - Body: regular case, near-black `#2b2b2b`, 16px base, 1.6 line-height
- **Hero pattern**: full-viewport-minus-header height, dark linear-gradient overlay on a photo background. Image lives at `images/hero.webp`.
- **Stylesheet**: `css/styles.css` (built to `css/styles.min.css`). Single-file token + components system — no framework.

## Image library (in `images/`)

- `hero.webp` — homepage hero (renamed from the existing site's `treatment-1.webp`)
- `hero-banner.webp`, `healing-environment.webp` — inner-page hero options
- `logo.svg` — brand logo (heavy at ~290 KB; optimize with SVGO before final launch)
- `team/ken-seeley-1..5.webp` — five Ken Seeley photos (also heavy, 3–4 MB each — optimize)
- `programs/{php,iop,veteran-services}.webp` — program-card images
- `process/{connect,clinical-assessment,insurance,begin-treatment}.webp` — small process-step icons (~5–14 KB each)
- `insurance/{aetna,bluecross_blueshield,cigna_healthcare,medica,tricare,triwest,united_behavioral_health,united_health_care,value_options}.webp` — carrier logos
- `social/{facebook,instagram,linkedin,x,youtube}.svg` — social icons (no links wired yet; awaiting profile URLs)

## Stack

Standard agency stack: static HTML/CSS/JS, Node build (`scripts/build-html.mjs`). After editing any `src/` or `partials/` file, run `npm run build`.

## SEO conventions on this site

- Schema: `MedicalBusiness` on the homepage (full address, geo, hours, areaServed, availableService, employees). `MedicalCondition` on condition pages, `MedicalProcedure` on program pages, `BreadcrumbList` on every interior page, `FAQPage` where applicable.
- NAP must match exactly across `<title>`, header, footer, JSON-LD, and the client's Google Business Profile.
- Internal-linking rule: only link words already in the prose. Build the program ⇄ condition cluster.

## Medical / YMYL

Clinical claims need sign-off from Dr. Christian Small (Medical Director) before publishing. Anything Claude drafts is a draft until he reviews it. Mark draft passages with `[draft]` inline.

## Project-specific quirks

- **Name reads as "Mental Wellness KS" everywhere.** The intake form's header has a "Metal Wellness KS" typo — ignore it. "KS" stands for Ken Seeley.
- **SUD/detox is at the sister site, not here.** Don't advertise it as a MWKS service; reference Ken Seeley Communities for continuity of care if you need to mention it.
- **`addictions/` directory naming.** The starter scaffolds this as `addictions/`, but this is a mental-health clinic — rename to `conditions/` before building out subpages. Not yet renamed in this scaffold; do it when the first condition page is created.
- **Single-page existing design** at https://mentalwellnessks.com — links to /about, /contact, etc. are placeholder `#` anchors. New build replaces those with real in-page anchors or real subpages.
- **Phone strategy (confirmed by client):** only `(866) 460-4462` is in use for the rebrand. The old PSBH `(888) 277-2406` is **not** being listed — don't add it back without explicit instruction.
- **Deferred until later (client confirmed not blocking the frontend build):**
  - California DHCS license number — not on mentalwellnessks.com OR palmspringsbehavioralhealth.com. Surface to client before launch but not needed for frontend work.
  - Founding year for MWKS — also missing from both sites. Same: pre-launch concern, not a frontend blocker.
  - Real social-media URLs — staged icons in `images/social/`; `sameAs` JSON-LD field is intentionally omitted until URLs arrive.
  - Dr. Small's clinical sign-off on YMYL passages — required before publishing per agency policy, but not blocking design / frontend iteration. The `[draft]` UI markers have been stripped; `<!-- TODO before launch -->` comments mark the spots in `src/index.html` that need review.
  - Privacy-policy page (`/privacy/`) — footer links to it but the page does not exist yet.
