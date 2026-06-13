import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import {
  Github,
  ArrowUpRight,
  Terminal as TermIcon,
  Play,
  Trash2,
  X,
  Grid,
  List,
  Check,
  Cpu,
  Layers,
  Sparkles,
  Search,
} from 'lucide-react';
import { useState, useRef, useEffect, memo } from 'react';

type Project = (typeof portfolioData.projects)[0];

const ACCENT_COLORS: Record<string, { primary: string; glow: string; border: string; bg: string }> = {
  primary: {
    primary: '#00f5ff',
    glow: 'rgba(0, 245, 255, 0.25)',
    border: 'rgba(0, 245, 255, 0.15)',
    bg: 'rgba(0, 245, 255, 0.03)',
  },
  secondary: {
    primary: '#ff00ff',
    glow: 'rgba(255, 0, 255, 0.25)',
    border: 'rgba(255, 0, 255, 0.15)',
    bg: 'rgba(255, 0, 255, 0.03)',
  },
  accent: {
    primary: '#00ff9d',
    glow: 'rgba(0, 255, 157, 0.25)',
    border: 'rgba(0, 255, 157, 0.15)',
    bg: 'rgba(0, 255, 157, 0.03)',
  },
  electric: {
    primary: '#4fc3f7',
    glow: 'rgba(79, 195, 247, 0.25)',
    border: 'rgba(79, 195, 247, 0.15)',
    bg: 'rgba(79, 195, 247, 0.03)',
  },
};

const CATEGORIES = ['All', 'Frontend', 'Full-Stack', 'AI & Systems', 'Tools & CLI'] as const;

// ── Interactive Terminal Simulator Component ─────────────────────────────────
interface TerminalProps {
  project: Project;
  onClose: () => void;
  accent: string;
}

