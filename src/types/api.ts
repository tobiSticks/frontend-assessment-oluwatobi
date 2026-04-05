import type { Movie } from "./movie";

/** Payload from `GET /api/movies/search` */
export interface MovieSearchResponse {
  results: Movie[];
  error?: string;
}
