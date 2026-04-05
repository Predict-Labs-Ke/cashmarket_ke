"use client";

import Link from "next/link";
import type { TimeframeOption } from "../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimeframeSelectorProps {
  options: TimeframeOption[];
  marketId: string;
  activeTimeframe:TimeframeOption['value'];
  activeTab:string;
}

export function TimeframeSelector({
  options,
  marketId,
  activeTimeframe,
  activeTab,
}: TimeframeSelectorProps) {


  return (
    <div className="flex gap-2  w-full justify-center overflow-x-auto scrollbar-hide  
    px-4
    ">
      {options.map((option) => (
      
         <Button
         variant={activeTimeframe === option.value ? "default" : "secondary"}
         size="sm"
         className= {
          cn(
            "rounded-xl border-none! cursor-pointer font-medium whitespace-nowrap transition-colors p-2",
            activeTimeframe === option.value ? "bg-muted! text-foreground!" : "bg-background! text-muted-foreground!"
          )
      
         }
         key={option.value}
         
         >
            <Link
        
          href={`/markets/${marketId}?timeframe=${option.value}&tab=${activeTab}`}
          replace 
          
          
        >
           {option.label}
        </Link>
         </Button>
      ))}
    </div>
  );
}
