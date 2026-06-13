// Qamber's Portfolio Data extracted from CV

export const portfolioData = {
  name: "Qamber Muhammad Hanif",
  title: "Developer & UI/UX Enthusiast",
  location: "Sohrabi Ward Gwader Balochistan",
  email: "qamberhanif11@gmail.com",
  github: "https://github.com/Qamber02",
  
  education: [
    {
      institution: "University Of Turbat",
      location: "Kech, Balochistan",
      degree: "Bachelor Of Computer Science (In Progress)",
      gpa: "3.44 CGPA",
      graduationDate: "Dec 2027",
    },
    {
      institution: "Gwader Degree College",
      location: "Gwader, Balochistan",
      degree: "FSC in Pre Engineering",
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
      description: "Engineered an interactive visualization tool that dynamically illustrates complex data structures and algorithms, boosting user comprehension by over 40% as measured through usability testing metrics.",
      techStack: ["TypeScript", "Next.js", "Tailwind CSS"],
      highlights: [
        "40% increase in user comprehension",
        "15+ visualizer modules",
        "25% reduction in deployment errors",
        "Modular UI components with React hooks",
      ],
      color: "primary",
      sourceLink: "https://github.com/Qamber02/dsa-visualizer", // <-- ADDED
    },
    {
      id: 2,
      title: "POS Shopping System",
      subtitle: "Modern Point of Sale",
      description: "Developed a full-featured, offline-first POS system using React, TypeScript, and Electron, ensuring full functionality without an internet connection.",
      techStack: ["React 18", "TypeScript", "Supabase", "Dexie", "Electron"],
      highlights: [
        "Full PWA support with service workers",
        "Offline-first architecture with IndexedDB",
        "Auto-sync with Supabase when online",
        "90% faster search performance",
        "40% bundle size reduction",
      ],
      color: "secondary",
      sourceLink: "https://github.com/Qamber02/pos-system", // <-- ADDED
    },
    {
      id: 3,
      title: "Cherág",
      subtitle: "AI Learning Tool for Low Connectivity",
      description: "Developed Cherág, an AI-powered study assistant designed for students with limited internet connectivity. Enables students to extract key information from educational materials, generate summaries, and perform offline-first/low-bandwidth content querying.",
      techStack: ["Node.js (v18+)", "Python 3.10+", "Supabase Project", "Google Gemini LLM"],
      highlights: [
        "Specifically optimized for students with low-bandwidth internet",
        "Integrated Supabase backend for secure and persistent cloud storage",
        "Engineered Node.js (v18+) and Python (3.10+) hybrid runtime environment",
        "Implemented active recall and smart content-based querying algorithms",
      ],
      color: "accent",
      sourceLink: "https://github.com/Qamber02/cherag",
    },
    {
      id: 4,
      title: "URL Health Checker",
      subtitle: "Streamlit-based URL Validation",
      description: "Developed an interactive web application that automates URL extraction and validation from various input formats, processing over 10,000 URLs monthly.",
      techStack: ["Python", "Streamlit"],
      highlights: [
        "40% reduction in manual checking time",
        "65% increase in data filtering efficiency",
        "Processes 10,000+ URLs monthly",
        "100% link verification coverage",
      ],
      color: "electric",
      sourceLink: "https://github.com/Qamber02/url-health-checker", // <-- ADDED
    },
  ],

  skills: {
    languages: [
      { name: "Python", icon: "python-logo.jpeg" as const },
      { name: "JavaScript", icon: "javascript-logo.jpeg" as const },
      { name: "TypeScript", icon: "typescript-logo.jpeg" as const },
      { name: "Dart" },
    ],
    frontend: [
      { name: "React" },
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
      { name: "Linux (Ubuntu/Debian/Fedora)" },
    ],
  },

  certifications: [
    "Google CyberSecurity Certificate",
    "Nvidia Networking Certificate",
    "WordPress Web Development Certificate",
    "OOP and GUI with Python Certificate - Arizona University",
    "Fast API Certificate",
  ],

  interests: [
    "Reading books",
    "Exploring emerging technologies",
    "Building interactive experiences",
    "3D visualization",
  ],
};