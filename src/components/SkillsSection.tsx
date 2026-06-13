import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

const skillGroups = [
  { title: 'Languages', skills: portfolioData.skills.languages },
  { title: 'Frontend', skills: portfolioData.skills.frontend },
  { title: 'Backend', skills: portfolioData.skills.backend },
  { title: 'Databases', skills: portfolioData.skills.databases },
  { title: 'Tools & DevOps', skills: portfolioData.skills.toolsDevOps },
];

const totalSkillsCount = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);

const SkillsSection = () => (
  <section
    id="skills"
    className="min-h-screen py-24 px-4 relative z-[3]"
    aria-labelledby="skills-heading"
  >
    <div className="max-w-6xl mx-auto">

      {/* ── Section Header ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="mb-16 text-left"
      >
        <span
          className="text-[12px] tracking-[3px] uppercase mb-3 block"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: 'rgba(0, 245, 255, 0.5)',
          }}
        >
          // system capabilities
        </span>
        <h1
          id="skills-heading"
          className="text-[38px] md:text-[52px] font-bold mb-4 leading-tight"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: 'var(--cyan-primary)',
            textShadow: '0 0 36px rgba(0, 245, 255, 0.3)',
          }}
        >
          Technical Stack.
        </h1>
        <p
          className="text-[16px] leading-[1.75] font-medium max-w-2xl"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: 'var(--white-body)',
          }}
        >
          A categorized index of languages, libraries, databases, and workflows
          I use to ship robust software.
        </p>
      </motion.div>

      {/* ── Skills Grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
            className="p-6 rounded-[10px] flex flex-col"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <h2
              className="text-[13px] font-bold tracking-[2px] mb-6 uppercase"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: 'var(--cyan-primary)',
                textShadow: '0 0 10px rgba(0, 245, 255, 0.15)',
              }}
            >
              // {group.title}
            </h2>

            <ul className="flex flex-wrap gap-2.5 list-none m-0 p-0">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <span
                    className="flex items-center gap-2 h-9 px-3.5 rounded-[6px] text-[13px] font-medium border cursor-default transition-all duration-200 ease-in-out hover:border-[var(--cyan-primary)] hover:text-[var(--cyan-primary)] hover:shadow-[0_0_12px_rgba(0,245,255,0.2)] hover:bg-[rgba(0,245,255,0.04)] select-none"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: 'rgba(255,255,255,0.88)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    {skill.name}
                  </span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      {/* ── Status line ─────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        viewport={{ once: true }}
        className="mt-16 text-center text-[12px] font-normal"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: 'rgba(255, 255, 255, 0.35)',
        }}
        aria-label={`${totalSkillsCount} core technologies`}
      >
        // {totalSkillsCount} core technologies loaded successfully
      </motion.p>

    </div>
  </section>
);

export default SkillsSection;
