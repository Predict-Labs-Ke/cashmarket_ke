"use client";

import Link from "next/link";
import type { Market } from "./types";
import Image from "next/image";

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  const isResolved = market.status === "resolved";

  return (
    <Link href={`/predictions/${market.id}`}>
      <div className="px-4 py-4 transition-colors border-b border-zinc-800/30 bg-card/40 rounded-2xl hover:bg-card/60 active:scale-[0.98] transform-gpu cursor-pointer">
     
        <div className="flex gap-3">
          {/* Image */}
          <div className="relative h-30 w-30 shrink-0">
            <Image
              src={market.image || "/placeholder.svg"}
              alt={market.title}
              fill
              className=" rounded-lg object-cover flex-shrink-0 "
            />
            {isResolved && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-black"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-semibold text-white mb-3 line-clamp-2">
              {market.title}
            </h3>

            {/* Outcomes */}
            <div className="space-y-2">
              {market.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-[13px] text-zinc-400">
                    {outcome.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[13px] font-semibold ${
                        outcome.color === "green"
                          ? "text-[#2DC96F]"
                          : "text-[#F23F7F]"
                      }`}
                    >
                      {outcome.percentage}%
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      disabled={isResolved}
                      className={`px-3 py-1 rounded-full text-[12px] font-semibold active:scale-95 transition-transform ${
                        isResolved
                          ? "bg-zinc-700/30 text-zinc-500 cursor-not-allowed"
                          : outcome.color === "green"
                          ? "bg-[#2DC96F]/20 text-[#2DC96F]"
                          : "bg-[#F23F7F]/20 text-[#F23F7F]"
                      }`}
                    >
                      {outcome.color === "green" ? "Yes" : "No"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[12px] text-zinc-600 mt-2">
              {market.totalVolume}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
