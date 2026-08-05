import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { portfolioData } from '@/data/portfolio';
import StatSheet from './StatSheet';

const FloatingProp = lazy(() => import('./three/FloatingProp'));

const AboutSection = () => (
  <section id="about" className="relative min-h-screen px-4 py-20 overflow-hidden">
    {/* Subtle Hero Background Overlay */}
    <div 
      className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none mix-blend-screen" 
      style={{
        backgroundImage: 'url(/images/soldiers.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 60%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 60%, transparent 100%)'
      }} 
    />
    <div className="relative mx-auto max-w-5xl z-10">
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="system-label text-violet-300">PLAYER PROFILE // QAMBER</p>
        <h1 className="system-heading mt-4">The stat sheet.</h1>
        <div className="mt-9 max-w-3xl space-y-5 text-lg leading-8 text-white/75">
          <p>I'm from Gwadar, Balochistan — a port city most people only know from geopolitics. I write code because the problems here are real and nobody else is solving them.</p>
          <p>Right now I'm interning as a Full Stack Engineer at Unhire, where I successfully built payment architecture with <span className="text-violet-300">Stripe Connect</span>. On the side I'm building Karwan for Gwadar and Turbat and Cherág, an AI learning tool for students with limited connectivity.</p>
        </div>
      </motion.div>
      <div className="grid items-stretch gap-5 md:grid-cols-[1fr_280px]">
        <StatSheet />
        <div className="system-panel mt-12 md:mt-12 flex flex-col justify-between overflow-hidden p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-violet-300/15 pb-4">
            <span className="system-label text-violet-300">CRYSTAL CORE</span>
            <span className="font-mono text-xs text-violet-100/45">ACTIVE</span>
          </div>
          <div className="relative w-full h-[300px] md:h-full min-h-[280px] flex items-center justify-center py-2">
            <Suspense fallback={<div className="prop-fallback">◇</div>}>
              <FloatingProp kind="crystal" />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
        ['LOCATION', 'Gwadar, Balochistan'], ['UNIVERSITY', 'University of Turbat'], ['GRADUATING', '2027'], ['STATUS', 'Available'],
      ].map(([label, value]) => <div key={label} className="system-panel p-4"><p className="system-label text-violet-300/70">{label}</p><p className="mt-2 text-sm font-semibold text-white/85">{value}</p></div>)}</div>
      
      {/* Current Quest Widget */}
      <div className="mt-8 system-panel p-6 md:p-8 border-violet-500/30">
        <div className="flex items-center justify-between mb-5">
          <span className="system-label text-violet-300">CURRENT QUEST</span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
          </span>
        </div>
        <p className="font-mono text-sm md:text-base text-violet-200 leading-relaxed">
          Building <strong className="text-white">Karwan</strong> — bringing hyperlocal food delivery to Gwadar and Turbat. Bootstrapping the entire architecture from zero to production.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="proof-chip border-violet-500/20">Flutter</span>
          <span className="proof-chip border-violet-500/20">FastAPI</span>
          <span className="proof-chip border-violet-500/20">Supabase</span>
          <span className="proof-chip border-violet-500/20">React</span>
        </div>
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <div><p className="system-label text-violet-300">EDUCATION LOG</p><div className="mt-5 space-y-3">{portfolioData.education.map((education) => <article key={education.institution} className="system-panel p-5"><p className="font-semibold text-violet-100">{education.institution}</p><p className="mt-1 text-sm text-white/55">{education.degree}</p><p className="mt-3 font-mono text-xs text-violet-300/70">{education.gpa || education.score} // {education.graduationDate}</p></article>)}</div></div>
        <div><p className="system-label text-violet-300">ACHIEVEMENTS</p><div className="mt-5 space-y-3">{portfolioData.certifications.map((certification) => <article key={certification} className="system-panel flex gap-3 p-4 text-sm text-white/70"><span className="text-violet-400">◇</span>{certification}</article>)}</div></div>
      </div>
    </div>
  </section>
);

export default AboutSection;
