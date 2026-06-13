import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card } from './ui/card';
import { ExternalLink, Github, Zap, LayoutGrid, List } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

// ─── List mode row ────────────────────────────────────────────────────────────
const ProjectListRow = ({
  project,
  index,
}: {
  project: (typeof portfolioData.projects)[0];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border-b border-neon-cyan/10 py-5 cursor-pointer"
    >
      {/* Hover underline slide */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-electric"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ originX: 0, width: '100%' }}
      />

      <div className="flex items-baseline gap-4 flex-wrap">
        {/* Project name */}
        <span className="font-mono text-xl md:text-2xl text-neon-cyan group-hover:text-electric transition-colors duration-200 font-medium tracking-tight">
          {project.title.toLowerCase()}
        </span>

        {/* Type tag */}
        <span className="font-mono text-xs text-neon-cyan/40 hidden sm:block">
          {project.subtitle.toLowerCase()}
        </span>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 ml-auto items-center">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-0.5 rounded border border-neon-cyan/20 text-neon-cyan/60 group-hover:border-electric/40 group-hover:text-electric/80 transition-colors"
            >
              {tech}
            </span>
          ))}

          {/* GitHub link — appears on hover */}
          <motion.a
            href={project.sourceLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => !project.sourceLink && e.preventDefault()}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
            className="ml-2 text-electric hover:text-neon-cyan transition-colors"
          >
            <Github className="h-4 w-4" />
          </motion.a>
        </div>
      </div>

      {/* Subtitle on mobile */}
      <p className="text-xs text-neon-cyan/35 font-mono mt-1 sm:hidden">
        {project.subtitle.toLowerCase()}
      </p>
    </motion.div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-electric/60 mb-3 tracking-widest">// works</p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-4xl md:text-5xl font-bold neon-text-cyan">
              Projects
            </h2>

            {/* View mode toggle */}
            <div className="flex gap-1 holographic p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  viewMode === 'grid'
                    ? 'bg-primary/20 text-primary border border-primary/40'
                    : 'text-neon-cyan/50 hover:text-neon-cyan'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  viewMode === 'list'
                    ? 'bg-primary/20 text-primary border border-primary/40'
                    : 'text-neon-cyan/50 hover:text-neon-cyan'
                }`}
              >
                <List className="h-3.5 w-3.5" />
                list
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── LIST VIEW ────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {viewMode === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-16"
            >
              {portfolioData.projects.map((project, index) => (
                <ProjectListRow key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          )}

          {/* ── GRID VIEW (original) ───────────────────────────────── */}
          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-2 gap-8 mb-16"
            >
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
                        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                      />
                    </div>

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-3xl font-bold neon-text-cyan mb-2">{project.title}</h3>
                          <p className="text-lg text-neon-cyan/70">{project.subtitle}</p>
                        </div>
                        <Zap className="h-8 w-8 text-electric animate-neon-pulse" />
                      </div>

                      {/* Description */}
                      <p className="text-neon-cyan/80 mb-6 leading-relaxed">{project.description}</p>

                      {/* Tech Stack */}
                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-electric mb-3">&gt; Tech Stack:</h4>
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
                        <h4 className="text-sm font-bold text-electric mb-3">&gt; Key Achievements:</h4>
                        <ul className="space-y-2">
                          {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start text-sm text-neon-cyan/70">
                              <span className="text-electric mr-2">▸</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Source link */}
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
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-current opacity-30" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-current opacity-30" />
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="holographic p-8 rounded-2xl"
        >
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold neon-text mb-2">4+</div>
              <div className="text-muted-foreground text-sm">Major Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold neon-text-cyan mb-2">10K+</div>
              <div className="text-muted-foreground text-sm">URLs Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold neon-text-magenta mb-2">40%</div>
              <div className="text-muted-foreground text-sm">Performance Boost</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-electric mb-2">15+</div>
              <div className="text-muted-foreground text-sm">Tech Stacks</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
