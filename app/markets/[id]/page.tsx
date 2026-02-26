
import { DetailHeader } from "@/components/predictions/market-detail/detail-header";
import { PredictionChart } from "@/components/predictions/market-detail/chart";
import { TimeframeSelector } from "@/components/predictions/market-detail/timeframe-selector";
import { OutcomeTabs } from "@/components/predictions/market-detail/outcome-tabs";
import { OutcomeCard } from "@/components/predictions/market-detail/outcome-card";
import { ResolvedMarket } from "@/components/predictions/market-detail/resolved-market";
import { marketDetails } from "@/components/predictions/data";




import { redirect } from "next/navigation";
import { Page } from "@/components/pageLayout";


interface PageProps {
  params: Promise<{ id: string }>;
  searchParams:Promise<{ category?: "outcomes" | "about" , timeframe?: string }>;
  
}

const CHART_COLORS = ["#0066FF", "#FF3366", "#00DD77"];

export default async function PredictionDetailPage({ params, searchParams }: PageProps) {
    const {id}= await params;
    const{ category: activeTab, timeframe} = await searchParams
  const market = marketDetails[id];
  
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
      <Page.Header className="p-0 bg-background text-foreground transition-colors border-b! border-border!">
      
        <DetailHeader title={market.title} image={market.image} />
      </Page.Header>

    
      <Page.Main className="flex flex-col items-center justify-start gap-8 mb-16 bg-background text-foreground transition-colors w-full p-0!">
        <PredictionChart 
          data={market.chartData} 
          colors={CHART_COLORS} 
          outcomeLabels={market.outcomes.map(o => o.label)}
        />

        <TimeframeSelector
          options={market.timeframeOptions}
          marketId={id}
            activeTimeframe={timeframe || "1d"}
        />

        {isResolved ? (
          <ResolvedMarket market={market} />
        ) : (
          <>
            <OutcomeTabs activeTab={activeTab || "outcomes"} id={
id
            } timeframe={timeframe} />

            {activeTab === "outcomes" && (
              <div className="px-4 py-6 space-y-4 w-full">
                {market.outcomes.map((outcome, idx) => (
                  <OutcomeCard
                    key={idx}
                    outcome={outcome}
                    volume={market.totalVolume}
                   
                  />
                ))}
              </div>
            )}

            {activeTab === "about" && (
              <div className="px-4 py-6 text-[14px] text-zinc-400">
                <p>Market details and resolution criteria would appear here.</p>
              </div>
            )}
          </>
        )}
      </Page.Main>
    </Page>
  );
}

