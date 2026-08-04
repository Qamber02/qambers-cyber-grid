import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { portfolioData } from '@/data/portfolio';

const FloatingProp = lazy(() => import('./three/FloatingProp'));

const SkillsSection = () => {
  const groups = [
    ['Languages', portfolioData.skills.languages], ['Frontend', portfolioData.skills.frontend],
    ['Backend', portfolioData.skills.backend], ['Databases', portfolioData.skills.databases],
    ['Tools & DevOps', portfolioData.skills.toolsDevOps],
  ] as const;
  const count = groups.reduce((total, [, skills]) => total + skills.length, 0);
  return (
    <section id="skills" className="min-h-screen px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="system-label text-violet-300">INVENTORY // EQUIPPED GEAR</p>
        <h2 className="system-heading mt-4">Technical stack.</h2>
        <p className="mt-4 max-w-2xl text-white/65">A categorized index of languages, libraries, databases, and workflows I use to build robust software.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map(([title, skills], index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="system-panel p-6">
              <div className="mb-6 flex items-center justify-between"><h3 className="font-mono text-sm uppercase tracking-[.18em] text-violet-200">{title}</h3><span className="text-xs text-violet-400/60">0{index + 1}</span></div>
              <div className="flex flex-wrap gap-2">{skills.map((skill) => <span key={skill.name} className="inventory-item">{skill.name}</span>)}</div>
            </motion.article>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-2"><Suspense fallback={<div className="prop-fallback">◇</div>}><FloatingProp kind="dagger" /></Suspense><p className="text-center font-mono text-xs tracking-widest text-white/35">{count} CAPABILITIES EQUIPPED</p></div>
      </div>
    </section>
  );
};

export default SkillsSection;
