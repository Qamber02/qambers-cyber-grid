# IMPROVEMENT_PLAN.md — Qamber Cyber Grid Portfolio

> Authored: 2026-06-14 · Based on AUDIT_REPORT.md findings

---

## 1. Frozen Theme Fingerprint

The following design tokens are **immutable** — zero value changes in this pass.

### Colors (src/index.css :root)
| Token | Value |
|---|---|
| `--bg-base` | `#050510` |
| `--cyan-primary` | `#00f5ff` |
| `--cyan-dim` | `#4fc3f7` |
| `--red-accent` | `#ff4757` |
| `--white-body` | `rgba(255,255,255,0.88)` |
| `--white-muted` | `rgba(255,255,255,0.45)` |
| `--glass-bg` | `rgba(255,255,255,0.03)` |
| `--glass-border` | `rgba(0,245,255,0.12)` |
| `--background` (HSL) | `240 41% 4%` |
| `--primary` (HSL) | `217 91% 60%` |
| `--accent` (HSL) | `180 100% 50%` |
| `--secondary` (HSL) | `330 90% 60%` |

### Typography (FROZEN)
| Role | Family | Notes |
|---|---|---|
| Body | Inter | 400/500/600 |
| Code / labels | JetBrains Mono | 400/500/600 |
| Headings | Space Grotesk | 700 |

### Border Radius Token Scale
| Tailwind class | Value |
|---|---|
| `rounded-sm` | `calc(0.75rem - 4px)` ≈ 8px |
| `rounded-md` | `calc(0.75rem - 2px)` ≈ 10px |
| `rounded-lg` | `0.75rem` = 12px |
| `rounded-xl` | default Tailwind 0.75rem+4px |

---

## 2. Section-by-Section Improvements

### Navigation
- **Mobile drawer** (< 640px): hamburger button (44×44px, `Menu`/`X` lucide icon)
  opens a right-side slide-in drawer (framer-motion, 250ms ease-out).
- Drawer: `w-64`, glass bg (`rgba(5,5,20,0.96)` + blur), cyan border-left, 3 route
  links at ≥52px touch height, online badge in footer.
- Close: backdrop tap, Esc key, route change.
- Desktop (≥640px): existing inline `<ul>` unchanged; nav link min-height → 44px.
- `prefers-reduced-motion`: drawer opens instantly (duration=0).

### Hero
- CTA buttons: `h-[42px]` → `h-11` (44px).
- Radius: `rounded-[6px]` → `rounded-md`.
- No content, layout, or color changes.

### About
- ProfileHud `<img>`: add `width={280} height={300} loading="lazy"` — eliminates CLS.
- Bio card: `rounded-[12px]` → `rounded-xl`.
- Fact strip cards: `rounded-[8px]` → `rounded-lg`.
- currentWork cards: `rounded-[8px]` → `rounded-lg`.

### Skills (when nested under /about)
- Section title rendered as `<h2>` (prop `as="h2"`) instead of `<h1>`, resolving
  the dual-h1 SEO/a11y violation. Standalone `/skills` route keeps `<h1>`.

### Projects
- Section `py-20` → `py-24`.
- Category filter pills: `min-h-[44px]` (layout preserved, just taller).
- Grid/list toggle buttons: `w-11 h-11` (44px square).
- Grid card: add `hover:-translate-y-1` (matches About section lift pattern).
- Terminal panel inside card: `rounded-lg` → `rounded-md` (token alignment).

### Contact
- Section `py-20` → `py-24`.
- Container `max-w-7xl` → `max-w-6xl` (aligns with all other sections).
- "Run" submit button: `py-2` → `h-11` (44px touch target).

### Footer (Layout)
- `max-w-7xl` → `max-w-6xl` for horizontal alignment with page content.

---

## 3. Global Design System Decisions

### Spacing
- Base unit: **8px** (Tailwind 2-unit = 8px).
- Section vertical padding: `py-24` (96px) on all content sections.
- Content max-width: `max-w-6xl` (72rem) across all sections.

### Typography Scale
| Element | Size | Weight | Font |
|---|---|---|---|
| h1 (hero, page) | 40px / 62px md | 700 | Space Grotesk |
| h1 (section) | 38px / 52px md | 700 | Space Grotesk |
| h2 (skills on /about) | 38px / 52px md | 700 | Space Grotesk |
| Body primary | 17px | 500 | Inter |
| Body secondary | 15px | 400 | Inter |
| Caption / eyebrow | 11–12px | 400 | JetBrains Mono |

### Animation
- Easing: `cubic-bezier(0.25, 0.1, 0.25, 1)` (already used everywhere).
- Duration: interactive elements 200ms; enter animations 450–600ms.
- Drawer enter: 250ms ease-out / exit 200ms.
- `prefers-reduced-motion`: animations disabled or instant.

### Touch Targets
- Minimum 44×44px on all interactive elements (WCAG 2.5.5 AA).
- Inline chips (tech tags, skill pills): ≥36px acceptable as non-primary elements.

### Focus Styles (global, already in place)
```css
:focus-visible {
  outline: 2px solid var(--cyan-primary);
  outline-offset: 3px;
  border-radius: 4px;
}
```

### Breakpoints
| Name | Width |
|---|---|
| sm | ≥ 640px |
| md | ≥ 768px |
| lg | ≥ 1024px |
| xl | ≥ 1280px |

Mobile nav drawer activates below `sm` (640px).
