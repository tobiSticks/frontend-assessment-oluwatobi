import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./global.css";
import SearchInput from "@/features/movies/components/SearchInput";

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
          <nav className="container mx-auto flex h-16 items-center gap-4 px-4 sm:gap-8">
            <span className="shrink-0 text-xl font-bold tracking-tight text-blue-600">
              CineSearch
            </span>
            <Suspense
              fallback={
                <div className="h-10 w-full max-w-md shrink animate-pulse rounded-full bg-slate-100" />
              }
            >
              <SearchInput />
            </Suspense>
          </nav>
        </header>
        <main className="container mx-auto py-8 px-4 md:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}