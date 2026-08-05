import { FeatureCarousel, ProjectData } from '@/components/ui/feature-carousel';

const systemGatesData: ProjectData[] = [
  {
    id: 1,
    gateNumber: '01',
    rank: 'S-RANK',
    title: 'Cherág',
    subtitle: 'AI Study Platform for Low Connectivity',
    status: '800+ Users Live',
    description:
      'AI-powered study assistant designed for students with limited/unreliable internet. Features an automatic failover cascade.',
    features: [
      '5-tier LLM cascade fallback (Gemini, DeepSeek, Groq, HuggingFace)',
      'Cognitive Belief Graph Engine modeling per-concept student understanding',
    ],
    stack: ['React 19', 'FastAPI', 'Supabase', 'Gemini AI', 'Vite'],
    link: 'https://cherag.pages.dev',
    repo: 'https://github.com/Qamber02/cherag',
  },
  {
    id: 2,
    gateNumber: '02',
    rank: 'S-RANK',
    title: 'Karwan',
    subtitle: 'Hyperlocal Food Delivery for Gwadar & Turbat',
    status: 'Zero-Coverage Region',
    description:
      'Hyperlocal food delivery platform built specifically for Gwadar and Turbat — regions with zero existing food delivery coverage.',
    features: [
      'Engineered customer app, vendor dashboard, and admin panel on unified backend',
      'Multi-role authentication with RBAC and session persistence',
    ],
    stack: ['Flutter', 'FastAPI', 'Supabase', 'React', 'RBAC'],
    link: '#',
  },
  {
    id: 3,
    gateNumber: '03',
    rank: 'A-RANK',
    title: 'Offline-First POS System',
    subtitle: 'Retail Point of Sale with IndexedDB',
    status: '100% Offline Capable',
    description:
      'Full-featured, offline-first POS system built specifically for low-connectivity retail environments.',
    features: [
      'Runs at 100% capacity offline with local IndexedDB storage',
      'Automatic background sync to Supabase when internet reconnects',
    ],
    stack: ['React 18', 'TypeScript', 'IndexedDB', 'Supabase', 'Electron'],
    link: '#',
    repo: 'https://github.com/Qamber02/pos-system',
  },
  {
    id: 4,
    gateNumber: '04',
    rank: 'A-RANK',
    title: 'DSA Visualizer',
    subtitle: 'Interactive Algorithm & Data Structure Tool',
    status: '40% Comprehension Boost',
    description:
      'Interactive visualization tool illustrating complex data structures and algorithms dynamically.',
    features: [
      '15+ interactive visualizer modules for algorithms & data structures',
      '40% increase in user comprehension during usability testing',
    ],
    stack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'React Hooks'],
    link: '#',
    repo: 'https://github.com/Qamber02/dsa-visualizer',
  },
  {
    id: 5,
    gateNumber: '05',
    rank: 'B-RANK',
    title: 'Pajjar',
    subtitle: 'High-Performance Offline Dictionary',
    status: 'Local Instance',
    description:
      'High-performance offline dictionary application engineered to provide instant search and robust local data storage.',
    features: [
      'Zero-latency offline search queries across full dictionary catalog',
      'Optimized local database architecture for zero-delay response',
    ],
    stack: ['Flutter', 'Dart', 'SQLite'],
    link: '#',
  },
];

const ProjectsSection = () => (
  <section id="projects" className="relative min-h-screen px-3 sm:px-6 py-12 sm:py-20 overflow-hidden">
    {/* Subtle Soldiers Background Overlay */}
    <div 
      className="absolute top-0 left-0 w-full h-[900px] opacity-[0.08] pointer-events-none mix-blend-screen" 
      style={{
        backgroundImage: 'url(/images/soldiers.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
      }} 
    />

    <div className="relative mx-auto max-w-6xl z-10">
      {/* 3D Cyber Gate Showcase Stage */}
      <div className="rounded-3xl border border-violet-500/20 bg-black/50 backdrop-blur-xl overflow-visible p-2 sm:p-6 shadow-2xl relative">
        <FeatureCarousel
          className="bg-transparent py-4"
          title={
            <>
              SYSTEM DIRECTORY // <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-blue-400">GATES</span>
            </>
          }
          subtitle="Explore completed instances, practical software systems, and low-latency infrastructure engineered for real-world impact."
          projects={systemGatesData}
        />
      </div>
    </div>
  </section>
);

export default ProjectsSection;
