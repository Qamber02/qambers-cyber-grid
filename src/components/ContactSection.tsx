import { motion } from 'framer-motion';
import { useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Github, Mail, Terminal, Download } from 'lucide-react';

const ContactSection = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([
    '> System initialized...',
    '> Type "help" for available commands',
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.toLowerCase().trim();
    const newOutput = [...output, `> ${command}`];

    switch (cmd) {
      case 'help':
        newOutput.push(
          '  Available commands:',
          '  • connect - Show contact information',
          '  • github - Open GitHub profile',
          '  • email - Open email client',
          '  • download_cv - Download resume',
          '  • clear - Clear terminal'
        );
        break;
      case 'connect':
        newOutput.push(
          `  Name: ${portfolioData.name}`,
          `  Email: ${portfolioData.email}`,
          `  GitHub: ${portfolioData.github}`
        );
        break;
      case 'github':
        window.open(portfolioData.github, '_blank');
        newOutput.push('  Opening GitHub profile...');
        break;
      case 'email':
        window.location.href = `mailto:${portfolioData.email}`;
        newOutput.push('  Opening email client...');
        break;
      case 'download_cv':
        newOutput.push('  Initiating CV download...');
        break;
      case 'clear':
        setOutput(['> Terminal cleared']);
        setCommand('');
        return;
      default:
        newOutput.push(`  Error: Command "${cmd}" not found. Type "help" for available commands.`);
    }

    setOutput(newOutput);
    setCommand('');
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold neon-text-cyan mb-4">
            &lt; Initialize Connection /&gt;
          </h2>
          <p className="text-xl text-electric">Establishing secure channel...</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="holographic p-6 h-full">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                <Terminal className="h-5 w-5 text-primary" />
                <span className="text-foreground font-mono">terminal@qamber:~$</span>
              </div>

              <div className="bg-black/30 rounded-lg p-4 h-80 overflow-y-auto mb-4 font-mono text-sm">
                {output.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line.startsWith('>') ? (
                      <span className="text-accent">{line}</span>
                    ) : (
                      <span className="text-foreground/80">{line}</span>
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleCommand} className="flex gap-2">
                <div className="flex-1 flex items-center bg-black/30 rounded-lg px-4">
                  <span className="text-primary mr-2">$</span>
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Type a command..."
                    className="flex-1 bg-transparent border-none outline-none text-foreground font-mono py-3"
                  />
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/80">
                  Execute
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Email */}
            <Card className="holographic p-6 hover:shadow-xl hover:shadow-neon-cyan/20 transition-all group cursor-pointer">
              <a href={`mailto:${portfolioData.email}`} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neon-cyan/20 flex items-center justify-center group-hover:bg-neon-cyan/30 transition-colors">
                  <Mail className="h-6 w-6 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neon-cyan group-hover:text-electric transition-colors">
                    Email
                  </h3>
                  <p className="text-neon-cyan/70">{portfolioData.email}</p>
                </div>
              </a>
            </Card>

            {/* GitHub */}
            <Card className="holographic p-6 hover:shadow-xl hover:shadow-electric/20 transition-all group cursor-pointer">
              <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center group-hover:bg-electric/30 transition-colors">
                  <Github className="h-6 w-6 text-electric" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neon-cyan group-hover:text-electric transition-colors">
                    GitHub
                  </h3>
                  <p className="text-neon-cyan/70">@{portfolioData.github.split('/').pop()}</p>
                </div>
              </a>
            </Card>

            {/* Download CV */}
            <Card className="holographic p-6 hover:shadow-xl hover:shadow-electric/20 transition-all group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center group-hover:bg-electric/30 transition-colors">
                  <Download className="h-6 w-6 text-electric" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-electric transition-colors">
                    Download CV
                  </h3>
                  <p className="text-muted-foreground">Get full resume</p>
                </div>
              </div>
            </Card>

            {/* Status Badge */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="holographic p-4 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Status: <span className="text-accent font-bold">Available for opportunities</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
