"use client";

import { Card } from "@/components/Card";
import type { Movie } from "@/types/movie";
import { useMovieSearch } from "../hooks/useMovieSearch";
import { MovieSearch } from "./MovieSearch";
import { MoviesList } from "./MoviesList";

type MoviesExplorerProps = {
  movies: Movie[];
  error: string | null;
};

export function MoviesExplorer({ movies, error }: MoviesExplorerProps) {
  const { query, handleSearch, isPending } = useMovieSearch();

  return (
    <Card className="flex w-full max-w-4xl flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold">Movies</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Search The Movie Database (server API key in{" "}
          <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">
            TMDB_API_KEY
          </code>
          ).
        </p>
      </div>
      <MovieSearch value={query} onChange={handleSearch} />
      <MoviesList movies={movies} loading={isPending} error={error} />
    </Card>
  );
}
