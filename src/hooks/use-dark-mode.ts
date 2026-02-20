import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useDarkMode() {
    const [theme, setTheme] = useState<Theme>('system');
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Read from local storage on mount
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const applyTheme = (currentTheme: Theme) => {
            const isDarkMode = currentTheme === 'dark' || (currentTheme === 'system' && systemPrefersDark);

            setIsDark(isDarkMode);

            if (isDarkMode) {
                root.classList.add('dark');
                root.classList.remove('light');
            } else {
                root.classList.add('light');
                root.classList.remove('dark');
            }
        };

        applyTheme(theme);

        // Save user preference
        if (theme !== 'system') {
            localStorage.setItem('theme', theme);
        } else {
            localStorage.removeItem('theme');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => {
            if (prev === 'system') {
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                return systemPrefersDark ? 'light' : 'dark';
            }
            return prev === 'dark' ? 'light' : 'dark';
        });
    };

    return { theme, isDark, setTheme, toggleTheme };
}
