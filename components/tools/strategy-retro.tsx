"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download } from "lucide-react"

interface RetroData {
  whatWentWell: string
  whatDidntWork: string
  surprises: string
  learnings: string
  improvements: string
}

export function StrategyRetro() {
  const [data, setData] = useState<RetroData>({
    whatWentWell: "",
    whatDidntWork: "",
    surprises: "",
    learnings: "",
    improvements: "",
  })

  const downloadRetro = () => {
    const content = `Strategy Retrospective

WHAT WENT WELL
${data.whatWentWell}

WHAT DIDN'T WORK
${data.whatDidntWork}

SURPRISES
${data.surprises}

KEY LEARNINGS
${data.learnings}

IMPROVEMENTS FOR NEXT TIME
${data.improvements}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "strategy-retro.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Strategy Retro Board</h1>
        <p className="text-muted-foreground">Reflect on your strategy execution</p>
      </div>

      <div className="space-y-6 mb-8">
        <Card className="p-6 border-green-500/50">
          <label className="text-sm font-semibold mb-2 block text-green-600">What Went Well?</label>
          <Textarea
            value={data.whatWentWell}
            onChange={(e) => setData((prev) => ({ ...prev, whatWentWell: e.target.value }))}
            placeholder="What successes did we achieve?"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6 border-red-500/50">
          <label className="text-sm font-semibold mb-2 block text-red-600">What Didn't Work?</label>
          <Textarea
            value={data.whatDidntWork}
            onChange={(e) => setData((prev) => ({ ...prev, whatDidntWork: e.target.value }))}
            placeholder="What challenges did we face?"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6 border-yellow-500/50">
          <label className="text-sm font-semibold mb-2 block text-yellow-600">Surprises</label>
          <Textarea
            value={data.surprises}
            onChange={(e) => setData((prev) => ({ ...prev, surprises: e.target.value }))}
            placeholder="What surprised us?"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Key Learnings</label>
          <Textarea
            value={data.learnings}
            onChange={(e) => setData((prev) => ({ ...prev, learnings: e.target.value }))}
            placeholder="What did we learn?"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Improvements for Next Time</label>
          <Textarea
            value={data.improvements}
            onChange={(e) => setData((prev) => ({ ...prev, improvements: e.target.value }))}
            placeholder="How will we improve?"
            className="min-h-24 resize-none"
          />
        </Card>
      </div>

      <Button onClick={downloadRetro} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download Retro
      </Button>
    </div>
  )
}
