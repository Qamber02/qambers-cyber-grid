import { ArrowUpRight, FileText, Github, Shield } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '@/data/portfolio';

const FloatingProp = lazy(() => import('./three/FloatingProp'));

const HeroSection = () => (
  <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-16 md:py-24">
    {/* Ambient background glow */}
    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-[160px]" />
    <div className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px]" />

    <div className="mx-auto grid w-full max-w-[1600px] items-center gap-10 px-6 sm:px-10 py-8 lg:grid-cols-[1.1fr_1fr_0.95fr] lg:gap-12">
      {/* Left Column: Player Info & System HUD */}
      <div className="relative z-10 w-full">
        <div className="relative z-10">
          {/* System Header Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-violet-400/30 bg-violet-950/40 px-4 py-2 backdrop-blur-md mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
            </span>
            <span className="system-label text-xs sm:text-sm font-semibold text-violet-300 tracking-[0.25em]">
              SYSTEM ACTIVE // SHADOW MONARCH
            </span>
          </div>

          <p className="mb-4 font-mono text-sm sm:text-base tracking-wider text-violet-300/80">
            [System] Player status recognized. Class: Full-Stack Architect.
          </p>

          {/* Headline - Text design preserved */}
          <h1 className="max-w-3xl text-6xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
            Arise,<br />
            <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(167,139,250,0.5)]">
              Qamber.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg sm:text-xl lg:text-2xl leading-relaxed text-white/85">
            I build things that actually get used — resilient backends that don't break under load, and sleek web applications for real-world operations.
          </p>

          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-violet-200/75">
            CS student at University of Turbat, engineering production payment architecture at Unhire &amp; developing local tech infrastructure.
          </p>

          {/* Player Stats HUD Strip */}
          <div className="mt-9 grid max-w-xl grid-cols-3 gap-4 rounded-xl border border-violet-500/25 bg-violet-950/30 p-4 backdrop-blur-md">
            <div>
              <span className="block font-mono text-xs uppercase text-violet-300/70 mb-1">CLASS</span>
              <span className="font-mono text-sm sm:text-base font-semibold text-white">Shadow Dev</span>
            </div>
            <div>
              <span className="block font-mono text-xs uppercase text-violet-300/70 mb-1">TITLE</span>
              <span className="font-mono text-sm sm:text-base font-semibold text-violet-300">Level 01</span>
            </div>
            <div>
              <span className="block font-mono text-xs uppercase text-violet-300/70 mb-1">STATUS</span>
              <span className="font-mono text-sm sm:text-base font-semibold text-emerald-400">READY</span>
            </div>
          </div>

          <div className="mt-9 flex items-center gap-3 font-mono text-sm text-violet-200/60">
            <Shield size={17} className="text-violet-400" />
            SYSTEM VERIFIED // NOBARA LINUX DEV ENVIRONMENT
          </div>
        </div>
      </div>

      {/* Center Column: RED Marker Side - Free-Floating 3D Dagger with Magic Rune Aura */}
      <div className="relative mx-auto w-full h-[550px] sm:h-[640px] lg:h-[720px] flex items-center justify-center">
        {/* Magic Rune Circle Aura Background */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <img
            src="/images/magic-rune-circle.png"
            alt="Magic Rune Aura"
            className="w-[480px] h-[480px] sm:w-[580px] sm:h-[580px] lg:w-[660px] lg:h-[660px] max-w-none object-contain opacity-80 mix-blend-screen animate-[spin_100s_linear_infinite]"
          />
        </div>

        <Suspense fallback={<div className="prop-fallback text-4xl" aria-hidden="true"><span>◇</span></div>}>
          <FloatingProp kind="dagger" fillRatio={0.98} interactive={true} />
        </Suspense>
      </div>

      {/* Far Right Column: BLUE Marker Side - Equipped WEAPON Heading, Stats & Action Buttons */}
      <div className="relative z-10 space-y-5 text-left">
        <div>
          <p className="mb-3 font-mono text-xs sm:text-sm tracking-widest text-red-400">
            [System] Primary Item // Class: S-Rank
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight text-white">
            Equipped,<br />
            <span className="bg-gradient-to-r from-red-400 via-rose-500 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(239,68,68,0.6)]">
              WEAPON.
            </span>
          </h2>
        </div>

        <div className="inline-block w-full max-w-md rounded-xl border border-red-500/25 bg-red-950/20 p-5 backdrop-blur-md">
          <div className="space-y-3.5 font-mono text-xs sm:text-sm">
            <div className="flex justify-between gap-6 border-b border-red-500/20 pb-2.5">
              <span className="text-white/60">ITEM</span>
              <span className="font-semibold text-red-300">RUNE DAGGER</span>
            </div>
            <div className="flex justify-between gap-6 border-b border-red-500/20 pb-2.5">
              <span className="text-white/60">DURABILITY</span>
              <span className="font-semibold text-emerald-400">99.8%</span>
            </div>
            <div className="flex justify-between gap-6 border-b border-red-500/20 pb-2.5">
              <span className="text-white/60">TIER</span>
              <span className="font-semibold text-violet-300">S-CLASS</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-white/60">OWNER</span>
              <span className="font-semibold text-white">QAMBER</span>
            </div>
          </div>
        </div>

        {/* Action Buttons (Right Column under Item Card per design reference) */}
        <div className="pt-2 space-y-3 max-w-md">
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/projects" className="system-button system-button--solid flex-1 min-w-[150px] py-3 text-sm sm:text-base group justify-center">
              Enter the gates <ArrowUpRight size={18} className="transition-transform [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:-translate-y-0.5" />
            </Link>
            <Link to="/about" className="system-button flex-1 min-w-[140px] py-3 text-sm sm:text-base justify-center">
              View stat sheet
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={portfolioData.cvPath}
              download="Qambar_CV.pdf"
              className="system-button flex-1 py-3 text-sm sm:text-base flex items-center justify-center gap-2 border-violet-400/30 [@media(hover:hover)]:hover:border-violet-300"
            >
              <FileText size={17} className="text-violet-300" /> Download CV
            </a>
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="system-icon-button w-12 h-12 flex-shrink-0"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
