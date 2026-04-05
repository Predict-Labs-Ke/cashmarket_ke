"use client";

import type { MarketDetail } from "@/components/predictions/types";

interface ResolvedMarketProps {
  market: MarketDetail;
}

export function ResolvedMarket({ market }: ResolvedMarketProps) {
  return (
    <div className="px-4 space-y-4">
      {/* Winner Highlight */}
      <div className="bg-gradient-to-r from-green-500/20 to-green-500/10 rounded-lg p-4 border border-green-500/30">
        <div className="flex items-center gap-2 mb-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-green-500"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          <span className="text-sm font-medium text-green-400">Resolved</span>
        </div>
        <p className="text-[15px] font-semibold text-white mb-1">
          Winning outcome
        </p>
        <p className="text-[18px] font-bold text-green-400">
          {market.resolvedOutcome}
        </p>
      </div>

      {/* User's Result */}
      {market.userBet && (
        <div
          className={`rounded-lg p-4 border ${
            market.userBet.won
              ? "bg-green-500/10 border-green-500/30"
              : "bg-red-500/10 border-red-500/30"
          }`}
        >
          <p className="text-[13px] text-zinc-400 mb-1">Your result</p>
          <div className="flex items-baseline gap-2 mb-3">
            <span
              className={`text-[24px] font-bold ${
                market.userBet.won ? "text-green-400" : "text-red-400"
              }`}
            >
              {market.userBet.won ? "+" : "-"}$
              {Math.abs(market.userBet.payout! - market.userBet.amount).toFixed(
                2
              )}
            </span>
            <span
              className={`text-[12px] font-medium ${
                market.userBet.won ? "text-green-400" : "text-red-400"
              }`}
            >
              {market.userBet.won ? "Won" : "Lost"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-[12px]">
            <div>
              <p className="text-zinc-500">Your bet</p>
              <p className="text-white font-semibold">
                ${market.userBet.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-zinc-500">You received</p>
              <p className="text-white font-semibold">
                ${market.userBet.payout!.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Resolved Outcomes */}
      {market.resolvedOutcomes && market.resolvedOutcomes.length > 0 && (
        <div className="bg-zinc-800/30 rounded-lg p-4 space-y-2">
          <p className="text-[13px] font-semibold text-white mb-3">
            Final odds
          </p>
          {market.outcomes.map((outcome, idx) => {
            const isWinner = outcome.label === market.resolvedOutcome;
            return (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isWinner && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-green-400"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                  <span
                    className={`text-[13px] ${
                      isWinner ? "text-white font-semibold" : "text-zinc-400"
                    }`}
                  >
                    {outcome.label}
                  </span>
                </div>
                <span
                  className={`text-[13px] font-semibold ${
                    outcome.color === "green"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {outcome.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
