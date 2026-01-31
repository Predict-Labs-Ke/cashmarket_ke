"use client";

import { useAuth } from "@/contexts/AuthContext";

interface PortfolioBalanceProps {
  portfolioBalance?: number;
  cashDeposit?: number;
}

export default function PortfolioBalance({ 
  portfolioBalance = 1000, 
  cashDeposit = 500 
}: PortfolioBalanceProps) {
  const { isLoggedIn } = useAuth();

  // Don't show portfolio balance if user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="hidden lg:block bg-background-secondary border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground">Portfolio Balance</span>
            <span className="text-sm font-semibold text-primary">
              KES {portfolioBalance.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground">Cash Deposit</span>
            <span className="text-sm font-semibold text-foreground">
              KES {cashDeposit.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
