import { ArrowUpRight, FileText, Github, Shield } from 'lucide-react';
import { Component, lazy, Suspense, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '@/data/portfolio';

const PortalScene = lazy(() => import('./three/PortalScene'));

class PortalErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <div className="portal-fallback" aria-hidden="true"><span>⌬</span></div>;
    return this.props.children;
  }
}

const HeroSection = () => (
  <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-16 md:py-24">
    {/* Ambient background glow */}
    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px]" />

    <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
      {/* Left Column: Player Info & System HUD */}
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

      {/* Right Column: 3D Portal Frame & Diagnostics HUD */}
      <div className="relative mx-auto w-full max-w-[540px]">
        {/* Decorative corner borders */}
        <div className="pointer-events-none absolute -inset-2 rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-500/10 via-transparent to-purple-900/10 backdrop-blur-3xl" />

        <div className="portal-shell relative h-[420px] w-full overflow-hidden rounded-xl border border-violet-400/30 bg-[#07070c]/80 shadow-[0_0_50px_rgba(124,58,237,0.25)] md:h-[500px]">
          {/* Top Frame Status Bar */}
          <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between border-b border-violet-400/15 bg-[#0a0a0f]/80 px-4 py-2.5 font-mono text-[10px] text-violet-200/70 backdrop-blur-md">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              DIMENSIONAL GATE // S-01
            </span>
            <span className="text-violet-300 font-semibold">STABILITY 99.8%</span>
          </div>

          <PortalErrorBoundary>
            <Suspense fallback={<div className="portal-fallback" aria-hidden="true"><span>⌬</span></div>}>
              <PortalScene />
            </Suspense>
          </PortalErrorBoundary>

          {/* Bottom Frame Status Overlay */}
          <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 rounded-lg border border-violet-400/25 bg-[#0a0a0f]/85 p-3.5 font-mono text-[10px] tracking-wider text-violet-100/70 backdrop-blur-md shadow-lg">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-violet-300 font-semibold uppercase">GATE STATUS</span>
              <span className="rounded bg-violet-500/20 px-2 py-0.5 text-[9px] text-violet-200 border border-violet-400/30">
                ACTIVE
              </span>
            </div>
            <div className="flex items-center justify-between text-white/50 text-[9px]">
              <span>THREAT LEVEL: HIGH</span>
              <span>COORDINATES: GWADAR/TURBAT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
