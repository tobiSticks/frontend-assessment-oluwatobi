"use client";

import { Input } from "@/components/Input";
import { cn } from "@/lib/cn";

type MovieSearchProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function MovieSearch({ value, onChange, className }: MovieSearchProps) {
  return (
    <div className={cn("w-full max-w-md", className)}>
      <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
        Search movies
      </label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a title…"
        autoComplete="off"
        aria-label="Search movies"
      />
    </div>
  );
}
