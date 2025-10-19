"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"

interface Slide {
  id: string
  title: string
  content: string
  order: number
}

interface PitchDeckData {
  slides: Slide[]
}

export function PitchDeckPlanner() {
  const [data, setData] = useState<PitchDeckData>({
    slides: [],
  })

  const addSlide = () => {
    const newOrder = Math.max(...data.slides.map((s) => s.order), 0) + 1
    setData((prev) => ({
      ...prev,
      slides: [
        ...prev.slides,
        {
          id: Date.now().toString(),
          title: "",
          content: "",
          order: newOrder,
        },
      ],
    }))
  }

  const updateSlide = (id: string, field: keyof Slide, value: string | number) => {
    setData((prev) => ({
      ...prev,
      slides: prev.slides.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }))
  }

  const deleteSlide = (id: string) => {
    setData((prev) => ({
      ...prev,
      slides: prev.slides.filter((s) => s.id !== id),
    }))
  }

  const moveSlide = (id: string, direction: "up" | "down") => {
    const index = data.slides.findIndex((s) => s.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === data.slides.length - 1)) {
      return
    }

    const newSlides = [...data.slides]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    ;[newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]]

    setData((prev) => ({
      ...prev,
      slides: newSlides.map((s, i) => ({ ...s, order: i + 1 })),
    }))
  }

  const downloadPitchDeck = () => {
    const content = `Pitch Deck

${data.slides
  .map(
    (slide) => `SLIDE ${slide.order}: ${slide.title}
${slide.content}

`,
  )
  .join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "pitch-deck.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Pitch Deck Planner</h1>
        <p className="text-muted-foreground">Create a compelling 10-slide investor pitch deck</p>
      </div>

      <div className="space-y-4 mb-8">
        {data.slides.map((slide, index) => (
          <Card key={slide.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-muted-foreground">Slide {slide.order}</span>
                  <Input
                    value={slide.title}
                    onChange={(e) => updateSlide(slide.id, "title", e.target.value)}
                    placeholder="Slide title..."
                    className="text-lg font-bold flex-1"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => moveSlide(slide.id, "up")} disabled={index === 0}>
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSlide(slide.id, "down")}
                  disabled={index === data.slides.length - 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteSlide(slide.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Textarea
              value={slide.content}
              onChange={(e) => updateSlide(slide.id, "content", e.target.value)}
              placeholder="Slide content..."
              className="min-h-32 resize-none"
            />
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={addSlide} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Slide
        </Button>
        <Button onClick={downloadPitchDeck} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download Deck
        </Button>
      </div>
    </div>
  )
}
