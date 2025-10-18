"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Plus, Trash2 } from "lucide-react"

interface MonthData {
  id: string
  month: string
  inflows: number
  outflows: number
}

interface CashFlowData {
  months: MonthData[]
  openingBalance: number
}

export function CashFlowProjection() {
  const [data, setData] = useState<CashFlowData>({
    months: [],
    openingBalance: 0,
  })

  const addMonth = () => {
    setData((prev) => ({
      ...prev,
      months: [...prev.months, { id: Date.now().toString(), month: "", inflows: 0, outflows: 0 }],
    }))
  }

  const updateMonth = (id: string, field: string, value: string | number) => {
    setData((prev) => ({
      ...prev,
      months: prev.months.map((month) =>
        month.id === id ? { ...month, [field]: field === "month" ? value : Number(value) } : month,
      ),
    }))
  }

  const deleteMonth = (id: string) => {
    setData((prev) => ({
      ...prev,
      months: prev.months.filter((month) => month.id !== id),
    }))
  }

  const calculateClosingBalance = (index: number): number => {
    let balance = data.openingBalance
    for (let i = 0; i <= index; i++) {
      balance += data.months[i].inflows - data.months[i].outflows
    }
    return balance
  }

  const downloadProjection = () => {
    let content = `Cash Flow Projection

Opening Balance: $${data.openingBalance.toFixed(2)}

`
    let balance = data.openingBalance
    data.months.forEach((month, index) => {
      balance += month.inflows - month.outflows
      content += `${month.month}
Inflows: $${month.inflows.toFixed(2)}
Outflows: $${month.outflows.toFixed(2)}
Closing Balance: $${balance.toFixed(2)}

`
    })

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cash-flow-projection.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Cash Flow Projection</h1>
        <p className="text-muted-foreground">Project your cash flow month by month</p>
      </div>

      <Card className="p-6 mb-8">
        <label className="text-sm font-semibold mb-2 block">Opening Balance</label>
        <Input
          type="number"
          value={data.openingBalance}
          onChange={(e) => setData((prev) => ({ ...prev, openingBalance: Number(e.target.value) }))}
          placeholder="0"
          className="text-lg"
        />
      </Card>

      <div className="space-y-4 mb-8">
        {data.months.map((month, index) => {
          const closingBalance = calculateClosingBalance(index)
          return (
            <Card key={month.id} className="p-6">
              <div className="flex gap-4 mb-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-semibold mb-2 block">Month</label>
                  <Input
                    value={month.month}
                    onChange={(e) => updateMonth(month.id, "month", e.target.value)}
                    placeholder="e.g., January 2024"
                  />
                </div>
                <div className="w-32">
                  <label className="text-sm font-semibold mb-2 block">Inflows</label>
                  <Input
                    type="number"
                    value={month.inflows}
                    onChange={(e) => updateMonth(month.id, "inflows", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="w-32">
                  <label className="text-sm font-semibold mb-2 block">Outflows</label>
                  <Input
                    type="number"
                    value={month.outflows}
                    onChange={(e) => updateMonth(month.id, "outflows", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <Button variant="ghost" size="sm" onClick={() => deleteMonth(month.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded">
                <div>
                  <p className="text-xs text-muted-foreground">Net Cash Flow</p>
                  <p className="font-bold">${(month.inflows - month.outflows).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Closing Balance</p>
                  <p className={`font-bold ${closingBalance >= 0 ? "text-green-500" : "text-red-500"}`}>
                    ${closingBalance.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="flex gap-4">
        <Button onClick={addMonth} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Month
        </Button>
        <Button onClick={downloadProjection} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download Projection
        </Button>
      </div>
    </div>
  )
}
