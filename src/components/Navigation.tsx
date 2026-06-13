import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

const navItems = [
  { label: 'Works', route: '/projects' },
  { label: 'Qamber', route: '/about' },
  { label: 'Contact', route: '/contact' },
] as const;

const Navigation = () => {
  const location = useLocation();

  return (
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
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo — links home */}
          <Link
            to="/"
            aria-label="Home"
            className="w-9 h-9 border-2 border-[var(--cyan-primary)] rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-[0_0_14px_rgba(0,245,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
          >
            <Home className="w-4 h-4 text-[var(--cyan-primary)]" />
          </Link>

          {/* Nav links */}
          <nav aria-label="Page links">
            <ul className="flex items-center gap-0.5 sm:gap-1 list-none m-0 p-0">
              {navItems.map((item) => {
                const isActive = location.pathname === item.route;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.route}
                      aria-current={isActive ? 'page' : undefined}
                      className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-sm font-medium inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
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

          {/* Online indicator */}
          <div className="flex items-center gap-2" aria-label="Status: online">
            <div className="relative w-2 h-2 flex items-center justify-center" aria-hidden="true">
              <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <motion.div
                animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute w-2 h-2 bg-[#22c55e] rounded-full pointer-events-none"
              />
            </div>
            <span
              className="text-[12px] font-medium hidden sm:inline"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--white-muted)',
              }}
            >
              online
            </span>
          </div>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;