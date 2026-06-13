import { useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import CyberGrid from './CyberGrid';
import DigitalRain from './DigitalRain';
import AudioManager from './AudioManager';
import Navigation from './Navigation';
import cyberBg from '@/assets/cyber-background.png';

interface LayoutProps {
  children: React.ReactNode;
}

// Detect mobile/low-power devices once at module load — no need for a listener
const isMobile =
  window.matchMedia('(max-width: 768px)').matches ||
  navigator.hardwareConcurrency < 4;

const Layout = ({ children }: LayoutProps) => {
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Cursor glow — one listener for the whole app lifetime
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Index page has no top-nav — all other pages do
  const isHome = location.pathname === '/';

  // No-op navigate handler — Navigation's onNavigate is legacy from the
  // single-page-scroll days; routing now handles all navigation.
  const handleNavigate = (_section: string) => {};

  return (
    <div className="relative min-h-screen overflow-x-hidden z-0">
      {/* Static background image — z-index 0 */}
      <div
        className="fixed inset-0 z-[0] pointer-events-none"
        style={{
          backgroundImage: `url(${cyberBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.6,
        }}
      />

      {/* 3D grid — desktop only — z-index 0 */}
      {!isMobile && <CyberGrid />}

      {/* Digital rain — reduced columns on mobile — z-index 1 */}
      <DigitalRain reducedColumns={isMobile} />

      {/* Semi-transparent dark overlay between background canvas and text content — z-index 2 */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{ background: 'rgba(0, 0, 0, 0.52)' }}
      />

      {/* Audio toggle */}
      <AudioManager />

      {/* Cursor glow — hidden on touch devices anyway — z-index 2 */}
      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-neon-cyan via-electric to-neon-cyan -translate-x-1/2 -translate-y-1/2 z-[2]"
        style={{ transition: 'left 0.1s, top 0.1s' }}
      />

      {/* Persistent nav — hidden on home (hero has its own CTA buttons) — z-index 50 */}
      {!isHome && <Navigation onNavigate={handleNavigate} />}

      {/* Page content — z-index 3 */}
      <main className={`relative z-[3] px-4 md:px-8 ${isHome ? '' : 'pt-24'}`}>
        {children}
      </main>

      {/* Global footer */}
      {!isHome && (
        <footer className="relative z-[3] border-t border-border/20 py-8 px-4 mt-20">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm text-muted-foreground font-mono">
              © 2025 Qamber Muhammad Hanif — Built with React, TypeScript &amp; Tailwind CSS
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
