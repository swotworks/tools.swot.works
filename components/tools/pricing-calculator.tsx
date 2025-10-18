"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"

interface PricingCalcData {
  costPerUnit: number
  desiredMargin: number
  quantity: number
}

export function PricingCalculator() {
  const [data, setData] = useState<PricingCalcData>({
    costPerUnit: 0,
    desiredMargin: 50,
    quantity: 1,
  })

  const pricePerUnit = data.costPerUnit / (1 - data.desiredMargin / 100)
  const profitPerUnit = pricePerUnit - data.costPerUnit
  const totalRevenue = pricePerUnit * data.quantity
  const totalCost = data.costPerUnit * data.quantity
  const totalProfit = profitPerUnit * data.quantity

  const downloadCalculation = () => {
    const content = `Pricing Calculator

INPUTS
Cost per Unit: $${data.costPerUnit.toFixed(2)}
Desired Margin: ${data.desiredMargin}%
Quantity: ${data.quantity}

CALCULATIONS
Price per Unit: $${pricePerUnit.toFixed(2)}
Profit per Unit: $${profitPerUnit.toFixed(2)}

FOR ${data.quantity} UNITS
Total Revenue: $${totalRevenue.toFixed(2)}
Total Cost: $${totalCost.toFixed(2)}
Total Profit: $${totalProfit.toFixed(2)}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "pricing-calculation.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Pricing Calculator</h1>
        <p className="text-muted-foreground">Calculate optimal pricing based on costs and margins</p>
      </div>

      <Card className="p-8 mb-8">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold mb-2 block">Cost per Unit ($)</label>
            <Input
              type="number"
              value={data.costPerUnit}
              onChange={(e) => setData((prev) => ({ ...prev, costPerUnit: Number(e.target.value) }))}
              placeholder="0"
              className="text-lg"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Desired Margin (%)</label>
            <Input
              type="number"
              value={data.desiredMargin}
              onChange={(e) => setData((prev) => ({ ...prev, desiredMargin: Number(e.target.value) }))}
              placeholder="50"
              className="text-lg"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Quantity</label>
            <Input
              type="number"
              value={data.quantity}
              onChange={(e) => setData((prev) => ({ ...prev, quantity: Number(e.target.value) }))}
              placeholder="1"
              className="text-lg"
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="p-6 bg-accent/10 border-accent">
          <p className="text-sm text-muted-foreground mb-2">Price per Unit</p>
          <p className="text-3xl font-bold text-accent">${pricePerUnit.toFixed(2)}</p>
        </Card>

        <Card className="p-6 bg-accent/10 border-accent">
          <p className="text-sm text-muted-foreground mb-2">Profit per Unit</p>
          <p className="text-3xl font-bold text-accent">${profitPerUnit.toFixed(2)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
          <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Cost</p>
          <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Profit</p>
          <p className="text-2xl font-bold text-green-500">${totalProfit.toFixed(2)}</p>
        </Card>
      </div>

      <Button onClick={downloadCalculation} size="lg" className="gap-2 w-full">
        <Download className="h-4 w-4" />
        Download Calculation
      </Button>
    </div>
  )
}