const ProjectTerminal = ({ project, onClose, accent }: TerminalProps) => {
  const [history, setHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const outputEndRef = useRef<HTMLDivElement>(null);

  // Setup initial sequence based on project type
  useEffect(() => {
    let logs: string[] = [];
    if (project.id === 1) {
      logs = [
        `Initializing DSA-Visualizer Core v1.0.0...`,
        `[OK] TypeScript modules compiled.`,
        `[OK] Next.js SSR hydration complete.`,
        `[OK] Data Structure nodes mapped to canvas.`,
        `Type 'help' or click quick-commands below.`,
      ];
    } else if (project.id === 2) {
      logs = [
        `Booting POS-Shopping Desktop Host...`,
        `[OK] IndexedDB wrapper (Dexie) mounted.`,
        `[OK] PWA service workers activated.`,
        `[WARNING] Offline mode: sync buffer holding.`,
        `Type 'help' or click quick-commands below.`,
      ];
    } else if (project.id === 3) {
      logs = [
        `Initializing Cherág Low-Connectivity Neural Client...`,
        `[OK] Node.js + Python hybrid runtime link active.`,
        `[OK] Local vector embedding database loaded.`,
        `[OK] Offline compression pipeline verified.`,
        `Type 'help' or click quick-commands below.`,
      ];
    } else {
      logs = [
        `Loading URL Health Checker daemon...`,
        `[OK] Streamlit engine initialized.`,
        `[OK] Multithreaded validation pool: 40 threads.`,
        `[OK] Local validation caches synchronized.`,
        `Type 'help' or click quick-commands below.`,
      ];
    }
    setHistory(logs);
  }, [project.id]);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim().toLowerCase();
    if (!raw) return;

    let response: string[] = [`$ ${cmdStr}`];

    if (raw === 'clear') {
      setHistory([]);
      return;
    }

    if (raw === 'help') {
      response.push(
        `Available Commands:`,
        `  help     - Display this screen`,
        `  clear    - Clear console screen`,
        `  exit     - Close the terminal session`,
        project.id === 1 ? `  sort     - Execute Bubble vs Quick Sort benchmark` : '',
        project.id === 1 ? `  test     - Run algorithms unit tests` : '',
        project.id === 2 ? `  sync     - Run local Supabase sync pipeline` : '',
        project.id === 2 ? `  bench    - Benchmark offline DB lookup latency` : '',
        project.id === 3 ? `  query    - Simulate vector search query` : '',
        project.id === 3 ? `  compress - Test Brotli data compression ratio` : '',
        project.id === 4 ? `  check    - Probe target URL batch` : '',
        project.id === 4 ? `  stats    - View monthly validation statistics` : ''
      );
    } else if (raw === 'exit') {
      onClose();
      return;
    } else if (project.id === 1 && raw === 'sort') {
      response.push(
        `[RUNNING] Executing Sort Performance Benchmark (N=10,000)...`,
        `[PROBING] Bubble Sort: O(N^2) complexity...`,
        `[PROBING] Quick Sort: O(N log N) complexity...`,
        `>> Bubble Sort completed in: 420.4ms`,
        `>> Quick Sort completed in:  8.2ms`,
        `[OK] Quick Sort is 51.2x faster for this dataset.`
      );
    } else if (project.id === 1 && raw === 'test') {
      response.push(
        `[TEST] Running Jest algorithm validation suites...`,
        `✓ LinkedList.test.ts (4 / 4 passed)`,
        `✓ RedBlackTree.test.ts (8 / 8 passed)`,
        `✓ Dijkstra.test.ts (5 / 5 passed)`,
        `[SUCCESS] 17/17 test modules passed successfully.`
      );
    } else if (project.id === 2 && raw === 'sync') {
      response.push(
        `[SYNC] Opening tunnel to Supabase backend...`,
        `Connecting: secure SSL channel established.`,
        `Scanning IndexedDB buffer: found 14 queued transactions.`,
        `Uploading batches [1/2] [2/2]...`,
        `[OK] 14 items committed to Supabase tables.`,
        `Status: In-Sync. Offline database verified.`
      );
    } else if (project.id === 2 && raw === 'bench') {
      response.push(
        `[BENCHMARK] Testing Dexie DB key-range retrieval...`,
        `Queried 50,000 product nodes in memory.`,
        `Mean index search latency: 1.25ms`,
        `Cache hit efficiency: 98.6%`,
        `[OK] Local database performance is within standard thresholds.`
      );
    } else if (project.id === 3 && raw === 'query') {
      response.push(
        `[QUERY] Ask Cherág: "Explain active recall"`,
        `Vector similarity index search: searching local database...`,
        `Retrieved 2 context nodes (cosine similarity > 0.85).`,
        `AI Response: "Active recall is the practice of testing memory during the learning process. Cherag optimizes this for low connectivity by caching neural embedding weights directly on-device."`
      );
    } else if (project.id === 3 && raw === 'compress') {
      response.push(
        `[COMPRESS] Loading text data compression pipe...`,
        `Original file size: 12.84 MB`,
        `Applying Brotli compression level 9...`,
        `Compressed size:    1.41 MB`,
        `[OK] Compression complete. Ratio: 9.1:1 (89.0% saved).`,
        `Data packet is ready for transmission over low-bandwidth GSM.`
      );
    } else if (project.id === 4 && raw === 'check') {
      response.push(
        `[PROBING] Scanning URL queue source...`,
        `Found 150 unique URL target definitions.`,
        `Initializing thread pool of 40 worker streams...`,
        `[200 OK]  https://github.com`,
        `[200 OK]  https://google.com`,
        `[301 RED] https://qamber.dev`,
        `[OK] Probe results: 148 online, 2 redirected, 0 broken.`
      );
    } else if (project.id === 4 && raw === 'stats') {
      response.push(
        `[STATS] Querying validation daemon metrics...`,
        `Total URL validations: 14,240 monthly`,
        `Validation Success Rate: 99.8%`,
        `Parallel concurrency limit: 40 streams`,
        `Mean response latency: 84ms per probe`
      );
    } else {
      response.push(`bash: command not found: '${raw}'. Type 'help' for options.`);
    }

    setHistory((prev) => [...prev, ...response].filter(Boolean));
  };

  const handleQuickCommand = (cmd: string) => {
    executeCommand(cmd);
  };

  return (
    <div
      className="rounded-lg border font-mono text-xs overflow-hidden flex flex-col mt-4"
      style={{
        borderColor: `${accent}40`,
        background: 'rgba(3, 3, 12, 0.85)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
      }}
    >
      {/* macOS Terminal Titlebar */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{
          borderColor: `${accent}22`,
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <div className="flex gap-1.5 items-center">
          <button
            onClick={onClose}
            className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] hover:opacity-80 transition-opacity"
            title="Close"
          />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[10px] opacity-40 select-none">
          {project.title.toLowerCase().replace(/\s+/g, '_')}_sys.sh
        </span>
        <div className="w-9" />
      </div>

      {/* Terminal Outputs */}
      <div className="p-3 h-48 overflow-y-auto space-y-1.5 flex flex-col select-text">
        {history.map((line, i) => (
          <div key={i} className="leading-relaxed break-words whitespace-pre-wrap">
            {line.startsWith('$') ? (
              <span className="text-white font-bold">{line}</span>
            ) : line.startsWith('[OK]') || line.startsWith('✓') || line.startsWith('[SUCCESS]') ? (
              <span style={{ color: '#00ff9d' }}>{line}</span>
            ) : line.startsWith('[WARNING]') ? (
              <span className="text-yellow-400">{line}</span>
            ) : (
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{line}</span>
            )}
          </div>
        ))}
        <div ref={outputEndRef} />
      </div>

      {/* Quick Commands Buttons */}
      <div
        className="px-3 py-2 border-t flex flex-wrap gap-1.5 justify-start"
        style={{
          borderColor: `${accent}22`,
          background: 'rgba(0,0,0,0.2)',
        }}
      >
        <span className="text-[10px] text-white/30 uppercase tracking-widest flex items-center mr-1">Quick:</span>
        {project.id === 1 && (
          <>
            <button
              onClick={() => handleQuickCommand('sort')}
              className="px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-950/20 hover:bg-cyan-950/40 text-[10px] transition-colors"
            >
              Benchmark Sort
            </button>
            <button
              onClick={() => handleQuickCommand('test')}
              className="px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-950/20 hover:bg-cyan-950/40 text-[10px] transition-colors"
            >
              Run Test Suite
            </button>
          </>
        )}
        {project.id === 2 && (
          <>
            <button
              onClick={() => handleQuickCommand('sync')}
              className="px-2 py-0.5 rounded border border-pink-500/30 text-pink-400 bg-pink-950/20 hover:bg-pink-950/40 text-[10px] transition-colors"
            >
              Sync Supabase
            </button>
            <button
              onClick={() => handleQuickCommand('bench')}
              className="px-2 py-0.5 rounded border border-pink-500/30 text-pink-400 bg-pink-950/20 hover:bg-pink-950/40 text-[10px] transition-colors"
            >
              Bench DB
            </button>
          </>
        )}
        {project.id === 3 && (
          <>
            <button
              onClick={() => handleQuickCommand('query')}
              className="px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40 text-[10px] transition-colors"
            >
              AI Vector query
            </button>
            <button
              onClick={() => handleQuickCommand('compress')}
              className="px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40 text-[10px] transition-colors"
            >
              Brotli Zip
            </button>
          </>
        )}
        {project.id === 4 && (
          <>
            <button
              onClick={() => handleQuickCommand('check')}
              className="px-2 py-0.5 rounded border border-sky-500/30 text-sky-400 bg-sky-950/20 hover:bg-sky-950/40 text-[10px] transition-colors"
            >
              Scan URLs
            </button>
            <button
              onClick={() => handleQuickCommand('stats')}
              className="px-2 py-0.5 rounded border border-sky-500/30 text-sky-400 bg-sky-950/20 hover:bg-sky-950/40 text-[10px] transition-colors"
            >
              Check Stats
            </button>
          </>
        )}
        <button
          onClick={() => handleQuickCommand('clear')}
          className="px-2 py-0.5 rounded border border-white/20 text-white/50 bg-white/5 hover:bg-white/10 text-[10px] transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      {/* Terminal Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          executeCommand(inputValue);
          setInputValue('');
        }}
        className="flex items-center px-3 py-1.5 border-t"
        style={{
          borderColor: `${accent}22`,
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <span className="mr-1.5 opacity-40 select-none">$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type command ('help', 'clear', 'exit')..."
          className="flex-1 bg-transparent border-none outline-none py-0.5 font-mono text-xs focus:ring-0 placeholder-white/20 text-white"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
};

// ── Project Grid Card ────────────────────────────────────────────────────────
interface CardProps {
  project: Project;
  index: number;
}

const ProjectGridCard = memo(({ project, index }: CardProps) => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowStyle = ACCENT_COLORS[project.color] ?? ACCENT_COLORS.primary;
  const accent = glowStyle.primary;

  // Track cursor movement on card for dynamic neon glow coordinate shifts
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative rounded-xl border p-6 backdrop-blur-md overflow-hidden transition-all duration-300"
      style={{
        borderColor: glowStyle.border,
        background: 'rgba(5, 5, 20, 0.45)',
        boxShadow: `0 4px 30px rgba(0,0,0,0.4)`,
      }}
    >
      {/* High-tech HUD Brackets on corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l opacity-40 group-hover:opacity-100 transition-opacity" style={{ borderColor: accent }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r opacity-40 group-hover:opacity-100 transition-opacity" style={{ borderColor: accent }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l opacity-40 group-hover:opacity-100 transition-opacity" style={{ borderColor: accent }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r opacity-40 group-hover:opacity-100 transition-opacity" style={{ borderColor: accent }} />

      {/* Dynamic Cursor Glow Parallax */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(180px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${glowStyle.glow}, transparent 75%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* macOS Control Bar + Subtitle */}
        <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-3" aria-hidden="true">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#ff5f57', opacity: 0.7 }} />
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#febc2e', opacity: 0.7 }} />
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#28c840', opacity: 0.7 }} />
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase opacity-40">
            {project.category}
          </span>
        </div>

        {/* Title / Subtitle */}
        <div className="mb-3">
          <h2
            className="text-2xl font-bold leading-tight tracking-tight text-white group-hover:text-shadow-glow"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              ['--glow-color' as string]: glowStyle.glow,
            }}
          >
            {project.title}
          </h2>
          <p className="text-xs font-mono mt-1" style={{ color: `${accent}cc` }}>
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-white/75 mb-5 select-text">
          {project.description}
        </p>

        {/* Features highlights */}
        <div className="mb-5">
          <ul className="space-y-1.5 list-none m-0 p-0">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start text-xs text-white/70">
                <span
                  className="mr-2 flex-shrink-0 mt-0.5 text-[9px] font-bold"
                  style={{ color: accent }}
                  aria-hidden="true"
                >
                  ▸
                </span>
                <span className="select-text">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded border"
              style={{
                borderColor: `${accent}30`,
                color: accent,
                background: `${accent}0a`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Panel */}
        <div className="mt-auto pt-4 border-t border-white/[0.05] flex items-center justify-between gap-3">
          {project.sourceLink && (
            <a
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium hover:text-white transition-colors py-2 px-3 rounded border border-white/10 hover:bg-white/5"
            >
              <Github className="w-3.5 h-3.5" />
              Source
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          )}

          <button
            onClick={() => setTerminalOpen((t) => !t)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold py-2 px-3.5 rounded transition-all active:scale-[0.98]"
            style={{
              background: terminalOpen ? 'rgba(255,255,255,0.08)' : `${accent}15`,
              color: accent,
              border: `1px solid ${accent}40`,
            }}
          >
            <TermIcon className="w-3.5 h-3.5" />
            {terminalOpen ? 'Close Terminal' : 'Simulate Demo'}
          </button>
        </div>

        {/* Expandable Project terminal panel */}
        <AnimatePresence>
          {terminalOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <ProjectTerminal
                project={project}
                accent={accent}
                onClose={() => setTerminalOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
});

// ── Project List Row ────────────────────────────────────────────────────────
const ProjectListRow = memo(({ project, index }: CardProps) => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const glowStyle = ACCENT_COLORS[project.color] ?? ACCENT_COLORS.primary;
  const accent = glowStyle.primary;
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative border-b border-white/[0.08] last:border-b-0 py-6 pr-4 pl-2 flex flex-col transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Index + Info */}
        <div className="flex items-start gap-4 flex-1">
          <span
            className="font-mono font-bold text-3xl select-none leading-none opacity-20 group-hover:opacity-100 transition-opacity"
            style={{ color: accent, textShadow: `0 0 10px ${accent}40` }}
            aria-hidden="true"
          >
            {num}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {project.title}
              </h2>
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-40">
                {project.category}
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5 font-mono">{project.subtitle}</p>
            <p className="text-sm leading-relaxed text-white/70 mt-2 max-w-2xl select-text">
              {project.description}
            </p>

            {/* Highlights bullet points */}
            <ul className="space-y-1 list-none m-0 p-0 mt-3 hidden md:block">
              {project.highlights.slice(0, 2).map((highlight, idx) => (
                <li key={idx} className="flex items-center text-xs text-white/60">
                  <span className="mr-2 text-[9px]" style={{ color: accent }}>▸</span>
                  <span className="select-text">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center: Tech stack badges */}
        <div className="flex flex-wrap gap-1 md:max-w-[200px]">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-mono px-2 py-0.5 rounded border"
              style={{
                borderColor: `${accent}22`,
                color: accent,
                background: `${accent}05`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 justify-end flex-shrink-0">
          {project.sourceLink && (
            <a
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/60 hover:text-white transition-colors rounded border border-white/10 hover:bg-white/5"
              aria-label="View Source on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          <button
            onClick={() => setTerminalOpen((t) => !t)}
            className="flex items-center gap-1.5 text-xs font-mono font-semibold py-2 px-3 rounded border transition-colors"
            style={{
              background: terminalOpen ? 'rgba(255,255,255,0.08)' : `${accent}12`,
              borderColor: `${accent}33`,
              color: accent,
            }}
          >
            <TermIcon className="w-3.5 h-3.5" />
            {terminalOpen ? 'Close Console' : 'Simulate'}
          </button>
        </div>
      </div>

      {/* Interactive terminal slider */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="w-full md:pl-10"
          >
            <ProjectTerminal
              project={project}
              accent={accent}
              onClose={() => setTerminalOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
});

// ── Stats Strip Component ───────────────────────────────────────────────────
const StatsStrip = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px"
    style={{
      border: '1px solid rgba(0, 245, 255, 0.1)',
      borderRadius: '12px',
      overflow: 'hidden',
      background: 'rgba(5, 5, 20, 0.5)',
      backdropFilter: 'blur(10px)',
    }}
  >
    {portfolioData.stats.map((stat) => (
      <dl
        key={stat.label}
        className="flex flex-col items-center justify-center py-6 px-4 text-center group hover:bg-white/[0.02] transition-colors"
        style={{ background: 'rgba(255,255,255,0.01)' }}
      >
        <dd
          className="text-3xl md:text-4xl font-bold mb-1 group-hover:scale-105 transition-transform"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: 'var(--cyan-primary)',
            textShadow: '0 0 24px rgba(0, 245, 255, 0.35)',
          }}
        >
          {stat.value}
        </dd>
        <dt
          className="text-[10px] font-mono uppercase tracking-widest"
          style={{ color: 'rgba(0, 245, 255, 0.45)' }}
        >
          {stat.label}
        </dt>
      </dl>
    ))}
  </motion.div>
);

// ── Main Projects Section ────────────────────────────────────────────────────
const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter project arrays based on activeCategory selection
  const filteredProjects = portfolioData.projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <section
      id="projects"
      className="min-h-screen py-20 px-4 relative"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-white/[0.05] pb-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="block text-[11px] font-mono tracking-[3px] uppercase mb-2"
              style={{ color: 'rgba(0, 245, 255, 0.45)' }}
            >
              // register_modules.sh
            </span>
            <h1
              id="projects-heading"
              className="text-4xl md:text-5xl font-bold leading-[1.1]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: 'var(--cyan-primary)',
                textShadow: '0 0 32px rgba(0, 245, 255, 0.2)',
              }}
            >
              PROJECTS
            </h1>
            <p className="text-sm font-medium mt-2 max-w-xl text-white/50">
              Interactive systems registry. Click <span className="text-[var(--cyan-primary)]">Simulate Demo</span> to query execution status.
            </p>
          </motion.div>

          {/* View Toggles & layout filters */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 self-end md:self-auto"
          >
            <div
              className="flex border rounded-lg p-0.5 backdrop-blur-md"
              style={{
                borderColor: 'rgba(0, 245, 255, 0.12)',
                background: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <button
                onClick={() => setViewMode('grid')}
                className="p-1.5 rounded transition-all active:scale-95"
                style={{
                  background: viewMode === 'grid' ? 'rgba(0, 245, 255, 0.12)' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--cyan-primary)' : 'rgba(255, 255, 255, 0.4)',
                }}
                aria-label="Switch to grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className="p-1.5 rounded transition-all active:scale-95"
                style={{
                  background: viewMode === 'list' ? 'rgba(0, 245, 255, 0.12)' : 'transparent',
                  color: viewMode === 'list' ? 'var(--cyan-primary)' : 'rgba(255, 255, 255, 0.4)',
                }}
                aria-label="Switch to list view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Category Filter Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-wrap gap-2 mb-10 pb-2 overflow-x-auto select-none"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-xs font-mono px-4 py-2 rounded-full border transition-all duration-200 relative flex items-center gap-1.5 whitespace-nowrap active:scale-[0.97]"
              style={{
                borderColor: activeCategory === cat ? 'rgba(0, 245, 255, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                color: activeCategory === cat ? 'var(--cyan-primary)' : 'rgba(255, 255, 255, 0.6)',
                background: activeCategory === cat ? 'rgba(0, 245, 255, 0.08)' : 'rgba(5, 5, 20, 0.3)',
                boxShadow: activeCategory === cat ? '0 0 16px rgba(0, 245, 255, 0.15)' : 'none',
              }}
            >
              {activeCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan-primary)] animate-pulse" />}
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Project Rendering Layouts ── */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${activeCategory}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                  <Search className="w-10 h-10 text-white/20 mb-3" />
                  <p className="text-sm font-mono text-white/50">No modules found in this category.</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredProjects.map((project, index) => (
                    <ProjectGridCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              ) : (
                <div className="border border-white/[0.08] rounded-xl bg-rgba(5, 5, 20, 0.25) p-4 flex flex-col backdrop-blur-md">
                  {filteredProjects.map((project, index) => (
                    <ProjectListRow key={project.id} project={project} index={index} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Summary Stats Banner ── */}
        <StatsStrip />
      </div>
    </section>
  );
};

export default ProjectsSection;
