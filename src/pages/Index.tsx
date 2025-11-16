import { useEffect, useRef } from 'react';
import CyberGrid from '@/components/CyberGrid';
import DigitalRain from '@/components/DigitalRain';
import AudioManager from '@/components/AudioManager';
import FlowingMenu from '@/components/FlowingMenu';
import HeroSection from '@/components/HeroSection';
import hologramIcon from '@/assets/hologram-icon.jpeg';
import cyberBg from '@/assets/cyber-background.png';
import { Eye } from 'lucide-react';

const Index = () => {
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

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
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
      
      <CyberGrid />
      <DigitalRain />
      <AudioManager />

      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-neon-cyan via-electric to-neon-cyan -translate-x-1/2 -translate-y-1/2 z-[2]"
        style={{ transition: 'left 0.1s, top 0.1s' }}
      />

      {/* --- Floating Menu Navigation - REMOVED ---
      <div className="fixed top-0 left-0 right-0 z-50 h-32">
        <FlowingMenu items={menuItems} />
      </div>
      */}

      {/* --- Eye Icon in Circle - REMOVED ---
      <div className="fixed bottom-20 right-20 z-50 animate-pulse">
        <div className="relative w-32 h-32 rounded-full border-4 border-electric/50 flex items-center justify-center backdrop-blur-sm bg-background/10">
          <Eye className="w-16 h-16 text-electric" strokeWidth={2} />
        </div>
      </div>
      */}

      {/* Main Content */}
      <main className="relative z-10 pt-32">
        <HeroSection />
      </main>
    </div>
  );
};

export default Index;