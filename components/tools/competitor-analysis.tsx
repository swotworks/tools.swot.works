"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, Plus, Trash2 } from "lucide-react"

interface Competitor {
  id: string
  name: string
  strengths: string
  weaknesses: string
  marketShare: string
  pricing: string
  uniqueValue: string
}

interface CompetitorAnalysisData {
  competitors: Competitor[]
}

export function CompetitorAnalysis() {
  const [data, setData] = useState<CompetitorAnalysisData>({
    competitors: [],
  })

  const addCompetitor = () => {
    setData((prev) => ({
      ...prev,
      competitors: [
        ...prev.competitors,
        {
          id: Date.now().toString(),
          name: "",
          strengths: "",
          weaknesses: "",
          marketShare: "",
          pricing: "",
          uniqueValue: "",
        },
      ],
    }))
  }

  const updateCompetitor = (id: string, field: keyof Competitor, value: string) => {
    setData((prev) => ({
      ...prev,
      competitors: prev.competitors.map((comp) => (comp.id === id ? { ...comp, [field]: value } : comp)),
    }))
  }

  const deleteCompetitor = (id: string) => {
    setData((prev) => ({
      ...prev,
      competitors: prev.competitors.filter((comp) => comp.id !== id),
    }))
  }

  const downloadAnalysis = () => {
    const content = `Competitor Analysis

${data.competitors
  .map(
    (comp) => `COMPETITOR: ${comp.name}

Strengths: ${comp.strengths}
Weaknesses: ${comp.weaknesses}
Market Share: ${comp.marketShare}
Pricing: ${comp.pricing}
Unique Value: ${comp.uniqueValue}

`,
  )
  .join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "competitor-analysis.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Competitor Analysis</h1>
        <p className="text-muted-foreground">Track and analyze your competitors' strengths and weaknesses</p>
      </div>

      <div className="space-y-6 mb-8">
        {data.competitors.map((competitor) => (
          <Card key={competitor.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Input
                value={competitor.name}
                onChange={(e) => updateCompetitor(competitor.id, "name", e.target.value)}
                placeholder="Competitor name..."
                className="text-lg font-bold flex-1 mr-4"
              />
              <Button variant="ghost" size="sm" onClick={() => deleteCompetitor(competitor.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Strengths</label>
                <Textarea
                  value={competitor.strengths}
                  onChange={(e) => updateCompetitor(competitor.id, "strengths", e.target.value)}
                  placeholder="What are their strengths?"
                  className="min-h-24 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Weaknesses</label>
                <Textarea
                  value={competitor.weaknesses}
                  onChange={(e) => updateCompetitor(competitor.id, "weaknesses", e.target.value)}
                  placeholder="What are their weaknesses?"
                  className="min-h-24 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Market Share</label>
                <Input
                  value={competitor.marketShare}
                  onChange={(e) => updateCompetitor(competitor.id, "marketShare", e.target.value)}
                  placeholder="e.g., 15%"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Pricing Strategy</label>
                <Input
                  value={competitor.pricing}
                  onChange={(e) => updateCompetitor(competitor.id, "pricing", e.target.value)}
                  placeholder="e.g., Premium, Budget, Mid-range"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold mb-2 block">Unique Value Proposition</label>
                <Textarea
                  value={competitor.uniqueValue}
                  onChange={(e) => updateCompetitor(competitor.id, "uniqueValue", e.target.value)}
                  placeholder="What makes them unique?"
                  className="min-h-20 resize-none"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={addCompetitor} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Competitor
        </Button>
        <Button onClick={downloadAnalysis} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download Analysis
        </Button>
      </div>
    </div>
  )
}
