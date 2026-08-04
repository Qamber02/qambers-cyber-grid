import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { usePortalTransition } from './PortalTransition';

const ranks = ['S', 'A', 'S', 'B'] as const;

const ProjectsSection = () => {
  const { transition } = usePortalTransition();
  return <section id="projects" className="min-h-screen px-4 py-20"><div className="mx-auto max-w-6xl">
    <p className="system-label text-violet-300">INSTANCE DIRECTORY // GATES</p>
    <h1 className="system-heading mt-4">Choose a gate.</h1>
    <p className="mt-4 max-w-2xl text-white/65">Each project is a completed instance: practical software, clear constraints, and systems that make a measurable difference.</p>
    <div className="mt-12 grid gap-5 md:grid-cols-2">
      {portfolioData.projects.map((project, index) => <motion.article key={project.id} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="gate-card system-panel group relative overflow-hidden p-7">
        <div className="flex items-start justify-between gap-6"><div><p className="font-mono text-xs tracking-[.2em] text-violet-300/70">GATE 0{index + 1}</p><h2 className="mt-3 text-2xl font-bold text-white">{project.title}</h2><p className="mt-1 text-sm text-violet-200/65">{project.subtitle}</p></div><span className="rank-badge">{ranks[index]}</span></div>
        <p className="mt-6 text-sm leading-7 text-white/65">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">{project.techStack.map((tech) => <span key={tech} className="inventory-item">{tech}</span>)}</div>
        <div className="mt-7 flex items-center gap-3"><button type="button" onClick={() => transition()} className="system-button text-xs">Enter instance <ArrowUpRight size={14} /></button>{project.sourceLink && <a href={project.sourceLink} target="_blank" rel="noopener noreferrer" className="system-icon-button" aria-label={`View ${project.title} source`}><Github size={16} /></a>}</div>
      </motion.article>)}
    </div>
  </div></section>;
};

export default ProjectsSection;
