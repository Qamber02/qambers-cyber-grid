import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const stats: Array<[string, string, number, string]> = [
  ['STR', 'Full-stack delivery', 88, 'Shipped Unhire expert dashboard and Stripe Connect flow'], 
  ['INT', 'AI / ML systems', 92, '5-tier multi-model AI orchestration with automatic failover'], 
  ['AGI', 'Product iteration', 84, 'Cut average task-completion navigation from 7 steps to 3'], 
  ['VIT', 'Reliability & uptime', 86, 'Maintaining 99%+ AI feature uptime via cascade fallback'], 
  ['PER', 'UX & problem discovery', 80, '40% drop in support tickets within 30 days via real-time chat'],
];

export default function StatSheet() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActive(true); }, { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!active || !root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => gsap.to('[data-stat-fill]', { width: (index) => `${stats[index][2]}%`, duration: 1, ease: 'power3.out', stagger: 0.12 }), root);
    return () => context.revert();
  }, [active]);
  return <div ref={root} className="system-panel mt-12 overflow-hidden p-6 md:p-8">
    <div className="mb-7 flex items-center justify-between border-b border-violet-300/15 pb-4"><p className="system-label text-violet-300">PLAYER STATUS</p><span className="font-mono text-xs text-violet-100/45">LEVEL 01</span></div>
    <div className="space-y-6">{stats.map(([label, description, value, proof]) => <div key={label}>
      <div className="mb-2 flex justify-between font-mono text-xs"><span className="text-violet-200">{label} <span className="ml-2 text-white/40">{description}</span></span><span className="text-violet-300">{value}</span></div>
      <div className="h-1.5 bg-white/5"><div data-stat-fill className="h-full bg-gradient-to-r from-violet-700 to-violet-300" style={{ width: active && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? `${value}%` : '0%' }} /></div>
      <p className="mt-1.5 font-mono text-[10px] text-violet-200/40">{proof}</p>
    </div>)}</div>
  </div>;
}
