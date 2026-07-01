# Jarvis — Personal AI Companion

A desktop companion that lives in your system tray. Press a global hotkey, it takes
a real screenshot of whatever you're looking at, answers your question about it with a
vision LLM, and **never forgets** — every exchange is stored permanently in a
self-hosted [Cognee](https://github.com/topoteretes/cognee) knowledge graph, so it can
recall context from today, last week, or last month.

Built for the WeMakeDevs Cognee Hackathon — **Best Use of Open Source** track
(fully self-hosted Cognee, no Cloud).

## Architecture

```
apps/
  desktop/            Electron + Vite + React + TS + Tailwind (the companion app)
    electron/         main process: tray, global hotkey, screenshot, IPC orchestration
    src/              renderer: chat popup, memory view
  web/                Next.js landing page (built last)
packages/
  cognee-client/      typed REST client for self-hosted Cognee (remember/recall/improve/forget)
  api-client/         vision LLM client (OpenAI gpt-4o-mini)
  ui/                 shared React primitives
```

Two LLM touchpoints, both OpenAI `gpt-4o-mini`:
1. Cognee's internal graph-extraction/embeddings (`LLM_API_KEY` in the cognee repo `.env`)
2. This app's vision-answer call (`OPENAI_API_KEY` in `apps/desktop/.env`)

## The loop

`Ctrl+Shift+Space` → screenshot (before popup) → popup opens → you type → `recall()` past
memory → vision LLM answers with screenshot + memory → answer shown → `remember()` writes
the exchange to the graph in the background. Next time, `recall()` brings it back.

## Setup

Prerequisites: Node 18+, pnpm, Docker (with the `cognee` repo cloned and running).

```bash
# 1. Start Cognee (in the cognee repo, with LLM_API_KEY set in its .env)
docker compose up -d
curl http://localhost:8000/health   # expect healthy

# 2. This repo
pnpm install
cp apps/desktop/.env.example apps/desktop/.env
# add your OPENAI_API_KEY to apps/desktop/.env
pnpm dev
```

Press `Ctrl+Shift+Space` anywhere to summon Jarvis.

## Privacy

Screenshots are taken only when you press the hotkey — never continuously. They are sent
to the vision LLM to generate an answer, then discarded; they are not stored on disk or
long-term. What persists is a text record of the question and answer in your local,
self-hosted Cognee knowledge graph, running entirely in Docker on your machine.

## AI assistance disclosure

Planning and code assistance provided by Claude (via Cursor), per hackathon rules.
