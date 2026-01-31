"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import MobileNavigation from "@/components/MobileNavigation";

// Sample accuracy data
const accuracyStats = {
  totalMarkets: 45,
  correctPredictions: 32,
  accuracy: 71,
  averageBrierScore: 0.18,
  rank: 127,
  totalTraders: 8234,
};

const recentPredictions = [
  {
    id: 1,
    title: "Will Harambee Stars qualify for AFCON 2027?",
    yourPrediction: 35,
    finalOutcome: "No",
    wasCorrect: true,
    brierScore: 0.12,
    resolvedDate: "Nov 15, 2026",
  },
  {
    id: 2,
    title: "Will M-Pesa hit 20B transactions in 2025?",
    yourPrediction: 78,
    finalOutcome: "Yes",
    wasCorrect: true,
    brierScore: 0.05,
    resolvedDate: "Dec 31, 2025",
  },
  {
    id: 3,
    title: "Will Kenya Shilling strengthen vs USD in Q4 2025?",
    yourPrediction: 42,
    finalOutcome: "No",
    wasCorrect: true,
    brierScore: 0.18,
    resolvedDate: "Dec 31, 2025",
  },
  {
    id: 4,
    title: "Will Nairobi host Africa Tech Summit 2025?",
    yourPrediction: 65,
    finalOutcome: "No",
    wasCorrect: false,
    brierScore: 0.42,
    resolvedDate: "Oct 15, 2025",
  },
];

const categoryAccuracy = [
  { category: "Sports", total: 12, correct: 9, accuracy: 75 },
  { category: "Economy", total: 15, correct: 11, accuracy: 73 },
  { category: "Tech", total: 8, correct: 6, accuracy: 75 },
  { category: "Politics", total: 10, correct: 6, accuracy: 60 },
];

export default function AccuracyPage() {
  const [timeFilter, setTimeFilter] = useState("all");

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
      {/* Header with Navigation */}
      <Navigation showPortfolioBalance={true} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-24 lg:pb-8">
        {/* Page Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h1 className="text-3xl font-bold">Prediction Accuracy</h1>
          </div>
          <p className="text-muted-foreground">
            Track your forecasting performance across all markets
          </p>
        </div>

        {/* Time Filter */}
        <div className="mb-6 flex gap-2 overflow-x-auto scrollbar-hide">
          {["all", "30d", "90d", "1y"].map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                timeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-card-hover border border-card-border"
              }`}
            >
              {filter === "all" ? "All Time" : filter === "30d" ? "Last 30 Days" : filter === "90d" ? "Last 90 Days" : "Last Year"}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-card-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Overall Accuracy</span>
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-primary mb-1">{accuracyStats.accuracy}%</div>
            <div className="text-xs text-muted-foreground">
              {accuracyStats.correctPredictions} of {accuracyStats.totalMarkets} markets
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Brier Score</span>
              <svg className="w-5 h-5 text-info" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-info mb-1">{accuracyStats.averageBrierScore.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Lower is better (0.00 - 1.00)</div>
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Markets Traded</span>
              <svg className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-warning mb-1">{accuracyStats.totalMarkets}</div>
            <div className="text-xs text-muted-foreground">Total resolved markets</div>
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Leaderboard Rank</span>
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-success mb-1">#{accuracyStats.rank}</div>
            <div className="text-xs text-muted-foreground">of {accuracyStats.totalTraders.toLocaleString()} traders</div>
          </div>
        </div>

        {/* About Brier Score */}
        <div className="bg-info/10 border border-info/30 rounded-2xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-info flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h3 className="font-semibold text-info mb-1">What is a Brier Score?</h3>
              <p className="text-sm text-muted-foreground">
                The Brier Score measures forecast accuracy. A score of 0.00 is perfect, while 1.00 is the worst. 
                It rewards confident correct predictions and penalizes confident wrong predictions. 
                Your score of <span className="font-semibold text-foreground">{accuracyStats.averageBrierScore.toFixed(2)}</span> indicates strong forecasting ability.
              </p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Accuracy by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryAccuracy.map((cat) => (
              <div key={cat.category} className="bg-card border border-card-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{cat.category}</span>
                  <span className="text-2xl font-bold text-primary">{cat.accuracy}%</span>
                </div>
                <div className="mb-2">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-hover to-primary rounded-full"
                      style={{ width: `${cat.accuracy}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {cat.correct} correct out of {cat.total} markets
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Predictions */}
        <section>
          <h2 className="text-xl font-bold mb-4">Recent Resolved Markets</h2>
          <div className="space-y-3">
            {recentPredictions.map((pred) => (
              <div
                key={pred.id}
                className="bg-card border border-card-border rounded-2xl p-5 hover:bg-card-hover transition"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-medium flex-1">{pred.title}</h3>
                  <div className="flex items-center gap-2">
                    {pred.wasCorrect ? (
                      <span className="px-3 py-1 bg-success/10 text-success border border-success/30 rounded-full text-xs font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Correct
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-destructive/10 text-destructive border border-destructive/30 rounded-full text-xs font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        Incorrect
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Your Prediction</span>
                    <div className="font-semibold text-primary">{pred.yourPrediction}% Yes</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Outcome</span>
                    <div className="font-semibold">{pred.finalOutcome}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Brier Score</span>
                    <div className="font-semibold">{pred.brierScore.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Resolved</span>
                    <div className="font-semibold">{pred.resolvedDate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="mt-8 bg-gradient-to-br from-primary/5 to-info/5 border border-primary/20 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Tips to Improve Your Accuracy
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Research thoroughly before making predictions - use reliable sources and data</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Update your positions as new information becomes available</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Avoid overconfidence - calibrate your predictions to reflect true uncertainty</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Focus on categories where you have expertise or strong knowledge</span>
            </li>
          </ul>
        </section>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation currentPage="accuracy" />
    </div>
  );
}
