"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, Plus, Trash2 } from "lucide-react"

interface LearningItem {
  id: string
  topic: string
  description: string
  timeline: string
  resources: string
}

interface LearningData {
  items: LearningItem[]
}

export function LearningRoadmap() {
  const [data, setData] = useState<LearningData>({
    items: [],
  })

  const addItem = () => {
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { id: Date.now().toString(), topic: "", description: "", timeline: "", resources: "" }],
    }))
  }

  const updateItem = (id: string, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const deleteItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  const downloadRoadmap = () => {
    const content = `Learning Roadmap

${data.items
  .map(
    (item) => `TOPIC: ${item.topic}
Description: ${item.description}
Timeline: ${item.timeline}
Resources: ${item.resources}

`,
  )
  .join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "learning-roadmap.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Learning Roadmap</h1>
        <p className="text-muted-foreground">Plan your team's learning and development</p>
      </div>

      <div className="space-y-4 mb-8">
        {data.items.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <Input
                value={item.topic}
                onChange={(e) => updateItem(item.id, "topic", e.target.value)}
                placeholder="Learning topic..."
                className="font-bold flex-1 mr-2"
              />
              <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <Textarea
              value={item.description}
              onChange={(e) => updateItem(item.id, "description", e.target.value)}
              placeholder="What should be learned?"
              className="min-h-16 resize-none mb-3"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                value={item.timeline}
                onChange={(e) => updateItem(item.id, "timeline", e.target.value)}
                placeholder="Timeline (e.g., Q1 2024)"
              />
              <Input
                value={item.resources}
                onChange={(e) => updateItem(item.id, "resources", e.target.value)}
                placeholder="Resources (courses, books, etc.)"
              />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={addItem} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Learning Item
        </Button>
        <Button onClick={downloadRoadmap} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download Roadmap
        </Button>
      </div>
    </div>
  )
}
