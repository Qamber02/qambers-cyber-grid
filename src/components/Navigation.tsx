import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const navItems = [
  { label: 'Works', route: '/projects' },
  { label: 'Qamber', route: '/about' },
  { label: 'Contact', route: '/contact' },
] as const;

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const drawerVariants = {
  hidden: { x: '100%', opacity: prefersReducedMotion ? 1 : 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: prefersReducedMotion ? 0 : 0.25, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    x: '100%',
    opacity: prefersReducedMotion ? 1 : 0,
    transition: { duration: prefersReducedMotion ? 0 : 0.2, ease: [0.4, 0, 1, 1] },
  },
};

const Navigation = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Close on Esc key
  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  // Prevent body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-[50]"
        aria-label="Site navigation"
        style={{
          background: 'rgba(5, 5, 20, 0.75)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(0, 245, 255, 0.08)',
          willChange: 'transform',
          contain: 'paint',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">

            {/* Logo — links home */}
            <Link
              to="/"
              aria-label="Home"
              className="w-11 h-11 border-2 border-[var(--cyan-primary)] rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-[0_0_14px_rgba(0,245,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
            >
              <Home className="w-4 h-4 text-[var(--cyan-primary)]" />
            </Link>

            {/* Desktop Nav links — hidden on mobile */}
            <nav aria-label="Page links" className="hidden sm:block">
              <ul className="flex items-center gap-0.5 sm:gap-1 list-none m-0 p-0">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.route;
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.route}
                        aria-current={isActive ? 'page' : undefined}
                        className="px-5 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium inline-flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          background: isActive ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
                          border: isActive ? '1px solid rgba(0, 245, 255, 0.3)' : '1px solid transparent',
                          color: isActive ? 'var(--cyan-primary)' : 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right side: online indicator (desktop) + hamburger (mobile) */}
            <div className="flex items-center gap-3">
              {/* Online indicator — desktop only */}
              <div className="hidden sm:flex items-center gap-2" aria-label="Status: online">
                <div className="relative w-2 h-2 flex items-center justify-center" aria-hidden="true">
                  <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
                  <motion.div
                    animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute w-2 h-2 bg-[#22c55e] rounded-full pointer-events-none"
                  />
                </div>
                <span
                  className="text-[12px] font-medium"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--white-muted)',
                  }}
                >
                  online
                </span>
              </div>

              {/* Hamburger button — mobile only */}
              <button
                ref={menuButtonRef}
                onClick={() => setDrawerOpen((o) => !o)}
                aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={drawerOpen}
                aria-controls="mobile-nav-drawer"
                className="sm:hidden w-11 h-11 flex items-center justify-center rounded-lg border border-[rgba(0,245,255,0.2)] transition-all duration-200 hover:border-[var(--cyan-primary)] hover:bg-[rgba(0,245,255,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                style={{ color: 'var(--cyan-primary)' }}
              >
                {drawerOpen
                  ? <X className="w-5 h-5" aria-hidden="true" />
                  : <Menu className="w-5 h-5" aria-hidden="true" />
                }
              </button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className="fixed inset-0 z-[99] sm:hidden"
              style={{ background: 'rgba(5, 5, 20, 0.7)', backdropFilter: 'blur(4px)' }}
              aria-hidden="true"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              id="mobile-nav-drawer"
              role="dialog"
              aria-label="Navigation menu"
              aria-modal="true"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-64 z-[100] sm:hidden flex flex-col"
              style={{
                background: 'rgba(5, 5, 20, 0.96)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(0, 245, 255, 0.12)',
                boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: '1px solid rgba(0, 245, 255, 0.08)' }}
              >
                <span
                  className="text-[11px] font-mono tracking-[3px] uppercase"
                  style={{ color: 'rgba(0, 245, 255, 0.5)' }}
                >
                  // nav
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-8 h-8 flex items-center justify-center rounded-md transition-colors hover:bg-[rgba(0,245,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)]"
                  style={{ color: 'var(--white-muted)' }}
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Drawer nav links */}
              <nav aria-label="Mobile page links" className="flex-1 px-4 py-6">
                <ul className="list-none m-0 p-0 space-y-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.route;
                    return (
                      <li key={item.label}>
                        <Link
                          to={item.route}
                          aria-current={isActive ? 'page' : undefined}
                          className="flex items-center gap-3 w-full min-h-[52px] px-4 rounded-lg text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)]"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            background: isActive ? 'rgba(0, 245, 255, 0.08)' : 'transparent',
                            border: isActive ? '1px solid rgba(0, 245, 255, 0.25)' : '1px solid transparent',
                            color: isActive ? 'var(--cyan-primary)' : 'rgba(255, 255, 255, 0.75)',
                          }}
                        >
                          {isActive && (
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: 'var(--cyan-primary)' }}
                              aria-hidden="true"
                            />
                          )}
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer footer — online badge */}
              <div
                className="px-6 py-5 flex items-center gap-2"
                style={{ borderTop: '1px solid rgba(0, 245, 255, 0.08)' }}
              >
                <div className="relative w-2 h-2" aria-hidden="true">
                  <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
                  <motion.div
                    animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute inset-0 bg-[#22c55e] rounded-full pointer-events-none"
                  />
                </div>
                <span
                  className="text-[12px] font-medium"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--white-muted)' }}
                >
                  online
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
