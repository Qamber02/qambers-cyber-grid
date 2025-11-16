import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

const AudioManager = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for ambient synthwave
    audioRef.current = new Audio('/audio/background-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Auto-play with user interaction handling
    const playAudio = () => {
      audioRef.current?.play().catch(() => {
        // Browser blocked autoplay, will need user interaction
      });
    };

    playAudio();
    document.addEventListener('click', playAudio, { once: true });

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.3;
        audioRef.current.play();
      } else {
        audioRef.current.volume = 0;
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 holographic border-primary/50 hover:border-primary"
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? (
        <VolumeX className="h-5 w-5 text-primary" />
      ) : (
        <Volume2 className="h-5 w-5 text-neon-cyan" />
      )}
    </Button>
  );
};

export default AudioManager;
