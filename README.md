# FelixAI

<div align="center">
  <a href="LINK_TO_YOUR_YOUTUBE_VIDEO_OR_LOOM">
    <img src="<img width="1393" height="842" alt="Image" src="https://github.com/user-attachments/assets/83e8c03a-538e-4a51-b317-d3446880d975" />" alt="Watch FelixAI Demo" />
  </a>
  <h1>An AI Companion That Doesn't Forget</h1>
  <p>
    <b>Powered by <a href="https://github.com/topoteretes/cognee">Cognee</a> </b>
  </p>
  <p>
    <a href="LINK_TO_YOUR_GITHUB_REPO/issues">Report Bug</a> ·
    <a href="LINK_TO_YOUR_GITHUB_REPO/issues">Request Feature</a>
  </p>
</div>

---

## The "Why" (Our Story)

We've all been there: alt-tabbing to a chat window mid-task, pasting in the same context you pasted in yesterday, because the thing forgot everything the second you closed the tab.

**I built FelixAI because I wanted an assistant that actually lives with me, not one I have to keep re-introducing myself to.**

I went with Cognee's open-source, self-hosted version specifically — not the Cloud offering — because I wanted my data to actually stay on my machine. Everything FelixAI remembers about me lives in a knowledge graph running in Docker, right here, not in someone else's account. It also happened to be the tool behind the hackathon this was built for, which is what put it on my radar — but once I saw what it could actually do, self-hosted graph memory was the right call regardless.

Most AI assistants are forgetful by design. Every session starts from zero. FelixAI is built to do the opposite — the more you use it, the more it actually knows about you, until it's less "smart stranger you meet again every time" and more an actual companion.

## Use Cases

<div align="center">
  <p><strong>Debugging that doesn't repeat itself</strong><br>Hit the same error weeks apart — Felix recalls how you fixed it last time instead of making you solve it twice.</p>
</div>

<div align="center">
  <p><strong>Research that picks up where you left off</strong><br>Ask about something on screen today, come back days later, ask a follow-up — no re-explaining what you were even looking at.</p>
</div>

<div align="center">
  <p><strong>Remembers how you actually like to work</strong><br>Tell it once, during onboarding or mid-chat, how you like your answers or what you're focused on — it keeps answering that way instead of resetting every session.</p>
</div>

## The Cognee Experience

FelixAI doesn't treat Cognee as a bolt-on database. It's the brain of the app.

### Cognee generates the answer. It's not just storage.

This is the part that's easy to get wrong, so it's worth being explicit: a lot of "AI with memory" projects use their memory layer as a lookup table — fetch some related text, staple it into a prompt, let a separate LLM do all the actual thinking. That's not what FelixAI does.

FelixAI's `recall()` calls run with `search_type: GRAPH_COMPLETION`. That mode doesn't just do similarity search and hand back matching chunks — Cognee itself traverses the knowledge graph, reasons over the relationships between what it knows, and generates the actual answer text. **The response you see in the popup is Cognee's own output**, not a second model summarizing what Cognee found.

OpenRouter never touches the main answer. Its only two jobs are (1) describing the screen as text before the question ever reaches Cognee, and (2) stepping in with a plain LLM answer *only* if Cognee's recall comes back completely empty — which mostly happens early on, before the graph has anything relevant to work with. Every answer that actually draws on memory is Cognee reasoning over its own graph, end to end.

That's why the system prompt (`FELIX_RECALL_PROMPT`) is written the way it is — it's not instructing some downstream summarizer, it's instructing Cognee's own graph-completion model directly on how confidently to lean on what it finds: strongly if it's the same specific problem as before, lightly if it's just tangentially related, not at all if there's nothing relevant. That confidence judgment is Cognee doing the actual thinking, not decoration on top of someone else's answer.

| Pillar | How FelixAI uses it |
|---|---|
| **Remember** | Every Q&A (and onboarding answer) goes to `remember/entry` in the background — UI never blocks on it |
| **Recall** | Answers come from `recall` with `GRAPH_COMPLETION` + screen context, so memory and what's on screen merge in one query |
| **Improve** | Runs after onboarding, every 5 interactions, on feedback, and on quit — session cache syncs into the permanent graph |
| **Forget** | `forget private` wipes the sensitive dataset — chat command or Memory tab button |

Vision (OpenRouter) describes the screen. Cognee decides what you already know.

### What worked

