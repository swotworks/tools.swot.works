"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download } from "lucide-react"

interface PricingStrategyData {
  model: string
  tiers: string
  positioning: string
  justification: string
  competitors: string
  implementation: string
}

export function PricingStrategy() {
  const [data, setData] = useState<PricingStrategyData>({
    model: "",
    tiers: "",
    positioning: "",
    justification: "",
    competitors: "",
    implementation: "",
  })

  const downloadStrategy = () => {
    const content = `Pricing Strategy

PRICING MODEL
${data.model}

PRICING TIERS
${data.tiers}

MARKET POSITIONING
${data.positioning}

JUSTIFICATION
${data.justification}

COMPETITOR ANALYSIS
${data.competitors}

IMPLEMENTATION PLAN
${data.implementation}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "pricing-strategy.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Pricing Strategy</h1>
        <p className="text-muted-foreground">Develop your pricing strategy</p>
      </div>

      <div className="space-y-6 mb-8">
        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Pricing Model</label>
          <Textarea
            value={data.model}
            onChange={(e) => setData((prev) => ({ ...prev, model: e.target.value }))}
            placeholder="e.g., Subscription, Freemium, Usage-based"
            className="min-h-20 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Pricing Tiers</label>
          <Textarea
            value={data.tiers}
            onChange={(e) => setData((prev) => ({ ...prev, tiers: e.target.value }))}
            placeholder="Describe your pricing tiers and features"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Market Positioning</label>
          <Textarea
            value={data.positioning}
            onChange={(e) => setData((prev) => ({ ...prev, positioning: e.target.value }))}
            placeholder="How are you positioned vs competitors?"
            className="min-h-20 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Justification</label>
          <Textarea
            value={data.justification}
            onChange={(e) => setData((prev) => ({ ...prev, justification: e.target.value }))}
            placeholder="Why is this pricing justified?"
            className="min-h-20 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Competitor Analysis</label>
          <Textarea
            value={data.competitors}
            onChange={(e) => setData((prev) => ({ ...prev, competitors: e.target.value }))}
            placeholder="How do competitors price their offerings?"
            className="min-h-20 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Implementation Plan</label>
          <Textarea
            value={data.implementation}
            onChange={(e) => setData((prev) => ({ ...prev, implementation: e.target.value }))}
            placeholder="How will you implement this pricing?"
            className="min-h-20 resize-none"
          />
        </Card>
      </div>

      <Button onClick={downloadStrategy} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download Strategy
      </Button>
    </div>
  )
}
