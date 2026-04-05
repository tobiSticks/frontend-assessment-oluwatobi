import { fetchMovies } from "@/lib/tmdb";
import { MovieResponse } from "@/types/movie";
import SafeImage from "@/components/ui/SafeImage";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string; year?: string }>;
}) {
  const { query, page, year } = await searchParams;
  const currentPage = page || "1";
  const pageNum = parseInt(currentPage, 10);

  let endpoint = "/movie/popular";
  const params: Record<string, string> = { page: currentPage };

  if (query) {
    endpoint = "/search/movie";
    params.query = query;
    if (year) {
      params.primary_release_year = year;
    }
  } else if (year) {
    endpoint = "/discover/movie";
    params.primary_release_year = year;
  }

  const data: MovieResponse = await fetchMovies(endpoint, params);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {query
            ? `Search results for "${query}"`
            : year
              ? `Movies from ${year}`
              : "Trending Movies"}
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
                priority={index < 8}
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

      {data.total_pages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4 border-t border-slate-200 pt-8">
          <Link
            href={
              pageNum > 1
                ? `/?${new URLSearchParams({
                    ...(query ? { query } : {}),
                    ...(year ? { year } : {}),
                    page: (pageNum - 1).toString(),
                  }).toString()}`
                : "#"
            }
            className={`inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold transition-all ${
              pageNum <= 1
                ? "pointer-events-none bg-slate-100 text-slate-400"
                : "bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98]"
            }`}
            aria-disabled={pageNum <= 1}
          >
            ← Previous
          </Link>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            Page <span className="text-slate-900">{pageNum}</span> of{" "}
            <span className="text-slate-900">{data.total_pages}</span>
          </div>

          <Link
            href={
              pageNum < data.total_pages
                ? `/?${new URLSearchParams({
                    ...(query ? { query } : {}),
                    ...(year ? { year } : {}),
                    page: (pageNum + 1).toString(),
                  }).toString()}`
                : "#"
            }
            className={`inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold transition-all ${
              pageNum >= data.total_pages
                ? "pointer-events-none bg-slate-100 text-slate-400"
                : "bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
            }`}
            aria-disabled={pageNum >= data.total_pages}
          >
            Next →
          </Link>
        </div>
      )}
    </div>
  );
}