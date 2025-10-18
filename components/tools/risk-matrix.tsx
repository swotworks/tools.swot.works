"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, Plus, Trash2 } from "lucide-react"

interface Risk {
  id: string
  description: string
  probability: number
  impact: number
  mitigation: string
}

interface RiskData {
  risks: Risk[]
}

export function RiskMatrix() {
  const [data, setData] = useState<RiskData>({
    risks: [],
  })

  const addRisk = () => {
    setData((prev) => ({
      ...prev,
      risks: [...prev.risks, { id: Date.now().toString(), description: "", probability: 5, impact: 5, mitigation: "" }],
    }))
  }

  const updateRisk = (id: string, field: string, value: string | number) => {
    setData((prev) => ({
      ...prev,
      risks: prev.risks.map((risk) =>
        risk.id === id
          ? { ...risk, [field]: field === "description" || field === "mitigation" ? value : Number(value) }
          : risk,
      ),
    }))
  }

  const deleteRisk = (id: string) => {
    setData((prev) => ({
      ...prev,
      risks: prev.risks.filter((risk) => risk.id !== id),
    }))
  }

  const downloadMatrix = () => {
    const content = `Risk Matrix

${data.risks
  .sort((a, b) => b.probability * b.impact - a.probability * a.impact)
  .map((risk) => {
    const score = risk.probability * risk.impact
    return `RISK: ${risk.description}
Probability: ${risk.probability}/10
Impact: ${risk.impact}/10
Risk Score: ${score}

Mitigation:
${risk.mitigation}

`
  })
  .join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "risk-matrix.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Risk Matrix</h1>
        <p className="text-muted-foreground">Identify and prioritize business risks</p>
      </div>

      <div className="space-y-4 mb-8">
        {data.risks
          .sort((a, b) => b.probability * b.impact - a.probability * a.impact)
          .map((risk) => {
            const score = risk.probability * risk.impact
            const severity = score >= 50 ? "Critical" : score >= 25 ? "High" : score >= 10 ? "Medium" : "Low"
            const severityColor =
              score >= 50
                ? "text-red-500"
                : score >= 25
                  ? "text-orange-500"
                  : score >= 10
                    ? "text-yellow-500"
                    : "text-green-500"

            return (
              <Card key={risk.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Input
                    value={risk.description}
                    onChange={(e) => updateRisk(risk.id, "description", e.target.value)}
                    placeholder="Risk description..."
                    className="font-bold flex-1 mr-4"
                  />
                  <Button variant="ghost" size="sm" onClick={() => deleteRisk(risk.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Probability (1-10)</label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={risk.probability}
                      onChange={(e) => updateRisk(risk.id, "probability", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Impact (1-10)</label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={risk.impact}
                      onChange={(e) => updateRisk(risk.id, "impact", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Risk Score</label>
                    <div className={`text-2xl font-bold ${severityColor}`}>{score}</div>
                    <p className="text-xs text-muted-foreground">{severity}</p>
                  </div>
                </div>

                <label className="text-sm font-semibold mb-2 block">Mitigation Strategy</label>
                <Textarea
                  value={risk.mitigation}
                  onChange={(e) => updateRisk(risk.id, "mitigation", e.target.value)}
                  placeholder="How will you mitigate this risk?"
                  className="min-h-20 resize-none"
                />
              </Card>
            )
          })}
      </div>

      <div className="flex gap-4">
        <Button onClick={addRisk} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Risk
        </Button>
        <Button onClick={downloadMatrix} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download Matrix
        </Button>
      </div>
    </div>
  )
}
