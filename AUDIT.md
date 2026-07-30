# LaurenEnglish — Final Technical Front-End Audit

**Audit date:** 2026-07-26

**Project type:** Static multi-page educational frontend and PWA

**Audit mode:** Final repository and implementation review

**Current readiness:** Needs important fixes

## 1. Executive assessment

LaurenEnglish has a strong source-first architecture, unusually broad project-specific validation, accessible interaction patterns, complete route and PWA registries, and a disciplined separation between canonical source and generated output. The current static validators confirm 12 published HTML documents, 6 indexable routes, 29 runtime CSS paths, 17 runtime JavaScript paths, and 76 Service Worker precache entries.

The repository is not ready for an unqualified release. The progress journal silently retains only 13 of its promised 14 days, the public project-disclosure contract contradicts the authoritative product positioning, the complete browser gate is red, footer links pass through a low-contrast state during a dark-theme switch, the development dependency graph contains high and critical advisories, and the locally distributed Inter files lack repository-visible license evidence. No P0 failure was found, but these P1 issues require resolution before the project can be described as ready.

## 2. Audit scope and verification

### Areas inspected

- repository state, package scripts, dependency lockfile, ignore rules, changelog, proprietary license, bilingual README, runtime checklist, CSS architecture guide, project context, and archived audit and plan
- all 12 published HTML documents and the canonical page, indexing, shared-shell, metadata, redirect, sitemap, and robots registries
- token, base, utility, component, section, and page CSS, including responsive rules, focus presentation, reduced motion, theme tokens, and contrast checks
- JavaScript entrypoint, guarded initializers, navigation, accordion, disclosure dialog, material catalogue, progress journal, browser storage, date normalization, and content data
- HTML and Service Worker assembly, image generation, PWA configuration, manifest, generated Service Worker, runtime asset budgets, and auxiliary bundles
- Playwright configuration, helper utilities, and browser specifications for smoke, routing, SEO, PWA, responsive behavior, theme, navigation, disclosure, footer, and visual contracts
- visible frontend security boundaries, external-link handling, DOM-writing patterns, local storage normalization, form contracts, local assets, and current-tree secret indicators

### Verification performed

- `git status --short --branch` — passed; the tracked tree was clean at audit start
- `npm run check:data` — passed; 3 package keys and 15 material records verified
- `npm run check:content` — passed; public-content contracts verified across 12 pages
- `npm run check:html` — passed; generated regions verified for 12 pages and shared-shell invariants for 9 pages
- `npm run check:css` — passed; 29 CSS files, 19 dual-theme semantic tokens, and 40 deterministic contrast pairs verified
- `npm run check:seo` — passed; 6 indexable and 6 noindex pages verified
- `npm run check:pwa` — passed; cache revision `lauren-english-v1.0.0-644d38728880`, 76 precache entries, 29 CSS paths, and 17 JavaScript paths verified
- `npm run lint:js` — passed
- direct `npx playwright test --reporter=line` with output outside the repository — failed after 4.3 minutes with 58 passed, 9 skipped, and 13 failed tests
- direct source replay of the progress retention boundary — failed the documented contract by retaining 13 of 14 submitted daily keys
- immediate Chromium color measurement after switching the footer to the dark theme — confirmed `rgb(82, 97, 107)` links on `rgb(22, 27, 31)`, matching the failed 2.71:1 assertion
- `npm audit --audit-level=high --ignore-scripts` — failed with 45 development-tooling vulnerabilities: 7 moderate, 26 high, and 12 critical
- `npm audit --omit=dev --audit-level=high --ignore-scripts` — passed with 0 production vulnerabilities
- targeted searches for duplicate IDs, missing image alternatives, unsafe link schemes, inline handlers, unguarded external targets, retired runtime branches, raw DOM injection paths, and stale route/runtime counts

### Verification limitations

- No live URL was supplied. Deployment status, production headers, redirects at the hosting edge, Netlify form delivery, external links, and live caching behavior were not verified.
- No build, formatter, image generator, auxiliary bundle generator, screenshot generator, dependency installation, or source-writing development check was run. This avoided changing files outside `AUDIT.md`.
- `npm run check:dev` was not run because its verification flow intentionally touches source timestamps and can regenerate HTML.
- Browser verification used the repository's two Chromium projects. Firefox, WebKit, real mobile devices, screen readers, other assistive technologies, and manual keyboard review were not executed.
- No Lighthouse, Core Web Vitals, network-throttling, memory, or long-session performance benchmark was run.
- The advisory result reflects the npm registry state on the audit date; it is not a penetration test or a full supply-chain review.
- Archived audit and plan files were used only as historical context. Their former counts and resolved findings were not treated as current evidence.

