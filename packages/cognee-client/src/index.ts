import type {
  MemoryItem,
  QAInput,
  RecallAnswer,
  RecallOptions,
  RememberOptions,
  RememberResult,
} from "./types";

export { buildFallbackAnswer, buildRecallQuery } from "./query";

/**
 * Typed REST client for a self-hosted Cognee instance (verified against
 * cognee 1.2.2-local, auth disabled). All calls are plain fetch — no SDK,
 * no auth header. Field casing matches the verified endpoints:
 *   - /remember/entry  -> snake_case ONLY (plain model)
 *   - /recall /improve /forget -> snake_case accepted (InDTO populate_by_name)
 */

const BASE = () => process.env.COGNEE_URL ?? "http://localhost:8000";

async function postJson(path: string, body: unknown): Promise<Response> {
  return fetch(`${BASE()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function safeText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

export async function health(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE()}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

/** F5 — write a Q&A exchange to permanent memory (fire-and-forget; slow: 30–120s). */
export async function rememberQA(
  qa: QAInput,
  o: RememberOptions,
): Promise<RememberResult> {
  const res = await postJson("/api/v1/remember/entry", {
    entry: {
      type: "qa",
      question: qa.question,
      answer: qa.answer,
      context: qa.context ?? "",
    },
    dataset_name: o.dataset,
    session_id: o.sessionId,
  });
  if (!res.ok) {
    throw new Error(`remember failed: ${res.status} ${await safeText(res)}`);
  }
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  // Verified live: remember/entry returns qa_id on session_stored.
  return {
    id:
      (data.qa_id as string) ??
      (data.entry_id as string) ??
      (data.id as string),
  };
}

/** F4 — Cognee answers via GRAPH_COMPLETION (scope auto = session + graph). */
export async function recall(
  query: string,
  o: RecallOptions,
): Promise<RecallAnswer> {
  const res = await postJson("/api/v1/recall", {
    query,
    datasets: [o.dataset],
    session_id: o.sessionId,
    scope: o.scope ?? "auto",
    search_type: o.searchType !== undefined ? o.searchType : "GRAPH_COMPLETION",
    top_k: o.topK ?? 15,
    ...(o.systemPrompt ? { system_prompt: o.systemPrompt } : {}),
  });
  if (!res.ok) {
    throw new Error(`recall failed: ${res.status} ${await safeText(res)}`);
  }
  return parseRecallAnswer(await res.json());
}

/** F8 — feedback-driven graph enrichment. */
export async function improve(o: {
  dataset: string;
  sessionIds: string[];
}): Promise<void> {
  const res = await postJson("/api/v1/improve", {
    dataset_name: o.dataset,
    session_ids: o.sessionIds,
  });
  if (!res.ok) throw new Error(`improve failed: ${res.status}`);
}

/** F7 — surgically delete a dataset (e.g. "private"). */
export async function forget(dataset: string): Promise<void> {
  const res = await postJson("/api/v1/forget", { dataset });
  if (!res.ok) throw new Error(`forget failed: ${res.status}`);
}

/** Feedback entry tied to a specific answer (needs the qaId from rememberQA). */
export async function feedback(
  qaId: string,
  score: number,
  o: RememberOptions,
): Promise<void> {
  const res = await postJson("/api/v1/remember/entry", {
    entry: { type: "feedback", qa_id: qaId, feedback_score: score },
    dataset_name: o.dataset,
    session_id: o.sessionId,
  });
  if (!res.ok) throw new Error(`feedback failed: ${res.status}`);
}

/** F6 — list datasets for the "what it remembers" view. */
export async function listDatasets(): Promise<MemoryItem[]> {
  try {
    const res = await fetch(`${BASE()}/api/v1/datasets`);
    if (!res.ok) return [];
    return (await res.json()) as MemoryItem[];
  } catch {
    return [];
  }
}

/** Browser URL for Cognee's interactive knowledge-graph page. */
export function visualizeGraphUrl(datasetId: string): string {
  return `${BASE()}/api/v1/visualize?dataset_id=${encodeURIComponent(datasetId)}`;
}

/** Resolve a dataset UUID by human-readable name (e.g. "main"). */
export async function findDatasetIdByName(name: string): Promise<string | null> {
  const items = await listDatasets();
  for (const item of items) {
    const itemName = (item.name ?? item.dataset_name) as string | undefined;
    const itemId = (item.id ?? item.dataset_id) as string | undefined;
    if (itemName === name && itemId) return String(itemId);
  }
  return null;
}

/**
 * F9 — interactive knowledge-graph HTML from Cognee (GET /api/v1/visualize).
 * Lazy-load in the Memory tab only — not on the chat hot path.
 */
export async function visualizeGraph(datasetId: string): Promise<string> {
  const res = await fetch(visualizeGraphUrl(datasetId));
  const body = await safeText(res);

  if (!res.ok) {
    let message = body.slice(0, 300);
    try {
      const parsed = JSON.parse(body) as { error?: string; detail?: unknown };
      message = parsed.error ?? JSON.stringify(parsed.detail ?? body).slice(0, 300);
    } catch {
      /* use raw body */
    }
    throw new Error(`visualize failed (${res.status}): ${message}`);
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      const parsed = JSON.parse(body) as { error?: string };
      throw new Error(parsed.error ?? "visualize returned JSON instead of HTML");
    } catch (e) {
      if (e instanceof Error && e.message.startsWith("visualize")) throw e;
    }
  }

  if (!body.trim().startsWith("<")) {
    throw new Error("visualize returned unexpected content");
  }

  return body;
}

/** Format a single session/graph recall hit into readable context for the LLM. */
function formatRecallItem(item: Record<string, unknown>): string {
  const q = item.question ?? item.query;
  const a = item.answer ?? item.content ?? item.text;
  if (typeof q === "string" && typeof a === "string") {
    const src = item.source ? ` [${item.source}]` : "";
    return `Q: ${q}\nA: ${a}${src}`;
  }
  if (typeof a === "string") return a;
  if (typeof q === "string") return q;
  return JSON.stringify(item);
}

/** Whether a recall hit actually drew on stored memory (not just LLM on query). */
function itemUsedMemory(item: Record<string, unknown>): boolean {
  const source = String(item.source ?? "");
  if (source === "session") return true;
  if (source === "graph_context" || source === "session_context") {
    const content = item.content ?? item.text;
    return typeof content === "string" && content.trim().length > 0;
  }
  if (source === "graph") {
    const used = item.used_graph_element_ids;
    if (
      used &&
      typeof used === "object" &&
      Object.keys(used as object).length > 0
    ) {
      return true;
    }
    const meta = item.metadata;
    return Boolean(meta && typeof meta === "object" && Object.keys(meta).length);
  }
  return false;
}

function textFromRecallItem(item: Record<string, unknown>): string {
  const text = item.text ?? item.answer ?? item.content;
  return typeof text === "string" ? text.trim() : "";
}

/** Parse /recall JSON into the user-facing answer + memory-used flag. */
export function parseRecallAnswer(data: unknown): RecallAnswer {
  if (data == null) return { text: "", usedMemory: false };

  if (Array.isArray(data)) {
    let usedMemory = false;
    const parts: string[] = [];

    for (const raw of data) {
      if (typeof raw !== "object" || !raw) continue;
      const item = raw as Record<string, unknown>;
      if (itemUsedMemory(item)) usedMemory = true;
      const chunk = textFromRecallItem(item);
      if (chunk) parts.push(chunk);
    }

    const text = parts.join("\n\n");
    return { text, usedMemory };
  }

  const text = extractRecallTextLegacy(data);
  return { text, usedMemory: false };
}

/**
 * Normalize /recall JSON into plain text (legacy helper).
 * Handles session-scoped hits (source:"session") verified on cognee 1.2.2-local.
 */
export function extractRecallText(data: unknown): string {
  return parseRecallAnswer(data).text || extractRecallTextLegacy(data);
}

function extractRecallTextLegacy(data: unknown): string {
  if (data == null) return "";
  if (typeof data === "string") return data;

  if (Array.isArray(data)) {
    return data
      .map((x) =>
        typeof x === "string"
          ? x
          : typeof x === "object" && x
            ? formatRecallItem(x as Record<string, unknown>)
            : JSON.stringify(x),
      )
      .filter(Boolean)
      .join("\n\n");
  }

  const d = data as Record<string, unknown>;

  if (Array.isArray(d.results)) {
    return d.results
      .map((x) =>
        typeof x === "string"
          ? x
          : formatRecallItem(x as Record<string, unknown>),
      )
      .filter(Boolean)
      .join("\n\n");
  }

  if (d.result && typeof d.result === "object") {
    const r = d.result as Record<string, unknown>;
    if (Array.isArray(r.data)) {
      return r.data
        .map((x) => formatRecallItem(x as Record<string, unknown>))
        .join("\n\n");
    }
    if (typeof r.data === "string") return r.data;
  }

  if (typeof d.answer === "string") return d.answer;
  if (typeof d.content === "string") return d.content;
  if (typeof d.text === "string") return d.text;

  return JSON.stringify(d);
}

export * from "./types";
