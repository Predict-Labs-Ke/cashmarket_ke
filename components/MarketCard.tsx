"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BuyModal from "./BuyModal";

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
  resolved?: boolean;
  createdDate?: string;
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

// Helper function to determine market maturity status
function getMarketMaturity(endDateStr: string, createdDateStr?: string, resolved?: boolean): {
  status: "new" | "active" | "near_resolution" | "resolved";
  label: string;
  color: string;
} {
  if (resolved) {
    return { status: "resolved", label: "Resolved", color: "bg-muted text-muted-foreground" };
  }

  const end = new Date(endDateStr);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Check if market is new (created within last 7 days)
  if (createdDateStr) {
    const created = new Date(createdDateStr);
    const daysSinceCreation = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceCreation <= 7) {
      return { status: "new", label: "New", color: "bg-primary/10 text-primary border-primary/30" };
    }
  }

  // Near resolution (less than 7 days remaining)
  if (days >= 0 && days <= 7) {
    return { status: "near_resolution", label: "Near Resolution", color: "bg-warning/10 text-warning border-warning/30" };
  }

  // Active market
  return { status: "active", label: "Active", color: "bg-success/10 text-success border-success/30" };
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
  resolved = false,
  createdDate,
}: MarketCardProps) {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(endDate));
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const favorites = JSON.parse(localStorage.getItem("favoriteMarkets") || "[]");
      return favorites.includes(id);
    } catch {
      return false;
    }
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyDirection, setBuyDirection] = useState<"yes" | "no">("yes");

  // Update countdown every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(endDate));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [endDate]);

  const categoryStyle = categoryColors[category] || categoryColors.Tech;
  const maturity = getMarketMaturity(endDate, createdDate, resolved);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const favorites = JSON.parse(localStorage.getItem("favoriteMarkets") || "[]");
      let newFavorites;
      if (isFavorite) {
        newFavorites = favorites.filter((fav: number) => fav !== id);
      } else {
        newFavorites = [...favorites, id];
      }
      localStorage.setItem("favoriteMarkets", JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
    } catch {
      // Handle corrupted localStorage gracefully
      console.error("Failed to update favorites");
    }
  };

  // Handle buy button clicks
  const handleBuyClick = (e: React.MouseEvent, direction: "yes" | "no") => {
    e.stopPropagation();
    setBuyDirection(direction);
    setShowBuyModal(true);
  };

  // Handle card click to navigate to details page
  const handleCardClick = () => {
    router.push(`/markets/${id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-card border border-card-border rounded-2xl p-4 lg:p-5 hover:bg-card-hover hover:border-border-secondary transition cursor-pointer group"
    >
      {/* Header with Category Badge, Maturity Status, and Trending */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-3 py-1 ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border} rounded-full text-xs font-medium`}>
            {category}
          </span>
          <span className={`px-2 py-1 ${maturity.color} border rounded-full text-xs font-medium`}>
            {maturity.label}
          </span>
          {trending && (
            <span className="flex items-center gap-1 px-2 py-1 bg-warning/10 text-warning border border-warning/30 rounded-full text-xs font-medium">
              <span>🔥</span>
              Trending
            </span>
          )}
        </div>
        
        {/* 24h Movement Indicator and Favorite Button */}
        <div className="flex items-center gap-2">
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
          <button
            onClick={toggleFavorite}
            className="p-1 hover:bg-muted rounded-full transition"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg 
              className={`w-5 h-5 transition ${isFavorite ? 'text-warning fill-warning' : 'text-muted-foreground'}`} 
              fill={isFavorite ? "currentColor" : "none"} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Title with Tooltip */}
      <div className="flex items-start gap-2 mb-3">
        <h3 className="font-medium text-[15px] leading-snug flex-1 group-hover:text-primary transition">
          {title}
        </h3>
        <div className="relative">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(!showTooltip);
            }}
            className="text-muted-foreground hover:text-primary transition"
            aria-label="Why this market exists"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
          {showTooltip && (
            <div 
              role="tooltip" 
              aria-live="polite"
              className="absolute right-0 top-6 z-10 w-64 p-3 bg-background border border-card-border rounded-lg shadow-xl text-xs text-muted-foreground"
            >
              This market aggregates public belief to estimate real-world probabilities
            </div>
          )}
        </div>
      </div>

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

        {/* Resolution Source - Only for resolved markets */}
        {resolved && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Resolved via: <span className="font-medium text-foreground">{resolutionSource}</span></span>
          </div>
        )}

        {/* Market Disclaimer */}
        {!resolved && (
          <div className="text-xs text-muted-foreground italic">
            Probabilities update as new information emerges
          </div>
        )}
      </div>

      {/* Trade Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={(e) => handleBuyClick(e, "yes")}
          className="py-2.5 bg-primary-muted hover:bg-primary/20 active:bg-primary/30 border border-primary/50 text-primary rounded-xl font-medium transition"
        >
          Buy Yes
        </button>
        <button 
          onClick={(e) => handleBuyClick(e, "no")}
          className="py-2.5 bg-destructive-muted hover:bg-destructive/20 active:bg-destructive/30 border border-destructive/50 text-destructive rounded-xl font-medium transition"
        >
          Buy No
        </button>
      </div>

      {/* Buy Modal */}
      <BuyModal
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        direction={buyDirection}
        marketTitle={title}
        currentPercentage={yesPercentage}
        marketId={id}
      />
    </div>
  );
}
