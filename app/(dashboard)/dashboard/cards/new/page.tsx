'use client'

import { CardBuilder } from '@/components/cards/card-builder'

export default function NewCardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Create New Card</h1>
        <p className="text-muted-foreground">Design your digital business card with live preview</p>
      </div>

      <CardBuilder />
    </div>
  )
}
