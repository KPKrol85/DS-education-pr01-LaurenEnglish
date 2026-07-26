# Changelog

All significant changes to this project are documented in this file.

## [Unreleased]

### Removed

- Removed retired contact-form and progress-tracker branches from canonical JavaScript and the PWA precache graph.

### Documentation

- Aligned the runtime checklist with canonical asset, route, indexing, published-page, and precache registries.

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
