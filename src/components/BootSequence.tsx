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
    const timeout = window.setTimeout(() => dismiss(), 1100);
    return () => window.clearTimeout(timeout);
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
      className="boot-sequence fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-[#050507] px-6 text-left"
      aria-label="Dismiss introduction"
    >
      <div className="max-w-xl">
        <p className="system-label mb-5 text-violet-300/70">SYSTEM // INITIALIZATION</p>
        <p className="font-mono text-xl leading-relaxed text-violet-100 md:text-3xl">
          {messages[messageIndex].slice(0, characters)}<span className="boot-caret">▋</span>
        </p>
        <p className="mt-10 font-mono text-xs tracking-[0.2em] text-white/35">TAP ANYWHERE TO CONTINUE</p>
      </div>
    </button>
  );
};

export default BootSequence;
