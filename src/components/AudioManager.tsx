import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioManager = () => {
  // Start muted = true because autoplay is almost always blocked by default.
  // The icon reflects actual audio state, not intent.
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio/background-music.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Mark as ready once metadata loads (file exists)
    audio.addEventListener('canplay', () => setIsReady(true), { once: true });

    // Try autoplay after first user gesture
    const tryPlay = () => {
      audio.play().then(() => {
        setIsMuted(false);
      }).catch(() => {
        // Autoplay still blocked — stay muted
      });
    };
    document.addEventListener('click', tryPlay, { once: true });

    return () => {
      document.removeEventListener('click', tryPlay);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = 0.3;
      audio.play().catch(() => {});
      setIsMuted(false);
    } else {
      audio.volume = 0;
      audio.pause();
      setIsMuted(true);
    }
  };

  // Don't render if the audio file hasn't loaded (prevents orphaned button)
  if (!isReady && isMuted) return null;

  return (
    <button
      onClick={toggleMute}
      title={isMuted ? 'Unmute ambient audio' : 'Mute ambient audio'}
      aria-label={isMuted ? 'Unmute ambient audio' : 'Mute ambient audio'}
      aria-pressed={!isMuted}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 holographic hover:shadow-[0_0_16px_rgba(0,245,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
      style={{
        border: '1px solid rgba(0, 245, 255, 0.3)',
      }}
    >
      {isMuted ? (
        <VolumeX className="h-4 w-4" style={{ color: 'hsl(var(--primary))' }} aria-hidden="true" />
      ) : (
        <Volume2 className="h-4 w-4" style={{ color: 'hsl(var(--accent))' }} aria-hidden="true" />
      )}
    </button>
  );
};

export default AudioManager;
