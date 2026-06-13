# Antigravity Local Project Configuration
# Place this file at the project root: CLAUDE.md
# Skills installed globally at: ~/.gemini/antigravity/knowledge/
 
---
 
## Skill Activation Rules
 
1. **Auto-apply** — never wait to be asked. If the task matches a domain,
   load and apply the relevant skill workflow immediately.
2. **Stack skills** — combine multiple skills.
3. **security guidance** — PreToolUse hook is always active.
   Flag these 12 patterns before executing: eval(), pickle.loads(),
   dangerouslySetInnerHTML, innerHTML, document.write, new Function(),
   child_process.exec, os.system, GitHub Actions workflow injection,
   subprocess shell=True, SQL f-string injection, yaml.unsafe_load.
4. **ship-gate** — before any production deployment, run the
   ship-gate 89-point checklist across 8 categories automatically.
---
 
## Tech Stack Context
 
Apply these defaults when generating code, no need to ask:
 
- **Frontend:** React (v19), Vite, TailwindCSS, TypeScript
- **OS/Environment:** Nobara Linux (Fedora-based), KDE Plasma
Always use async/await patterns. Prefer TypeScript.
 
---
 
## Code Quality Standards
 
Always apply these without being asked:
 
- Production-grade error handling (no bare except/catch)
- Typed function signatures (TypeScript)
- Meaningful variable names — no single-letter vars outside loops
- No console.log / print statements left in production code
- Race condition awareness on concurrent operations
- Input validation on all user-facing endpoints
- Environment variables for all secrets — never hardcode
- Conventional commits format for any git messages
---
 
## Available Slash Commands
 
Key commands from the installed skills:
 
```
/cs:handoff          — Generate session handoff doc
/cs:grill-me         — Interrogate a plan with forcing questions
/cs:write-a-skill    — Author a new skill package
/cs:cto-review       — CTO-lens architecture review
/wiki-init           — Initialize LLM wiki (Karpathy pattern)
```
 ---

## Post-Generation Review Protocol

After generating ANY code, run this checklist silently and append a review
block at the end. No exceptions.

### Checklist
- Does it actually run? No syntax errors, no missing imports
- All inputs validated, no raw user data passed through
- No hardcoded secrets, URLs, or credentials
- Error handling on every external call (DB, API, file, network)
- No bare except/catch, specific error types only
- Async routes do not block the event loop
- No leftover debug prints or console.logs
- Race conditions considered on concurrent writes
- Tests written AND executed if possible, not just scaffolded
- No obvious security holes (injection, auth bypass, data leak)

### Append this block after every code response:

---
Code Review:
- Runs: [yes/no]
- Inputs validated: [yes/no]
- Error handling: [yes/no + what is covered]
- Security: [yes/no + any gaps]
- Tests: [yes/no + X/X passed] or [not executed]
- Known gaps: [list anything missing or incomplete]
---