- **Self-hosted Docker** — memory stays local, no Cognee Cloud
- **Datasets** — `main` vs `private`, with graph visualization right in the Memory tab
- **`GRAPH_COMPLETION`** — recall pulls prior fixes, preferences, and context instead of starting from zero every time
- **Fire-and-forget writes** — `remember` and `improve` never block the popup, so the assistant stays responsive even when Cognee is slow

### The "aha" moment

Cross-session recall. Quit the app, come back days later, ask about something you already solved — Cognee pulls it straight from the graph. That's the gap browser ChatGPT can't fill, and it's the whole reason this exists.

### Why NVIDIA Nemotron for vision

Default model: `nvidia/nemotron-nano-12b-v2-vl:free` on OpenRouter.

FelixAI is mostly screens with text — code, errors, dashboards, UI. Nemotron is strong on exactly that, and the free tier keeps the demo cheap. Gemma and similar models are fine for general photos; Nemotron is the one that's actually good at "read my screen."

The vision model is swappable, not hardcoded to this choice. Two directions worth knowing about:

- **More privacy/security** — swap in a self-hosted vision-capable model (anything you can run locally that handles vision reasonably well) instead of routing screenshots through OpenRouter at all. This keeps the whole pipeline — screen capture, description, and memory — entirely on your own machine, not just the memory layer.
- **Better OCR/accuracy** — swap the OpenRouter model for a more advanced (paid) vision model if you're hitting the limits of the free tier on dense text, small fonts, or complex layouts. The free Nemotron tier is genuinely solid for most screens, but a stronger model closes the gap on trickier ones.

Either way it's a one-line change in `packages/api-client/src/openrouter.ts` — the rest of the pipeline doesn't care which model is behind the API call.

### Why it feels fast, not sequential

The slow path is: screenshot → wait for vision → wait for recall → show answer. Instead:

- On hotkey — screenshot's taken, popup opens, vision starts in the background while you're still reading the UI
- While you type — vision usually finishes before you hit Enter
- On ask — if vision's still running, we race it with a 3-second cap; cached context gets reused if it's ready
- After the answer — `remember` + `improve` run in the background, so you get the reply immediately, not after the graph updates

Vision and typing overlap. Memory writes never make you wait.

## Challenges Faced

Real hurdles, not the polished version:

**1. Day one, the graph's got nothing — and Felix feels dumb.** Fresh Cognee install, empty graph, zero nodes. You ask literally anything and recall comes back with nothing, because there's nothing *to* come back with. Felix isn't being bad at answering, there's just no memory yet — but from the outside it looks like a broken product on first launch, which is the worst possible first impression. Fix: onboarding on the very first hotkey — four quick questions (name, what you work on, what you need help with, how you like answers), each one `remember()`'d immediately. By the time you ask a real question, there are already real nodes sitting in the graph.

**2. Onboarding itself got stuck — because `remember` is slow.** Turns out `remember` can take 30–120 seconds to actually land. I had onboarding waiting on four of those sequentially, which meant staring at a loading spinner for a couple minutes on your very first launch. Not a great look. Fix: mark onboarding done the instant you finish typing, then fire all four `remember` calls plus one `improve()` in the background. You see "done" immediately, the graph catches up behind the scenes.

**3. Even with a full graph, recall still comes back empty sometimes — and that's just normal.** This one's different from #1 — the graph can have plenty in it and *still* return nothing for a specific question, because `GRAPH_COMPLETION` genuinely couldn't find a relevant path for what you just asked. This isn't a one-time bug, it's an ongoing reality of graph search — some questions just won't have a match, forever, no matter how big the graph gets. Fix: an OpenRouter fallback answers directly from the screen context whenever recall's empty, so you always get something real instead of silence — and it still gets remembered for next time, in case it comes up again.

**4. Vision latency — nobody wants to wait on summon.** If FelixAI waits for the vision model to finish describing your screen before it even shows the popup, the whole "instant assistant" feeling is gone. Fix: vision kicks off the second the popup opens, not when you hit Enter — by the time you've typed your question, it's usually already done. If it's not, `getScreenContext` races it with a short timeout instead of making you sit there.

**5. Docker plus two separate API keys — real setup friction, no way around it.** Cognee needs its own `LLM_API_KEY` in its own `.env` for graph completion. FelixAI separately needs `OPENROUTER_API_KEY` for vision. Two different files, two different places to mess it up. Fix: spelled out clearly in setup below, plus a live health check in the header — "memory online" or "memory offline" — so you know immediately if Cognee's actually running instead of guessing.

