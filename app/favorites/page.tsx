"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import MarketCard from "@/components/MarketCard";
import MobileNavigation from "@/components/MobileNavigation";

// Sample prediction markets data - same as markets page
const predictionMarkets = [
  {
    id: 1,
    title: "Will Kenya Shilling strengthen against USD by Q2 2026?",
    category: "Economy",
    yesPercentage: 42,
    volume: "KES 2.4M",
    endDate: "Apr 30, 2026",
    trending: true,
    resolutionSource: "Central Bank of Kenya",
    movement24h: -2,
  },
  {
    id: 2,
    title: "Will Nairobi host the 2027 Africa Tech Summit?",
    category: "Events",
    yesPercentage: 67,
    volume: "KES 890K",
    endDate: "Dec 31, 2026",
    trending: true,
    resolutionSource: "Official event organizers",
    movement24h: 5,
  },
  {
    id: 3,
    title: "Will M-Pesa transaction volume exceed 20B in 2026?",
    category: "Tech",
    yesPercentage: 78,
    volume: "KES 1.8M",
    endDate: "Dec 31, 2026",
    trending: false,
    resolutionSource: "Safaricom Annual Report",
    movement24h: 3,
  },
  {
    id: 4,
    title: "Will Harambee Stars qualify for AFCON 2027?",
    category: "Sports",
    yesPercentage: 35,
    volume: "KES 5.2M",
    endDate: "Nov 15, 2026",
    trending: true,
    resolutionSource: "CAF Official Results",
    movement24h: -1,
  },
  {
    id: 5,
    title: "Will Kenya achieve 70% renewable energy by 2026?",
    category: "Environment",
    yesPercentage: 54,
    volume: "KES 620K",
    endDate: "Dec 31, 2026",
    trending: false,
    resolutionSource: "Ministry of Energy",
    movement24h: 0,
  },
  {
    id: 6,
    title: "Will SGR expand to Kisumu by end of 2027?",
    category: "Infrastructure",
    yesPercentage: 28,
    volume: "KES 3.1M",
    endDate: "Dec 31, 2027",
    trending: false,
    resolutionSource: "Kenya Railways",
    movement24h: 2,
  },
  {
    id: 7,
    title: "Will Kenya's GDP growth exceed 6% in 2026?",
    category: "Economy",
    yesPercentage: 45,
    volume: "KES 1.2M",
    endDate: "Dec 31, 2026",
    trending: false,
    resolutionSource: "Kenya National Bureau of Statistics",
    movement24h: 1,
  },
  {
    id: 8,
    title: "Will Gor Mahia win the KPL 2026 season?",
    category: "Sports",
    yesPercentage: 62,
    volume: "KES 4.8M",
    endDate: "Nov 30, 2026",
    trending: true,
    resolutionSource: "Football Kenya Federation",
    movement24h: 4,
  },
  {
    id: 9,
    title: "Will Nairobi receive above-average rainfall in March 2026?",
    category: "Weather",
    yesPercentage: 58,
    volume: "KES 420K",
    endDate: "Mar 31, 2026",
    trending: false,
    resolutionSource: "Kenya Meteorological Department",
    movement24h: -3,
  },
  {
    id: 10,
    title: "Will temperatures in Mombasa exceed 35°C in February 2026?",
    category: "Weather",
    yesPercentage: 71,
    volume: "KES 310K",
    endDate: "Feb 28, 2026",
    trending: false,
    resolutionSource: "Kenya Meteorological Department",
    movement24h: 0,
  },
  {
    id: 11,
    title: "Will Kenya experience El Niño conditions in 2026?",
    category: "Weather",
    yesPercentage: 44,
    volume: "KES 580K",
    endDate: "Dec 31, 2026",
    trending: true,
    resolutionSource: "Kenya Meteorological Department",
    movement24h: -5,
  },
  {
    id: 12,
    title: "Will Mount Kenya receive snowfall in July 2026?",
    category: "Weather",
    yesPercentage: 82,
    volume: "KES 275K",
    endDate: "Jul 31, 2026",
    trending: false,
    resolutionSource: "Kenya Wildlife Service",
    movement24h: 0,
  },
];

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted and load favorites
    const loadFavorites = () => {
      setMounted(true);
      try {
        const favorites = JSON.parse(localStorage.getItem("favoriteMarkets") || "[]");
        setFavoriteIds(favorites);
      } catch {
        setFavoriteIds([]);
      }
    };
    
    loadFavorites();

    // Listen for storage changes to update favorites in real-time
    const handleStorageChange = () => {
      try {
        const favorites = JSON.parse(localStorage.getItem("favoriteMarkets") || "[]");
        setFavoriteIds(favorites);
      } catch {
        setFavoriteIds([]);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom event for same-tab updates
    window.addEventListener("favoritesChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoritesChanged", handleStorageChange);
    };
  }, []);

  // Filter markets to show only favorites
  const favoriteMarkets = predictionMarkets.filter((market) =>
    favoriteIds.includes(market.id)
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
        <Navigation showPortfolioBalance={true} />
        <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-4"></div>
            <div className="h-4 bg-muted rounded w-64 mb-6"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
      {/* Header with Navigation */}
      <Navigation showPortfolioBalance={true} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-24 lg:pb-8">
        {/* Page Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6 text-warning fill-warning" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <h1 className="text-3xl font-bold">Favorite Markets</h1>
          </div>
          <p className="text-muted-foreground">
            Markets you&apos;ve starred for quick access
          </p>
        </div>

        {/* Markets List */}
        {favoriteMarkets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
            {favoriteMarkets.map((market) => (
              <MarketCard
                key={market.id}
                {...market}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <h3 className="text-lg font-medium mb-2">No favorite markets yet</h3>
            <p className="text-muted-foreground mb-4">
              Start adding markets to your favorites by clicking the star icon on any market card
            </p>
            <Link
              href="/markets"
              className="inline-block px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition"
            >
              Browse Markets
            </Link>
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation currentPage="home" />
    </div>
  );
}
