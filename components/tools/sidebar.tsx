"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, Search } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

const TOOL_CATEGORIES = [
  {
    name: "Analysis",
    tools: [
      { name: "SWOT Analysis", path: "/tools/swot" },
      { name: "PESTEL Analysis", path: "/tools/pestel" },
      { name: "Porter's Five Forces", path: "/tools/porters-five-forces" },
      { name: "Competitor Analysis", path: "/tools/competitor-analysis" },
      { name: "Insights Log", path: "/tools/insights-log" },
    ],
  },
  {
    name: "Canvas",
    tools: [
      { name: "Business Model Canvas", path: "/tools/business-model-canvas" },
      { name: "Lean Canvas", path: "/tools/lean-canvas" },
      { name: "Value Proposition Canvas", path: "/tools/value-proposition" },
      { name: "Customer Persona Builder", path: "/tools/customer-persona" },
    ],
  },
  {
    name: "Planning",
    tools: [
      { name: "OKR Planner", path: "/tools/okr-planner" },
      { name: "Strategy Roadmap", path: "/tools/strategy-roadmap" },
      { name: "Go-To-Market Planner", path: "/tools/go-to-market" },
      { name: "Pitch Deck Planner", path: "/tools/pitch-deck" },
      { name: "1-Page Strategy Brief", path: "/tools/strategy-brief" },
      { name: "Strategy Narrative Builder", path: "/tools/strategy-narrative" },
      { name: "Strategy Retro Board", path: "/tools/strategy-retro" },
    ],
  },
  {
    name: "Financial",
    tools: [
      { name: "Budget Planner", path: "/tools/budget-planner" },
      { name: "P&L Planner", path: "/tools/p-and-l" },
      { name: "Cash Flow Projection", path: "/tools/cash-flow" },
      { name: "Break-even Analysis", path: "/tools/break-even" },
      { name: "Unit Economics", path: "/tools/unit-economics" },
      { name: "Balance Sheet Planner", path: "/tools/balance-sheet" },
      { name: "Pricing Strategy", path: "/tools/pricing-strategy" },
      { name: "Pricing Calculator", path: "/tools/pricing-calculator" },
    ],
  },
  {
    name: "Metrics & KPIs",
    tools: [
      { name: "KPI Dashboard", path: "/tools/kpi-dashboard" },
      { name: "North Star Metric", path: "/tools/north-star" },
      { name: "Strategy Scorecard", path: "/tools/strategy-scorecard" },
      { name: "Risk Matrix", path: "/tools/risk-matrix" },
    ],
  },
  {
    name: "Operations",
    tools: [
      { name: "Operating Model Mapper", path: "/tools/operating-model" },
      { name: "Learning Roadmap", path: "/tools/learning-roadmap" },
      { name: "Messaging Matrix", path: "/tools/messaging-matrix" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Analysis", "Canvas", "Planning"])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const filteredCategories = TOOL_CATEGORIES.map((category) => ({
    ...category,
    tools: category.tools.filter((tool) => tool.name.toLowerCase().includes(searchQuery.toLowerCase())),
  })).filter((category) => category.tools.length > 0 || !searchQuery)

  return (
    <div className="w-64 border-r border-border bg-sidebar flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold text-sidebar-foreground mb-4">Strategy Lab</h1>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-auto">
        {filteredCategories.map((category) => (
          <div key={category.name} className="border-b border-border last:border-b-0">
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-sidebar-accent/50 transition-colors"
            >
              <span className="font-semibold text-sm text-sidebar-foreground">{category.name}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  expandedCategories.includes(category.name) ? "rotate-180" : "",
                )}
              />
            </button>

            {expandedCategories.includes(category.name) && (
              <div className="bg-sidebar-accent/20">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.path}
                    href={tool.path}
                    className={cn(
                      "block px-4 py-2 text-sm transition-colors border-l-2",
                      pathname === tool.path
                        ? "bg-sidebar-primary/20 border-sidebar-primary text-sidebar-primary font-medium"
                        : "border-transparent text-sidebar-foreground hover:bg-sidebar-accent/30",
                    )}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border text-xs text-muted-foreground">
        <p className="font-semibold mb-1">32 Premium Tools</p>
        <p>Fast • Powerful • Free</p>
      </div>
    </div>
  )
}
