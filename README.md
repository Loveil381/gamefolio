# Gamefolio

A modern, interactive portfolio for showcasing frontend engineering skills and web-based games.

![CI Status](https://github.com/Loveil381/gamefolio/actions/workflows/ci.yml/badge.svg)

---

> **Screenshot Placeholder**
> *(Insert an eye-catching screenshot of the home page or a featured game here once the design is finalized).*

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Testing:** [Vitest](https://vitest.dev/) & React Testing Library

## ✨ Features

- **Interactive Games:** Playable HTML5 Canvas games built from scratch (e.g., classic Snake).
- **Responsive Design:** A fully responsive layout supporting all device sizes.
- **Dark Mode:** System-aware thematic toggle with smooth transitions.
- **Blog Infrastructure:** MDX-based blogging system for technical articles.
- **Modern Aesthetics:** Vibrant design with glassmorphism and micro-animations.

## 🛠️ Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/Loveil381/gamefolio.git
cd gamefolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Copy `.env.example` to create your local environment file:

```bash
cp .env.example .env.local
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build and Test

To build the application for production:

```bash
npm run build
```

To run the automated test suite:

```bash
npx vitest run
```

To run linter checks:

```bash
npm run lint
```

## 📁 Project Structure

```plaintext
gamefolio/
├── .github/          # GitHub Actions workflows
├── public/           # Static assets (images, fonts, raw games)
├── src/
│   ├── app/          # Next.js App Router pages and layouts
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions and shared logic
│   └── types/        # TypeScript type definitions
├── .env.example      # Example environment variables
├── package.json      # Project dependencies and scripts
├── tailwind.config.ts # Tailwind CSS configuration
└── vercel.json       # Deployment configuration for Vercel
```

## 🌐 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to your GitHub repository.
2. Import the project into Vercel.
3. Vercel will automatically detect Next.js and apply the correct build settings (also defined in `vercel.json`).
4. Ensure environment variables correspond to deployment environments.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
