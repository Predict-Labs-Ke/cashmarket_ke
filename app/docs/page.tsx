"use client";

import Navigation from "@/components/Navigation";
import MobileNavigation from "@/components/MobileNavigation";
import Link from "next/link";

export default function DocsPage() {
  const sections = [
    {
      title: "Getting Started",
      icon: "🚀",
      items: [
        { title: "What is CashMarket KE?", href: "#what-is" },
        { title: "Creating Your Account", href: "#account" },
        { title: "Making Your First Forecast", href: "#first-forecast" }
      ]
    },
    {
      title: "How It Works",
      icon: "⚙️",
      items: [
        { title: "Understanding Markets", href: "#markets" },
        { title: "Forecast Mechanics", href: "#mechanics" },
        { title: "Scoring System", href: "#scoring" }
      ]
    },
    {
      title: "Features",
      icon: "✨",
      items: [
        { title: "Portfolio Management", href: "#portfolio" },
        { title: "Leaderboards", href: "#leaderboards" },
        { title: "Badges & Achievements", href: "#badges" }
      ]
    },
    {
      title: "Best Practices",
      icon: "💡",
      items: [
        { title: "Research & Analysis", href: "#research" },
        { title: "Risk Management", href: "#risk" },
        { title: "Community Guidelines", href: "#guidelines" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
      <Navigation currentPage="home" showPortfolioBalance={true} />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about using CashMarket KE effectively
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-card-border rounded-2xl p-6 sticky top-24">
              <h2 className="font-bold mb-4">Contents</h2>
              <nav className="space-y-4">
                {sections.map((section, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-2 font-semibold mb-2 text-sm">
                      <span>{section.icon}</span>
                      <span>{section.title}</span>
                    </div>
                    <ul className="space-y-1.5 pl-6">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <a
                            href={item.href}
                            className="text-sm text-muted-foreground hover:text-primary transition"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* What is CashMarket KE */}
            <section id="what-is" className="bg-card border border-card-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>🚀</span> What is CashMarket KE?
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  CashMarket KE is Kenya&apos;s premier prediction market platform where you can forecast real-world events 
                  and compete with other forecasters. Our platform focuses on Kenyan markets, politics, sports, and economy.
                </p>
                <p className="text-muted-foreground">
                  Unlike traditional betting, CashMarket is designed to aggregate collective wisdom and create accurate 
                  predictions through market mechanisms. Your forecasts contribute to market probabilities and help 
                  create a clearer picture of future events.
                </p>
              </div>
            </section>

            {/* Creating Account */}
            <section id="account" className="bg-card border border-card-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Creating Your Account</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold mb-1">Sign Up</h3>
                    <p className="text-muted-foreground text-sm">Click the &quot;Sign Up&quot; button and provide your email, username, and password.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold mb-1">Verify Email</h3>
                    <p className="text-muted-foreground text-sm">Check your email for a verification link and click it to activate your account.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold mb-1">Complete Profile</h3>
                    <p className="text-muted-foreground text-sm">Add your profile picture and preferences to personalize your experience.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Understanding Markets */}
            <section id="markets" className="bg-card border border-card-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>⚙️</span> Understanding Markets
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Markets on CashMarket KE represent questions about future events. Each market has:
                </p>
                <ul className="space-y-2 list-disc list-inside pl-4">
                  <li><strong className="text-foreground">Question:</strong> The specific event being predicted</li>
                  <li><strong className="text-foreground">Resolution Date:</strong> When the outcome will be determined</li>
                  <li><strong className="text-foreground">Current Probability:</strong> The collective market prediction (0-100%)</li>
                  <li><strong className="text-foreground">Category:</strong> Sports, Politics, Economy, Tech, etc.</li>
                </ul>
              </div>
            </section>

            {/* Scoring System */}
            <section id="scoring" className="bg-card border border-card-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Scoring System</h2>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-4">
                <h3 className="font-semibold mb-2 text-primary">How Points Are Calculated</h3>
                <p className="text-sm text-muted-foreground">
                  Your accuracy score is based on the Brier Score, which rewards confident, correct predictions 
                  and penalizes confident, incorrect ones. The closer your forecast to the actual outcome, the higher your score.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-success/5 border border-success/20 rounded-xl p-4">
                  <div className="font-semibold text-success mb-2">✓ Good Forecast</div>
                  <p className="text-sm text-muted-foreground">
                    Predicting 80% &quot;Yes&quot; on an event that happens = High score
                  </p>
                </div>
                <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
                  <div className="font-semibold text-destructive mb-2">✗ Poor Forecast</div>
                  <p className="text-sm text-muted-foreground">
                    Predicting 90% &quot;Yes&quot; on an event that doesn&apos;t happen = Low score
                  </p>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="research" className="bg-card border border-card-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>💡</span> Research & Analysis
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <span className="text-xl">📊</span>
                  <div>
                    <h3 className="font-semibold mb-1">Use Multiple Sources</h3>
                    <p className="text-sm text-muted-foreground">Don&apos;t rely on a single news source. Cross-reference information.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <span className="text-xl">📈</span>
                  <div>
                    <h3 className="font-semibold mb-1">Track Historical Trends</h3>
                    <p className="text-sm text-muted-foreground">Look at how similar events have played out in the past.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <span className="text-xl">🎯</span>
                  <div>
                    <h3 className="font-semibold mb-1">Be Calibrated</h3>
                    <p className="text-sm text-muted-foreground">If you say 80%, it should happen 80% of the time across many forecasts.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Need More Help */}
            <div className="bg-gradient-to-br from-primary/5 to-card border border-primary/20 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Need more help?</h3>
              <p className="text-muted-foreground mb-4">
                Check our help center or contact support
              </p>
              <div className="flex gap-3 justify-center">
                <Link
                  href="/help"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition font-medium"
                >
                  Help Center
                </Link>
                <a
                  href="mailto:support@cashmarket.ke"
                  className="px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-card-hover transition font-medium"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNavigation currentPage="home" />
    </div>
  );
}
