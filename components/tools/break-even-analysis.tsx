"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"

interface BreakEvenData {
  fixedCosts: number
  variableCostPerUnit: number
  pricePerUnit: number
}

export function BreakEvenAnalysis() {
  const [data, setData] = useState<BreakEvenData>({
    fixedCosts: 0,
    variableCostPerUnit: 0,
    pricePerUnit: 0,
  })

  const contributionMargin = data.pricePerUnit - data.variableCostPerUnit
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(data.fixedCosts / contributionMargin) : 0
  const breakEvenRevenue = breakEvenUnits * data.pricePerUnit
  const contributionMarginRatio = data.pricePerUnit > 0 ? (contributionMargin / data.pricePerUnit) * 100 : 0

  const downloadAnalysis = () => {
    const content = `Break-Even Analysis

INPUTS
Fixed Costs: $${data.fixedCosts.toFixed(2)}
Variable Cost per Unit: $${data.variableCostPerUnit.toFixed(2)}
Price per Unit: $${data.pricePerUnit.toFixed(2)}

CALCULATIONS
Contribution Margin: $${contributionMargin.toFixed(2)}
Contribution Margin Ratio: ${contributionMarginRatio.toFixed(2)}%

BREAK-EVEN POINT
Units: ${breakEvenUnits}
Revenue: $${breakEvenRevenue.toFixed(2)}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "break-even-analysis.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Break-Even Analysis</h1>
        <p className="text-muted-foreground">Calculate your break-even point</p>
      </div>

      <Card className="p-8 mb-8">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold mb-2 block">Fixed Costs ($)</label>
            <Input
              type="number"
              value={data.fixedCosts}
              onChange={(e) => setData((prev) => ({ ...prev, fixedCosts: Number(e.target.value) }))}
              placeholder="0"
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground mt-1">Rent, salaries, insurance, etc.</p>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Variable Cost per Unit ($)</label>
            <Input
              type="number"
              value={data.variableCostPerUnit}
              onChange={(e) => setData((prev) => ({ ...prev, variableCostPerUnit: Number(e.target.value) }))}
              placeholder="0"
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground mt-1">Materials, labor, shipping, etc.</p>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Price per Unit ($)</label>
            <Input
              type="number"
              value={data.pricePerUnit}
              onChange={(e) => setData((prev) => ({ ...prev, pricePerUnit: Number(e.target.value) }))}
              placeholder="0"
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground mt-1">Selling price per unit</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="p-6 bg-accent/10 border-accent">
          <p className="text-sm text-muted-foreground mb-2">Break-Even Units</p>
          <p className="text-4xl font-bold text-accent">{breakEvenUnits}</p>
          <p className="text-xs text-muted-foreground mt-2">units to break even</p>
        </Card>

        <Card className="p-6 bg-accent/10 border-accent">
          <p className="text-sm text-muted-foreground mb-2">Break-Even Revenue</p>
          <p className="text-4xl font-bold text-accent">${breakEvenRevenue.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-2">revenue needed</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Contribution Margin</p>
          <p className="text-2xl font-bold">${contributionMargin.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-2">per unit</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Contribution Margin Ratio</p>
          <p className="text-2xl font-bold">{contributionMarginRatio.toFixed(2)}%</p>
          <p className="text-xs text-muted-foreground mt-2">of revenue</p>
        </Card>
      </div>

      <Button onClick={downloadAnalysis} size="lg" className="gap-2 w-full">
        <Download className="h-4 w-4" />
        Download Analysis
      </Button>
    </div>
  )
}
