import { ArrowUpRight, Github, Shield } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '@/data/portfolio';

const PortalScene = lazy(() => import('./three/PortalScene'));

const HeroSection = () => (
  <section className="relative flex min-h-screen items-center overflow-hidden">
    <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-28 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
      <div className="relative z-10">
        <p className="system-label mb-6 text-violet-300">SHADOW MONARCH // PORTFOLIO</p>
        <p className="mb-4 font-mono text-sm text-violet-100/55">[System] Player has been recognized.</p>
        <h1 className="max-w-3xl text-5xl font-bold leading-[.96] tracking-tight text-white md:text-7xl">
          Arise,<br /><span className="text-violet-300">Qamber.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-white/72">
          I build things that actually get used — backends that don't break, apps for places most devs have never heard of.
        </p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-violet-200/70">
          CS student at University of Turbat, currently shipping at Unhire and building payment architecture for the real world.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/projects" className="system-button system-button--solid">Enter the gates <ArrowUpRight size={16} /></Link>
          <Link to="/about" className="system-button">View stat sheet</Link>
          <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="system-icon-button" aria-label="GitHub"><Github size={18} /></a>
        </div>
        <div className="mt-12 flex items-center gap-3 font-mono text-xs text-violet-100/45"><Shield size={15} className="text-violet-400" /> LEVEL 01 // FULL-STACK ENGINEER</div>
      </div>
      <div className="portal-shell relative mx-auto h-[360px] w-full max-w-[520px] md:h-[500px]" aria-label="Animated violet portal">
        <Suspense fallback={<div className="portal-fallback" aria-hidden="true"><span>⌬</span></div>}><PortalScene /></Suspense>
        <div className="pointer-events-none absolute inset-x-7 bottom-5 rounded border border-violet-300/20 bg-[#0a0a0f]/70 px-4 py-3 font-mono text-[10px] tracking-[.18em] text-violet-100/55 backdrop-blur">
          GATE STATUS <span className="float-right text-violet-300">OPEN</span>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
