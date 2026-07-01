import { useState } from "react";

interface Props {
  qaId?: string;
  dataset: "main" | "private";
}

export function FeedbackButtons({ qaId, dataset }: Props) {
  const [sent, setSent] = useState<number | null>(null);

  async function send(score: number): Promise<void> {
    setSent(score);
    await window.api.submitFeedback(qaId ?? "", score, dataset);
  }

  return (
    <span className="flex items-center gap-1 text-xs">
      <button
        onClick={() => send(1)}
        title="Helpful"
        className={`transition ${sent === 1 ? "opacity-100" : "opacity-40 hover:opacity-80"}`}
      >
        👍
      </button>
      <button
        onClick={() => send(-1)}
        title="Not helpful"
        className={`transition ${sent === -1 ? "opacity-100" : "opacity-40 hover:opacity-80"}`}
      >
        👎
      </button>
    </span>
  );
}
