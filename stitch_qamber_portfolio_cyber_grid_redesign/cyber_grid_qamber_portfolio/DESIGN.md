# Cyber Grid Design System

## Brand Identity
A cyberpunk-themed developer portfolio for Qamber Muhammad Hanif, Full Stack Engineer from Gwadar, Balochistan. The aesthetic is dark, precise, and technical — like a terminal that has been given a soul.

## Color Palette
- **Background**: `#050510` — deep space navy, near-black
- **Cyan Primary**: `#00f5ff` — electric neon cyan, the hero accent
- **Cyan Dim**: `#4fc3f7` — secondary info text
- **Red Accent**: `#ff4757` — danger, GitHub link, contrast element
- **White Body**: `rgba(255,255,255,0.88)` — body text
- **White Muted**: `rgba(255,255,255,0.45)` — secondary/caption text
- **Glass BG**: `rgba(255,255,255,0.03)` — card fills
- **Glass Border**: `rgba(0,245,255,0.12)` — card borders

## Typography
- **Headlines**: Space Grotesk 700 — bold, geometric, modern
- **Body**: Inter 400/500 — clean, highly legible
- **Labels/Code**: JetBrains Mono — monospaced, terminal feel

## Design Principles
1. **Dark first**: Everything lives on `#050510`. No light mode.
2. **Neon accents**: Cyan glow is the primary visual language. Sparingly applied.
3. **Glass panels**: Cards use `backdrop-filter: blur(12px)` with faint cyan borders.
4. **Motion**: Purposeful. No decorative animations. All motion serves information.
5. **Layered depth**: Background (Three.js grid) → Digital rain (canvas) → Dark overlay → Content
6. **Monospace flavour**: Section labels use `// comment` syntax in JetBrains Mono.

## Spacing Rhythm
- Section padding: `clamp(5rem, 10vw, 8rem)` vertical
- Content max width: `72rem`
- Card padding: `2rem`
- Gap between cards: `2rem`

## Component Patterns
- **Holographic card**: Glass bg + cyan border + `box-shadow: 0 0 16px hsla(primary, 0.15)`
- **Neon text**: `color: #00f5ff` + `text-shadow: 0 0 20px rgba(0,245,255,0.4)`
- **CTA buttons**: Primary = filled `#0057ff`. Ghost = transparent + border. Danger = red border.
- **Skill pills**: Ghost border, hover to cyan glow
- **Terminal**: Black/30 bg, monospace font, cyan `>` prompt

## Signature Element
The avatar photo on the hero has a CSS `glitch-avatar` animation — a chromatic-aberration-style flicker every ~7 seconds. This is the single most distinctive moment in the portfolio and should not be over-applied anywhere else.