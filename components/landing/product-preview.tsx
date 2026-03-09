'use client'

import { Check } from 'lucide-react'

const dashboardFeatures = [
  'Real-time analytics dashboard',
  'Team management & roles',
  'Custom card templates',
  'Lead tagging & scoring',
  'Export & integrations',
  'White-label options',
]

export function ProductPreview() {
  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Dashboard Preview */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl border border-border shadow-2xl overflow-hidden bg-card">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-lg bg-background text-xs text-muted-foreground">
                    app.cardflow.com/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-4 sm:p-6 bg-background">
                {/* Mini Sidebar + Content Layout */}
                <div className="flex gap-4">
                  {/* Mini Sidebar */}
                  <div className="hidden sm:flex flex-col gap-2 w-12">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-lg ${i === 1 ? 'bg-primary' : 'bg-muted'}`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { label: 'Total Scans', value: '12,459', color: 'primary' },
                        { label: 'Leads', value: '847', color: 'accent' },
                        { label: 'Conversion', value: '6.8%', color: 'primary' },
                        { label: 'Active', value: '24', color: 'accent' },
                      ].map((stat) => (
                        <div key={stat.label} className="p-3 rounded-xl bg-muted/50 border border-border">
                          <p className="text-[10px] text-muted-foreground truncate">{stat.label}</p>
                          <p className={`text-lg font-bold ${stat.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Chart Placeholder */}
                    <div className="h-32 sm:h-40 rounded-xl bg-muted/30 border border-border p-4">
                      <div className="flex items-end justify-between h-full gap-2">
                        {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 65, 80].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-primary/20 rounded-t transition-all hover:bg-primary/40"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Table Preview */}
                    <div className="rounded-xl border border-border overflow-hidden">
                      <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-muted/50 text-xs text-muted-foreground">
                        <span>Name</span>
                        <span>Phone</span>
                        <span>Tag</span>
                        <span>Time</span>
                      </div>
                      {[
                        { name: 'Sarah J.', phone: '+1 555-0123', tag: 'Hot Lead', time: '2m ago' },
                        { name: 'Michael R.', phone: '+1 555-0124', tag: 'Interested', time: '15m ago' },
                        { name: 'Emma W.', phone: '+1 555-0125', tag: 'Distributor', time: '1h ago' },
                      ].map((lead, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 px-4 py-2.5 text-xs border-t border-border">
                          <span className="font-medium text-foreground">{lead.name}</span>
                          <span className="text-muted-foreground">{lead.phone}</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] w-fit">
                            {lead.tag}
                          </span>
                          <span className="text-muted-foreground">{lead.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -bottom-8 -left-8 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Dashboard
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Powerful analytics at your fingertips
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Get a complete overview of your digital card performance. Track scans, 
              manage leads, and measure team performance all from one intuitive dashboard.
            </p>

            <ul className="mt-8 space-y-3">
              {dashboardFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
