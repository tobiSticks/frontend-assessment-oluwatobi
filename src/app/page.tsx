import { MoviesExplorer } from "@/features/movies/components/MoviesExplorer";
import { searchMovies } from "@/features/movies/services/tmdb";

type HomePageProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const { query = "" } = await searchParams;
  let movies: Awaited<ReturnType<typeof searchMovies>> = [];
  let error: string | null = null;

  if (query.trim()) {
    try {
      movies = await searchMovies(query);
    } catch (e) {
      error = e instanceof Error ? e.message : "Something went wrong";
      movies = [];
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-5xl flex-col items-center gap-10">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Content explorer
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Routes live under <code className="text-sm">src/app</code>; movie
            UI under <code className="text-sm">src/features/movies</code>.
          </p>
        </header>
        <MoviesExplorer movies={movies} error={error} />
      </main>
    </div>
  );
}
