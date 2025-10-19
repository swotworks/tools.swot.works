"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download, Plus, Trash2 } from "lucide-react"

interface PESTELItem {
  id: string
  text: string
}

interface PESTELData {
  political: PESTELItem[]
  economic: PESTELItem[]
  social: PESTELItem[]
  technological: PESTELItem[]
  environmental: PESTELItem[]
  legal: PESTELItem[]
}

export function PESTELAnalysis() {
  const [data, setData] = useState<PESTELData>({
    political: [],
    economic: [],
    social: [],
    technological: [],
    environmental: [],
    legal: [],
  })

  const addItem = (category: keyof PESTELData) => {
    setData((prev) => ({
      ...prev,
      [category]: [...prev[category], { id: Date.now().toString(), text: "" }],
    }))
  }

  const updateItem = (category: keyof PESTELData, id: string, text: string) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].map((item) => (item.id === id ? { ...item, text } : item)),
    }))
  }

  const deleteItem = (category: keyof PESTELData, id: string) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }))
  }

  const downloadAnalysis = () => {
    const content = `PESTEL Analysis

POLITICAL
${data.political.map((p) => `• ${p.text}`).join("\n")}

ECONOMIC
${data.economic.map((e) => `• ${e.text}`).join("\n")}

SOCIAL
${data.social.map((s) => `• ${s.text}`).join("\n")}

TECHNOLOGICAL
${data.technological.map((t) => `• ${t.text}`).join("\n")}

ENVIRONMENTAL
${data.environmental.map((e) => `• ${e.text}`).join("\n")}

LEGAL
${data.legal.map((l) => `• ${l.text}`).join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "pestel-analysis.txt"
    a.click()
  }

  const PESTELSection = ({
    title,
    category,
    color,
  }: {
    title: string
    category: keyof PESTELData
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
        <h1 className="text-4xl font-bold mb-2">PESTEL Analysis</h1>
        <p className="text-muted-foreground">
          Analyze Political, Economic, Social, Technological, Environmental, and Legal factors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <PESTELSection title="Political" category="political" color="border-blue-500" />
        <PESTELSection title="Economic" category="economic" color="border-green-500" />
        <PESTELSection title="Social" category="social" color="border-purple-500" />
        <PESTELSection title="Technological" category="technological" color="border-cyan-500" />
        <PESTELSection title="Environmental" category="environmental" color="border-emerald-500" />
        <PESTELSection title="Legal" category="legal" color="border-orange-500" />
      </div>

      <Button onClick={downloadAnalysis} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download Analysis
      </Button>
    </div>
  )
}
