# Qamber's Portfolio — Arise

> Solo Leveling / Shadow Monarch themed portfolio for Qamber Muhammad Hanif — Full Stack & Frontend Engineer.  
> Live at [qamber-portfolio.pages.dev](https://qamber-portfolio.pages.dev)

Built with React 18, React Three Fiber, GSAP, and Tailwind CSS. Features interactive 3D models, GLSL shaders, and bloom post-processing inspired by the Solo Leveling aesthetic — dark, immersive, and GPU-accelerated.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| 3D / WebGL | Three.js · React Three Fiber · @react-three/drei |
| Shaders | GLSL (custom vertex + fragment) |
| Post-processing | @react-three/postprocessing (Bloom) |
| Animation | GSAP |
| Styling | Tailwind CSS · shadcn-ui |
| 3D Models | Tripo3D → Draco-compressed GLB |

---

## 3D Scene Overview

Three models power the visual identity, each scoped to a specific section:

- **Portal Ring** — Home hero. Encircles a separate swirl shader plane (not a baked texture).
- **Crystal Core** — About / Player Status card.
- **Rune Dagger** — Skills / Equipped Weapon card.

All models are Draco-compressed and decoded locally via `/public/draco/`. Scale is handled by a `fitModelToContainer()` bounding-box utility so each model fills its styled container without hardcoded magic numbers.

### Palette

```
Background  #0a0a0f
Accent      #7c3aed
Glow        #a78bfa
```

---

## Getting Started

**Prerequisites:** Node.js ≥ 18 — install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Clone
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install
npm install

# Dev server (hot reload + instant preview)
npm run dev
```

```sh
# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── canvas/        # R3F scenes, models, shaders
│   ├── sections/      # Home, About, Skills, Projects, Contact
│   └── ui/            # shadcn-ui primitives + custom components
├── hooks/             # useGSAP, useScrollTrigger, etc.
├── lib/               # fitModelToContainer, utils
├── shaders/           # GLSL vertex + fragment files
└── assets/
public/
└── draco/             # Draco decoder (wasm + js)
models/                # Compressed .glb files
```

---

## Development Notes

- Each model lives in its own defined styled container — never share a canvas between unrelated scenes.
- Use `fitModelToContainer()` for all model scaling; avoid hardcoded scale values.
- GSAP animations are scoped with `useGSAP` + cleanup to prevent scroll-trigger leaks on route change.
- Commit strategy: **one phase per commit**, diagnose before fixing — cascading multi-phase agent runs can break the entire scene graph silently.

---

## Deployment

Deployed on **Cloudflare Pages** via automatic GitHub integration. Push to `main` triggers a production deploy.

```sh
# Manual deploy (if using Wrangler CLI)
npx wrangler pages deploy dist
```

---

## License

MIT © Qamber Muhammad Hanif
