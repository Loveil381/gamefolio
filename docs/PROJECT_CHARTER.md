# Project Charter: Personal Portfolio & Gaming Blog

## Project Vision
A production-grade developer portfolio designed to showcase playable browser games, technical blog posts, and detailed case studies. 
**Target Audience:** Hiring managers and tech recruiters looking for high-quality engineering and design skills.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** TailwindCSS
- **Animations:** Framer Motion, React Three Fiber (for 3D elements)
- **Content:** MDX (for blog posts)
- **Deployment:** Vercel

## Site Map
1. **Home:** 3D hero section with dynamic SVG animations.
2. **Games:** Gallery showcasing projects with playable browser game iframes.
3. **Blog:** Technical articles and tutorials powered by MDX.
4. **About:** Developer background featuring an animated timeline.
5. **Contact:** Reach out and professional links.

## Non-Functional Requirements
- **Performance:** Lighthouse score 90+ across all metrics.
- **Responsiveness:** Fully mobile responsive across all device sizes.
- **Theming:** Full dark/light mode support.
- **SEO:** Highly optimized for search engines.
- **Accessibility:** WCAG AA compliant.

## Milestones
- **Phase 1:** Project scaffolding and design system setup.
- **Phase 2:** Development of core pages (Home, About, Contact).
- **Phase 3:** Games gallery and iframe integration.
- **Phase 4:** Blog infrastructure and initial content integration.
- **Phase 5:** Final polish, performance tuning, and Vercel deployment.

## Architecture Decision Records (ADR)
- **ADR-001:** Why Next.js App Router over Pages Router (performance, layouts, server components)
- **ADR-002:** Why MDX over a headless CMS (simplicity, version control, developer-friendly)
- **ADR-003:** Why TailwindCSS over CSS Modules (utility-first, design token integration, smaller bundle)
- **ADR-004:** Why Vitest over Jest (faster, native ESM support, better DX with Vite)

## Definition of Done (DoD)
A feature is "done" when:
- TypeScript compiles with zero errors
- Component has JSDoc documentation
- Component has at least one test
- Passes `npm run lint` with no warnings
- Lighthouse score doesn't drop below 90
- Responsive on mobile, tablet, desktop
- Works in both dark and light mode
- Committed with conventional commit message on a feature branch
