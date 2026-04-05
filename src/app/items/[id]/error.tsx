'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-500 shadow-sm ring-4 ring-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-12 w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>

      <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
        Oops! Something went wrong
      </h1>
      <p className="mb-10 max-w-md text-lg leading-relaxed text-slate-600">
        We couldn't load the movie details right now. This might be due to a temporary network issue or a problem with the TMDB service.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98]"
        >
          Return to Home
        </Link>
      </div>

      {error.digest && (
        <p className="mt-8 text-xs font-mono text-slate-400">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
