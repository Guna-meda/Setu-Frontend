'use client'

import { QrCode, Users, BarChart3, Plug, Shield, Smartphone } from 'lucide-react'

const features = [
  {
    icon: QrCode,
    title: 'QR Digital Cards',
    description: 'Generate unique QR codes for each team member. One scan and your contact info is saved instantly.',
  },
  {
    icon: Users,
    title: 'Lead Capture',
    description: 'Automatically capture lead information when someone scans your card. No manual data entry required.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Tracking',
    description: 'Track scans, conversions, and team performance with real-time analytics and insights.',
  },
  {
    icon: Plug,
    title: 'Integrations',
    description: 'Connect with your favorite CRM, email marketing, and communication tools seamlessly.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption, SSO support, and compliance with industry security standards.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Beautiful, responsive cards that look perfect on any device. No app download required.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Features
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Everything you need to digitize your networking
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed for enterprise teams to create, manage, and track digital business cards.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-2xl border border-border bg-background hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
