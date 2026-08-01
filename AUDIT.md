# Lauren English — Final Technical Front-End Audit

**Audit date:** 2026-07-31

**Project type:** Static multi-page educational frontend and PWA

**Audit mode:** Final repository and implementation review

**Current readiness:** Needs Important Fixes

## 1. Executive assessment

Lauren English is a coherent, source-first static frontend with strong repository-specific validation, progressive enhancement, accessible interaction patterns, deterministic content assembly, and a carefully scoped PWA implementation. The current executable registries, generated HTML regions, route metadata, image outputs, and Service Worker graph are internally aligned. Static checks passed, both development and production dependency audits reported zero vulnerabilities, and 71 of 86 direct Chromium test executions passed.

The project is not fully release-ready because the documented full browser gate is currently red. All six failures are confined to three progress-journal tests repeated in the desktop and mobile projects. Source and failure inspection show that the test setup re-applies seeded storage on every reload and expects focus after a synthetic selection that did not first focus the control. These failures do not currently demonstrate broken journal behavior, but they prevent the suite from reliably proving persistence, reset, and focus contracts. A separate low-impact README issue preserves undated task-specific verification commentary in otherwise evergreen project documentation.

## 2. Audit scope and verification

The review covered:

- repository state, tracked and ignored boundaries, project context, active plan, changelog, archived audits, README, runtime checklist, CSS architecture notes, and licensing
- all twelve published HTML documents, shared shell generation, route and indexing registries, content/data renderers, legal pages, contact-form contract, and generated routing assets
- the token-first CSS graph, responsive layouts, light and dark themes, focus treatment, reduced-motion handling, controls, forms, cards, navigation, and page-specific styles
- canonical JavaScript modules, guarded initialization, mobile navigation, accordions, materials filtering, anchor focus, theme persistence, progress-journal state, storage normalization, and failure fallbacks
- image-source configuration and generated parity, local fonts, manifest assets, Service Worker template and generated output, offline behavior, request budgets, and cache eligibility rules
- Node assembly tooling, Python development server, Playwright configuration and tests, dependency state, deployment documentation, repository-visible security controls, and third-party attribution

Repository state was clean on `main` and synchronized with `origin/main` before the audit. No explicit live URL was supplied, so no deployed environment, hosting dashboard, response headers, Netlify Forms submission, install prompt, or production Service Worker lifecycle was verified.

Checks executed:

- `npm run check:data` — passed; 3 package keys and 15 material records validated
- `npm run check:content` — passed; public-content integrity validated across 12 pages
- `npm run check:html` — passed; 12 pages, 9 shared-shell pages, and 3 route assets matched generated contracts
- `npm run check:css` — passed; 28 canonical CSS paths, 74 resolved custom properties, zero raw colors, zero ID selectors, and 40 declared light/dark contrast pairs validated
- `npm run check:seo` — passed; 6 indexable and 6 noindex documents matched routing and metadata registries
- `npm run check:pwa` — passed; 28 CSS paths, 16 JavaScript paths, 74 precache entries, manifest assets, and critical budgets validated
- `npm run check:images` — passed; all outputs matched 3 canonical image sources
- `npm run test:images` — passed; 1 test passed and 0 failed
- `npm run lint:js` — passed
- `npm audit --audit-level=high --ignore-scripts` — passed; 0 vulnerabilities
- `npm audit --omit=dev --audit-level=high --ignore-scripts` — passed; 0 vulnerabilities
- `npx playwright test --reporter=line` — failed; 71 passed, 9 skipped, and 6 failed across Chromium desktop and mobile

The direct Playwright command intentionally reused the already validated repository output and skipped the writing build step. `npm ci`, production builds, image generation, the mutating development-workflow check, Lighthouse, non-Chromium browsers, real devices, assistive technologies, deployment, and live monitoring were not executed.

## 3. Verified strengths

- The route registry is explicit and internally consistent: six indexable routes and six technical or legal documents are synchronized with HTML metadata, `sitemap.xml`, `robots.txt`, and `_redirects`.
- Shared generated regions have read-only parity checks, while page-specific content remains canonical in the root HTML documents.
- The runtime loads canonical modular CSS and JavaScript sources without framework or third-party runtime dependencies; auxiliary bundles remain outside the active request and precache graphs.
- Token-first CSS separates foundations, components, sections, pages, themes, and utilities. Declared contrast pairs, focus guards, 44-pixel controls, reduced-motion handling, responsive containment, and dual-theme semantics are validated.
- Progressive enhancement preserves meaningful catalogue content and legal/contact information without JavaScript, while guarded module initialization prevents unrelated features from breaking the page.
- Mobile navigation implements inert closed state, focus containment, Escape handling, focus return, breakpoint synchronization, and accurate ARIA state.
- Progress data is normalized to known tracks and bounded goals, malformed dates are rejected, retained activity is limited to fourteen local dates, and blocked Web Storage falls back to memory.
- The contact form retains native required-field validation, Netlify Forms markers, a honeypot, accurate privacy context, and a dedicated completion route.
- The Service Worker handles only eligible same-origin `GET` requests, keeps navigations network-first, avoids caching partial or failed responses, and deletes only obsolete caches carrying the project prefix.
- PWA configuration validates install icons, shortcuts, screenshots, offline assets, 28 CSS paths, 16 JavaScript paths, 74 precache entries, five requested local font files, and the homepage hero budget.
- Canonical image sources and generated JPEG, AVIF, and WebP outputs have deterministic read-only parity checks.
- The committed dependency graph currently reports zero development and production vulnerabilities, and bundled fonts and inline icon sources have repository-visible license attribution.
- Browser coverage exercises routing, metadata, responsive containment, keyboard interactions, themes, reduced motion, PWA caching, offline behavior, catalogue enhancement, and local journal behavior in desktop and mobile Chromium profiles.

