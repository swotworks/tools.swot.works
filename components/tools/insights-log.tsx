"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Download, Plus, Trash2 } from "lucide-react"

interface Insight {
  id: string
  date: string
  insight: string
  source: string
  action: string
}

interface InsightsData {
  insights: Insight[]
}

export function InsightsLog() {
  const [data, setData] = useState<InsightsData>({
    insights: [],
  })

  const addInsight = () => {
    const today = new Date().toISOString().split("T")[0]
    setData((prev) => ({
      ...prev,
      insights: [...prev.insights, { id: Date.now().toString(), date: today, insight: "", source: "", action: "" }],
    }))
  }

  const updateInsight = (id: string, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      insights: prev.insights.map((ins) => (ins.id === id ? { ...ins, [field]: value } : ins)),
    }))
  }

  const deleteInsight = (id: string) => {
    setData((prev) => ({
      ...prev,
      insights: prev.insights.filter((ins) => ins.id !== id),
    }))
  }

  const downloadLog = () => {
    const content = `Insights Log

${data.insights
  .map(
    (ins) => `DATE: ${ins.date}
Insight: ${ins.insight}
Source: ${ins.source}
Action: ${ins.action}

`,
  )
  .join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "insights-log.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Insights Log</h1>
        <p className="text-muted-foreground">Track key insights and learnings</p>
      </div>

      <div className="space-y-4 mb-8">
        {data.insights.map((insight) => (
          <Card key={insight.id} className="p-4">
            <div className="flex gap-4 items-end mb-3">
              <Input
                type="date"
                value={insight.date}
                onChange={(e) => updateInsight(insight.id, "date", e.target.value)}
                className="w-40"
              />
              <Input
                value={insight.source}
                onChange={(e) => updateInsight(insight.id, "source", e.target.value)}
                placeholder="Source..."
                className="flex-1"
              />
              <Button variant="ghost" size="sm" onClick={() => deleteInsight(insight.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={insight.insight}
              onChange={(e) => updateInsight(insight.id, "insight", e.target.value)}
              placeholder="What did you learn?"
              className="min-h-16 resize-none mb-3"
            />
            <Textarea
              value={insight.action}
              onChange={(e) => updateInsight(insight.id, "action", e.target.value)}
              placeholder="What action will you take?"
              className="min-h-16 resize-none"
            />
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={addInsight} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Insight
        </Button>
        <Button onClick={downloadLog} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download Log
        </Button>
      </div>
    </div>
  )
}
