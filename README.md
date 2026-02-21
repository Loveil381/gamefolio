# 🎮 Gamefolio

A high-performance, interactive developer portfolio built with the latest web technologies. This project showcases visually rich web experiences and playable browser-based games, emphasizing **Server-Side Rendering (SSR)**, **accessibility**, and **modern UI/UX design**.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://gamefolio-three.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🔗 **Live Demo:** [https://gamefolio-three.vercel.app](https://gamefolio-three.vercel.app)

---

## ✨ Features

- **🕹️ Playable Browser Games:** Integrated HTML5 Canvas games (Snake, Space Shooter) with smooth loops and mobile touch support.
- **🚀 Advanced SSR/RSC:** Optimized with Next.js App Router and React Server Components for lightning-fast initial loads.
- **🎨 Cyberpunk Aesthetic:** Responsive design featuring glassmorphism, glowing neon SVGs, and fluid micro-animations.
- **📝 MDX Blog:** Technical blogging infrastructure with syntax highlighting and automatic metadata extraction.
- **🔒 Production Ready:** 100% TypeScript (strict mode), automated Vitest suite, and accessible UI components.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), React 19 |
| **Styling** | Tailwind CSS, Lucide Icons |
| **Animation** | Framer Motion, Pure CSS SVG Animations |
| **Content** | MDX, Gray-matter |
| **Testing** | Vitest, React Testing Library, ESLint |
| **Icons** | Custom SVGs, Lucide |

---

## 🏗️ Architecture Overview

This project follows the **Client-Server Split** pattern recommended by Next.js to maximize performance while maintaining interactivity:

- **Server Components (RSC):** All layout shells, data-fetching logic, and static content (e.g., Blog posts, Game lists) are rendered on the server.
- **Client Components:** Interactivity (Form validation, Game loops, Filter logic) and complex animations are encapsulated in highly focused client-side wrappers.
- **Design System:** Built on top of a centralized set of Tailwind design tokens for consistent spacing, colors, and typography.

---

## 📁 Project Structure

```bash
gamefolio/
├── .github/          # CI/CD Workflows (GitHub Actions)
├── public/           # Static assets & standalone Canvas games
├── src/
│   ├── app/          # Next.js App Router (Pages, Layouts, Metadata)
│   ├── components/
│   │   ├── layout/   # Global UI (Header, Footer, Navigation)
│   │   ├── ui/       # Atom-level Design System components
│   │   └── [feature] # Feature-specific components (Home, Games, Blog)
│   ├── hooks/        # Reusable React hooks (Theme, Storage)
│   ├── lib/          # Utilities, shared data, and MDX processing
│   └── types/        # Global TypeScript interfaces
├── tailwind.config.ts # Design system configuration
└── vercel.json       # Deployment optimization
```

---

## 🚀 Getting Started

### 1. Prerequisite
Ensure you have [Node.js 18+](https://nodejs.org/) installed.

### 2. Installation
```bash
git clone https://github.com/Loveil381/gamefolio.git
cd gamefolio
npm install
```

### 3. Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 4. Build & Verify
```bash
npm run build     # Production build
npm run lint      # Code quality check
npx vitest run    # Run test suite
```

---

## 🌐 Deployment

The project is optimized for **Vercel**. Every push to `main` triggers an automatic deployment.

1. Connect your GitHub repository to Vercel.
2. Vercel automatically detects the Next.js framework.
3. Set any necessary environment variables in the Vercel dashboard.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ by Gamefolio Developer*