## 3. Verified strengths

- Canonical ownership is clear: source HTML, CSS, JavaScript, executable registries, and generator templates are authoritative; generated files are not intended for manual editing (`CONTEXT-PROJECT.md:50-84`, `README.md:123-137`).
- The runtime graph is explicit and internally consistent. `scripts/site-config.mjs:37-170` defines 6 indexable and 6 utility documents, while `scripts/pwa-config.mjs:24-74` defines the verified 29 CSS and 17 JavaScript paths.
- The generated Service Worker matches the executable graph and uses scoped, defensive caching: same-origin `GET`, complete basic `200` responses, navigation fallback, atomic install cleanup, and project-prefixed cache cleanup (`service-worker.template.js:26-139`, `service-worker.js:1-90`).
- SEO ownership is centralized. Indexable pages have synchronized titles, descriptions, canonicals, social metadata, and JSON-LD; utility and legal pages are deliberately noindex. Sitemap, robots, and 404 routing match the registry (`scripts/site-config.mjs:37-305`).
- CSS follows a documented token-first layer order and avoids raw colors outside the token layer (`css/style.css:1-33`, `scripts/check-css-quality.mjs:30-162`).
- Global focus presentation, a working skip link, minimum control sizing, reduced-motion handling, and accessible mobile navigation are implemented (`css/base/base.css:90-103,136-168`, `js/modules/mobileNav.js:5-169`).
- The mobile navigation manages `aria-expanded`, `aria-hidden`, `inert`, Escape, Tab containment, breakpoint changes, and focus restoration. The disclosure uses a native dialog with guarded storage and keyboard focus containment (`js/modules/mobileNav.js:5-169`, `js/modules/projectDisclosure.js:17-95`).
- Accordions synchronize button state and panel visibility, while reveal effects fail open when motion, observer support, or initialization is unavailable (`js/modules/accordion.js:1-24`, `js/modules/reveal.js:1-42`).
- The material catalogue retains complete fallback content before JavaScript and renders dynamic records through DOM APIs and `textContent`, avoiding an identified user-controlled HTML injection path (`materialy.html:262-349`, `js/modules/materialsCatalog.js:37-209`).
- The progress journal supplies non-JavaScript fallback content, labels interactive controls, exposes live status, restores focus after rerendering, and falls back to in-memory storage when Web Storage is unavailable (`postepy.html:239-342`, `js/pages/progress-page.js:101-218,260-401`, `js/state/browserStorage.js:1-60`).
- The contact page uses a native POST form with required fields, autocomplete, a honeypot, an explicit success route, and processing information (`kontakt.html:272-368`).
- External new-window links include `noopener noreferrer`, icon-only controls have accessible names, generated content is escaped, and no current inline handler, `javascript:` link, or confirmed user-controlled DOM injection path was found (`scripts/shared-shell.mjs:140-155`, `scripts/content-renderers.mjs:36-49`).
- Images use local JPEG, AVIF, and WebP assets with explicit dimensions, while local fonts use `font-display: swap`; no third-party runtime scripts were found.

## 4. P0 — Critical risks

None detected.

## 5. P1 — Important issues worth fixing next

### [P1-01] Progress retention drops the oldest promised day

**Status:** Resolved

**Classification:** P1 — functional correctness and browser-local data integrity

**Affected area:** progress journal persistence

**Evidence:** `js/state/storage.js:8-9` declares a 14-day retention limit. `js/state/storage.js:26-30` parses stored keys at local midnight, while `js/state/storage.js:65-78` creates the cutoff from the current time of day and subtracts 13 calendar days without resetting the time. The public contract promises up to 14 days in `README.md:197` and `README.md:407`.

**Current behavior:** A source-level replay submitted the current day plus the previous 13 dates. Only 13 keys were retained: `2026-07-13` was discarded and `2026-07-14` became the oldest retained key. Except exactly at midnight, the oldest valid date compares earlier than the cutoff time.

