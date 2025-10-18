"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Plus, Trash2 } from "lucide-react"

interface Objective {
  id: string
  name: string
  weight: number
  score: number
}

interface ScorecardData {
  objectives: Objective[]
}

export function StrategyScorecard() {
  const [data, setData] = useState<ScorecardData>({
    objectives: [],
  })

  const addObjective = () => {
    setData((prev) => ({
      ...prev,
      objectives: [...prev.objectives, { id: Date.now().toString(), name: "", weight: 20, score: 0 }],
    }))
  }

  const updateObjective = (id: string, field: string, value: string | number) => {
    setData((prev) => ({
      ...prev,
      objectives: prev.objectives.map((obj) =>
        obj.id === id ? { ...obj, [field]: field === "name" ? value : Number(value) } : obj,
      ),
    }))
  }

  const deleteObjective = (id: string) => {
    setData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((obj) => obj.id !== id),
    }))
  }

  const totalWeight = data.objectives.reduce((sum, obj) => sum + obj.weight, 0)
  const weightedScore = data.objectives.reduce((sum, obj) => sum + (obj.score * obj.weight) / 100, 0)

  const downloadScorecard = () => {
    const content = `Strategy Scorecard

${data.objectives
  .map(
    (obj) => `${obj.name}
Weight: ${obj.weight}%
Score: ${obj.score}/10
Weighted Score: ${((obj.score * obj.weight) / 100).toFixed(2)}

`,
  )
  .join("\n")}
TOTAL WEIGHT: ${totalWeight}%
OVERALL SCORE: ${weightedScore.toFixed(2)}/10`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "strategy-scorecard.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Strategy Scorecard</h1>
        <p className="text-muted-foreground">Score your strategic objectives</p>
      </div>

      <div className="space-y-4 mb-8">
        {data.objectives.map((obj) => (
          <Card key={obj.id} className="p-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block">Objective</label>
                <Input
                  value={obj.name}
                  onChange={(e) => updateObjective(obj.id, "name", e.target.value)}
                  placeholder="Objective name..."
                />
              </div>
              <div className="w-24">
                <label className="text-sm font-semibold mb-1 block">Weight %</label>
                <Input
                  type="number"
                  value={obj.weight}
                  onChange={(e) => updateObjective(obj.id, "weight", e.target.value)}
                  placeholder="20"
                />
              </div>
              <div className="w-24">
                <label className="text-sm font-semibold mb-1 block">Score /10</label>
                <Input
                  type="number"
                  min="0"
                  max="10"
                  value={obj.score}
                  onChange={(e) => updateObjective(obj.id, "score", e.target.value)}
                  placeholder="0"
                />
              </div>
              <Button variant="ghost" size="sm" onClick={() => deleteObjective(obj.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 mb-8 bg-accent/10 border-accent">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
            <p className="text-3xl font-bold text-accent">{weightedScore.toFixed(2)}/10</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Weight</p>
            <p className="text-2xl font-bold">{totalWeight}%</p>
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button onClick={addObjective} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Objective
        </Button>
        <Button onClick={downloadScorecard} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download Scorecard
        </Button>
      </div>
    </div>
  )
}
