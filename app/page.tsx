"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import Navigation from "@/components/Navigation";
import OnboardingCarousel from "@/components/OnboardingCarousel";
import ThemeToggle from "@/components/ThemeToggle";
import MobileNavigation from "@/components/MobileNavigation";

export default function Home() {
  const { isLoggedIn, status } = useAuth();
  const { openModal } = useAuthModal();
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Redirect authenticated users to markets page
  useEffect(() => {
    if (status === "loading") return;
    
    if (isLoggedIn) {
      router.push("/markets");
    }
  }, [isLoggedIn, status, router]);

  // Show onboarding carousel every time page loads when NOT logged in (client-side only)
  useEffect(() => {
    // Wait for auth state to finish loading before showing onboarding
    if (status === "loading") return;
    
    // Show onboarding on every page refresh for non-logged-in users
    if (!isLoggedIn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowOnboarding(true);
    }
  }, [isLoggedIn, status]);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Onboarding Carousel */}
      {showOnboarding && <OnboardingCarousel onClose={handleCloseOnboarding} />}

      {/* Hero Section - Mobile First */}
      <div className="min-h-screen flex flex-col pb-24 lg:pb-0">
        {/* Header with New Navigation */}
        <Navigation 
          currentPage="home" 
          showPortfolioBalance={true}
        />

        {/* Main Hero */}
        <main className="flex-1 flex flex-col justify-center px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
              {/* Left Column - Text */}
              <div className="max-w-lg lg:max-w-none">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-muted border border-primary/30 rounded-full text-primary text-xs font-medium mb-6">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                  Kenya&apos;s #1 Prediction Market
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  Predict.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                    Trade.
                  </span>{" "}
                  Earn.
                </h1>

                {/* Subtitle */}
                <p className="text-sm lg:text-base text-primary/80 font-medium mb-4">
                  A probability market, not a betting platform
                </p>

                <p className="text-muted-foreground text-lg lg:text-xl mb-8 leading-relaxed max-w-xl">
                  Turn your knowledge into earnings. Trade on sports, politics, economy & more with M-Pesa.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {!isLoggedIn ? (
                    // Show only "Get Started Free" for non-logged-in users
                    <button
                      onClick={() => openModal("signup")}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-hover to-primary hover:from-primary hover:to-primary-light rounded-2xl font-semibold text-lg text-primary-foreground transition shadow-lg shadow-primary/20 active:scale-[0.98]"
                    >
                      Get Started Free
                    </button>
                  ) : (
                    // Show all buttons for logged-in users
                    <>
                      <button
                        onClick={() => openModal("signup")}
                        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-hover to-primary hover:from-primary hover:to-primary-light rounded-2xl font-semibold text-lg text-primary-foreground transition shadow-lg shadow-primary/20 active:scale-[0.98]"
                      >
                        Get Started Free
                      </button>
                      <Link
                        href="/markets"
                        className="w-full sm:w-auto px-8 py-4 bg-card hover:bg-card-hover border border-card-border rounded-2xl font-semibold text-lg transition text-center active:scale-[0.98]"
                      >
                        Browse Markets
                      </Link>
                      <Link
                        href="/leaderboard"
                        className="w-full sm:w-auto px-8 py-4 bg-card hover:bg-card-hover border border-card-border rounded-2xl font-semibold text-lg transition text-center active:scale-[0.98]"
                      >
                        Leaderboards
                      </Link>
                    </>
                  )}
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 pt-8 border-t border-border lg:border-0 lg:pt-0 lg:mt-12">
                  <div className="grid grid-cols-3 gap-4 lg:gap-8 text-center lg:text-left">
                    <div>
                      <div className="text-2xl lg:text-3xl font-bold text-primary">8K+</div>
                      <div className="text-xs lg:text-sm text-muted-foreground mt-1">Traders</div>
                    </div>
                    <div>
                      <div className="text-2xl lg:text-3xl font-bold text-primary">KES 45M</div>
                      <div className="text-xs lg:text-sm text-muted-foreground mt-1">Volume</div>
                    </div>
                    <div>
                      <div className="text-2xl lg:text-3xl font-bold text-primary">127</div>
                      <div className="text-xs lg:text-sm text-muted-foreground mt-1">Markets</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Featured Markets (Desktop) */}
              <div className="hidden lg:block">
                <div className="space-y-4">
                  {[
                    { title: "Will Harambee Stars qualify for AFCON 2027?", yes: 35, category: "Sports", volume: "KES 5.2M" },
                    { title: "Will KES strengthen vs USD by Q2?", yes: 42, category: "Economy", volume: "KES 2.4M" },
                    { title: "Will M-Pesa hit 20B transactions?", yes: 78, category: "Tech", volume: "KES 1.8M" },
                  ].map((market, i) => (
                    <div
                      key={i}
                      className="bg-card border border-card-border rounded-2xl p-5 hover:bg-card-hover hover:border-border-secondary transition cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <span className="text-xs text-muted-foreground font-medium">{market.category}</span>
                          <h3 className="font-medium mt-1">{market.title}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-primary font-bold text-lg">{market.yes}%</div>
                          <div className="text-xs text-muted-foreground">Yes</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-muted-foreground">Vol: {market.volume}</span>
                        <div className="flex gap-2">
                          <button className="px-4 py-1.5 bg-primary-muted text-primary text-sm rounded-lg font-medium hover:bg-primary/20 transition">
                            Yes
                          </button>
                          <button className="px-4 py-1.5 bg-destructive-muted text-destructive text-sm rounded-lg font-medium hover:bg-destructive/20 transition">
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link 
                    href="/markets"
                    className="block text-center text-primary text-sm font-medium hover:text-primary-light transition py-2"
                  >
                    View all 127 markets →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Featured Markets Preview - Mobile Only */}
        <section className="px-4 pb-8 lg:hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">🔥 Hot Markets</h2>
            <Link href="/markets" className="text-primary text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { title: "Will Harambee Stars qualify for AFCON 2027?", yes: 35, category: "Sports" },
              { title: "Will KES strengthen vs USD by Q2?", yes: 42, category: "Economy" },
              { title: "Will M-Pesa hit 20B transactions?", yes: 78, category: "Tech" },
            ].map((market, i) => (
              <div
                key={i}
                className="min-w-[260px] bg-card border border-card-border rounded-2xl p-4 hover:bg-card-hover transition"
              >
                <span className="text-xs text-muted-foreground font-medium">{market.category}</span>
                <h3 className="text-sm font-medium mt-1 line-clamp-2">{market.title}</h3>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-semibold">{market.yes}%</span>
                    <span className="text-muted-foreground text-sm">Yes</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="px-3 py-1 bg-primary-muted text-primary text-xs rounded-lg font-medium hover:bg-primary/20 transition">
                      Yes
                    </button>
                    <button className="px-3 py-1 bg-destructive-muted text-destructive text-xs rounded-lg font-medium hover:bg-destructive/20 transition">
                      No
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Features */}
        <section className="px-4 lg:px-8 pb-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <div className="bg-card border border-card-border rounded-2xl p-4 lg:p-6 hover:bg-card-hover transition">
              <span className="text-2xl lg:text-3xl">📱</span>
              <h3 className="font-medium mt-2 lg:text-lg">M-Pesa Ready</h3>
              <p className="text-xs lg:text-sm text-muted-foreground mt-1">Deposit & withdraw instantly</p>
            </div>
            <div className="bg-card border border-card-border rounded-2xl p-4 lg:p-6 hover:bg-card-hover transition">
              <span className="text-2xl lg:text-3xl">🔒</span>
              <h3 className="font-medium mt-2 lg:text-lg">Secure</h3>
              <p className="text-xs lg:text-sm text-muted-foreground mt-1">Your funds are safe</p>
            </div>
            <div className="bg-card border border-card-border rounded-2xl p-4 lg:p-6 hover:bg-card-hover transition">
              <span className="text-2xl lg:text-3xl">⚡</span>
              <h3 className="font-medium mt-2 lg:text-lg">Instant Payouts</h3>
              <p className="text-xs lg:text-sm text-muted-foreground mt-1">Get paid when you win</p>
            </div>
            <div className="bg-card border border-card-border rounded-2xl p-4 lg:p-6 hover:bg-card-hover transition">
              <span className="text-2xl lg:text-3xl">🇰🇪</span>
              <h3 className="font-medium mt-2 lg:text-lg">Made for Kenya</h3>
              <p className="text-xs lg:text-sm text-muted-foreground mt-1">Local markets & events</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 lg:px-8 py-6 border-t border-border">
          <div className="max-w-7xl mx-auto">
            {/* Credibility Strip */}
            <div className="mb-6 p-4 bg-card border border-card-border rounded-2xl">
              <h3 className="text-sm font-semibold mb-3 text-center lg:text-left">Why Trust CashMarket KE</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-muted-foreground">Uses publicly verifiable data</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-muted-foreground">No odds manipulation</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-muted-foreground">Outcomes resolved transparently</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <p className="text-muted-foreground text-xs lg:text-sm">
                © 2026 CashMarket KE. Trade responsibly.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowOnboarding(true)}
                  className="text-xs lg:text-sm text-primary hover:text-primary-light transition"
                >
                  View Tutorial
                </button>
                <ThemeToggle />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs lg:text-sm text-muted-foreground justify-center sm:justify-start">
              <a href="#" className="hover:text-foreground transition">Terms</a>
              <a href="#" className="hover:text-foreground transition">Privacy</a>
              <a href="#" className="hover:text-foreground transition">Support</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation currentPage="home" />
    </div>
  );
}