## 4. P0 — Critical risks

None detected.

## 5. P1 — Important issues worth fixing next

### [P1-01] Progress-journal fixtures invalidate reload and focus verification

**Status:** Resolved

- **Resolution evidence:** The focused progress-journal suite passed with 8 tests, and the complete Playwright suite passed with 77 passed, 9 skipped, and 0 failed.
- **Classification:** Contract mismatch
- **Affected area:** Playwright test architecture, progress-journal persistence and focus verification
- **Evidence:** `tests/e2e/progress-journal.spec.mjs:29-31`, `tests/e2e/progress-journal.spec.mjs:44-53`, `tests/e2e/progress-journal.spec.mjs:83-117`, `tests/e2e/progress-journal.spec.mjs:145-173`
- **Current behavior:** `seedProgress()` registers a persistent `page.addInitScript()` that writes the original fixture state on every navigation. The retention test therefore restores goal `6` after selecting `7`, and the reset test restores seeded goal `7` after clearing storage instead of retaining default goal `3`. The focus test calls `selectOption()` without first focusing the select, while the implementation restores focus only when the changing control is the active element. The direct suite consequently reports the same three failures in both Chromium projects: 6 failed, 71 passed, and 9 skipped.
- **Impact:** The documented full browser gate cannot complete successfully and currently produces false negatives for the journal's persistence, reset, and focus contracts. This weakens release confidence and can conceal a future real regression behind known test failures.
- **Recommended direction:** Seed journal storage once without reapplying the fixture after a tested reload, and make the synthetic selection reproduce a genuinely focused user interaction before asserting focus restoration.
- **Verification criteria:** The journal tests pass in both desktop and mobile projects while proving that a changed goal survives a real reload, reset data stays cleared after reload, and focus is preserved from an explicitly focused control; the complete suite then finishes with no unexpected failures.

## 6. P2 — Minor refinements

### [P2-01] README contains transient task-verification commentary

**Status:** Resolved

- **Resolution evidence:** The Polish and English testing sections retain factual parity and now direct readers to the relevant audit or release record for execution results.
- **Classification:** Documentation mismatch
- **Affected area:** Bilingual repository documentation, testing status
- **Evidence:** `README.md:148`, `README.md:360`
- **Current behavior:** Both language sections include an undated statement that “this documentation-only task” did not run builds, validators, or tests, without identifying the task or defining how the sentence relates to the evergreen project documentation.
- **Impact:** Readers cannot reliably distinguish a historical task note from the project's current verification state, and the statement becomes stale as soon as later validation is performed.
- **Recommended direction:** Remove the transient task-history sentence or replace it with an evergreen explanation that validation results are reported by the relevant audit or release record.
- **Verification criteria:** The Polish and English testing sections retain factual parity and describe stable project verification contracts without an unidentified task-specific result.

## 7. Extra quality improvements

### Add measured responsive hero image candidates

- **Relevant area:** Image pipeline, responsive performance
- **Current evidence:** `scripts/image-config.mjs:31-34` defines one `1600 × 1200` homepage hero output per format, while `index.html:160-168` supplies one URL per AVIF, WebP, and JPEG source without width descriptors or `sizes`. The current selected AVIF remains within the configured byte budget.
- **Potential value:** Measured smaller candidates could reduce transferred hero bytes on narrow displays while retaining the existing art direction and explicit dimensions.
- **Scope boundary:** This is optional until real-device or lab measurement shows a material benefit; the current image contract is valid and passes its configured budget.

### Pin the Node toolchain and expose one read-only static gate

- **Relevant area:** Development reproducibility, maintenance workflow
- **Current evidence:** `README.md:90` and `README.md:302` explicitly state that no Node.js version is declared, while `package.json:7-38` exposes the relevant validators as separate commands without one non-writing aggregate check.
- **Potential value:** A reviewed Node/npm contract and one aggregate read-only command would reduce environment drift and make local or CI static verification easier to reproduce.
- **Scope boundary:** This is an optional workflow enhancement; the committed lockfile is present, current lint/static checks pass, and both dependency audits are clean.

## 8. Current readiness conclusion

**Status:** Needs Important Fixes

The current product implementation is strong within its documented static-site and PWA scope, and no critical runtime, security, accessibility, content, routing, dependency, or offline defect was confirmed. Release readiness remains below the final threshold because the complete documented browser gate is not trustworthy while six known progress-journal test failures remain. Correcting the test contract and rerunning the complete suite are the necessary next steps; the README cleanup is minor.

## 9. Senior rating

**Rating:** 8/10

The project demonstrates mature source organization, unusually strong repository-specific validation, accessible interaction architecture, resilient PWA behavior, deterministic content and image contracts, clean dependencies, and broad browser coverage. The rating is constrained by a repeatable failure in the complete verification gate and a small documentation hygiene issue, not by a confirmed user-facing runtime regression.
