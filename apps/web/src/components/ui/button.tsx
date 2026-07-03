import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "default" | "lg";
};

export function Button({
  className,
  size = "default",
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        size === "default" && "px-6 py-2.5 text-sm",
        size === "lg" && "px-8 py-3 text-base",
        className,
      )}
      {...props}
    />
  );
}
