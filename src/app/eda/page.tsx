import { HistogramChart } from "@/components/eda/histogram-chart"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  readEdaReport,
  type CorrelationStat,
  type EdaReport,
  type FeatureHighlight,
  type Insight,
  type InsightImpact,
  type OverviewMetric,
  type TrendDirection,
} from "@/lib/eda"
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CalendarClock,
  Database,
  KeyRound,
  Layers,
  Minus,
  Timer,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const metricIconMap: Record<string, LucideIcon> = {
  records: Database,
  features: Layers,
  missing: AlertTriangle,
  runtime: Timer,
}

const trendIconMap: Record<TrendDirection, LucideIcon> = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
}

const trendColorMap: Record<TrendDirection, string> = {
  up: "text-emerald-600",
  down: "text-rose-500",
  flat: "text-muted-foreground",
}

const impactStyles: Record<InsightImpact, string> = {
  opportunity: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  risk: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  watch: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
}

const numberFormatter = new Intl.NumberFormat("en-US")
const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
})
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})

function MetricCard({ metric }: { metric: OverviewMetric }) {
  const Icon = metricIconMap[metric.id] ?? Activity
  const TrendIcon = metric.trend ? trendIconMap[metric.trend] : null
  const trendColor = metric.trend ? trendColorMap[metric.trend] : "text-muted-foreground"

  return (
    <Card className="h-full gap-4 py-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-3">
        <div className="flex items-baseline gap-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
          <span className="text-4xl font-semibold leading-none tracking-tight text-foreground">
            {metric.value}
          </span>
        </div>
        <span className="rounded-full bg-primary/10 p-2 text-primary">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      </CardHeader>
      {metric.change ? (
        <CardContent className="px-4 pb-4 pt-0">
          <div className="flex items-center gap-2 text-sm">
            {TrendIcon ? <TrendIcon className={cn("h-4 w-4", trendColor)} aria-hidden /> : null}
            <span className={cn("font-medium", trendColor)}>{metric.change}</span>
          </div>
        </CardContent>
      ) : null}
    </Card>
  )
}

function InsightItem({ insight }: { insight: Insight }) {
  return (
    <li className="rounded-xl border border-border/60 bg-muted/10 p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-base font-medium">{insight.title}</span>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
            impactStyles[insight.impact]
          )}
        >
          {insight.impact}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{insight.description}</p>
    </li>
  )
}

