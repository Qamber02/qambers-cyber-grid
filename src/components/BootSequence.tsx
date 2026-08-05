import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import gsap from 'gsap';
import { useGate } from './GateContext';

// ── Lazy portal canvas (independent Suspense — not gated behind this) ──
const PortalScene = lazy(() => import('./three/PortalScene'));

// ── Error boundary for the gate's portal canvas only ──
class PortalErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

const MESSAGES = [
  '[System] Player has been recognized.',
  'Arise, Qamber Muhammad Hanif.',
];

// ── Typewriter hook ──
function useTypewriter(messages: string[]) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const msg = messages[msgIndex];
    if (charCount < msg.length) {
      const t = window.setTimeout(() => setCharCount((c) => c + 1), 27);
      return () => window.clearTimeout(t);
    }
    if (msgIndex < messages.length - 1) {
      const t = window.setTimeout(() => {
        setMsgIndex((i) => i + 1);
        setCharCount(0);
      }, 460);
      return () => window.clearTimeout(t);
    }
  }, [charCount, msgIndex, messages]);

  const done =
    msgIndex === messages.length - 1 && charCount === messages[msgIndex].length;

  return { text: messages[msgIndex].slice(0, charCount), done };
}

export default function BootSequence() {
  const { status, enter, directorRef } = useGate();

  // ── UI refs for GSAP ──
  const overlayRef     = useRef<HTMLDivElement>(null);
  const labelRef       = useRef<HTMLParagraphElement>(null);
  const messageRef     = useRef<HTMLParagraphElement>(null);
  const pillRef        = useRef<HTMLDivElement>(null);
  const blackClipRef   = useRef<HTMLDivElement>(null);

  // ── Hero canvas state — pre-mounted at opacity 0, frameloop=never ──
  const [heroMounted, setHeroMounted]     = useState(false);
  const [heroVisible, setHeroVisible]     = useState(false);
  const [heroFrameloop, setHeroFrameloop] = useState<'always' | 'never'>('never');
  const [animating, setAnimating]         = useState(false);

  const { text, done } = useTypewriter(MESSAGES);

  // Respect reduced-motion preference
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleEnter = useCallback(() => {
    if (animating) return;
    setAnimating(true);

    // Step 1: pre-mount hero canvas (idle, invisible)
    setHeroMounted(true);

    if (prefersReduced) {
      // Reduced-motion: plain opacity cross-fade, no zoom
      const tl = gsap.timeline({
        onComplete: () => {
          enter();
        },
      });
      tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.3 })
        .call(() => {
          setHeroFrameloop('always');
          setHeroVisible(true);
        });
      return;
    }

    // Full fly-through animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          ctx.revert();
        },
      });

      // t=0 → ~1.1s: tween director.progress 0→1 (portal scales/distorts)
      tl.to(directorRef.current, {
        progress: 1,
        duration: 1.1,
        ease: 'power2.inOut',
      }, 0);

      // Staggered UI fade — label → message → pill (name last would need separate ref)
      tl.to(
        [labelRef.current, messageRef.current, pillRef.current].filter(Boolean),
        {
          autoAlpha: 0,
          y: -12,
          stagger: 0.1,
          duration: 0.35,
          ease: 'power2.in',
        },
        0.1,
      );

      // ~0.9s: black clip overlay fades in
      tl.to(
        blackClipRef.current,
        { autoAlpha: 1, duration: 0.2, ease: 'power2.in' },
        0.85,
      );

      // ~1.0s: at black peak — flip hero frameloop, fade in
      tl.call(() => {
        setHeroFrameloop('always');
        setHeroVisible(true);
      }, [], 1.0);

      tl.to(
        blackClipRef.current,
        { autoAlpha: 0, duration: 0.25, ease: 'power2.out' },
        1.05,
      );

      // Gate fully unmounts, session set
      tl.call(() => {
        enter();
      }, [], 1.2);
    });
  }, [animating, directorRef, enter, prefersReduced]);

  // Don't render anything if already entered
  if (status === 'entered') return null;

  return (
    <div className="boot-sequence fixed inset-0 z-[100] overflow-hidden bg-[#050507]">
      {/* ── Full-black cross-fade clip overlay ── */}
      <div
        ref={blackClipRef}
        className="pointer-events-none absolute inset-0 z-50 bg-[#050507]"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />

      {/* ── Hero canvas pre-mount (invisible, idle) ── */}
      {heroMounted && (
        <div
          className="absolute inset-0 z-40"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
          aria-hidden="true"
        >
          {/* HeroSection import would create a circular dep — we embed only the portal here */}
        </div>
      )}

      {/* ── Gate atmospheric background ── */}
      <div
        className="absolute inset-0 z-0 opacity-45 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/gate.jpg)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-0 opacity-15 mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/broken-glass.jpg)' }}
        aria-hidden="true"
      />

      {/* ── Gate 3D canvas — own Suspense ── */}
      <div className="absolute inset-0 z-10" aria-hidden="true">
        <PortalErrorBoundary
          fallback={
            <div
              className="absolute inset-0 opacity-40 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/gate.jpg)' }}
            />
          }
        >
          <Suspense fallback={null}>
            <PortalScene director={directorRef} />
          </Suspense>
        </PortalErrorBoundary>
      </div>

      {/* ── Dark gradient overlay for text readability ── */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#050507]/70 via-[#050507]/20 to-[#050507]/80"
        aria-hidden="true"
      />

      {/* ── Foreground UI (renders synchronously — always clickable) ── */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <p
          ref={labelRef}
          className="system-label mb-5 text-violet-300/80 tracking-[0.3em] font-bold"
        >
          SYSTEM // INITIALIZATION
        </p>
        <p
          ref={messageRef}
          className="font-mono text-xl leading-relaxed text-violet-100 md:text-3xl drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]"
        >
          {text}
          <span className="boot-caret">▋</span>
        </p>

        {done && (
          <div
            ref={pillRef}
            className="mt-12"
          >
            <button
              id="gate-enter-btn"
              type="button"
              onClick={handleEnter}
              className="animate-pulse rounded-sm border border-violet-500/50 bg-violet-500/10 px-8 py-3 backdrop-blur-sm transition-all hover:bg-violet-500/30 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:animate-none cursor-pointer"
              aria-label="Enter the gate"
            >
              <p className="font-mono text-sm tracking-[0.25em] text-violet-200">
                ENTER THE GATE
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