**Impact:** Loading or saving the journal silently deletes one day earlier than documented. Statistics, streak interpretation, and exported data can therefore lose valid user history.

**Recommended direction:** Normalize both retention boundaries to the local start of day, reject impossible and future date keys, and cover the boundary with deterministic tests.

**Verification criteria:** Saving and reloading exactly 14 consecutive local dates retains all 14; the fifteenth-oldest date is removed; invalid and future dates are rejected; reset, statistics, and JSON export remain correct.

### [P1-02] Public project disclosure contradicts the authoritative product positioning

**Status:** Resolved

**Classification:** P1 — product positioning and public content contract

**Affected area:** first-visit experience on indexable routes

**Evidence:** `CONTEXT-PROJECT.md:13-30` requires the interface to feel like a real educational service, forbids public portfolio or simulation labels, and says portfolio information belongs in repository documentation rather than the customer-facing interface. `scripts/site-config.mjs:106-112` enables disclosure on all six indexable routes, and `scripts/shared-shell.mjs:160-174` tells visitors that the site is a KP_Code conceptual project and not an active commercial offer. The behavior is also documented in `README.md:189` and `README.md:399`.

**Current behavior:** A first visit to an indexable page opens a blocking informational dialog whose central message is the portfolio/concept status that the primary project context says must not appear in the interface.

**Impact:** The shipped experience does not satisfy its own authoritative positioning brief and interrupts the intended real-service presentation before users can engage with the page.

**Recommended direction:** Resolve the product decision explicitly. Under the current authoritative context, remove the customer-facing portfolio disclosure and keep project provenance in repository or portfolio documentation and appropriate legal content.

**Verification criteria:** Indexable pages open without portfolio/concept messaging; public copy contains no prohibited positioning labels; legal and operational limitations remain accurate; affected disclosure, content, and browser contracts are updated and pass.

### [P1-03] The complete browser regression gate is not green

**Status:** Partially resolved

**Classification:** P1 — release verification reliability

**Affected area:** Playwright end-to-end suite

**Evidence:** The direct two-project run finished with 58 passed, 9 skipped, and 13 failed tests. Two failures belong to P1-04. The remaining 11 failures reduce to four deterministic causes:

- `tests/e2e/about.spec.mjs:9-18,113-118` requires the portrait and visual column to have equal widths at its internal mobile viewport, while `css/sections/about.css:95-113,139-143` intentionally subtracts `--space-xl` below 480 px; the observed difference was 32 px
- `tests/e2e/pwa.spec.mjs:165-173` calls `new URL(source.srcset)` without a base even though the markup provides root-relative `srcset` values, producing `TypeError: Invalid URL` in both projects
- `tests/e2e/seo-routing.spec.mjs:46-51` queries contact phone and e-mail links globally, but the page now contains equivalent main-content and footer links, producing strict-mode locator violations in both projects
- `tests/e2e/helpers/runtime.mjs:63-84` references the imported `PROJECT_DISCLOSURE` object inside `page.evaluate` without passing it into browser context, producing six `ReferenceError` failures across the theme specification

**Current behavior:** The suite stops affected scenarios before their intended assertions, and the portrait specification disagrees with the current mobile CSS contract.

**Impact:** The repository cannot use its complete browser suite as a release gate, and theme, image-delivery, contact, and portrait regressions lack trustworthy end-to-end confirmation.

**Recommended direction:** Pass disclosure values explicitly into `page.evaluate`, resolve `srcset` against `document.baseURI`, scope contact locators to their intended regions, and establish one intentional portrait-width contract shared by CSS and tests.

**Verification criteria:** The complete Playwright suite passes in both configured Chromium projects with no unexpected skips, console errors, page errors, failed local requests, or repository-side generated output.

### [P1-04] Dark-theme switching creates a transient low-contrast footer state

**Status:** Resolved

**Classification:** P1 — accessibility and theme behavior

**Affected area:** footer links and social controls

**Evidence:** Footer navigation and social links transition their color in `css/sections/footer.css:69-73,138-150`. Light and dark muted tokens differ in `css/tokens/tokens.css:15,88-103`. The browser contrast assertion at `tests/e2e/footer.spec.mjs:29-68,308-316` failed in both projects with 2.710022481221809:1 against a required 4.5:1. A direct immediate measurement after applying the dark theme confirmed `rgb(82, 97, 107)` link text against `rgb(22, 27, 31)`.

