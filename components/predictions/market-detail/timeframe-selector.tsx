"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { TimeframeOption } from "../types";

interface TimeframeSelectorProps {
  options: TimeframeOption[];
  marketId: string;
  activeTimeframe: TimeframeOption['value'];
}

export function TimeframeSelector({
  options,
  marketId,
  activeTimeframe,
}: TimeframeSelectorProps) {
  return (
    <div className="flex gap-1.5 px-4 py-2 overflow-x-auto scrollbar-hide w-full justify-center">
      {options.map((option) => (
        <Button
          key={option.value}
          variant={activeTimeframe === option.value ? "default" : "ghost"}
          size="sm"
          asChild
          className={activeTimeframe === option.value 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground"
          }
        >
          <Link
            href={`/markets/${marketId}?timeframe=${option.value}`}
            replace
          >
            {option.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}
