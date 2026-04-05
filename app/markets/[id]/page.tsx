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
  const market = marketDetails[id] || marketDetails["1"]; // Fallback to prevent crash if market not found

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
      <Page.Header className="transition-colors border-b! border-border/50! px-2 py-3 bg-background! backdrop-blur-sm z-10 sticky top-0">
        <DetailHeader title={market.title} image={market.image} />
      </Page.Header>

      <Page.Main className="flex flex-col items-center justify-start gap-8 pb-24! bg-background text-foreground transition-colors w-full p-0!">
        <div className="w-full">
          <PredictionChart
            data={market.chartData}
            colors={CHART_COLORS}
            outcomes={market.outcomes}
          />
        </div>

        <div className=" w-full px-4">
          <TimeframeSelector
            options={market.timeframeOptions}
            marketId={id}
            activeTimeframe={timeframe}
            activeTab={activeTab}
          />
        </div>

        {isResolved ? (
          <ResolvedMarket market={market} />
        ) : (
          <>
            <div className="sticky top-0 border-b border-border/50 w-full p-2 justify-center flex items-center backdrop-blur-sm z-10 bg-background">
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
              <div className="w-full border-t border-border/50! px-4 justify-center flex items-center backdrop-blur-sm">
                <AboutSection market={market} />
              </div>
            )}
          </>
        )}
      </Page.Main>
    </Page>
  );
}
