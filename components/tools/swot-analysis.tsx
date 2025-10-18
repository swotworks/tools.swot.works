"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download, Plus, Trash2 } from "lucide-react"

interface SWOTItem {
  id: string
  text: string
}

interface SWOTData {
  strengths: SWOTItem[]
  weaknesses: SWOTItem[]
  opportunities: SWOTItem[]
  threats: SWOTItem[]
}

export function SWOTAnalysis() {
  const [data, setData] = useState<SWOTData>({
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: [],
  })

  const addItem = (category: keyof SWOTData) => {
    setData((prev) => ({
      ...prev,
      [category]: [...prev[category], { id: Date.now().toString(), text: "" }],
    }))
  }

  const updateItem = (category: keyof SWOTData, id: string, text: string) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].map((item) => (item.id === id ? { ...item, text } : item)),
    }))
  }

  const deleteItem = (category: keyof SWOTData, id: string) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }))
  }

  const downloadAnalysis = () => {
    const content = `SWOT Analysis

STRENGTHS
${data.strengths.map((s) => `• ${s.text}`).join("\n")}

WEAKNESSES
${data.weaknesses.map((w) => `• ${w.text}`).join("\n")}

OPPORTUNITIES
${data.opportunities.map((o) => `• ${o.text}`).join("\n")}

THREATS
${data.threats.map((t) => `• ${t.text}`).join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "swot-analysis.txt"
    a.click()
  }

  const SWOTSection = ({
    title,
    category,
    color,
  }: {
    title: string
    category: keyof SWOTData
    color: string
  }) => (
    <Card className={`p-6 border-2 ${color}`}>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="space-y-3 mb-4">
        {data[category].map((item) => (
          <div key={item.id} className="flex gap-2">
            <Textarea
              value={item.text}
              onChange={(e) => updateItem(category, item.id, e.target.value)}
              placeholder={`Add ${title.toLowerCase()}...`}
              className="min-h-20 resize-none"
            />
            <Button variant="ghost" size="sm" onClick={() => deleteItem(category, item.id)} className="h-fit">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={() => addItem(category)} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add {title}
      </Button>
    </Card>
  )

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">SWOT Analysis</h1>
        <p className="text-muted-foreground">Identify your Strengths, Weaknesses, Opportunities, and Threats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SWOTSection title="Strengths" category="strengths" color="border-green-500" />
        <SWOTSection title="Weaknesses" category="weaknesses" color="border-red-500" />
        <SWOTSection title="Opportunities" category="opportunities" color="border-blue-500" />
        <SWOTSection title="Threats" category="threats" color="border-yellow-500" />
      </div>

      <Button onClick={downloadAnalysis} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download Analysis
      </Button>
    </div>
  )
}
