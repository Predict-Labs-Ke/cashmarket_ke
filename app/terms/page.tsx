"use client";

import Navigation from "@/components/Navigation";
import MobileNavigation from "@/components/MobileNavigation";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
      <Navigation currentPage="home" showPortfolioBalance={false} />

      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="bg-card border border-card-border rounded-2xl p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to CashMarket KE (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms and Conditions (&quot;Terms&quot;) govern your 
              access to and use of our prediction market platform. By accessing or using CashMarket KE, you agree 
              to be bound by these Terms.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Eligibility</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>To use CashMarket KE, you must:</p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Be a resident of Kenya or have legal authorization to participate</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Not be prohibited from using our services under applicable laws</li>
              </ul>
            </div>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Account Registration</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>When creating an account, you agree to:</p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </div>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. User Conduct</h2>
            <div className="bg-warning/5 border border-warning/20 rounded-xl p-6 mb-4">
              <h3 className="font-semibold mb-2 text-warning">Prohibited Activities</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You agree not to engage in any of the following:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
                <li>Market manipulation or coordinated trading</li>
                <li>Creating multiple accounts to gain unfair advantages</li>
                <li>Using automated systems or bots without authorization</li>
                <li>Harassing or abusing other users</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </div>
          </section>

          {/* Forecasting & Markets */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Forecasting & Markets</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">5.1 Nature of Forecasts:</strong> Forecasts on CashMarket KE 
                are predictions about future events and do not constitute financial advice or guarantees.
              </p>
              <p>
                <strong className="text-foreground">5.2 Market Resolution:</strong> We reserve the right to 
                resolve markets based on credible sources and our resolution criteria. Market resolutions are final.
              </p>
              <p>
                <strong className="text-foreground">5.3 Market Cancellation:</strong> We may cancel or void 
                markets in cases of ambiguity, technical errors, or unforeseen circumstances.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content on CashMarket KE, including logos, designs, text, and software, is owned by or licensed 
              to us and protected by intellectual property laws. You may not use our intellectual property without 
              explicit permission.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Privacy & Data Protection</h2>
            <p className="text-muted-foreground">
              Your use of CashMarket KE is subject to our Privacy Policy, which describes how we collect, use, 
              and protect your personal information. We comply with Kenya&apos;s Data Protection Act and other 
              applicable regulations.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
              <p className="text-sm text-muted-foreground">
                CashMarket KE is provided &quot;as is&quot; without warranties of any kind. We are not liable for any 
                indirect, incidental, or consequential damages arising from your use of the platform. Our total 
                liability shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to suspend or terminate your account at any time for violation of these Terms 
              or for any other reason. You may terminate your account by contacting support.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may modify these Terms at any time. Continued use of CashMarket KE after changes constitutes 
              acceptance of the modified Terms. We will notify users of significant changes.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms are governed by the laws of Kenya. Any disputes shall be resolved in Kenyan courts.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
            <p className="text-muted-foreground mb-3">
              For questions about these Terms, please contact us:
            </p>
            <div className="bg-muted rounded-xl p-4 space-y-2 text-sm">
              <p><strong className="text-foreground">Email:</strong> legal@cashmarket.ke</p>
              <p><strong className="text-foreground">Address:</strong> Nairobi, Kenya</p>
            </div>
          </section>

          {/* Acceptance */}
          <div className="border-t border-border pt-6 mt-8">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground">
                By using CashMarket KE, you acknowledge that you have read, understood, and agree to be bound 
                by these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </main>

      <MobileNavigation currentPage="home" />
    </div>
  );
}
