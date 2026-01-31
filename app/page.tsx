"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import OnboardingCarousel from "@/components/OnboardingCarousel";
import ThemeToggle from "@/components/ThemeToggle";
import MobileNavigation from "@/components/MobileNavigation";

export default function Home() {
  const { login } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Show onboarding carousel on first visit (client-side only)
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowOnboarding(true);
    }
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("hasSeenOnboarding", "true");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(phoneNumber, password);
      setShowSignIn(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // Sign up functionality requires a registration API endpoint
    // For testing, use existing credentials from database (seeded users)
    setShowSignUp(false);
    setShowSignIn(true);
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
          onSignIn={() => setShowSignIn(true)}
          onSignUp={() => setShowSignUp(true)}
          showPortfolioBalance={true}
        />

        {/* Search Preview Section */}
        <section className="px-6 lg:px-8 pt-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-2xl mx-auto">
              <Link 
                href="/markets"
                className="block bg-card border border-card-border rounded-2xl p-3 hover:bg-card-hover hover:border-border-secondary transition group"
              >
                <div className="flex gap-2 items-center">
                  <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-muted rounded-xl">
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-muted-foreground">Search and filter markets...</span>
                  </div>
                  <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Click to explore markets with advanced filters
                </p>
              </Link>
            </div>
          </div>
        </section>

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
                  <button
                    onClick={() => setShowSignUp(true)}
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

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center">
          <div className="w-full max-w-md bg-card rounded-t-3xl sm:rounded-3xl p-6 animate-slide-up border border-card-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Welcome Back</h2>
              <button
                onClick={() => setShowSignIn(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSignIn}>
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Phone Number
                </label>
                <div className="flex">
                  <span className="px-4 py-3 bg-muted border border-r-0 border-input-border rounded-l-xl text-muted-foreground">
                    +254
                  </span>
                  <input
                    type="tel"
                    placeholder="712 345 678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-4 py-3 bg-input border border-input-border rounded-r-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-input-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-hover rounded-xl font-semibold text-primary-foreground transition active:scale-[0.98]"
              >
                Sign In
              </button>

              <button
                type="button"
                className="w-full py-3 text-muted-foreground hover:text-foreground text-sm transition"
              >
                Forgot Password?
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-muted-foreground text-sm">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => {
                    setShowSignIn(false);
                    setShowSignUp(true);
                  }}
                  className="text-primary font-medium hover:text-primary-light transition"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center">
          <div className="w-full max-w-md bg-card rounded-t-3xl sm:rounded-3xl p-6 animate-slide-up border border-card-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Create Account</h2>
              <button
                onClick={() => setShowSignUp(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Kamau"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-input-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Phone Number
                </label>
                <div className="flex">
                  <span className="px-4 py-3 bg-muted border border-r-0 border-input-border rounded-l-xl text-muted-foreground">
                    +254
                  </span>
                  <input
                    type="tel"
                    placeholder="712 345 678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-4 py-3 bg-input border border-input-border rounded-r-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-input-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 accent-primary rounded"
                />
                <label htmlFor="terms" className="text-xs text-muted-foreground">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:text-primary-light transition">Terms of Service</a> and{" "}
                  <a href="#" className="text-primary hover:text-primary-light transition">Privacy Policy</a>. I am at least 18 years old.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-hover rounded-xl font-semibold text-primary-foreground transition active:scale-[0.98]"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setShowSignUp(false);
                    setShowSignIn(true);
                  }}
                  className="text-primary font-medium hover:text-primary-light transition"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <MobileNavigation currentPage="home" />

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
