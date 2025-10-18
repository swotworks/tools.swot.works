"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download, Plus, Trash2 } from "lucide-react"

interface GTMItem {
  id: string
  text: string
}

interface GTMData {
  targetMarket: GTMItem[]
  positioning: GTMItem[]
  channels: GTMItem[]
  messaging: GTMItem[]
  pricing: GTMItem[]
  partnerships: GTMItem[]
  timeline: GTMItem[]
  metrics: GTMItem[]
}

export function GoToMarketPlanner() {
  const [data, setData] = useState<GTMData>({
    targetMarket: [],
    positioning: [],
    channels: [],
    messaging: [],
    pricing: [],
    partnerships: [],
    timeline: [],
    metrics: [],
  })

  const addItem = (section: keyof GTMData) => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: Date.now().toString(), text: "" }],
    }))
  }

  const updateItem = (section: keyof GTMData, id: string, text: string) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) => (item.id === id ? { ...item, text } : item)),
    }))
  }

  const deleteItem = (section: keyof GTMData, id: string) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }))
  }

  const downloadGTM = () => {
    const content = `Go-To-Market Plan

TARGET MARKET
${data.targetMarket.map((t) => `• ${t.text}`).join("\n")}

POSITIONING
${data.positioning.map((p) => `• ${p.text}`).join("\n")}

CHANNELS
${data.channels.map((c) => `• ${c.text}`).join("\n")}

MESSAGING
${data.messaging.map((m) => `• ${m.text}`).join("\n")}

PRICING
${data.pricing.map((p) => `• ${p.text}`).join("\n")}

PARTNERSHIPS
${data.partnerships.map((p) => `• ${p.text}`).join("\n")}

TIMELINE
${data.timeline.map((t) => `• ${t.text}`).join("\n")}

SUCCESS METRICS
${data.metrics.map((m) => `• ${m.text}`).join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "go-to-market-plan.txt"
    a.click()
  }

  const GTMSection = ({
    title,
    section,
  }: {
    title: string
    section: keyof GTMData
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
        <h1 className="text-4xl font-bold mb-2">Go-To-Market Planner</h1>
        <p className="text-muted-foreground">Plan your market entry and launch strategy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <GTMSection title="Target Market" section="targetMarket" />
        <GTMSection title="Positioning" section="positioning" />
        <GTMSection title="Channels" section="channels" />
        <GTMSection title="Messaging" section="messaging" />
        <GTMSection title="Pricing Strategy" section="pricing" />
        <GTMSection title="Partnerships" section="partnerships" />
        <GTMSection title="Timeline" section="timeline" />
        <GTMSection title="Success Metrics" section="metrics" />
      </div>

      <Button onClick={downloadGTM} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download Plan
      </Button>
    </div>
  )
}
