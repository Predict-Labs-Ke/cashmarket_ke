"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import MobileNavigation from "@/components/MobileNavigation";

// Mock user data - in a real app, this would come from an API
const mockUserData = {
  name: "John Kamau",
  username: "@johnkamau",
  avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect fill='%2322c55e' width='160' height='160'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='64' fill='white'%3EJK%3C/text%3E%3C/svg%3E",
  accuracy: 87,
  rank: 32,
  totalUsers: 1284,
  joinedDate: "January 2025",
  verified: true,
  stats: {
    forecastsMade: 156,
    marketsParticipated: 73,
    accuracy: 87,
    longestStreak: 14
  },
  activeMarkets: [
    {
      id: 1,
      question: "Will Harambee Stars qualify for AFCON 2027?",
      status: "open",
      userForecast: "Yes",
      forecastProbability: 65,
      currentProbability: 58,
      movement24h: -7,
      category: "Sports"
    },
    {
      id: 2,
      question: "Will KES strengthen vs USD by Q2?",
      status: "open",
      userForecast: "No",
      forecastProbability: 38,
      currentProbability: 42,
      movement24h: 4,
      category: "Economy"
    },
    {
      id: 3,
      question: "Will M-Pesa hit 20B transactions?",
      status: "resolved",
      userForecast: "Yes",
      forecastProbability: 78,
      result: "Yes",
      outcome: "correct",
      category: "Tech"
    }
  ],
  badges: [
    { id: 1, name: "Top 10% Predictor", description: "Your forecasts outperform most participants", icon: "🏆", earned: true, color: "gold" },
    { id: 2, name: "Early Mover", description: "First to predict on 10+ markets", icon: "⚡", earned: true, color: "blue" },
    { id: 3, name: "Accuracy Master", description: "Maintain 85%+ accuracy over 50 forecasts", icon: "🎯", earned: true, color: "green" },
    { id: 4, name: "Consistency King", description: "Active 30 days in a row", icon: "📅", earned: false, color: "purple" },
    { id: 5, name: "Market Maven", description: "Participate in 100+ markets", icon: "💼", earned: false, color: "orange" },
    { id: 6, name: "Community Leader", description: "Reach top 5 on leaderboard", icon: "👑", earned: false, color: "red" }
  ]
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [flipCard, setFlipCard] = useState<number | null>(null);
  const [animatedStats, setAnimatedStats] = useState({
    forecastsMade: 0,
    marketsParticipated: 0,
    accuracy: 0,
    longestStreak: 0
  });
  const [percentileProgress, setPercentileProgress] = useState(0);

  // Animate stats on load
  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        forecastsMade: Math.floor(mockUserData.stats.forecastsMade * progress),
        marketsParticipated: Math.floor(mockUserData.stats.marketsParticipated * progress),
        accuracy: Math.floor(mockUserData.stats.accuracy * progress),
        longestStreak: Math.floor(mockUserData.stats.longestStreak * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(mockUserData.stats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Animate percentile progress
  useEffect(() => {
    const targetPercentile = ((mockUserData.totalUsers - mockUserData.rank) / mockUserData.totalUsers) * 100;
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setPercentileProgress(targetPercentile * progress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setPercentileProgress(targetPercentile);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const activeMarkets = mockUserData.activeMarkets.filter(m => m.status === "open");
  const pastMarkets = mockUserData.activeMarkets.filter(m => m.status === "resolved");

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
      <Navigation 
        currentPage="profile" 
        showPortfolioBalance={true}
        isLoggedIn={true}
        userName={mockUserData.name}
        userAvatar={mockUserData.avatar}
      />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
        {/* Hero/Identity Section */}
        <div className="bg-gradient-to-br from-card via-card to-card-hover border border-card-border rounded-3xl p-6 lg:p-8 mb-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-6">
            {/* Avatar with gradient halo */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light to-primary rounded-full blur-xl opacity-50 group-hover:opacity-70 transition"></div>
              <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-background shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                <Image src={mockUserData.avatar} alt={mockUserData.name} width={160} height={160} className="w-full h-full object-cover" />
              </div>
              {mockUserData.verified && (
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                  <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{mockUserData.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{mockUserData.username}</p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4">
                <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
                  <span className="text-primary font-bold text-lg">{mockUserData.accuracy}%</span>
                  <span className="text-muted-foreground text-sm ml-2">Accuracy</span>
                </div>
                <div className="px-4 py-2 bg-card border border-card-border rounded-full">
                  <span className="text-foreground font-semibold">Top Predictor</span>
                  <span className="ml-2">🏆</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Joined {mockUserData.joinedDate}
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard/Social Proof */}
        <div className="bg-card border border-card-border rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">Your Ranking</h3>
            <Link href="/leaderboard" className="text-primary text-sm hover:text-primary-light transition">
              View Leaderboard →
            </Link>
          </div>
          <p className="text-muted-foreground mb-4">
            You rank <span className="text-primary font-bold">#{mockUserData.rank}</span> of {mockUserData.totalUsers.toLocaleString()} forecasters this month
          </p>
          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-hover to-primary rounded-full transition-all duration-2000 ease-out"
              style={{ width: `${percentileProgress}%` }}
            >
              <div className="absolute right-0 top-0 h-full w-2 bg-primary-light animate-pulse"></div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-right">
            Top {(100 - percentileProgress).toFixed(1)}%
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-card-border rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">📊</span>
              <div className="w-1 h-12 bg-gradient-to-b from-primary to-primary-light rounded-full group-hover:h-16 transition-all"></div>
            </div>
            <div className="text-3xl font-bold text-primary mb-1">{animatedStats.forecastsMade}</div>
            <div className="text-sm text-muted-foreground">Forecasts Made</div>
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">🎯</span>
              <div className="w-1 h-12 bg-gradient-to-b from-info to-primary rounded-full group-hover:h-16 transition-all"></div>
            </div>
            <div className="text-3xl font-bold text-info mb-1">{animatedStats.marketsParticipated}</div>
            <div className="text-sm text-muted-foreground">Markets Participated</div>
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">✨</span>
              <div className="w-1 h-12 bg-gradient-to-b from-success to-primary-light rounded-full group-hover:h-16 transition-all"></div>
            </div>
            <div className="text-3xl font-bold text-success mb-1">{animatedStats.accuracy}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">🔥</span>
              <div className="w-1 h-12 bg-gradient-to-b from-warning to-primary rounded-full group-hover:h-16 transition-all"></div>
            </div>
            <div className="text-3xl font-bold text-warning mb-1">{animatedStats.longestStreak}</div>
            <div className="text-sm text-muted-foreground">Longest Streak</div>
          </div>
        </div>

        {/* Active/Past Markets */}
        <div className="bg-card border border-card-border rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Your Forecast Influence</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("active")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === "active"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-card-hover"
                }`}
              >
                Active ({activeMarkets.length})
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === "past"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-card-hover"
                }`}
              >
                Past ({pastMarkets.length})
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {(activeTab === "active" ? activeMarkets : pastMarkets).map((market) => (
              <div
                key={market.id}
                className="relative group perspective"
                style={{ perspective: "1000px" }}
              >
                <div
                  className={`relative transition-all duration-500 transform-style-3d ${
                    flipCard === market.id ? "rotate-y-180" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flipCard === market.id ? "rotateY(180deg)" : "rotateY(0deg)"
                  }}
                  onClick={() => setFlipCard(flipCard === market.id ? null : market.id)}
                >
                  {/* Front of card */}
                  <div
                    className="bg-card-hover border border-card-border rounded-xl p-4 cursor-pointer hover:border-primary/50 transition backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <span className="text-xs text-muted-foreground font-medium">{market.category}</span>
                        <h3 className="font-medium mt-1">{market.question}</h3>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          market.status === "open"
                            ? "bg-primary/10 text-primary"
                            : market.outcome === "correct"
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {market.status === "open" ? "Open" : market.outcome === "correct" ? "Won ✓" : "Lost ✗"}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-1.5 rounded-lg font-medium text-sm ${
                        market.userForecast === "Yes"
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-destructive/20 text-destructive border border-destructive/30"
                      }`}>
                        Your Forecast: {market.userForecast}
                      </div>
                      
                      {market.status === "open" && market.movement24h !== undefined && (
                        <div className={`flex items-center gap-1 text-sm ${
                          market.movement24h > 0 ? "text-success" : "text-destructive"
                        }`}>
                          {market.movement24h > 0 ? "↑" : "↓"} {Math.abs(market.movement24h)}% (24h)
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      Click to flip and see details
                    </p>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-card border border-primary/30 rounded-xl p-4 rotate-y-180 backface-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    <h4 className="font-semibold mb-4 text-center">Forecast Details</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Your Forecast:</span>
                        <span className="font-semibold">{market.userForecast} @ {market.forecastProbability}%</span>
                      </div>
                      
                      {market.status === "open" && market.currentProbability !== undefined && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Current Odds:</span>
                          <span className="font-semibold">{market.currentProbability}%</span>
                        </div>
                      )}
                      
                      {market.result && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Result:</span>
                          <span className={`font-semibold ${
                            market.outcome === "correct" ? "text-success" : "text-destructive"
                          }`}>
                            {market.result} {market.outcome === "correct" ? "✓" : "✗"}
                          </span>
                        </div>
                      )}

                      {/* Mini sparkline placeholder */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">Probability Trend</p>
                        <div className="h-12 bg-muted rounded-lg flex items-end gap-1 p-2">
                          {[45, 52, 48, 55, 60, 58, 62, 65, 63, 68, 70, 68].map((height, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-primary/50 rounded-sm"
                              style={{ height: `${height}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      Click to flip back
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements/Badges */}
        <div className="bg-card border border-card-border rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-6">Achievements & Badges</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockUserData.badges.map((badge) => (
              <div
                key={badge.id}
                className="group relative"
              >
                <div
                  className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-4 border-2 transition-all duration-300 cursor-pointer ${
                    badge.earned
                      ? "bg-gradient-to-br from-card-hover to-card border-primary/30 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
                      : "bg-muted/30 border-border opacity-40 hover:opacity-60 blur-[1px] hover:blur-none"
                  }`}
                  title={badge.description}
                >
                  {badge.earned && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                      <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <div className="text-xs text-center font-medium">{badge.name}</div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-background border border-card-border rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-10">
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    {!badge.earned && (
                      <p className="text-xs text-warning mt-1">🔒 Locked</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings/Quick Actions */}
        <div className="bg-card border border-card-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Settings & Quick Actions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Profile</h3>
              
              <button className="w-full flex items-center justify-between p-4 bg-muted hover:bg-card-hover rounded-xl transition group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <span className="font-medium">Edit Profile</span>
                </div>
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-muted hover:bg-card-hover rounded-xl transition group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center text-info">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <span className="font-medium">Notification Preferences</span>
                </div>
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Security Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Security</h3>
              
              <button className="w-full flex items-center justify-between p-4 bg-muted hover:bg-card-hover rounded-xl transition group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center text-warning">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="font-medium">Change Password</span>
                </div>
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center text-success">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-medium">Two-Factor Auth</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Collapsible Forecast History */}
          <details className="mt-6 group">
            <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-muted hover:bg-card-hover rounded-xl transition">
              <span className="font-medium">Forecast History</span>
              <svg className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            
            <div className="mt-4 p-4 bg-background rounded-xl">
              <p className="text-sm text-muted-foreground mb-4">Your complete forecast history and performance analytics.</p>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition">
                View Full History
              </button>
            </div>
          </details>
        </div>
      </main>

      <MobileNavigation currentPage="profile" />

      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
