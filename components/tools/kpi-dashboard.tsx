"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Plus, Trash2 } from "lucide-react"

interface KPI {
  id: string
  name: string
  current: number
  target: number
  unit: string
}

interface KPIData {
  kpis: KPI[]
}

export function KPIDashboard() {
  const [data, setData] = useState<KPIData>({
    kpis: [],
  })

  const addKPI = () => {
    setData((prev) => ({
      ...prev,
      kpis: [...prev.kpis, { id: Date.now().toString(), name: "", current: 0, target: 0, unit: "" }],
    }))
  }

  const updateKPI = (id: string, field: string, value: string | number) => {
    setData((prev) => ({
      ...prev,
      kpis: prev.kpis.map((kpi) =>
        kpi.id === id ? { ...kpi, [field]: field === "name" || field === "unit" ? value : Number(value) } : kpi,
      ),
    }))
  }

  const deleteKPI = (id: string) => {
    setData((prev) => ({
      ...prev,
      kpis: prev.kpis.filter((kpi) => kpi.id !== id),
    }))
  }

  const downloadDashboard = () => {
    const content = `KPI Dashboard

${data.kpis
  .map((kpi) => {
    const progress = kpi.target > 0 ? (kpi.current / kpi.target) * 100 : 0
    return `${kpi.name}
Current: ${kpi.current} ${kpi.unit}
Target: ${kpi.target} ${kpi.unit}
Progress: ${progress.toFixed(0)}%

`
  })
  .join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "kpi-dashboard.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">KPI Dashboard</h1>
        <p className="text-muted-foreground">Track your key performance indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {data.kpis.map((kpi) => {
          const progress = kpi.target > 0 ? (kpi.current / kpi.target) * 100 : 0
          return (
            <Card key={kpi.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <Input
                  value={kpi.name}
                  onChange={(e) => updateKPI(kpi.id, "name", e.target.value)}
                  placeholder="KPI name..."
                  className="font-bold flex-1 mr-2"
                />
                <Button variant="ghost" size="sm" onClick={() => deleteKPI(kpi.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2 mb-3">
                <div className="flex-1">
                  <label className="text-xs font-semibold mb-1 block">Current</label>
                  <Input
                    type="number"
                    value={kpi.current}
                    onChange={(e) => updateKPI(kpi.id, "current", e.target.value)}
                    placeholder="0"
                    className="text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold mb-1 block">Target</label>
                  <Input
                    type="number"
                    value={kpi.target}
                    onChange={(e) => updateKPI(kpi.id, "target", e.target.value)}
                    placeholder="0"
                    className="text-sm"
                  />
                </div>
                <div className="w-20">
                  <label className="text-xs font-semibold mb-1 block">Unit</label>
                  <Input
                    value={kpi.unit}
                    onChange={(e) => updateKPI(kpi.id, "unit", e.target.value)}
                    placeholder="e.g., %"
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div
                  className="h-2 rounded-full bg-accent transition-all"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{progress.toFixed(0)}% of target</p>
            </Card>
          )
        })}
      </div>

      <div className="flex gap-4">
        <Button onClick={addKPI} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add KPI
        </Button>
        <Button onClick={downloadDashboard} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download Dashboard
        </Button>
      </div>
    </div>
  )
}
