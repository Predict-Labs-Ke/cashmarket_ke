"use client";

import Link from "next/link";
import type { Market, PredictionOutcome } from "@/components/predictions/types";
import type { MouseEvent } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  const isResolved = market.status === "resolved";
  const router = useRouter();

  return (
    <Link href={`/predictions/${market.id}`}>
      <div className="px-4 py-4 transition-colors bg-card rounded-2xl  cursor-pointer flex flex-col gap-3">
     
    
        <div className="flex flex-row gap-3 items-center">
            {/* Image */}
          <div className="relative h-12 w-12 shrink-0">
            <Image
              src={market.image || "/placeholder.svg"}
              alt={market.title}
             fill
              className=" rounded-lg object-cover flex-shrink-0 "
              priority
            />
            {isResolved && (
           <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
            <Check
            className="text-white"
            size={12}
            />
            </div>
            )}

            
          </div>
           <p className="text-foreground font-bold line-clamp-2 hover:underline underline-offset-4 tap:underline active:underline">
              {market.title}
            </p>
          </div>

          {/* Content */} 
          <div className="flex-1 min-w-0">
           

            {/* Outcomes */}
            <div className="space-y-2.5">
              {market.outcomes.slice(0, 2).map((outcome: PredictionOutcome, idx: number) => (
                <div key={idx} className="flex items-center justify-between gap-3">
                  <p className="text-foreground/80 truncate flex-1 min-w-0 text-sm">
                    {outcome.label}
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    <p className="text-foreground/60 text-sm tabular-nums w-10 text-right">
                      {outcome.percentage}%
                    </p>
                    <div className="flex gap-1.5">
                      <Button
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/predictions/${market.id}?bet=yes&outcome=${idx}`);
                        }}
                        disabled={isResolved}
                        className="px-4! py-1.5! h-8! min-w-[52px]! rounded-lg! text-[13px]! font-semibold! active:scale-95 transition-transform bg-success/10! text-success! hover:bg-success/20!"
                        size="sm"
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/predictions/${market.id}?bet=no&outcome=${idx}`);
                        }}
                        disabled={isResolved}
                        className="px-4! py-1.5! h-8! min-w-[52px]! rounded-lg! text-[13px]! font-semibold! active:scale-95 transition-transform bg-destructive/10! text-destructive! hover:bg-destructive/20!"
                        size="sm"
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {market.outcomes.length > 2 && (
                <div className="flex items-center justify-center gap-1 pt-1 cursor-pointer">
                  <p className="text-muted-foreground text-xs">
                    +{market.outcomes.length - 2} more
                  </p>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              )}
            </div>

            <p className="text-[12px] text-zinc-600 mt-2">
              {market.totalVolume}
            </p>
          </div>
        </div>
      
    </Link>
  );
}
