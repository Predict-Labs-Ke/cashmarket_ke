"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface OnboardingCarouselProps {
  onClose: () => void;
}

const slides = [
  {
    title: "A Probability Market, Not Betting",
    description: "CashMarket KE is a prediction market where you trade shares based on your knowledge and analysis of real-world events. Unlike betting, prices reflect collective wisdom and probability—making it a skill-based platform for informed decision-making.",
    icon: "📊",
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "How Markets Are Resolved",
    description: "Every market resolves using publicly verifiable data from credible sources. For example: Sports outcomes use official league results, economic events use Central Bank data, and political events use IEBC announcements. No manipulation—just facts.",
    icon: "✅",
    color: "from-info/20 to-info/5",
  },
  {
    title: "Built for Kenya, Trusted by Kenyans",
    description: "Trade with confidence using M-Pesa for instant deposits and withdrawals. We focus on local markets—from Harambee Stars to KES/USD rates. Join 8,000+ Kenyan traders who trust our transparent, fair, and secure platform.",
    icon: "🇰🇪",
    color: "from-warning/20 to-warning/5",
  },
];

export default function OnboardingCarousel({ onClose }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleGetStarted = () => {
    onClose();
    router.push("/markets");
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skip = () => {
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          skip();
        }
      }}
    >
      <div className="w-full max-w-2xl">
        {/* Carousel Card */}
        <div className="bg-card border border-card-border rounded-3xl p-8 md:p-12 relative">
          {/* Skip Button */}
          <button
            onClick={skip}
            className="absolute top-4 right-4 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition"
            aria-label="Skip onboarding tutorial"
          >
            Skip
          </button>

          {/* Slide Content */}
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${slides[currentSlide].color} mb-6`}>
              <span className="text-5xl" aria-hidden="true">{slides[currentSlide].icon}</span>
            </div>

            <h2 id="onboarding-title" className="text-3xl md:text-4xl font-bold mb-4">
              {slides[currentSlide].title}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-2 mb-8" role="tablist" aria-label="Onboarding progress">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                currentSlide === 0
                  ? "text-muted-foreground cursor-not-allowed opacity-50"
                  : "text-foreground hover:bg-muted"
              }`}
              aria-label="Go to previous slide"
            >
              Back
            </button>
            <button
              onClick={currentSlide === slides.length - 1 ? handleGetStarted : nextSlide}
              className="px-8 py-3 bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl font-semibold transition"
              aria-label={currentSlide === slides.length - 1 ? "Explore live markets" : "Go to next slide"}
            >
              {currentSlide === slides.length - 1 ? "Explore Live Markets" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
