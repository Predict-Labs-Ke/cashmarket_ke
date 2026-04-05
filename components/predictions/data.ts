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
    endDate: "2025-01-01",
    startDate: "2024-01-01",
  outcomes: [
    { label: "75+ bps increase", percentage: 2, odds: "50¢", color: "red", id: 1 },
    { label: "50 bps increase", percentage: 5, odds: "20¢", color: "red", id: 2 },
    { label: "25 bps increase", percentage: 12, odds: "8.3¢", color: "red", id: 3 },
    { label: "No change", percentage: 36, odds: "2.7¢", color: "green", id: 4 },
  
  
  ],
    totalVolume: "$187.96M Vol.",
    timeframe: "Monthly",
  description: `<p>Parliamentary elections are scheduled to be held in Guinea-Bissau on November 23, 2025.</p>

<p>This market will resolve to the political party or coalition that wins the greatest number of seats in the National People's Assembly of Guinea-Bissau.</p>

<p>If voting in the National People's Assembly of Guinea-Bissau election does not occur by December 31, 2026, this market will resolve to "Other".</p>

<p>In the event of a tie between this party or coalition and any other for the most seats won, this market will be resolved in favor of the party or coalition whose listed abbreviation or name appears first in alphabetical order.</p>

<p>This market's resolution will be based solely on the number of seats won by the named party or coalition in the National People's Assembly.</p>

<p>This market will resolve based on the result of the election as indicated by a consensus of credible reporting. If there is ambiguity, this market will resolve based solely on the official results as reported by the government of Guinea-Bissau, specifically the National Election Commission (Comissão Nacional de Eleições, CNE) (http://www.cne.gw/).</p>`
  },
  {
    id: "2",
    title: 'New "Stranger Things" episode released by...?',
    image:
      "https://i.ytimg.com/vi/Sa9p3OnbThQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBxmEOzd1HHHwhDUh4pM5jXxzm5iQ",
    category: "new",
     status: "active",
    resolvedOutcome: "December 31",
    endDate: "2025-01-01",
    startDate: "2024-01-01",
    outcomes: [
      { label: "December 31", percentage: 8, odds: "12.5¢", color: "green", id: 1 },
      { label: "January 31", percentage: 2, odds: "50¢", color: "red", id: 2 },
    ],
    totalVolume: "$16.63M Vol.",
 description: `<p>Parliamentary elections are scheduled to be held in Guinea-Bissau on November 23, 2025.</p>

<p>This market will resolve to the political party or coalition that wins the greatest number of seats in the National People's Assembly of Guinea-Bissau.</p>

<p>If voting in the National People's Assembly of Guinea-Bissau election does not occur by December 31, 2026, this market will resolve to "Other".</p>

<p>In the event of a tie between this party or coalition and any other for the most seats won, this market will be resolved in favor of the party or coalition whose listed abbreviation or name appears first in alphabetical order.</p>

<p>This market's resolution will be based solely on the number of seats won by the named party or coalition in the National People's Assembly.</p>

<p>This market will resolve based on the result of the election as indicated by a consensus of credible reporting. If there is ambiguity, this market will resolve based solely on the official results as reported by the government of Guinea-Bissau, specifically the National Election Commission (Comissão Nacional de Eleições, CNE) (http://www.cne.gw/).</p>`
  },
  {
    id: "3",
    title: "Bitcoin above ___ on January 8?",
    image:
      "https://i.ytimg.com/vi/Sa9p3OnbThQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBxmEOzd1HHHwhDUh4pM5jXxzm5iQ",
    category: "crypto",
    status: "active",
    endDate: "2025-01-01",
    startDate: "2024-01-01",
    outcomes: [
      { label: "78,000", percentage: 99.95, odds: "1.0¢", color: "green", id: 1 },
      { label: "80,000", percentage: 99.95, odds: "1.0¢", color: "green", id: 2 },
      { label: "82,000", percentage: 99.95, odds: "1.0¢", color: "green", id: 3 },
    ],
    totalVolume: "$258.27k Vol.",
description: `<p>Parliamentary elections are scheduled to be held in Guinea-Bissau on November 23, 2025.</p>

<p>This market will resolve to the political party or coalition that wins the greatest number of seats in the National People's Assembly of Guinea-Bissau.</p>

<p>If voting in the National People's Assembly of Guinea-Bissau election does not occur by December 31, 2026, this market will resolve to "Other".</p>

<p>In the event of a tie between this party or coalition and any other for the most seats won, this market will be resolved in favor of the party or coalition whose listed abbreviation or name appears first in alphabetical order.</p>

<p>This market's resolution will be based solely on the number of seats won by the named party or coalition in the National People's Assembly.</p>

<p>This market will resolve based on the result of the election as indicated by a consensus of credible reporting. If there is ambiguity, this market will resolve based solely on the official results as reported by the government of Guinea-Bissau, specifically the National Election Commission (Comissão Nacional de Eleições, CNE) (http://www.cne.gw/).</p>`
  },
  {
    id: "4",
    title: "Will Bitcoin reach $100k by January 2025?",
    image:
      "https://i.ytimg.com/vi/Sa9p3OnbThQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBxmEOzd1HHHwhDUh4pM5jXxzm5iQ",
    category: "crypto",
     status: "active",
    resolvedOutcome: "Yes",
    endDate: "2025-01-01",
    startDate: "2024-01-01",
    outcomes: [
      { label: "Yes", percentage: 100, odds: "1.0¢", color: "green", id: 1 },
      { label: "No", percentage: 0, odds: "100¢", color: "red", id: 2 },
    ],
    totalVolume: "$500M Vol.",
    description: `<p>Parliamentary elections are scheduled to be held in Guinea-Bissau on November 23, 2025.</p>

<p>This market will resolve to the political party or coalition that wins the greatest number of seats in the National People's Assembly of Guinea-Bissau.</p>

<p>If voting in the National People's Assembly of Guinea-Bissau election does not occur by December 31, 2026, this market will resolve to "Other".</p>

<p>In the event of a tie between this party or coalition and any other for the most seats won, this market will be resolved in favor of the party or coalition whose listed abbreviation or name appears first in alphabetical order.</p>

<p>This market's resolution will be based solely on the number of seats won by the named party or coalition in the National People's Assembly.</p>

<p>This market will resolve based on the result of the election as indicated by a consensus of credible reporting. If there is ambiguity, this market will resolve based solely on the official results as reported by the government of Guinea-Bissau, specifically the National Election Commission (Comissão Nacional de Eleições, CNE) (http://www.cne.gw/).</p>`
  },
  {
    id: "5",
    title: "Israel military action against Yemen by...?",
    image: "https://i.ytimg.com/vi/Sa9p3OnbThQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBxmEOzd1HHHwhDUh4pM5jXxzm5iQ",
    category: "politics",
    status: "active",
    endDate: "2026-06-30",
    startDate: "2026-03-28",
    outcomes: [
      { id: 1, label: "March 31", percentage: 63, odds: "63¢", color: "green" },
      { id: 2, label: "April 30", percentage: 91, odds: "91¢", color: "green" },
      { id: 3, label: "May 31", percentage: 86, odds: "87¢", color: "green" },
      { id: 4, label: "June 30", percentage: 90, odds: "91¢", color: "green" },
    ],
    totalVolume: "$735,015 Vol.",
    description: `<p><strong>Rules</strong><br/>
This market will resolve to "Yes" if Israel initiates a drone, missile, or air strike on Yemeni soil or any official Yemen embassy or consulate by the listed date, 11:59 PM Israeli local time. Otherwise, this market will resolve to "No". For the purposes of this market, a qualifying "strike" is defined as the use of aerial bombs, drones or missiles (including cruise or ballistic missiles) launched by Israeli military forces that impact Yemen ground territory or any official Yemen embassy or consulate (e.g., if a weapons depot on Yemen soil is hit by an Israeli missile, this market will resolve to "Yes"). Missiles or drones that are intercepted and surface-to-air missile strikes will not be sufficient for a "Yes" resolution, regardless of whether they land on Yemen territory or cause damage. Actions such as artillery fire, small arms fire, FPV or ATGM strikes directly, ground incursions, naval shelling, cyberattacks, or other operations conducted by Israeli ground operatives will not qualify. The resolution source will be a consensus of credible reporting.</p><br/><br/>
<p><strong>Market Context</strong><br/>
Yemen's Iran-backed Houthis launched a ballistic missile toward Israel on March 28, 2026—the first such direct attack since the ongoing US-Israeli conflict with Iran began—prompting interception by Israeli defenses and raising escalation risks. Houthi leader Abdul-Malik al-Houthi warned of potential military intervention to support Iran if US-Israeli actions intensify, echoing repeated threats amid Red Sea shipping disruptions. While Israel has conducted prior retaliatory airstrikes on Houthi targets following similar provocations, no verified strikes on Yemen have occurred in the past 30 days. Traders monitor for imminent Israeli response, with diplomatic signals and Iranian proxy dynamics as key variables ahead of any ceasefire talks or further barrages.</p>`
  },
];

export const marketDetails: Record<string, MarketDetail> = {
  "1": {
    ...mockMarkets[0]!,
    chartData: [
     
  { time: "9:00 PM", values: [2, 5, 12, 36, 18, 14, 8, 3, 2] },
  { time: "3:00 AM", values: [2, 6, 11, 35, 19, 14, 8, 3, 2] },
  { time: "9:00 AM", values: [1, 5, 13, 37, 17, 14, 8, 3, 2] },
  { time: "3:00 PM", values: [2, 5, 12, 36, 18, 15, 7, 3, 2] },

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
  "5": {
    ...mockMarkets[4]!,
    chartData: [
      { time: "Mar 28", values: [30, 45, 50, 50] },
      { time: "Mar 29", values: [50, 80, 75, 80] },
      { time: "Mar 30", values: [63, 91, 86, 90] },
    ],
    timeframeOptions: [
      { label: "1H", value: "1h" },
      { label: "1D", value: "1d" },
      { label: "1W", value: "1w", active: true },
      { label: "1M", value: "1m" },
      { label: "ALL", value: "max" },
    ],
  },
};
