# Lauren English — Development Plan

**Last reviewed:** 2026-08-01
**Project type:** Static multi-page educational frontend and PWA with Node.js assembly tooling
**Plan status:** Active

## Planning principles

- The plan reflects the current verified source, configuration, and repository state.
- Main items are checked only when all required subtasks and verification conditions are complete.
- Canonical source and generator inputs are changed before generated output is refreshed.
- Completed significant changes remain recorded separately in `CHANGELOG.md`.
- Missing live-deployment, cross-browser, assistive-technology, or performance evidence is not treated as a defect.

## Current priorities

1. `PH3-01` — Define the target Vite build contract without changing the current production workflow.

## Planning basis

- `docs/archive/plans/PLAN-2026-07-26.md` preserves the completed runtime-cleanup and maintenance-documentation phases.
- `docs/archive/audits/AUDIT-2026-07-26.md` records all eleven P1 and P2 findings as resolved and the project as ready within the verified scope.
- `AUDIT.md` records the completed final technical audit dated 2026-07-31; all identified P1 and P2 findings are resolved, and the project is ready within the verified scope.
- No active P0, P1, or P2 findings remain; current work is roadmap-driven rather than audit-remediation work.
- The current production contract intentionally serves `/css/style.css` and `/js/main.js` directly until the separately planned Vite migration is complete.
- The root publish directory and current Netlify workflow must remain unchanged until the Vite output, PWA graph, browser coverage, and deployment contract are verified together.
- Resolved audit findings are not reopened without new current evidence.

## Verified completed baseline

- [x] **PH1-01 — Remove retired interaction branches**
  - [x] remove obsolete contact-form and progress-tracker ownership from canonical JavaScript
  - [x] synchronize the runtime registry and generated Service Worker
  - [x] preserve the native contact form and active progress journal contracts
  - [x] complete focused static and browser verification
  - **Evidence:** `docs/archive/plans/PLAN-2026-07-26.md`

- [x] **PH2-01 — Align the runtime checklist with executable registries**
  - [x] use the canonical CSS, JavaScript, route, indexing, and published-page registries
  - [x] remove contradictory fixed counts and incomplete route coverage
  - [x] verify one internally consistent maintenance contract
  - **Depends on:** `PH1-01`
  - **Evidence:** `docs/archive/plans/PLAN-2026-07-26.md`

- [x] **PH2-02 — Correct the bilingual image-maintenance contract**
  - [x] identify `assets/image-sources/` as canonical editable input
  - [x] identify JPEG, AVIF, and WebP files under `assets/img/` as generated output
  - [x] preserve factual parity between the Polish and English README sections
  - **Evidence:** `docs/archive/plans/PLAN-2026-07-26.md`

## Phase 3 — Vite production-build migration

**Goal:** Replace direct-source production delivery with a verified Vite multi-page build while preserving the current product, accessibility, routing, PWA, testing, and deployment behavior.

- [ ] **PH3-01 — Define the target Vite build contract**

  - [ ] inspect the current HTML assembly, route registry, asset graph, Service Worker generation, Playwright server, and Netlify workflow
  - [ ] define the dedicated publish directory and its required twelve-page output
  - [ ] define which files remain canonical source and which files become generated production output
  - [ ] define how `scripts/build-html.mjs` and `scripts/site-config.mjs` run before Vite bundling
  - [ ] define how static route assets, legal pages, utility pages, Netlify Forms markup, sitemap, robots, and `_redirects` reach the publish directory
  - [ ] define the migration boundary without changing the current production, PWA, Playwright, or Netlify contracts
  - **Completion condition:** the target build sequence, source ownership, publish contents, and migration boundaries are documented and supported by the current project structure

- [ ] **PH3-02 — Implement an isolated Vite multi-page build**

  - [ ] add the reviewed Vite development dependency and required configuration without introducing a frontend framework
  - [ ] add development and production commands that do not replace the current workflow prematurely
  - [ ] derive all twelve HTML inputs from the canonical `ALL_PAGES` registry
  - [ ] run the existing HTML assembly before Vite processes the pages
  - [ ] emit all pages and required static assets into the dedicated publish directory
  - [ ] preserve root-relative routes, legal and utility pages, Netlify Forms markup, sitemap, robots, and `_redirects`
  - [ ] confirm that the isolated build does not modify or replace the current root-publish contract
  - **Depends on:** `PH3-01`
  - **Completion condition:** one isolated Vite command produces a complete twelve-page publish directory without switching the active production workflow

- [ ] **PH3-03 — Integrate the Vite production asset graph**

  - [ ] make the built HTML consume Vite-generated CSS and JavaScript assets
  - [ ] keep canonical CSS and ES module sources under their current source ownership
  - [ ] preserve root-relative navigation, images, fonts, icons, manifest references, and page-specific behavior
  - [ ] define the final role or removal path for auxiliary output under `assets/build/`
  - [ ] ensure no direct-source and auxiliary production asset contracts remain active accidentally
  - [ ] adapt relevant read-only validators to the built asset graph where required
  - **Depends on:** `PH3-02`
  - **Completion condition:** the isolated publish output uses one consistent Vite-generated production asset graph while canonical source ownership remains clear

