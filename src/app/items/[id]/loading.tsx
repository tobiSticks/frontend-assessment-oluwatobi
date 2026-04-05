import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-4 md:px-8">
        <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="relative h-[min(42vh,420px)] w-full overflow-hidden bg-slate-200 md:h-[min(48vh,520px)]">
        <div className="h-full w-full animate-pulse bg-slate-300" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,280px),minmax(0,1fr)] lg:gap-12 lg:items-start">
          
          <div className="mx-auto w-full max-w-[260px] shrink-0 overflow-hidden rounded-2xl bg-slate-200 shadow-2xl ring-1 ring-slate-900/10 lg:mx-0 lg:-mt-40 lg:max-w-none">
            <div className="relative aspect-[2/3] w-full animate-pulse bg-slate-300" />
          </div>

          <div className="min-w-0 space-y-6 pt-0 lg:pt-4">
            <header className="space-y-3">
              <div className="h-10 w-3/4 animate-pulse rounded-lg bg-slate-200 md:h-12" />
              <div className="h-6 w-1/2 animate-pulse rounded-md bg-slate-200" />
              <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200" />
            </header>

            <dl className="grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((id) => (
                <div key={id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
                  <div className="mt-2 h-5 w-24 animate-pulse rounded bg-slate-200" />
                </div>
              ))}
            </dl>
            <section className="space-y-3">
              <div className="h-6 w-24 animate-pulse rounded bg-slate-200" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
