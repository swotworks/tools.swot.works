"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Plus, Trash2 } from "lucide-react"

interface BudgetItem {
  id: string
  category: string
  amount: number
  spent: number
}

interface BudgetData {
  items: BudgetItem[]
}

export function BudgetPlanner() {
  const [data, setData] = useState<BudgetData>({
    items: [],
  })

  const addItem = () => {
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { id: Date.now().toString(), category: "", amount: 0, spent: 0 }],
    }))
  }

  const updateItem = (id: string, field: keyof BudgetItem, value: string | number) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: typeof value === "string" ? value : Number(value) } : item,
      ),
    }))
  }

  const deleteItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  const totalBudget = data.items.reduce((sum, item) => sum + item.amount, 0)
  const totalSpent = data.items.reduce((sum, item) => sum + item.spent, 0)
  const remaining = totalBudget - totalSpent

  const downloadBudget = () => {
    const content = `Budget Planner

${data.items
  .map(
    (item) => `${item.category}
Budget: $${item.amount.toFixed(2)}
Spent: $${item.spent.toFixed(2)}
Remaining: $${(item.amount - item.spent).toFixed(2)}

`,
  )
  .join("\n")}
TOTAL BUDGET: $${totalBudget.toFixed(2)}
TOTAL SPENT: $${totalSpent.toFixed(2)}
REMAINING: $${remaining.toFixed(2)}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "budget-planner.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Budget Planner</h1>
        <p className="text-muted-foreground">Track your budget and spending by category</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="p-4 bg-card/50">
          <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
          <p className="text-2xl font-bold">${totalBudget.toFixed(2)}</p>
        </Card>
        <Card className="p-4 bg-card/50">
          <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
          <p className="text-2xl font-bold text-red-500">${totalSpent.toFixed(2)}</p>
        </Card>
        <Card className="p-4 bg-card/50">
          <p className="text-sm text-muted-foreground mb-1">Remaining</p>
          <p className={`text-2xl font-bold ${remaining >= 0 ? "text-green-500" : "text-red-500"}`}>
            ${remaining.toFixed(2)}
          </p>
        </Card>
      </div>

      {/* Budget Items */}
      <div className="space-y-3 mb-8">
        {data.items.map((item) => {
          const percentage = item.amount > 0 ? (item.spent / item.amount) * 100 : 0
          return (
            <Card key={item.id} className="p-4">
              <div className="flex items-end gap-4 mb-3">
                <div className="flex-1">
                  <label className="text-sm font-semibold mb-1 block">Category</label>
                  <Input
                    value={item.category}
                    onChange={(e) => updateItem(item.id, "category", e.target.value)}
                    placeholder="e.g., Marketing, Salaries"
                  />
                </div>
                <div className="w-32">
                  <label className="text-sm font-semibold mb-1 block">Budget</label>
                  <Input
                    type="number"
                    value={item.amount}
                    onChange={(e) => updateItem(item.id, "amount", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="w-32">
                  <label className="text-sm font-semibold mb-1 block">Spent</label>
                  <Input
                    type="number"
                    value={item.spent}
                    onChange={(e) => updateItem(item.id, "spent", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${percentage > 100 ? "bg-red-500" : "bg-green-500"}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{percentage.toFixed(0)}% spent</p>
            </Card>
          )
        })}
      </div>

      <div className="flex gap-4">
        <Button onClick={addItem} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
        <Button onClick={downloadBudget} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download Budget
        </Button>
      </div>
    </div>
  )
}
