"use client";

import Navigation from "@/components/Navigation";
import MobileNavigation from "@/components/MobileNavigation";

// Sample data for markets with most movement in last 24h
// In a real application, this would be fetched from an API
const breakingMarkets = [
  {
    id: 1,
    question: "Will Kenya Shilling strengthen against USD by Q2 2026?",
    category: "Economy",
    currentProbability: 42,
    change24h: 12.5, // positive movement
  },
  {
    id: 2,
    question: "Will Harambee Stars qualify for AFCON 2027?",
    category: "Sports",
    currentProbability: 35,
    change24h: -8.3, // negative movement
  },
  {
    id: 3,
    question: "Will M-Pesa transaction volume exceed 20B in 2026?",
    category: "Tech",
    currentProbability: 78,
    change24h: 15.2,
  },
  {
    id: 4,
    question: "Will Nairobi host the 2027 Africa Tech Summit?",
    category: "Events",
    currentProbability: 67,
    change24h: -5.7,
  },
  {
    id: 5,
    question: "Will Kenya achieve 70% renewable energy by 2026?",
    category: "Environment",
    currentProbability: 54,
    change24h: 9.8,
  },
  {
    id: 6,
    question: "Will SGR expand to Kisumu by end of 2027?",
    category: "Infrastructure",
    currentProbability: 28,
    change24h: -11.2,
  },
  {
    id: 7,
    question: "Will Kenya's GDP growth exceed 6% in 2026?",
    category: "Economy",
    currentProbability: 45,
    change24h: 7.4,
  },
  {
    id: 8,
    question: "Will Gor Mahia win the KPL 2026 season?",
    category: "Sports",
    currentProbability: 62,
    change24h: -6.1,
  },
  {
    id: 9,
    question: "Will temperatures in Mombasa exceed 35°C in February 2026?",
    category: "Weather",
    currentProbability: 71,
    change24h: 18.5,
  },
  {
    id: 10,
    question: "Will Mount Kenya receive snowfall in July 2026?",
    category: "Weather",
    currentProbability: 82,
    change24h: 13.9,
  },
];

// Sort by absolute value of change (most movement first)
const sortedMarkets = [...breakingMarkets].sort(
  (a, b) => Math.abs(b.change24h) - Math.abs(a.change24h)
);

export default function BreakingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
      {/* Header */}
      <Navigation currentPage="breaking" showPortfolioBalance={true} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-24 lg:pb-8">
        {/* Page Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h1 className="text-3xl font-bold">Breaking</h1>
          </div>
          <p className="text-muted-foreground">
            Markets with the most movement in the last 24 hours
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-card border border-card-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground w-20">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Market Question
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground w-32">
                    Category
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground w-32">
                    Probability
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground w-32">
                    24h Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedMarkets.map((market, index) => {
                  const isPositive = market.change24h > 0;
                  
                  return (
                    <tr
                      key={market.id}
                      className="border-b border-border last:border-b-0 hover:bg-card-hover transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                          <span className="text-sm font-semibold text-foreground">
                            {index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-foreground">
                          {market.question}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                          {market.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-lg font-semibold text-primary">
                          {market.currentProbability}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1">
                          {isPositive ? (
                            <>
                              <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                              </svg>
                              <span className="text-lg font-semibold text-success">
                                {Math.abs(market.change24h).toFixed(1)}%
                              </span>
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                              </svg>
                              <span className="text-lg font-semibold text-destructive">
                                {Math.abs(market.change24h).toFixed(1)}%
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {sortedMarkets.map((market, index) => {
            const isPositive = market.change24h > 0;
            
            return (
              <div
                key={market.id}
                className="bg-card border border-card-border rounded-2xl p-4 hover:bg-card-hover transition"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted flex-shrink-0">
                    <span className="text-sm font-semibold text-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground mb-1">
                      {market.category}
                    </span>
                    <h3 className="font-medium text-foreground text-sm leading-snug">
                      {market.question}
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">Probability</div>
                    <div className="text-lg font-semibold text-primary">
                      {market.currentProbability}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">24h Change</div>
                    <div className="flex items-center justify-center gap-1">
                      {isPositive ? (
                        <>
                          <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          <span className="text-lg font-semibold text-success">
                            {Math.abs(market.change24h).toFixed(1)}%
                          </span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                          <span className="text-lg font-semibold text-destructive">
                            {Math.abs(market.change24h).toFixed(1)}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-card border border-card-border rounded-2xl p-4 lg:p-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-info flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-medium mb-1">What does this show?</h3>
              <p className="text-sm text-muted-foreground">
                This page displays markets ranked by their probability movement over the last 24 hours. 
                Large movements indicate significant changes in market sentiment and can highlight emerging trends or breaking news.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation currentPage="breaking" />
    </div>
  );
}
