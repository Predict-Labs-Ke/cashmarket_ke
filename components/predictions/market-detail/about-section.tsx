import type { MarketDetail } from "@/components/predictions/types";
import { BarChart3, Clock, ExternalLinkIcon, Landmark } from "lucide-react";

interface AboutSectionProps {
  market: MarketDetail;
}

export function AboutSection({ market }: AboutSectionProps) {
  return (
    <div className="w-full text-zinc-300">
      {/* Quick Stats Grid */}
      <div className="px-4 py-2 mt-4 space-y-4 border-b border-zinc-800/50 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400">
            <BarChart3 className="w-4.5 h-4.5" />
            <span className="text-foreground text-sm font-medium">
              Volume
            </span>
            
          </div>
          <span className="text-foreground text-sm">
            {market.totalVolume}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="w-4.5 h-4.5" />
            {/* <span className="text-sm font-medium">End date</span> */}
            <span className="text-foreground text-sm font-medium">
              End date
            </span>
            
          </div>
          <span className="text-foreground text-sm">
            {/* format date to long date format like sunday january 1 2025 no commas */}
            {new Date(market.endDate).toLocaleDateString("en-US", {
              
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
             
              
            })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400">
            <Landmark className="w-4.5 h-4.5" />
         <span className="text-foreground text-sm font-medium">
              Resolution details
            </span>
          </div>
          <span className="text-blue-500 flex items-center gap-2 text-sm">
            Polymarket 
            <ExternalLinkIcon className="w-4.5 h-4.5" />
          </span>
        </div>
      </div>

      {/* Description / Rules Area */}
      <div 
        className="px-4 py-6 space-y-6 text-[15px] leading-relaxed text-foreground/70 prose prose-invert max-w-none border-t border-border/50!"
        dangerouslySetInnerHTML={{ __html: market.description || "" }}
      />

      {/* Disclaimer */}
      <div className="px-4 py-6 text-[13px] text-zinc-500 border-t border-border/50! mt-4 leading-relaxed">
        This information may be incomplete. All market rules, resolution
        criteria, and final outcomes are governed solely by Polymarket. Trades
        should be made based on the full rules available on Polymarket.
      </div>
    </div>
  );
}
