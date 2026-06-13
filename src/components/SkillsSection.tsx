import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
const SkillsSection = () => {

  const skillGroups = [
    {
      title: 'Languages',
      skills: portfolioData.skills.languages,
    },
    {
      title: 'Frontend',
      skills: portfolioData.skills.frontend,
    },
    {
      title: 'Backend',
      skills: portfolioData.skills.backend,
    },
    {
      title: 'Databases',
      skills: portfolioData.skills.databases,
    },
    {
      title: 'Tools & DevOps',
      skills: portfolioData.skills.toolsDevOps,
    },
  ];

  const totalSkillsCount = skillGroups.reduce((acc, curr) => acc + curr.skills.length, 0);

  return (
    <section id="skills" className="min-h-screen py-24 px-4 relative z-[3]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-left"
        >
          <span 
            className="text-[13px] tracking-[3px] uppercase mb-3 block"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: 'rgba(0, 245, 255, 0.5)',
            }}
          >
            // system capabilities
          </span>
          <h2 
            className="text-[40px] md:text-[54px] font-bold mb-4 leading-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#00f5ff',
              textShadow: '0 0 40px rgba(0, 245, 255, 0.35)',
            }}
          >
            Technical Stack.
          </h2>
          <p 
            className="text-[17px] leading-[1.75] font-medium max-w-2xl"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'rgba(255, 255, 255, 0.88)',
            }}
          >
            A categorized index of languages, libraries, databases, and workflows I use to build robust software.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-6 rounded-[8px] flex flex-col justify-start"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(0, 245, 255, 0.12)',
              }}
            >
              <h3 
                className="text-[15px] font-bold tracking-[2px] mb-6 uppercase"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#00f5ff',
                  textShadow: '0 0 10px rgba(0, 245, 255, 0.15)',
                }}
              >
                // {group.title}
              </h3>
              
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 h-9 px-3.5 rounded-[6px] text-[14px] font-medium border text-white/90 bg-white/[0.02] border-white/10 transition-all duration-200 ease-in-out hover:border-[#00f5ff] hover:text-[#00f5ff] hover:shadow-[0_0_12px_rgba(0,245,255,0.25)] hover:bg-[#00f5ff]/5 select-none"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >

                    {skill.name}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quiet status line at the bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <span 
            className="text-[12px] font-normal"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: 'rgba(255, 255, 255, 0.4)',
            }}
          >
            // {totalSkillsCount} core technologies loaded successfully
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default SkillsSection;
