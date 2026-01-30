"use client";

import Navigation from "@/components/Navigation";
import MobileNavigation from "@/components/MobileNavigation";
import Link from "next/link";

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I make my first forecast?",
      answer: "Browse available markets, select one that interests you, and click 'Make Forecast'. Choose your prediction (Yes/No) and submit."
    },
    {
      question: "How is my accuracy calculated?",
      answer: "Your accuracy is based on the percentage of correct forecasts you've made in resolved markets. We use a weighted system that considers forecast confidence."
    },
    {
      question: "What happens when a market resolves?",
      answer: "Once a market's outcome is determined, all forecasts are evaluated. Correct predictions earn you points and improve your accuracy score."
    },
    {
      question: "How do I climb the leaderboard?",
      answer: "Make accurate forecasts consistently, participate in multiple markets, and maintain a good track record. Early forecasts in markets often carry bonus points."
    },
    {
      question: "Can I change my forecast?",
      answer: "Yes, you can update your forecast on open markets. Your latest forecast will be used for scoring when the market resolves."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
      <Navigation currentPage="home" showPortfolioBalance={true} />

      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
          <p className="text-lg text-muted-foreground">
            Get help with CashMarket KE and learn how to make the most of your forecasting experience
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <a
            href="mailto:support@cashmarket.ke"
            className="flex flex-col items-center gap-3 p-6 bg-card border border-card-border rounded-2xl hover:shadow-lg hover:shadow-primary/10 transition group"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-semibold mb-1">Email Support</div>
              <div className="text-xs text-muted-foreground">support@cashmarket.ke</div>
            </div>
          </a>

          <Link
            href="/docs"
            className="flex flex-col items-center gap-3 p-6 bg-card border border-card-border rounded-2xl hover:shadow-lg hover:shadow-primary/10 transition group"
          >
            <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center text-info group-hover:scale-110 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-semibold mb-1">Documentation</div>
              <div className="text-xs text-muted-foreground">Learn how it works</div>
            </div>
          </Link>

          <a
            href="https://twitter.com/cashmarket_ke"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 bg-card border border-card-border rounded-2xl hover:shadow-lg hover:shadow-primary/10 transition group"
          >
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center text-success group-hover:scale-110 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-semibold mb-1">Social Media</div>
              <div className="text-xs text-muted-foreground">@cashmarket_ke</div>
            </div>
          </a>
        </div>

        {/* FAQs */}
        <div className="bg-card border border-card-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="group">
                <summary className="cursor-pointer list-none flex items-start gap-3 p-4 bg-muted hover:bg-card-hover rounded-xl transition">
                  <svg className="w-5 h-5 text-primary mt-0.5 group-open:rotate-90 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-semibold flex-1">{faq.question}</span>
                </summary>
                <div className="pl-12 pr-4 pt-3 pb-4 text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="mt-8 text-center bg-gradient-to-br from-primary/5 to-card border border-primary/20 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-2">Still need help?</h3>
          <p className="text-muted-foreground mb-4">
            Our support team is here to assist you
          </p>
          <a
            href="mailto:support@cashmarket.ke"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Support
          </a>
        </div>
      </main>

      <MobileNavigation currentPage="home" />
    </div>
  );
}
