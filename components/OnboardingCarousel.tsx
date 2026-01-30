"use client";

import { useState } from "react";

interface OnboardingCarouselProps {
  onClose: () => void;
}

const slides = [
  {
    title: "What are Prediction Markets?",
    description: "Prediction markets let you trade on the outcomes of real-world events. Buy shares in outcomes you believe will happen—if you're right, you earn money!",
    icon: "📊",
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "How Resolution Works",
    description: "When an event concludes, official sources verify the outcome. Markets are resolved based on credible data—ensuring fair and transparent results for all traders.",
    icon: "✅",
    color: "from-info/20 to-info/5",
  },
  {
    title: "How Payouts Work",
    description: "When a market resolves in your favor, you receive KES 100 per winning share. Funds are instantly paid out to your M-Pesa account—fast, secure, and hassle-free.",
    icon: "💰",
    color: "from-warning/20 to-warning/5",
  },
];

export default function OnboardingCarousel({ onClose }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
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
              onClick={nextSlide}
              className="px-8 py-3 bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl font-semibold transition"
              aria-label={currentSlide === slides.length - 1 ? "Get started" : "Go to next slide"}
            >
              {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
