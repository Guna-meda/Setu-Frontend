'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'For individuals getting started with digital cards',
    features: [
      '1 digital card',
      'Basic QR code',
      'Up to 100 scans/month',
      'Email support',
    ],
    cta: 'Start Free',
    href: '/signup',
    featured: false,
  },
  {
    name: 'Professional',
    price: '$29',
    period: '/month',
    description: 'For growing teams and businesses',
    features: [
      'Up to 10 team members',
      'Custom card templates',
      'Unlimited scans',
      'Lead capture & tagging',
      'Analytics dashboard',
      'CRM integrations',
      'Priority support',
    ],
    cta: 'Start Trial',
    href: '/signup?plan=pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/user/month',
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited team members',
      'White-label branding',
      'Advanced analytics',
      'API access',
      'SSO & security',
      'Dedicated success manager',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    featured: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Pricing
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your team. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-300 ${
                plan.featured
                  ? 'bg-foreground text-background border-2 border-foreground scale-105 shadow-2xl'
                  : 'bg-background border border-border hover:border-primary/50 hover:shadow-lg'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-semibold ${plan.featured ? 'text-background' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-baseline">
                  <span className={`text-4xl font-bold ${plan.featured ? 'text-background' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  <span className={`ml-1 text-sm ${plan.featured ? 'text-background/70' : 'text-muted-foreground'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mt-2 text-sm ${plan.featured ? 'text-background/70' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.featured ? 'bg-primary' : 'bg-primary/10'
                    }`}>
                      <Check className={`h-3 w-3 ${plan.featured ? 'text-primary-foreground' : 'text-primary'}`} />
                    </div>
                    <span className={`text-sm ${plan.featured ? 'text-background/90' : 'text-foreground'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="w-full"
                variant={plan.featured ? 'secondary' : 'default'}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
