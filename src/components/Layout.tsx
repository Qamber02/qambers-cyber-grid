import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import { SpiderCursor } from '@/components/ui/spider-cursor';

interface LayoutProps {
  children: React.ReactNode;
}

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

  const isHome = location.pathname === '/';

  return (
    <div className="relative min-h-screen overflow-x-hidden z-0">
      <div className="system-backdrop fixed inset-0 z-0 pointer-events-none" />

      {/* Global thematic overlay - broken glass (subtle) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.07] mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/broken-glass.jpg)' }}
      />
      {/* SpiderCursor — global overlay below page content — z-index 1 */}
      <SpiderCursor />

      {/* Cursor glow — hidden on touch devices anyway — z-index 2 */}
      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed z-[2] h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/5 blur-3xl"
        style={{ transition: 'left 0.1s, top 0.1s' }}
      />

      {/* Persistent nav — hidden on home (hero has its own CTA buttons) — z-index 50
          The Q logo inside Navigation doubles as the gate replay button when on home,
          so we always render Navigation. On home, the full nav is styled hidden via CSS
          but the Q mark remains accessible. */}
      <Navigation />

      {/* Page content — z-index 3 */}
      <main className={`relative z-[3] px-4 md:px-8 ${isHome ? '' : 'pt-24'}`}>
        {children}
      </main>

      {/* Global footer */}
      {!isHome && (
        <footer className="relative z-[3] mt-20 border-t border-violet-400/15 px-4 py-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="font-mono text-sm text-violet-100/40">
              © 2025 Qamber Muhammad Hanif — Built with React, TypeScript &amp; Tailwind CSS
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
