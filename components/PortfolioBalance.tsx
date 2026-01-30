"use client";

interface PortfolioBalanceProps {
  portfolioBalance?: number;
  cashDeposit?: number;
}

export default function PortfolioBalance({ 
  portfolioBalance = 1000, 
  cashDeposit = 500 
}: PortfolioBalanceProps) {
  return (
    <div className="hidden lg:block bg-background-secondary border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Portfolio Balance:</span>
            <span className="text-lg font-semibold text-primary">
              KES {portfolioBalance.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Cash Deposit:</span>
            <span className="text-lg font-semibold text-foreground">
              KES {cashDeposit.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
