import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 mb-6">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-xs font-medium text-muted-foreground">30+ Premium Tools</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
          Plan smarter. Build stronger.
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Your startup strategy workspace — fast, accurate, and live. 30+ premium tools for analysis, planning,
          execution, and communication.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="gap-2">
            Get Started <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline">
            Explore Tools
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border">
          {[
            { label: "Tools", value: "30+" },
            { label: "Teams", value: "10k+" },
            { label: "Uptime", value: "99.9%" },
            { label: "Support", value: "24/7" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
