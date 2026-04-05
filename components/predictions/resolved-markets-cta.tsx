"use client";

import Link from "next/link";

export function ResolvedMarketsCTA() {
  const totalResolved = 24;

  return (
    <Link href="/predictions/resolved">
      <div className="mx-4 mt-4 p-4 bg-card/40 rounded-2xl active:scale-[0.98] transition-transform cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">
              Results & History
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              See all {totalResolved} resolved markets
            </p>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-zinc-400"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
