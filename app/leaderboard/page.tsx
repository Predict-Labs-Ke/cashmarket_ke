"use client";

import Link from "next/link";

// Dummy data for top 12 users with highest floating PNL
const leaderboardData = [
  { rank: 1, username: "KipchogeFan", floatingPnl: 245800 },
  { rank: 2, username: "NairobiTrader", floatingPnl: 198500 },
  { rank: 3, username: "SafariPredictor", floatingPnl: 176300 },
  { rank: 4, username: "MountKenya", floatingPnl: 145900 },
  { rank: 5, username: "MombasaMarkets", floatingPnl: 132400 },
  { rank: 6, username: "TuskerPro", floatingPnl: 118700 },
  { rank: 7, username: "KisumuKing", floatingPnl: 95600 },
  { rank: 8, username: "RiftValleyVic", floatingPnl: 87200 },
  { rank: 9, username: "HarambeeBets", floatingPnl: 74500 },
  { rank: 10, username: "SGRSpeculator", floatingPnl: 63800 },
  { rank: 11, username: "MaasaiMara", floatingPnl: 52100 },
  { rank: 12, username: "LakeVictoria", floatingPnl: 48900 },
];

// Format currency in KES
const formatCurrency = (amount: number) => {
  return `KES ${amount.toLocaleString()}`;
};

// Get medal emoji for top 3
const getMedal = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center font-bold text-sm text-primary-foreground">
                C
              </div>
              <span className="font-bold text-lg">
                Cash<span className="text-primary">Market</span>
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/about"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About
              </Link>
              <Link
                href="/markets"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Markets
              </Link>
              <Link
                href="/"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <Link
                href="/"
                className="md:hidden p-2 text-muted-foreground hover:text-foreground transition"
                aria-label="Close and return to home"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-24 lg:pb-8">
        {/* Page Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6 text-warning" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h1 className="text-3xl font-bold">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground">
            Top traders by floating PNL (unrealized profits)
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Rank
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Username
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-right text-sm font-semibold text-foreground">
                    Floating PNL
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user) => {
                  const medal = getMedal(user.rank);
                  const isTopThree = user.rank <= 3;
                  
                  return (
                    <tr
                      key={user.rank}
                      className={`border-b border-border last:border-b-0 transition ${
                        isTopThree
                          ? "bg-primary-muted/50 hover:bg-primary-muted"
                          : "hover:bg-card-hover"
                      }`}
                    >
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-2">
                          {medal && <span className="text-xl">{medal}</span>}
                          <span className={`text-sm font-semibold ${isTopThree ? "text-primary" : "text-foreground"}`}>
                            #{user.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <span className={`font-medium ${isTopThree ? "text-foreground" : "text-foreground-secondary"}`}>
                          {user.username}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-right">
                        <span className="font-semibold text-primary">
                          {formatCurrency(user.floatingPnl)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-card border border-card-border rounded-2xl p-4 lg:p-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-info flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-medium mb-1">What is Floating PNL?</h3>
              <p className="text-sm text-muted-foreground">
                Floating PNL (Profit and Loss) represents unrealized gains from open positions. 
                It reflects the current value of active trades and can change as market prices fluctuate.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border px-6 py-3 safe-area-pb">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <Link href="/markets" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-xs">Markets</span>
          </Link>
          <Link href="/leaderboard" className="flex flex-col items-center gap-1 text-primary">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium">Leaderboard</span>
          </Link>
          <Link href="/breaking" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-xs">Breaking</span>
          </Link>
          <Link href="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
