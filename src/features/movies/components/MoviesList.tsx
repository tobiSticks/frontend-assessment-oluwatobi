"use client";

import Image from "next/image";
import type { Movie } from "@/types/movie";
import { cn } from "@/lib/cn";
import { Card } from "@/components/Card";

const POSTER_BASE = "https://image.tmdb.org/t/p/w185";

type MoviesListProps = {
  movies: Movie[];
  loading?: boolean;
  error?: string | null;
  className?: string;
};

export function MoviesList({
  movies,
  loading,
  error,
  className,
}: MoviesListProps) {
  if (loading) {
    return (
      <p className={cn("text-sm text-zinc-500", className)}>Searching…</p>
    );
  }

  if (error) {
    return (
      <p
        className={cn(
          "rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
          className,
        )}
        role="alert"
      >
        {error}
      </p>
    );
  }

  if (movies.length === 0) {
    return (
      <p className={cn("text-sm text-zinc-500", className)}>
        No results yet. Try searching above.
      </p>
    );
  }

  return (
    <ul
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {movies.map((m) => (
        <li key={m.id}>
          <Card className="flex h-full flex-col gap-2 p-4">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
              {m.poster_path ? (
                <Image
                  src={`${POSTER_BASE}${m.poster_path}`}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                  No poster
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold leading-tight">{m.title}</h3>
              {m.release_date ? (
                <p className="text-xs text-zinc-500">{m.release_date}</p>
              ) : null}
              {m.overview ? (
                <p className="mt-1 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {m.overview}
                </p>
              ) : null}
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
