"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function YearFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedYear, setSelectedYear] = useState(searchParams.get("year") || "");

  // Generate range of years from current back to 1900
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  useEffect(() => {
    setSelectedYear(searchParams.get("year") || "");
  }, [searchParams]);

  const handleChange = (year: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (year) {
      params.set("year", year);
    } else {
      params.delete("year");
    }
    // Reset page to 1 when changing filters
    params.delete("page");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative w-full max-w-[140px] shrink-0">
      <select
        value={selectedYear}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full appearance-none rounded-full border border-slate-200 bg-white py-2.5 pl-5 pr-10 text-sm shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
        aria-label="Filter by release year"
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year.toString()}>
            {year}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
