// Qamber's Portfolio Data — single source of truth for all content

export const portfolioData = {
  name: "Qamber Muhammad Hanif",
  title: "Full Stack Engineer",
  location: "Gwadar, Balochistan",
  email: "qamberhanif11@gmail.com",
  github: "https://github.com/Qamber02",

  // Quick-facts strip (used in AboutSection)
  facts: [
    { label: "Location", value: "Gwadar, Balochistan" },
    { label: "University", value: "University of Turbat" },
    { label: "Graduating", value: "2027" },
    { label: "Status", value: "Available" },
  ],

  // Current work (used in AboutSection)
  currentWork: [
    {
      label: "Full Stack Intern",
      detail: "Unhire (EVU Ventures) — built the Stripe Connect payment architecture",
      color: "#00e5ff",
    },
    {
      label: "Karwan",
      detail: "Food delivery for Gwadar and Turbat — personal project",
      color: "#4fc3f7",
    },
    {
      label: "Cherág",
      detail: "AI learning tool built for students with limited internet",
      color: "#ff6b9d",
    },
  ],

  education: [
    {
      institution: "University Of Turbat",
      location: "Kech, Balochistan",
      degree: "Bachelor of Computer Science (In Progress)",
      gpa: "3.44 CGPA",
      graduationDate: "Dec 2027",
    },
    {
      institution: "Gwader Degree College",
      location: "Gwader, Balochistan",
      degree: "FSC in Pre-Engineering",
      score: "63%",
      graduationDate: "Jul 2023",
    },
    {
      institution: "Gwader Grammar School",
      location: "Gwader, Balochistan",
      degree: "Matric",
      score: "73%",
      graduationDate: "Aug 2021",
    },
  ],

  projects: [
    {
      id: 1,
      title: "DSA Visualizer",
      subtitle: "Interactive Web Application",
      description:
        "An interactive visualization tool that dynamically illustrates complex data structures and algorithms — making abstract concepts tangible and measurably improving comprehension.",
      techStack: ["TypeScript", "Next.js", "Tailwind CSS"],
      highlights: [
        "40% increase in user comprehension (usability testing)",
        "15+ visualizer modules shipped",
        "25% reduction in deployment errors",
        "Modular UI with React hooks",
      ],
      color: "primary",
      sourceLink: "https://github.com/Qamber02/dsa-visualizer",
    },
    {
      id: 2,
      title: "POS Shopping System",
      subtitle: "Modern Point of Sale",
      description:
        "A full-featured, offline-first point-of-sale system using React, TypeScript, and Electron. Works without internet and syncs automatically when back online.",
      techStack: ["React 18", "TypeScript", "Supabase", "Dexie", "Electron"],
      highlights: [
        "Full PWA support with service workers",
        "Offline-first with IndexedDB",
        "Auto-sync with Supabase when online",
        "90% faster search performance",
        "40% bundle size reduction",
      ],
      color: "secondary",
      sourceLink: "https://github.com/Qamber02/pos-system",
    },
    {
      id: 3,
      title: "Cherág",
      subtitle: "AI Learning Tool for Low Connectivity",
      description:
        "An AI-powered study assistant for students who don't have great internet. Extracts key information from educational materials, generates summaries, and queries content offline.",
      techStack: ["Node.js v18+", "Python 3.10+", "Supabase", "Gemini LLM"],
      highlights: [
        "Optimized for low-bandwidth environments",
        "Supabase backend for persistent cloud storage",
        "Node.js + Python hybrid runtime",
        "Active recall and smart content querying",
      ],
      color: "accent",
      sourceLink: "https://github.com/Qamber02/cherag",
    },
    {
      id: 4,
      title: "URL Health Checker",
      subtitle: "Streamlit-based URL Validation",
      description:
        "An interactive web app that automates URL extraction and validation across multiple input formats, processing over 10,000 URLs monthly with full verification coverage.",
      techStack: ["Python", "Streamlit"],
      highlights: [
        "40% reduction in manual checking time",
        "65% increase in data filtering efficiency",
        "Processes 10,000+ URLs monthly",
        "100% link verification coverage",
      ],
      color: "electric",
      sourceLink: "https://github.com/Qamber02/url-health-checker",
    },
  ],

  // Summary stats (used in ProjectsSection)
  stats: [
    { value: "4+", label: "Major Projects" },
    { value: "10K+", label: "URLs Processed" },
    { value: "40%", label: "Performance Boost" },
    { value: "15+", label: "Technologies" },
  ],

  skills: {
    languages: [
      { name: "Python" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Dart" },
    ],
    frontend: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Vite" },
      { name: "TailwindCSS" },
      { name: "Flutter" },
    ],
    backend: [
      { name: "FastAPI" },
      { name: "Node.js" },
      { name: "Express" },
    ],
    databases: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Supabase" },
    ],
    toolsDevOps: [
      { name: "Git" },
      { name: "Docker" },
      { name: "Stripe API" },
      { name: "Linux" },
    ],
  },

  certifications: [
    "Google CyberSecurity Certificate",
    "Nvidia Networking Certificate",
    "WordPress Web Development Certificate",
    "OOP and GUI with Python — Arizona University",
    "FastAPI Certificate",
  ],

  interests: [
    "Reading books",
    "Exploring emerging technologies",
    "Building interactive experiences",
    "3D visualization",
  ],
};