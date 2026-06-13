# COMPONENT_AUDIT.md — Qamber's Cyber Grid Portfolio

> Generated: 2026-06-13 · Auditor: Senior Engineer + UI/UX Review

---

## Architecture Overview

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite + TypeScript |
| Styling | TailwindCSS v3 + custom CSS vars (HSL design tokens) |
| Routing | React Router v6 (multi-page, file-based pages) |
| Animation | Framer Motion + GSAP |
| 3D Background | Three.js (desktop only) |
| State | Local component state only (no global store) |
| Data | Static `/src/data/portfolio.ts` module |
| UI Primitives | shadcn/ui (Radix-based) |

---

## Page Architecture

```
/ (Index)          → HeroSection
/about             → AboutSection + SkillsSection
/projects          → ProjectsSection
/contact           → ContactSection
/skills            → SkillsSection (standalone)
*                  → NotFound
```

All pages are wrapped in `Layout` which provides:
- Static cyber background image (fixed, z:0)
- `CyberGrid` Three.js canvas (desktop only, z:0)
- `DigitalRain` canvas animation (z:1)
- Dark overlay (z:2)
- Cursor glow effect (z:2)
- `AudioManager` toggle button
- `Navigation` (hidden on `/`, shown on all other pages)
- Footer (hidden on `/`)

---

## Component Documentation

---

### `Layout` — `/src/components/Layout.tsx`

**Purpose:** Root shell component that wraps every page. Manages global background layers, navigation visibility, cursor effect, audio, and footer.

**UI/UX Role:** Sets the cyberpunk "stage" — the layered background (image → Three.js → Digital Rain → overlay) provides immersive depth. Navigation is contextually hidden on the home page.

