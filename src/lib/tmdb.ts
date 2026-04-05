const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies(endpoint: string, params: Record<string, string> = {}) {
  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY!,
    language: 'en-US',
    ...params,
  });

  const res = await fetch(`${BASE_URL}${endpoint}?${queryParams}`, {
    next: { revalidate: 3600 }, 
  });

  if (!res.ok) {
    throw new Error(`TMDB API Error: ${res.statusText}`);
  }

  return res.json();
}