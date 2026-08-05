import { ArrowUpRight, FileText, Github, Shield } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '@/data/portfolio';

const FloatingProp = lazy(() => import('./three/FloatingProp'));

const HeroSection = () => (
  <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-16 md:py-24">
    {/* Ambient background glow */}
    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[140px]" />

    <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
      {/* Left Column: Player Info & System HUD */}
      <div className="relative z-10 w-full">
        <div className="relative z-10">
          {/* System Header Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-950/40 px-3.5 py-1.5 backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="system-label text-[11px] font-semibold text-violet-300 tracking-[0.22em]">
              SYSTEM ACTIVE // SHADOW MONARCH
            </span>
          </div>

          <p className="mb-3 font-mono text-xs tracking-wider text-violet-300/70">
            [System] Player status recognized. Class: Full-Stack Architect.
          </p>

          <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-tight text-white md:text-7xl lg:text-8xl">
            Arise,<br />
            <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(167,139,250,0.4)]">
              Qamber.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            I build things that actually get used — resilient backends that don't break under load, and sleek web applications for real-world operations.
          </p>

          <p className="mt-3 max-w-xl text-sm leading-6 text-violet-200/70">
            CS student at University of Turbat, engineering production payment architecture at Unhire & developing local tech infrastructure.
          </p>

          {/* Player Stats HUD Strip */}
          <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 rounded-lg border border-violet-500/20 bg-violet-950/20 p-3 backdrop-blur-sm">
            <div>
              <span className="block font-mono text-[10px] uppercase text-violet-300/60">CLASS</span>
              <span className="font-mono text-xs font-semibold text-white">Shadow Dev</span>
            </div>
            <div>
              <span className="block font-mono text-[10px] uppercase text-violet-300/60">TITLE</span>
              <span className="font-mono text-xs font-semibold text-violet-300">Level 01</span>
            </div>
            <div>
              <span className="block font-mono text-[10px] uppercase text-violet-300/60">STATUS</span>
              <span className="font-mono text-xs font-semibold text-emerald-400">READY</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/projects" className="system-button system-button--solid group">
              Enter the gates <ArrowUpRight size={16} className="transition-transform [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:-translate-y-0.5" />
            </Link>
            <Link to="/about" className="system-button">
              View stat sheet
            </Link>
            <a
              href={portfolioData.cvPath}
              download="Qambar_CV.pdf"
              className="system-button flex items-center gap-2 border-violet-400/30 [@media(hover:hover)]:hover:border-violet-300"
            >
              <FileText size={15} className="text-violet-300" /> Download CV
            </a>
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="system-icon-button"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 font-mono text-xs text-violet-200/50">
            <Shield size={15} className="text-violet-400" />
            SYSTEM VERIFIED // NOBARA LINUX DEV ENVIRONMENT
          </div>
        </div>
      </div>

      {/* Right Column: Free-Floating 3D Weapon Display */}
      <div className="relative mx-auto w-full h-full min-h-[500px] sm:min-h-[600px] lg:min-h-[680px] flex flex-col justify-between">
        {/* Equipped Weapon Title in Red Gradient Style */}
        <div className="relative z-10 pointer-events-none pt-2">
          <p className="mb-2 font-mono text-xs tracking-wider text-red-400/80">
            [System] Primary Item // Class: S-Rank
          </p>
          <h2 className="text-4xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Equipped,<br />
            <span className="bg-gradient-to-r from-red-400 via-rose-500 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(239,68,68,0.5)]">
              WEAPON.
            </span>
          </h2>
        </div>

        {/* Interactive 3D Dagger (Free-floating canvas) */}
        <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[580px]">
          <Suspense fallback={<div className="prop-fallback" aria-hidden="true"><span>◇</span></div>}>
            <FloatingProp kind="dagger" fillRatio={0.96} interactive={true} />
          </Suspense>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