**Technical Details:**
- Props: `{ children: React.ReactNode }`
- State: none (cursor position via `useRef`)
- Side effects: `mousemove` listener on `window` for cursor glow
- `isMobile` detection runs once at module load (not reactive — won't update on resize)
- `handleNavigate` is a no-op passed to Navigation (legacy prop)

**Current Issues:**
1. `isMobile` is a module-level constant — won't react to window resize (not a React state/ref)
2. `useMemo` is imported but never used
3. Navigation's `onNavigate` prop is dead code — prop exists but handler does nothing
4. Footer copyright year is hardcoded as `2025`
5. No `<Suspense>` or error boundary wrapping children
6. cursor glow transition (`left 0.1s, top 0.1s`) creates a slight delay/lag feel

**Upgrade Notes:**
- Remove `useMemo` import
- Remove dead `handleNavigate`/`onNavigate` pattern entirely
- Add a `useMediaQuery` hook for reactive mobile detection
- Update footer year to dynamic `new Date().getFullYear()`
- Tighten cursor glow transition to `0.05s` or use `requestAnimationFrame` for zero-lag

---

### `Navigation` — `/src/components/Navigation.tsx`

**Purpose:** Persistent top navigation bar shown on all pages except the home page.

**UI/UX Role:** Provides route-level wayfinding with active-state highlighting. The blurred glass background and "online" indicator reinforce the cyberpunk identity.

**Technical Details:**
- Props: `{ onNavigate?: (section: string) => void }` (unused)
- Entry animation: `y: -100 → 0` via Framer Motion
- Active state: background/border highlight from `location.pathname` match
- Three nav items: Works `/projects`, Qamber `/about`, Contact `/contact`

**Current Issues:**
1. `onNavigate` prop is dead — Navigation never calls it
2. No `aria-current="page"` on active nav items (accessibility)
3. No mobile menu — three items cram horizontally on small screens; no hamburger/drawer
4. Logo `"Q"` inside a border circle is minimal but not visually distinctive
5. Missing keyboard focus ring styles that match the theme
6. No skip-to-main link for keyboard users

**Upgrade Notes:**
- Remove `onNavigate` prop entirely
- Add `aria-current="page"` to active link
- Add a mobile hamburger menu (slide-in drawer on ≤640px)
- Add visible `:focus-visible` ring styles matching `--neon-cyan`
- Add a "skip to content" anchor at the very top (accessibility)

---

### `HeroSection` — `/src/components/HeroSection.tsx`

**Purpose:** Full-viewport landing section introducing Qamber. Contains typewriter heading, bio paragraphs, CTA buttons, and avatar.

**UI/UX Role:** The single most important impression-making surface. Sets tone, communicates value proposition, and routes visitors to deeper content.

**Technical Details:**
- Props: none
- State: `typedText: string`, `cursorVisible: boolean`
- Two `useEffect`s: one for typing interval (300ms/char), one for cursor blink (500ms)
- Respects `prefers-reduced-motion` — skips animation and sets full text immediately
- Grid layout: `[55fr 45fr]` on large screens, stacked on mobile
- `GlitchAvatar` is an inline sub-component (not exported)

**Current Issues:**
1. Typing speed (300ms/char) is extremely slow — "Hey, I'm Qamber." takes ~5 seconds. Kills first impression. Should be ~55ms/char.
2. Cursor blink does not stop after typing completes — it keeps blinking forever when it should stop or slow down
3. CTA buttons use raw magic hex values (`#0057ff`, `#ff4757`) instead of design tokens
4. `<button>` nested inside `<Link>` is invalid HTML (interactive element inside interactive element)
5. GitHub button uses inline SVG duplication instead of the existing `Github` lucide icon
6. No `aria-label` on any CTA button
7. `GlitchAvatar` is never actually animated with a glitch — the name is misleading
8. Online badge at bottom of avatar clips at `-8px` — can be cut off on some layouts
9. No lazy-loading or blur-hash placeholder for avatar image
10. The scanlines effect class is applied but the CSS animation fires on the whole section unnecessarily

**Upgrade Notes:**
- Reduce typing speed to 55ms/char
- Stop cursor after typing completes (clear cursor interval or set `cursorVisible: false`)
- Replace all magic hex values with CSS vars / Tailwind theme tokens
- Replace `<Link><button>` with a single `<Link>` styled as a button
- Replace inline GitHub SVG with `<Github>` from lucide-react
- Add `alt` text improvements and `loading="lazy"` to avatar img
- Rename `GlitchAvatar` → `AvatarCard` and add a real subtle glitch animation if desired

---

### `GlitchAvatar` (sub-component of HeroSection)

**Purpose:** Avatar photo presentation with a cyber-styled circular frame and "online" badge.

**UI/UX Role:** Humanizes the portfolio with a real photo while maintaining the cyberpunk visual language.

**Technical Details:**
- Inline component, not exported
- Styled with inline styles (magic hex values)
- Scanline overlay via `repeating-linear-gradient`
- Online badge: animated dot with Framer Motion pulse ring

**Current Issues:**
1. All styling uses magic hex values (`#00f5ff`, `#050510`) — not tokenized
2. No `width`/`height` attributes on `<img>` (causes layout shift)
3. `select-none` on the wrapper is good, but there's no `draggable="false"` on the image

**Upgrade Notes:**
- Move to CSS vars: `var(--cyan-primary)`, `var(--bg-base)`
- Add explicit `width` and `height` to `<img>` to prevent layout shift
- Add `draggable="false"` to the `<img>` element

---

### `AboutSection` — `/src/components/AboutSection.tsx`

**Purpose:** Bio page content — personal narrative, fact strip, current projects, education history, and certifications.

**UI/UX Role:** The human layer of the portfolio. Where visitors decide if they want to hire or collaborate with Qamber. Critical trust-building surface.

**Technical Details:**
- Props: none
- Uses `portfolioData` for education and certifications
- `facts` and `currentWork` are hardcoded locally (not in `portfolioData`) — inconsistency
- All animations: `whileInView` with `once: true`
- Uses shadcn `Card` for education cards

**Current Issues:**
1. `facts` and `currentWork` data is hardcoded inside the component — should live in `portfolioData`
2. No `h1` on the `/about` page (accessibility/SEO — only the eyebrow `//about me` monospace label serves as a heading)
3. Education cards use `edu.gpa || edu.score` — if both are undefined, renders nothing with no fallback
4. Certification items have no icons or visual hierarchy beyond a small bullet dot
5. The section uses no `<article>` or `<section>` landmark roles
6. `hover:border-[rgba(0,200,255,0.4)]` uses a Tailwind arbitrary value that could be a token
7. Repeated italic line "I graduate in 2027. I game on Linux." already appears in HeroSection — copy duplication

**Upgrade Notes:**
- Lift `facts` and `currentWork` into `portfolioData.ts`
- Add an `<h1>` (or at least `<h2>`) as a visible page heading
- Add `role="region"` or use `<section>` with `aria-labelledby`
- Add cert icons (e.g., small shield or certificate SVG per entry)
- Remove duplicate copy from HeroSection or rephrase

---

### `SkillsSection` — `/src/components/SkillsSection.tsx`

**Purpose:** Categorized grid of technical skills, organized by domain (Languages, Frontend, Backend, Databases, Tools & DevOps).

**UI/UX Role:** Quick signal to recruiters and collaborators about breadth of technical knowledge. The monospace "system capabilities" framing reinforces brand voice.

**Technical Details:**
- Props: none
- Derives `totalSkillsCount` by summing group arrays
- Skills with `icon` field (Python, JS, TS) are rendered identically to those without — icons are declared in data but never rendered

**Current Issues:**
1. `portfolioData.skills.languages` has icon fields (`python-logo.jpeg`, `javascript-logo.jpeg`) that are declared but never rendered — dead data
2. No visual distinction between skill proficiency levels — everything looks equal
3. Skill pills could benefit from hover tooltips (e.g., "3 years of experience" or brief description)
4. `// {group.title}` monospace syntax is charming but category names are harder to scan quickly
5. No `<h1>` on the `/skills` standalone page
6. The status line at the bottom ("X core technologies loaded") is good flavor but could count active skills rather than total

**Upgrade Notes:**
- Either render skill icons or remove icon field from data to eliminate dead data
- Add optional `proficiency: 'familiar' | 'proficient' | 'expert'` to skill model
- Add `title` attribute or `<Tooltip>` to skill pills for context

---

### `ProjectsSection` — `/src/components/ProjectsSection.tsx`

**Purpose:** Showcase of 4 major projects with descriptions, tech stack, highlights, and source links. Supports grid/list view toggle.

**UI/UX Role:** The proof-of-work section. Recruiters spend the most time here. It must communicate impact, complexity, and quality quickly.

**Technical Details:**
- Props: none
- State: `hoveredProject: number | null`, `viewMode: 'grid' | 'list'`
- `ProjectListRow` is a sub-component (file-local, not exported)
- Grid view: 2-col layout, holographic cards with corner decorations
- List view: borderless rows with slide-in hover underline
- `getColorClass` maps color strings to Tailwind class strings (risk: PurgeCSS may not detect dynamic strings)

**Current Issues:**
1. `getColorClass` builds dynamic Tailwind class strings — these may be purged in production build. Should use explicit class groups or CSS vars instead
2. Card `scale-105` on hover causes layout shift/reflow in grid (jumps neighboring cards)
3. No `<h2>` landmark for the "Projects" heading visible to screen readers — the heading exists but the overall page structure has no `<h1>` 
4. Stats banner hardcodes "4+", "10K+", "40%", "15+" — should be derived from data or at minimum extracted to a constant
5. `ExternalLink` icon is imported but never used (dead import)
6. List mode GitHub link appears on hover-only — inaccessible to keyboard users
7. No empty-state UI if `portfolioData.projects` is empty

**Upgrade Notes:**
- Replace `getColorClass` string concatenation with a `colorMap` object mapping to explicit CSS vars
- Replace `scale-105` hover with `translateY(-4px)` to avoid layout push
- Remove `ExternalLink` import
- Make GitHub link always visible in list view (not hover-only) for keyboard access
- Extract stats data to `portfolioData`

---

### `ContactSection` — `/src/components/ContactSection.tsx`

**Purpose:** Contact page with a functional terminal emulator UI (typed commands) and direct contact cards (Email, GitHub, CV download).

**UI/UX Role:** The conversion surface — where "interested" becomes "reached out." The terminal gimmick reinforces the developer identity but can frustrate non-technical visitors.

**Technical Details:**
- Props: none
- State: `command: string`, `output: string[]`
- Terminal handles: `help`, `connect`, `github`, `email`, `download_cv`, `clear`
- `download_cv` uses imperative DOM manipulation (`document.createElement`) inside the state switch — should be extracted to a util
- Layout: 2-column grid (terminal | contact cards)

**Current Issues:**
1. Terminal output array grows unbounded — no max line limit (UX: terminal will scroll infinitely)
2. `download_cv` uses `var` (function-scoped) inside a `switch` — linting issue
3. Terminal font doesn't auto-scroll to bottom on new output (user must manually scroll)
4. No `aria-live` region on terminal output — screen readers won't announce new output
5. "Initialize Connection" heading uses raw HTML entity `&lt;` / `&gt;` — works but is indirect; cleaner to use Unicode `<` `>`
6. Contact cards are all inside a single motion element (shared delay) — should animate individually
7. `Status: Available for opportunities` pulsing animation could be considered distraction rather than signal
8. No confirmation toast/feedback when `email` or `github` command is executed
9. Terminal has no `tabIndex` — keyboard-only users can't focus/scroll the output area

**Upgrade Notes:**
- Cap terminal output at 50 lines (slice the oldest)
- Add `useEffect` to auto-scroll terminal output div to bottom on `output` change
- Add `aria-live="polite"` to terminal output region
- Add `tabIndex={0}` to terminal output div
- Extract `download_cv` DOM manipulation into a `downloadFile` util
- Animate each contact card individually

---

### `CyberGrid` — `/src/components/CyberGrid.tsx`

**Purpose:** Three.js canvas rendering a 3D grid floor with particle field. Desktop-only background effect.

**UI/UX Role:** Depth-creating atmospheric background. The slow camera drift and particle rotation add a sense of motion without demanding attention.

**Technical Details:**
- Props: none
- Creates a full-screen WebGL renderer
- 1000 particles + `GridHelper` + 2 point lights
- Camera drifts with `Math.sin(Date.now() * 0.0001)`
- Properly cleans up on unmount

**Current Issues:**
1. Grid color uses hardcoded Three.js hex `0x8b5cf6` (purple) — doesn't match the cyan/blue brand palette
2. `window.devicePixelRatio` not capped — on 4K displays with DPR=2, renders 8K equivalent which is extremely expensive
3. No `prefers-reduced-motion` check — will animate even when user has motion sensitivity
4. Camera aspect ratio update on resize doesn't account for element-level dimensions (always uses `window.innerWidth`)
5. `particlesCount` is 1000 which is fine but could be made responsive to screen size

**Upgrade Notes:**
- Cap `setPixelRatio(Math.min(window.devicePixelRatio, 2))`
- Add `prefers-reduced-motion` check before starting the animation loop
- Change grid color to `0x001a3d` or match `--neon-cyan`
- Consider reducing particle count on DPR > 1 devices

---

### `DigitalRain` — `/src/components/DigitalRain.tsx`

**Purpose:** Canvas-based character stream animation. Streams travel from screen edges toward a focal point near the hero content.

**UI/UX Role:** Creates the signature "Matrix-meets-sci-fi" atmospheric texture. The focal-point targeting toward where the user's gaze is ensures streams feel connected to content rather than random.

**Technical Details:**
- Props: `{ reducedColumns?: boolean }`
- 110 streams (35 on mobile)
- Each stream has `startX`, `startY`, `progress`, `speed`, `length`, `chars`
- Respects `prefers-reduced-motion` — draws one frame and stops
- `setInterval(draw, 33)` = ~30 FPS

**Current Issues:**
1. Canvas resize handler doesn't restart streams — after resize, stream start positions become stale
2. The canvas has `z-index: 1` and `mix-blend-mode: screen` — on dark backgrounds this is fine, but blend mode can cause unexpected behavior on other browsers
3. `33ms` interval vs `requestAnimationFrame` — `setInterval` can drift and isn't frame-rate-synchronized
4. Canvas is not hidden via CSS on reduced-motion — it renders one static frame which can look odd

**Upgrade Notes:**
- Switch from `setInterval` to `requestAnimationFrame` for smoother animation
- Add stream reset on resize (re-initialize with new canvas dimensions)
- Add `aria-hidden="true"` to canvas element

---

### `AudioManager` — `/src/components/AudioManager.tsx`

**Purpose:** Background ambient audio player with mute/unmute toggle button.

**UI/UX Role:** Ambient synthwave audio deepens immersion. The fixed button placement (bottom-right) follows convention for non-intrusive media controls.

**Technical Details:**
- Props: none
- State: `isMuted: boolean`
- Uses `new Audio('/audio/background-music.mp3')` — audio file must exist in `/public/audio/`
- Attempts autoplay; falls back to first user interaction via `document.addEventListener('click')`

**Current Issues:**
1. Initial state `isMuted: false` but audio may not be playing yet (autoplay blocked) — button icon shows "playing" when audio is actually paused/blocked
2. No visual feedback that audio is blocked vs. actively muted
3. Setting `volume = 0` and calling `pause()` — should only set `volume` for mute, or only `pause()` — doing both means unmute has to restart from silence
4. `audioRef.current = null` on cleanup breaks the ref guard in `toggleMute` (could error if cleanup runs before toggle)
5. No check if audio file actually exists (`/audio/background-music.mp3`)
6. Button has no tooltip explaining what it controls

**Upgrade Notes:**
- Start `isMuted: true` to match actual initial state (audio is likely blocked)
- Use only volume for mute (don't pause), or only pause (don't volume zero) — pick one model
- Add `title` attribute to button: `"Toggle ambient audio"`

---

### `FlowingMenu` — `/src/components/FlowingMenu.tsx`

**Purpose:** GSAP-powered marquee menu component with edge-detection for reveal direction.

**UI/UX Role:** A premium interactive menu effect where hovering reveals a sliding image + text marquee from the detected edge.

**Technical Details:**
- Props: `{ items?: MenuItemProps[] }`
- Uses `gsap.timeline()` for edge-aware hover reveal
- `distMetric` calculates squared distance (correct optimization — no sqrt needed)
- Requires companion `FlowingMenu.css`

**Current Issues:**
1. **`FlowingMenu` is never used anywhere in the application** — it's dead code
2. `MenuItem` uses `<a>` without `rel="noopener noreferrer"` on external links
3. No `aria-label` on the marquee element
4. Images are rendered via `backgroundImage` CSS — inaccessible to screen readers and alt-text is impossible

**Upgrade Notes:**
- Either integrate into the navigation/projects page or delete the file
- If kept: add `rel="noopener noreferrer"`, `aria-label`, and remove it as dead code

---

### `BlobCursor` — `/src/components/BlobCursor.tsx`

**Purpose:** Custom GSAP-animated blob cursor effect with trailing circles.

**UI/UX Role:** Premium cursor enhancement for desktop visitors, adding a "liquid metal" feel.

**Technical Details:**
- Props: many style configuration props with defaults
- Uses GSAP for smooth cursor lag
- Has `'use client'` directive — leftover from a Next.js context, meaningless in Vite/React
- Uses untyped `blobsRef.current` array

**Current Issues:**
1. **`BlobCursor` is never used anywhere in the application** — dead code
2. `'use client'` at the top is a Next.js directive — meaningless here but not harmful
3. `blobsRef.current` typed as `any[]` (implicit)
4. No `prefers-reduced-motion` check

**Upgrade Notes:**
- Either integrate or delete
- Remove `'use client'` directive
- Add `prefers-reduced-motion` guard before activating GSAP

---

### `NavLink` — `/src/components/NavLink.tsx`

**Purpose:** `forwardRef` wrapper around React Router's `NavLink` that accepts `className` as a string (vs. the function signature that RR provides).

**UI/UX Role:** Utility — enables shadcn-style string-based `className` usage on router-aware links.

**Technical Details:**
- Props: extends `NavLinkProps` with optional `activeClassName` / `pendingClassName`
- Properly forwarded ref

**Current Issues:**
1. **`NavLink` is never used anywhere in the application** — `Navigation.tsx` uses `Link` directly
2. Purely dead code

**Upgrade Notes:**
- Delete this file entirely

---

### `portfolioData` — `/src/data/portfolio.ts`

**Purpose:** Single source of truth for all portfolio content (name, education, projects, skills, certifications, interests, contact info).

**UI/UX Role:** Decouples content from presentation — any content update happens in one place.

**Technical Issues:**
1. `facts` and `currentWork` in `AboutSection` are hardcoded locally — should move into this file
2. Stats in `ProjectsSection` ("4+", "10K+", etc.) are hardcoded — should derive from or live in this file
3. Interest data exists but is never rendered anywhere in the UI
4. `icon` fields on language skills are declared but never consumed by `SkillsSection`
5. `sourceLink` comments say `// <-- ADDED` — cleanup debris from development

**Upgrade Notes:**
- Add `facts`, `currentWork`, and `stats` to this file
- Either render the `interests` array or remove it
- Either render skill icons or remove icon fields
- Remove inline `// <-- ADDED` comments

---

### `NotFound` — `/src/pages/NotFound.tsx`

**Purpose:** 404 error page for unmatched routes.

**UI/UX Role:** Soft landing for navigation errors — should match the portfolio theme and guide users back.

**Technical Issues:**
1. `console.error` for every 404 hit — creates noise in production logs. Should be guarded by `isDev` or removed
2. Styled with `bg-muted` — completely breaks the cyberpunk theme (renders as a plain light/dark background)
3. Uses `<a href="/">` instead of `<Link to="/">` — causes a full page reload instead of SPA navigation
4. Page has an `<h1>` but no theme-matching surrounding design

**Upgrade Notes:**
- Remove `console.error` or guard with `import.meta.env.DEV`
- Apply cyberpunk theme (`bg-background`, neon text, glitch animation on "404")
- Replace `<a href>` with `<Link to="/">`

---

## Dead Code Summary

| File | Status |
|---|---|
| `FlowingMenu.tsx` + `FlowingMenu.css` | Never imported or used anywhere |
| `BlobCursor.tsx` + `BlobCursor.css` | Never imported or used anywhere |
| `NavLink.tsx` | Never imported or used anywhere |
| `ExternalLink` (lucide import in ProjectsSection) | Imported but never rendered |
| `useMemo` (import in Layout.tsx) | Imported but never called |
| `Button` (import in ProjectsSection) | Used (keep) |
| Skill icon fields in `portfolio.ts` | Declared but never consumed |
| `interests` array in `portfolio.ts` | Declared but never rendered |
| `// <-- ADDED` comments in `portfolio.ts` | Dev debris |
| `'use client'` in `BlobCursor.tsx` | Next.js artifact — meaningless in Vite |
| `onNavigate` prop in `Navigation.tsx` | Dead prop; handler is a no-op |

---

## Accessibility Audit

| Issue | Severity | Location |
|---|---|---|
| No `aria-current="page"` on active nav links | High | Navigation.tsx |
| `<button>` inside `<Link>` (invalid HTML) | High | HeroSection.tsx |
| No skip-to-content link | High | Layout.tsx |
| No `aria-live` on terminal output | Medium | ContactSection.tsx |
| No `<h1>` on `/about`, `/skills`, `/projects` pages | Medium | Multiple pages |
| Terminal output not keyboard-scrollable | Medium | ContactSection.tsx |
| Hover-only GitHub link in list view | Medium | ProjectsSection.tsx |
| No `prefers-reduced-motion` in CyberGrid | Medium | CyberGrid.tsx |
| Missing `alt` on avatar img improvements | Low | HeroSection.tsx |
| `console.error` in NotFound | Low | NotFound.tsx |

---

## Performance Audit

| Issue | Severity | Notes |
|---|---|---|
| `setInterval` instead of `rAF` in DigitalRain | Medium | Can drift; use rAF |
| `window.devicePixelRatio` uncapped in CyberGrid | Medium | 4K renders 4× work |
| 1000+ Three.js particles always active | Low | Fine at 1080p |
| No lazy loading on avatar image | Low | Small file, low impact |
| shadcn/ui components — many unused in production | Low | Tree-shaken by Vite |

---

## Theme Token Usage

The design system is well-structured with HSL CSS vars. Key tokens:

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#050510` | Body background |
| `--cyan-primary` | `#00f5ff` | Primary neon accent |
| `--cyan-dim` | `#4fc3f7` | Secondary text |
| `--red-accent` | `#ff4757` | Danger / GitHub button |
| `--glass-bg` | `rgba(255,255,255,0.03)` | Card fills |
| `--glass-border` | `rgba(0,245,255,0.12)` | Card borders |

**Problem:** Many components bypass these tokens and use hardcoded hex values directly in inline styles — breaking the single-source-of-truth design system.
