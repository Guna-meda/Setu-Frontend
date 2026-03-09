'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Play, QrCode, Users, BarChart3, Sparkles, CheckCircle2, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 h-[700px] w-[700px] rounded-full bg-[#2F6F5F]/8 blur-[100px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 h-[500px] w-[500px] rounded-full bg-[#8ED1A6]/10 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-[#EAF6EF]/50 blur-[60px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8E520_1px,transparent_1px),linear-gradient(to_bottom,#E2E8E520_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <Badge 
              variant="secondary" 
              className="mb-8 px-4 py-2 text-sm font-medium border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              Now with AI-powered lead scoring
              <span className="ml-2 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance leading-[1.1]">
              Digital Business Cards for the{' '}
              <span className="relative">
                <span className="gradient-text">Modern Enterprise</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0 7 Q50 0 100 7 T200 7" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </h1>

            <p className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Create stunning digital visiting cards, capture leads instantly with QR codes, 
              and track performance analytics. The modern way to network and grow your business.
            </p>

            {/* Feature Pills */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              {[
                { icon: CheckCircle2, text: 'No credit card required' },
                { icon: Zap, text: 'Setup in 2 minutes' },
                { icon: Users, text: 'Free for teams up to 5' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="h-13 px-8 text-base rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-13 px-8 text-base rounded-xl border-2 hover:bg-secondary transition-all group">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mr-2 group-hover:bg-primary/20 transition-colors">
                  <Play className="h-3.5 w-3.5 text-primary ml-0.5" />
                </span>
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8">
              {[
                { value: '10K+', label: 'Active Users', color: '#2F6F5F' },
                { value: '500K+', label: 'Cards Created', color: '#4A9E7F' },
                { value: '2M+', label: 'Leads Captured', color: '#8ED1A6' },
              ].map((stat, i) => (
                <div key={i} className="relative">
                  <div 
                    className="absolute -inset-2 rounded-xl opacity-10"
                    style={{ backgroundColor: stat.color }}
                  />
                  <div className="relative">
                    <p 
                      className="text-3xl font-bold sm:text-4xl"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Card Preview */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Mockup */}
              <div className="relative mx-auto w-[300px] h-[600px] bg-card rounded-[44px] border-[6px] border-[#E2E8E5] shadow-2xl overflow-hidden">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#E2E8E5] rounded-b-2xl z-10" />
                
                {/* Card Content */}
                <div className="h-full pt-8 pb-4 px-4 flex flex-col">
                  {/* Cover */}
                  <div className="relative h-28 bg-gradient-to-br from-[#2F6F5F] via-[#4A9E7F] to-[#8ED1A6] rounded-2xl mb-10 overflow-hidden">
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
                            <circle cx="4" cy="4" r="1" fill="white" />
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#dots)" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-card border-4 border-card shadow-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#2F6F5F]">JS</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center mt-2">
                    <h3 className="font-bold text-lg text-foreground">John Smith</h3>
                    <p className="text-sm text-muted-foreground">Chief Technology Officer</p>
                    <p className="text-xs text-[#2F6F5F] font-medium mt-1">Acme Corporation</p>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-3 gap-2 mt-6">
                    {[
                      { icon: QrCode, label: 'QR Code' },
                      { icon: Users, label: 'Contact' },
                      { icon: BarChart3, label: 'Analytics' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#EAF6EF] hover:bg-[#DFF5EC] transition-colors cursor-pointer"
                      >
                        <div className="w-9 h-9 rounded-full bg-[#2F6F5F]/10 flex items-center justify-center">
                          <item.icon className="h-4 w-4 text-[#2F6F5F]" />
                        </div>
                        <span className="text-[10px] font-medium text-[#5F6F6B]">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#EAF6EF]">
                      <div className="w-9 h-9 rounded-full bg-[#2F6F5F]/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#2F6F5F]">@</span>
                      </div>
                      <span className="text-sm text-[#5F6F6B]">john@acmecorp.com</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#EAF6EF]">
                      <div className="w-9 h-9 rounded-full bg-[#2F6F5F]/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#2F6F5F]">+</span>
                      </div>
                      <span className="text-sm text-[#5F6F6B]">+1 (555) 123-4567</span>
                    </div>
                  </div>

                  {/* Save Button */}
                  <button className="mt-4 w-full py-3 rounded-xl bg-[#2F6F5F] text-white text-sm font-semibold hover:bg-[#2F6F5F]/90 transition-colors">
                    Save Contact
                  </button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -right-4 top-24 glass-card rounded-2xl p-4 shadow-xl float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2F6F5F]/10 flex items-center justify-center">
                    <QrCode className="h-5 w-5 text-[#2F6F5F]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">New Scan</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-6 bottom-36 glass-card rounded-2xl p-4 shadow-xl bounce-subtle" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8ED1A6]/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-[#2F6F5F]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Lead Captured</p>
                    <p className="text-xs text-muted-foreground">Sarah Johnson</p>
                  </div>
                </div>
              </div>

              <div className="absolute right-8 bottom-16 glass-card rounded-2xl p-3 shadow-xl float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i}
                        className="w-7 h-7 rounded-full border-2 border-card flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: ['#2F6F5F', '#4A9E7F', '#8ED1A6'][i-1], color: 'white' }}
                      >
                        {['A', 'B', 'C'][i-1]}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">+12 today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
