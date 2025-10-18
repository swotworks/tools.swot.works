import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const featuredTools = [
  {
    title: "SWOT Analysis",
    description: "Capture strengths, weaknesses, opportunities, and threats.",
    icon: "📊",
  },
  {
    title: "Business Model Canvas",
    description: "Map partners, activities, resources, value, and revenue.",
    icon: "🎯",
  },
  {
    title: "Lean Canvas",
    description: "Early-stage planning with a streamlined canvas.",
    icon: "⚡",
  },
  {
    title: "Pitch Deck Planner",
    description: "Outline a 10-slide investor-ready narrative.",
    icon: "🎤",
  },
]

export function FeaturedTools() {
  return (
    <section className="py-20 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Featured Tools</h2>
          <p className="text-muted-foreground">Start with these core planning frameworks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredTools.map((tool) => (
            <Card
              key={tool.title}
              className="group relative overflow-hidden p-6 hover:border-accent transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{tool.icon}</span>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">{tool.title}</h3>
              <p className="text-muted-foreground text-sm">{tool.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
