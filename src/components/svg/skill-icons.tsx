import React from 'react';

export interface SkillIconProps extends React.SVGProps<SVGSVGElement> {
    /** Optional CSS class name */
    className?: string;
    /** Size of the icon, default 32px */
    size?: number;
}

/**
 * Animated React Icon for the skills section.
 */
export const ReactIcon: React.FC<SkillIconProps> = ({ className = '', size = 32, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="-11.5 -10.23174 23 20.46348"
        xmlns="http://www.w3.org/2000/svg"
        className={`animate-spin-slow ${className}`}
        style={{ animationDuration: '8s' }}
        {...props}
    >
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
    </svg>
);

/**
 * Animated TypeScript Icon for the skills section.
 */
export const TypeScriptIcon: React.FC<SkillIconProps> = ({ className = '', size = 32, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
        className={`animate-pulse ${className}`}
        {...props}
    >
        <path fill="#3178C6" d="M1.5 1.5h125v125H1.5z" />
        <path fill="#FFF" d="M72.1 92.5c-3.1 2.3-7.5 3.6-12 3.6-12.8 0-21.6-9.1-21.6-26.6v-25h12.5v24.6c0 10.3 5.4 15.3 12.4 15.3 3.6 0 6.6-1 8.8-2.6zM118 69.8c0 16.3-10.7 26.3-26.1 26.3-11.4 0-19.6-4.6-24-12.7l10-6.9c3 5.3 8 8 13.9 8 8.1 0 13.1-4.1 13.1-10.2 0-21.5-35.1-12.6-35.1-34.9 0-12.7 9.8-22.1 23.9-22.1 10.4 0 17.5 4.3 22 10.7l-9.8 7c-2.9-4-6.8-6.1-12-6.1-6.8 0-11.3 4.2-11.3 9.4 0 20.3 35.4 12.3 35.4 34.5z" />
    </svg>
);

/**
 * Animated Terminal Icon with blinking cursor.
 */
export const TerminalIcon: React.FC<SkillIconProps> = ({ className = '', size = 32, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
    >
        <style>
            {`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .terminal-cursor { animation: cursorBlink 1s step-end infinite; }
      `}
        </style>
        <rect x="4" y="8" width="56" height="48" rx="4" fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
        {/* Top Bar */}
        <path d="M 4 16 L 60 16" stroke="#4b5563" strokeWidth="2" />
        <circle cx="10" cy="12" r="2" fill="#ef4444" />
        <circle cx="16" cy="12" r="2" fill="#eab308" />
        <circle cx="22" cy="12" r="2" fill="#22c55e" />

        {/* Prompt Arrow */}
        <path d="M 12 28 L 20 34 L 12 40" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Blinking Cursor */}
        <rect x="26" y="38" width="10" height="3" fill="#00f0ff" className="terminal-cursor" />
    </svg>
);
