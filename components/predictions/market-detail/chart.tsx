"use client";

import { useMemo, useState } from "react";
import type { ChartPoint, PredictionOutcome } from "../types";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartProps {
  data: ChartPoint[];
  colors: string[];
  outcomes: PredictionOutcome[];
}

export function PredictionChart({ data, colors, outcomes }: ChartProps) {
  const [hiddenLines, setHiddenLines] = useState<Record<string, boolean>>({});

  // Map the raw data array [93, 7, 0.5] into object keys defined by the outcomes
  const chartData = useMemo(() => {
    return data.map((d) => {
      const obj: any = { time: d.time };
      d.values.forEach((v: number, idx: number) => {
        if (outcomes[idx]) obj[outcomes[idx].label] = v;
      });
      return obj;
    });
  }, [data, outcomes]);

  // Generate chart config dynamically from outcomes
  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    outcomes.forEach((outcome, idx) => {
      config[outcome.label] = {
        label: outcome.label,
        color: colors[idx % colors.length],
      };
    });
    return config;
  }, [outcomes, colors]);

  

  return (
    <div className="w-full flex flex-col gap-6 pt-4">
      {/* Top Chart Header / Simplistic Legend for active views */}
      <div className="px-4">
        {outcomes.map(
          (outcome, idx) =>
            !hiddenLines[outcome.label] && (
              <div key={idx} className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-2xl"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                />
                <p className="text-foreground/90 text-sm">
                  {outcome.label}
                 
                </p>
                 <p className="font-semibold text-foreground ml-1 text-sm">
                    {data[data.length - 1]?.values[idx]?.toFixed(1)}%
                  </p>
              </div>
            )
        )}
      </div>

      {/* Main Chart Area */}
      <div className="h-[250px] w-full px-4">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            {/* YAxis on right to mimic Polymarket style percentages */}
            <YAxis
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "#666", fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(val) => `${val}%`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="bg-card! border-border/50! text-foreground! rounded-xl! p-2!"
                  hideLabel
                  hideIndicator

                  
                />

              

              }
            />
            {outcomes.map((outcome, idx) => (
              <Line
                key={outcome.label}
                type="monotone" // Use monotone curve as requested
                dataKey={outcome.label}
                strokeWidth={2}

                dot={false}
                hide={hiddenLines[outcome.label]}
                style={{ stroke: colors[idx % colors.length] }} // Overrides class stroke
                        



              />
            ))}
          </LineChart>
        </ChartContainer>
    </div>

      </div>


  );
}
