import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card } from './ui/card';
import { useState } from 'react';

// Import tech logos
import pythonLogo from '@/assets/python-logo.jpeg';
import typescriptLogo from '@/assets/typescript-logo.jpeg';
import javascriptLogo from '@/assets/javascript-logo.jpeg';
import htmlLogo from '@/assets/html-logo.jpeg';
import sqlLogo from '@/assets/sql-logo.jpeg';

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const logoMap: Record<string, string> = {
    'python-logo.jpeg': pythonLogo,
    'typescript-logo.jpeg': typescriptLogo,
    'javascript-logo.jpeg': javascriptLogo,
    'html-logo.jpeg': htmlLogo,
    'sql-logo.jpeg': sqlLogo,
  };

  const allSkills = [
    ...portfolioData.skills.languages,
    ...portfolioData.skills.frameworks,
    ...portfolioData.skills.databases,
    ...portfolioData.skills.tools,
    ...portfolioData.skills.other,
  ];

  const categories = [
    { name: 'all', label: 'All Systems', color: 'primary' },
    { name: 'language', label: 'Languages', color: 'accent' },
    { name: 'framework', label: 'Frameworks', color: 'secondary' },
    { name: 'database', label: 'Databases', color: 'electric' },
    { name: 'tool', label: 'Tools', color: 'primary' },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="min-h-screen py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold neon-text-cyan mb-4">
            &lt; Neural Skills Hub /&gt;
          </h2>
          <p className="text-xl text-neon-cyan">Analyzing capabilities...</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all
                ${activeCategory === category.name 
                  ? `bg-${category.color} text-${category.color}-foreground shadow-lg shadow-${category.color}/50` 
                  : 'holographic hover:shadow-lg'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="holographic p-6 hover:shadow-xl hover:shadow-neon-cyan/20 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  {('icon' in skill) && skill.icon && logoMap[skill.icon as keyof typeof logoMap] && (
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-background/50 p-2">
                      <img 
                        src={logoMap[skill.icon as keyof typeof logoMap]} 
                        alt={skill.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-neon-cyan group-hover:text-electric transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 inline-block mt-1">
                      {skill.category}
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className={`h-full ${
                        skill.category === 'language' ? 'bg-neon-cyan' :
                        skill.category === 'framework' ? 'bg-electric' :
                        skill.category === 'database' ? 'bg-neon-cyan' :
                        'bg-electric'
                      } shadow-lg`}
                      style={{
                        boxShadow: `0 0 10px currentColor`
                      }}
                    />
                  </div>
                  <div className="mt-2 text-right text-sm text-muted-foreground">
                    Proficiency: <span className="text-neon-cyan font-bold">{skill.level}%</span>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-neon-cyan/30 group-hover:border-electric/50 transition-colors" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-neon-cyan/30 group-hover:border-electric/50 transition-colors" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 3D Visualization - Rotating Skill Sphere */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 holographic p-12 rounded-2xl text-center relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            }}
          />
          <motion.div 
            className="text-6xl mb-4"
            animate={{ 
              rotateY: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            ⚡
          </motion.div>
          <h3 className="text-2xl font-bold neon-text-cyan mb-2">
            Neural Network Active
          </h3>
          <p className="text-neon-cyan/70">
            {filteredSkills.length} skills loaded • System optimal
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
