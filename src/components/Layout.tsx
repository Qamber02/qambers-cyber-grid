import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import CyberGrid from './CyberGrid';
import DigitalRain from './DigitalRain';
import AudioManager from './AudioManager';
import Navigation from './Navigation';
import cyberBg from '@/assets/cyber-background.png';

interface LayoutProps {
  children: React.ReactNode;
}

// Detect mobile / low-power devices once at module load.
// This is intentionally not reactive — we don't want to hot-swap
// the Three.js canvas mid-session.
const isMobile =
  window.matchMedia('(max-width: 768px)').matches ||
  navigator.hardwareConcurrency < 4;

const Layout = ({ children }: LayoutProps) => {
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Cursor glow — one listener for the whole app lifetime
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Skip-to-content link (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded focus:bg-[var(--bg-base)] focus:text-[var(--cyan-primary)] focus:border focus:border-[var(--cyan-primary)] focus:text-sm focus:font-mono"
      >
        Skip to main content
      </a>

      {/* Static background image — z:0 */}
      <div
        className="fixed inset-0 z-[0] pointer-events-none"
        style={{
          backgroundImage: `url(${cyberBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      {/* Three.js grid — desktop only — z:0 */}
      {!isMobile && <CyberGrid />}

      {/* Digital rain — z:2 */}
      <DigitalRain reducedColumns={isMobile} />

      {/* Dark overlay between background and content — z:1 */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{ background: 'rgba(0, 0, 0, 0.52)' }}
        aria-hidden="true"
      />

      {/* Audio toggle */}
      <AudioManager />

      {/* Cursor glow — z:2 */}
      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-neon-cyan via-electric to-neon-cyan -translate-x-1/2 -translate-y-1/2 z-[2]"
        style={{ transition: 'left 0.05s, top 0.05s' }}
        aria-hidden="true"
      />

      {/* Navigation — hidden on home, shown on all other pages — z:50 */}
      {!isHome && <Navigation />}

      {/* Page content — z:3 */}
      <main
        id="main-content"
        className={`relative z-[3] px-4 md:px-8 ${isHome ? '' : 'pt-24'}`}
      >
        {children}
      </main>

      {/* Footer — hidden on home */}
      {!isHome && (
        <footer className="relative z-[3] border-t border-[var(--glass-border)] py-8 px-4 mt-20">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm font-mono" style={{ color: 'var(--white-muted)' }}>
              © {new Date().getFullYear()} Qamber Muhammad Hanif — React · TypeScript · Tailwind
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
