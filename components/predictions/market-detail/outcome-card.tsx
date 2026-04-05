"use client";

import type { PredictionOutcome } from "../types";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface OutcomeCardProps {
  outcome: PredictionOutcome;
  volume: string;
  image: string;
  onVote: (type: "yes" | "no") => void;
}

export function OutcomeCard({ outcome, volume, image, onVote }: OutcomeCardProps) {
  return (
    <div className="p-3 bg-card/80 rounded-2xl flex flex-col gap-5">
      {/* Top Row: Icon + Info + Main Percentage */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl relative overflow-hidden">
            <Image src={image} alt={outcome.label} fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <p className="text-foreground font-semibold text-sm">
              {outcome.label}
            </p>
            <p className="text-foreground/50 mt-0.5 text-[13px]">
              {volume}
            </p>
          </div>
        </div>
        <p className="text-foreground text-[17px]">
          {Math.round(outcome.percentage)}%
        </p>
      </div>

      {/* Bottom Row: Yes / No Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={() => onVote("yes")}
          className="flex-1 py-1 rounded-xl text-[14px] font-bold active:scale-95 transition-transform bg-success/10! text-success! hover:bg-success/20!"
          size="sm"
        >
          Yes • {outcome.odds}
        </Button>
        <Button
          onClick={() => onVote("no")}
          className="flex-1 py-1 rounded-xl text-[14px] font-bold active:scale-95 transition-transform bg-destructive/10! text-destructive! hover:bg-destructive/20!"
          size="sm"
        >
          No • {Math.max(0.1, 100 - parseFloat(outcome.odds.replace('¢',''))).toFixed(1)}¢
        </Button>
      </div>
    </div>
  );
}
