"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download } from "lucide-react"

interface BriefData {
  objective: string
  keyInitiatives: string
  successMetrics: string
  timeline: string
  resources: string
  risks: string
}

export function StrategyBrief() {
  const [data, setData] = useState<BriefData>({
    objective: "",
    keyInitiatives: "",
    successMetrics: "",
    timeline: "",
    resources: "",
    risks: "",
  })

  const downloadBrief = () => {
    const content = `1-Page Strategy Brief

OBJECTIVE
${data.objective}

KEY INITIATIVES
${data.keyInitiatives}

SUCCESS METRICS
${data.successMetrics}

TIMELINE
${data.timeline}

RESOURCES REQUIRED
${data.resources}

RISKS & MITIGATION
${data.risks}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "strategy-brief.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">1-Page Strategy Brief</h1>
        <p className="text-muted-foreground">Capture your strategy on a single page</p>
      </div>

      <div className="space-y-6 mb-8">
        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Strategic Objective</label>
          <Textarea
            value={data.objective}
            onChange={(e) => setData((prev) => ({ ...prev, objective: e.target.value }))}
            placeholder="What is your primary strategic objective?"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Key Initiatives</label>
          <Textarea
            value={data.keyInitiatives}
            onChange={(e) => setData((prev) => ({ ...prev, keyInitiatives: e.target.value }))}
            placeholder="What are the main initiatives to achieve this objective?"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Success Metrics</label>
          <Textarea
            value={data.successMetrics}
            onChange={(e) => setData((prev) => ({ ...prev, successMetrics: e.target.value }))}
            placeholder="How will you measure success?"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Timeline</label>
          <Textarea
            value={data.timeline}
            onChange={(e) => setData((prev) => ({ ...prev, timeline: e.target.value }))}
            placeholder="What is the timeline for execution?"
            className="min-h-20 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Resources Required</label>
          <Textarea
            value={data.resources}
            onChange={(e) => setData((prev) => ({ ...prev, resources: e.target.value }))}
            placeholder="What resources are needed?"
            className="min-h-20 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Risks & Mitigation</label>
          <Textarea
            value={data.risks}
            onChange={(e) => setData((prev) => ({ ...prev, risks: e.target.value }))}
            placeholder="What are the key risks and how will you mitigate them?"
            className="min-h-20 resize-none"
          />
        </Card>
      </div>

      <Button onClick={downloadBrief} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download Brief
      </Button>
    </div>
  )
}
