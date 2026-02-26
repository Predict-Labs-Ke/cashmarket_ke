export type PredictionCategory = "trending" | "new" | "sports" | "crypto" | "politics"
export type MarketStatus = "active" | "resolved" | "upcoming"
export type OutcomeType = "yes" | "no"

export interface PredictionOutcome {
  label: string
  percentage: number
  odds: string
  color: "green" | "red"
}

export interface Market {
  id: string
  title: string
  image: string
  category: PredictionCategory
  outcomes: PredictionOutcome[]
  totalVolume: string
  timeframe?: "Daily" | "Monthly" | "Yearly"
  status: MarketStatus
  resolvedOutcome?: string
}

export interface MarketDetail extends Market {
  chartData: ChartPoint[]
  timeframeOptions: TimeframeOption[]
  resolvedOutcomes?: ResolvedOutcome[]
  userBet?: {
    outcome: string
    amount: number
    payout?: number
    won?: boolean
  }
}

export interface ChartPoint {
  time: string
  values: number[]
}

export interface TimeframeOption {
  label: string
  value: string
  active?: boolean
}

export interface ResolvedOutcome {
  outcome: string
  percentage: number
}
