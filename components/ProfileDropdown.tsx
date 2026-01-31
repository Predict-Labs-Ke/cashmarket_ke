"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

interface ProfileDropdownProps {
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
  isLoggedIn?: boolean;
  onSignIn?: () => void;
  onSignUp?: () => void;
}

export default function ProfileDropdown({ 
  userName = "User", 
  userAvatar,
  onLogout,
  isLoggedIn = false,
  onSignIn,
  onSignUp
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Default avatar as SVG data URI
  const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect fill='%2322c55e' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='white'%3EU%3C/text%3E%3C/svg%3E";
  const avatarSrc = userAvatar || defaultAvatar;

  // Load saved language preference on mount
  useEffect(() => {
    // Delay state updates to avoid cascading renders
    const initialize = () => {
      setMounted(true);
      const savedLanguage = localStorage.getItem("language") || "en";
      setSelectedLanguage(savedLanguage);
    };
    
    initialize();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem("language", language);
    // Close both the language submenu and the main dropdown after selection
    setIsLanguageOpen(false);
    setIsOpen(false);
    // In a real app, this would trigger i18n language change
  };

  const handleLogout = () => {
    setIsOpen(false);
    if (onLogout) {
      onLogout();
    }
    // Clear any user session data
    localStorage.removeItem("userSession");
    // Redirect to home/login page using Next.js router
    router.push("/");
  };

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "sw", name: "Swahili", flag: "🇰🇪" }
  ];

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full bg-muted" aria-label="Profile menu">
        {/* Placeholder while mounting */}
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Avatar Button or Menu Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-muted transition group"
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >
        {isLoggedIn ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition">
            <Image 
              src={avatarSrc} 
              alt={userName} 
              width={40} 
              height={40} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-muted border-2 border-border group-hover:border-primary transition flex items-center justify-center">
            <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-card border border-card-border rounded-xl shadow-xl overflow-hidden z-50">
          {isLoggedIn ? (
            <>
              {/* Profile Section - Logged In */}
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-4 hover:bg-card-hover transition border-b border-border"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
                  <Image 
                    src={avatarSrc} 
                    alt={userName} 
                    width={48} 
                    height={48} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{userName}</div>
                  <div className="text-xs text-muted-foreground">View profile</div>
                </div>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>

              {/* Menu Items */}
              <div className="py-2">
                {/* Dark/Light Mode Toggle */}
                <div className="px-4 py-3 hover:bg-card-hover transition flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-muted-foreground">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Theme</span>
                  </div>
                  <ThemeToggle />
                </div>

                {/* Help & Support */}
                <Link
                  href="/help"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-card-hover transition"
                >
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-sm font-medium">Help & Support</span>
                </Link>

                {/* Documentation */}
                <Link
                  href="/docs"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-card-hover transition"
                >
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-sm font-medium">Documentation</span>
                </Link>

                {/* Terms and Conditions */}
                <Link
                  href="/terms"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-card-hover transition"
                >
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium">Terms and Conditions</span>
                </Link>

                {/* Language Selector */}
                <div className="border-t border-border mt-2">
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-card-hover transition"
                    aria-expanded={isLanguageOpen}
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      <span className="text-sm font-medium">Languages</span>
                    </div>
                    <svg 
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Language submenu with transition */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isLanguageOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 pb-3 space-y-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                            selectedLanguage === lang.code
                              ? "bg-primary/10 text-primary font-medium"
                              : "hover:bg-muted text-foreground"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                          {selectedLanguage === lang.code && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="border-t border-border mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-destructive/10 text-destructive transition rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sm font-medium">Log out</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Profile Section - Logged Out */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                    <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Welcome!</div>
                    <div className="text-xs text-muted-foreground">Sign in to get started</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onSignIn?.();
                    }}
                    className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition font-medium text-sm"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onSignUp?.();
                    }}
                    className="w-full px-4 py-2.5 bg-muted text-foreground rounded-lg hover:bg-card-hover transition font-medium text-sm border border-border"
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Menu Items - Logged Out (Limited) */}
              <div className="py-2">
                {/* Dark/Light Mode Toggle */}
                <div className="px-4 py-3 hover:bg-card-hover transition flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-muted-foreground">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Theme</span>
                  </div>
                  <ThemeToggle />
                </div>

                {/* Help & Support */}
                <Link
                  href="/help"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-card-hover transition"
                >
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-sm font-medium">Help & Support</span>
                </Link>

                {/* Documentation */}
                <Link
                  href="/docs"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-card-hover transition"
                >
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-sm font-medium">Documentation</span>
                </Link>

                {/* Terms and Conditions */}
                <Link
                  href="/terms"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-card-hover transition"
                >
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium">Terms and Conditions</span>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
