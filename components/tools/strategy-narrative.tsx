"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download } from "lucide-react"

interface NarrativeData {
  context: string
  challenge: string
  solution: string
  impact: string
  nextSteps: string
}

export function StrategyNarrative() {
  const [data, setData] = useState<NarrativeData>({
    context: "",
    challenge: "",
    solution: "",
    impact: "",
    nextSteps: "",
  })

  const downloadNarrative = () => {
    const content = `Strategy Narrative

CONTEXT
${data.context}

CHALLENGE
${data.challenge}

SOLUTION
${data.solution}

EXPECTED IMPACT
${data.impact}

NEXT STEPS
${data.nextSteps}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "strategy-narrative.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Strategy Narrative Builder</h1>
        <p className="text-muted-foreground">Build a compelling strategy narrative</p>
      </div>

      <div className="space-y-6 mb-8">
        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Context</label>
          <Textarea
            value={data.context}
            onChange={(e) => setData((prev) => ({ ...prev, context: e.target.value }))}
            placeholder="What is the current situation?"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Challenge</label>
          <Textarea
            value={data.challenge}
            onChange={(e) => setData((prev) => ({ ...prev, challenge: e.target.value }))}
            placeholder="What challenge are we facing?"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Solution</label>
          <Textarea
            value={data.solution}
            onChange={(e) => setData((prev) => ({ ...prev, solution: e.target.value }))}
            placeholder="What is our solution?"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Expected Impact</label>
          <Textarea
            value={data.impact}
            onChange={(e) => setData((prev) => ({ ...prev, impact: e.target.value }))}
            placeholder="What impact will this have?"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Next Steps</label>
          <Textarea
            value={data.nextSteps}
            onChange={(e) => setData((prev) => ({ ...prev, nextSteps: e.target.value }))}
            placeholder="What are the next steps?"
            className="min-h-24 resize-none"
          />
        </Card>
      </div>

      <Button onClick={downloadNarrative} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download Narrative
      </Button>
    </div>
  )
}
