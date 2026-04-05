import { AboutSection } from "@/components/predictions/market-detail/about-section";
import { DetailHeader } from "@/components/predictions/market-detail/detail-header";
import { PredictionChart } from "@/components/predictions/market-detail/chart";
import { TimeframeSelector } from "@/components/predictions/market-detail/timeframe-selector";
import { OutcomeTabs } from "@/components/predictions/market-detail/outcome-tabs";
import { ResolvedMarket } from "@/components/predictions/market-detail/resolved-market";
import { marketDetails } from "@/components/predictions/data";
import { BettingContainer } from "@/components/predictions/market-detail/betting-container";


import { redirect } from "next/navigation";
import { Page } from "@/components/pageLayout";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: "outcomes" | "about"; timeframe?: string }>;
}

const CHART_COLORS = ["#0066FF", "#FF3366", "#00DD77"];

export default async function PredictionDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const search = await searchParams;

  const activeTab = search?.tab || "outcomes";
  const timeframe = search?.timeframe || "1d";
  const market = marketDetails[id] || marketDetails["2"]; // Fallback to prevent crash if market not found

  if (!market) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        Market not found
      </div>
    );
  }

  const isResolved = market.status === "resolved";
 
  return (
    <Page>
      <Page.Header className="transition-colors border-b! border-border/50! px-2 md:px-6 py-2.5 md:py-3 bg-background! backdrop-blur-sm z-10 sticky top-0">
        <div className="w-full max-w-7xl mx-auto">
          <DetailHeader title={market.title} image={market.image} />
        </div>
      </Page.Header>

      <Page.Main className="bg-background text-foreground transition-colors w-full p-0! pb-[calc(7rem+env(safe-area-inset-bottom))]!">
        <div className="w-full max-w-7xl mx-auto px-3 md:px-6 lg:px-8 space-y-4 md:space-y-6 lg:space-y-8">
          <section className="w-full rounded-2xl border border-border/50 bg-card/40 overflow-hidden">
            <PredictionChart
              data={market.chartData}
              colors={CHART_COLORS}
              outcomes={market.outcomes}
            />
            <div className="border-t border-border/50 px-1.5 py-2.5 md:px-4 md:py-3">
              <TimeframeSelector
                options={market.timeframeOptions}
                marketId={id}
                activeTimeframe={timeframe}
                activeTab={activeTab}
              />
            </div>
          </section>

          {isResolved ? (
            <section className="w-full lg:max-w-3xl lg:mx-auto">
              <ResolvedMarket market={market} />
            </section>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
              <section className="lg:col-span-8 w-full rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
                <div className="border-b border-border/50 p-2 md:p-3 flex justify-center bg-background/80 backdrop-blur-sm sticky top-0 z-5">
                  <OutcomeTabs
                    activeTab={activeTab}
                    id={id}
                    timeframe={timeframe}
                  />
                </div>

                {activeTab === "outcomes" && (
                  <BettingContainer market={market} marketId={id} />
                )}

                {activeTab === "about" && (
                  <div className="w-full">
                    <AboutSection market={market} />
                  </div>
                )}
              </section>

              <aside className="hidden lg:flex lg:col-span-4">
                <div className="w-full h-fit sticky top-28 rounded-2xl border border-border/50 bg-card p-5 space-y-4">
                  <p className="text-sm text-muted-foreground">Market Snapshot</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Volume</span>
                      <span className="font-medium">{market.totalVolume}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ends</span>
                      <span className="font-medium">
                        {new Date(market.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Outcomes</span>
                      <span className="font-medium">{market.outcomes.length}</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </Page.Main>
    </Page>
  );
}
