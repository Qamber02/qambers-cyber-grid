import React from 'react';
import { FeatureCarousel, ProjectData } from '@/components/ui/feature-carousel';

export const FeatureCarouselDemo: React.FC = () => {
  const gates: ProjectData[] = [
    {
      id: 1,
      gateNumber: '01',
      rank: 'S-RANK',
      title: 'Cherág',
      subtitle: 'AI Study Platform for Low Connectivity',
      status: '800+ Users',
      description: 'AI-powered study assistant designed for students with limited/unreliable internet. Features an automatic failover cascade.',
      features: ['5-tier AI cascade', 'Cognitive Belief Graph Engine'],
      stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vite'],
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
      description: 'Hyperlocal food delivery platform built specifically for Gwadar and Turbat — regions with zero existing food delivery coverage.',
      features: ['Serves Gwadar & Turbat zero-coverage zones', 'Multi-role authentication with RBAC'],
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
      description: 'Full-featured, offline-first POS system built specifically for low-connectivity retail environments.',
      features: ['Runs at 100% capacity offline with local DB', 'Automatic background sync to Supabase'],
      stack: ['React', 'TypeScript', 'Dexie.js', 'Supabase', 'Electron'],
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
      description: 'Interactive visualization tool illustrating complex data structures and algorithms dynamically.',
      features: ['15+ interactive visualizer modules', '40% increase in user comprehension'],
      stack: ['TypeScript', 'Next.js', 'Tailwind CSS'],
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
      description: 'Offline dictionary application engineered to provide instant search and robust local data storage.',
      features: ['Zero-latency offline search queries', 'Optimized local database architecture'],
      stack: ['Flutter', 'Dart', 'SQLite'],
      link: '#',
    },
  ];

  const title = (
    <>
      System <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Gates</span>
    </>
  );

  return (
    <div className="w-full">
      <FeatureCarousel
        title={title}
        subtitle="Explore system gates and engineering instances."
        projects={gates}
      />
    </div>
  );
};

export default FeatureCarouselDemo;
