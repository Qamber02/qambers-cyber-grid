import { useEffect, useRef } from 'react';
import ProjectsSection from '@/components/ProjectsSection';
import CyberGrid from '@/components/CyberGrid';
import DigitalRain from '@/components/DigitalRain';
import AudioManager from '@/components/AudioManager';
import FlowingMenu from '@/components/FlowingMenu';
import hologramIcon from '@/assets/hologram-icon.jpeg';
import cyberBg from '@/assets/cyber-background.png';
import Navigation from '@/components/Navigation';

const Projects = () => {
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  // This menu is no longer used, as it was removed from the render below
  const menuItems = [
    { link: '/', text: 'Home', image: hologramIcon },
    { link: '/about', text: 'About', image: hologramIcon },
    { link: '/skills', text: 'Skills', image: hologramIcon },
    { link: '/projects', text: 'Projects', image: hologramIcon },
    { link: '/contact', text: 'Contact', image: hologramIcon },
  ];

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

  // Dummy function for Navigation prop
  const handleNavigate = (section: string) => {
    // This page doesn't have sections, so this can be empty
    console.log("Navigating to:", section);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Navigation onNavigate={handleNavigate} /> {/* <-- ADD NAVIGATION BAR */}

      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${cyberBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.6
        }}
      />
      
      {/* Background Effects */}
      <CyberGrid />
      <DigitalRain />
      <AudioManager />

      {/* Custom Cursor Glow */}
      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-neon-cyan via-primary to-electric -translate-x-1/2 -translate-y-1/2 z-[2]"
        style={{ transition: 'left 0.1s, top 0.1s' }}
      />

      {/* --- Floating Menu Navigation - REMOVED ---
      <div className="fixed top-0 left-0 right-0 z-50 h-32">
        <FlowingMenu items={menuItems} />
      </div>
      */}

      
      {/* Main Content */}
      <div className="relative z-10 pt-32">
        <ProjectsSection />
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/20 py-8 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Qamber. Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Projects;