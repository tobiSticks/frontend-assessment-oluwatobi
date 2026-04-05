"use client";

import { useMovieSearch } from "@/features/movies/hooks/useMovieSearch";

export default function SearchInput() {
  const { query, handleSearch, isPending } = useMovieSearch();

  return (
    <div className="relative w-full max-w-md shrink-0">
      <input
        type="search"
        value={query}
        placeholder="Search for a movie…"
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-11 pr-10 text-sm shadow-sm transition-all placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
        aria-label="Search movies"
      />
      <span
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        aria-hidden
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>
      {isPending ? (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2" aria-hidden>
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        </span>
      ) : null}
    </div>
  );
}
