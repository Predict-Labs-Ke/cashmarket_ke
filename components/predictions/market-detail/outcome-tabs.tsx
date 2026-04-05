import Link from "next/link";
import {
  TimeframeOption
}from "../types"

import { Button } from "@/components/ui/button";

interface OutcomeTabsProps {
  activeTab: "outcomes" | "about";
  id: string;
  timeframe:TimeframeOption['value'] | undefined|string;
  
}




export function OutcomeTabs({ activeTab, id,timeframe }: OutcomeTabsProps) {


    
  return (
    <div className="grid grid-cols-2 gap-2 w-full max-w-sm px-1">
      <Link href={`/markets/${id}?tab=outcomes&timeframe=${timeframe}`} replace className="w-full">
      <Button className={`w-full min-h-10 py-2.5 px-3 text-[14px] bg-transparent! font-medium border-none! rounded-2xl capitalize transition-colors ${
          activeTab === "outcomes"
            ? " text-background/90! bg-foreground!"
            : "text-muted-foreground!"
        }`}
        variant={activeTab === "outcomes" ? "default" : "secondary"}
        size={"sm"}
      >
        <span>Outcomes</span>
      </Button>
      </Link>
      <Link href={`/markets/${id}?tab=about&timeframe=${timeframe}`} replace className="w-full">
      <Button className={`w-full min-h-10 py-2.5 px-3 text-[14px] bg-transparent! font-medium border-none! rounded-2xl capitalize transition-colors ${
          activeTab === "about"
            ? " text-background/90! bg-foreground!"
            : "text-muted-foreground!"
        }`}
        variant={activeTab === "about" ? "default" : "secondary"}
        size={"sm"}
      >
      <span>About</span>
      </Button>
      
      </Link>
    </div>
  );
}
