"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

interface NavigationProps {
  currentPage?: "home" | "markets" | "breaking" | "trending" | "leaderboard" | "about" | "profile";
  onSignIn?: () => void;
  onSignUp?: () => void;
  showPortfolioBalance?: boolean;
  portfolioBalance?: number;
  cashDeposit?: number;
}

export default function Navigation({ 
  currentPage = "home", 
  onSignIn, 
  onSignUp,
  showPortfolioBalance = false,
  portfolioBalance = 1000,
  cashDeposit = 500,
}: NavigationProps) {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center font-bold text-xl text-primary-foreground">
                C
              </div>
              <div>
                <span className="text-xl font-bold">
                  Cash<span className="text-primary">Market</span>
                </span>
                <span className="text-kenya-red text-xs ml-1 font-medium">KE</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/markets"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  currentPage === "markets"
                    ? "text-primary bg-primary-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Markets
              </Link>
              <Link
                href="/breaking"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  currentPage === "breaking"
                    ? "text-primary bg-primary-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Breaking
              </Link>
              <Link
                href="/trending"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  currentPage === "trending"
                    ? "text-primary bg-primary-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Trending
              </Link>
              <Link
                href="/leaderboard"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  currentPage === "leaderboard"
                    ? "text-primary bg-primary-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Leaderboard
              </Link>
              <Link
                href="/about"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  currentPage === "about"
                    ? "text-primary bg-primary-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                About
              </Link>
            </nav>

            {/* Auth Buttons & Portfolio Balance */}
            <div className="flex items-center gap-3">
              {/* Portfolio Balance - Desktop Only - Only show when logged in */}
              {showPortfolioBalance && isLoggedIn && (
                <div className="hidden lg:flex items-center gap-6 mr-4">
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground">Portfolio</span>
                    <span className="text-sm font-semibold text-primary">
                      KES {portfolioBalance.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground">Cash</span>
                    <span className="text-sm font-semibold text-foreground">
                      KES {cashDeposit.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Login/Sign Up buttons - Show when NOT logged in (Desktop only) */}
              {!isLoggedIn && (
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={onSignIn}
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition rounded-lg hover:bg-muted"
                  >
                    Login
                  </button>
                  <button
                    onClick={onSignUp}
                    className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition"
                  >
                    Sign Up
                  </button>
                </div>
              )}
              
              {/* Profile Dropdown - Always shown */}
              <ProfileDropdown 
                onSignIn={onSignIn}
                onSignUp={onSignUp}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
