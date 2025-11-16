// Qamber's Portfolio Data extracted from CV

export const portfolioData = {
  name: "Qamber Muhammad Hanif",
  title: "Developer & UI/UX Enthusiast",
  location: "Sohrabi Ward Gwader Balochistan",
  email: "1111287@stud.uot.edu.pk",
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
      title: "Study Assistant",
      subtitle: "AI-powered PDF Learning Tool",
      description: "Developed an AI-powered study assistant that enables students to extract key information from PDFs, generate summaries, and ask content-based questions to facilitate smarter studying.",
      techStack: ["Python", "Google Gemini LLM", "Streamlit"],
      highlights: [
        "Integrated Google Gemini LLM",
        "PDF to interactive learning material",
        "Active recall and understanding features",
        "Smart content-based querying",
      ],
      color: "accent",
      sourceLink: "https://github.com/Qamber02/Study_Assistant", // <-- ADDED
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
      { name: "Python", level: 90, category: "language", icon: "python-logo.jpeg" as const },
      { name: "TypeScript", level: 95, category: "language", icon: "typescript-logo.jpeg" as const },
      { name: "JavaScript", level: 95, category: "language", icon: "javascript-logo.jpeg" as const },
      { name: "HTML/CSS", level: 95, category: "language", icon: "html-logo.jpeg" as const },
    ],
    frameworks: [
      { name: "React", level: 95, category: "framework" },
      { name: "Next.js", level: 90, category: "framework" },
      { name: "Vite", level: 85, category: "framework" },
      { name: "Flutter", level: 70, category: "framework" },
      { name: "Tailwind CSS", level: 95, category: "framework" },
    ],
    databases: [
      { name: "Supabase", level: 85, category: "database" },
      { name: "SQL", level: 80, category: "database", icon: "sql-logo.jpeg" as const },
      { name: "MariaDB", level: 75, category: "database" },
      { name: "SQLite", level: 80, category: "database" },
    ],
    tools: [
      { name: "VS Code", level: 95, category: "tool" },
      { name: "Git/GitHub", level: 90, category: "tool" },
      { name: "Electron", level: 75, category: "tool" },
    ],
    other: [
      { name: "TCP/IP", level: 80, category: "networking" },
      { name: "OSI Model", level: 75, category: "networking" },
      { name: "Website Optimization", level: 85, category: "other" },
      { name: "Troubleshooting", level: 90, category: "other" },
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