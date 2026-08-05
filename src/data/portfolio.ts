// Qamber's Portfolio Data extracted from latest CV (2026)

export const portfolioData = {
  name: "Qamber Muhammad Hanif",
  title: "Full Stack Engineer & System Architect",
  location: "Gwadar & Turbat, Balochistan, Pakistan",
  email: "qamberhanif11@gmail.com",
  phone: "+92 323 3209195",
  github: "https://github.com/Qamber02",
  linkedin: "https://linkedin.com/in/qamberhanif",
  cvPath: "/Qambar_CV.pdf",

  experience: [
    {
      role: "Full Stack Engineer",
      company: "Evu (Unhire)",
      location: "Remote, New York, USA",
      period: "May 2026 – Present",
      bullets: [
        "Architected Expert Dashboard from scratch — freelancer contract management, milestone tracking, and earnings view; cut average task-completion navigation from 7 steps to 3 (60% reduction).",
        "Shipped real-time dispute chat with WebSocket rooms, Cloudinary file uploads, and persistent MongoDB message history; recorded 40% drop in support tickets within 30 days.",
        "Engineered full Stripe Connect onboarding-to-payout flow with webhook idempotency, stale-account recovery, and milestone fund releases synced with Firebase real-time UI.",
        "Eliminated Render free-tier cold-start latency via UptimeRobot keep-warm layer, reducing initial API response from ~15s to under 500ms.",
        "Built transactional email infrastructure with Resend across 12+ event triggers, driving a 30% improvement in client response rate.",
      ],
    },
    {
      role: "Full Stack Engineer (Intern)",
      company: "Evu (Unhire)",
      location: "Remote, New York, USA",
      period: "Feb 2026 – May 2026",
      bullets: [
        "Delivered production features across payments, real-time chat, and dashboards during 4-month internship, converting to full-time based on shipped impact.",
      ],
    },
  ],

  education: [
    {
      institution: "University of Turbat",
      location: "Kech, Balochistan",
      degree: "Bachelor of Computer Science",
      gpa: "3.32 CGPA",
      graduationDate: "Expected Dec 2027",
    },
    {
      institution: "Gwadar Degree College",
      location: "Gwadar, Balochistan",
      degree: "FSc in Pre-Engineering",
      score: "63%",
      graduationDate: "Jul 2023",
    },
    {
      institution: "Gwadar Grammar School",
      location: "Gwadar, Balochistan",
      degree: "Matriculation",
      score: "73%",
      graduationDate: "Aug 2021",
    },
  ],

  projects: [
    {
      id: 1,
      title: "Cherág",
      subtitle: "AI Study Platform for Low Connectivity",
      proof: "800+ users",
      description: "AI-powered study assistant designed for students with limited/unreliable internet. Built a 5-tier multi-model AI cascade (Gemini, DeepSeek, Groq Llama 3.3 70B, HuggingFace, OpenRouter) with automatic failover and key rotation — maintaining 99%+ AI feature uptime.",
      techStack: ["React 19", "FastAPI", "Supabase", "5-Tier AI Cascade", "Gemini", "Groq"],
      highlights: [
        "Live on cherag.pages.dev with 800+ registered users",
        "Cognitive Belief Graph Engine modeling per-concept student understanding",
        "5-tier LLM cascade fallback architecture ensuring 99%+ feature uptime",
        "Cognitive learning suite: RAG chat, Feynman mode, Knowledge Radar, Exam Simulator",
      ],
      color: "accent",
      liveLink: "https://cherag.pages.dev",
      sourceLink: "https://github.com/Qamber02/cherag",
    },
    {
      id: 2,
      title: "Karwan",
      subtitle: "Hyperlocal Food Delivery for Gwadar & Turbat",
      proof: "Zero-coverage regions",
      description: "Hyperlocal food delivery platform built specifically for Gwadar and Turbat — regions with zero existing food delivery coverage. Engineered customer mobile app, vendor dashboard, and admin panel as three distinct interfaces on a unified backend.",
      techStack: ["Flutter", "FastAPI", "Supabase", "React", "RBAC"],
      highlights: [
        "Serves Gwadar & Turbat where major apps (Foodpanda) have zero coverage",
        "Multi-role authentication with RBAC and session persistence",
        "Restaurant-owned delivery model at 12% commission",
      ],
      color: "primary",
    },
    {
      id: 3,
      title: "Offline-First POS System",
      subtitle: "Retail Point of Sale with IndexedDB",
      proof: "100% offline capable",
      description: "Full-featured, offline-first POS system designed for low-connectivity retail environments. Built a local-first IndexedDB layer with background Supabase auto-sync upon reconnection.",
      techStack: ["React 18", "TypeScript", "Supabase", "IndexedDB", "Electron"],
      highlights: [
        "Runs at 100% capacity offline with local IndexedDB state",
        "Automatic background sync to Supabase when internet reconnects",
        "Rewrote search across 10,000-item catalog for 90% query speedup",
      ],
      color: "secondary",
      sourceLink: "https://github.com/Qamber02/pos-system",
    },
    {
      id: 4,
      title: "DSA Visualizer",
      subtitle: "Interactive Algorithm & Data Structure Tool",
      proof: "40% comprehension boost",
      description: "Engineered an interactive visualization tool that dynamically illustrates complex data structures and algorithms, boosting user comprehension by over 40% in usability testing.",
      techStack: ["TypeScript", "Next.js", "Tailwind CSS"],
      highlights: [
        "15+ interactive visualizer modules",
        "40% increase in user comprehension",
        "Modular UI components with custom React hooks",
      ],
      color: "electric",
      sourceLink: "https://github.com/Qamber02/dsa-visualizer",
    },
  ],

  skills: {
    languages: [
      { name: "TypeScript" },
      { name: "JavaScript (ES2022+)" },
      { name: "Python" },
      { name: "SQL" },
      { name: "Dart" },
    ],
    frontend: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Flutter" },
      { name: "Vite" },
    ],
    backend: [
      { name: "Node.js" },
      { name: "FastAPI" },
      { name: "REST APIs" },
      { name: "WebSockets" },
      { name: "Resend / SMTP" },
    ],
    databases: [
      { name: "PostgreSQL (Supabase)" },
      { name: "MongoDB" },
      { name: "Firebase" },
      { name: "IndexedDB" },
    ],
    toolsDevOps: [
      { name: "Docker" },
      { name: "Linux (Ubuntu/Debian/Fedora)" },
      { name: "Cloudflare Pages" },
      { name: "Render / Railway" },
      { name: "Stripe Connect API" },
    ],
  },

  certifications: [
    "Google CyberSecurity Certificate",
    "Nvidia Networking Certificate",
    "WordPress Web Development Certificate",
    "OOP and GUI with Python Certificate - Arizona University",
    "FastAPI Production Backend Certificate",
  ],

  interests: [
    "Building regional infrastructure for Balochistan",
    "Multi-model LLM cascade architectures",
    "Offline-first systems design",
    "Interactive 3D visualization",
  ],
};