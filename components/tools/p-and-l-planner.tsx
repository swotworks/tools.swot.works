"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Plus, Trash2 } from "lucide-react"

interface LineItem {
  id: string
  description: string
  amount: number
}

interface PAndLData {
  revenue: LineItem[]
  costOfGoodsSold: LineItem[]
  operatingExpenses: LineItem[]
}

export function PAndLPlanner() {
  const [data, setData] = useState<PAndLData>({
    revenue: [],
    costOfGoodsSold: [],
    operatingExpenses: [],
  })

  const addItem = (section: keyof PAndLData) => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: Date.now().toString(), description: "", amount: 0 }],
    }))
  }

  const updateItem = (section: keyof PAndLData, id: string, field: string, value: string | number) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, [field]: field === "amount" ? Number(value) : value } : item,
      ),
    }))
  }

  const deleteItem = (section: keyof PAndLData, id: string) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }))
  }

  const totalRevenue = data.revenue.reduce((sum, item) => sum + item.amount, 0)
  const totalCOGS = data.costOfGoodsSold.reduce((sum, item) => sum + item.amount, 0)
  const grossProfit = totalRevenue - totalCOGS
  const totalOpEx = data.operatingExpenses.reduce((sum, item) => sum + item.amount, 0)
  const netIncome = grossProfit - totalOpEx

  const downloadPAndL = () => {
    const content = `P&L Statement

REVENUE
${data.revenue.map((r) => `${r.description}: $${r.amount.toFixed(2)}`).join("\n")}
Total Revenue: $${totalRevenue.toFixed(2)}

COST OF GOODS SOLD
${data.costOfGoodsSold.map((c) => `${c.description}: $${c.amount.toFixed(2)}`).join("\n")}
Total COGS: $${totalCOGS.toFixed(2)}

GROSS PROFIT: $${grossProfit.toFixed(2)}

OPERATING EXPENSES
${data.operatingExpenses.map((e) => `${e.description}: $${e.amount.toFixed(2)}`).join("\n")}
Total OpEx: $${totalOpEx.toFixed(2)}

NET INCOME: $${netIncome.toFixed(2)}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "p-and-l-statement.txt"
    a.click()
  }

  const LineItemSection = ({
    title,
    section,
    total,
  }: {
    title: string
    section: keyof PAndLData
    total: number
  }) => (
    <Card className="p-6 mb-6">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="space-y-3 mb-4">
        {data[section].map((item) => (
          <div key={item.id} className="flex gap-3 items-end">
            <Input
              value={item.description}
              onChange={(e) => updateItem(section, item.id, "description", e.target.value)}
              placeholder="Description..."
              className="flex-1"
            />
            <Input
              type="number"
              value={item.amount}
              onChange={(e) => updateItem(section, item.id, "amount", e.target.value)}
              placeholder="0"
              className="w-32"
            />
            <Button variant="ghost" size="sm" onClick={() => deleteItem(section, item.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mb-4 p-3 bg-muted rounded">
        <span className="font-semibold">{title} Total:</span>
        <span className="font-bold text-lg">${total.toFixed(2)}</span>
      </div>
      <Button variant="outline" size="sm" onClick={() => addItem(section)} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Item
      </Button>
    </Card>
  )

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">P&L Planner</h1>
        <p className="text-muted-foreground">Create a profit and loss statement</p>
      </div>

      <LineItemSection title="Revenue" section="revenue" total={totalRevenue} />
      <LineItemSection title="Cost of Goods Sold" section="costOfGoodsSold" total={totalCOGS} />

      <Card className="p-6 mb-6 bg-accent/10 border-accent">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Gross Profit</span>
          <span className="text-2xl font-bold text-accent">${grossProfit.toFixed(2)}</span>
        </div>
      </Card>

      <LineItemSection title="Operating Expenses" section="operatingExpenses" total={totalOpEx} />

      <Card className="p-6 mb-8 bg-accent/20 border-2 border-accent">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">Net Income</span>
          <span className={`text-3xl font-bold ${netIncome >= 0 ? "text-green-500" : "text-red-500"}`}>
            ${netIncome.toFixed(2)}
          </span>
        </div>
      </Card>

      <Button onClick={downloadPAndL} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download P&L
      </Button>
    </div>
  )
}
