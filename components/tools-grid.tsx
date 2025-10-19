"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Heart } from "lucide-react"

const allTools = [
  { name: "SWOT Analysis", category: "Analysis", tags: ["alignment", "diagnostic"] },
  { name: "Business Model Canvas", category: "Planning", tags: ["growth", "foundations"] },
  { name: "Lean Canvas", category: "Planning", tags: ["alignment", "growth"] },
  { name: "Pitch Deck Planner", category: "Communication", tags: ["pricing", "foundations"] },
  { name: "KPI Dashboard", category: "Execution", tags: ["diagnostic", "research"] },
  { name: "1-Page Strategy Brief", category: "Planning", tags: ["alignment", "growth"] },
  { name: "Balance Sheet Planner", category: "Analysis", tags: ["finance", "research"] },
  { name: "Pitch Deck Builder", category: "Communication", tags: ["pricing", "margin"] },
  { name: "Strategy Scorecard", category: "Execution", tags: ["diagnostic", "foundations"] },
  { name: "Value Proposition Canvas", category: "Planning", tags: ["growth", "research"] },
  { name: "Customer Persona Builder", category: "Analysis", tags: ["alignment", "research"] },
  { name: "Go-To-Market Planner", category: "Planning", tags: ["growth", "pricing"] },
  { name: "Pricing Strategy", category: "Analysis", tags: ["pricing", "margin"] },
  { name: "Messaging Matrix", category: "Communication", tags: ["alignment", "foundations"] },
  { name: "Break-even Analysis", category: "Analysis", tags: ["finance", "diagnostic"] },
  { name: "Budget Planner", category: "Execution", tags: ["finance", "research"] },
  { name: "Cash Flow Projection", category: "Analysis", tags: ["finance", "margin"] },
  { name: "Competitor Analysis", category: "Analysis", tags: ["research", "diagnostic"] },
  { name: "Insights Log", category: "Execution", tags: ["alignment", "research"] },
  { name: "Learning Roadmap", category: "Planning", tags: ["growth", "foundations"] },
  { name: "North Star Metric", category: "Execution", tags: ["diagnostic", "alignment"] },
  { name: "OKR Planner", category: "Planning", tags: ["alignment", "growth"] },
  { name: "Operating Model Mapper", category: "Analysis", tags: ["foundations", "research"] },
  { name: "P&L Planner", category: "Analysis", tags: ["finance", "diagnostic"] },
  { name: "PESTEL Analysis", category: "Analysis", tags: ["research", "diagnostic"] },
  { name: "Porter's Five Forces", category: "Analysis", tags: ["research", "competitive"] },
  { name: "Pricing Calculator", category: "Execution", tags: ["pricing", "finance"] },
  { name: "Risk Matrix", category: "Planning", tags: ["diagnostic", "foundations"] },
  { name: "Strategy Narrative Builder", category: "Communication", tags: ["alignment", "growth"] },
  { name: "Strategy Retro Board", category: "Execution", tags: ["alignment", "diagnostic"] },
  { name: "Strategy Roadmap", category: "Planning", tags: ["growth", "alignment"] },
  { name: "Unit Economics", category: "Analysis", tags: ["finance", "pricing"] },
]

const categories = ["All", "Analysis", "Planning", "Execution", "Communication"]
const tags = ["alignment", "growth", "finance", "research", "pricing", "margin", "diagnostic", "foundations"]

export function ToolsGrid() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => tool.tags.includes(tag))
      return matchesSearch && matchesCategory && matchesTags
    })
  }, [search, selectedCategory, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const toggleFavorite = (toolName: string) => {
    setFavorites((prev) => (prev.includes(toolName) ? prev.filter((t) => t !== toolName) : [...prev, toolName]))
  }

  return (
    <section className="py-20 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Complete Toolkit</h2>
          <p className="text-muted-foreground">
            All 30+ premium tools available for free. Search, filter, and explore.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search tools... (Press / to focus • Cmd/Ctrl+K for Command)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Heart size={18} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Favorites</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Tag Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedTags.includes(tag)
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              #{tag}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="px-3 py-1 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <Card
              key={tool.name}
              className="group relative p-4 hover:border-accent transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{tool.category}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(tool.name)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  <Heart
                    size={16}
                    className={favorites.includes(tool.name) ? "fill-accent text-accent" : "text-muted-foreground"}
                  />
                </button>
              </div>

              <div className="flex flex-wrap gap-1">
                {tool.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </section>
  )
}
