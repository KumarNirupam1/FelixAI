import { useEffect, useState } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  qaId?: string;
  usedMemory?: boolean;
}

export function useAsk(dataset: "main" | "private") {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // When the background remember() resolves, attach its qaId to the most
  // recent assistant message so feedback can target that specific answer.
  useEffect(
    () =>
      window.api.onRememberDone(({ qaId }) => {
        if (!qaId) return;
        setMessages((prev) => {
          const copy = [...prev];
          for (let i = copy.length - 1; i >= 0; i--) {
            if (copy[i].role === "assistant" && !copy[i].qaId) {
              copy[i] = { ...copy[i], qaId };
              break;
            }
          }
          return copy;
        });
      }),
    [],
  );

  async function ask(question: string): Promise<void> {
    if (!question.trim() || loading) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setLoading(true);
    try {
      const res = await window.api.ask({ question, dataset });
      setMessages((m) => [
        ...m,
        { role: "assistant", text: res.answer, usedMemory: res.usedMemory },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: `Error: ${(err as Error).message}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return { messages, loading, ask };
}
