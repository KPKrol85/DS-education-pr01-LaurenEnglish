# Changelog

All significant changes to LaurenEnglish are documented in this file.

## Entry policy

A change is significant when a future maintainer or the project owner would reasonably need to know that one of the following changed:

- user-visible behavior, including meaningful UI, UX, or public content changes;
- accessibility behavior or accessibility contracts;
- build behavior, build guards, or npm scripts;
- test infrastructure or verification tooling;
- the dependency set;
- deployment or hosting workflow;
- PWA, service-worker, cache, or offline behavior;
- architecture, sources of truth, or important project maintenance contracts.

Judge by impact, not by file count. A small visual change is recorded when it affects behavior, accessibility, or a shared component contract. Editing a file alone does not justify an entry.

Not recorded: improvement-report status updates and archiving, commit-only or tracking-document changes, temporary verification probes, minor internal documentation corrections, and isolated cosmetic adjustments without broader impact.

For each implementation task, determine `Changelog: yes` or `Changelog: no`. Add entries only when authorized within the approved task scope.

## [Unreleased]

### Fixed

- Reduced homepage and contact hero-image transfers with measured 540w, 720w, and 1080w AVIF, WebP, and JPEG candidates selected by viewport density.
- Prevented oversized reveal targets from leaving the materials catalogue hidden on narrow viewports.
- Enforced canonical image-source preflight and added read-only generated-output parity checking without public-fallback promotion or codec-driven binary churn.
- Regenerated the tracked auxiliary JavaScript bundle from the current canonical source graph.
- Defined the canonical relaxed line-height contract and added unresolved custom-property validation with focused light and dark theme coverage.
- Retained exactly fourteen valid local progress-journal days and rejected impossible or future stored dates.
- Stabilized progress-journal reload and focus fixtures and synchronized mobile keyboard anchor navigation with cross-document routing.
- Preserved compliant footer text and icon contrast throughout theme changes.
- Completed development dependency remediation with a clean install, zero-advisory audits, passed image and static validation, focused PWA and theme verification, and complete browser verification with 67 passed, 9 skipped, 0 failed, and 0 flaky.

### Removed

- Retired the transitional Python development server, its Windows launcher, and its dedicated workflow validator, leaving Vite as the single local development architecture.
- Removed the customer-facing Project Disclosure dialog and its obsolete runtime, storage, PWA, and shared-shell contracts.
- Removed retired contact-form and progress-tracker branches from canonical JavaScript and the PWA precache graph.

### Documentation

- Standardized clean setup, verification, E2E, and deployment preparation on the committed lockfile through `npm ci`, reserving `npm install` for intentional dependency maintenance.
- Added pinned Inter OFL evidence, bilingual attribution, and complete font-license validation coverage.
- Aligned the runtime checklist with canonical asset, route, indexing, published-page, and precache registries.
- Corrected the bilingual image-maintenance contract for canonical originals and generated JPEG, AVIF, and WebP outputs.
- Replaced transient task-specific README verification notes with evergreen bilingual validation guidance.

### Build and Tooling

- Migrated the twelve-page production workflow to Vite-generated `dist/` output with hashed CSS and JavaScript, a Service Worker generated and validated from the final asset graph, Playwright verification against `dist/`, and the explicit `npm run build`/`dist` contract for manual terminal deployment to Netlify.
- Consolidated the developer interface on `npm run dev` for the Vite development server and `npm run build` for the production pipeline, pinning the development origin to port `5173` and reassembling shared HTML when an assembler source changes.
- Defined the Node.js 22 and npm 10.9.2 toolchain contract with a non-writing static release gate.

## [1.0.0] - 2026-07-26

### Added

- Added an accessible first-visit project disclosure dialog on indexable routes with versioned browser-local dismissal and a storage-failure fallback.
- Added the contact, privacy, terms, cookies, confirmation, offline, and not-found flows, including Netlify Forms configuration and shared footer navigation.
- Added a complete web app manifest with local install icons, shortcuts, screenshots, and dedicated offline fallback metadata.
- Added the initial static multi-page educational frontend with services, packages, a materials catalogue, browser-local progress tracking, modular JavaScript, and token-first CSS.

### Changed

- Replaced the homepage progress controls with a static teaser that directs users to the dedicated progress journal.
- Established canonical direct CSS and ES module runtime entrypoints while retaining auxiliary minified bundles only for explicit auxiliary builds.
- Consolidated shared shell, routes, SEO metadata, package content, material content, access rules, and generated HTML regions under canonical build-time sources.

### Fixed

- Synchronized the production origin across canonical metadata, JSON-LD, sitemap, and robots while preserving true 404 routing.
- Fixed progress journal layout and focus-preserving rendering across supported responsive widths.
- Fixed mobile drawer, accordion, anchor focus, reduced-motion, and progressive-enhancement behavior for keyboard and no-JavaScript access.
- Hardened Service Worker installation, scoped cache cleanup, network-first navigation, offline fallback, and response validation for failed, redirected, partial, or cross-origin responses.

### Removed

- Removed the retired homepage resource filter from canonical JavaScript, responsive coverage, and the PWA precache graph.

### Documentation

- Added canonical project context, bilingual repository documentation, runtime and CSS architecture guidance, proprietary licensing, and required attributions.

### Build and Tooling

- Added canonical raster sources and deterministic JPEG, AVIF, and WebP generation for configured content images.
- Migrated JavaScript linting to the ESLint 9 flat configuration model.
- Added static HTML and Service Worker assemblers plus a source-first local development server with live reload and scoped PWA cleanup.

### Testing

- Replaced obsolete interaction assertions for retired tab behavior with stable coverage of the current accessible UI contracts.
- Added project-local Playwright suites and static validators for generated HTML, content data, CSS, SEO, PWA, development workflow, responsive layouts, themes, and interactions.
