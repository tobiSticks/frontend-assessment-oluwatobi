import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "./globals.css";

const SearchInput = dynamic(() => import("@/features/movies/components/SearchInput"), {
  ssr: true,
});
const YearFilter = dynamic(() => import("@/features/movies/components/YearFilter"), {
  ssr: true,
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CineSearch | Movie Explorer",
  description: "A production-grade movie explorer built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} min-h-screen bg-slate-50 font-sans antialiased`}
      >
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md">
          <nav className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:gap-8">
            <Link
              href="/"
              className="shrink-0 text-xl font-bold tracking-tight text-blue-600"
              aria-label="CineSearch Home"
            >
              CheckIt
            </Link>
            <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
              <Suspense
                fallback={
                  <div className="h-10 w-24 animate-pulse rounded-full bg-slate-100" />
                }
              >
                <YearFilter />
              </Suspense>
              <Suspense
                fallback={
                  <div className="h-10 w-full max-w-md shrink animate-pulse rounded-full bg-slate-100" />
                }
              >
                <SearchInput />
              </Suspense>
            </div>
          </nav>
        </header>
        <main className="container mx-auto py-8 px-4 md:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}