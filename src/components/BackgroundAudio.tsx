import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio playback error:', err);
      });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      <audio ref={audioRef} src="/audio/bg-ost.mp3" loop preload="auto" />
      <button
        id="bg-audio-toggle-btn"
        type="button"
        onClick={toggleAudio}
        className="flex items-center gap-2.5 rounded-full border border-violet-500/30 bg-[#0a0a0f]/90 px-4 py-2.5 backdrop-blur-md transition-all hover:border-violet-400 hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] cursor-pointer group"
        aria-label={isPlaying ? "Mute background audio" : "Play background audio"}
      >
        {isPlaying ? (
          <>
            <Volume2 size={16} className="text-violet-300 animate-pulse" />
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-violet-400 h-full animate-[bounce_1s_infinite_100ms]" />
              <span className="w-0.5 bg-violet-300 h-2/3 animate-[bounce_1s_infinite_300ms]" />
              <span className="w-0.5 bg-violet-400 h-full animate-[bounce_1s_infinite_200ms]" />
            </div>
          </>
        ) : (
          <VolumeX size={16} className="text-white/40 group-hover:text-violet-300 transition-colors" />
        )}
        <span className="font-mono text-xs tracking-wider text-violet-200/90 group-hover:text-white">
          OST // DARK ARIA <span className={isPlaying ? "text-emerald-400 font-bold" : "text-white/40"}>{isPlaying ? "[ON]" : "[OFF]"}</span>
        </span>
      </button>
    </div>
  );
}
