import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePortalTransition } from './PortalTransition';

const navItems = [
  { label: 'Works', route: '/projects' },
  { label: 'Qamber', route: '/about' },
  { label: 'Contact', route: '/contact' },
] as const;

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transition } = usePortalTransition();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-[50]"
      style={{
        background: 'rgba(10, 10, 15, 0.78)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(167, 139, 250, 0.16)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo — links home (non-rotating, circular, subtle hover glow, NO scale scale or rotate) */}
          <Link to="/" aria-label="Home">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-violet-400 transition-all duration-200 hover:shadow-[0_0_18px_rgba(167,139,250,0.65)]"
            >
              <span className="font-sans text-sm font-bold text-violet-300">Q</span>
            </div>
          </Link>

          {/* Three nav items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.route;
              return (
                <Link key={item.label} to={item.route} onClick={(event) => {
                  if (isActive) return;
                  event.preventDefault();
                  transition(() => navigate(item.route));
                }}>
                  <button
                    className="px-5 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      background: isActive ? 'rgba(124, 58, 237, 0.16)' : 'transparent',
                      border: isActive ? '1px solid rgba(167, 139, 250, 0.45)' : '1px solid transparent',
                      color: isActive ? '#c4b5fd' : 'rgba(255, 255, 255, 0.7)',
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
