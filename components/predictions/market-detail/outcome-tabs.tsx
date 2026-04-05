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
    <div className="flex gap-6 px-4 ">
      <Link href={`/markets/${id}?tab=outcomes&timeframe=${timeframe}`} replace>
      <Button className={`py-3 px-4 text-[15px] bg-transparent!  font-medium border-none! rounded-3xl capitalize  transition-colors ${
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
      <Link href={`/markets/${id}?tab=about&timeframe=${timeframe}`} replace>
      <Button className={`py-3 px-4 text-[15px] bg-transparent!  font-medium border-none! rounded-3xl capitalize  transition-colors ${
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
