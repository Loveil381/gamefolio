/**
 * Design Tokens for Gamefolio
 *
 * This file contains the source of truth for design constants.
 * These are mapped to CSS variables in globals.css for Tailwind v4 compatibility.
 * Use these tokens in JS/TS logic, Framer Motion animations, or Three.js canvases.
 */

export const colors = {
    dark: {
        background: '#0a0a0f',
        surface: '#141420',
        border: '#1e1e2e',
        textPrimary: '#f0f0f0',
        textSecondary: '#888898',
    },
    light: {
        background: '#fafafa',
        surface: '#ffffff',
        border: '#e5e5e5',
        textPrimary: '#171717',
        textSecondary: '#737373',
    },
    accent: {
        cyan: '#00f0ff',
        purple: '#a855f7',
        green: '#22c55e',
        amber: '#f59e0b',
    },
} as const;

export const spacing = {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
    '4xl': '6rem', // 96px
} as const;

export const typography = {
    scale: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
    },
} as const;

export const animations = {
    duration: {
        fast: 150, // ms
        normal: 300,
        slow: 500,
        verySlow: 1000,
    },
} as const;