function CorrelationItem({ stat }: { stat: CorrelationStat }) {
  const value = stat.value
  const positive = value >= 0
  const percentWidth = Math.min(Math.abs(value) * 100, 100)

  return (
    <li className="space-y-3 rounded-lg border border-border/60 bg-background p-4">
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-foreground">{stat.feature}</span>
        <span className={positive ? "text-emerald-600" : "text-rose-500"}>
          {value.toFixed(2)}
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted">
        <div
          className={cn("h-2 rounded-full", positive ? "bg-emerald-500" : "bg-rose-500")}
          style={{ width: `${percentWidth}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Paired with <code className="rounded bg-muted px-1.5 py-0.5 text-[11px]">{stat.pairedWith}</code>
      </p>
    </li>
  )
}

function FeatureHighlightItem({ highlight }: { highlight: FeatureHighlight }) {
  const positive = highlight.trend >= 0
  const changeLabel = `${positive ? "+" : ""}${Math.round(highlight.trend * 100)}%`

  return (
    <li className="space-y-2 rounded-lg border border-border/60 bg-muted/5 p-4">
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-foreground">{highlight.feature}</span>
        <span className={positive ? "text-emerald-600" : "text-rose-500"}>{changeLabel}</span>
      </div>
      <p className="text-xs text-muted-foreground">{highlight.note}</p>
    </li>
  )
}

export default async function EdaPage() {
  const report: EdaReport = await readEdaReport()
  const lastUpdated = dateFormatter.format(new Date(report.dataset.lastUpdated))

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="grid gap-3 text-center sm:text-left">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Exploratory data analysis
        </span>
        <h1 className="text-3xl font-semibold sm:text-4xl">EDA Dashboard</h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          Snapshot of the {report.dataset.name.toLowerCase()} used for feature discovery, data quality checks,
          and modeling readiness.
        </p>
      </header>

      <section className="grid gap-4">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1">
            <CalendarClock className="h-4 w-4" aria-hidden />
            Updated {lastUpdated}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1">
            <KeyRound className="h-4 w-4" aria-hidden />
            Primary key <code className="font-mono">{report.dataset.primaryKey}</code>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1">
            <Layers className="h-4 w-4" aria-hidden />
            {report.dataset.numericColumns} numeric · {report.dataset.categoricalColumns} categorical · {report.dataset.dateColumns} date
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1">
            <AlertTriangle className="h-4 w-4 text-amber-500" aria-hidden />
            {report.dataset.missingCellsPct.toFixed(1)}% missing cells
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {report.overviewMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Dataset snapshot</CardTitle>
            <CardDescription>
              Contextual stats for {report.dataset.name} to orient your review.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <div className="space-y-1">
                <dt className="text-muted-foreground">Total rows</dt>
                <dd className="text-base font-medium text-foreground">
                  {numberFormatter.format(report.dataset.rows)}
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-muted-foreground">Total columns</dt>
                <dd className="text-base font-medium text-foreground">
                  {numberFormatter.format(report.dataset.columns)}
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-muted-foreground">Missing cells</dt>
                <dd className="text-base font-medium text-foreground">
                  {report.dataset.missingCellsPct.toFixed(1)}%
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-muted-foreground">Outliers flagged</dt>
                <dd className="text-base font-medium text-foreground">
                  {numberFormatter.format(report.quality.outliersFlagged)}
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-muted-foreground">Duplicates</dt>
                <dd className="text-base font-medium text-foreground">
                  {numberFormatter.format(report.quality.duplicateRows)}
                </dd>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <dt className="text-muted-foreground">Description</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  {report.dataset.description}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Quick selectors</CardTitle>
            <CardDescription>
              Mock filter chips that reflect the typical analysis slice controls.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Segments
              </h3>
              <div className="flex flex-wrap gap-2">
                {report.filters.segments.map((segment, index) => (
                  <Button
                    key={segment}
                    type="button"
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    className={cn(index === 0 ? "shadow-sm" : "border-dashed")}
                  >
                    {segment}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Timeframe
              </h3>
              <div className="flex flex-wrap gap-2">
                {report.filters.timeRanges.map((range, index) => (
                  <span
                    key={range}
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
                      index === 0
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border/60 bg-muted/40 text-muted-foreground"
                    )}
                  >
                    {range}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Focus features
              </h3>
              <div className="flex flex-wrap gap-2">
                {report.filters.focusFeatures.map((feature) => (
                  <code
                    key={feature}
                    className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium"
                  >
                    {feature}
                  </code>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Descriptive statistics</CardTitle>
            <CardDescription>
              Summary of core numerical and categorical variables.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Numerical features</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="px-3 py-2 font-medium">Feature</th>
                      <th className="px-3 py-2 font-medium">Mean</th>
                      <th className="px-3 py-2 font-medium">Median</th>
                      <th className="px-3 py-2 font-medium">Std</th>
                      <th className="px-3 py-2 font-medium">Min</th>
                      <th className="px-3 py-2 font-medium">Max</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.summaryStats.numerical.map((row) => (
                      <tr key={row.feature} className="border-t border-border/60">
                        <td className="px-3 py-2 font-medium text-foreground">{row.feature}</td>
                        <td className="px-3 py-2">{row.mean.toFixed(1)}</td>
                        <td className="px-3 py-2">{row.median.toFixed(1)}</td>
                        <td className="px-3 py-2">{row.std.toFixed(1)}</td>
                        <td className="px-3 py-2">{row.min.toFixed(1)}</td>
                        <td className="px-3 py-2">{row.max.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Categorical features</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="px-3 py-2 font-medium">Feature</th>
                      <th className="px-3 py-2 font-medium">Top category</th>
                      <th className="px-3 py-2 font-medium">Share</th>
                      <th className="px-3 py-2 font-medium">Unique</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.summaryStats.categorical.map((row) => (
                      <tr key={row.feature} className="border-t border-border/60">
                        <td className="px-3 py-2 font-medium text-foreground">{row.feature}</td>
                        <td className="px-3 py-2">{row.topCategory}</td>
                        <td className="px-3 py-2">{percentFormatter.format(row.topPercent)}</td>
                        <td className="px-3 py-2">{row.uniqueCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Data quality checkpoints</CardTitle>
            <CardDescription>
              Highest missing columns and monitoring signals to track.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Missing value hotspots</h3>
              <ul className="space-y-2 text-sm">
                {report.quality.missingColumns.map((item) => (
                  <li key={item.column} className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{item.column}</span>
                    <span className="text-muted-foreground">{item.percent.toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border/50 bg-muted/20 p-4 text-sm">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Duplicate rows</div>
                <div className="mt-1 text-2xl font-semibold text-foreground">
                  {numberFormatter.format(report.quality.duplicateRows)}
                </div>
              </div>
              <div className="rounded-lg border border-border/50 bg-muted/20 p-4 text-sm">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Outliers flagged</div>
                <div className="mt-1 text-2xl font-semibold text-foreground">
                  {numberFormatter.format(report.quality.outliersFlagged)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Distribution snapshots</CardTitle>
            <CardDescription>
              Histogram bins for key numerical features to monitor skew and spread.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {report.histograms.map((histogram) => (
                <HistogramChart key={histogram.feature} histogram={histogram} />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Correlation highlights</CardTitle>
            <CardDescription>
              Strongest relationships relative to churn probability and revenue targets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {report.correlations.map((stat) => (
                <CorrelationItem key={`${stat.feature}-${stat.pairedWith}`} stat={stat} />
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Feature watchlist</CardTitle>
            <CardDescription>
              Trends worth monitoring before the next model training run.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {report.featureHighlights.map((highlight) => (
                <FeatureHighlightItem key={highlight.feature} highlight={highlight} />
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Narrative insights</CardTitle>
            <CardDescription>
              Plain-language takeaways to share with partners before deeper modeling.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {report.insights.map((insight) => (
                <InsightItem key={insight.title} insight={insight} />
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
