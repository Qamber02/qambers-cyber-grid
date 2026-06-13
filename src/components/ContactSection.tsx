import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { portfolioData } from '@/data/portfolio';
import { Card } from './ui/card';
import { Github, Mail, Download } from 'lucide-react';

// ── Utility — triggers a file download ───────────────────────────────────────
function downloadFile(href: string, filename: string) {
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const MAX_TERMINAL_LINES = 50;

const ContactSection = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([
    '> System initialized...',
    '> Type "help" for available commands',
  ]);
  const terminalOutputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal to bottom whenever output changes
  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.toLowerCase().trim();
    const newLines: string[] = [`> ${command}`];

    switch (cmd) {
      case 'help':
        newLines.push(
          '  Available commands:',
          '  • connect      — Show contact info',
          '  • github       — Open GitHub profile',
          '  • email        — Open email client',
          '  • download_cv  — Download resume',
          '  • clear        — Clear terminal'
        );
        break;
      case 'connect':
        newLines.push(
          `  Name:   ${portfolioData.name}`,
          `  Email:  ${portfolioData.email}`,
          `  GitHub: ${portfolioData.github}`
        );
        break;
      case 'github':
        window.open(portfolioData.github, '_blank', 'noopener,noreferrer');
        newLines.push('  Opening GitHub profile...');
        break;
      case 'email':
        window.location.href = `mailto:${portfolioData.email}`;
        newLines.push('  Opening email client...');
        break;
      case 'download_cv':
        newLines.push('  Initiating CV download...');
        downloadFile('/cv.pdf', 'Qamber_CV.pdf');
        break;
      case 'clear':
        setOutput(['> Terminal cleared']);
        setCommand('');
        return;
      default:
        newLines.push(`  Error: "${cmd}" not found. Type "help" for available commands.`);
    }

    // Cap at MAX_TERMINAL_LINES to prevent unbounded growth
    setOutput((prev) => [...prev, ...newLines].slice(-MAX_TERMINAL_LINES));
    setCommand('');
  };

  // Contact card data — avoids repetitive JSX
  const contactCards = [
    {
      id: 'email',
      icon: Mail,
      title: 'Email',
      label: portfolioData.email,
      href: `mailto:${portfolioData.email}`,
      iconColor: 'hsl(var(--accent))',
      iconBg: 'hsla(var(--accent), 0.15)',
      shadowColor: 'hsla(var(--accent), 0.2)',
    },
    {
      id: 'github',
      icon: Github,
      title: 'GitHub',
      label: `@${portfolioData.github.split('/').pop()}`,
      href: portfolioData.github,
      target: '_blank' as const,
      iconColor: 'hsl(var(--electric))',
      iconBg: 'hsla(var(--electric), 0.15)',
      shadowColor: 'hsla(var(--electric), 0.2)',
    },
    {
      id: 'cv',
      icon: Download,
      title: 'Download CV',
      label: 'Get full resume',
      href: '/cv.pdf',
      download: 'Qamber_CV.pdf',
      iconColor: 'hsl(var(--electric))',
      iconBg: 'hsla(var(--electric), 0.15)',
      shadowColor: 'hsla(var(--electric), 0.2)',
    },
  ];

  return (
    <section id="contact" className="min-h-screen py-20 px-4 relative" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono tracking-widest mb-3" style={{ color: 'rgba(0, 245, 255, 0.45)' }}>
            // initialize connection
          </p>
          <h1
            id="contact-heading"
            className="text-4xl md:text-5xl font-bold neon-text-cyan mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let's build something.
          </h1>
          <p className="text-lg" style={{ color: 'hsl(var(--electric))' }}>
            Open to internships, collaborations, and interesting problems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── Terminal ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <Card className="holographic p-6 h-full">
              {/* macOS-style title bar */}
              <div
                className="flex items-center px-1 mb-4 pb-3 relative"
                style={{ borderBottom: '1px solid rgba(0, 245, 255, 0.1)' }}
              >
                {/* Traffic-light dots */}
                <div className="flex items-center gap-1.5 flex-shrink-0" aria-hidden="true">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ background: '#ff5f57', boxShadow: '0 0 4px rgba(255,95,87,0.6)' }}
                    title="Close"
                  />
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ background: '#febc2e', boxShadow: '0 0 4px rgba(254,188,46,0.6)' }}
                    title="Minimize"
                  />
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ background: '#28c840', boxShadow: '0 0 4px rgba(40,200,64,0.6)' }}
                    title="Maximize"
                  />
                </div>

                {/* Centered hostname — absolutely positioned to be truly centered */}
                <span
                  className="absolute left-1/2 -translate-x-1/2 font-mono text-xs select-none"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  terminal@qamber-sys:~
                </span>
              </div>

              {/* Output */}
              <div
                ref={terminalOutputRef}
                role="log"
                aria-live="polite"
                aria-label="Terminal output"
                tabIndex={0}
                className="rounded-lg p-4 mb-4 font-mono text-sm overflow-y-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)]"
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  height: '18rem',
                }}
              >
                {output.map((line, index) => (
                  <div key={index} className="mb-1 leading-relaxed">
                    {line.startsWith('>') ? (
                      <span style={{ color: 'hsl(var(--accent))' }}>{line}</span>
                    ) : (
                      <span style={{ color: 'rgba(255,255,255,0.75)' }}>{line}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleCommand} className="flex gap-2">
                <div
                  className="flex-1 flex items-center rounded-lg px-4"
                  style={{ background: 'rgba(0, 0, 0, 0.35)' }}
                >
                  <span className="mr-2 font-mono" style={{ color: 'hsl(var(--primary))' }}>$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Type a command..."
                    aria-label="Terminal command input"
                    className="flex-1 bg-transparent border-none outline-none font-mono py-3 text-sm"
                    style={{ color: 'rgba(255,255,255,0.9)' }}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm font-medium font-mono transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                  style={{
                    background: 'hsl(var(--primary))',
                    color: '#fff',
                  }}
                >
                  Run
                </button>
              </form>
            </Card>
          </motion.div>

          {/* ── Contact Cards ─────────────────────────────────── */}
          <div className="space-y-4">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className="holographic p-6 group cursor-pointer transition-all duration-250"
                    style={{
                      ['--hover-shadow' as string]: card.shadowColor,
                    }}
                  >
                    <a
                      href={card.href}
                      target={card.target}
                      rel={card.target === '_blank' ? 'noopener noreferrer' : undefined}
                      download={card.download}
                      className="flex items-center gap-4 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] rounded"
                      aria-label={`${card.title}: ${card.label}`}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                        style={{ background: card.iconBg }}
                      >
                        <Icon className="h-5 w-5" style={{ color: card.iconColor }} aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold transition-colors duration-200" style={{ color: 'var(--cyan-dim)' }}>
                          {card.title}
                        </h2>
                        <p className="text-sm" style={{ color: 'rgba(0, 245, 255, 0.6)' }}>{card.label}</p>
                      </div>
                    </a>
                  </Card>
                </motion.div>
              );
            })}

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.4 }}
              viewport={{ once: true }}
              className="holographic p-4 text-center rounded-xl"
            >
              <p className="text-sm" style={{ color: 'var(--white-muted)' }}>
                Status:{' '}
                <span className="font-bold" style={{ color: 'hsl(var(--accent))' }}>
                  Available for opportunities
                </span>
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
