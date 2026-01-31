"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import MarketCard from "@/components/MarketCard";
import MobileNavigation from "@/components/MobileNavigation";
import { useAuth } from "@/contexts/AuthContext";

// Sample prediction markets data with enhanced fields
const predictionMarkets = [
  {
    id: 1,
    title: "Will Kenya Shilling strengthen against USD by Q2 2026?",
    category: "Economy",
    yesPercentage: 42,
    volume: "KES 2.4M",
    volumeNumeric: 2400000,
    endDate: "Apr 30, 2026",
    createdDate: "Jan 15, 2026",
    trending: true,
    resolutionSource: "Central Bank of Kenya",
    movement24h: -2,
    resolved: false,
  },
  {
    id: 2,
    title: "Will Nairobi host the 2027 Africa Tech Summit?",
    category: "Events",
    yesPercentage: 67,
    volume: "KES 890K",
    volumeNumeric: 890000,
    endDate: "Dec 31, 2026",
    createdDate: "Jan 20, 2026",
    trending: true,
    resolutionSource: "Official event organizers",
    movement24h: 5,
    resolved: false,
  },
  {
    id: 3,
    title: "Will M-Pesa transaction volume exceed 20B in 2026?",
    category: "Tech",
    yesPercentage: 78,
    volume: "KES 1.8M",
    volumeNumeric: 1800000,
    endDate: "Dec 31, 2026",
    createdDate: "Dec 15, 2025",
    trending: false,
    resolutionSource: "Safaricom Annual Report",
    movement24h: 3,
    resolved: true,
  },
  {
    id: 4,
    title: "Will Harambee Stars qualify for AFCON 2027?",
    category: "Sports",
    yesPercentage: 35,
    volume: "KES 5.2M",
    volumeNumeric: 5200000,
    endDate: "Nov 15, 2026",
    createdDate: "Jan 10, 2026",
    trending: true,
    resolutionSource: "CAF Official Results",
    movement24h: -1,
    resolved: false,
  },
  {
    id: 5,
    title: "Will Kenya achieve 70% renewable energy by 2026?",
    category: "Environment",
    yesPercentage: 54,
    volume: "KES 620K",
    volumeNumeric: 620000,
    endDate: "Dec 31, 2026",
    createdDate: "Dec 20, 2025",
    trending: false,
    resolutionSource: "Ministry of Energy",
    movement24h: 0,
    resolved: false,
  },
  {
    id: 6,
    title: "Will SGR expand to Kisumu by end of 2027?",
    category: "Infrastructure",
    yesPercentage: 28,
    volume: "KES 3.1M",
    volumeNumeric: 3100000,
    endDate: "Dec 31, 2027",
    createdDate: "Jan 5, 2026",
    trending: false,
    resolutionSource: "Kenya Railways",
    movement24h: 2,
    resolved: false,
  },
  {
    id: 7,
    title: "Will Kenya's GDP growth exceed 6% in 2026?",
    category: "Economy",
    yesPercentage: 45,
    volume: "KES 1.2M",
    volumeNumeric: 1200000,
    endDate: "Dec 31, 2026",
    createdDate: "Jan 1, 2026",
    trending: false,
    resolutionSource: "Kenya National Bureau of Statistics",
    movement24h: 1,
    resolved: false,
  },
  {
    id: 8,
    title: "Will Gor Mahia win the KPL 2026 season?",
    category: "Sports",
    yesPercentage: 62,
    volume: "KES 4.8M",
    volumeNumeric: 4800000,
    endDate: "Nov 30, 2026",
    createdDate: "Jan 25, 2026",
    trending: true,
    resolutionSource: "Football Kenya Federation",
    movement24h: 4,
    resolved: true,
  },
  {
    id: 9,
    title: "Will Nairobi receive above-average rainfall in March 2026?",
    category: "Weather",
    yesPercentage: 58,
    volume: "KES 420K",
    volumeNumeric: 420000,
    endDate: "Mar 31, 2026",
    createdDate: "Jan 28, 2026",
    trending: false,
    resolutionSource: "Kenya Meteorological Department",
    movement24h: -3,
    resolved: false,
  },
  {
    id: 10,
    title: "Will temperatures in Mombasa exceed 35°C in February 2026?",
    category: "Weather",
    yesPercentage: 71,
    volume: "KES 310K",
    volumeNumeric: 310000,
    endDate: "Feb 28, 2026",
    createdDate: "Jan 29, 2026",
    trending: false,
    resolutionSource: "Kenya Meteorological Department",
    movement24h: 0,
    resolved: false,
  },
  {
    id: 11,
    title: "Will Kenya experience El Niño conditions in 2026?",
    category: "Weather",
    yesPercentage: 44,
    volume: "KES 580K",
    volumeNumeric: 580000,
    endDate: "Dec 31, 2026",
    createdDate: "Jan 12, 2026",
    trending: true,
    resolutionSource: "Kenya Meteorological Department",
    movement24h: -5,
    resolved: false,
  },
  {
    id: 12,
    title: "Will Mount Kenya receive snowfall in July 2026?",
    category: "Weather",
    yesPercentage: 82,
    volume: "KES 275K",
    volumeNumeric: 275000,
    endDate: "Jul 31, 2026",
    createdDate: "Jan 8, 2026",
    trending: false,
    resolutionSource: "Kenya Wildlife Service",
    movement24h: 0,
    resolved: false,
  },
  {
    id: 13,
    title: "Will Safaricom 5G coverage reach 50% of urban areas by 2027?",
    category: "Tech",
    yesPercentage: 73,
    volume: "KES 1.5M",
    volumeNumeric: 1500000,
    endDate: "Dec 31, 2027",
    createdDate: "Dec 28, 2025",
    trending: false,
    resolutionSource: "Safaricom Reports",
    movement24h: 2,
    resolved: false,
  },
  {
    id: 14,
    title: "Will Kenya host a Formula E race in 2026?",
    category: "Sports",
    yesPercentage: 18,
    volume: "KES 890K",
    volumeNumeric: 890000,
    endDate: "Dec 31, 2026",
    createdDate: "Jan 3, 2026",
    trending: false,
    resolutionSource: "FIA Official Announcements",
    movement24h: -1,
    resolved: false,
  },
  {
    id: 15,
    title: "Will Nairobi-Mombasa highway toll fees be implemented?",
    category: "Infrastructure",
    yesPercentage: 65,
    volume: "KES 2.1M",
    volumeNumeric: 2100000,
    endDate: "Jun 30, 2026",
    createdDate: "Jan 22, 2026",
    trending: true,
    resolutionSource: "KeNHA Official Statements",
    movement24h: 3,
    resolved: false,
  },
  {
    id: 16,
    title: "Will inflation rate drop below 5% in 2026?",
    category: "Economy",
    yesPercentage: 38,
    volume: "KES 1.8M",
    volumeNumeric: 1800000,
    endDate: "Dec 31, 2026",
    createdDate: "Dec 10, 2025",
    trending: false,
    resolutionSource: "Kenya National Bureau of Statistics",
    movement24h: -2,
    resolved: false,
  },
  {
    id: 17,
    title: "Will Nairobi expressway phase 2 be completed by 2027?",
    category: "Infrastructure",
    yesPercentage: 52,
    volume: "KES 3.5M",
    volumeNumeric: 3500000,
    endDate: "Dec 31, 2027",
    createdDate: "Jan 6, 2026",
    trending: false,
    resolutionSource: "Kenya Urban Roads Authority",
    movement24h: 1,
    resolved: false,
  },
  {
    id: 18,
    title: "Will AFC Leopards win KPL in 2026?",
    category: "Sports",
    yesPercentage: 24,
    volume: "KES 2.3M",
    volumeNumeric: 2300000,
    endDate: "Nov 30, 2026",
    createdDate: "Dec 25, 2025",
    trending: false,
    resolutionSource: "Football Kenya Federation",
    movement24h: -1,
    resolved: false,
  },
  {
    id: 19,
    title: "Will Kenya launch a domestic satellite by 2027?",
    category: "Tech",
    yesPercentage: 41,
    volume: "KES 950K",
    volumeNumeric: 950000,
    endDate: "Dec 31, 2027",
    createdDate: "Dec 18, 2025",
    trending: false,
    resolutionSource: "Kenya Space Agency",
    movement24h: 2,
    resolved: false,
  },
  {
    id: 20,
    title: "Will Madaraka Express add a new route in 2026?",
    category: "Infrastructure",
    yesPercentage: 58,
    volume: "KES 1.4M",
    volumeNumeric: 1400000,
    endDate: "Dec 31, 2026",
    createdDate: "Jan 17, 2026",
    trending: false,
    resolutionSource: "Kenya Railways",
    movement24h: 0,
    resolved: false,
  },
  {
    id: 21,
    title: "Will coffee production exceed 100,000 metric tons in 2026?",
    category: "Economy",
    yesPercentage: 47,
    volume: "KES 720K",
    volumeNumeric: 720000,
    endDate: "Dec 31, 2026",
    createdDate: "Dec 5, 2025",
    trending: false,
    resolutionSource: "Coffee Directorate of Kenya",
    movement24h: 1,
    resolved: false,
  },
  {
    id: 22,
    title: "Will Lake Nakuru water levels rise by 10% in 2026?",
    category: "Environment",
    yesPercentage: 62,
    volume: "KES 480K",
    volumeNumeric: 480000,
    endDate: "Dec 31, 2026",
    createdDate: "Jan 14, 2026",
    trending: false,
    resolutionSource: "Kenya Wildlife Service",
    movement24h: -2,
    resolved: false,
  },
  {
    id: 23,
    title: "Will Tusker FC qualify for CAF Champions League 2027?",
    category: "Sports",
    yesPercentage: 56,
    volume: "KES 1.9M",
    volumeNumeric: 1900000,
    endDate: "Dec 31, 2026",
    createdDate: "Jan 27, 2026",
    trending: true,
    resolutionSource: "CAF Official Results",
    movement24h: 3,
    resolved: false,
  },
  {
    id: 24,
    title: "Will Konza Technopolis attract 10+ tech companies by 2027?",
    category: "Tech",
    yesPercentage: 68,
    volume: "KES 1.1M",
    volumeNumeric: 1100000,
    endDate: "Dec 31, 2027",
    createdDate: "Dec 22, 2025",
    trending: false,
    resolutionSource: "Konza Technopolis Authority",
    movement24h: 2,
    resolved: false,
  },
  {
    id: 25,
    title: "Will tea exports exceed KES 150B in 2026?",
    category: "Economy",
    yesPercentage: 51,
    volume: "KES 1.3M",
    volumeNumeric: 1300000,
    endDate: "Dec 31, 2026",
    createdDate: "Jan 4, 2026",
    trending: false,
    resolutionSource: "Tea Board of Kenya",
    movement24h: 0,
    resolved: false,
  },
  {
    id: 26,
    title: "Will Lamu Port receive its first commercial shipment in 2026?",
    category: "Infrastructure",
    yesPercentage: 72,
    volume: "KES 2.8M",
    volumeNumeric: 2800000,
    endDate: "Dec 31, 2026",
    createdDate: "Jan 24, 2026",
    trending: true,
    resolutionSource: "Lamu Port-South Sudan-Ethiopia Transport",
    movement24h: 4,
    resolved: false,
  },
  {
    id: 27,
    title: "Will renewable energy contribute 80% of power by 2027?",
    category: "Environment",
    yesPercentage: 45,
    volume: "KES 890K",
    volumeNumeric: 890000,
    endDate: "Dec 31, 2027",
    createdDate: "Dec 12, 2025",
    trending: false,
    resolutionSource: "Ministry of Energy",
    movement24h: 1,
    resolved: false,
  },
  {
    id: 28,
    title: "Will drought conditions affect Turkana in Q3 2026?",
    category: "Weather",
    yesPercentage: 67,
    volume: "KES 540K",
    volumeNumeric: 540000,
    endDate: "Sep 30, 2026",
    createdDate: "Jan 11, 2026",
    trending: false,
    resolutionSource: "Kenya Meteorological Department",
    movement24h: -3,
    resolved: false,
  },
  {
    id: 29,
    title: "Will Nairobi Securities Exchange index hit 3000 points in 2026?",
    category: "Economy",
    yesPercentage: 34,
    volume: "KES 2.5M",
    volumeNumeric: 2500000,
    endDate: "Dec 31, 2026",
    createdDate: "Jan 2, 2026",
    trending: false,
    resolutionSource: "Nairobi Securities Exchange",
    movement24h: -1,
    resolved: false,
  },
  {
    id: 30,
    title: "Will Kenya Rugby 7s qualify for Olympics 2028?",
    category: "Sports",
    yesPercentage: 76,
    volume: "KES 3.2M",
    volumeNumeric: 3200000,
    endDate: "Dec 31, 2027",
    createdDate: "Jan 26, 2026",
    trending: true,
    resolutionSource: "World Rugby",
    movement24h: 5,
    resolved: false,
  },
  {
    id: 31,
    title: "Will Nairobi implement new traffic rules by Feb 2026?",
    category: "Infrastructure",
    yesPercentage: 55,
    volume: "KES 680K",
    volumeNumeric: 680000,
    endDate: "Feb 15, 2026",
    createdDate: "Jan 28, 2026",
    trending: false,
    resolutionSource: "Nairobi City Council",
    movement24h: 2,
    resolved: false,
  },
  {
    id: 32,
    title: "Will Bitcoin exceed $100K by Feb 2026?",
    category: "Economy",
    yesPercentage: 68,
    volume: "KES 5.5M",
    volumeNumeric: 5500000,
    endDate: "Feb 28, 2026",
    createdDate: "Jan 25, 2026",
    trending: true,
    resolutionSource: "Major Crypto Exchanges",
    movement24h: 8,
    resolved: false,
  },
  {
    id: 33,
    title: "Will new COVID variant emerge in Feb 2026?",
    category: "Events",
    yesPercentage: 32,
    volume: "KES 1.1M",
    volumeNumeric: 1100000,
    endDate: "Feb 10, 2026",
    createdDate: "Jan 29, 2026",
    trending: false,
    resolutionSource: "WHO Reports",
    movement24h: -3,
    resolved: false,
  },
  {
    id: 34,
    title: "Did Kenya win AFCON 2025?",
    category: "Sports",
    yesPercentage: 15,
    volume: "KES 3.8M",
    volumeNumeric: 3800000,
    endDate: "Feb 08, 2025",
    createdDate: "Dec 1, 2024",
    trending: false,
    resolutionSource: "CAF Official Results",
    movement24h: 0,
    resolved: true,
  },
  {
    id: 35,
    title: "Did Safaricom launch 5G nationwide in 2025?",
    category: "Tech",
    yesPercentage: 88,
    volume: "KES 2.9M",
    volumeNumeric: 2900000,
    endDate: "Dec 31, 2025",
    createdDate: "Jan 1, 2025",
    trending: false,
    resolutionSource: "Safaricom Press Release",
    movement24h: 0,
    resolved: true,
  },
  {
    id: 36,
    title: "Will Nairobi experience heavy rains in Feb 2026?",
    category: "Weather",
    yesPercentage: 73,
    volume: "KES 420K",
    volumeNumeric: 420000,
    endDate: "Feb 28, 2026",
    createdDate: "Jan 30, 2026",
    trending: false,
    resolutionSource: "Kenya Meteorological Department",
    movement24h: 5,
    resolved: false,
  },
  {
    id: 37,
    title: "Will new stadium be completed in Kisumu by March 2026?",
    category: "Infrastructure",
    yesPercentage: 42,
    volume: "KES 1.6M",
    volumeNumeric: 1600000,
    endDate: "Mar 15, 2026",
    createdDate: "Jan 20, 2026",
    trending: false,
    resolutionSource: "County Government",
    movement24h: 1,
    resolved: false,
  },
  {
    id: 38,
    title: "Will fuel prices drop below KES 150 in Feb 2026?",
    category: "Economy",
    yesPercentage: 38,
    volume: "KES 2.2M",
    volumeNumeric: 2200000,
    endDate: "Feb 14, 2026",
    createdDate: "Jan 27, 2026",
    trending: true,
    resolutionSource: "Energy and Petroleum Regulatory Authority",
    movement24h: -4,
    resolved: false,
  },
  {
    id: 39,
    title: "Did Kenya GDP grow by 5% in 2025?",
    category: "Economy",
    yesPercentage: 62,
    volume: "KES 1.9M",
    volumeNumeric: 1900000,
    endDate: "Jan 15, 2026",
    createdDate: "Nov 1, 2025",
    trending: false,
    resolutionSource: "Kenya National Bureau of Statistics",
    movement24h: 0,
    resolved: true,
  },
  {
    id: 40,
    title: "Will Valentine's Day sales exceed KES 10B?",
    category: "Events",
    yesPercentage: 71,
    volume: "KES 850K",
    volumeNumeric: 850000,
    endDate: "Feb 14, 2026",
    createdDate: "Jan 29, 2026",
    trending: false,
    resolutionSource: "Retail Association Report",
    movement24h: 6,
    resolved: false,
  },
];

