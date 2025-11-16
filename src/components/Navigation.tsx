import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Home, User, Zap, Briefcase, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react'; // <-- IMPORT useState
import FlowingMenu from './FlowingMenu'; // <-- IMPORT FlowingMenu
import { portfolioData } from '@/data/portfolio'; // <-- IMPORT PORTFOLIO DATA

// --- DEFINE YOUR PROJECTS MENU ITEMS ---
// (This now reads from your portfolio data)
const projectMenuItems = portfolioData.projects.map(project => ({
  text: project.title.toUpperCase(), // "DSA Visualizer" -> "DSA VISUALIZER"
  image: '/path/to/some/icon.png', // <-- You'll need to update these images
  link: project.sourceLink || '#',
}));
// -------------------------------------

interface NavigationProps {
  onNavigate: (section: string) => void;
}

const Navigation = ({ onNavigate }: NavigationProps) => {
  const location = useLocation();
  const [isProjectsHovered, setIsProjectsHovered] = useState(false); // <-- Renamed state

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home, route: '/' },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'projects', label: 'Projects', icon: Briefcase, route: '/projects' },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 holographic backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 border-2 border-primary rounded-lg flex items-center justify-center"
          >
            <span className="text-primary font-bold">Q</span>
          </motion.div>

          {/* Nav Items */}
          <div className="hidden md:flex gap-2">
            {navItems.map((item) => {
              const btn = (
                <Button
                  key={item.id}
                  onClick={() => !item.route && onNavigate(item.id)}
                  variant="ghost"
                  className="hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );

              // --- SPECIAL LOGIC FOR PROJECTS DROPDOWN (MOVED FROM SKILLS) ---
              if (item.id === 'projects') {
                return (
                  <div
                    key={item.id}
                    className="relative" // This is the anchor
                    onMouseEnter={() => setIsProjectsHovered(true)}
                    onMouseLeave={() => setIsProjectsHovered(false)}
                  >
                    {/* The original "Projects" button (using Link) */}
                    <Link key={item.id} to={item.route}>
                      {btn}
                    </Link>
                    
                    {/* The conditionally rendered dropdown */}
                    {isProjectsHovered && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50">
                        <FlowingMenu items={projectMenuItems} />
                      </div>
                    )}
                  </div>
                );
              }
              // -----------------------------------------

              // --- RENDER SKILLS NORMALLY ---
              if (item.id === 'skills') {
                return btn; // Renders the normal Skills button
              }
              // ---------------------------------

              return item.route ? (
                <Link key={item.id} to={item.route}>
                  {btn}
                </Link>
              ) : (
                btn
              );
            })}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <item.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-neon-pulse" />
            <span className="text-sm text-muted-foreground hidden sm:block">Online</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;