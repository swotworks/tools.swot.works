"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, Plus, Trash2 } from "lucide-react"

interface Milestone {
  id: string
  title: string
  description: string
  quarter: string
  status: "planned" | "in-progress" | "completed"
}

interface RoadmapData {
  milestones: Milestone[]
}

export function StrategyRoadmap() {
  const [data, setData] = useState<RoadmapData>({
    milestones: [],
  })

  const addMilestone = () => {
    setData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        {
          id: Date.now().toString(),
          title: "",
          description: "",
          quarter: "Q1",
          status: "planned",
        },
      ],
    }))
  }

  const updateMilestone = (id: string, field: keyof Milestone, value: string) => {
    setData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    }))
  }

  const deleteMilestone = (id: string) => {
    setData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((m) => m.id !== id),
    }))
  }

  const downloadRoadmap = () => {
    const content = `Strategy Roadmap

${data.milestones
  .map(
    (m) => `${m.quarter} - ${m.title} [${m.status.toUpperCase()}]
${m.description}

`,
  )
  .join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "strategy-roadmap.txt"
    a.click()
  }

  const quarters = ["Q1", "Q2", "Q3", "Q4"]
  const statuses = ["planned", "in-progress", "completed"] as const

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Strategy Roadmap</h1>
        <p className="text-muted-foreground">Plan your strategic milestones and track progress</p>
      </div>

      <div className="space-y-4 mb-8">
        {data.milestones.map((milestone) => (
          <Card key={milestone.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Input
                value={milestone.title}
                onChange={(e) => updateMilestone(milestone.id, "title", e.target.value)}
                placeholder="Milestone title..."
                className="text-lg font-bold flex-1 mr-4"
              />
              <Button variant="ghost" size="sm" onClick={() => deleteMilestone(milestone.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Quarter</label>
                <select
                  value={milestone.quarter}
                  onChange={(e) => updateMilestone(milestone.id, "quarter", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  {quarters.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Status</label>
                <select
                  value={milestone.status}
                  onChange={(e) => updateMilestone(milestone.id, "status", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Textarea
              value={milestone.description}
              onChange={(e) => updateMilestone(milestone.id, "description", e.target.value)}
              placeholder="Describe this milestone..."
              className="min-h-24 resize-none"
            />
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={addMilestone} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Milestone
        </Button>
        <Button onClick={downloadRoadmap} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download Roadmap
        </Button>
      </div>
    </div>
  )
}
