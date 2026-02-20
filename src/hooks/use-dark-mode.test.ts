import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useDarkMode } from './use-dark-mode';

describe('useDarkMode', () => {
    let mockMatchMedia: any;

    beforeEach(() => {
        // Reset DOM
        document.documentElement.className = '';
        localStorage.clear();

        // Mock matchMedia
        mockMatchMedia = vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));
        window.matchMedia = mockMatchMedia;
    });

    it('initializes with system theme by default', () => {
        const { result } = renderHook(() => useDarkMode());

        expect(result.current.theme).toBe('system');
        // Default system in our mock is light
        expect(result.current.isDark).toBe(false);
        expect(document.documentElement.classList.contains('light')).toBe(true);
    });

    it('toggles theme correctly', () => {
        const { result } = renderHook(() => useDarkMode());

        act(() => {
            result.current.toggleTheme();
        });

        expect(result.current.theme).toBe('dark');
        expect(result.current.isDark).toBe(true);
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(localStorage.getItem('theme')).toBe('dark');
    });
});
