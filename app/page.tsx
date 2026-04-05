import { fetchMovies } from "@/lib/tmdb";
import { MovieResponse } from "@/types/movie";
import SafeImage from "@/components/ui/SafeImage";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query, page } = await searchParams;
  const currentPage = page || "1";
  
  const endpoint = query ? "/search/movie" : "/movie/popular";
  const data: MovieResponse = await fetchMovies(endpoint, {
    query: query || "",
    page: currentPage,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {query ? `Search results for "${query}"` : "Trending Movies"}
        </h1>
        <p className="text-slate-500 mt-2">Discover your next favorite film.</p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.results.map((movie, index) => (
          <Link
            key={movie.id}
            href={`/items/${movie.id}`}
            className="group relative flex flex-col outline-none ring-blue-500/30 focus-visible:ring-2"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-sm ring-1 ring-slate-200/80">
              <SafeImage
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : ""
                }
                alt={movie.title}
                fill
                className="transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={index < 4}
              />
            </div>
            <div className="mt-4 flex flex-col">
              <h3 className="line-clamp-1 text-sm font-bold text-slate-900">
                {movie.title}
              </h3>
              <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
                <span className="flex items-center font-medium text-amber-500">
                  ★ {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}