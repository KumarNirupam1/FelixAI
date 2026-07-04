# FelixAI — Personal AI Companion

A desktop companion that lives in your system tray. Press a global hotkey, it takes
a real screenshot of whatever you're looking at, answers your question using Cognee's
memory graph, informed by a vision description of your screen, and **never forgets** —
every exchange is stored permanently in a self-hosted
[Cognee](https://github.com/topoteretes/cognee) knowledge graph, so it can recall
context from today, last week, or last month.

Built for the WeMakeDevs Cognee Hackathon — **Best Use of Open Source** track
(fully self-hosted Cognee, no Cloud).

## Architecture

```
apps/
  desktop/            Electron + Vite + React + TS + Tailwind (the companion app)
    electron/         main process: tray, global hotkey, screenshot, IPC orchestration
    src/              renderer: chat popup, memory view
  web/                Next.js landing page (hackathon demo site)
packages/
  cognee-client/      typed REST client for self-hosted Cognee (remember/recall/improve/forget)
  api-client/         OpenRouter screen analysis + text fallback
  ui/                 shared React primitives
```

LLM touchpoints:
1. **Cognee** (`LLM_API_KEY` in the cognee repo `.env`) — answers via `recall(GRAPH_COMPLETION)` + graph extraction
2. **OpenRouter** (`OPENROUTER_API_KEY` in `apps/desktop/.env`) — describes the screen as text before recall; text fallback when recall is empty

## The loop

`Ctrl+Shift+Space` → screenshot (before popup) → OpenRouter describes screen → popup opens →
you type → `recall(scope: auto, GRAPH_COMPLETION)` answers from memory + screen context →
answer shown → `remember()` writes the exchange in the background → `improve()` every 5 Q&As
and on quit. A "private" dataset toggle keeps sensitive exchanges separate, with a one-click
`forget()` to delete them entirely.

## Setup

Prerequisites: Node 18+, pnpm, Docker (with the `cognee` repo cloned and running).

```bash
# 1. Start Cognee (in the cognee repo, with LLM_API_KEY set in its .env)
docker compose up -d
curl http://localhost:8000/health   # expect healthy

# 2. This repo
pnpm install
cp apps/desktop/.env.example apps/desktop/.env
# add OPENROUTER_API_KEY (and DEEPGRAM_API_KEY for voice) to apps/desktop/.env
pnpm dev              # desktop app
pnpm dev:web          # landing page at http://localhost:3000
```

Press `Ctrl+Shift+Space` anywhere to summon FelixAI.

## Package for Windows (installer)

Builds a `.exe` installer under `apps/desktop/release/`:

```bash
pnpm icon
pnpm package:win
```

On first launch, FelixAI copies `.env.example` to your app data folder. Edit that file with your API keys and restart:

- Windows: `%APPDATA%/FelixAI/.env`

Prerequisites for the packaged app are the same: **Cognee must be running in Docker** on the machine.

## Demo checklist (hackathon)

1. Finish onboarding on first hotkey
2. Ask about screen → answer from Cognee + vision
3. `remember this: …` in chat → Memory tab shows dataset
4. Quit app → relaunch → ask about prior session (cross-session memory)
5. Mark an exchange private → Memory tab → Forget private → confirm it's gone
6. Voice input via mic button (Deepgram) — ask a question by speaking
7. Memory tab → Graph ↗ opens Cognee visualize in browser

## Privacy

Screenshots are taken only when you press the hotkey — never continuously. They are sent
to the vision LLM to generate an answer, then discarded; they are not stored on disk or
long-term. What persists is a text record of the question and answer in your local,
self-hosted Cognee knowledge graph, running entirely in Docker on your machine.

## AI assistance disclosure

Planning and code assistance provided by Claude (via Cursor), per hackathon rules.