const categories = [
  "All",
  "Economy",
  "Sports",
  "Tech",
  "Events",
  "Environment",
  "Infrastructure",
  "Weather"
];

export default function MarketsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("24h Volume");
  const [frequency, setFrequency] = useState("All");
  const [status, setStatus] = useState("Active");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { login } = useAuth();

  const hasActiveFilters = sortBy !== "24h Volume" || frequency !== "All" || status !== "Active" || selectedCategories.length > 0;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect fill='%2322c55e' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='white'%3EU%3C/text%3E%3C/svg%3E";
    login({
      name: "User",
      avatar: defaultAvatar
    });
    setShowSignIn(false);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = name.split(' ').filter(n => n.length > 0).map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
    const avatar = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect fill='%2322c55e' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='white'%3E${initials}%3C/text%3E%3C/svg%3E`;
    login({
      name: name || "User",
      avatar: avatar
    });
    setShowSignUp(false);
  };

  const handleClearFilters = () => {
    setSortBy("24h Volume");
    setFrequency("All");
    setStatus("Active");
    setSelectedCategories([]);
  };

  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Helper function to calculate days until resolution
  const getDaysUntilResolution = (endDateStr: string): number => {
    const end = new Date(endDateStr);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  // Filter markets
  const filteredMarkets = predictionMarkets
    .filter((market) => {
      const matchesCategory = selectedCategory === "All" || market.category === selectedCategory;
      const matchesSearch = market.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategoryFilter = selectedCategories.length === 0 || selectedCategories.includes(market.category);
      
      // Status filter
      const matchesStatus = status === "Active" 
        ? !market.resolved 
        : market.resolved;
      
      // Frequency filter (based on time to resolution)
      let matchesFrequency = true;
      if (frequency !== "All") {
        const daysUntilResolution = getDaysUntilResolution(market.endDate);
        if (frequency === "Daily") {
          matchesFrequency = daysUntilResolution <= 7; // Markets ending within a week
        } else if (frequency === "Weekly") {
          matchesFrequency = daysUntilResolution > 7 && daysUntilResolution <= 30; // Markets ending within a month
        } else if (frequency === "Monthly") {
          matchesFrequency = daysUntilResolution > 30; // Markets ending after a month
        }
      }
      
      return matchesCategory && matchesSearch && matchesCategoryFilter && matchesStatus && matchesFrequency;
    })
    // Sort markets
    .sort((a, b) => {
      if (sortBy === "24h Volume") {
        return b.volumeNumeric - a.volumeNumeric; // Highest volume first
      } else if (sortBy === "Newest") {
        const dateA = new Date(a.createdDate);
        const dateB = new Date(b.createdDate);
        return dateB.getTime() - dateA.getTime(); // Newest first
      } else if (sortBy === "Ending Soon") {
        const dateA = new Date(a.endDate);
        const dateB = new Date(b.endDate);
        return dateA.getTime() - dateB.getTime(); // Soonest first
      } else if (sortBy === "Total Volume") {
        return b.volumeNumeric - a.volumeNumeric; // Same as 24h Volume for now
      }
      return 0;
    });

  const trendingMarkets = predictionMarkets.filter((m) => m.trending);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
      {/* Header with Navigation */}
      <Navigation 
        currentPage="markets" 
        showPortfolioBalance={true}
        onSignIn={() => setShowSignIn(true)}
        onSignUp={() => setShowSignUp(true)}
      />

      {/* Search and Filter Section */}
      <div className="sticky top-[57px] z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
          {/* Search Bar with Filter Icon */}
          <div className="mb-3">
            <div className="relative max-w-md flex gap-2">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-input border border-input-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2.5 rounded-xl border transition ${
                  showFilters || hasActiveFilters
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-card-border hover:bg-card-hover"
                }`}
                aria-label="Toggle filters"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Filters Panel with Animation */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showFilters ? "max-h-96 opacity-100 mb-3" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-card border border-card-border rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-input-border rounded-lg text-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                  >
                    <option>24h Volume</option>
                    <option>Newest</option>
                    <option>Ending Soon</option>
                    <option>Total Volume</option>
                  </select>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-sm font-medium mb-2">Frequency</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-input-border rounded-lg text-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                  >
                    <option>All</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-input-border rounded-lg text-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                  >
                    <option>Active</option>
                    <option>Resolved</option>
                  </select>
                </div>

                {/* Clear Filters Button */}
                <div className="flex items-end">
                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      className="w-full px-4 py-2 bg-destructive-muted text-destructive border border-destructive/50 rounded-lg font-medium hover:bg-destructive/20 transition"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Categories Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Filter by Categories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.filter(c => c !== "All").map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        selectedCategories.includes(cat)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-card-hover border border-border"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-card-hover border border-card-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-4 pb-24 lg:pb-8">
        {/* Trending Section */}
        {selectedCategory === "All" && searchQuery === "" && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              <h2 className="font-semibold text-lg">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {trendingMarkets.map((market) => (
                <div
                  key={market.id}
                  className="bg-gradient-to-br from-warning/10 to-card border border-warning/20 rounded-2xl p-4 hover:border-warning/40 transition cursor-pointer"
                >
                  <span className="text-xs text-warning font-medium">{market.category}</span>
                  <h3 className="text-sm font-medium mt-1 line-clamp-2">{market.title}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-primary font-semibold">{market.yesPercentage}% Yes</span>
                    <span className="text-xs text-muted-foreground">{market.volume}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Markets List */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-lg">
              {selectedCategory === "All" ? "All Markets" : selectedCategory}
            </h2>
            <span className="text-sm text-muted-foreground">{filteredMarkets.length} markets</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
            {filteredMarkets.map((market) => (
              <MarketCard
                key={market.id}
                {...market}
              />
            ))}
          </div>

          {filteredMarkets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No markets found</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-2 text-primary text-sm hover:text-primary-light transition"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation currentPage="home" />

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center">
          <div className="w-full max-w-md bg-card rounded-t-3xl sm:rounded-3xl p-6 animate-slide-up border border-card-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Welcome Back</h2>
              <button
                onClick={() => setShowSignIn(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSignIn}>
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Phone Number
                </label>
                <div className="flex">
                  <span className="px-4 py-3 bg-muted border border-r-0 border-input-border rounded-l-xl text-muted-foreground">
                    +254
                  </span>
                  <input
                    type="tel"
                    placeholder="712 345 678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-4 py-3 bg-input border border-input-border rounded-r-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-input-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-hover rounded-xl font-semibold text-primary-foreground transition active:scale-[0.98]"
              >
                Sign In
              </button>

              <button
                type="button"
                className="w-full py-3 text-muted-foreground hover:text-foreground text-sm transition"
              >
                Forgot Password?
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-muted-foreground text-sm">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => {
                    setShowSignIn(false);
                    setShowSignUp(true);
                  }}
                  className="text-primary font-medium hover:text-primary-light transition"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center">
          <div className="w-full max-w-md bg-card rounded-t-3xl sm:rounded-3xl p-6 animate-slide-up border border-card-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Create Account</h2>
              <button
                onClick={() => setShowSignUp(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Kamau"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-input-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Phone Number
                </label>
                <div className="flex">
                  <span className="px-4 py-3 bg-muted border border-r-0 border-input-border rounded-l-xl text-muted-foreground">
                    +254
                  </span>
                  <input
                    type="tel"
                    placeholder="712 345 678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-4 py-3 bg-input border border-input-border rounded-r-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-input-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-ring transition"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 accent-primary rounded"
                />
                <label htmlFor="terms" className="text-xs text-muted-foreground">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:text-primary-light transition">Terms of Service</a> and{" "}
                  <a href="#" className="text-primary hover:text-primary-light transition">Privacy Policy</a>. I am at least 18 years old.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-hover rounded-xl font-semibold text-primary-foreground transition active:scale-[0.98]"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setShowSignUp(false);
                    setShowSignIn(true);
                  }}
                  className="text-primary font-medium hover:text-primary-light transition"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
