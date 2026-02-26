import type { Market, MarketDetail } from "./types";

export const marketCategories = [
  { id: "trending", label: "Trending" },
  { id: "new", label: "New" },
  { id: "sports", label: "Sports" },
  { id: "crypto", label: "Crypto" },
  { id: "politics", label: "Politics" },
  { id: "resolved", label: "Resolved" },
];

export const mockMarkets: Market[] = [
  {
    id: "1",
    title: "Fed decision in January?",
    image:
      "https://i.ytimg.com/vi/Sa9p3OnbThQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBxmEOzd1HHHwhDUh4pM5jXxzm5iQ",
    category: "politics",
    status: "active",
    outcomes: [
      { label: "No change", percentage: 93, odds: "1.08¢", color: "green" },
      { label: "25 bps decrease", percentage: 7, odds: "14.3¢", color: "red" },
      {
        label: "50+ bps decrease",
        percentage: 0.5,
        odds: "200¢",
        color: "red",
      },
    ],
    totalVolume: "$187.96M Vol.",
    timeframe: "Monthly",
  },
  {
    id: "2",
    title: 'New "Stranger Things" episode released by...?',
    image:
      "https://i.ytimg.com/vi/Sa9p3OnbThQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBxmEOzd1HHHwhDUh4pM5jXxzm5iQ",
    category: "new",
    status: "resolved",
    resolvedOutcome: "December 31",
    outcomes: [
      { label: "December 31", percentage: 8, odds: "12.5¢", color: "green" },
      { label: "January 31", percentage: 2, odds: "50¢", color: "red" },
    ],
    totalVolume: "$16.63M Vol.",
  },
  {
    id: "3",
    title: "Bitcoin above ___ on January 8?",
    image:
      "https://i.ytimg.com/vi/Sa9p3OnbThQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBxmEOzd1HHHwhDUh4pM5jXxzm5iQ",
    category: "crypto",
    status: "active",
    outcomes: [
      { label: "78,000", percentage: 99.95, odds: "1.0¢", color: "green" },
      { label: "80,000", percentage: 99.95, odds: "1.0¢", color: "green" },
      { label: "82,000", percentage: 99.95, odds: "1.0¢", color: "green" },
    ],
    totalVolume: "$258.27k Vol.",
  },
  {
    id: "4",
    title: "Will Bitcoin reach $100k by January 2025?",
    image:
     "https://i.ytimg.com/vi/Sa9p3OnbThQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBxmEOzd1HHHwhDUh4pM5jXxzm5iQ",
    category: "crypto",
    status: "resolved",
    resolvedOutcome: "Yes",
    outcomes: [
      { label: "Yes", percentage: 100, odds: "1.0¢", color: "green" },
      { label: "No", percentage: 0, odds: "100¢", color: "red" },
    ],
    totalVolume: "$500M Vol.",
  },
];

export const marketDetails: Record<string, MarketDetail> = {
  "1": {
    ...mockMarkets[0]!,
    chartData: [
      { time: "9:00 PM", values: [93, 7, 0.5] },
      { time: "3:00 AM", values: [92, 7.5, 0.5] },
      { time: "9:00 AM", values: [93, 6.5, 0.5] },
      { time: "3:00 PM", values: [93, 7, 0.5] },
      { time: "8:16 PM", values: [93, 7, 0.5] },
    ],
    timeframeOptions: [
      { label: "1H", value: "1h" },
      { label: "6H", value: "6h" },
      { label: "1D", value: "1d", active: true },
      { label: "1W", value: "1w" },
      { label: "1M", value: "1m" },
      { label: "MAX", value: "max" },
    ],
  },
  "2": {
    ...mockMarkets[1]!,
    chartData: [
      { time: "9:00 PM", values: [8, 2] },
      { time: "3:00 AM", values: [8, 2] },
      { time: "9:00 AM", values: [7, 2] },
      { time: "3:00 PM", values: [8, 2] },
      { time: "8:15 PM", values: [8, 2] },
    ],
    timeframeOptions: [
      { label: "1H", value: "1h" },
      { label: "6H", value: "6h" },
      { label: "1D", value: "1d", active: true },
      { label: "1W", value: "1w" },
      { label: "1M", value: "1m" },
      { label: "MAX", value: "max" },
    ],
    userBet: {
      outcome: "December 31",
      amount: 100,
      payout: 112.5,
      won: true,
    },
  },
  "3": {
    ...mockMarkets[2]!,
    chartData: [
      { time: "9:00 PM", values: [99.95, 99.95, 99.95] },
      { time: "3:00 AM", values: [99.94, 99.94, 99.94] },
      { time: "9:00 AM", values: [99.95, 99.95, 99.95] },
      { time: "3:00 PM", values: [99.95, 99.95, 99.95] },
      { time: "8:16 PM", values: [99.95, 99.95, 99.95] },
    ],
    timeframeOptions: [
      { label: "1H", value: "1h" },
      { label: "6H", value: "6h" },
      { label: "1D", value: "1d", active: true },
      { label: "1W", value: "1w" },
      { label: "1M", value: "1m" },
      { label: "MAX", value: "max" },
    ],
  },
  "4": {
    ...mockMarkets[3]!,
    chartData: [
      { time: "Jan 1", values: [60, 40] },
      { time: "Jan 5", values: [80, 20] },
      { time: "Jan 8", values: [95, 5] },
      { time: "Jan 15", values: [100, 0] },
    ],
    timeframeOptions: [
      { label: "1W", value: "1w" },
      { label: "1M", value: "1m", active: true },
      { label: "MAX", value: "max" },
    ],
    userBet: {
      outcome: "Yes",
      amount: 50,
      payout: 50.5,
      won: true,
    },
  },
};
