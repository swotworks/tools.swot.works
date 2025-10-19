"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download, Plus, Trash2 } from "lucide-react"

interface ForceItem {
  id: string
  text: string
}

interface PortersData {
  supplierPower: ForceItem[]
  buyerPower: ForceItem[]
  competitiveRivalry: ForceItem[]
  threatOfSubstitutes: ForceItem[]
  threatOfNewEntrants: ForceItem[]
}

export function PortersFiveForces() {
  const [data, setData] = useState<PortersData>({
    supplierPower: [],
    buyerPower: [],
    competitiveRivalry: [],
    threatOfSubstitutes: [],
    threatOfNewEntrants: [],
  })

  const addItem = (force: keyof PortersData) => {
    setData((prev) => ({
      ...prev,
      [force]: [...prev[force], { id: Date.now().toString(), text: "" }],
    }))
  }

  const updateItem = (force: keyof PortersData, id: string, text: string) => {
    setData((prev) => ({
      ...prev,
      [force]: prev[force].map((item) => (item.id === id ? { ...item, text } : item)),
    }))
  }

  const deleteItem = (force: keyof PortersData, id: string) => {
    setData((prev) => ({
      ...prev,
      [force]: prev[force].filter((item) => item.id !== id),
    }))
  }

  const downloadAnalysis = () => {
    const content = `Porter's Five Forces Analysis

SUPPLIER POWER
${data.supplierPower.map((s) => `• ${s.text}`).join("\n")}

BUYER POWER
${data.buyerPower.map((b) => `• ${b.text}`).join("\n")}

COMPETITIVE RIVALRY
${data.competitiveRivalry.map((c) => `• ${c.text}`).join("\n")}

THREAT OF SUBSTITUTES
${data.threatOfSubstitutes.map((t) => `• ${t.text}`).join("\n")}

THREAT OF NEW ENTRANTS
${data.threatOfNewEntrants.map((t) => `• ${t.text}`).join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "porters-five-forces.txt"
    a.click()
  }

  const ForceSection = ({
    title,
    force,
    color,
  }: {
    title: string
    force: keyof PortersData
    color: string
  }) => (
    <Card className={`p-6 border-2 ${color}`}>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="space-y-3 mb-4">
        {data[force].map((item) => (
          <div key={item.id} className="flex gap-2">
            <Textarea
              value={item.text}
              onChange={(e) => updateItem(force, item.id, e.target.value)}
              placeholder={`Add ${title.toLowerCase()}...`}
              className="min-h-20 resize-none"
            />
            <Button variant="ghost" size="sm" onClick={() => deleteItem(force, item.id)} className="h-fit">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={() => addItem(force)} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Force
      </Button>
    </Card>
  )

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Porter's Five Forces</h1>
        <p className="text-muted-foreground">Analyze competitive forces in your industry</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ForceSection title="Supplier Power" force="supplierPower" color="border-red-500" />
        <ForceSection title="Buyer Power" force="buyerPower" color="border-blue-500" />
        <ForceSection title="Competitive Rivalry" force="competitiveRivalry" color="border-orange-500" />
        <ForceSection title="Threat of Substitutes" force="threatOfSubstitutes" color="border-purple-500" />
        <div className="md:col-span-2">
          <ForceSection title="Threat of New Entrants" force="threatOfNewEntrants" color="border-green-500" />
        </div>
      </div>

      <Button onClick={downloadAnalysis} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download Analysis
      </Button>
    </div>
  )
}
