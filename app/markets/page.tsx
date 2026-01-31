"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import MarketCard from "@/components/MarketCard";
import MobileNavigation from "@/components/MobileNavigation";

// Sample prediction markets data with enhanced fields
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
  {
    id: 13,
    title: "Will Safaricom 5G coverage reach 50% of urban areas by 2027?",
    category: "Tech",
    yesPercentage: 73,
    volume: "KES 1.5M",
    endDate: "Dec 31, 2027",
    trending: false,
    resolutionSource: "Safaricom Reports",
    movement24h: 2,
  },
  {
    id: 14,
    title: "Will Kenya host a Formula E race in 2026?",
    category: "Sports",
    yesPercentage: 18,
    volume: "KES 890K",
    endDate: "Dec 31, 2026",
    trending: false,
    resolutionSource: "FIA Official Announcements",
    movement24h: -1,
  },
  {
    id: 15,
    title: "Will Nairobi-Mombasa highway toll fees be implemented?",
    category: "Infrastructure",
    yesPercentage: 65,
    volume: "KES 2.1M",
    endDate: "Jun 30, 2026",
    trending: true,
    resolutionSource: "KeNHA Official Statements",
    movement24h: 3,
  },
  {
    id: 16,
    title: "Will inflation rate drop below 5% in 2026?",
    category: "Economy",
    yesPercentage: 38,
    volume: "KES 1.8M",
    endDate: "Dec 31, 2026",
    trending: false,
    resolutionSource: "Kenya National Bureau of Statistics",
    movement24h: -2,
  },
  {
    id: 17,
    title: "Will Nairobi expressway phase 2 be completed by 2027?",
    category: "Infrastructure",
    yesPercentage: 52,
    volume: "KES 3.5M",
    endDate: "Dec 31, 2027",
    trending: false,
    resolutionSource: "Kenya Urban Roads Authority",
    movement24h: 1,
  },
  {
    id: 18,
    title: "Will AFC Leopards win KPL in 2026?",
    category: "Sports",
    yesPercentage: 24,
    volume: "KES 2.3M",
    endDate: "Nov 30, 2026",
    trending: false,
    resolutionSource: "Football Kenya Federation",
    movement24h: -1,
  },
  {
    id: 19,
    title: "Will Kenya launch a domestic satellite by 2027?",
    category: "Tech",
    yesPercentage: 41,
    volume: "KES 950K",
    endDate: "Dec 31, 2027",
    trending: false,
    resolutionSource: "Kenya Space Agency",
    movement24h: 2,
  },
  {
    id: 20,
    title: "Will Madaraka Express add a new route in 2026?",
    category: "Infrastructure",
    yesPercentage: 58,
    volume: "KES 1.4M",
    endDate: "Dec 31, 2026",
    trending: false,
    resolutionSource: "Kenya Railways",
    movement24h: 0,
  },
  {
    id: 21,
    title: "Will coffee production exceed 100,000 metric tons in 2026?",
    category: "Economy",
    yesPercentage: 47,
    volume: "KES 720K",
    endDate: "Dec 31, 2026",
    trending: false,
    resolutionSource: "Coffee Directorate of Kenya",
    movement24h: 1,
  },
  {
    id: 22,
    title: "Will Lake Nakuru water levels rise by 10% in 2026?",
    category: "Environment",
    yesPercentage: 62,
    volume: "KES 480K",
    endDate: "Dec 31, 2026",
    trending: false,
    resolutionSource: "Kenya Wildlife Service",
    movement24h: -2,
  },
  {
    id: 23,
    title: "Will Tusker FC qualify for CAF Champions League 2027?",
    category: "Sports",
    yesPercentage: 56,
    volume: "KES 1.9M",
    endDate: "Dec 31, 2026",
    trending: true,
    resolutionSource: "CAF Official Results",
    movement24h: 3,
  },
  {
    id: 24,
    title: "Will Konza Technopolis attract 10+ tech companies by 2027?",
    category: "Tech",
    yesPercentage: 68,
    volume: "KES 1.1M",
    endDate: "Dec 31, 2027",
    trending: false,
    resolutionSource: "Konza Technopolis Authority",
    movement24h: 2,
  },
  {
    id: 25,
    title: "Will tea exports exceed KES 150B in 2026?",
    category: "Economy",
    yesPercentage: 51,
    volume: "KES 1.3M",
    endDate: "Dec 31, 2026",
    trending: false,
    resolutionSource: "Tea Board of Kenya",
    movement24h: 0,
  },
  {
    id: 26,
    title: "Will Lamu Port receive its first commercial shipment in 2026?",
    category: "Infrastructure",
    yesPercentage: 72,
    volume: "KES 2.8M",
    endDate: "Dec 31, 2026",
    trending: true,
    resolutionSource: "Lamu Port-South Sudan-Ethiopia Transport",
    movement24h: 4,
  },
  {
    id: 27,
    title: "Will renewable energy contribute 80% of power by 2027?",
    category: "Environment",
    yesPercentage: 45,
    volume: "KES 890K",
    endDate: "Dec 31, 2027",
    trending: false,
    resolutionSource: "Ministry of Energy",
    movement24h: 1,
  },
  {
    id: 28,
    title: "Will drought conditions affect Turkana in Q3 2026?",
    category: "Weather",
    yesPercentage: 67,
    volume: "KES 540K",
    endDate: "Sep 30, 2026",
    trending: false,
    resolutionSource: "Kenya Meteorological Department",
    movement24h: -3,
  },
  {
    id: 29,
    title: "Will Nairobi Securities Exchange index hit 3000 points in 2026?",
    category: "Economy",
    yesPercentage: 34,
    volume: "KES 2.5M",
    endDate: "Dec 31, 2026",
    trending: false,
    resolutionSource: "Nairobi Securities Exchange",
    movement24h: -1,
  },
  {
    id: 30,
    title: "Will Kenya Rugby 7s qualify for Olympics 2028?",
    category: "Sports",
    yesPercentage: 76,
    volume: "KES 3.2M",
    endDate: "Dec 31, 2027",
    trending: true,
    resolutionSource: "World Rugby",
    movement24h: 5,
  },
];

