import type { ChatMessage } from "../hooks/useAsk";
import { FeedbackButtons } from "./FeedbackButtons";

interface Props {
  message: ChatMessage;
  dataset: "main" | "private";
}

export function MessageBubble({ message, dataset }: Props) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
          isUser ? "bg-accent text-white" : "bg-white/10 text-white/90"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        {!isUser && (
          <div className="mt-1.5 flex items-center gap-2">
            {message.usedMemory && (
              <span className="text-[10px] text-white/40">recalled memory</span>
            )}
            <FeedbackButtons qaId={message.qaId} dataset={dataset} />
          </div>
        )}
      </div>
    </div>
  );
}
