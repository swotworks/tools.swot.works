"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, Plus, Trash2 } from "lucide-react"

interface Message {
  id: string
  audience: string
  message: string
  channel: string
}

interface MessagingData {
  messages: Message[]
}

export function MessagingMatrix() {
  const [data, setData] = useState<MessagingData>({
    messages: [],
  })

  const addMessage = () => {
    setData((prev) => ({
      ...prev,
      messages: [...prev.messages, { id: Date.now().toString(), audience: "", message: "", channel: "" }],
    }))
  }

  const updateMessage = (id: string, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((msg) => (msg.id === id ? { ...msg, [field]: value } : msg)),
    }))
  }

  const deleteMessage = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.filter((msg) => msg.id !== id),
    }))
  }

  const downloadMatrix = () => {
    const content = `Messaging Matrix

${data.messages
  .map(
    (msg) => `AUDIENCE: ${msg.audience}
Channel: ${msg.channel}
Message: ${msg.message}

`,
  )
  .join("\n")}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "messaging-matrix.txt"
    a.click()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Messaging Matrix</h1>
        <p className="text-muted-foreground">Define your messaging for different audiences</p>
      </div>

      <div className="space-y-4 mb-8">
        {data.messages.map((msg) => (
          <Card key={msg.id} className="p-4">
            <div className="flex gap-4 items-end mb-3">
              <Input
                value={msg.audience}
                onChange={(e) => updateMessage(msg.id, "audience", e.target.value)}
                placeholder="Target audience..."
                className="flex-1"
              />
              <Input
                value={msg.channel}
                onChange={(e) => updateMessage(msg.id, "channel", e.target.value)}
                placeholder="Channel..."
                className="w-40"
              />
              <Button variant="ghost" size="sm" onClick={() => deleteMessage(msg.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={msg.message}
              onChange={(e) => updateMessage(msg.id, "message", e.target.value)}
              placeholder="Your message..."
              className="min-h-20 resize-none"
            />
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={addMessage} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Message
        </Button>
        <Button onClick={downloadMatrix} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download Matrix
        </Button>
      </div>
    </div>
  )
}
