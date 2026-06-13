import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { useState, useEffect } from 'react';
import { Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import avatarImg from '@/assets/avatar.jpeg';

// ─── Glowing Avatar Photo ───────────────────────────────────────────
const GlitchAvatar = () => (
  <div 
    className="relative w-64 h-64 md:w-[320px] md:h-[320px] mx-auto select-none rounded-full flex-shrink-0"
    style={{
      border: '2px solid #00f5ff',
      boxShadow: '0 0 24px rgba(0, 245, 255, 0.4), 0 0 60px rgba(0, 245, 255, 0.12)',
    }}
  >
    {/* Scanline overlay */}
    <div
      className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-10"
      style={{
        background:
          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
      }}
    />

    {/* Inner Photo avatar */}
    <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center bg-[#050510]">
      <img
        src={avatarImg}
        alt="Qamber"
        className="w-full h-full object-cover"
        style={{ 
          objectPosition: 'center 15%' // Keeps head fully inside the circle
        }}
      />
    </div>

    {/* Online badge */}
    <div 
      className="absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border flex items-center gap-1.5 whitespace-nowrap z-20"
      style={{
        bottom: '-8px',
        background: 'rgba(5, 5, 20, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="relative w-1.5 h-1.5 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full" />
        <motion.div
          animate={{ scale: [1, 1.4], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          className="absolute w-1.5 h-1.5 bg-[#22c55e] rounded-full pointer-events-none"
        />
      </div>
      <span 
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        online
      </span>
    </div>
  </div>
);

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "Hey, I'm Qamber.";

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTypedText(fullText);
      return;
    }

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 300); // 300ms per character

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Scanlines effect */}
      <div className="scanlines absolute inset-0 pointer-events-none" />

      {/* Main Content container (z-[3] to sit above overlay) */}
      <div className="relative z-[3] w-full max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-8 items-center">

          {/* Left column: Text + CTAs */}
          <div className="flex flex-col text-left">
            {/* Eyebrow label */}
            <span 
              className="text-[13px] tracking-[3px] uppercase mb-4"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'rgba(0, 245, 255, 0.5)',
              }}
            >
              // full-stack engineer
            </span>

            {/* Typewriter H1 Heading */}
            <h1 
              className="text-[40px] md:text-[64px] font-bold mb-6 leading-tight select-none"
              style={{ 
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#00f5ff',
                textShadow: '0 0 40px rgba(0, 245, 255, 0.35)',
              }}
            >
              {typedText}
              <span className={cursorVisible ? 'opacity-100' : 'opacity-0'}>▋</span>
            </h1>

            {/* Body paragraph */}
            <p 
              className="text-[17px] leading-[1.75] font-medium mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'rgba(255, 255, 255, 0.88)',
              }}
            >
              I build things that actually get used — backends that don't break,
              apps for places most devs have never heard of.
            </p>

            {/* Cyan secondary line */}
            <p 
              className="text-[15px] font-normal leading-[1.75] mb-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#4fc3f7',
              }}
            >
              CS student at University of Turbat, currently shipping at Unhire (one of the EVU Ventures) and successfully created the payment architecture. Gwadar born, globally minded.
            </p>

            {/* Casual sign-off */}
            <p 
              className="text-[14px] font-normal italic mt-1"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'rgba(255, 255, 255, 0.45)',
              }}
            >
              I graduate in 2027. I game on Linux. That's about it.
            </p>

            {/* Button row */}
            <div className="flex flex-row items-center gap-[12px] mt-[32px] overflow-x-auto scrollbar-none py-1">
              
              {/* About me Button */}
              <Link to="/about" className="flex-shrink-0">
                <button
                  className="h-[42px] px-5 rounded-[6px] text-[14px] font-medium flex items-center justify-center transition-all duration-200 ease-in-out bg-[#0057ff] text-white hover:bg-[#0066ff] hover:shadow-[0_0_16px_rgba(0,87,255,0.4)]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span className="font-mono mr-2">&gt;</span>
                  About me
                </button>
              </Link>

              {/* Works Button */}
              <Link to="/projects" className="flex-shrink-0">
                <button
                  className="h-[42px] px-5 rounded-[6px] text-[14px] font-medium flex items-center justify-center transition-all duration-200 ease-in-out border border-white/20 text-white hover:border-[#00f5ff]/50 hover:text-[#00f5ff]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Works
                </button>
              </Link>

              {/* GitHub Button */}
              <button
                onClick={() => window.open(portfolioData.github, '_blank')}
                className="h-[42px] px-5 rounded-[6px] text-[14px] font-medium flex items-center justify-center transition-all duration-200 ease-in-out border border-[#ff4757]/40 text-[#ff4757] hover:border-[#ff4757] hover:shadow-[0_0_16px_rgba(255,71,87,0.25)] flex-shrink-0"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="mr-2 flex items-center">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </span>
                GitHub
              </button>

              {/* Contact Button */}
              <Link to="/contact" className="flex-shrink-0">
                <button
                  className="h-[42px] px-5 rounded-[6px] text-[14px] font-medium flex items-center justify-center transition-all duration-200 ease-in-out border border-white/20 text-white hover:border-[#00f5ff]/50 hover:text-[#00f5ff]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span className="mr-2 flex items-center">
                    <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Contact
                </button>
              </Link>
            </div>
          </div>

          {/* Right column: Avatar */}
          <div className="flex justify-center items-center h-full">
            <GlitchAvatar />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;