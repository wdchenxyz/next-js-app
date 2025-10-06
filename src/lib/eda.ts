import { readFile } from "fs/promises"
import { join } from "path"

export type TrendDirection = "up" | "down" | "flat"

export interface OverviewMetric {
  id: string
  label: string
  value: string
  change?: string
  trend?: TrendDirection
}

export interface DatasetSummary {
  name: string
  description: string
  rows: number
  columns: number
  numericColumns: number
  categoricalColumns: number
  dateColumns: number
  missingCellsPct: number
  lastUpdated: string
  primaryKey: string
}

export interface EdaFilters {
  segments: string[]
  timeRanges: string[]
  focusFeatures: string[]
}

export interface MissingColumnStat {
  column: string
  percent: number
}

export interface DataQualitySummary {
  missingColumns: MissingColumnStat[]
  duplicateRows: number
  outliersFlagged: number
}

export interface NumericalSummary {
  feature: string
  mean: number
  median: number
  std: number
  min: number
  max: number
}

export interface CategoricalSummary {
  feature: string
  topCategory: string
  topPercent: number
  uniqueCount: number
}

export interface SummaryStatistics {
  numerical: NumericalSummary[]
  categorical: CategoricalSummary[]
}

export interface CorrelationStat {
  feature: string
  value: number
  pairedWith: string
}

export type InsightImpact = "risk" | "opportunity" | "watch"

export interface Insight {
  title: string
  description: string
  impact: InsightImpact
}

export interface FeatureHighlight {
  feature: string
  trend: number
  note: string
}

export interface HistogramBin {
  range: string
  count: number
}

export interface FeatureHistogram {
  feature: string
  bins: HistogramBin[]
}

export interface EdaReport {
  dataset: DatasetSummary
  overviewMetrics: OverviewMetric[]
  filters: EdaFilters
  quality: DataQualitySummary
  summaryStats: SummaryStatistics
  histograms: FeatureHistogram[]
  correlations: CorrelationStat[]
  insights: Insight[]
  featureHighlights: FeatureHighlight[]
}

const dataFilePath = join(process.cwd(), "data", "eda-report.json")

export async function readEdaReport(): Promise<EdaReport> {
  const raw = await readFile(dataFilePath, "utf-8")
  const parsed = JSON.parse(raw) as EdaReport
  return parsed
}
