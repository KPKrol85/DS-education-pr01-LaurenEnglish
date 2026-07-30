# Lauren English — Development Plan

**Last reviewed:** 2026-07-30
**Project type:** Static multi-page educational frontend and PWA with Node.js assembly tooling
**Plan status:** Active

## Planning principles

- The plan reflects the current verified source, configuration, and repository state.
- Main items are checked only when all required subtasks and verification conditions are complete.
- Canonical source and generator inputs are changed before generated output is refreshed.
- Completed significant changes remain recorded separately in `CHANGELOG.md`.
- Missing live-deployment, cross-browser, assistive-technology, or performance evidence is not treated as a defect.

## Current priorities

1. `PH3-01` — Complete the planned Vite production-build migration as one coherent runtime, PWA, test, and deployment change.

## Planning basis

- `docs/archive/plans/PLAN-2026-07-26.md` preserves the completed runtime-cleanup and maintenance-documentation phases.
- `docs/archive/audits/AUDIT-2026-07-26.md` records all eleven P1 and P2 findings as resolved and the project as ready within the verified scope.
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

**Goal:** Replace direct-source production delivery with one verified Vite multi-page build while preserving the current product, accessibility, routing, PWA, and deployment behavior.

- [ ] **PH3-01 — Migrate production delivery to Vite**
  - [ ] define the target production-build contract and create the required Vite configuration as a new canonical tooling file
  - [ ] add the reviewed Vite development dependency and production commands without introducing a frontend framework
  - [ ] retain `scripts/build-html.mjs` and `scripts/site-config.mjs` as the canonical HTML, route, metadata, and indexing sources before bundling
  - [ ] derive all twelve multi-page HTML build inputs from `ALL_PAGES` and emit a complete isolated publish directory
  - [ ] preserve root-relative routes, legal and utility pages, the Netlify Forms markup, sitemap, robots, and generated `_redirects`
  - [ ] replace the direct CSS and JavaScript production request graph with Vite-built assets while keeping source CSS and ES modules canonical
  - [ ] define the post-migration role or removal path for auxiliary output under `assets/build/` so it cannot conflict with the production build
  - [ ] adapt `scripts/pwa-config.mjs`, `scripts/build-service-worker.mjs`, and `scripts/check-pwa.mjs` to derive and validate the final built asset graph
  - [ ] generate the Service Worker for the publish directory and preserve cache versioning, same-origin response eligibility, navigation fallback, offline coverage, and scoped cache cleanup
  - [ ] keep the source-oriented Python development workflow explicit or replace it only with one documented equivalent that preserves live reload and local PWA cleanup
  - [ ] make Playwright serve and verify the final publish output while retaining focused and complete browser-suite entrypoints
  - [ ] establish a repository-owned Netlify build and publish contract for the Vite output; switch publishing from the repository root only after the complete migration passes
  - [ ] update `CONTEXT-PROJECT.md`, both README language sections, `docs/runtime-checklist.md`, and other directly affected build documentation after the executable contract is final
  - [ ] verify a clean install, production build, generated-output integrity, static validators, image parity, JavaScript linting, focused PWA behavior, and the complete browser suite
  - **Completion condition:** one documented Vite command produces a deployable publish directory containing all twelve registered pages and required assets; the generated Service Worker and Netlify contract consume that output; relevant static and browser checks pass; and no direct-source or auxiliary production contract remains active by accident

## Optional future improvements

These items are evidence-supported opportunities. They are not release blockers or unresolved audit findings.

- [ ] **O-01 — Add measured responsive hero-image variants**
  - [ ] measure current hero transfer and rendered widths at representative supported viewports before choosing candidates or a byte budget
  - [ ] extend `scripts/image-config.mjs` with justified width candidates and retain canonical originals under `assets/image-sources/`
  - [ ] extend the Sharp pipeline and read-only parity coverage to generate and validate every approved JPEG, AVIF, and WebP candidate without fallback promotion
  - [ ] add accurate `srcset` and `sizes` contracts to the homepage and contact hero markup
  - [ ] align PWA asset ownership, request budgets, and focused image-delivery coverage with browser candidate selection
  - [ ] run the focused image, PWA, responsive, and visual verification required by the final candidate set
  - **Depends on:** `PH3-01`
  - **Value:** reduce unnecessary hero-image transfer on narrow viewports using measured, source-generated candidates
  - **Scope boundary:** non-blocking performance refinement; do not select widths or budgets without measurements
  - **Completion condition:** supported viewports select an appropriate generated candidate, intrinsic dimensions and visual quality remain correct, and the measured transfer result satisfies the approved budget

- [ ] **O-02 — Pin the Node toolchain and add a non-writing release check**
  - [ ] define the supported Node.js and npm contract after the Vite toolchain requirements are final
  - [ ] record the versions in machine-readable repository configuration and equivalent README documentation
  - [ ] add one aggregate release-check command composed only of read-only validators and lint checks
  - [ ] document which generated-output, browser, and deployment checks remain separate from the non-writing aggregate command
  - [ ] verify the aggregate command from a clean lockfile installation and confirm that it leaves tracked files unchanged
  - **Depends on:** `PH3-01`
  - **Value:** make local and CI verification use one explicit runtime and one reproducible static gate
  - **Scope boundary:** non-blocking workflow hardening; CI provider configuration is not required unless separately approved
  - **Completion condition:** supported tool versions are machine-readable, the aggregate command is documented and passes from the committed lockfile, and its execution produces no tracked-file diff
