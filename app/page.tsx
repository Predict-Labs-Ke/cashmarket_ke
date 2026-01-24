"use client";

import { useState } from "react";

// Sample prediction markets data
const predictionMarkets = [
  {
    id: 1,
    title: "Will Kenya Shilling strengthen against USD by Q2 2026?",
    category: "Economy",
    yesPercentage: 42,
    volume: "KES 2.4M",
    endDate: "Apr 30, 2026",
    trending: true,
  },
  {
    id: 2,
    title: "Will Nairobi host the 2027 Africa Tech Summit?",
    category: "Events",
    yesPercentage: 67,
    volume: "KES 890K",
    endDate: "Dec 31, 2026",
    trending: true,
  },
  {
    id: 3,
    title: "Will M-Pesa transaction volume exceed 20B in 2026?",
    category: "Tech",
    yesPercentage: 78,
    volume: "KES 1.8M",
    endDate: "Dec 31, 2026",
    trending: false,
  },
  {
    id: 4,
    title: "Will Harambee Stars qualify for AFCON 2027?",
    category: "Sports",
    yesPercentage: 35,
    volume: "KES 5.2M",
    endDate: "Nov 15, 2026",
    trending: true,
  },
  {
    id: 5,
    title: "Will Kenya achieve 70% renewable energy by 2026?",
    category: "Environment",
    yesPercentage: 54,
    volume: "KES 620K",
    endDate: "Dec 31, 2026",
    trending: false,
  },
  {
    id: 6,
    title: "Will SGR expand to Kisumu by end of 2027?",
    category: "Infrastructure",
    yesPercentage: 28,
    volume: "KES 3.1M",
    endDate: "Dec 31, 2027",
    trending: false,
  },
];

const categories = ["All", "Economy", "Sports", "Tech", "Events", "Environment", "Infrastructure"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const filteredMarkets =
    selectedCategory === "All"
      ? predictionMarkets
      : predictionMarkets.filter((m) => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-black to-black text-white">
      {/* Navigation */}
      <nav className="border-b border-green-900/50 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center font-bold text-xl">
                C
              </div>
              <span className="text-xl font-bold">
                Cash<span className="text-green-500">Market</span>
                <span className="text-red-500 text-sm ml-1">KE</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#markets" className="text-zinc-400 hover:text-white transition">
                Markets
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                How it Works
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Leaderboard
              </a>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition font-medium">
                Connect Wallet
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-green-900/50">
              <div className="flex flex-col gap-4">
                <a href="#markets" className="text-zinc-400 hover:text-white transition">Markets</a>
                <a href="#" className="text-zinc-400 hover:text-white transition">How it Works</a>
                <a href="#" className="text-zinc-400 hover:text-white transition">Leaderboard</a>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition font-medium w-full">
                  Connect Wallet
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-700/50 rounded-full text-green-400 text-sm mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Kenya&apos;s First Prediction Market
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Predict the Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                Kenya
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              Trade on real-world events. From politics to sports, economy to tech — put your
              knowledge to work and earn from your predictions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-xl font-semibold text-lg transition shadow-lg shadow-green-900/50">
                Start Predicting
              </button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold text-lg transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {[
              { label: "Total Volume", value: "KES 45M+" },
              { label: "Active Markets", value: "127" },
              { label: "Traders", value: "8,400+" },
              { label: "Resolved Markets", value: "89" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-green-400">{stat.value}</div>
                <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section id="markets" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold">Prediction Markets</h2>
              <p className="text-zinc-400 mt-2">Trade on what you believe will happen</p>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? "bg-green-600 text-white"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Market Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMarkets.map((market) => (
              <div
                key={market.id}
                className="bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-zinc-300">
                    {market.category}
                  </span>
                  {market.trending && (
                    <span className="flex items-center gap-1 text-orange-400 text-xs">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                      Trending
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-4 group-hover:text-green-400 transition line-clamp-2">
                  {market.title}
                </h3>

                {/* Probability Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-green-400 font-medium">Yes {market.yesPercentage}%</span>
                    <span className="text-red-400 font-medium">No {100 - market.yesPercentage}%</span>
                  </div>
                  <div className="h-2 bg-red-500/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
                      style={{ width: `${market.yesPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-zinc-500">
                  <span>Volume: {market.volume}</span>
                  <span>Ends: {market.endDate}</span>
                </div>

                {/* Trade Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button className="py-2 bg-green-600/20 hover:bg-green-600/40 border border-green-600/50 text-green-400 rounded-lg font-medium transition">
                    Buy Yes
                  </button>
                  <button className="py-2 bg-red-600/20 hover:bg-red-600/40 border border-red-600/50 text-red-400 rounded-lg font-medium transition">
                    Buy No
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition">
              View All Markets →
            </button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-green-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Start trading on real-world events in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect Your Wallet",
                description: "Link your M-Pesa or crypto wallet to get started. We support multiple payment methods.",
                icon: "💳",
              },
              {
                step: "02",
                title: "Choose a Market",
                description: "Browse prediction markets on topics you care about — politics, sports, economy, and more.",
                icon: "🎯",
              },
              {
                step: "03",
                title: "Trade & Earn",
                description: "Buy Yes or No shares based on your prediction. If you're right, you earn when the market resolves.",
                icon: "💰",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="text-green-500 font-mono text-sm mb-2">Step {item.step}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-900/50 to-green-800/30 border border-green-700/50 rounded-3xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Predicting?</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of Kenyans already trading on CashMarket. Turn your insights into earnings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-xl font-semibold text-lg transition">
                Get Started — It&apos;s Free
              </button>
              <button className="px-8 py-4 bg-transparent hover:bg-white/10 border border-white/20 rounded-xl font-semibold text-lg transition">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center font-bold">
                  C
                </div>
                <span className="font-bold">
                  Cash<span className="text-green-500">Market</span>
                  <span className="text-red-500 text-sm ml-1">KE</span>
                </span>
              </div>
              <p className="text-zinc-500 text-sm">
                Kenya&apos;s leading prediction market platform. Trade on real-world events.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Markets</h4>
              <ul className="space-y-2 text-zinc-500 text-sm">
                <li><a href="#" className="hover:text-white transition">Politics</a></li>
                <li><a href="#" className="hover:text-white transition">Sports</a></li>
                <li><a href="#" className="hover:text-white transition">Economy</a></li>
                <li><a href="#" className="hover:text-white transition">Technology</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-zinc-500 text-sm">
                <li><a href="#" className="hover:text-white transition">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-zinc-500 text-sm">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">Discord</a></li>
                <li><a href="#" className="hover:text-white transition">Telegram</a></li>
                <li><a href="#" className="hover:text-white transition">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">© 2026 CashMarket KE. All rights reserved.</p>
            <div className="flex gap-6 text-zinc-500 text-sm">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
