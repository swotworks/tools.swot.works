"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Plus, Trash2 } from "lucide-react"

interface BalanceItem {
  id: string
  description: string
  amount: number
}

interface BalanceSheetData {
  assets: BalanceItem[]
  liabilities: BalanceItem[]
  equity: BalanceItem[]
}

export function BalanceSheetPlanner() {
  const [data, setData] = useState<BalanceSheetData>({
    assets: [],
    liabilities: [],
    equity: [],
  })

  const addItem = (section: keyof BalanceSheetData) => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: Date.now().toString(), description: "", amount: 0 }],
    }))
  }

  const updateItem = (section: keyof BalanceSheetData, id: string, field: string, value: string | number) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, [field]: field === "description" ? value : Number(value) } : item,
      ),
    }))
  }

  const deleteItem = (section: keyof BalanceSheetData, id: string) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }))
  }

  const totalAssets = data.assets.reduce((sum, item) => sum + item.amount, 0)
  const totalLiabilities = data.liabilities.reduce((sum, item) => sum + item.amount, 0)
  const totalEquity = data.equity.reduce((sum, item) => sum + item.amount, 0)
  const balanced = Math.abs(totalAssets - (totalLiabilities + totalEquity)) < 0.01

  const downloadBalanceSheet = () => {
    const content = `Balance Sheet

ASSETS
${data.assets.map((a) => `${a.description}: $${a.amount.toFixed(2)}`).join("\n")}
Total Assets: $${totalAssets.toFixed(2)}

LIABILITIES
${data.liabilities.map((l) => `${l.description}: $${l.amount.toFixed(2)}`).join("\n")}
Total Liabilities: $${totalLiabilities.toFixed(2)}

EQUITY
${data.equity.map((e) => `${e.description}: $${e.amount.toFixed(2)}`).join("\n")}
Total Equity: $${totalEquity.toFixed(2)}

VERIFICATION
Assets = Liabilities + Equity: ${balanced ? "✓ Balanced" : "✗ Not Balanced"}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "balance-sheet.txt"
    a.click()
  }

  const BalanceSection = ({
    title,
    section,
    total,
  }: {
    title: string
    section: keyof BalanceSheetData
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
        <h1 className="text-4xl font-bold mb-2">Balance Sheet Planner</h1>
        <p className="text-muted-foreground">Create a balance sheet (Assets = Liabilities + Equity)</p>
      </div>

      <BalanceSection title="Assets" section="assets" total={totalAssets} />
      <BalanceSection title="Liabilities" section="liabilities" total={totalLiabilities} />
      <BalanceSection title="Equity" section="equity" total={totalEquity} />

      <Card className={`p-6 mb-8 ${balanced ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Balance Check</span>
          <span className={`text-xl font-bold ${balanced ? "text-green-500" : "text-red-500"}`}>
            {balanced ? "✓ Balanced" : "✗ Not Balanced"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Assets: ${totalAssets.toFixed(2)} | Liabilities + Equity: ${(totalLiabilities + totalEquity).toFixed(2)}
        </p>
      </Card>

      <Button onClick={downloadBalanceSheet} size="lg" className="gap-2">
        <Download className="h-4 w-4" />
        Download Balance Sheet
      </Button>
    </div>
  )
}
