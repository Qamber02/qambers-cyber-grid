import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

const skillGroups = [
  { 
    title: 'Languages', 
    skills: portfolioData.skills.languages,
    color: '#00f5ff', // Cyan
    glowShadow: '0 0 20px rgba(0, 245, 255, 0.18)',
    borderGlow: 'rgba(0, 245, 255, 0.28)',
    bgHover: 'rgba(0, 245, 255, 0.05)',
    tag: 'LANG_SYS'
  },
  { 
    title: 'Frontend', 
    skills: portfolioData.skills.frontend,
    color: '#ff6b9d', // Pink/Magenta
    glowShadow: '0 0 20px rgba(255, 107, 157, 0.18)',
    borderGlow: 'rgba(255, 107, 157, 0.28)',
    bgHover: 'rgba(255, 107, 157, 0.05)',
    tag: 'UI_RENDER'
  },
  { 
    title: 'Backend', 
    skills: portfolioData.skills.backend,
    color: '#3b82f6', // Electric Blue
    glowShadow: '0 0 20px rgba(59, 130, 246, 0.18)',
    borderGlow: 'rgba(59, 130, 246, 0.28)',
    bgHover: 'rgba(59, 130, 246, 0.05)',
    tag: 'CORE_SRV'
  },
  { 
    title: 'Databases', 
    skills: portfolioData.skills.databases,
    color: '#10b981', // Emerald
    glowShadow: '0 0 20px rgba(16, 185, 129, 0.18)',
    borderGlow: 'rgba(16, 185, 129, 0.28)',
    bgHover: 'rgba(16, 185, 129, 0.05)',
    tag: 'DB_STORE'
  },
  { 
    title: 'Tools & DevOps', 
    skills: portfolioData.skills.toolsDevOps,
    color: '#f59e0b', // Amber/Gold
    glowShadow: '0 0 20px rgba(245, 158, 11, 0.18)',
    borderGlow: 'rgba(245, 158, 11, 0.28)',
    bgHover: 'rgba(245, 158, 11, 0.05)',
    tag: 'SYS_WORK'
  },
  { 
    title: 'Deployments & Cloud', 
    skills: portfolioData.skills.deployments,
    color: '#a855f7', // Purple/Violet
    glowShadow: '0 0 20px rgba(168, 85, 247, 0.18)',
    borderGlow: 'rgba(168, 85, 247, 0.28)',
    bgHover: 'rgba(168, 85, 247, 0.05)',
    tag: 'NET_CLOUD'
  },
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
          // SYSTEM CAPABILITIES
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
            className="p-6 rounded-[10px] flex flex-col transition-all duration-300 relative overflow-hidden"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = group.borderGlow;
              e.currentTarget.style.boxShadow = group.glowShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Header with Custom Tag */}
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-[13px] font-bold tracking-[2px] uppercase m-0"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: group.color,
                  textShadow: `0 0 10px ${group.color}26`,
                }}
              >
                // {group.title}
              </h2>
              <span 
                className="text-[9px] font-mono opacity-50 px-1.5 py-0.5 rounded border uppercase"
                style={{ 
                  color: group.color, 
                  borderColor: `${group.color}22`,
                  background: `${group.color}06`
                }}
              >
                {group.tag}
              </span>
            </div>

            <ul className="flex flex-wrap gap-2.5 list-none m-0 p-0">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <span
                    className="flex items-center gap-2 h-9 px-3.5 rounded-[6px] text-[13px] font-medium border cursor-default transition-all duration-200 ease-in-out select-none"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: 'rgba(255,255,255,0.88)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = group.color;
                      e.currentTarget.style.color = group.color;
                      e.currentTarget.style.boxShadow = `0 0 12px ${group.color}33`;
                      e.currentTarget.style.background = group.bgHover;
                      e.currentTarget.style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.88)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.transform = 'none';
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
