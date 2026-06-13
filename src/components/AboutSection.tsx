import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { GraduationCap, Award } from 'lucide-react';
import { Card } from './ui/card';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const AboutSection = () => (
  <section id="about" className="min-h-screen py-20 px-4 relative" aria-labelledby="about-heading">
    <div className="max-w-5xl mx-auto">

      {/* ── Header ──────────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        className="mb-10"
      >
        <p className="text-sm font-mono mb-2 tracking-widest" style={{ color: 'rgba(0, 245, 255, 0.5)' }}>
          // about me
        </p>
        <h1
          id="about-heading"
          className="text-[38px] md:text-[52px] font-bold leading-tight"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: 'var(--cyan-primary)',
            textShadow: '0 0 36px rgba(0, 245, 255, 0.3)',
          }}
        >
          The story so far.
        </h1>
      </motion.div>

      {/* ── Bio ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-xl md:text-[22px] text-white font-medium leading-relaxed max-w-3xl">
          I'm from Gwadar, Balochistan — a port city most people know only from geopolitics.
          I write code because the problems here are real and nobody else is solving them.
        </p>
        <p className="text-lg md:text-xl font-medium leading-relaxed mt-5 max-w-3xl" style={{ color: 'rgba(255,255,255,0.92)' }}>
          Right now I'm a Full Stack Engineer at{' '}
          <span className="font-semibold" style={{ color: 'var(--cyan-primary)' }}>Unhire</span>{' '}
          (one of the EVU Ventures), where I built the payment architecture with Stripe Connect.
          On the side I'm building{' '}
          <span className="font-semibold" style={{ color: 'var(--cyan-dim)' }}>Karwan</span>{' '}
          (food delivery for Gwadar and Turbat) and{' '}
          <span className="font-semibold" style={{ color: '#ff6b9d' }}>Cherág</span>{' '}
          (an AI learning tool for students who don't have great internet).
        </p>
        <p
          className="text-sm italic mt-5 max-w-3xl font-light"
          style={{ color: 'var(--white-muted)', lineHeight: '1.7' }}
        >
          Graduating 2027. Daily-driving Linux. Reading when I can.
        </p>
      </motion.div>

      {/* ── Fact strip ──────────────────────────────────────── */}
      <motion.dl
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14 px-6 py-5 rounded-[10px]"
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid rgba(0, 200, 255, 0.1)',
        }}
      >
        {portfolioData.facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1">
            <dt
              className="font-mono uppercase"
              style={{
                color: 'rgba(0, 200, 255, 0.55)',
                letterSpacing: '2px',
                fontSize: '0.68rem',
              }}
            >
              {fact.label}
            </dt>
            <dd className="text-white font-bold text-sm sm:text-base">{fact.value}</dd>
          </div>
        ))}
      </motion.dl>

      {/* ── Currently building ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: 'rgba(0, 245, 255, 0.45)' }}>
          // currently building
        </p>
        <ul className="space-y-3 list-none m-0 p-0">
          {portfolioData.currentWork.map((item) => (
            <li
              key={item.label}
              className="flex items-start gap-4 py-3 px-5 rounded-[8px] border border-white/[0.08] bg-white/[0.03] transition-all duration-250 hover:border-[rgba(0,200,255,0.35)] hover:border-l-[var(--cyan-primary)] border-l-4 border-l-transparent"
            >
              <span
                className="font-mono font-bold text-sm min-w-[145px] tracking-wide flex-shrink-0"
                style={{ color: item.color }}
              >
                {item.label}
              </span>
              <span className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {item.detail}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* ── Education ───────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="mb-12"
        aria-labelledby="education-heading"
      >
        <h2 id="education-heading" className="text-lg font-bold mb-4 flex items-center gap-2 font-mono" style={{ color: 'hsl(var(--primary))' }}>
          <GraduationCap className="h-5 w-5" aria-hidden="true" />
          Education
        </h2>
        <div className="space-y-3">
          {portfolioData.education.map((edu, index) => (
            <Card
              key={index}
              className="holographic p-5 hover:shadow-xl transition-all duration-300"
              style={{ '--tw-shadow-color': 'hsl(var(--primary) / 0.2)' } as React.CSSProperties}
            >
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="font-bold" style={{ color: 'hsl(var(--accent))' }}>{edu.institution}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{edu.degree}</p>
                  <p className="text-xs" style={{ color: 'var(--white-muted)' }}>{edu.location}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-mono text-sm font-bold" style={{ color: 'hsl(var(--primary))' }}>
                    {edu.gpa ?? edu.score ?? '—'}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--white-muted)' }}>{edu.graduationDate}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* ── Certifications ──────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        aria-labelledby="certs-heading"
      >
        <h2 id="certs-heading" className="text-lg font-bold mb-4 flex items-center gap-2 font-mono" style={{ color: 'hsl(var(--secondary))' }}>
          <Award className="h-5 w-5" aria-hidden="true" />
          Certifications
        </h2>
        <ul className="grid md:grid-cols-2 gap-3 list-none m-0 p-0">
          {portfolioData.certifications.map((cert, index) => (
            <li
              key={index}
              className="holographic p-3 rounded-lg flex items-center gap-3 transition-all duration-200 hover:shadow-lg"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: 'hsl(var(--secondary))' }}
                aria-hidden="true"
              />
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.82)' }}>{cert}</span>
            </li>
          ))}
        </ul>
      </motion.section>

    </div>
  </section>
);

export default AboutSection;
