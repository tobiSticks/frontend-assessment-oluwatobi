import type { Movie } from "@/types/movie";

const TMDB_BASE = "https://api.themoviedb.org/3";

interface TmdbMovieResult {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

interface TmdbSearchResponse {
  results: TmdbMovieResult[];
}

function mapMovie(m: TmdbMovieResult): Movie {
  return {
    id: m.id,
    title: m.title,
    overview: m.overview,
    poster_path: m.poster_path,
    backdrop_path: m.backdrop_path ?? null,
    release_date: m.release_date ?? "",
    vote_average: m.vote_average ?? 0,
    genre_ids: m.genre_ids ?? [],
  };
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const key = process.env.TMDB_API_KEY;
  if (!key?.trim()) {
    throw new Error(
      "TMDB_API_KEY is not set. Add it to .env.local (see TMDB API docs).",
    );
  }

  const url = new URL(`${TMDB_BASE}/search/movie`);
  url.searchParams.set("api_key", key);
  url.searchParams.set("query", query.trim());
  url.searchParams.set("include_adult", "false");

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as TmdbSearchResponse;
  return (data.results ?? []).map(mapMovie);
}
