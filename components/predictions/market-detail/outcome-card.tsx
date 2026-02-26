"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { PredictionOutcome } from "../types";

interface OutcomeCardProps {
  outcome: PredictionOutcome;
  volume: string;
}

export function OutcomeCard({ outcome, volume }: OutcomeCardProps) {
  const [betType, setBetType] = useState<"yes" | "no" | null>(null);
  const [amount, setAmount] = useState(100);

  const handleVote = (type: "yes" | "no") => {
    setBetType(type);
  };

  const incrementAmount = () => setAmount((prev) => prev + 50);
  const decrementAmount = () => setAmount((prev) => Math.max(10, prev - 50));

  const potentialPayout = betType === "yes" 
    ? (amount * (100 / outcome.percentage)).toFixed(2)
    : (amount * (100 / (100 - outcome.percentage))).toFixed(2);

  return (
    <div className="p-4 rounded-xl bg-card border border-border hover:border-border-secondary transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              outcome.percentage > 50 
                ? "bg-success/10 text-success" 
                : outcome.percentage < 50 
                  ? "bg-destructive/10 text-destructive"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {outcome.percentage > 50 ? (
              <TrendingUp className="w-5 h-5" />
            ) : outcome.percentage < 50 ? (
              <TrendingDown className="w-5 h-5" />
            ) : (
              <Minus className="w-5 h-5" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {outcome.label}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{volume} volume</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold text-foreground">
            {outcome.percentage}%
          </span>
          <p className="text-xs text-muted-foreground">{outcome.odds} odds</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
        <div 
          className={`h-full transition-all duration-500 ${
            outcome.color === "green" ? "bg-success" : "bg-destructive"
          }`}
          style={{ width: `${outcome.percentage}%` }}
        />
      </div>

      <div className="flex gap-2">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              onClick={() => handleVote("yes")}
              variant="outline"
              className="flex-1 h-11 bg-success/10 border-success/20 text-success hover:bg-success/20 hover:text-success font-semibold"
            >
              Yes • {outcome.odds}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Place Your Bet</DrawerTitle>
              <DrawerDescription>
                Betting YES on "{outcome.label}"
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-6">
              {/* Amount selector */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Bet Amount (KES)</label>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={decrementAmount}
                    disabled={amount <= 10}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold text-foreground">
                      {amount}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={incrementAmount}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {/* Quick amounts */}
                <div className="flex gap-2 justify-center">
                  {[50, 100, 250, 500].map((amt) => (
                    <Button
                      key={amt}
                      variant={amount === amt ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAmount(amt)}
                    >
                      {amt}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Payout info */}
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current odds</span>
                  <span className="font-medium text-foreground">{outcome.percentage}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Potential payout</span>
                  <span className="font-semibold text-success">KES {potentialPayout}</span>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button className="w-full h-12 bg-success hover:bg-success/90 text-white font-semibold">
                Confirm Bet • KES {amount}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger asChild>
            <Button
              onClick={() => handleVote("no")}
              variant="outline"
              className="flex-1 h-11 bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive/20 hover:text-destructive font-semibold"
            >
              No • {outcome.odds}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Place Your Bet</DrawerTitle>
              <DrawerDescription>
                Betting NO on "{outcome.label}"
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-6">
              {/* Amount selector */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Bet Amount (KES)</label>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={decrementAmount}
                    disabled={amount <= 10}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold text-foreground">
                      {amount}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={incrementAmount}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {/* Quick amounts */}
                <div className="flex gap-2 justify-center">
                  {[50, 100, 250, 500].map((amt) => (
                    <Button
                      key={amt}
                      variant={amount === amt ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAmount(amt)}
                    >
                      {amt}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Payout info */}
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current odds</span>
                  <span className="font-medium text-foreground">{100 - outcome.percentage}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Potential payout</span>
                  <span className="font-semibold text-destructive">KES {potentialPayout}</span>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button className="w-full h-12 bg-destructive hover:bg-destructive/90 text-white font-semibold">
                Confirm Bet • KES {amount}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
