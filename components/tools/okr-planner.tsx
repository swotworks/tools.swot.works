"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, Plus, Trash2 } from "lucide-react"

interface KeyResult {
  id: string
  text: string
  progress: number
}

interface Objective {
  id: string
  title: string
  keyResults: KeyResult[]
}

interface OKRData {
  objectives: Objective[]
}

export function OKRPlanner() {
  const [data, setData] = useState<OKRData>({
    objectives: [],
  })
  const [expandedObjectives, setExpandedObjectives] = useState<string[]>([])

  const addObjective = () => {
    const newObjective: Objective = {
      id: Date.now().toString(),
      title: "",
      keyResults: [],
    }
    setData((prev) => ({
      ...prev,
      objectives: [...prev.objectives, newObjective],
    }))
    setExpandedObjectives((prev) => [...prev, newObjective.id])
  }

  const updateObjectiveTitle = (id: string, title: string) => {
    setData((prev) => ({
      ...prev,
      objectives: prev.objectives.map((obj) => (obj.id === id ? { ...obj, title } : obj)),
    }))
  }

  const addKeyResult = (objectiveId: string) => {
    setData((prev) => ({
      ...prev,
      objectives: prev.objectives.map((obj) =>
        obj.id === objectiveId
          ? {
              ...obj,
              keyResults: [...obj.keyResults, { id: Date.now().toString(), text: "", progress: 0 }],
            }
          : obj,
      ),
    }))
  }

  const updateKeyResult = (objectiveId: string, krId: string, text: string) => {
    setData((prev) => ({
      ...prev,
      objectives: prev.objectives.map((obj) =>
        obj.id === objectiveId
          ? {
              ...obj,
              keyResults: obj.keyResults.map((kr) => (kr.id === krId ? { ...kr, text } : kr)),
            }
          : obj,
      ),
    }))
  }

  const updateKeyResultProgress = (objectiveId: string, krId: string, progress: number) => {
    setData((prev) => ({
      ...prev,
      objectives: prev.objectives.map((obj) =>
        obj.id === objectiveId
          ? {
              ...obj,
              keyResults: obj.keyResults.map((kr) =>
                kr.id === krId ? { ...kr, progress: Math.min(100, Math.max(0, progress)) } : kr,
              ),
            }
          : obj,
      ),
    }))
  }

  const deleteKeyResult = (objectiveId: string, krId: string) => {
    setData((prev) => ({
      ...prev,
      objectives: prev.objectives.map((obj) =>
        obj.id === objectiveId
          ? {
              ...obj,
              keyResults: obj.keyResults.filter((kr) => kr.id !== krId),
            }
          : obj,
      ),
    }))
  }

  const deleteObjective = (id: string) => {
    setData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((obj) => obj.id !== id),
    }))
  }

  const downloadOKRs = () => {
    const content = `OKR Planner

${data.objectives
  .map(
    (obj) => `OBJECTIVE: ${obj.title}

${obj.keyResults.map((kr) => `• ${kr.text} (${kr.progress}%)`).join("\n")}

`,
  )
  .join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "okr-planner.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">OKR Planner</h1>
        <p className="text-muted-foreground">Set Objectives and Key Results to drive your business forward</p>
      </div>

      <div className="space-y-4 mb-8">
        {data.objectives.map((objective) => (
          <Card key={objective.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <Input
                  value={objective.title}
                  onChange={(e) => updateObjectiveTitle(objective.id, e.target.value)}
                  placeholder="Enter objective..."
                  className="text-lg font-bold mb-2"
                />
              </div>
              <Button variant="ghost" size="sm" onClick={() => deleteObjective(objective.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {objective.keyResults.map((kr) => (
                <div key={kr.id} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Textarea
                      value={kr.text}
                      onChange={(e) => updateKeyResult(objective.id, kr.id, e.target.value)}
                      placeholder="Key Result..."
                      className="min-h-16 resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={kr.progress}
                      onChange={(e) =>
                        updateKeyResultProgress(objective.id, kr.id, Number.parseInt(e.target.value) || 0)
                      }
                      className="w-20"
                    />
                    <span className="text-sm font-medium">%</span>
                    <Button variant="ghost" size="sm" onClick={() => deleteKeyResult(objective.id, kr.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={() => addKeyResult(objective.id)} className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Key Result
            </Button>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={addObjective} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Objective
        </Button>
        <Button onClick={downloadOKRs} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download OKRs
        </Button>
      </div>
    </div>
  )
}