**Current behavior:** The dark background applies before the inherited footer link color transition reaches the dark-theme token, briefly leaving the light-theme muted color on the dark surface.

**Impact:** Footer navigation and icon controls pass through a low-contrast state during theme changes, and the repository's accessibility browser contract fails.

**Recommended direction:** Make theme-driven footer text color changes discrete while preserving hover feedback, or otherwise guarantee compliant contrast throughout the entire transition.

**Verification criteria:** Immediate, intermediate, and settled footer text/icon contrast remains at least 4.5:1 in both themes and all configured viewports; hover, focus-visible, and reduced-motion behavior remains correct; both footer tests pass.

### [P1-05] Development tooling contains high and critical dependency advisories

**Status:** Resolved

**Classification:** P1 — build and supply-chain security

**Affected area:** local and CI development dependencies

**Evidence:** All packages are development dependencies in `package.json:39-55`. On the audit date, `npm audit --audit-level=high --ignore-scripts` reported 45 vulnerabilities: 7 moderate, 26 high, and 12 critical. The affected graph includes the image toolchain declared at `package.json:47-49,55`, as well as transitive packages used by linting and the local server. `npm audit --omit=dev` reported 0 vulnerabilities.

**Current behavior:** The audit-date exposure has been remediated. Obsolete and vulnerable development tools were removed or replaced, image processing was migrated to Sharp, ESLint and related tooling were updated, and development and production dependency audits now report zero advisories.

**Impact:** Malformed or untrusted build inputs and compromised development workflows have a larger attack surface. A blind forced audit fix would also introduce breaking dependency changes.

**Recommended direction:** Review and update or replace the obsolete image-processing chain, remove unused direct tools, apply safe patched upgrades, and document any advisory that must remain. Do not use an unreviewed forced upgrade as the acceptance criterion.

**Verification criteria:** A clean install from the committed lockfile succeeds; `npm audit` reports no unaccepted high or critical advisories; image generation, linting, static checks, and the complete browser suite pass after the reviewed dependency changes.

**Resolution evidence:** A clean install from the committed lockfile succeeded; development and production dependency audits report zero advisories; image generation, linting, and relevant static project checks passed; focused PWA verification passed with 10 passed and 0 failed; focused theme verification passed with 6 passed and 0 failed; and the complete browser suite passed with 67 passed, 9 skipped, 0 failed, and 0 flaky.

### [P1-06] Distributed Inter fonts lack repository-visible license evidence

**Status:** Resolved

**Classification:** P1 — third-party license compliance

**Affected area:** local font assets and attribution

**Evidence:** Inter files are shipped from `assets/fonts/` and registered in `scripts/pwa-config.mjs:76-119`. The repository contains only `assets/fonts/OFL-Literata.txt`. README attribution covers Literata and Font Awesome but not Inter (`README.md:208-211`, `README.md:418-421`), while `LICENSE.md:176-205` and `LICENSE.md:489-518` state that third-party materials remain subject to their own terms.

**Current behavior:** Inter is distributed with the official upstream OFL 1.1 notice, equivalent Polish and English README attribution, and validator-enforced licensing evidence for every font file under `assets/fonts/`.

**Impact:** The repository does not preserve complete licensing evidence for all distributed third-party font files, creating avoidable compliance and redistribution ambiguity.

**Recommended direction:** Add the applicable official Inter license/notice, identify the font and source in both README language sections, and extend the existing license validation pattern to cover it.

**Verification criteria:** The exact applicable upstream license or notice is tracked, bilingual attribution is equivalent, the validator checks the pinned text, and no font file lacks identified licensing evidence.

**Resolution evidence:** Embedded metadata identifies the Inter files as version 4.001 from the official `rsms/inter` project at revision `66647c0bb` under the SIL Open Font License 1.1. The exact upstream notice is tracked as `assets/fonts/OFL-Inter.txt`; both README language sections identify its provenance and license; the centralized validator mapping covers all five Inter WOFF2 files and the Literata WOFF2 file, pins both OFL artifacts by SHA-256, and reports missing assets or notices explicitly. Focused `npm run check:pwa` verification passed.

## 6. P2 — Minor refinements

