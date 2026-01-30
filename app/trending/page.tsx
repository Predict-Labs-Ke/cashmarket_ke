"use client";

import Navigation from "@/components/Navigation";
import MarketCard from "@/components/MarketCard";
import MobileNavigation from "@/components/MobileNavigation";

// Sample trending markets data
const trendingMarkets = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
    title: "Will Kenya experience El Niño conditions in 2026?",
    category: "Weather",
    yesPercentage: 44,
    volume: "KES 580K",
    endDate: "Dec 31, 2026",
    trending: true,
    resolutionSource: "Kenya Meteorological Department",
    movement24h: -5,
  },
];

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
      <Navigation currentPage="trending" showPortfolioBalance={true} />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-24 lg:pb-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-8 h-8 text-warning" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            <h1 className="text-3xl font-bold">Trending Markets</h1>
          </div>
          <p className="text-muted-foreground">
            The most active and popular prediction markets right now
          </p>
        </div>

        {/* Trending Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {trendingMarkets.map((market) => (
            <MarketCard key={market.id} {...market} />
          ))}
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation currentPage="home" />
    </div>
  );
}
