"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"

interface UnitEconomicsData {
  arpu: number
  cac: number
  ltv: number
  churnRate: number
  avgLifetime: number
}

export function UnitEconomics() {
  const [data, setData] = useState<UnitEconomicsData>({
    arpu: 0,
    cac: 0,
    ltv: 0,
    churnRate: 0,
    avgLifetime: 0,
  })

  const calculatedLTV = data.churnRate > 0 ? data.arpu / (data.churnRate / 100) : 0
  const ltv = data.ltv || calculatedLTV
  const ltv_cac_ratio = data.cac > 0 ? ltv / data.cac : 0
  const paybackPeriod = data.arpu > 0 ? Math.ceil(data.cac / data.arpu) : 0
  const monthlyRetention = 100 - data.churnRate

  const downloadAnalysis = () => {
    const content = `Unit Economics

INPUTS
ARPU (Average Revenue Per User): $${data.arpu.toFixed(2)}
CAC (Customer Acquisition Cost): $${data.cac.toFixed(2)}
Monthly Churn Rate: ${data.churnRate.toFixed(2)}%
Average Customer Lifetime: ${data.avgLifetime} months

CALCULATIONS
LTV (Lifetime Value): $${ltv.toFixed(2)}
LTV:CAC Ratio: ${ltv_cac_ratio.toFixed(2)}x
Payback Period: ${paybackPeriod} months
Monthly Retention Rate: ${monthlyRetention.toFixed(2)}%

ANALYSIS
${ltv_cac_ratio >= 3 ? "✓ Healthy unit economics (LTV:CAC >= 3x)" : ltv_cac_ratio >= 1 ? "⚠ Acceptable but needs improvement" : "✗ Poor unit economics (LTV:CAC < 1x)"}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "unit-economics.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Unit Economics</h1>
        <p className="text-muted-foreground">Analyze your business unit economics</p>
      </div>

      <Card className="p-8 mb-8">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold mb-2 block">ARPU - Average Revenue Per User ($)</label>
            <Input
              type="number"
              value={data.arpu}
              onChange={(e) => setData((prev) => ({ ...prev, arpu: Number(e.target.value) }))}
              placeholder="0"
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground mt-1">Monthly revenue per user</p>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">CAC - Customer Acquisition Cost ($)</label>
            <Input
              type="number"
              value={data.cac}
              onChange={(e) => setData((prev) => ({ ...prev, cac: Number(e.target.value) }))}
              placeholder="0"
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground mt-1">Cost to acquire one customer</p>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Monthly Churn Rate (%)</label>
            <Input
              type="number"
              value={data.churnRate}
              onChange={(e) => setData((prev) => ({ ...prev, churnRate: Number(e.target.value) }))}
              placeholder="0"
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground mt-1">Percentage of customers lost monthly</p>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Average Customer Lifetime (months)</label>
            <Input
              type="number"
              value={data.avgLifetime}
              onChange={(e) => setData((prev) => ({ ...prev, avgLifetime: Number(e.target.value) }))}
              placeholder="0"
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground mt-1">Expected months as customer</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="p-6 bg-accent/10 border-accent">
          <p className="text-sm text-muted-foreground mb-2">LTV (Lifetime Value)</p>
          <p className="text-3xl font-bold text-accent">${ltv.toFixed(2)}</p>
        </Card>

        <Card className="p-6 bg-accent/10 border-accent">
          <p className="text-sm text-muted-foreground mb-2">LTV:CAC Ratio</p>
          <p
            className={`text-3xl font-bold ${ltv_cac_ratio >= 3 ? "text-green-500" : ltv_cac_ratio >= 1 ? "text-yellow-500" : "text-red-500"}`}
          >
            {ltv_cac_ratio.toFixed(2)}x
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Payback Period</p>
          <p className="text-2xl font-bold">{paybackPeriod} months</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Monthly Retention Rate</p>
          <p className="text-2xl font-bold">{monthlyRetention.toFixed(2)}%</p>
        </Card>
      </div>

      <Card className="p-6 mb-8 bg-muted">
        <p className="text-sm font-semibold mb-2">Health Assessment</p>
        <p className="text-sm">
          {ltv_cac_ratio >= 3
            ? "✓ Excellent unit economics. Your LTV:CAC ratio is healthy."
            : ltv_cac_ratio >= 1
              ? "⚠ Acceptable but needs improvement. Aim for LTV:CAC >= 3x."
              : "✗ Poor unit economics. LTV is less than CAC. Review your pricing and retention."}
        </p>
      </Card>

      <Button onClick={downloadAnalysis} size="lg" className="gap-2 w-full">
        <Download className="h-4 w-4" />
        Download Analysis
      </Button>
    </div>
  )
}
