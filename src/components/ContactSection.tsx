import { Download, Github, Mail, ShieldCheck } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const ContactSection = () => (
  <section id="contact" className="relative min-h-screen px-4 py-20 overflow-hidden">
    {/* Subtle Hero Background Overlay */}
    <div 
      className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none mix-blend-screen" 
      style={{
        backgroundImage: 'url(/images/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
      }} 
    />
    <div className="relative mx-auto max-w-4xl z-10">
  <p className="system-label text-violet-300">GUILD REGISTRATION // OPEN CHANNEL</p>
  <h1 className="system-heading mt-4">Join the guild.</h1>
  <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">Have a difficult problem worth solving? Send a signal. I’m available for thoughtful engineering work and collaboration.</p>
  <div className="system-panel mt-12 p-6 md:p-9"><div className="mb-7 flex items-center gap-3 border-b border-violet-300/15 pb-5"><ShieldCheck className="text-violet-300" /><div><p className="font-mono text-sm text-violet-100">REGISTRATION ACCEPTED</p><p className="mt-1 text-xs text-white/40">SELECT A SECURE CHANNEL</p></div></div>
    <div className="grid gap-3 sm:grid-cols-3"><a className="contact-channel" href={`mailto:${portfolioData.email}`}><Mail size={18} /><span><b>Email</b><small>{portfolioData.email}</small></span></a><a className="contact-channel" href={portfolioData.github} target="_blank" rel="noopener noreferrer"><Github size={18} /><span><b>GitHub</b><small>@Qamber02</small></span></a><a className="contact-channel" href="/cv.pdf" download="Qamber_CV.pdf"><Download size={18} /><span><b>Curriculum vitae</b><small>Download file</small></span></a></div>
  </div>
</div></section>
);

export default ContactSection;
