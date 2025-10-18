"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, Plus, Trash2 } from "lucide-react"

interface Persona {
  id: string
  name: string
  role: string
  goals: string
  painPoints: string
  demographics: string
  behaviors: string
}

interface PersonaData {
  personas: Persona[]
}

export function CustomerPersonaBuilder() {
  const [data, setData] = useState<PersonaData>({
    personas: [],
  })

  const addPersona = () => {
    setData((prev) => ({
      ...prev,
      personas: [
        ...prev.personas,
        {
          id: Date.now().toString(),
          name: "",
          role: "",
          goals: "",
          painPoints: "",
          demographics: "",
          behaviors: "",
        },
      ],
    }))
  }

  const updatePersona = (id: string, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      personas: prev.personas.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }))
  }

  const deletePersona = (id: string) => {
    setData((prev) => ({
      ...prev,
      personas: prev.personas.filter((p) => p.id !== id),
    }))
  }

  const downloadPersonas = () => {
    const content = `Customer Personas

${data.personas
  .map(
    (p) => `PERSONA: ${p.name}
Role: ${p.role}
Demographics: ${p.demographics}

Goals:
${p.goals}

Pain Points:
${p.painPoints}

Behaviors:
${p.behaviors}

`,
  )
  .join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "customer-personas.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Customer Persona Builder</h1>
        <p className="text-muted-foreground">Create detailed customer personas for your business</p>
      </div>

      <div className="space-y-6 mb-8">
        {data.personas.map((persona) => (
          <Card key={persona.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Input
                value={persona.name}
                onChange={(e) => updatePersona(persona.id, "name", e.target.value)}
                placeholder="Persona name..."
                className="text-lg font-bold flex-1 mr-4"
              />
              <Button variant="ghost" size="sm" onClick={() => deletePersona(persona.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Role/Title</label>
                <Input
                  value={persona.role}
                  onChange={(e) => updatePersona(persona.id, "role", e.target.value)}
                  placeholder="e.g., Marketing Manager"
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Demographics</label>
                <Input
                  value={persona.demographics}
                  onChange={(e) => updatePersona(persona.id, "demographics", e.target.value)}
                  placeholder="Age, location, income, etc."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Goals</label>
                <Textarea
                  value={persona.goals}
                  onChange={(e) => updatePersona(persona.id, "goals", e.target.value)}
                  placeholder="What does this persona want to achieve?"
                  className="min-h-20 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Pain Points</label>
                <Textarea
                  value={persona.painPoints}
                  onChange={(e) => updatePersona(persona.id, "painPoints", e.target.value)}
                  placeholder="What challenges do they face?"
                  className="min-h-20 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Behaviors</label>
                <Textarea
                  value={persona.behaviors}
                  onChange={(e) => updatePersona(persona.id, "behaviors", e.target.value)}
                  placeholder="How do they behave? What are their habits?"
                  className="min-h-20 resize-none"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={addPersona} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Persona
        </Button>
        <Button onClick={downloadPersonas} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download Personas
        </Button>
      </div>
    </div>
  )
}