const categories = [
  "All",
  "Economy",
  "Sports",
  "Tech",
  "Events",
  "Environment",
  "Infrastructure",
  "Weather"
];

export default function MarketsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("24h Volume");
  const [frequency, setFrequency] = useState("All");
  const [status, setStatus] = useState("Active");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const hasActiveFilters = sortBy !== "24h Volume" || frequency !== "All" || status !== "Active" || selectedCategories.length > 0;

  const handleClearFilters = () => {
    setSortBy("24h Volume");
    setFrequency("All");
    setStatus("Active");
    setSelectedCategories([]);
  };

  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredMarkets = predictionMarkets.filter((market) => {
    const matchesCategory = selectedCategory === "All" || market.category === selectedCategory;
    const matchesSearch = market.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategoryFilter = selectedCategories.length === 0 || selectedCategories.includes(market.category);
    // Since we don't have a resolved field in the data, treat all markets as active for now
    // In production, this would check market.resolved or market.status
    const matchesStatus = true; // All current sample markets are active
    return matchesCategory && matchesSearch && matchesCategoryFilter && matchesStatus;
  });

  const trendingMarkets = predictionMarkets.filter((m) => m.trending);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
      {/* Header with Navigation */}
      <Navigation currentPage="markets" showPortfolioBalance={true} />

      {/* Search and Filter Section */}
      <div className="sticky top-[57px] z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
          {/* Search Bar with Filter Icon */}
          <div className="mb-3">
            <div className="relative max-w-md flex gap-2">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-input border border-input-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2.5 rounded-xl border transition ${
                  showFilters || hasActiveFilters
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-card-border hover:bg-card-hover"
                }`}
                aria-label="Toggle filters"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Filters Panel with Animation */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showFilters ? "max-h-96 opacity-100 mb-3" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-card border border-card-border rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-input-border rounded-lg text-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                  >
                    <option>24h Volume</option>
                    <option>Newest</option>
                    <option>Ending Soon</option>
                    <option>Total Volume</option>
                  </select>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-sm font-medium mb-2">Frequency</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-input-border rounded-lg text-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                  >
                    <option>All</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-input-border rounded-lg text-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                  >
                    <option>Active</option>
                    <option>Resolved</option>
                  </select>
                </div>

                {/* Clear Filters Button */}
                <div className="flex items-end">
                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      className="w-full px-4 py-2 bg-destructive-muted text-destructive border border-destructive/50 rounded-lg font-medium hover:bg-destructive/20 transition"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Categories Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Filter by Categories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.filter(c => c !== "All").map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        selectedCategories.includes(cat)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-card-hover border border-border"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-card-hover border border-card-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-4 pb-24 lg:pb-8">
        {/* Trending Section */}
        {selectedCategory === "All" && searchQuery === "" && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              <h2 className="font-semibold text-lg">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {trendingMarkets.map((market) => (
                <div
                  key={market.id}
                  className="bg-gradient-to-br from-warning/10 to-card border border-warning/20 rounded-2xl p-4 hover:border-warning/40 transition cursor-pointer"
                >
                  <span className="text-xs text-warning font-medium">{market.category}</span>
                  <h3 className="text-sm font-medium mt-1 line-clamp-2">{market.title}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-primary font-semibold">{market.yesPercentage}% Yes</span>
                    <span className="text-xs text-muted-foreground">{market.volume}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Markets List */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-lg">
              {selectedCategory === "All" ? "All Markets" : selectedCategory}
            </h2>
            <span className="text-sm text-muted-foreground">{filteredMarkets.length} markets</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
            {filteredMarkets.map((market) => (
              <MarketCard
                key={market.id}
                {...market}
              />
            ))}
          </div>

          {filteredMarkets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No markets found</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-2 text-primary text-sm hover:text-primary-light transition"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation currentPage="home" />
    </div>
  );
}
