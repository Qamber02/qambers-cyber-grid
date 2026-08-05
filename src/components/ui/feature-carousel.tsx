import React from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- TYPES ---
export interface ProjectData {
  id: string | number;
  title: string;
  subtitle?: string;
  status: string;
  rank?: string;
  gateNumber?: string | number;
  description: string;
  features: string[];
  stack: string[];
  link?: string;
  repo?: string;
}

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: string;
  projects: ProjectData[];
}

export interface FeatureCarouselProps extends HeroProps {}

// --- FEATURE CAROUSEL COMPONENT ---
export const FeatureCarousel = React.forwardRef<HTMLDivElement, FeatureCarouselProps>(
  ({ title, subtitle, projects, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(
      projects.length ? Math.floor(projects.length / 2) : 0
    );

    const handleNext = React.useCallback(() => {
      if (!projects.length) return;
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, [projects.length]);

    const handlePrev = () => {
      if (!projects.length) return;
      setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    };

    React.useEffect(() => {
      if (!projects.length) return;
      const timer = setInterval(() => {
        handleNext();
      }, 6000);
      return () => clearInterval(timer);
    }, [handleNext, projects.length]);

    if (!projects || projects.length === 0) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground py-8 px-2 sm:px-6 select-none',
          className
        )}
        {...props}
      >
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute bottom-0 left-[-15%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(139,92,246,0.3),rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-0 right-[-15%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(59,130,246,0.3),rgba(255,255,255,0))]"></div>
        </div>

        {/* Section Header */}
        <div className="z-10 flex w-full flex-col items-center text-center space-y-3 mb-8 sm:mb-12 max-w-4xl px-4">
          {title && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* 3D Stage Area */}
        <div className="relative w-full min-h-[640px] sm:min-h-[680px] md:min-h-[740px] flex items-center justify-center py-4">
          <div className="relative w-full min-h-[640px] sm:min-h-[680px] md:min-h-[740px] flex items-center justify-center [perspective:1400px]">
            {projects.map((gate, index) => {
              const offset = index - currentIndex;
              const total = projects.length;
              let pos = (offset + total) % total;
              if (pos > Math.floor(total / 2)) {
                pos = pos - total;
              }

              const isCenter = pos === 0;
              const isAdjacent = Math.abs(pos) === 1;

              const gateLabel = gate.gateNumber ? `GATE ${gate.gateNumber}` : `GATE 0${index + 1}`;

              return (
                <div
                  key={gate.id || index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'absolute w-[320px] sm:w-[500px] md:w-[640px] lg:w-[720px] min-h-[600px] sm:min-h-[640px] md:min-h-[680px]',
                    'transition-all duration-500 ease-out cursor-pointer',
                    'bg-[#060608] border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between text-left shadow-2xl backdrop-blur-2xl group relative',
                    'hover:border-purple-400/60 hover:bg-gradient-to-b hover:from-purple-950/30 hover:via-[#08080d] hover:to-[#060608]'
                  )}
                  style={{
                    transform: `
                      translateX(${(pos) * 40}%)
                      scale(${isCenter ? 1 : isAdjacent ? 0.86 : 0.7})
                      rotateY(${(pos) * -8}deg)
                    `,
                    zIndex: isCenter ? 25 : isAdjacent ? 10 : 1,
                    opacity: isCenter ? 1 : isAdjacent ? 0.55 : 0,
                    filter: isCenter ? 'none' : 'blur(2px)',
                    visibility: Math.abs(pos) > 1 ? 'hidden' : 'visible',
                    pointerEvents: Math.abs(pos) > 1 ? 'none' : 'auto',
                  }}
                >
                  {/* Glowing Top Accent Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-r from-purple-500 via-violet-400 to-blue-500 opacity-70 group-hover:opacity-100 transition-opacity" />

                  {/* Card Main Body */}
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      {/* Top Header Row: Gate Number, Rank, Status */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs tracking-[0.25em] text-purple-300 uppercase font-semibold">
                          {gateLabel}
                        </span>
                        <div className="flex items-center gap-2">
                          {gate.rank && (
                            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-purple-950/90 border border-purple-500/40 text-purple-200">
                              {gate.rank}
                            </span>
                          )}
                          <span className="inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-500/15 border border-purple-500/40 text-purple-300">
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                            {gate.status}
                          </span>
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                        {gate.title}
                      </h2>
                      {gate.subtitle && (
                        <p className="mt-0.5 text-xs font-mono text-purple-300/70">
                          {gate.subtitle}
                        </p>
                      )}

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-sm text-gray-300/90 leading-relaxed">
                        {gate.description}
                      </p>

                      {/* Features Bullet List */}
                      {gate.features && gate.features.length > 0 && (
                        <div className="mt-3.5 space-y-1.5 border-l-2 border-purple-500/40 pl-3">
                          {gate.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-1.5">
                              <Sparkles size={13} className="text-purple-400 shrink-0 mt-0.5" />
                              <span className="text-xs text-purple-200/90">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Area: Tech Stack & Action Links */}
                    <div className="pt-4 border-t border-white/10 mt-3 space-y-3">
                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {gate.stack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-2.5 pt-1">
                        {gate.link && gate.link !== '#' ? (
                          <a
                            href={gate.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md shadow-purple-900/40"
                          >
                            <span>Launch Gate App</span>
                            <ExternalLink size={14} />
                          </a>
                        ) : null}

                        {gate.repo && gate.repo !== '#' ? (
                          <a
                            href={gate.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono font-medium bg-white/10 hover:bg-white/15 border border-white/20 text-gray-100 transition-all"
                          >
                            <Github size={14} />
                            <span>View Repository</span>
                          </a>
                        ) : !gate.link || gate.link === '#' ? (
                          <div className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-950/40 px-3 py-1.5 backdrop-blur-sm text-xs font-mono tracking-wider text-purple-300">
                            <Shield size={13} className="text-purple-400" />
                            <span>PROPRIETARY SYSTEM // IN PRODUCTION</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 rounded-full h-11 w-11 z-30 bg-black/80 border-purple-500/40 hover:border-purple-400 text-white backdrop-blur-md shadow-xl"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 rounded-full h-11 w-11 z-30 bg-black/80 border-purple-500/40 hover:border-purple-400 text-white backdrop-blur-md shadow-xl"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }
);

FeatureCarousel.displayName = 'FeatureCarousel';
export const HeroSection = FeatureCarousel;
