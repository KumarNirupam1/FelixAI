import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = "", ...props }: Props) {
  return (
    <button
      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition disabled:opacity-40 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
