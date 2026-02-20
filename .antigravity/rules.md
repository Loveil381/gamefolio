# Workspace Rules — Gamefolio

## Project Context
- This is a Next.js 14 project using App Router and TypeScript strict mode
- Deployment target: Vercel (static + edge functions)
- Package manager: npm

## Before Writing Code
- Always check existing code patterns and components before creating new files
- Reuse components from `src/components/ui/` whenever possible
- Follow the design tokens defined in `src/lib/design-tokens.ts`

## Code Patterns
- Use Server Components by default. Only add "use client" when component needs interactivity, hooks, or browser APIs
- SVG animations should be inline React components in `src/components/svg/`, not external .svg files
- All data fetching should happen in Server Components or `src/lib/` utility functions
- Use `@/` path alias for all imports (e.g., `import { Button } from '@/components/ui/button'`)

## After Writing Code
- Run `npm run lint` after making changes
- Run `npm run build` to verify no build errors before suggesting task completion
- Verify dark mode works by checking both themes

## Commit Rules
- Stage only related files per commit
- Use conventional commit messages
- Do not commit `.env` files or secrets
