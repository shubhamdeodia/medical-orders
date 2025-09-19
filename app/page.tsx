import { MedicalOrders } from "@/components/medical-orders"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-balance mb-2">Medical Orders System</h1>
          <p className="text-muted-foreground text-pretty">
            Manage physician-narrated orders and AI-suggested treatments with evidence-based recommendations
          </p>
        </div>
        <MedicalOrders />
      </div>
    </main>
  )
}
