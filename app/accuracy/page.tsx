"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import MobileNavigation from "@/components/MobileNavigation";

// Platform-wide accuracy data before resolution
const accuracyBeforeResolution = [
  { interval: "4 Hrs", accuracy: 89, markets: 156 },
  { interval: "12 Hrs", accuracy: 84, markets: 168 },
  { interval: "1 Day", accuracy: 79, markets: 182 },
  { interval: "1 Week", accuracy: 72, markets: 195 },
  { interval: "1 Month", accuracy: 68, markets: 203 },
];

// Expected vs Actual data - probability buckets
const expectedVsActual = [
  { range: "0-10%", expected: 5, actual: 8, count: 45 },
  { range: "10-20%", expected: 15, actual: 18, count: 38 },
  { range: "20-30%", expected: 25, actual: 24, count: 42 },
  { range: "30-40%", expected: 35, actual: 32, count: 51 },
  { range: "40-50%", expected: 45, actual: 46, count: 48 },
  { range: "50-60%", expected: 55, actual: 58, count: 52 },
  { range: "60-70%", expected: 65, actual: 68, count: 47 },
  { range: "70-80%", expected: 75, actual: 76, count: 44 },
  { range: "80-90%", expected: 85, actual: 82, count: 39 },
  { range: "90-100%", expected: 95, actual: 92, count: 34 },
];

// Resolution composition data
const resolutionData = {
  yes: 42,
  no: 58,
  totalMarkets: 203,
};

// Brier score data by volume brackets
const brierScoreData = [
  { volumeRange: "< KES 10K", brierScore: 0.24, markets: 45 },
  { volumeRange: "KES 10K - 50K", brierScore: 0.19, markets: 68 },
  { volumeRange: "KES 50K - 100K", brierScore: 0.16, markets: 52 },
  { volumeRange: "KES 100K - 500K", brierScore: 0.13, markets: 28 },
  { volumeRange: "> KES 500K", brierScore: 0.11, markets: 10 },
];

