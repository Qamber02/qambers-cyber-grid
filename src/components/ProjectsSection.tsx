import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const ranks = ['S', 'S', 'A', 'B'] as const;

const ProjectsSection = () => (
  <section id="projects" className="min-h-screen px-4 py-20">
    <div className="mx-auto max-w-6xl">
      <p className="system-label text-violet-300">INSTANCE DIRECTORY // GATES</p>
      <h1 className="system-heading mt-4">Choose a gate.</h1>
      <p className="mt-4 max-w-2xl text-white/65">
        Each project is a completed instance: practical software, clear constraints, and systems engineered for real-world impact.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {portfolioData.projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="gate-card system-panel group relative flex flex-col justify-between overflow-hidden p-7"
          >
            <div>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-xs tracking-[.2em] text-violet-300/70">GATE 0{index + 1}</p>
                  <h2 className="mt-3 text-2xl font-bold text-white">{project.title}</h2>
                  <p className="mt-1 text-sm text-violet-200/70 font-mono">{project.subtitle}</p>
                </div>
                <span className="rank-badge">{ranks[index]}</span>
              </div>

              <p className="mt-5 text-sm leading-7 text-white/70">{project.description}</p>

              {/* Key Highlights / Metrics */}
              {project.highlights && (
                <ul className="mt-4 space-y-1.5 border-l-2 border-violet-500/30 pl-3 text-xs text-violet-200/80">
                  {project.highlights.slice(0, 2).map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2">
                      <span className="text-violet-400">▹</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="inventory-item">{tech}</span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex items-center gap-3 pt-4 border-t border-violet-300/10">
              {project.liveLink ? (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="system-button system-button--solid text-xs gap-2"
                >
                  Launch Cherág App <ExternalLink size={14} />
                </a>
              ) : (
                <a
                  href={project.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="system-button text-xs gap-2"
                >
                  View Repository <ArrowUpRight size={14} />
                </a>
              )}

              {project.sourceLink && project.liveLink && (
                <a
                  href={project.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="system-icon-button"
                  aria-label={`View ${project.title} source code`}
                >
                  <Github size={16} />
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
