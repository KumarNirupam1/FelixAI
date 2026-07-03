import { app } from "electron";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export interface OnboardingQuestion {
  id: string;
  question: string;
  rememberContext: string;
}

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: "name",
    question: "What should I call you?",
    rememberContext: "User profile — preferred name",
  },
  {
    id: "role",
    question: "What do you work on or study?",
    rememberContext: "User profile — role and focus area",
  },
  {
    id: "help",
    question: "What do you usually need help with on your screen?",
    rememberContext: "User preferences — typical screen tasks",
  },
  {
    id: "style",
    question: "How do you like answers — brief, detailed, or casual?",
    rememberContext: "User preferences — answer style",
  },
];

interface OnboardingFile {
  completed: boolean;
  completedAt?: string;
}

function onboardingPath(): string {
  const dir = app.getPath("userData");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return join(dir, "onboarding.json");
}

export function isOnboardingComplete(): boolean {
  try {
    const path = onboardingPath();
    if (!existsSync(path)) return false;
    const data = JSON.parse(readFileSync(path, "utf8")) as OnboardingFile;
    return Boolean(data.completed);
  } catch {
    return false;
  }
}

export function markOnboardingComplete(): void {
  const payload: OnboardingFile = {
    completed: true,
    completedAt: new Date().toISOString(),
  };
  writeFileSync(onboardingPath(), JSON.stringify(payload, null, 2), "utf8");
}