### [P2-01] Two declarations use an undefined line-height token

**Status:** Resolved

**Classification:** P2 — CSS consistency

**Affected area:** CTA panel and material access description typography

**Evidence:** `css/components/cta-panel.css:24-30` and `css/sections/resources.css:209-213` use `var(--line-height-relaxed)`. No matching custom property exists in `css/tokens/tokens.css:1-116`, and the current CSS validator does not detect undefined custom-property references.

**Current behavior:** Both descriptions resolve the canonical unitless `--line-height-relaxed: 1.6` contract in light and dark themes, and the CSS validator rejects unresolved custom-property references without a fallback.

**Impact:** The intended relaxed text rhythm is not guaranteed and can drift when parent typography changes.

**Recommended direction:** Define one justified semantic line-height token or replace both references with an existing canonical value, then validate unresolved custom properties.

**Verification criteria:** Computed line height matches the documented token on both components in both themes, and a static check fails on future undefined custom-property references.

**Resolution evidence:** `css/tokens/tokens.css` defines the shared relaxed line-height token used by both affected declarations. The canonical CSS validator collects project-owned custom-property declarations, supports valid and nested fallbacks, and reports unresolved references with their property, file, and line. `npm run check:css` passed with 74 declared custom properties and no unresolved references, and focused Chromium verification passed with 1 test covering both descriptions in light and dark themes.

### [P2-02] The tracked auxiliary JavaScript bundle is stale

**Status:** Resolved

**Classification:** P2 — generated artifact maintenance

**Affected area:** `assets/build/main.min.js`

**Evidence:** The previous `assets/build/main.min.js:1` contained retired `data-contact-form`, `data-tablist`, and `resources-tab-*` branches. The current entrypoint does not import those branches (`js/main.js:1-9,113-125`), and the canonical runtime and precache correctly exclude `assets/build/` (`README.md:129-131,181-183`, `scripts/pwa-config.mjs:56-74`).

**Current behavior:** The tracked auxiliary bundle represents the current canonical JavaScript source graph and remains outside the active runtime and precache.

**Impact:** It does not affect current application behavior, yet it can mislead maintenance work or a future switch to bundled delivery.

**Recommended direction:** Regenerate it through the declared `build:js` command, or stop tracking it if auxiliary outputs are not required as versioned artifacts.

**Verification criteria:** The tracked bundle contains no retired hooks, matches the current entrypoint, remains outside HTML requests and precache, and is changed only through its generator.

**Resolution evidence:** `assets/build/main.min.js` was regenerated from `js/main.js` through the declared `npm run build:js` generator. Focused static verification confirmed that the canonical graph and generated output contain none of the retired hooks, all HTML documents continue to request `/js/main.js`, and the PWA configuration and generated Service Worker continue to exclude `assets/build/`.

### [P2-03] Missing canonical images can be silently recreated from lossy output

**Status:** Resolved

**Classification:** P2 — asset-pipeline integrity

**Affected area:** image generation

**Evidence:** `scripts/optimize-images.mjs:37-60` copies a public fallback from `assets/img/` into the canonical `assets/image-sources/` path when the canonical source is missing. `scripts/optimize-images.mjs:63-107` then recompresses the fallback and writes all public formats. The README identifies `assets/image-sources/` as the canonical editable input (`README.md:133-137`).

**Current behavior:** Generation requires every configured canonical original to pass a complete presence, readability, image, and dimension preflight before output encoding or writes begin. Public outputs are never promoted to canonical storage, and a separate read-only parity mode compares deterministic expected output with every configured file, using strict decoded-sample bounds for codec-portable AVIF verification.

**Impact:** The pipeline can silently introduce cumulative quality loss and weaken the documented source-of-truth boundary.

**Recommended direction:** Treat a missing canonical source as an error now that migration is complete, and provide a separate explicit migration path if fallback promotion is ever required.

**Verification criteria:** A missing canonical source causes a clear non-writing failure; valid sources regenerate all configured outputs; a read-only parity check detects stale or missing outputs.

**Resolution evidence:** `scripts/optimize-images.mjs` now completes source preflight and in-memory encoding before its first output write, has no fallback-promotion path, and exposes read-only content parity through `npm run check:images`. Exact bytes are used for JPEG, PNG, and WebP; AVIF uses strict decoded-sample bounds to tolerate codec-build variance without committing regenerated binaries. The focused temporary-directory test verified a clear missing-source failure without content or modification-time changes, generation of JPEG, AVIF, and WebP outputs, no-touch successful parity, and detection of both stale and missing outputs. `npm run test:images`, `npm run check:images`, and `git diff --check` passed.

