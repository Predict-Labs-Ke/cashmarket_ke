"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { ChartPoint } from "../types";

interface ChartProps {
  data: ChartPoint[];
  colors: string[];
  outcomeLabels?: string[];
}

export function PredictionChart({ data, colors, outcomeLabels = [] }: ChartProps) {
  // Transform data for recharts format
  const chartData = data.map((point) => {
    const transformed: Record<string, string | number> = { time: point.time };
    point.values.forEach((value, idx) => {
      transformed[`outcome${idx}`] = value;
    });
    return transformed;
  });

  // Build chart config dynamically based on number of outcomes
  const chartConfig: ChartConfig = {};
  const numOutcomes = data[0]?.values.length || 0;
  
  for (let i = 0; i < numOutcomes; i++) {
    chartConfig[`outcome${i}`] = {
      label: outcomeLabels[i] || `Outcome ${i + 1}`,
      color: colors[i] || `hsl(${i * 120}, 70%, 50%)`,
    };
  }

  return (
    <div className="px-4 py-6 space-y-4 w-full">
      {/* Legend */}
      <div className="flex gap-4 flex-wrap justify-center">
        {colors.slice(0, numOutcomes).map((color, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm text-muted-foreground">
              {outcomeLabels[idx] || `Outcome ${idx + 1}`}:{" "}
              <span className="font-medium text-foreground">
                {data[data.length - 1]?.values[idx]?.toFixed(1)}%
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 0,
            right: 12,
            top: 12,
            bottom: 12,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/50" />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            className="text-xs"
            tick={{ fill: "var(--muted-foreground)" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            className="text-xs"
            tick={{ fill: "var(--muted-foreground)" }}
            width={45}
          />
          <ChartTooltip
            cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
            content={
              <ChartTooltipContent
                formatter={(value, name) => {
                  const idx = parseInt(String(name).replace("outcome", ""));
                  return (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colors[idx] }}
                      />
                      <span>{outcomeLabels[idx] || `Outcome ${idx + 1}`}</span>
                      <span className="font-medium ml-auto">{Number(value).toFixed(1)}%</span>
                    </div>
                  );
                }}
              />
            }
          />
          {Array.from({ length: numOutcomes }).map((_, idx) => (
            <Line
              key={idx}
              dataKey={`outcome${idx}`}
              type="monotone"
              stroke={colors[idx]}
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                fill: colors[idx],
                stroke: "var(--background)",
                strokeWidth: 2,
              }}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </div>
  );
}
