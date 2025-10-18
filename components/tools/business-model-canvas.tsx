"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download, Plus, Trash2 } from "lucide-react"

interface CanvasItem {
  id: string
  text: string
}

interface BMCData {
  keyPartners: CanvasItem[]
  keyActivities: CanvasItem[]
  keyResources: CanvasItem[]
  valuePropositions: CanvasItem[]
  customerRelationships: CanvasItem[]
  channels: CanvasItem[]
  customerSegments: CanvasItem[]
  costStructure: CanvasItem[]
  revenueStreams: CanvasItem[]
}

export function BusinessModelCanvas() {
  const [data, setData] = useState<BMCData>({
    keyPartners: [],
    keyActivities: [],
    keyResources: [],
    valuePropositions: [],
    customerRelationships: [],
    channels: [],
    customerSegments: [],
    costStructure: [],
    revenueStreams: [],
  })

  const addItem = (section: keyof BMCData) => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: Date.now().toString(), text: "" }],
    }))
  }

  const updateItem = (section: keyof BMCData, id: string, text: string) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) => (item.id === id ? { ...item, text } : item)),
    }))
  }

  const deleteItem = (section: keyof BMCData, id: string) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }))
  }

  const downloadCanvas = () => {
    const content = `Business Model Canvas

KEY PARTNERS
${data.keyPartners.map((p) => `• ${p.text}`).join("\n")}

KEY ACTIVITIES
${data.keyActivities.map((a) => `• ${a.text}`).join("\n")}

KEY RESOURCES
${data.keyResources.map((r) => `• ${r.text}`).join("\n")}

VALUE PROPOSITIONS
${data.valuePropositions.map((v) => `• ${v.text}`).join("\n")}

CUSTOMER RELATIONSHIPS
${data.customerRelationships.map((c) => `• ${c.text}`).join("\n")}

CHANNELS
${data.channels.map((c) => `• ${c.text}`).join("\n")}

CUSTOMER SEGMENTS
${data.customerSegments.map((c) => `• ${c.text}`).join("\n")}

COST STRUCTURE
${data.costStructure.map((c) => `• ${c.text}`).join("\n")}

REVENUE STREAMS
${data.revenueStreams.map((r) => `• ${r.text}`).join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "business-model-canvas.txt"
    a.click()
  }

  const CanvasSection = ({
    title,
    section,
  }: {
    title: string
    section: keyof BMCData
  }) => (
    <Card className="p-4 bg-card/50">
      <h3 className="font-bold text-sm mb-3">{title}</h3>
      <div className="space-y-2 mb-3">
        {data[section].map((item) => (
          <div key={item.id} className="flex gap-2">
            <Textarea
              value={item.text}
              onChange={(e) => updateItem(section, item.id, e.target.value)}
              placeholder="Add item..."
              className="min-h-16 resize-none text-sm"
            />
            <Button variant="ghost" size="sm" onClick={() => deleteItem(section, item.id)} className="h-fit">
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={() => addItem(section)} className="w-full text-xs">
        <Plus className="h-3 w-3 mr-1" />
        Add
      </Button>
    </Card>
  )

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Business Model Canvas</h1>
        <p className="text-muted-foreground">Map your business model across 9 key areas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Left Column */}
        <div className="space-y-4">
          <CanvasSection title="Key Partners" section="keyPartners" />
          <CanvasSection title="Key Activities" section="keyActivities" />
          <CanvasSection title="Key Resources" section="keyResources" />
        </div>

        {/* Center Column */}
        <div className="space-y-4">
          <CanvasSection title="Value Propositions" section="valuePropositions" />
          <CanvasSection title="Customer Relationships" section="customerRelationships" />
          <CanvasSection title="Channels" section="channels" />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <CanvasSection title="Customer Segments" section="customerSegments" />
          <CanvasSection title="Cost Structure" section="costStructure" />
          <CanvasSection title="Revenue Streams" section="revenueStreams" />
        </div>
      </div>

      <Button onClick={downloadCanvas} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download Canvas
      </Button>
    </div>
  )
}
