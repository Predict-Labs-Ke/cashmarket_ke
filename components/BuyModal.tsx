"use client";

import { useState, useEffect } from "react";

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  direction: "yes" | "no";
  marketTitle: string;
  currentPercentage: number;
}

export default function BuyModal({
  isOpen,
  onClose,
  direction,
  marketTitle,
  currentPercentage,
}: BuyModalProps) {
  const [amount, setAmount] = useState(50);
  const [sliderValue, setSliderValue] = useState(50);
  const [isSliderActive, setIsSliderActive] = useState(false);

  // Sync slider with amount input
  useEffect(() => {
    setSliderValue(amount);
  }, [amount]);

  // Handle quick add buttons
  const handleQuickAdd = (value: number) => {
    setAmount((prev) => Math.min(prev + value, 10000));
  };

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "") {
      setAmount(0);
    } else {
      const numValue = parseInt(value, 10);
      setAmount(Math.min(numValue, 10000));
    }
  };

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setSliderValue(value);
    setAmount(value);
  };

  // Handle slider interaction states
  const handleSliderMouseDown = () => {
    setIsSliderActive(true);
  };

  const handleSliderMouseUp = () => {
    setIsSliderActive(false);
  };

  // Handle buy confirmation
  const handleBuy = () => {
    // TODO: Implement actual buy logic
    console.log(`Buying ${direction.toUpperCase()} for KES ${amount}`);
    onClose();
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md mx-4 bg-card border border-card-border rounded-2xl p-6 shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">
              Buy{" "}
              <span
                className={
                  direction === "yes" ? "text-primary" : "text-destructive"
                }
              >
                {direction.toUpperCase()}
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Market Title */}
        <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
          {marketTitle}
        </p>

        {/* Current Probability */}
        <div className="bg-muted rounded-xl p-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current probability:</span>
            <span
              className={`font-semibold ${
                direction === "yes" ? "text-primary" : "text-destructive"
              }`}
            >
              {direction === "yes" ? currentPercentage : 100 - currentPercentage}
              % {direction.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Amount Input Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">Amount</label>
          <div className="flex items-center gap-2">
            {/* Input Field */}
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                KES
              </span>
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="w-full pl-16 pr-4 py-3 bg-background border border-border rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="50"
              />
            </div>

            {/* Quick Add Buttons */}
            <button
              onClick={() => handleQuickAdd(50)}
              className="px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-xl transition border border-primary/30"
            >
              +50
            </button>
            <button
              onClick={() => handleQuickAdd(100)}
              className="px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-xl transition border border-primary/30"
            >
              +100
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">
            Adjust Amount
          </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="10000"
              step="10"
              value={sliderValue}
              onChange={handleSliderChange}
              onMouseDown={handleSliderMouseDown}
              onMouseUp={handleSliderMouseUp}
              onTouchStart={handleSliderMouseDown}
              onTouchEnd={handleSliderMouseUp}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer transition-all"
              style={{
                background: isSliderActive
                  ? `linear-gradient(to right, var(--primary) 0%, var(--primary) ${
                      (sliderValue / 10000) * 100
                    }%, var(--muted) ${
                      (sliderValue / 10000) * 100
                    }%, var(--muted) 100%)`
                  : "var(--muted)",
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>KES 0</span>
              <span>KES 10,000</span>
            </div>
          </div>
        </div>

        {/* Estimated Shares */}
        <div className="bg-muted rounded-xl p-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Estimated shares:</span>
            <span className="font-semibold">
              {(() => {
                // Calculate estimated shares based on current market probability
                // Formula: (amount / market_price) where market_price is the current percentage (0-1)
                // Multiply by 100 to convert percentage to decimal, then normalize to get shares
                const marketPrice = direction === "yes" ? currentPercentage : 100 - currentPercentage;
                
                // Prevent division by zero for edge cases (0% or 100% probability)
                if (marketPrice === 0) {
                  return 0;
                }
                
                return Math.round((amount / marketPrice) * 100);
              })()}{" "}
              shares
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleBuy}
            disabled={amount <= 0}
            className={`flex-1 py-3 px-4 font-medium rounded-xl transition ${
              direction === "yes"
                ? "bg-primary hover:bg-primary-hover text-white"
                : "bg-destructive hover:bg-destructive/90 text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Buy {direction.toUpperCase()}
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Market prices may change before your order is filled
        </p>
      </div>
    </div>
  );
}
