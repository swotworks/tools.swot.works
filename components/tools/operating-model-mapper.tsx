"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download } from "lucide-react"

interface OperatingModelData {
  vision: string
  processes: string
  people: string
  technology: string
  governance: string
}

export function OperatingModelMapper() {
  const [data, setData] = useState<OperatingModelData>({
    vision: "",
    processes: "",
    people: "",
    technology: "",
    governance: "",
  })

  const downloadModel = () => {
    const content = `Operating Model

VISION
${data.vision}

PROCESSES
${data.processes}

PEOPLE & CULTURE
${data.people}

TECHNOLOGY & SYSTEMS
${data.technology}

GOVERNANCE & STRUCTURE
${data.governance}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "operating-model.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Operating Model Mapper</h1>
        <p className="text-muted-foreground">Design your organization's operating model</p>
      </div>

      <div className="space-y-6 mb-8">
        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Vision</label>
          <Textarea
            value={data.vision}
            onChange={(e) => setData((prev) => ({ ...prev, vision: e.target.value }))}
            placeholder="What is your operating model vision?"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Processes</label>
          <Textarea
            value={data.processes}
            onChange={(e) => setData((prev) => ({ ...prev, processes: e.target.value }))}
            placeholder="Key processes and workflows"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">People & Culture</label>
          <Textarea
            value={data.people}
            onChange={(e) => setData((prev) => ({ ...prev, people: e.target.value }))}
            placeholder="Organizational structure and culture"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Technology & Systems</label>
          <Textarea
            value={data.technology}
            onChange={(e) => setData((prev) => ({ ...prev, technology: e.target.value }))}
            placeholder="Technology infrastructure and systems"
            className="min-h-24 resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-semibold mb-2 block">Governance & Structure</label>
          <Textarea
            value={data.governance}
            onChange={(e) => setData((prev) => ({ ...prev, governance: e.target.value }))}
            placeholder="Decision-making and governance structure"
            className="min-h-24 resize-none"
          />
        </Card>
      </div>

      <Button onClick={downloadModel} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download Model
      </Button>
    </div>
  )
}
