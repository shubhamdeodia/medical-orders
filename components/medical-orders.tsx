"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ChevronDown,
  ChevronRight,
  Check,
  X,
  ExternalLink,
  Sparkles,
  FileText,
  Info,
  AlertTriangle,
} from "lucide-react"

interface Evidence {
  source: string
  title: string
  url: string
  summary?: string
}

interface Order {
  id: string
  type: "physician" | "ai-suggestion"
  text: string
  status?: "accepted" | "rejected" | "pending"
  priority?: "high" | "medium" | "low"
  evidence?: Evidence[]
  transcript?: string
}

const mockOrders: Order[] = [
  {
    id: "order-4",
    type: "physician",
    text: "blood test TSH labs today for fatigue",
    transcript: "Patient reports fatigue, order TSH labs today",
  },
  {
    id: "order-5",
    type: "ai-suggestion",
    text: "Influenza vaccination - Annual",
    status: "accepted",
    priority: "medium",
    evidence: [
      {
        source: "CDC",
        title: "Seasonal Influenza Vaccination Recommendations",
        url: "https://cdc.gov/flu/professionals/vaccination/",
        summary: "Annual influenza vaccination recommended for all persons aged ≥6 months",
      },
    ],
  },
]

const mockSuggestions: Order[] = [
  {
    id: "suggestion-1",
    type: "ai-suggestion",
    text: "Pneumococcal vaccination - PPSV23",
    status: "pending",
    priority: "high",
    evidence: [
      {
        source: "CDC",
        title: "Pneumococcal Vaccination Guidelines",
        url: "https://cdc.gov/vaccines/vpd/pneumo/",
        summary: "PPSV23 recommended for adults 65+ and high-risk conditions",
      },
      {
        source: "USPSTF",
        title: "Pneumococcal Vaccination in Adults",
        url: "https://uspreventiveservicestaskforce.org/uspstf/recommendation/pneumococcal-vaccination-adults",
        summary: "Grade A recommendation for pneumococcal vaccination",
      },
    ],
  },
  {
    id: "suggestion-2",
    type: "ai-suggestion",
    text: "COVID-19 booster vaccination",
    status: "pending",
    priority: "medium",
    evidence: [
      {
        source: "CDC",
        title: "COVID-19 Booster Recommendations",
        url: "https://cdc.gov/coronavirus/2019-ncov/vaccines/booster-shot.html",
        summary: "Updated COVID-19 boosters recommended annually",
      },
    ],
  },
]

function OrderItem({
  order,
  onAccept,
  onReject,
}: {
  order: Order
  onAccept?: () => void
  onReject?: () => void
}) {
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false)

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-warning"
      case "low":
        return "text-muted-foreground"
      default:
        return "text-muted-foreground"
    }
  }

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <Info className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox id={order.id} className="mt-1" checked={order.status === "accepted"} />

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <label
                htmlFor={order.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {order.type === "physician"
                  ? `Order ${order.id.split("-")[1]}`
                  : `Suggested order ${order.id.split("-")[1]}`}
              </label>

              {order.type === "ai-suggestion" && (
                <>
                  <Badge variant="secondary" className="text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Suggestion
                  </Badge>
                  {order.priority && (
                    <div className={`flex items-center gap-1 text-xs ${getPriorityColor(order.priority)}`}>
                      {getPriorityIcon(order.priority)}
                      {order.priority.toUpperCase()}
                    </div>
                  )}
                </>
              )}

              {order.status === "accepted" && (
                <Badge variant="default" className="text-xs bg-success text-success-foreground">
                  Accepted
                </Badge>
              )}
            </div>

            <Textarea value={order.text} readOnly className="min-h-[60px] resize-none bg-muted/30" />

            {order.transcript && (
              <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
                <FileText className="h-3 w-3 inline mr-1" />
                Transcript: {order.transcript}
              </div>
            )}

            {order.type === "ai-suggestion" && order.evidence && (
              <Collapsible open={isEvidenceOpen} onOpenChange={setIsEvidenceOpen}>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {isEvidenceOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  Evidence from credible sources ({order.evidence.length})
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-3 space-y-2">
                  {order.evidence.map((evidence, index) => (
                    <div key={index} className="bg-accent/50 p-3 rounded-md border-l-2 border-primary/30">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{evidence.source}</div>
                          <div className="text-sm text-muted-foreground mb-2">{evidence.title}</div>
                          {evidence.summary && <div className="text-xs text-muted-foreground">{evidence.summary}</div>}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => window.open(evidence.url, "_blank")}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {order.type === "ai-suggestion" && order.status === "pending" && (
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={onAccept} className="bg-success hover:bg-success/90 text-success-foreground">
                  <Check className="h-4 w-4 mr-1" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onReject}
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                >
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MedicalOrders() {
  const [orders, setOrders] = useState(mockOrders)
  const [suggestions, setSuggestions] = useState(mockSuggestions)
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(true)

  const handleAccept = (suggestionId: string) => {
    setSuggestions((prev) => prev.map((s) => (s.id === suggestionId ? { ...s, status: "accepted" as const } : s)))
  }

  const handleReject = (suggestionId: string) => {
    setSuggestions((prev) => prev.map((s) => (s.id === suggestionId ? { ...s, status: "rejected" as const } : s)))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-balance">Patient Orders</h2>

        {/* Physician Orders */}
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>

        {/* AI Suggestions Section */}
        <Collapsible open={isSuggestionsOpen} onOpenChange={setIsSuggestionsOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors">
            {isSuggestionsOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            Suggestions from credible sources
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4 space-y-4">
            {suggestions.map((suggestion) => (
              <OrderItem
                key={suggestion.id}
                order={suggestion}
                onAccept={() => handleAccept(suggestion.id)}
                onReject={() => handleReject(suggestion.id)}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