export default function AccuracyPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "faq">("overview");

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
            <h1 className="text-3xl font-bold">Platform Accuracy</h1>
          </div>
          <p className="text-muted-foreground">
            How accurate are CashMarket predictions? Explore our platform's forecasting performance.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 text-sm font-medium transition relative ${
              activeTab === "overview"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Overview
            {activeTab === "overview" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`px-4 py-3 text-sm font-medium transition relative ${
              activeTab === "faq"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            FAQ
            {activeTab === "faq" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {activeTab === "overview" ? (
          <>
            {/* Section 1: Accuracy Prior to Resolution */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Accuracy Prior to Resolution</h2>
              <p className="text-muted-foreground mb-4">
                Market probabilities become more accurate as resolution approaches. Here's how accurate 
                the final leading outcome was at various time intervals before resolution.
              </p>
              
              <div className="bg-card border border-card-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted border-b border-border">
                        <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Time Before Resolution
                        </th>
                        <th className="px-4 lg:px-6 py-4 text-right text-sm font-semibold text-foreground">
                          Accuracy
                        </th>
                        <th className="px-4 lg:px-6 py-4 text-right text-sm font-semibold text-foreground">
                          Markets
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {accuracyBeforeResolution.map((item, idx) => (
                        <tr
                          key={item.interval}
                          className="border-b border-border last:border-b-0 hover:bg-card-hover transition"
                        >
                          <td className="px-4 lg:px-6 py-4">
                            <span className="font-medium">{item.interval}</span>
                          </td>
                          <td className="px-4 lg:px-6 py-4 text-right">
                            <span className="text-2xl font-bold text-primary">{item.accuracy}%</span>
                          </td>
                          <td className="px-4 lg:px-6 py-4 text-right">
                            <span className="text-muted-foreground">{item.markets} markets</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 2: Expected vs Actual */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Expected vs Actual</h2>
              <p className="text-muted-foreground mb-4">
                How well do market forecasts align with actual outcomes? This chart shows accuracy 
                across all probability ranges, comparing expected probabilities to actual resolution rates.
              </p>
              
              <div className="bg-card border border-card-border rounded-2xl p-6">
                <div className="space-y-3">
                  {expectedVsActual.map((item) => {
                    const difference = Math.abs(item.actual - item.expected);
                    const isAccurate = difference <= 5; // Within 5% is considered accurate
                    
                    return (
                      <div key={item.range} className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="w-24 font-medium">{item.range}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden relative">
                              <div
                                className="h-full bg-primary/30 absolute"
                                style={{ width: `${item.expected}%` }}
                              />
                              <div
                                className="h-full bg-primary absolute opacity-60"
                                style={{ width: `${item.actual}%` }}
                              />
                            </div>
                            {isAccurate && (
                              <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground flex gap-4">
                            <span>Expected: {item.expected}%</span>
                            <span>Actual: {item.actual}%</span>
                            <span className="ml-auto">{item.count} markets</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary/30 rounded" />
                      <span className="text-muted-foreground">Expected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary opacity-60 rounded" />
                      <span className="text-muted-foreground">Actual</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Brier Score vs Volume */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Brier Score vs Volume</h2>
              <p className="text-muted-foreground mb-4">
                <span className="font-semibold text-foreground">Lower is better.</span> Brier scores show 
                how accurate predictions really are — not just if they were correct, but how close the 
                prediction was to being right. Markets with higher trading volume tend to have more accurate 
                predictions and lower Brier scores.
              </p>
              
              <div className="bg-card border border-card-border rounded-2xl p-6">
                <div className="space-y-4">
                  {brierScoreData.map((item, idx) => {
                    const maxScore = 0.25;
                    const scorePercentage = (item.brierScore / maxScore) * 100;
                    
                    return (
                      <div key={item.volumeRange}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{item.volumeRange}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{item.markets} markets</span>
                            <span className="text-lg font-bold text-info">{item.brierScore.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-success to-info rounded-full"
                            style={{ width: `${100 - scorePercentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="bg-info/10 border border-info/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-info flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-muted-foreground">
                        A Brier score of 0.00 represents perfect accuracy, while 1.00 is the worst possible score. 
                        The score measures the average squared error between predictions and actual outcomes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Resolution Composition */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Resolution Composition</h2>
              <p className="text-muted-foreground mb-4">
                Distribution of how markets resolved across all {resolutionData.totalMarkets} resolved markets on the platform.
              </p>
              
              <div className="bg-card border border-card-border rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold">Resolved Yes</span>
                      <span className="text-4xl font-bold text-primary">{resolutionData.yes}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((resolutionData.yes / 100) * resolutionData.totalMarkets)} markets
                    </p>
                  </div>
                  
                  <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold">Resolved No</span>
                      <span className="text-4xl font-bold text-destructive">{resolutionData.no}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((resolutionData.no / 100) * resolutionData.totalMarkets)} markets
                    </p>
                  </div>
                </div>
                
                <div className="h-8 flex rounded-lg overflow-hidden">
                  <div
                    className="bg-primary flex items-center justify-center text-sm font-medium text-white"
                    style={{ width: `${resolutionData.yes}%` }}
                  >
                    {resolutionData.yes > 15 && `${resolutionData.yes}%`}
                  </div>
                  <div
                    className="bg-destructive flex items-center justify-center text-sm font-medium text-white"
                    style={{ width: `${resolutionData.no}%` }}
                  >
                    {resolutionData.no > 15 && `${resolutionData.no}%`}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Methods */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Methods</h2>
              
              <div className="bg-card border border-card-border rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Data Collection</h3>
                  <p className="text-muted-foreground text-sm">
                    All metrics are based on resolved markets on the CashMarket platform. Price snapshots 
                    are taken at specific intervals before resolution: 1 month, 1 week, 1 day, 12 hours, 
                    and 4 hours prior to market resolution.
                  </p>
                </div>
                
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Accuracy Calculation</h3>
                  <p className="text-muted-foreground text-sm">
                    Accuracy reflects whether the final leading outcome (the option with the highest 
                    probability at each snapshot) matches the actual resolution. For example, if a market 
                    showed 65% "Yes" four hours before resolution and resolved to "Yes", this contributes 
                    to the accuracy percentage for that time interval.
                  </p>
                </div>
                
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Brier Score Calculation</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    The Brier score measures the average squared error between predicted probabilities 
                    and actual outcomes. It is calculated as:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    Brier Score = (1/N) × Σ(prediction - outcome)²
                  </div>
                  <p className="text-muted-foreground text-sm mt-3">
                    Where prediction is the market probability (0-1), outcome is either 0 (No) or 1 (Yes), 
                    and N is the total number of markets. Lower scores indicate better calibration.
                  </p>
                </div>
                
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Expected vs Actual</h3>
                  <p className="text-muted-foreground text-sm">
                    Markets are grouped into probability buckets (e.g., 70-80%). For each bucket, we calculate 
                    the average predicted probability and compare it to the actual resolution rate within that 
                    bucket. Perfect calibration would show the expected and actual values matching across all ranges.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Data Attribution */}
            <section className="mb-8">
              <div className="bg-gradient-to-br from-primary/5 to-info/5 border border-primary/20 rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-2">Data Attribution</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  The methodology and presentation of accuracy metrics on this page are inspired by 
                  Alex McCullough's excellent work analyzing prediction market accuracy:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-foreground">
                      <a href="https://dune.com/placeholder" className="underline hover:text-primary transition" target="_blank" rel="noopener noreferrer">
                        How Accurate Is Polymarket
                      </a>
                      {" "}by Alex McCullough
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-foreground">
                      <a href="https://dune.com/placeholder" className="underline hover:text-primary transition" target="_blank" rel="noopener noreferrer">
                        Polymarket Brier Score
                      </a>
                      {" "}by Alex McCullough
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </>
        ) : (
          /* Section 7: FAQ */
          <section className="space-y-4">
            <div className="bg-card border border-card-border rounded-2xl overflow-hidden">
              <details className="group">
                <summary className="px-6 py-4 cursor-pointer hover:bg-card-hover transition flex items-center justify-between">
                  <h3 className="font-semibold text-lg">What does "accuracy" mean here?</h3>
                  <svg className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-muted-foreground">
                  <p className="mb-3">
                    Accuracy measures whether the market's leading prediction (the outcome with the highest 
                    probability) at a given time matched the actual resolution. For example, if a market 
                    showed 65% "Yes" and 35% "No" four hours before resolution, and it resolved "Yes", 
                    that's counted as accurate.
                  </p>
                  <p>
                    It's important to note that accuracy is a simple binary measure—it only considers 
                    whether the most likely outcome was correct, not how confident the market was in 
                    that prediction. For a more nuanced view of prediction quality, see the Brier score.
                  </p>
                </div>
              </details>
            </div>

            <div className="bg-card border border-card-border rounded-2xl overflow-hidden">
              <details className="group">
                <summary className="px-6 py-4 cursor-pointer hover:bg-card-hover transition flex items-center justify-between">
                  <h3 className="font-semibold text-lg">What is a "Brier score"?</h3>
                  <svg className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-muted-foreground">
                  <p className="mb-3">
                    The Brier score is a statistical measure of forecast accuracy that evaluates how close 
                    predictions were to actual outcomes. Unlike simple accuracy, it rewards confident 
                    correct predictions and penalizes confident wrong predictions.
                  </p>
                  <p className="mb-3">
                    The score ranges from 0.00 (perfect prediction) to 1.00 (worst possible prediction). 
                    It's calculated as the average squared difference between predicted probabilities and 
                    actual outcomes across all markets.
                  </p>
                  <p>
                    For example, predicting 90% for an event that happens gives a better Brier score than 
                    predicting 60%, even though both are "correct". Similarly, predicting 90% for an event 
                    that doesn't happen is penalized more heavily than predicting 60%.
                  </p>
                </div>
              </details>
            </div>

            <div className="bg-card border border-card-border rounded-2xl overflow-hidden">
              <details className="group">
                <summary className="px-6 py-4 cursor-pointer hover:bg-card-hover transition flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Why does accuracy improve closer to resolution?</h3>
                  <svg className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-muted-foreground">
                  <p className="mb-3">
                    Markets naturally become more accurate as they approach resolution because more 
                    information becomes available over time. Events that seemed uncertain weeks or months 
                    ago often become clearer as the resolution date approaches.
                  </p>
                  <p className="mb-3">
                    For example, a market about whether a sports team will win a championship might start 
                    at 40% probability at the beginning of the season. As games are played and the team's 
                    performance becomes clearer, the probability will shift to better reflect the likely 
                    outcome.
                  </p>
                  <p>
                    This pattern is expected and healthy—it shows that markets are responsive to new 
                    information and that traders are updating their positions as events unfold.
                  </p>
                </div>
              </details>
            </div>

            <div className="bg-card border border-card-border rounded-2xl overflow-hidden">
              <details className="group">
                <summary className="px-6 py-4 cursor-pointer hover:bg-card-hover transition flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Why do more markets resolve "No" than "Yes"?</h3>
                  <svg className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-muted-foreground">
                  <p className="mb-3">
                    The skew toward "No" resolutions is primarily due to how markets are structured. 
                    Many markets are framed around specific, narrow events that may or may not happen, 
                    such as "Will X reach Y by date Z?" or "Will event A occur before date B?"
                  </p>
                  <p className="mb-3">
                    These types of questions naturally have a higher baseline probability of resolving 
                    "No" because they require specific conditions to be met for a "Yes" resolution. 
                    If any of those conditions fail to materialize, the market resolves "No".
                  </p>
                  <p>
                    Additionally, markets about negative events (e.g., "Will this NOT happen?") or 
                    ambitious targets (e.g., "Will this record be broken?") tend to favor "No" outcomes. 
                    This isn't a flaw—it reflects the real-world probability distribution of these events.
                  </p>
                </div>
              </details>
            </div>

            <div className="bg-card border border-card-border rounded-2xl overflow-hidden">
              <details className="group">
                <summary className="px-6 py-4 cursor-pointer hover:bg-card-hover transition flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Where does this data come from?</h3>
                  <svg className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-muted-foreground">
                  <p className="mb-3">
                    All data presented on this page comes directly from the CashMarket platform. We analyze 
                    every resolved market to calculate accuracy metrics and Brier scores.
                  </p>
                  <p className="mb-3">
                    Price snapshots are automatically captured at specific intervals (1 month, 1 week, 
                    1 day, 12 hours, and 4 hours) before each market's resolution. These snapshots are 
                    then compared against the actual outcomes to compute the various metrics you see here.
                  </p>
                  <p>
                    The methodology for presenting this data is inspired by Alex McCullough's excellent 
                    Dune dashboards analyzing Polymarket accuracy. We've adapted these proven analytical 
                    approaches to provide transparency into how well CashMarket predictions perform.
                  </p>
                </div>
              </details>
            </div>
          </section>
        )}
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation currentPage="home" />
    </div>
  );
}
