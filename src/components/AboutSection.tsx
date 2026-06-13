import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { GraduationCap, Award } from 'lucide-react';
import { Card } from './ui/card';

const AboutSection = () => {
  const facts = [
    { label: 'Location', value: 'Gwadar, Balochistan' },
    { label: 'University', value: 'University of Turbat' },
    { label: 'Graduating', value: '2027' },
    { label: 'Status', value: 'Available' },
  ];

  const currentWork = [
    {
      label: 'Full Stack Intern',
      detail: 'Unhire (one of the EVU Ventures) — payment architecture',
      color: '#00e5ff',
    },
    {
      label: 'Karwan',
      detail: 'Food delivery for Gwadar and Turbat — personal project',
      color: '#4fc3f7',
    },
    {
      label: 'Cherág',
      detail: 'AI learning tool built for students with bad internet',
      color: '#ff6b9d',
    },
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">

        {/* Header — minimal, monospace */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm font-mono text-electric/60 mb-3 tracking-widest">// about me</p>
        </motion.div>

        {/* Bio — first, prominent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed max-w-3xl">
            I'm from Gwadar, Balochistan — a port city most people only know from geopolitics.
            I write code because the problems here are real and nobody else is solving them.
          </p>
          <p className="text-lg md:text-xl text-white/95 font-medium leading-relaxed mt-5 max-w-3xl">
            Right now I'm interning as a Full Stack Engineer at Unhire (one of the EVU Ventures),
            where I successfully built the payment architecture with{' '}
            <span className="text-accent font-semibold">Stripe Connect</span>.
            On the side I'm building{' '}
            <span className="font-semibold" style={{ color: '#4fc3f7', textShadow: 'none' }}>Karwan</span>{' '}
            (food delivery for Gwadar and Turbat) and{' '}
            <span className="font-semibold" style={{ color: '#ff6b9d', textShadow: 'none' }}>Cherág</span>{' '}
            (an AI learning tool for students who don't have great internet).
          </p>
          <p 
            className="text-sm italic mt-6 max-w-3xl font-light"
            style={{ color: 'rgba(255, 255, 255, 0.55)', lineHeight: '1.7', textShadow: 'none' }}
          >
            I graduate in 2027. I game on Linux. That's about it.
          </p>
        </motion.div>

        {/* Fact strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(0, 200, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px 24px',
          }}
        >
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col gap-1"
            >
              <span 
                className="font-mono uppercase"
                style={{
                  color: 'rgba(0, 200, 255, 0.6)',
                  letterSpacing: '2px',
                  fontSize: '0.7rem',
                }}
              >
                {fact.label}
              </span>
              <span className="text-white font-bold text-sm sm:text-base">
                {fact.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Current work callouts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs font-mono text-electric/50 mb-4 tracking-widest uppercase">// currently building</p>
          <div className="space-y-3">
            {currentWork.map((item) => (
              <div
                key={item.label}
                className="group flex items-start gap-4 py-[12px] px-[20px] rounded-[8px] border border-white/[0.08] bg-white/[0.03] transition-all duration-300 border-l-4 border-l-transparent hover:border-[rgba(0,200,255,0.4)] hover:border-l-accent"
              >
                <span 
                  className="font-mono font-bold text-sm min-w-[145px] tracking-wide"
                  style={{ color: item.color, textShadow: 'none' }}
                >
                  {item.label}
                </span>
                <span 
                  className="text-sm font-medium"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education — compact */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2 font-mono">
            <GraduationCap className="h-5 w-5" />
            Education
          </h3>
          <div className="space-y-3">
            {portfolioData.education.map((edu, index) => (
              <Card
                key={index}
                className="holographic p-5 hover:shadow-xl hover:shadow-primary/20 transition-all"
              >
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h4 className="font-bold text-accent">{edu.institution}</h4>
                    <p className="text-sm text-foreground/80">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground">{edu.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-mono text-sm font-bold">{edu.gpa || edu.score}</p>
                    <p className="text-xs text-muted-foreground">{edu.graduationDate}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Certifications — compact grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2 font-mono">
            <Award className="h-5 w-5" />
            Certs
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {portfolioData.certifications.map((cert, index) => (
              <div
                key={index}
                className="holographic p-3 rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-secondary/20 transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                <p className="text-sm text-foreground/80">{cert}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
