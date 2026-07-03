import { useState } from "react";

interface Props {
  qaId?: string;
  dataset: "main" | "private";
}

export function FeedbackButtons({ qaId, dataset }: Props) {
  const [sent, setSent] = useState<number | null>(null);

  async function send(score: number): Promise<void> {
    if (sent !== null) return;
    setSent(score);
    await window.api.submitFeedback(qaId ?? "", score, dataset);
  }

  const iconClass = (active: boolean) =>
    `rounded p-1 transition ${
      active
        ? "bg-white/15 text-white/90"
        : "text-white/25 hover:bg-white/5 hover:text-white/55"
    }`;

  return (
    <div className="mt-2 flex items-center gap-0.5 border-t border-white/5 pt-2">
      <button
        type="button"
        title="Helpful"
        onClick={() => void send(1)}
        className={iconClass(sent === 1)}
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM4 22H2V10h2v12z"
          />
        </svg>
      </button>
      <button
        type="button"
        title="Not helpful"
        onClick={() => void send(-1)}
        className={iconClass(sent === -1)}
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 15V5a3 3 0 013-3l4 9v11H5.72a2 2 0 01-2-1.7l-1.38-9a2 2 0 012-2.3H10zM20 22h2V10h-2v12z"
          />
        </svg>
      </button>
    </div>
  );
}
