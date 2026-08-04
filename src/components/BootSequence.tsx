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
      className="boot-sequence fixed inset-0 z-[100] grid cursor-pointer place-items-center px-6 text-left"
      aria-label="Enter the Gate"
      style={{
        backgroundColor: '#050507',
        backgroundImage: 'linear-gradient(to bottom, rgba(5,5,7,0.8), rgba(5,5,7,0.5)), url(/images/gate.jpg)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-xl text-center flex flex-col items-center">
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
