"use client";

import Link from "next/link";

interface MobileNavigationProps {
  currentPage?: "home" | "search" | "breaking" | "portfolio" | "profile";
}

export default function MobileNavigation({ currentPage = "home" }: MobileNavigationProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border px-6 py-3 z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link 
          href="/" 
          className={`flex flex-col items-center gap-1 transition ${
            currentPage === "home" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className={`text-xs ${currentPage === "home" ? "font-medium" : ""}`}>Home</span>
        </Link>
        
        <Link 
          href="/search" 
          className={`flex flex-col items-center gap-1 transition ${
            currentPage === "search" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className={`text-xs ${currentPage === "search" ? "font-medium" : ""}`}>Search</span>
        </Link>
        
        <Link 
          href="/breaking" 
          className={`flex flex-col items-center gap-1 transition ${
            currentPage === "breaking" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className={`text-xs ${currentPage === "breaking" ? "font-medium" : ""}`}>Breaking</span>
        </Link>
        
        <Link 
          href="/portfolio" 
          className={`flex flex-col items-center gap-1 transition ${
            currentPage === "portfolio" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span className={`text-xs ${currentPage === "portfolio" ? "font-medium" : ""}`}>Portfolio</span>
        </Link>
        
        <Link 
          href="/profile" 
          className={`flex flex-col items-center gap-1 transition ${
            currentPage === "profile" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className={`text-xs ${currentPage === "profile" ? "font-medium" : ""}`}>Profile</span>
        </Link>
      </div>
    </nav>
  );
}
