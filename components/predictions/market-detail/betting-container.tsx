"use client";

import { useState } from "react";
import type { Market, PredictionOutcome } from "@/components/predictions/types";
import { OutcomeCard } from "./outcome-card";
import { BetDrawer } from "../bet-drawer";

interface BettingContainerProps {
  market: Market;
  marketId: string;
}

export function BettingContainer({
  market,
  marketId,
}: BettingContainerProps) {
  const [activeBet, setActiveBet] = useState<{
    outcome: PredictionOutcome;
    type: "yes" | "no";
  } | null>(null);



  return (
    <>
      <div className="p-3 md:p-4 pt-4 md:pt-6 space-y-3 md:space-y-4 w-full border-t border-border/50!">
        {market.outcomes.map((outcome: PredictionOutcome, idx: number) => (
          <OutcomeCard
            key={idx}
            outcome={outcome}
            volume={market.totalVolume}
            image={market.image}
            onVote={(type) => setActiveBet({ outcome, type })}
          />
        ))}
      </div>

      <BetDrawer
        market={market}
        outcome={activeBet?.outcome || market.outcomes[0]} // Fallback to prevent crash on exit animation
        type={activeBet?.type || "yes"}
        marketId={marketId}
        isOpen={!!activeBet}
        onClose={() => setActiveBet(null)}
      />
    </>
  );
}
