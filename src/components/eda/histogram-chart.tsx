"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { FeatureHistogram } from "@/lib/eda"
import { cn } from "@/lib/utils"

const numberFormatter = new Intl.NumberFormat("en-US")

const histogramChartConfig = {
  count: {
    label: "Records",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

interface HistogramChartProps {
  histogram: FeatureHistogram
  className?: string
}

export function HistogramChart({ histogram, className }: HistogramChartProps) {
  const totalRecords = histogram.bins.reduce((total, bin) => total + bin.count, 0)
  const data = histogram.bins.map((bin) => ({
    range: bin.range,
    count: bin.count,
  }))

  return (
    <div
      className={cn(
        "space-y-4 rounded-lg border border-border/60 bg-muted/10 p-4",
        className
      )}
    >
      <div className="flex items-center justify-between text-sm font-semibold text-foreground">
        <span>{histogram.feature}</span>
        <span className="text-xs font-medium text-muted-foreground">
          {numberFormatter.format(totalRecords)} records
        </span>
      </div>
      <ChartContainer
        className="aspect-[4/3] min-h-[260px]"
        config={histogramChartConfig}
      >
        <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            className="stroke-border/50"
          />
          <XAxis
            dataKey="range"
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            className="text-xs text-muted-foreground"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            width={42}
            tickFormatter={(value) => numberFormatter.format(Number(value))}
            className="text-xs text-muted-foreground"
          />
          <ChartTooltip
            cursor={{ fill: "hsl(var(--muted))" }}
            content={
              <ChartTooltipContent
                indicator="dot"
                labelFormatter={(label) => label as string}
                formatter={(value) =>
                  numberFormatter.format(typeof value === "number" ? value : Number(value))
                }
              />
            }
          />
          <Bar dataKey="count" fill="var(--color-count)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
