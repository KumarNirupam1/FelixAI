import type {
  MemoryItem,
  QAInput,
  RecallOptions,
  RememberOptions,
  RememberResult,
} from "./types";

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
  return {
    id:
      (data.id as string) ??
      (data.qa_id as string) ??
      (data.entry_id as string),
  };
}

/** F4 — pull relevant past context before the vision call. */
export async function recall(query: string, o: RecallOptions): Promise<string> {
  const res = await postJson("/api/v1/recall", {
    query,
    datasets: [o.dataset],
    session_id: o.sessionId,
    search_type: null,
    top_k: o.topK ?? 10,
  });
  if (!res.ok) {
    throw new Error(`recall failed: ${res.status} ${await safeText(res)}`);
  }
  return extractRecallText(await res.json());
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

/**
 * The exact /recall response shape is only fully confirmable once
 * LLM_API_KEY is set in the cognee container. This is deliberately the
 * ONE place to adjust after the first real recall — everything else stays.
 */
export function extractRecallText(data: unknown): string {
  if (data == null) return "";
  if (typeof data === "string") return data;
  const d = data as Record<string, any>;
  if (Array.isArray(d)) {
    return d
      .map((x) => (typeof x === "string" ? x : JSON.stringify(x)))
      .join("\n");
  }
  if (d.result?.data) {
    return typeof d.result.data === "string"
      ? d.result.data
      : JSON.stringify(d.result.data);
  }
  if (d.searchResponse?.result?.data) return String(d.searchResponse.result.data);
  if (typeof d.answer === "string") return d.answer;
  if (d.results) {
    return Array.isArray(d.results)
      ? d.results.map((x: unknown) => (typeof x === "string" ? x : JSON.stringify(x))).join("\n")
      : String(d.results);
  }
  return JSON.stringify(d);
}

export * from "./types";
