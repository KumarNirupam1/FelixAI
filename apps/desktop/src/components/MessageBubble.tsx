import ReactMarkdown from "react-markdown";
import type { ChatMessage } from "../hooks/useAsk";

interface Props {
  message: ChatMessage;
}

export function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex animate-slide-up ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm ${
          isUser
            ? "bg-white/12 text-white shadow-sm"
            : "border border-white/8 bg-white/5 text-white/90 backdrop-blur-sm"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0 leading-relaxed text-white/90">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-2 list-inside list-disc space-y-1 pl-1 text-white/85">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-2 list-inside list-decimal space-y-1 pl-1 text-white/85">
                    {children}
                  </ol>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">{children}</strong>
                ),
                code: ({ children }) => (
                  <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-xs text-white/80">
                    {children}
                  </code>
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        )}
        {!isUser && message.usedMemory && (
          <p className="mt-2 text-[10px] text-white/35">memory retrieved</p>
        )}
      </div>
    </div>
  );
}
