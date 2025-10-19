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

interface VPCData {
  productsServices: CanvasItem[]
  painRelievers: CanvasItem[]
  gainCreators: CanvasItem[]
  customerJobs: CanvasItem[]
  pains: CanvasItem[]
  gains: CanvasItem[]
}

export function ValuePropositionCanvas() {
  const [data, setData] = useState<VPCData>({
    productsServices: [],
    painRelievers: [],
    gainCreators: [],
    customerJobs: [],
    pains: [],
    gains: [],
  })

  const addItem = (section: keyof VPCData) => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: Date.now().toString(), text: "" }],
    }))
  }

  const updateItem = (section: keyof VPCData, id: string, text: string) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) => (item.id === id ? { ...item, text } : item)),
    }))
  }

  const deleteItem = (section: keyof VPCData, id: string) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }))
  }

  const downloadCanvas = () => {
    const content = `Value Proposition Canvas

PRODUCTS & SERVICES
${data.productsServices.map((p) => `• ${p.text}`).join("\n")}

PAIN RELIEVERS
${data.painRelievers.map((p) => `• ${p.text}`).join("\n")}

GAIN CREATORS
${data.gainCreators.map((g) => `• ${g.text}`).join("\n")}

CUSTOMER JOBS
${data.customerJobs.map((j) => `• ${j.text}`).join("\n")}

CUSTOMER PAINS
${data.pains.map((p) => `• ${p.text}`).join("\n")}

CUSTOMER GAINS
${data.gains.map((g) => `• ${g.text}`).join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "value-proposition-canvas.txt"
    a.click()
  }

  const CanvasSection = ({
    title,
    section,
  }: {
    title: string
    section: keyof VPCData
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
        <h1 className="text-4xl font-bold mb-2">Value Proposition Canvas</h1>
        <p className="text-muted-foreground">Map your value proposition to customer needs and desires</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left Side - Your Value Proposition */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-accent">Your Value Proposition</h2>
          <div className="space-y-4">
            <CanvasSection title="Products & Services" section="productsServices" />
            <CanvasSection title="Pain Relievers" section="painRelievers" />
            <CanvasSection title="Gain Creators" section="gainCreators" />
          </div>
        </div>

        {/* Right Side - Customer Profile */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-accent">Customer Profile</h2>
          <div className="space-y-4">
            <CanvasSection title="Customer Jobs" section="customerJobs" />
            <CanvasSection title="Customer Pains" section="pains" />
            <CanvasSection title="Customer Gains" section="gains" />
          </div>
        </div>
      </div>

      <Button onClick={downloadCanvas} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download Canvas
      </Button>
    </div>
  )
}