## What It Does

- **Instant wake** — `Ctrl+Shift+Space` summons the popup from anywhere
- **Real screen vision** — an actual screenshot the moment you hit the hotkey, not clipboard guesswork
- **Persistent memory** — every exchange lives in a self-hosted Cognee knowledge graph
- **Voice input** — Deepgram nova-2, speak instead of typing
- **Private mode** — a dataset toggle for sensitive stuff, with one-click `forget()`

## Tech Stack

Monorepo, managed with **pnpm** + **Turborepo**.

### Desktop App (`apps/desktop`)

- **Framework**: [Electron](https://www.electronjs.org/) + [Vite](https://vitejs.dev/)
- **Frontend**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Vision**: [OpenRouter](https://openrouter.ai/) — Nemotron (free tier)
- **Text fallback**: OpenRouter — Gemma (free tier), used when recall comes back empty
- **Voice**: [Deepgram](https://deepgram.com/) nova-2

### Memory Layer

- **[Cognee](https://github.com/topoteretes/cognee)** — self-hosted, Docker, REST API, `GRAPH_COMPLETION` search
- All four lifecycle verbs wired: `remember`, `recall`, `improve`, `forget`

### Web Landing (`apps/web`)

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)

## Getting Started

### Prerequisites

- Node.js 18+
- PNPM (`npm install -g pnpm`)
- Docker, with the [Cognee](https://github.com/topoteretes/cognee) repo cloned and running

### 1. Start Cognee

In your cloned `cognee` repo, with `LLM_API_KEY` set in its `.env`:

```bash
docker compose up -d
curl http://localhost:8000/health   # expect healthy
```

### 2. Clone and install FelixAI

```bash
git clone LINK_TO_YOUR_GITHUB_REPO
cd FelixAI
pnpm install
```

### 3. Environment variables

```bash
cp apps/desktop/.env.example apps/desktop/.env
```

**Required** (in `apps/desktop/.env`):

- `OPENROUTER_API_KEY` — vision + text fallback, from [OpenRouter](https://openrouter.ai/keys)
- `DEEPGRAM_API_KEY` — voice input, from [Deepgram](https://console.deepgram.com/)
- `COGNEE_URL` — defaults to `http://localhost:8000`

### Running it

```bash
pnpm dev       # desktop app
pnpm dev:web   # landing page
```

`Ctrl+Shift+Space` anywhere to summon FelixAI.

## Project Structure

```text
FelixAI/
├── apps/
│   ├── desktop/                 Electron app — the product
│   │   ├── electron/            main process: tray, hotkey, screenshot, IPC, ask orchestration
│   │   └── src/                 renderer: chat popup, memory view, onboarding
│   └── web/                     Next.js landing page
├── packages/
│   ├── cognee-client/           typed REST client — remember/recall/improve/forget
│   ├── api-client/               OpenRouter vision + text fallback
│   └── ui/                      shared React primitives
├── turbo.json
└── package.json
```

## Demo Checklist

1. Complete onboarding on first hotkey
2. Ask about your screen → answer combines vision + memory
3. `remember this: …` → check the Memory tab
4. Quit, relaunch, ask about the earlier session → cross-session recall
5. Mark something private → Memory tab → Forget private → confirm it's gone
6. Voice input via the mic button
7. Memory tab → open the Cognee graph in browser

## Privacy

Screenshots happen only on hotkey — never continuously. They're sent to OpenRouter's vision model to generate a text description, then discarded — not stored on disk or long-term. What sticks around is a text record of the question and answer, in your own local, self-hosted Cognee graph, running in Docker on your machine.

One honest caveat: the free-tier OpenRouter vision model may log prompts/outputs for provider-side improvement, per their own free-tier terms. Fine for a hackathon demo — worth knowing if you're pointing this at anything actually sensitive.

## Hackathon Context

- **Event**: WeMakeDevs × Cognee Hackathon — "The Hangover Part AI"
- **Track**: Best Use of Open Source (fully self-hosted Cognee, no Cloud)
- **AI tooling disclosure**: Planning and implementation assistance from Claude, via Cursor, per hackathon rules. Architecture, Cognee integration, and UI were built with AI pair-programming; product decisions and demo flow are mine.

## The Team

- **Kumar Nirupam** - [GitHub](https://github.com/KumarNirupam1) - solo participant

---

<div align="center">
  Made by <b>Kumar Nirupam</b>
</div>