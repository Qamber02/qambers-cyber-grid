import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card } from './ui/card';
import { ExternalLink, Github, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const getColorClass = (color: string) => {
    const colors = {
      primary: 'border-primary bg-primary/5 shadow-primary/30',
      secondary: 'border-secondary bg-secondary/5 shadow-secondary/30',
      accent: 'border-accent bg-accent/5 shadow-accent/30',
      electric: 'border-electric bg-electric/5 shadow-electric/30',
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold neon-text-cyan mb-4">
            &lt; Cyber Projects Street /&gt;
          </h2>
          <p className="text-xl text-neon-cyan">Loading digital billboards...</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card 
                className={`
                  holographic p-8 h-full transition-all duration-300
                  ${hoveredProject === project.id ? 'shadow-2xl scale-105' : 'shadow-lg'}
                  ${getColorClass(project.color)}
                  border-2 relative overflow-hidden group
                `}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-transparent via-current/5 to-transparent"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-bold neon-text-cyan mb-2">
                        {project.title}
                      </h3>
                      <p className="text-lg text-neon-cyan/70">
                        {project.subtitle}
                      </p>
                    </div>
                    <Zap className="h-8 w-8 text-electric animate-neon-pulse" />
                  </div>

                  {/* Description */}
                  <p className="text-neon-cyan/80 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-electric mb-3">
                      &gt; Tech Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm rounded-full bg-primary/10 border border-neon-cyan/30 text-neon-cyan hover:border-electric transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-electric mb-3">
                      &gt; Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-sm text-neon-cyan/70">
                          <span className="text-electric mr-2">▸</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* --- THIS IS THE FIX --- */}
                  <div className="flex gap-3 mt-6">
                    <Button 
                      variant="outline"
                      className="flex-1 border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan disabled:opacity-50"
                      onClick={() => project.sourceLink && window.open(project.sourceLink, '_blank')}
                      disabled={!project.sourceLink}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      {project.sourceLink ? 'View Source' : 'Source N/A'}
                    </Button>
                  </div>
                  {/* --- END OF FIX --- */}
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-current opacity-30" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-current opacity-30" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 holographic p-8 rounded-2xl"
        >
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold neon-text mb-2">4+</div>
              <div className="text-muted-foreground">Major Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold neon-text-cyan mb-2">10K+</div>
              <div className="text-muted-foreground">URLs Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold neon-text-magenta mb-2">40%</div>
              <div className="text-muted-foreground">Performance Boost</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-electric mb-2">15+</div>
              <div className="text-muted-foreground">Tech Stacks</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
