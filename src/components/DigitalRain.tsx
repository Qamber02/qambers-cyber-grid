import { useEffect, useRef } from 'react';

interface DigitalRainProps {
  reducedColumns?: boolean;
}

const DigitalRain = ({ reducedColumns = false }: DigitalRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/';
    const charList = chars.split('');
    const fontSize = 14;

    const numStreams = reducedColumns ? 35 : 110;
    const streams: Array<{
      startX: number;
      startY: number;
      progress: number;
      speed: number;
      length: number;
      chars: string[];
    }> = [];

    const getRandomEdgePoint = (width: number, height: number) => {
      const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let x = 0, y = 0;
      if (edge === 0) { // top
        x = Math.random() * width;
        y = -50;
      } else if (edge === 1) { // right
        x = width + 50;
        y = Math.random() * height;
      } else if (edge === 2) { // bottom
        x = Math.random() * width;
        y = height + 50;
      } else { // left
        x = -50;
        y = Math.random() * height;
      }
      return { x, y };
    };

    // Initialize streams with distributed progress
    for (let i = 0; i < numStreams; i++) {
      const edge = getRandomEdgePoint(canvas.width, canvas.height);
      streams.push({
        startX: edge.x,
        startY: edge.y,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.005,
        length: 5 + Math.floor(Math.random() * 8),
        chars: [],
      });
    }

    const draw = () => {
      // Clear with slight alpha to leave short trails
      ctx.fillStyle = 'rgba(5, 5, 16, 0.08)'; // #050510 (deep navy)
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const isMobileViewport = canvas.width < 768;
      const targetX = isMobileViewport ? canvas.width * 0.5 : canvas.width * 0.3;
      const targetY = isMobileViewport ? canvas.height * 0.35 : canvas.height * 0.45;

      ctx.font = fontSize + 'px monospace';

      streams.forEach((stream) => {
        stream.progress += stream.speed;

        if (stream.progress >= 1) {
          const edge = getRandomEdgePoint(canvas.width, canvas.height);
          stream.startX = edge.x;
          stream.startY = edge.y;
          stream.progress = 0;
          stream.speed = 0.002 + Math.random() * 0.005;
          stream.length = 5 + Math.floor(Math.random() * 8);
        }

        for (let j = 0; j < stream.length; j++) {
          const trailProgress = stream.progress - (j * 0.018);
          if (trailProgress < 0 || trailProgress > 1) continue;

          // Interpolate path from edge to heading target
          const x = stream.startX + (targetX - stream.startX) * trailProgress;
          const y = stream.startY + (targetY - stream.startY) * trailProgress;

          if (Math.random() > 0.98 || !stream.chars[j]) {
            stream.chars[j] = charList[Math.floor(Math.random() * charList.length)];
          }

          const trailFade = 1 - (j / stream.length);
          const targetFade = Math.min(1, (1 - trailProgress) * 4); // dissolves in last 25% near target
          const opacity = 0.18 * trailFade * targetFade; // strictly max 0.18 opacity

          if (opacity <= 0) continue;

          // Leader is bright neon cyan (#00f5ff), tail is secondary cyan (#4fc3f7)
          if (j === 0) {
            ctx.fillStyle = `rgba(0, 245, 255, ${opacity * 1.2})`;
          } else {
            ctx.fillStyle = `rgba(79, 195, 247, ${opacity})`;
          }

          ctx.fillText(stream.chars[j], x, y);
        }
      });
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      draw();
      return;
    }

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (prefersReducedMotion) {
        draw();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedColumns]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default DigitalRain;

