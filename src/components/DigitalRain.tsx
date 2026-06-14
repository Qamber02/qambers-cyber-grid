import { useEffect, useRef, memo } from 'react';

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



    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/';
    const charList = chars.split('');
    const fontSize = 14;
    const numStreams = reducedColumns ? 35 : 110;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    type Stream = {
      startX: number;
      startY: number;
      progress: number;
      speed: number;
      length: number;
      chars: string[];
    };

    const getRandomEdgePoint = (width: number, height: number): { x: number; y: number } => {
      const edge = Math.floor(Math.random() * 4);
      if (edge === 0) return { x: Math.random() * width, y: -50 };
      if (edge === 1) return { x: width + 50, y: Math.random() * height };
      if (edge === 2) return { x: Math.random() * width, y: height + 50 };
      return { x: -50, y: Math.random() * height };
    };

    const initStreams = (): Stream[] =>
      Array.from({ length: numStreams }, () => {
        const edge = getRandomEdgePoint(canvas.width, canvas.height);
        return {
          startX: edge.x,
          startY: edge.y,
          progress: Math.random(),
          speed: 0.001 + Math.random() * 0.0025,
          length: 5 + Math.floor(Math.random() * 8),
          chars: [],
        };
      });

    let streams = initStreams();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isMobileViewport = canvas.width < 768;
      const targetX = isMobileViewport ? canvas.width * 0.5 : canvas.width * 0.3;
      const targetY = isMobileViewport ? canvas.height * 0.35 : canvas.height * 0.45;

      ctx.font = `${fontSize}px monospace`;

      streams.forEach((stream) => {
        stream.progress += stream.speed;

        if (stream.progress >= 1) {
          const edge = getRandomEdgePoint(canvas.width, canvas.height);
          stream.startX = edge.x;
          stream.startY = edge.y;
          stream.progress = 0;
          stream.speed = 0.001 + Math.random() * 0.0025;
          stream.length = 5 + Math.floor(Math.random() * 8);
        }

        for (let j = 0; j < stream.length; j++) {
          const trailProgress = stream.progress - j * 0.018;
          if (trailProgress < 0 || trailProgress > 1) continue;

          const x = stream.startX + (targetX - stream.startX) * trailProgress;
          const y = stream.startY + (targetY - stream.startY) * trailProgress;

          if (Math.random() > 0.98 || !stream.chars[j]) {
            stream.chars[j] = charList[Math.floor(Math.random() * charList.length)];
          }

          const trailFade = 1 - j / stream.length;
          const targetFade = Math.min(1, (1 - trailProgress) * 4);
          const opacity = 0.3 * trailFade * targetFade;
          if (opacity <= 0) continue;

          ctx.fillStyle =
            j === 0
              ? `rgba(0, 245, 255, ${opacity * 1.2})`
              : `rgba(79, 195, 247, ${opacity})`;
          ctx.fillText(stream.chars[j], x, y);
        }
      });
    };

    // Animation loop — capped at ~30fps, paused when tab is hidden
    let rafId: number;
    let last = 0;
    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (now - last < 33) return; // ~30fps
      last = now;
      draw();
    };
    rafId = requestAnimationFrame(loop);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        last = 0;
        rafId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // Resize — reinitialize streams with fresh dimensions
    const handleResize = () => {
      setCanvasSize();
      streams = initStreams();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedColumns]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      aria-hidden="true"
    />
  );
};

export default memo(DigitalRain);
