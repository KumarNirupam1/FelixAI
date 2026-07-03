import React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2 text-xs">
      <span
        onClick={() => onChange(!checked)}
        className={`relative h-4 w-7 rounded-full transition ${
          checked ? "bg-white/30" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${
            checked ? "left-3.5" : "left-0.5"
          }`}
        />
      </span>
      {label && <span className="opacity-70">{label}</span>}
    </label>
  );
}
