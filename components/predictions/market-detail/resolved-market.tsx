"use client";

import { CheckCircle2, Trophy, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MarketDetail } from "@/components/predictions/types";

interface ResolvedMarketProps {
  market: MarketDetail;
}

export function ResolvedMarket({ market }: ResolvedMarketProps) {
  return (
    <div className="px-4 space-y-4 w-full">
      {/* Winner Highlight */}
      <Card className="bg-gradient-to-r from-success/20 to-success/5 border-success/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-success">Market Resolved</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            Winning outcome
          </p>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-warning" />
            <p className="text-xl font-bold text-foreground">
              {market.resolvedOutcome}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* User's Result */}
      {market.userBet && (
        <Card className={market.userBet.won 
          ? "bg-success/10 border-success/30" 
          : "bg-destructive/10 border-destructive/30"
        }>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Your Result
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-baseline gap-2 mb-4">
              {market.userBet.won ? (
                <TrendingUp className="w-6 h-6 text-success" />
              ) : (
                <TrendingDown className="w-6 h-6 text-destructive" />
              )}
              <span className={`text-3xl font-bold ${
                market.userBet.won ? "text-success" : "text-destructive"
              }`}>
                {market.userBet.won ? "+" : "-"}KES{" "}
                {Math.abs(market.userBet.payout! - market.userBet.amount).toFixed(2)}
              </span>
              <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                market.userBet.won 
                  ? "bg-success/20 text-success" 
                  : "bg-destructive/20 text-destructive"
              }`}>
                {market.userBet.won ? "Won" : "Lost"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Your bet</p>
                <p className="text-base font-semibold text-foreground">
                  KES {market.userBet.amount.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">You received</p>
                <p className="text-base font-semibold text-foreground">
                  KES {market.userBet.payout!.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resolved Outcomes */}
      {market.resolvedOutcomes && market.resolvedOutcomes.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Final Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {market.outcomes.map((outcome, idx) => {
              const isWinner = outcome.label === market.resolvedOutcome;
              return (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isWinner ? "bg-success/10" : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isWinner && (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    )}
                    <span className={`text-sm ${
                      isWinner ? "text-foreground font-semibold" : "text-muted-foreground"
                    }`}>
                      {outcome.label}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    isWinner ? "text-success" : "text-muted-foreground"
                  }`}>
                    {outcome.percentage}%
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
