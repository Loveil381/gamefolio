import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Gamefolio - Developer Portfolio & Games';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#09090b',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Abstract Cyberpunk Accents */}
                <div
                    style={{
                        position: 'absolute',
                        top: -100,
                        left: -100,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: -100,
                        right: -100,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '2px solid rgba(0, 240, 255, 0.3)',
                        padding: '60px 80px',
                        borderRadius: '24px',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 84,
                            fontWeight: 900,
                            margin: 0,
                            background: 'linear-gradient(to right, #00f0ff, #a855f7)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            letterSpacing: '-0.05em',
                        }}
                    >
                        Gamefolio
                    </h1>
                    <p
                        style={{
                            fontSize: 32,
                            color: '#a1a1aa',
                            marginTop: 20,
                            textAlign: 'center',
                            maxWidth: 600,
                            lineHeight: 1.4,
                        }}
                    >
                        A production-grade developer portfolio featuring playable browser games.
                    </p>
                </div>

                {/* Decorative corner */}
                <div
                    style={{
                        position: 'absolute',
                        top: 40,
                        right: 40,
                        width: 20,
                        height: 20,
                        borderTop: '4px solid #00f0ff',
                        borderRight: '4px solid #00f0ff',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        left: 40,
                        width: 20,
                        height: 20,
                        borderBottom: '4px solid #a855f7',
                        borderLeft: '4px solid #a855f7',
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}
