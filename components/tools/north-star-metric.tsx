"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"

interface NorthStarData {
  metric: string
  definition: string
  rationale: string
  currentValue: string
  targetValue: string
  initiatives: string
}

export function NorthStarMetric() {
  const [data, setData] = useState<NorthStarData>({
    metric: "",
    definition: "",
    rationale: "",
    currentValue: "",
    targetValue: "",
    initiatives: "",
  })

  const downloadMetric = () => {
    const content = `North Star Metric

METRIC: ${data.metric}

DEFINITION
${data.definition}

RATIONALE
${data.rationale}

CURRENT VALUE: ${data.currentValue}
TARGET VALUE: ${data.targetValue}

KEY INITIATIVES
${data.initiatives}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "north-star-metric.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">North Star Metric</h1>
        <p className="text-muted-foreground">Define your company's primary success metric</p>
      </div>

      <div className="space-y-6 mb-8">
        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">North Star Metric</label>
          <Input
            value={data.metric}
            onChange={(e) => setData((prev) => ({ ...prev, metric: e.target.value }))}
            placeholder="e.g., Monthly Active Users, Customer Lifetime Value"
            className="text-lg font-bold"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Definition</label>
          <Textarea
            value={data.definition}
            onChange={(e) => setData((prev) => ({ ...prev, definition: e.target.value }))}
            placeholder="How is this metric defined and calculated?"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Rationale</label>
          <Textarea
            value={data.rationale}
            onChange={(e) => setData((prev) => ({ ...prev, rationale: e.target.value }))}
            placeholder="Why is this the right metric for your business?"
            className="min-h-24 resize-none"
          />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <label className="text-sm font-semibold mb-2 block">Current Value</label>
            <Input
              value={data.currentValue}
              onChange={(e) => setData((prev) => ({ ...prev, currentValue: e.target.value }))}
              placeholder="Current metric value"
            />
          </Card>

          <Card className="p-6">
            <label className="text-sm font-semibold mb-2 block">Target Value</label>
            <Input
              value={data.targetValue}
              onChange={(e) => setData((prev) => ({ ...prev, targetValue: e.target.value }))}
              placeholder="Target metric value"
            />
          </Card>
        </div>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Key Initiatives</label>
          <Textarea
            value={data.initiatives}
            onChange={(e) => setData((prev) => ({ ...prev, initiatives: e.target.value }))}
            placeholder="What initiatives will drive this metric?"
            className="min-h-24 resize-none"
          />
        </Card>
      </div>

      <Button onClick={downloadMetric} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download Metric
      </Button>
    </div>
  )
}
