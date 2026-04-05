"use client";

import { useState, useEffect } from "react";
import type { Market, PredictionOutcome } from "@/components/predictions/types";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";


import Image from "next/image";
import { ChevronDown, Minus, Plus, X, Info } from "lucide-react";

const PRESET_AMOUNTS = [1, 5, 10, 100];

interface BetDrawerProps {
  market: Market;
  outcome: PredictionOutcome;
  type: "yes" | "no";
  marketId: string;
  isOpen: boolean;
  onClose: () => void;

}

export function BetDrawer({ market, outcome, type, marketId, isOpen, onClose,  }: BetDrawerProps) {
  const [amount, setAmount] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  // The `isFocused` state was not used and has been removed as part of simplifying the input section.

  useEffect(() => {
    if (isOpen) {
      setAmount("");
      setShowDetails(false);
    }
  }, [isOpen]);

 

  const oddsValue = parseFloat(outcome.odds.replace("¢", "")) / 100;
  const numericAmount = parseFloat(amount) || 0;
  const contracts = oddsValue > 0 ? numericAmount / oddsValue : 0;
 let  toWin ={
  amount: contracts,
    token: "USDC",
  currency:{
    symbol:"$",
    name:"USD",
    code:"USD",
    rates:{
      KES:150,
      USD:1,
      EUR:0.9,
      GBP:0.8,
      
    }
    
  },
  
  
 }; // Assuming payout is $1.00 per contract
  const isYes = type === "yes";
  const roi = numericAmount > 0 && toWin.amount > numericAmount 
    ? ((toWin.amount - numericAmount) / numericAmount) * 100 
    : 0;

  const handlePreset = (value: number) => {
    const current = parseFloat(amount) || 0;
    setAmount((current + value).toString());
  };

  const handleIncrement = () => {
    const current = parseFloat(amount) || 0;
    setAmount((current + 1).toString());
  };

  const handleDecrement = () => {
    const current = parseFloat(amount) || 0;
    if (current > 1) setAmount((current - 1).toString());
    else setAmount("");
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="rounded-t-3xl bg-background! shadow-lg! backdrop-blur-2xl! outline-none p-0! border-t border-border/50! flex flex-col max-h-[92dvh]!">
        <DrawerTitle className="hidden!"></DrawerTitle>
        <div className="flex flex-col p-5 space-y-5 overflow-y-auto">
          {/* Top Row: Buy dropdown + Market order */}
          <div className="flex items-center justify-end">
           
          <Button onClick={onClose} size="icon" className="rounded-full! bg-secondary! text-foreground! hover:bg-secondary! hover:text-foreground! p-2! h-auto! w-auto!">
            <X className="w-4 h-4 text-muted-foreground"  strokeWidth={2.5}/>
          </Button>
          </div>

          {/* Market Info Row */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-card">
              <Image
                src={market.image || "/placeholder.svg"}
                alt={market.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-foreground line-clamp-1 text-sm font-semibold">
                {market.title}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-muted-foreground text-xs">
                  ↑ {toWin.currency.symbol}{numericAmount > 0 ? numericAmount : "0"}
                </p>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isYes
                      ? "bg-success/15 text-success"
                      : "bg-destructive/15 text-destructive"
                  }`}
                >
                  {isYes ? "Yes" : "No"} {outcome.odds}
                </span>
                <p className="text-muted-foreground text-xs ml-auto">
                  Bal. $0.00
                </p>
              </div>
            </div>
          </div>

          {/* Amount Input Section */}
          <div className="flex items-center justify-between gap-4 py-4">
            <Button
              onClick={handleDecrement}
              className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground! hover:bg-secondary! active:bg-secondary! active:text-foreground! transition-all bg-transparent! active:scale-105!"
            >
              <Minus className="w-5 h-5" />
            </Button>

            <div className="flex-1 flex items-center justify-center relative h-14 w-full">
              <input
                type="text"
                inputMode="decimal"
                value={amount ? `${toWin.currency.symbol}${amount}` : ""}
                
                onChange={(e) => {
                  const val = e.target.value.replace(/^\$/, ""); // Strip leading $ if present
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setAmount(val);
                  }
                }}
                className="w-full text-center bg-transparent outline-none border-none p-0 focus:ring-0 text-4xl font-bold text-foreground tabular-nums placeholder:text-muted-foreground/50 font-mono!"
                placeholder={`${toWin.currency.symbol}0`}
              />
            </div>

            <Button
              onClick={handleIncrement}
              className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground! hover:bg-secondary! active:bg-secondary! active:text-foreground! transition-all bg-transparent! active:scale-105!"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>  

          {/* Preset Buttons */}
          <div className="flex items-center gap-2">
            {PRESET_AMOUNTS.map((preset) => (
              <Button
                key={preset}
                onClick={() => handlePreset(preset)}
                className="flex-1 p-1 rounded-lg bg-secondary! text-foreground! text-xs font-semibold active:scale-95 transition-transform hover:bg-secondary!/80"
                size="sm"
              >
                {`${toWin.currency.symbol}${preset}`}
              </Button>
            ))}
            <Button
              onClick={() => setAmount("0")}
              className="flex-1 p-1 rounded-lg bg-secondary! text-foreground! text-xs font-bold active:scale-95 transition-transform hover:bg-secondary!/80"
              size="sm"
            >
              Max
            </Button>
          </div>

          {/* Friendly Details Summary */}
          <div className="flex flex-col gap-3.5 px-2 py-3 mt-2 h-auto! border-t border-border/50!">
              <div className="flex items-center justify-between ">
               <p className="text-muted-foreground font-medium text-sm">Average price</p>
               <p className="text-foreground font-semibold text-sm font-mono">{outcome.odds}</p>
              </div>
              
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col">
               <div className="flex items-center gap-2">
                 <p className="text-foreground font-bold text-sm">To Win</p>
                 <span className="text-success">
                    💵
                 </span>
               </div>
                <div className="flex items-center gap-1">
                  {/* <Button
                    size="icon"
                    className="w-4 h-4 shrink-0 text-muted-foreground mt-0.5 bg-transparent! hover:bg-transparent! active:bg-transparent!"
                  >
                    <Info className="w-4 h-4" />
                  </Button> */}
                    <p className="text-xs text-muted-foreground mt-0.5">Includes your stake</p>
                </div>
                </div>
              
                  <p className="text-success text-xl font-mono">
                   {(toWin.amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                   <span className="text-muted-foreground ml-1 text-sm">{toWin.token}</span> 
                  </p>
   
                   
             
              </div>

              {/* Collapsible Advanced Details */}
              <div className="pt-2 ">
                <Button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground! hover:text-foreground! active:scale-95 transition-colors border-none! bg-transparent!"
                  variant="secondary"
                >
                  {showDetails ? "Show less" : "More Info"}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDetails ? "rotate-180 " : ""}`} />
                </Button>
                
                {showDetails && (
                  <div className="flex flex-col gap-2.5 mt-3.5 pt-3.5 text-sm border-t border-border/50!">
                    <div className="flex items-center justify-between">
                     <p className="text-muted-foreground font-medium">Est. Shares</p>
                     <p className="text-foreground font-semibold text-sm">{contracts.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="flex items-center justify-between">
                  <p className="text-muted-foreground font-medium">Return on Investment</p>
                      <p className="text-success text-sm">
                   +{roi.toFixed(1)}%
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground font-medium">Price impact</p>
                      <p className="text-success text-sm">
                   &lt; 1%
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground font-medium">Trading fee</p>
                      <p className="text-success text-sm">
                   Free
                      </p>
                    </div>
                    
                    <div className="mt-4 flex items-start gap-1.5 p-2 bg-secondary/30 rounded-lg">
                      <Info className="w-3.5 h-3.5 shrink-0 text-muted-foreground mt-0.5" />
                      <p className="text-muted-foreground font-medium text-sm">
                        Orders are matched via AMM. Final execution price and shares may vary slightly due to market movements.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          {/* Deposit Button */}
        <div className="w-full">
            <Button
            onClick={() => {
              // TODO: submit bet logic
              onClose();
            }}
            disabled={numericAmount <= 0}
            size="lg"
            className="rounded-xl! font-semibold! bg-[#16a34a]! text-accent-foreground! w-full! active:scale-95! transition-transform! p-2"
          >
           Confirm Bet
          </Button>
        </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
