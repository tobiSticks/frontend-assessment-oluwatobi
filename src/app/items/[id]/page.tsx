import { fetchMovies } from "@/lib/tmdb";
import type { MovieDetails } from "@/types/movie";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const TMDB_IMAGE = "https://image.tmdb.org/t/p";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getMovie(id: string): Promise<MovieDetails | null> {
  if (!/^\d+$/.test(id)) return null;
  try {
    return (await fetchMovies(`/movie/${id}`, {})) as MovieDetails;
  } catch {
    return null;
  }
}

function formatRuntime(minutes: number | null): string {
  if (minutes == null || minutes <= 0) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function formatReleaseDate(iso: string): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie) {
    return { title: "Movie not found | CineSearch" };
  }

  const description =
    movie.overview?.trim() ||
    movie.tagline?.trim() ||
    `Details for ${movie.title}.`;
  const ogImage =
    movie.backdrop_path != null
      ? `${TMDB_IMAGE}/w1280${movie.backdrop_path}`
      : movie.poster_path != null
        ? `${TMDB_IMAGE}/w780${movie.poster_path}`
        : undefined;

  return {
    title: `${movie.title} | CineSearch`,
    description:
      description.length > 160 ? `${description.slice(0, 157)}…` : description,
    openGraph: {
      title: movie.title,
      description:
        description.length > 200 ? `${description.slice(0, 197)}…` : description,
      type: "website",
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: movie.backdrop_path ? 1280 : 780,
            height: movie.backdrop_path ? 720 : 1170,
            alt: movie.title,
          },
        ],
      }),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: movie.title,
      description:
        description.length > 160 ? `${description.slice(0, 157)}…` : description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie) {
    notFound();
  }

  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE}/w1280${movie.backdrop_path}`
    : null;
  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE}/w500${movie.poster_path}`
    : null;
  const genres = movie.genres.map((g) => g.name).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-4 md:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <Link href="/" className="transition-colors hover:text-blue-600">
            Home
          </Link>
          <span className="text-slate-400" aria-hidden>/</span>
          <Link href="/" className="transition-colors hover:text-blue-600">
            Movies
          </Link>
          <span className="text-slate-400" aria-hidden>/</span>
          <span className="truncate text-slate-900" aria-current="page">
            {movie.title}
          </span>
        </nav>
      </div>

      <div className="relative h-[min(42vh,420px)] w-full overflow-hidden bg-slate-900 md:h-[min(48vh,520px)]">
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"
            aria-hidden
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,280px),minmax(0,1fr)] lg:gap-12 lg:items-start">
          <div className="mx-auto w-full max-w-[260px] shrink-0 overflow-hidden rounded-2xl bg-slate-200 shadow-2xl ring-1 ring-slate-900/10 lg:mx-0 lg:-mt-40 lg:max-w-none">
            <div className="relative aspect-[2/3] w-full">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 260px, 280px"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-slate-300 p-6 text-center text-sm font-medium text-slate-500">
                  No poster available
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 space-y-6 pt-0 lg:pt-4">
            <header className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                {movie.title}
              </h1>
              {movie.tagline ? (
                <p className="text-lg italic text-slate-500 md:text-xl">
                  {movie.tagline}
                </p>
              ) : null}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-800 ring-1 ring-amber-200/80">
                  <span aria-hidden>★</span>
                  {movie.vote_average.toFixed(1)}
                  <span className="font-normal text-amber-700/80">/ 10</span>
                </span>
              </div>
            </header>

            <dl className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Release date
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">
                  {formatReleaseDate(movie.release_date)}
                </dd>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Runtime
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">
                  {formatRuntime(movie.runtime)}
                </dd>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-1">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Genres
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">
                  {genres.length > 0 ? genres.join(", ") : "—"}
                </dd>
              </div>
            </dl>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
              <p className="max-w-3xl text-base leading-relaxed text-slate-600">
                {movie.overview?.trim() || "No overview available."}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
