import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Github, Mail, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import cyberpunkCityscape from '@/assets/cyberpunk-cityscape.jpeg';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "Welcome to Qamber's Cyber Grid";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Scanlines effect */}
      <div className="scanlines absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 neon-text-cyan">
            {typedText}
            <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} text-electric`}>|</span>
          </h1>
          <p className="text-xl md:text-2xl text-electric mb-2">
            Initializing systems...
          </p>
          <p className="text-lg text-neon-cyan/80">
            {portfolioData.title}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="holographic p-8 rounded-lg mb-8 animate-float"
        >
          <p className="text-lg text-neon-cyan/80 mb-4">
            &gt; System Status: <span className="neon-text-cyan">ONLINE</span>
          </p>
          <p className="text-lg text-neon-cyan/80">
            &gt; Welcome, <span className="neon-text-cyan">Guest</span>
          </p>
          <p className="text-sm text-electric/70 mt-4">
            Enter the grid to explore my digital universe
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link to="/about">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg shadow-primary/50 transition-all hover:shadow-xl hover:shadow-primary/70"
            >
              <Terminal className="mr-2 h-5 w-5" />
              Initialize
            </Button>
          </Link>
          <Link to="/projects">
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 shadow-lg shadow-accent/30"
            >
              View Projects
            </Button>
          </Link>
          <Button
            onClick={() => window.open(portfolioData.github, '_blank')}
            size="lg"
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary/10 shadow-lg shadow-secondary/30"
          >
            <Github className="mr-2 h-5 w-5" />
            GitHub
          </Button>
          <Link to="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-electric text-electric hover:bg-electric/10 shadow-lg shadow-electric/30"
            >
              <Mail className="mr-2 h-5 w-5" />
              Connect
            </Button>
          </Link>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 border-2 border-primary/30 rounded-lg hidden md:block"
        />
        
        {/* THIS IS THE BLUE CIRCLE I REMOVED
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-20 right-10 w-32 h-32 border-2 border-accent/30 rounded-full hidden md:block"
        />
        */}
      </div>
    </section>
  );
};

export default HeroSection;