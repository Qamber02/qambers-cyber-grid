import { useEffect, useState } from 'react';

const STORAGE_KEY = 'arise-boot-seen';
const messages = ['[System] Player has been recognized.', 'Arise, Qamber Muhammad Hanif.'];

const BootSequence = () => {
  const [visible, setVisible] = useState(() => localStorage.getItem(STORAGE_KEY) !== 'true');
  const [messageIndex, setMessageIndex] = useState(0);
  const [characters, setCharacters] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const message = messages[messageIndex];
    if (characters < message.length) {
      const timeout = window.setTimeout(() => setCharacters((value) => value + 1), 27);
      return () => window.clearTimeout(timeout);
    }
    if (messageIndex < messages.length - 1) {
      const timeout = window.setTimeout(() => {
        setMessageIndex((value) => value + 1);
        setCharacters(0);
      }, 460);
      return () => window.clearTimeout(timeout);
    }
    // Require user to tap to dismiss
  }, [characters, messageIndex, visible]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={dismiss}
      className="boot-sequence fixed inset-0 z-[100] grid cursor-pointer place-items-center px-6 text-left bg-[#050507] overflow-hidden"
      aria-label="Enter the Gate"
    >
      {/* Background Broken Glass Layer for empty sides */}
      <div 
        className="absolute inset-0 z-0 opacity-20 mix-blend-screen bg-cover bg-center" 
        style={{ backgroundImage: 'url(/images/broken-glass.jpg)' }} 
      />
      
      {/* Gate Image Layer with horizontal edge fade */}
      <div className="absolute inset-0 z-10 flex justify-center items-center pointer-events-none">
        <img 
          src="/images/gate.jpg" 
          alt="" 
          className="h-full w-full max-w-4xl object-contain object-center opacity-90" 
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'
          }}
        />
      </div>

      {/* Dark gradient overlay to ensure text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050507]/80 to-[#050507]/30 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-20 max-w-xl text-center flex flex-col items-center">
        <p className="system-label mb-5 text-violet-300/80 tracking-[0.3em] font-bold">SYSTEM // INITIALIZATION</p>
        <p className="font-mono text-xl leading-relaxed text-violet-100 md:text-3xl drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]">
          {messages[messageIndex].slice(0, characters)}<span className="boot-caret">▋</span>
        </p>
        
        {messageIndex === messages.length - 1 && characters === messages[messageIndex].length && (
          <div className="mt-12 animate-pulse rounded-sm border border-violet-500/50 bg-violet-500/10 px-8 py-3 backdrop-blur-sm transition-all hover:bg-violet-500/30 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
            <p className="font-mono text-sm tracking-[0.25em] text-violet-200">ENTER THE GATE</p>
          </div>
        )}
      </div>
    </button>
  );
};

export default BootSequence;
