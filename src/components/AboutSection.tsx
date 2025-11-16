import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { Card } from './ui/card';

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold neon-text-cyan mb-4">
            &lt; System Analysis /&gt;
          </h2>
          <p className="text-xl text-electric">Scanning neural pathways...</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="holographic p-8 rounded-2xl mb-12 max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-bold neon-text-cyan mb-4">
                {portfolioData.name}
              </h3>
              <p className="text-xl text-electric mb-2">{portfolioData.title}</p>
              <p className="text-neon-cyan/70 mb-4">
                <span className="text-accent">Location:</span> {portfolioData.location}
              </p>
              <div className="space-y-2">
                <p className="text-neon-cyan/80">
                  <span className="text-electric">Email:</span>{' '}
                  <a href={`mailto:${portfolioData.email}`} className="hover:text-accent transition-colors">
                    {portfolioData.email}
                  </a>
                </p>
                <p className="text-neon-cyan/80">
                  <span className="text-electric">GitHub:</span>{' '}
                  <a 
                    href={portfolioData.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {portfolioData.github.split('/').pop()}
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48 border-4 border-primary rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-neon-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl neon-text">QMH</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-primary mb-6 flex items-center">
            <GraduationCap className="mr-3 h-8 w-8" />
            Education
          </h3>
          <div className="space-y-4">
            {portfolioData.education.map((edu, index) => (
              <Card key={index} className="holographic p-6 hover:shadow-xl hover:shadow-primary/20 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h4 className="text-xl font-bold text-accent">{edu.institution}</h4>
                    <p className="text-lg text-foreground">{edu.degree}</p>
                    <p className="text-muted-foreground">{edu.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-bold">{edu.gpa || edu.score}</p>
                    <p className="text-sm text-muted-foreground">{edu.graduationDate}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-secondary mb-6 flex items-center">
            <Award className="mr-3 h-8 w-8" />
            Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {portfolioData.certifications.map((cert, index) => (
              <Card 
                key={index} 
                className="holographic p-4 hover:shadow-lg hover:shadow-secondary/20 transition-all"
              >
                <p className="text-foreground flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3" />
                  {cert}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-accent mb-6 flex items-center">
            <BookOpen className="mr-3 h-8 w-8" />
            Interests
          </h3>
          <div className="flex flex-wrap gap-4">
            {portfolioData.interests.map((interest, index) => (
              <Card 
                key={index}
                className="holographic px-6 py-3 hover:shadow-lg hover:shadow-accent/20 transition-all"
              >
                <span className="text-accent"># </span>
                <span className="text-foreground">{interest}</span>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
