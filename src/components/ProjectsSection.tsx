import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card } from './ui/card';
import { Github, Zap, LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';

// ── Color map — explicit CSS var refs (no dynamic class building) ──────────────
const COLOR_STYLES: Record<string, { border: string; bg: string; shadow: string }> = {
  primary: {
    border: 'hsl(var(--primary))',
    bg: 'hsla(var(--primary), 0.04)',
    shadow: 'hsla(var(--primary), 0.25)',
  },
  secondary: {
    border: 'hsl(var(--secondary))',
    bg: 'hsla(var(--secondary), 0.04)',
    shadow: 'hsla(var(--secondary), 0.25)',
  },
  accent: {
    border: 'hsl(var(--accent))',
    bg: 'hsla(var(--accent), 0.04)',
    shadow: 'hsla(var(--accent), 0.25)',
  },
  electric: {
    border: 'hsl(var(--electric))',
    bg: 'hsla(var(--electric), 0.04)',
    shadow: 'hsla(var(--electric), 0.25)',
  },
};

// ── List-mode project row ──────────────────────────────────────────────────────
const ProjectListRow = ({
  project,
  index,
}: {
  project: (typeof portfolioData.projects)[0];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.32, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group relative border-b py-5"
      style={{ borderColor: 'rgba(0, 245, 255, 0.1)' }}
    >
      {/* Hover underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        style={{ background: 'hsl(var(--electric))', originX: 0, width: '100%' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        aria-hidden="true"
      />

      <div className="flex items-baseline gap-4 flex-wrap">
        <span
          className="font-mono text-xl md:text-2xl font-medium tracking-tight transition-colors duration-200"
          style={{ color: hovered ? 'hsl(var(--electric))' : 'hsl(var(--accent))' }}
        >
          {project.title.toLowerCase()}
        </span>

        <span className="font-mono text-xs hidden sm:block" style={{ color: 'rgba(0, 245, 255, 0.4)' }}>
          {project.subtitle.toLowerCase()}
        </span>

        <div className="flex flex-wrap gap-1.5 ml-auto items-center">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-0.5 rounded border transition-colors"
              style={{
                borderColor: hovered ? 'hsl(var(--electric) / 0.4)' : 'rgba(0, 245, 255, 0.2)',
                color: hovered ? 'hsl(var(--electric) / 0.85)' : 'rgba(0, 245, 255, 0.6)',
              }}
            >
              {tech}
            </span>
          ))}

          {/* GitHub link — always visible for keyboard users */}
          {project.sourceLink && (
            <a
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source for ${project.title} on GitHub (opens in new tab)`}
              className="ml-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
              style={{ color: hovered ? 'hsl(var(--accent))' : 'hsl(var(--electric))' }}
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <p className="text-xs font-mono mt-1 sm:hidden" style={{ color: 'rgba(0, 245, 255, 0.35)' }}>
        {project.subtitle.toLowerCase()}
      </p>
    </motion.article>
  );
};

// ── Main section ──────────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative" aria-labelledby="projects-heading">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-mono tracking-widest mb-3" style={{ color: 'rgba(0, 245, 255, 0.5)' }}>
            // works
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h1
              id="projects-heading"
              className="text-4xl md:text-5xl font-bold neon-text-cyan"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Projects
            </h1>

            {/* View toggle */}
            <div
              className="flex gap-1 p-1 rounded-lg holographic"
              role="group"
              aria-label="View mode"
            >
              {(['grid', 'list'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  aria-pressed={viewMode === mode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)]"
                  style={{
                    background: viewMode === mode ? 'hsla(var(--primary), 0.2)' : 'transparent',
                    color: viewMode === mode ? 'hsl(var(--primary))' : 'rgba(0, 245, 255, 0.5)',
                    border: viewMode === mode ? '1px solid hsl(var(--primary) / 0.4)' : '1px solid transparent',
                  }}
                >
                  {mode === 'grid' ? <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" /> : <List className="h-3.5 w-3.5" aria-hidden="true" />}
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── List View ─────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {viewMode === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="mb-16"
            >
              {portfolioData.projects.map((project, index) => (
                <ProjectListRow key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          )}

          {/* ── Grid View ─────────────────────────────────────── */}
          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="grid lg:grid-cols-2 gap-8 mb-16"
            >
              {portfolioData.projects.map((project, index) => {
                const colors = COLOR_STYLES[project.color] ?? COLOR_STYLES.primary;
                const isHovered = hoveredProject === project.id;

                return (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: index * 0.09 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onFocus={() => setHoveredProject(project.id)}
                    onBlur={() => setHoveredProject(null)}
                  >
                    <Card
                      className="holographic p-8 h-full transition-all duration-300 relative overflow-hidden group border-2"
                      style={{
                        borderColor: colors.border,
                        background: colors.bg,
                        boxShadow: isHovered
                          ? `0 20px 60px ${colors.shadow}, 0 0 20px ${colors.shadow}`
                          : '0 4px 20px rgba(0,0,0,0.3)',
                        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                      }}
                    >
                      {/* Animated shimmer on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)',
                        }}
                        aria-hidden="true"
                      />

                      <div className="relative z-10">
                        {/* Card header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h2 className="text-2xl font-bold neon-text-cyan mb-1">{project.title}</h2>
                            <p className="text-base" style={{ color: 'rgba(0, 245, 255, 0.65)' }}>{project.subtitle}</p>
                          </div>
                          <Zap
                            className="h-7 w-7 flex-shrink-0 animate-neon-pulse"
                            style={{ color: 'hsl(var(--electric))' }}
                            aria-hidden="true"
                          />
                        </div>

                        {/* Description */}
                        <p className="mb-6 leading-relaxed text-sm" style={{ color: 'rgba(0, 245, 255, 0.78)' }}>
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="mb-5">
                          <h3 className="text-xs font-bold mb-3 font-mono" style={{ color: 'hsl(var(--electric))' }}>
                            &gt; Tech Stack:
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-xs rounded-full border transition-colors"
                                style={{
                                  background: 'hsla(var(--primary), 0.08)',
                                  borderColor: 'rgba(0, 245, 255, 0.25)',
                                  color: 'var(--cyan-dim)',
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="mb-6">
                          <h3 className="text-xs font-bold mb-3 font-mono" style={{ color: 'hsl(var(--electric))' }}>
                            &gt; Key Achievements:
                          </h3>
                          <ul className="space-y-1.5 list-none m-0 p-0">
                            {project.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start text-xs" style={{ color: 'rgba(0, 245, 255, 0.7)' }}>
                                <span className="mr-2 mt-0.5 flex-shrink-0" style={{ color: 'hsl(var(--electric))' }} aria-hidden="true">▸</span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Source link */}
                        {project.sourceLink && (
                          <a
                            href={project.sourceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View source for ${project.title} on GitHub (opens in new tab)`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 hover:bg-[rgba(0,245,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                            style={{
                              borderColor: 'rgba(0, 245, 255, 0.4)',
                              color: 'var(--cyan-primary)',
                            }}
                          >
                            <Github className="h-4 w-4" aria-hidden="true" />
                            View Source
                          </a>
                        )}
                      </div>

                      {/* Corner decorations */}
                      <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 opacity-25" style={{ borderColor: colors.border }} aria-hidden="true" />
                      <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 opacity-25" style={{ borderColor: colors.border }} aria-hidden="true" />
                    </Card>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Stats Banner ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          viewport={{ once: true }}
          className="holographic p-8 rounded-2xl"
        >
          <dl className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {portfolioData.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm mb-2" style={{ color: 'var(--white-muted)' }}>{stat.label}</dt>
                <dd className="text-4xl font-bold neon-text-cyan">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectsSection;
