# Global Rules & Standards

This document defines the core rules, standards, and guidelines that all AI agents and developers must adhere to when working on this project.

## Code Standards
- **TypeScript:** Always use TypeScript strict mode. The `any` type is strictly forbidden.
- **Components:** Use functional components only. No class components are allowed.
- **Documentation:** All components must include JSDoc comments explaining their purpose and props.
- **Naming Conventions:**
  - File names: `kebab-case` (e.g., `button-group.tsx`).
  - Component names: `PascalCase` (e.g., `ButtonGroup`).
- **Folder Structure:** Code must be organized into:
  - `src/components/`
  - `src/hooks/`
  - `src/lib/`
  - `src/types/`
  - `src/app/`

## Git Standards
- **Commits:** Follow conventional commits (e.g., `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`).
- **Branching:** Never commit directly to `main`. Always create feature branches.
- **Atomicity:** Each commit should be atomic, representing one logical change.

## Quality Standards
- **Planning:** Always create an implementation plan before writing any code.
- **Testing:** Write component tests for all new components.
- **Linting:** Ensure all code passes `npm run lint` without any warnings before committing.
- **Styling:** Never use inline styles. Use TailwindCSS classes exclusively.
- **Images:** All images must use the Next.js `<Image>` component for optimization.

## Agent Behavior
- **Terminal Execution:** Never auto-execute terminal commands without explicit user approval.
- **Transparency:** Always explain what you are about to do before taking action.
- **Complex Tasks:** If a task is complex, break it into smaller sub-tasks and present the plan for approval first.
