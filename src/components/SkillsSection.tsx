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

        {/* Side-by-side layout: Technical Stack Grid on Left, Dagger Card on Right */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_340px]">
          {/* Left Side: Technical Stack Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {groups.map(([title, skills], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="system-panel p-6"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-mono text-sm uppercase tracking-[.18em] text-violet-200">{title}</h3>
                  <span className="text-xs text-violet-400/60">0{index + 1}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.name} className="inventory-item">{skill.name}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Right Side: Rune Dagger Container Card */}
          <div className="system-panel flex flex-col justify-between overflow-hidden p-6">
            <div className="flex items-center justify-between border-b border-violet-300/15 pb-4">
              <span className="system-label text-violet-300">EQUIPPED WEAPON</span>
              <span className="font-mono text-xs text-violet-100/45">RUNE DAGGER</span>
            </div>
            <div className="relative w-full h-[400px] lg:h-full min-h-[360px] flex items-center justify-center py-1">
              <Suspense fallback={<div className="prop-fallback">◇</div>}>
                <FloatingProp kind="dagger" />
              </Suspense>
            </div>
            <div className="border-t border-violet-300/15 pt-3 text-center">
              <p className="font-mono text-[10px] tracking-widest text-violet-300/60">{count} CAPABILITIES EQUIPPED</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
