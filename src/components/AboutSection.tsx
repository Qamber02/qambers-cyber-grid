import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { GraduationCap, Award } from 'lucide-react';
import avatarImg from '@/assets/avatar.jpeg';
import { memo } from 'react';

// ─── Profile HUD Component ───────────────────────────────────────────────────
// Crisp profile photo rendering constrained to match the height of the bio text card on desktop.
const ProfileHud = () => (
  <div className="relative w-full max-w-[280px] h-[300px] lg:h-full mx-auto select-none flex flex-col justify-between pb-6">
    {/* Crisp 1px solid neon cyan border around the container */}
    <div 
      className="flex-1 w-full overflow-hidden relative border border-[var(--cyan-primary)] bg-[var(--bg-base)]"
    >
      <img
        src={avatarImg}
        alt="Qamber Muhammad Hanif"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'top' }}
        draggable="false"
      />
      {/* HUD scanner line scanning down (crisp overlay) */}
      <motion.div
        animate={{ translateY: ['-100%', '300%'] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 w-full h-[2px] bg-[var(--cyan-primary)] opacity-30 shadow-[0_0_4px_var(--cyan-primary)] pointer-events-none"
      />
    </div>

    {/* Metadata label */}
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between text-xs font-mono text-cyan-400 font-semibold">
      <span>REF: QMH_8842</span>
      <span>STATUS: SYNCED</span>
    </div>
  </div>
);

const AboutSection = () => (
  <section id="about" className="min-h-screen py-24 px-4 relative" aria-labelledby="about-heading">
    <div className="max-w-5xl mx-auto">

      {/* ── Header ──────────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        className="mb-12"
      >
        <p className="text-xs font-mono mb-2 tracking-[3px]" style={{ color: 'rgba(0, 245, 255, 0.5)' }}>
          // IDENTIFICATION REGISTRY
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
          The Story So Far.
        </h1>
      </motion.div>

      {/* ── Bio & Profile HUD Grid ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[64fr_36fr] gap-12 lg:gap-16 mb-16 items-stretch">
        {/* Left Column: Bio */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-[12px] border border-white/10" style={{ background: 'rgba(0,0,0,0.75)' }}
        >
          <p className="text-xl md:text-[22px] text-white font-semibold leading-relaxed">
            I'm from Gwadar, Balochistan — a port city most people know only from geopolitics.
            I write code because the problems here are real and nobody else is solving them.
          </p>
          <p className="text-lg md:text-xl font-semibold leading-relaxed mt-5" style={{ color: 'rgba(255,255,255,0.95)' }}>
            Right now I'm a Full Stack Engineer at{' '}
            <span className="font-bold text-[var(--cyan-primary)]">Unhire</span>{' '}
            (one of the EVU Ventures), where I built the payment architecture with Stripe Connect.
            On the side I'm building{' '}
            <span className="font-bold text-[var(--cyan-dim)]">Karwan</span>{' '}
            (food delivery for Gwadar and Turbat) and{' '}
            <span className="font-bold text-[#ff6b9d]">Cherág</span>{' '}
            (an AI learning tool for students who don't have great internet).
          </p>
          <p
            className="text-sm italic mt-5 font-medium"
            style={{ color: 'var(--white-muted)', lineHeight: '1.7' }}
          >
            Graduating 2027. Daily-driving Linux. Reading when I can.
          </p>
        </motion.div>

        {/* Right Column: HUD Profile Photo */}
        <motion.div
          className="h-full flex justify-center pt-6 lg:pt-0"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <ProfileHud />
        </motion.div>
      </div>

      {/* ── Diagnostic Fact strip ───────────────────────────── */}
      <motion.dl
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
      >
        {portfolioData.facts.map((fact, index) => {
          const codes = ["SYS_LOC", "SYS_EDU", "SYS_DATE", "SYS_STAT"];
          return (
            <div
              key={fact.label}
              className="flex flex-col gap-1 p-3 md:p-4 rounded-[8px] relative overflow-hidden transition-all duration-300 hover:bg-white/[0.04]"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                border: '1px solid rgba(0, 245, 255, 0.08)',
              }}
            >
              {/* Glow light indicator */}
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[var(--cyan-primary)] opacity-40 shadow-[0_0_6px_var(--cyan-primary)]" />
              <dt
                className="font-mono uppercase text-[9px] md:text-[10px] tracking-widest flex items-center justify-between text-cyan-400 font-semibold"
              >
                <span>{fact.label}</span>
                <span className="text-[7px] md:text-[8px] opacity-70 font-normal">[{codes[index % codes.length]}]</span>
              </dt>
              <dd className="text-white font-bold text-xs sm:text-[14px] md:text-[15px] mt-1 select-all truncate">{fact.value}</dd>
            </div>
          );
        })}
      </motion.dl>

      {/* ── Currently building ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="flex items-center justify-between mb-6 border-b border-[rgba(0,245,255,0.1)] pb-2">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'rgba(0, 245, 255, 0.6)' }}>
            // RUNNING PROCESS FEED
          </span>
          <span className="text-[9px] font-mono opacity-50 px-2 py-0.5 rounded border border-white/10 bg-white/5 uppercase animate-pulse">
            live sync
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {portfolioData.currentWork.map((item, index) => (
            <div
              key={item.label}
              className="p-5 rounded-[8px] border transition-all duration-300 hover:-translate-y-1 relative flex flex-col justify-between"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                borderColor: 'rgba(6, 182, 212, 0.5)', // border-cyan-500/50
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = item.color;
                e.currentTarget.style.boxShadow = `0 0 16px ${item.color}44`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
              }}
            >
              <div>
                {/* Header widget */}
                <div className="flex items-center justify-between mb-3 text-[9px] font-mono opacity-60">
                  <span>TASK_0{index + 1}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: item.color }} />
                    Active
                  </span>
                </div>
                <h3
                  className="font-mono font-bold text-sm tracking-wide mb-2"
                  style={{ color: item.color }}
                >
                  {item.label}
                </h3>
                <p className="text-xs font-medium leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {item.detail}
                </p>
              </div>

              {/* Diagnostic status line */}
              <div className="mt-5 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[9px] font-mono opacity-50">
                <span>SECTOR: PROD_ENV</span>
                <span>BA_OK //</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Education & Certifications ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          aria-labelledby="education-heading"
        >
          <h2
            id="education-heading"
            className="text-lg font-bold mb-6 flex items-center gap-2 font-mono text-[var(--cyan-primary)]"
          >
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
            Education
          </h2>
          <div className="space-y-4">
            {portfolioData.education.map((edu, index) => (
              <div
                key={index}
                className="p-5 rounded-lg border border-[rgba(0,245,255,0.15)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,245,255,0.15)] hover:border-[rgba(0,245,255,0.3)]" style={{ background: 'rgba(0,0,0,0.75)' }}
              >
                {/* Visual Header */}
                <div className="flex items-center justify-between text-[9px] font-mono text-[var(--cyan-primary)] opacity-60 mb-3">
                  <span>[ EDUCATION_RECORD_0{index + 1} ]</span>
                  <span>VERIFIED //</span>
                </div>

                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="font-bold text-[15px]" style={{ color: 'var(--cyan-primary)' }}>
                      {edu.institution}
                    </h3>
                    <p className="text-sm font-medium mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      {edu.degree}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--white-muted)' }}>
                      {edu.location}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-sm font-bold text-[var(--cyan-primary)]">
                      {edu.gpa ?? edu.score ?? '—'}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--white-muted)' }}>
                      {edu.graduationDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Certifications Section */}
        <motion.section
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          aria-labelledby="certs-heading"
        >
          <h2
            id="certs-heading"
            className="text-lg font-bold mb-6 flex items-center gap-2 font-mono text-[#ff6b9d]"
          >
            <Award className="h-5 w-5" aria-hidden="true" />
            Certifications
          </h2>
          <div className="space-y-4">
            {portfolioData.certifications.map((cert, index) => (
              <div
                key={index}
                className="p-4 rounded-lg flex items-center justify-between border border-white/[0.06] hover:bg-black/80 transition-all duration-300 hover:border-l-[#ff6b9d] border-l-2 border-l-transparent hover:shadow-[0_4px_16px_rgba(255,107,157,0.08)]" style={{ background: 'rgba(0,0,0,0.75)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-[#ff6b9d]/10 flex items-center justify-center border border-[#ff6b9d]/20 text-[#ff6b9d]">
                    <Award className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[13px] font-semibold text-white/90">{cert}</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-[#ff6b9d] opacity-80 px-2 py-0.5 border border-[#ff6b9d]/20 bg-[#ff6b9d]/5 rounded uppercase tracking-wider">
                  SECURE
                </span>
              </div>
            ))}
          </div>
        </motion.section>

      </div>

    </div>
  </section>
);

export default memo(AboutSection);
