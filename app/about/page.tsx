"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import MobileNavigation from "@/components/MobileNavigation";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
      {/* Header */}
      <Navigation currentPage="about" showPortfolioBalance={true} />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Hero Section */}
        <section className="mb-16 lg:mb-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-muted border border-primary/30 rounded-full text-primary text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About CashMarket KE
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Where Knowledge Meets Opportunity
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              CashMarket KE is Kenya&apos;s first prediction market platform where you can trade on real-world events. 
              From politics to sports, economy to technology — put your insights to work and earn from accurate predictions.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16 lg:mb-20">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary-muted rounded-xl">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe that collective intelligence is powerful. By enabling Kenyans to trade on their knowledge 
                and insights about future events, we create a transparent marketplace that reflects real expectations 
                about what&apos;s ahead.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-foreground-secondary"><span className="font-medium text-foreground">Empower Kenyans</span> to monetize their knowledge and insights</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-foreground-secondary"><span className="font-medium text-foreground">Provide transparency</span> on collective expectations for key events</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-foreground-secondary"><span className="font-medium text-foreground">Build trust</span> through fair, verifiable outcomes and instant payouts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Prediction Markets Are */}
        <section className="mb-16 lg:mb-20">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-info/10 rounded-xl">
              <svg className="w-6 h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">What Are Prediction Markets?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Prediction markets are platforms where people trade on the outcomes of future events. Think of it as 
                a stock market, but instead of trading company shares, you&apos;re trading on whether specific events will happen.
              </p>
              
              <div className="bg-card border border-card-border rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Choose a Market</h4>
                      <p className="text-sm text-muted-foreground">Browse markets on sports, politics, economy, and more</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Trade Your Prediction</h4>
                      <p className="text-sm text-muted-foreground">Buy &quot;Yes&quot; if you think it will happen, &quot;No&quot; if you don&apos;t</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Earn from Accuracy</h4>
                      <p className="text-sm text-muted-foreground">If you&apos;re right, you earn. If you&apos;re wrong, you lose your stake</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                The prices (shown as percentages) reflect the crowd&apos;s collective belief about the likelihood of an event. 
                A market at 65% &quot;Yes&quot; suggests most traders believe there&apos;s a 65% chance the event will happen.
              </p>
            </div>
          </div>
        </section>

        {/* What This Is Not */}
        <section className="mb-16 lg:mb-20">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-destructive-muted rounded-xl">
              <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">What This Is Not</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We want to be clear about what CashMarket KE is and isn&apos;t. Transparency is essential, especially in the Kenyan context.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                  <svg className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <h4 className="font-medium mb-1">Not Traditional Gambling</h4>
                    <p className="text-sm text-muted-foreground">
                      Unlike betting on random outcomes, prediction markets reward knowledge and analysis. 
                      Success comes from understanding events, not chance.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                  <svg className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <h4 className="font-medium mb-1">Not a Get-Rich-Quick Scheme</h4>
                    <p className="text-sm text-muted-foreground">
                      Like any investment, there are risks. You can lose money. Success requires research, 
                      patience, and sound judgment.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                  <svg className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <h4 className="font-medium mb-1">Not Manipulated or Rigged</h4>
                    <p className="text-sm text-muted-foreground">
                      Every market is resolved based on verifiable, publicly available information. 
                      We do not control outcomes or favor any trader.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Focus on Kenya */}
        <section className="mb-16 lg:mb-20">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-kenya-green/10 rounded-xl">
              <span className="text-2xl">🇰🇪</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Built for Kenya</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                CashMarket KE is designed specifically for the Kenyan market, with local relevance at its core.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border border-card-border rounded-xl p-5">
                  <div className="w-10 h-10 bg-primary-muted rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">M-Pesa Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Deposit and withdraw using M-Pesa, the payment method you already know and trust.
                  </p>
                </div>

                <div className="bg-card border border-card-border rounded-xl p-5">
                  <div className="w-10 h-10 bg-primary-muted rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Local Events</h3>
                  <p className="text-sm text-muted-foreground">
                    Trade on Kenyan politics, sports, economy, infrastructure, and more events that matter to you.
                  </p>
                </div>

                <div className="bg-card border border-card-border rounded-xl p-5">
                  <div className="w-10 h-10 bg-primary-muted rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Swahili & English</h3>
                  <p className="text-sm text-muted-foreground">
                    Platform available in both English and Swahili to serve all Kenyans comfortably.
                  </p>
                </div>

                <div className="bg-card border border-card-border rounded-xl p-5">
                  <div className="w-10 h-10 bg-primary-muted rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Regulatory Compliance</h3>
                  <p className="text-sm text-muted-foreground">
                    We operate within Kenyan law and work towards full regulatory compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency and Resolution */}
        <section className="mb-16 lg:mb-20">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary-muted rounded-xl">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Transparency & Resolution</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Trust is the foundation of prediction markets. Here&apos;s how we ensure fair and transparent market resolution:
              </p>
              
              <div className="bg-card border border-card-border rounded-2xl p-6 mb-4">
                <h3 className="font-semibold text-lg mb-4">Our Resolution Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-muted flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Clear Resolution Criteria</h4>
                      <p className="text-sm text-muted-foreground">
                        Every market has clear, predefined criteria for resolution before trading begins.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-muted flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Verifiable Sources</h4>
                      <p className="text-sm text-muted-foreground">
                        Markets are resolved using reputable, publicly available sources like official announcements, 
                        government data, or verified news outlets.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-muted flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Instant Payouts</h4>
                      <p className="text-sm text-muted-foreground">
                        Once a market is resolved, winning traders are paid out immediately to their accounts.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-muted flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Dispute Resolution</h4>
                      <p className="text-sm text-muted-foreground">
                        If there&apos;s a dispute about a market&apos;s resolution, we have a clear appeals process 
                        and will review cases fairly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsibility and Risk */}
        <section className="mb-16 lg:mb-20">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-warning/10 rounded-xl">
              <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Responsibility & Risk</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We take responsibility seriously, and we expect our users to do the same.
              </p>
              
              <div className="bg-warning/5 border-l-4 border-warning rounded-r-xl p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Important Risk Disclosures
                </h3>
                <ul className="space-y-2 text-sm text-foreground-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>You can lose money. Only trade what you can afford to lose.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>Past performance doesn&apos;t guarantee future results.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>You must be at least 18 years old to use this platform.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>If you feel you have a problem with trading, seek help immediately.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-card-border rounded-xl p-5">
                <h3 className="font-semibold mb-3">Our Commitment to Responsible Trading</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We provide tools to help you trade responsibly, including deposit limits, timeout features, 
                  and educational resources on risk management. We also partner with organizations that support 
                  problem gambling prevention.
                </p>
                <a href="#" className="text-primary text-sm font-medium hover:text-primary-light transition">
                  Learn more about responsible trading →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-primary-muted to-card border border-primary/20 rounded-2xl p-8 lg:p-10 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">The Future is Predictable</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Join thousands of Kenyans who are already turning their knowledge into opportunity. 
                Whether you&apos;re passionate about sports, politics, technology, or the economy, 
                there&apos;s a market for your insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/markets"
                  className="px-8 py-4 bg-primary hover:bg-primary-hover rounded-2xl font-semibold text-primary-foreground transition shadow-lg shadow-primary/20 active:scale-[0.98]"
                >
                  Explore Markets
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 bg-card hover:bg-card-hover border border-card-border rounded-2xl font-semibold transition active:scale-[0.98]"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-4 lg:px-8 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center font-bold text-sm text-primary-foreground">
                  C
                </div>
                <span className="font-bold text-lg">
                  Cash<span className="text-primary">Market</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Kenya&apos;s prediction market platform. Trade on real-world events.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link href="/markets" className="block text-muted-foreground hover:text-foreground transition">
                  Markets
                </Link>
                <Link href="/leaderboard" className="block text-muted-foreground hover:text-foreground transition">
                  Leaderboard
                </Link>
                <Link href="/about" className="block text-muted-foreground hover:text-foreground transition">
                  About
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition">
                  Terms of Service
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition">
                  Privacy Policy
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition">
                  Support
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              © 2026 CashMarket KE. Trade responsibly. You must be 18+ to use this platform.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <MobileNavigation currentPage="home" />
    </div>
  );
}