### [P2-04] Runtime installation guidance conflicts with the lockfile workflow

**Classification:** P2 — maintenance documentation

**Affected area:** dependency installation instructions

**Evidence:** The README states that the repository contains a lockfile and prescribes `npm ci` (`README.md:79-88`). The runtime checklist instead prescribes `npm install` at `docs/runtime-checklist.md:5` and `npm install --no-package-lock` at `docs/runtime-checklist.md:50`.

**Current behavior:** Maintainers receive contradictory instructions, including one that explicitly bypasses the committed lockfile.

**Impact:** Verification and deployment can use dependency graphs different from the reviewed lockfile, reducing reproducibility.

**Recommended direction:** Standardize clean verification and deployment on `npm ci`; reserve `npm install` for intentional dependency maintenance and remove the no-lockfile instruction.

**Verification criteria:** README and runtime checklist use one consistent lockfile-based installation contract, and a repository search finds no conflicting production or E2E setup command.

### [P2-05] Core catalogue and journal interactions lack focused browser coverage

**Classification:** P2 — regression coverage

**Affected area:** materials catalogue and progress journal

**Evidence:** `tests/e2e/interactions.spec.mjs:558-589` verifies only navigation from the homepage teaser to the catalogue. Filtering, counts, empty results, and reset are implemented in `js/modules/materialsCatalog.js:127-209`. Goals, check-ins, live status, focus restoration, persistence, reset, and export are implemented in `js/pages/progress-page.js:260-401`. No current browser test targets their production data hooks or `lauren_progress_v1`.

**Current behavior:** The most stateful user features have substantial implementation but no direct end-to-end behavior contract. The 14-day retention defect in P1-01 was therefore not caught by the existing suite.

**Impact:** Functional, keyboard, live-region, persistence, and progressive-enhancement regressions can pass the current targeted interaction tests.

**Recommended direction:** Add focused catalogue and progress scenarios, including JavaScript-disabled fallback coverage and deterministic storage boundaries.

**Verification criteria:** Tests cover catalogue initialization, combined filters, result counts, empty state, reset, and fallback content; journal tests cover goals, `aria-pressed`, live status, focus, reload persistence, 14-day pruning, reset, export, and blocked storage.

## 7. Extra quality improvements

- Add responsive width candidates and `sizes` for the 1600 × 1200 hero assets. Mobile currently receives the same single AVIF/WebP/JPEG URL as desktop (`scripts/image-config.mjs:29-41`, `index.html:160-170`, `kontakt.html:148-159`); the current AVIF files are approximately 436 KB and 306 KB. Validate with throttled transfer and rendering measurements before setting a budget.
- Pin the supported Node/npm contract and add one aggregate, non-writing release-check entrypoint or CI workflow. `README.md:88` explicitly states that no Node version is declared, while `package.json:10-37` exposes strong checks only as separate commands.

## 8. Current readiness conclusion

**Status:** Needs important fixes

The application has no identified P0 blocker, its canonical route/PWA contracts are coherent, and all project-specific static validators pass. Readiness is nevertheless limited by a confirmed browser-local data-loss boundary, contradictory public positioning, an unreliable complete E2E gate, transient footer contrast failure, high and critical development-tooling advisories, and incomplete Inter licensing evidence.

Release readiness should be reconsidered only after all P1 findings are resolved, the complete browser suite passes from a clean lockfile install, dependency advisories are reviewed, and the final tracked diff confirms that generated outputs and documentation match their canonical sources.

## 9. Senior rating

**Rating:** 7/10

The repository demonstrates senior-level structure in source ownership, semantic HTML, token-first CSS, guarded JavaScript, progressive enhancement, SEO registries, PWA generation, and focused static validation. The rating is reduced by one functional data-integrity defect, a fundamental product-positioning contradiction, a red browser gate with multiple deterministic causes, a theme-transition accessibility failure, development supply-chain exposure, and incomplete third-party font licensing. The technical foundation is strong, but the remaining P1 work is too material for a higher final-readiness score.
