import { useEffect, useRef, useState } from "react";

interface Props {
  onComplete: () => void;
}

const DEFAULT_QUESTIONS = [
  "What should I call you?",
  "What do you work on or study?",
  "What do you usually need help with on your screen?",
  "How do you like answers — brief, detailed, or casual?",
];

const btnGhost =
  "rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white/90 disabled:cursor-not-allowed disabled:opacity-40";

const btnPrimary =
  "rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 transition hover:bg-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-40";

export function OnboardingView({ onComplete }: Props) {
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  /** 0 = welcome, 1–4 = questions, 5 = done */
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [answers, setAnswers] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const questionCount = questions.length;
  const doneStep = questionCount + 1;
  const isWelcome = step === 0;
  const isQuestionStep = step >= 1 && step <= questionCount;
  const isDone = step === doneStep;

  useEffect(() => {
    window.api
      .getOnboardingState()
      .then((s) => {
        if (s.questions.length > 0) setQuestions(s.questions);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (isQuestionStep) inputRef.current?.focus();
  }, [step, isQuestionStep]);

  const progress = isDone
    ? 100
    : isWelcome
      ? 0
      : Math.round(((step - 1) / questionCount) * 100);

  const stepLabel = isDone
    ? "Setup complete"
    : isWelcome
      ? "Welcome"
      : `Setup · ${step} of ${questionCount}`;

  function goForward(nextStep: number, answer?: string) {
    setDirection("forward");
    if (answer !== undefined) {
      setAnswers((prev) => {
        const next = [...prev];
        next[step - 1] = answer;
        return next;
      });
    }
    setStep(nextStep);
    setInput("");
    setError("");
  }

  function goBack() {
    setDirection("back");
    if (step <= 1) {
      setStep(0);
      setInput("");
    } else {
      setStep(step - 1);
      setInput(answers[step - 2] ?? "");
    }
    setError("");
  }

  function continueFromQuestion(): void {
    const value = input.trim();
    if (!value) return;

    if (step < questionCount) {
      goForward(step + 1, value);
      return;
    }

    const allAnswers = [...answers];
    allAnswers[questionCount - 1] = value;
    void finishOnboarding(allAnswers);
  }

  async function finishOnboarding(allAnswers: string[]): Promise<void> {
    setSaving(true);
    setError("");
    try {
      const res = await window.api.completeOnboarding(allAnswers);
      if (!res.ok) {
        setError(res.error ?? "Could not save profile");
        return;
      }
      setDirection("forward");
      setStep(doneStep);
      onComplete();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const currentQuestion = isQuestionStep ? questions[step - 1] : "";

  return (
    <div className="flex h-full flex-col">
      <div className="no-drag mb-4 px-1 pt-0.5">
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="onboarding-progress h-full rounded-full bg-white/60"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-[10px] font-medium uppercase tracking-widest text-white/25">
          {stepLabel}
        </p>
      </div>

      <div
        key={step}
        className={
          direction === "forward"
            ? "onboarding-step-forward flex min-h-0 flex-1 flex-col"
            : "onboarding-step-back flex min-h-0 flex-1 flex-col"
        }
      >
        {isWelcome && (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex flex-1 flex-col items-center justify-center px-2 pb-8 text-center">
              <h1 className="text-2xl font-light tracking-tight text-white/90">
                Welcome to FelixAI
              </h1>
              <p className="mt-2 max-w-xs text-sm font-light leading-relaxed text-white/40">
                I remember what you tell me across sessions. Four quick questions
                first — then I help with whatever is on your screen.
              </p>
            </div>
            <div className="no-drag mt-auto flex justify-center pb-1">
              <button
                type="button"
                onClick={() => goForward(1)}
                className={btnPrimary}
              >
                Get started
              </button>
            </div>
            <p className="pb-0.5 text-center text-[10px] font-medium uppercase tracking-wider text-white/20">
              Esc to hide
            </p>
          </div>
        )}

        {isQuestionStep && (
          <>
            <div className="flex flex-1 flex-col items-center justify-center px-2 pb-4 text-center">
              <h2 className="max-w-sm text-xl font-light leading-snug tracking-tight text-white/90">
                {currentQuestion}
              </h2>
              {error && (
                <p className="mt-3 text-xs text-amber-400/90">{error}</p>
              )}
            </div>

            <form
              className="no-drag mt-auto space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                continueFromQuestion();
              }}
            >
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1A1A1A]/80 px-4 py-3 shadow-lg backdrop-blur-xl transition hover:border-white/20 focus-within:border-white/30 focus-within:ring-1 focus-within:ring-white/10">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your answer…"
                  disabled={saving}
                  autoComplete="off"
                  className="flex-1 border-none bg-transparent text-sm font-light tracking-wide text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={saving}
                  className={btnGhost}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={saving || !input.trim()}
                  className={`${btnPrimary} flex items-center gap-1.5`}
                >
                  {saving ? (
                    <>
                      <span className="h-3 w-3 animate-spin rounded-full border border-white/40 border-t-transparent" />
                      Saving
                    </>
                  ) : step < questionCount ? (
                    "Continue"
                  ) : (
                    "Finish"
                  )}
                </button>
              </div>
              <p className="text-center text-[10px] font-medium uppercase tracking-wider text-white/20">
                Enter to continue · Esc to hide
              </p>
            </form>
          </>
        )}

        {isDone && (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex flex-1 flex-col items-center justify-center px-2 pb-8 text-center">
              <h1 className="text-2xl font-light tracking-tight text-white/90">
                You&apos;re all set
              </h1>
              <p className="mt-2 max-w-xs text-sm font-light text-white/40">
                Press{" "}
                <span className="text-white/55">Ctrl+Shift+Space</span> anytime
                to ask about your screen.
              </p>
            </div>
            <div className="no-drag mt-auto flex justify-center pb-1">
              <button
                type="button"
                onClick={() => void window.api.hide()}
                className={btnPrimary}
              >
                Got it
              </button>
            </div>
            <p className="pb-0.5 text-center text-[10px] font-medium uppercase tracking-wider text-white/20">
              Esc to hide
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
