import Link from "next/link";
import { cn } from "@/lib/utils";
import type { TimeframeOption } from "../types";

interface OutcomeTabsProps {
  activeTab: "outcomes" | "about";
  id: string;
  timeframe: TimeframeOption['value'] | undefined | string;
}

export function OutcomeTabs({ activeTab, id, timeframe }: OutcomeTabsProps) {
  const tabs = [
    { value: "outcomes", label: "Outcomes" },
    { value: "about", label: "About" },
  ] as const;

  return (
    <div className="flex w-full border-b border-border">
      {tabs.map((tab) => (
        <Link
          key={tab.value}
          href={`/markets/${id}?category=${tab.value}${timeframe ? `&timeframe=${timeframe}` : ''}`}
          replace
          className={cn(
            "flex-1 py-3 text-center text-sm font-medium transition-colors relative",
            activeTab === tab.value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
          {activeTab === tab.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </Link>
      ))}
    </div>
  );
}