- [ ] **PH3-04 — Integrate the PWA and Service Worker with the publish output**

  - [ ] adapt `scripts/pwa-config.mjs`, `scripts/build-service-worker.mjs`, and `scripts/check-pwa.mjs` to derive and validate the final built asset graph
  - [ ] generate the Service Worker inside the dedicated publish directory
  - [ ] preserve deterministic cache versioning and scoped stale-cache cleanup
  - [ ] preserve same-origin request eligibility, network-first navigation, offline fallback, and known-page coverage
  - [ ] include all required built CSS, JavaScript, fonts, images, icons, manifest assets, pages, and offline resources
  - [ ] confirm that source and generated Service Worker ownership remains explicit
  - **Depends on:** `PH3-03`
  - **Completion condition:** the publish directory contains a generated and validated Service Worker that consumes the Vite-built graph and preserves the existing PWA behavior

- [ ] **PH3-05 — Align development, Playwright, and Netlify workflows**

  - [ ] preserve the source-oriented Python development workflow or replace it only with one reviewed equivalent
  - [ ] preserve live reload, HTML assembly, and local PWA cleanup during development
  - [ ] make Playwright serve and verify the dedicated publish directory
  - [ ] retain focused and complete browser-suite entrypoints
  - [ ] define the repository-owned Netlify build command and publish directory
  - [ ] keep the root publishing workflow active until the isolated build, PWA graph, and browser coverage pass together
  - [ ] switch Netlify publishing only after the complete migration contract is verified
  - **Depends on:** `PH3-04`
  - **Completion condition:** development remains reliable, Playwright verifies the final publish output, and Netlify has one explicit Vite build-and-publish contract

- [ ] **PH3-06 — Finalize documentation and migration verification**

  - [ ] update `CONTEXT-PROJECT.md`, both README language sections, `docs/runtime-checklist.md`, and directly affected build documentation
  - [ ] remove or revise documentation describing the retired direct-source production contract
  - [ ] verify a clean lockfile installation and the final production build
  - [ ] verify generated-output integrity, static validators, image parity, JavaScript linting, and focused PWA behavior
  - [ ] run the complete browser suite against the final publish output
  - [ ] confirm that no unintended direct-source, auxiliary-build, root-publish, or obsolete Service Worker contract remains active
  - [ ] record the completed migration in `CHANGELOG.md`
  - **Depends on:** `PH3-05`
  - **Completion condition:** one documented Vite command produces the deployable twelve-page publish directory; the Service Worker, Playwright, and Netlify contracts consume that output; all required checks pass; and documentation matches the executable project state

## Optional future improvements

These items are evidence-supported opportunities. They are not release blockers or unresolved audit findings.

- [ ] **O-01 — Add measured responsive hero-image variants**
  - [ ] measure current hero transfer and rendered widths at representative supported viewports before choosing candidates or a byte budget
  - [ ] extend `scripts/image-config.mjs` with justified width candidates and retain canonical originals under `assets/image-sources/`
  - [ ] extend the Sharp pipeline and read-only parity coverage to generate and validate every approved JPEG, AVIF, and WebP candidate without fallback promotion
  - [ ] add accurate `srcset` and `sizes` contracts to the homepage and contact hero markup
  - [ ] align PWA asset ownership, request budgets, and focused image-delivery coverage with browser candidate selection
  - [ ] run the focused image, PWA, responsive, and visual verification required by the final candidate set
  - **Depends on:** `PH3-06`
  - **Value:** reduce unnecessary hero-image transfer on narrow viewports using measured, source-generated candidates
  - **Scope boundary:** non-blocking performance refinement; do not select widths or budgets without measurements
  - **Completion condition:** supported viewports select an appropriate generated candidate, intrinsic dimensions and visual quality remain correct, and the measured transfer result satisfies the approved budget

- [ ] **O-02 — Pin the Node toolchain and add a non-writing release check**
  - [ ] define the supported Node.js and npm contract after the Vite toolchain requirements are final
  - [ ] record the versions in machine-readable repository configuration and equivalent README documentation
  - [ ] add one aggregate release-check command composed only of read-only validators and lint checks
  - [ ] document which generated-output, browser, and deployment checks remain separate from the non-writing aggregate command
  - [ ] verify the aggregate command from a clean lockfile installation and confirm that it leaves tracked files unchanged
  - **Depends on:** `PH3-06`
  - **Value:** make local and CI verification use one explicit runtime and one reproducible static gate
  - **Scope boundary:** non-blocking workflow hardening; CI provider configuration is not required unless separately approved
  - **Completion condition:** supported tool versions are machine-readable, the aggregate command is documented and passes from the committed lockfile, and its execution produces no tracked-file diff
