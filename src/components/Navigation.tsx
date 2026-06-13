import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  onNavigate?: (section: string) => void;
}

const navItems = [
  { label: 'Works', route: '/projects' },
  { label: 'Qamber', route: '/about' },
  { label: 'Contact', route: '/contact' },
] as const;

const Navigation = ({ onNavigate }: NavigationProps) => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-[50]"
      style={{
        background: 'rgba(5, 5, 20, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 245, 255, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo — links home (non-rotating, circular, subtle hover glow, NO scale scale or rotate) */}
          <Link to="/" aria-label="Home">
            <div
              className="w-9 h-9 border-2 border-[#00f5ff] rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-[0_0_12px_rgba(0,245,255,0.5)]"
            >
              <span className="text-[#00f5ff] font-bold text-sm font-sans">Q</span>
            </div>
          </Link>

          {/* Three nav items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.route;
              return (
                <Link key={item.label} to={item.route}>
                  <button
                    className="px-5 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      background: isActive ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
                      border: isActive ? '1px solid rgba(0, 245, 255, 0.3)' : '1px solid transparent',
                      color: isActive ? '#00f5ff' : 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {item.label}
                  </button>
                </Link>
              );
            })}
          </div>

          {/* Status dot + online text */}
          <div className="flex items-center gap-2">
            <div className="relative w-2 h-2 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
              <motion.div
                animate={{ scale: [1, 1.4], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute w-2 h-2 bg-[#22c55e] rounded-full pointer-events-none"
              />
            </div>
            <span 
              className="text-[12px] font-medium"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'rgba(255, 255, 255, 0.5)',
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