import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center px-4">
    <div className="text-center">
      <p
        className="text-xs font-mono tracking-[3px] uppercase mb-4 block"
        style={{ color: 'rgba(0, 245, 255, 0.5)' }}
      >
        // 404 — page not found
      </p>
      <h1
        className="text-[96px] md:text-[140px] font-bold leading-none mb-4 glitch select-none"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: 'var(--cyan-primary)',
          textShadow: '0 0 40px rgba(0, 245, 255, 0.4)',
        }}
        aria-label="404 error"
      >
        404
      </h1>
      <p
        className="text-xl font-medium mb-8"
        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
      >
        This page doesn't exist in this dimension.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium font-mono transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,245,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
        style={{
          background: 'rgba(0, 245, 255, 0.08)',
          border: '1px solid rgba(0, 245, 255, 0.4)',
          color: 'var(--cyan-primary)',
        }}
      >
        <span aria-hidden="true">←</span>
        Return home
      </Link>
    </div>
  </div>
);

export default NotFound;
