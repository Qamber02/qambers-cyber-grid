import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { useState, useEffect, useRef } from 'react';
import { Github, Mail, User, FolderGit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import avatarImg from '@/assets/avatar.jpeg';

// ─── Signature Element: Glitch Avatar ────────────────────────────────────────
// The distinctive "glitch-avatar" CSS animation fires every ~7 seconds,
// producing a brief chromatic-aberration-style flicker that reinforces the
// cyberpunk identity without dominating the composition.
const AvatarCard = () => (
  <div
    className="relative w-64 h-64 md:w-[300px] md:h-[300px] mx-auto select-none rounded-full flex-shrink-0"
    style={{
      border: '2px solid var(--cyan-primary)',
      boxShadow: '0 0 28px rgba(0, 245, 255, 0.35), 0 0 64px rgba(0, 245, 255, 0.1)',
    }}
  >
    {/* Scanline overlay */}
    <div
      className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-10"
      aria-hidden="true"
      style={{
        background:
          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
      }}
    />

    {/* Avatar photo — glitch-avatar animation applied here */}
    <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center bg-[var(--bg-base)]">
      <img
        src={avatarImg}
        alt="Qamber Muhammad Hanif"
        className="w-full h-full object-cover glitch-avatar"
        style={{ objectPosition: 'center 15%' }}
        draggable="false"
        loading="eager"
        width={300}
        height={300}
      />
    </div>

    {/* Online badge */}
    <div
      className="absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border flex items-center gap-1.5 whitespace-nowrap z-20"
      style={{
        bottom: '-10px',
        background: 'rgba(5, 5, 20, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.12)',
      }}
      aria-label="Status: online"
    >
      <div className="relative w-1.5 h-1.5 flex items-center justify-center" aria-hidden="true">
        <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full" />
        <motion.div
          animate={{ scale: [1, 1.6], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          className="absolute w-1.5 h-1.5 bg-[#22c55e] rounded-full pointer-events-none"
        />
      </div>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: 'var(--white-muted)',
        }}
      >
        online
      </span>
    </div>
  </div>
);

// ─── CTA Button primitives ────────────────────────────────────────────────────
// Using <Link> styled as a button (not <Link><button>) to keep valid HTML.
interface CtaLinkProps {
  to: string;
  variant?: 'primary' | 'ghost' | 'danger';
  children: React.ReactNode;
  'aria-label'?: string;
}

const CtaLink = ({ to, variant = 'ghost', children, 'aria-label': ariaLabel }: CtaLinkProps) => {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: '#0057ff',
      color: '#fff',
      border: '1px solid transparent',
    },
    ghost: {
      background: 'transparent',
      color: '#fff',
      border: '1px solid rgba(255,255,255,0.2)',
    },
    danger: {
      background: 'transparent',
      color: 'var(--red-accent)',
      border: '1px solid rgba(255, 71, 87, 0.4)',
    },
  };

  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className="flex-shrink-0 h-[42px] px-5 rounded-[6px] text-[14px] font-medium flex items-center justify-center gap-2 transition-all duration-200 ease-in-out hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
      style={{
        fontFamily: "'Inter', sans-serif",
        ...styles[variant],
      }}
    >
      {children}
    </Link>
  );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────
const FULL_TEXT = "Hey, I'm Qamber.";
const TYPING_SPEED_MS = 55; // fast enough to feel snappy but slow enough to be legible

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const prefersReducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Typewriter effect
  useEffect(() => {
    if (prefersReducedMotion.current) {
      setTypedText(FULL_TEXT);
      setTypingDone(true);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setTypedText(FULL_TEXT.slice(0, index));
      if (index >= FULL_TEXT.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, TYPING_SPEED_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Scanlines effect */}
      <div className="scanlines absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-[3] w-full max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-12 lg:gap-8 items-center">

          {/* ── Left: Text + CTAs ─────────────────────────────── */}
          <motion.div
            className="flex flex-col text-left"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Eyebrow */}
            <span
              className="text-[12px] tracking-[3px] uppercase mb-4 block"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'rgba(0, 245, 255, 0.5)',
              }}
            >
              // full-stack engineer
            </span>

            {/* Typewriter H1 */}
            <h1
              className="text-[40px] md:text-[62px] font-bold mb-6 leading-tight select-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: 'var(--cyan-primary)',
                textShadow: '0 0 40px rgba(0, 245, 255, 0.3)',
              }}
            >
              {typedText}
              {/* Cursor blinks while typing, stops when done */}
              {!typingDone && (
                <span
                  className="inline-block w-[3px] h-[0.85em] bg-[var(--cyan-primary)] ml-1 align-middle"
                  style={{ animation: 'cursor-blink 0.5s step-end infinite' }}
                  aria-hidden="true"
                />
              )}
            </h1>

            {/* Primary bio */}
            <p
              className="text-[17px] leading-[1.8] font-medium mb-4 max-w-xl"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--white-body)',
              }}
            >
              I build things that actually get used — backends that hold under
              pressure, apps for places most developers haven't mapped yet.
            </p>

            {/* Secondary line */}
            <p
              className="text-[15px] font-normal leading-[1.75] mb-2 max-w-xl"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--cyan-dim)',
              }}
            >
              CS student at the University of Turbat. Shipping payment architecture at Unhire
              (an EVU Venture). Born in Gwadar, building for the world.
            </p>

            {/* Casual sign-off */}
            <p
              className="text-[13px] font-normal italic mt-1 max-w-xl"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--white-muted)',
              }}
            >
              2027 graduate. Linux gamer. That's the short version.
            </p>

            {/* CTA row */}
            <div className="flex flex-row flex-wrap items-center gap-3 mt-8">
              <CtaLink to="/about" variant="primary" aria-label="Learn more about Qamber">
                <span className="font-mono text-xs opacity-70">&gt;</span>
                About me
              </CtaLink>

              <CtaLink to="/projects" aria-label="View Qamber's projects">
                <FolderGit2 className="w-4 h-4" aria-hidden="true" />
                Works
              </CtaLink>

              {/* GitHub — external link, not a route */}
              <a
                href={portfolioData.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Qamber's GitHub profile (opens in new tab)"
                className="flex-shrink-0 h-[42px] px-5 rounded-[6px] text-[14px] font-medium flex items-center justify-center gap-2 transition-all duration-200 ease-in-out hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: 'transparent',
                  color: 'var(--red-accent)',
                  border: '1px solid rgba(255, 71, 87, 0.4)',
                }}
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                GitHub
              </a>

              <CtaLink to="/contact" aria-label="Contact Qamber">
                <Mail className="w-4 h-4" aria-hidden="true" />
                Contact
              </CtaLink>
            </div>
          </motion.div>

          {/* ── Right: Avatar ─────────────────────────────────── */}
          <motion.div
            className="flex justify-center items-center h-full"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <AvatarCard />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;