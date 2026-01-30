"use client";

import { useState, useEffect } from "react";

interface MarketCardProps {
  id: number;
  title: string;
  category: string;
  yesPercentage: number;
  volume: string;
  endDate: string;
  trending?: boolean;
  resolutionSource?: string;
  movement24h?: number; // Percentage change in last 24h (e.g., +5 or -3)
}

// Helper function to calculate time remaining
function getTimeRemaining(endDateStr: string): string {
  const end = new Date(endDateStr);
  const now = new Date();
  const diff = end.getTime() - now.getTime();

  if (diff < 0) return "Closed";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

// Category color mapping
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Economy: { bg: "bg-info/10", text: "text-info", border: "border-info/30" },
  Sports: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/30" },
  Tech: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
  Events: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/30" },
  Environment: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/30" },
  Infrastructure: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/30" },
  Weather: { bg: "bg-cyan-500/10", text: "text-cyan-500", border: "border-cyan-500/30" },
};

export default function MarketCard({
  id,
  title,
  category,
  yesPercentage,
  volume,
  endDate,
  trending = false,
  resolutionSource = "Official sources",
  movement24h = 0,
}: MarketCardProps) {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(endDate));

  // Update countdown every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(endDate));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [endDate]);

  const categoryStyle = categoryColors[category] || categoryColors.Tech;

  return (
    <div className="bg-card border border-card-border rounded-2xl p-4 lg:p-5 hover:bg-card-hover hover:border-border-secondary transition cursor-pointer group">
      {/* Header with Category Badge and Trending */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-3 py-1 ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border} rounded-full text-xs font-medium`}>
            {category}
          </span>
          {trending && (
            <span className="flex items-center gap-1 px-2 py-1 bg-warning/10 text-warning border border-warning/30 rounded-full text-xs font-medium">
              <span>🔥</span>
              Trending
            </span>
          )}
        </div>
        
        {/* 24h Movement Indicator */}
        {movement24h !== 0 && (
          <div className={`flex items-center gap-1 text-xs font-medium ${movement24h > 0 ? 'text-success' : 'text-destructive'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {movement24h > 0 ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              )}
            </svg>
            <span>{movement24h > 0 ? '+' : ''}{movement24h}%</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="font-medium text-[15px] leading-snug mb-3 group-hover:text-primary transition">
        {title}
      </h3>

      {/* Probability Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-primary font-medium">Yes {yesPercentage}%</span>
          <span className="text-destructive font-medium">No {100 - yesPercentage}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-hover to-primary rounded-full transition-all duration-500"
            style={{ width: `${yesPercentage}%` }}
          />
        </div>
      </div>

      {/* Meta Information */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Vol: {volume}</span>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={timeRemaining === "Closed" ? "text-destructive font-medium" : ""}>
              {timeRemaining === "Closed" ? "Closed" : `Closes in ${timeRemaining}`}
            </span>
          </div>
        </div>

        {/* Resolution Source */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Resolves via: <span className="font-medium text-foreground">{resolutionSource}</span></span>
        </div>
      </div>

      {/* Trade Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button className="py-2.5 bg-primary-muted hover:bg-primary/20 active:bg-primary/30 border border-primary/50 text-primary rounded-xl font-medium transition">
          Buy Yes
        </button>
        <button className="py-2.5 bg-destructive-muted hover:bg-destructive/20 active:bg-destructive/30 border border-destructive/50 text-destructive rounded-xl font-medium transition">
          Buy No
        </button>
      </div>
    </div>
  );
}
