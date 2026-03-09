'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  QrCode,
  Users,
  TrendingUp,
  UserCheck,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Share2,
  BarChart3,
  Clock,
  Sparkles,
  Eye,
} from 'lucide-react'

// Mock data
const stats = [
  {
    title: 'Total Scans',
    value: '12,459',
    change: '+12.5%',
    trend: 'up',
    icon: QrCode,
    gradient: 'from-[#2F6F5F] to-[#4A9E7F]',
    bgColor: 'bg-[#2F6F5F]/10',
    iconColor: 'text-[#2F6F5F]',
  },
  {
    title: 'Leads Generated',
    value: '847',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    gradient: 'from-[#4A9E7F] to-[#8ED1A6]',
    bgColor: 'bg-[#4A9E7F]/10',
    iconColor: 'text-[#4A9E7F]',
  },
  {
    title: 'Conversion Rate',
    value: '6.8%',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp,
    gradient: 'from-[#8ED1A6] to-[#2F6F5F]',
    bgColor: 'bg-[#8ED1A6]/20',
    iconColor: 'text-[#2F6F5F]',
  },
  {
    title: 'Active Employees',
    value: '24',
    change: '+4',
    trend: 'up',
    icon: UserCheck,
    gradient: 'from-[#2F6F5F] to-[#8ED1A6]',
    bgColor: 'bg-[#2F6F5F]/10',
    iconColor: 'text-[#2F6F5F]',
  },
]

const recentLeads = [
  { name: 'Sarah Johnson', phone: '+1 555-0123', employee: 'John Smith', tag: 'Hot Lead', time: '2 min ago', avatar: 'SJ' },
  { name: 'Michael Chen', phone: '+1 555-0124', employee: 'Jane Doe', tag: 'Interested', time: '15 min ago', avatar: 'MC' },
  { name: 'Emma Wilson', phone: '+1 555-0125', employee: 'John Smith', tag: 'Distributor', time: '1 hour ago', avatar: 'EW' },
  { name: 'James Brown', phone: '+1 555-0126', employee: 'Mike Johnson', tag: 'Retailer', time: '2 hours ago', avatar: 'JB' },
  { name: 'Lisa Anderson', phone: '+1 555-0127', employee: 'Jane Doe', tag: 'Hot Lead', time: '3 hours ago', avatar: 'LA' },
]

const recentActivity = [
  { type: 'scan', message: 'New scan from Sarah Johnson', time: '2 min ago', icon: Eye, color: 'bg-blue-100 text-blue-600' },
  { type: 'lead', message: 'Lead captured: Michael Chen', time: '15 min ago', icon: Users, color: 'bg-green-100 text-green-600' },
  { type: 'card', message: 'John Smith updated their card', time: '1 hour ago', icon: QrCode, color: 'bg-purple-100 text-purple-600' },
  { type: 'team', message: 'New employee added: Alex Turner', time: '2 hours ago', icon: UserCheck, color: 'bg-orange-100 text-orange-600' },
  { type: 'integration', message: 'WhatsApp integration enabled', time: '5 hours ago', icon: Sparkles, color: 'bg-pink-100 text-pink-600' },
]

const tagColors: Record<string, { bg: string; text: string; dot: string }> = {
  'Hot Lead': { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  'Interested': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Distributor': { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  'Retailer': { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, John!</h1>
          <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening with your cards today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-border/50" asChild>
            <Link href="/dashboard/analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Link>
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20" asChild>
            <Link href="/dashboard/cards/new">
              <Plus className="h-4 w-4 mr-2" />
              New Card
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="group relative overflow-hidden border-0 shadow-smooth hover:shadow-lg transition-all duration-300 card-interactive"
          >
            {/* Gradient accent */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2 tracking-tight">{stat.value}</p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {stat.change}
                    </div>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className={`p-3.5 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-5 sm:grid-cols-3">
        <Link href="/dashboard/cards/new">
          <Card className="group h-full border-0 shadow-smooth hover:shadow-lg transition-all duration-300 cursor-pointer card-interactive overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Plus className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Create Employee Card</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">Add a new digital card for your team</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="group h-full border-0 shadow-smooth hover:shadow-lg transition-all duration-300 cursor-pointer card-interactive overflow-hidden">
          <CardContent className="p-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8ED1A6]/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-[#8ED1A6]/20 group-hover:bg-[#8ED1A6] group-hover:scale-110 transition-all duration-300">
                <Share2 className="h-6 w-6 text-[#2F6F5F] group-hover:text-[#1F2D2A]" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-[#2F6F5F] transition-colors">Share QR Code</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Share your card with others</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Link href="/dashboard/analytics">
          <Card className="group h-full border-0 shadow-smooth hover:shadow-lg transition-all duration-300 cursor-pointer card-interactive overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4A9E7F]/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-[#4A9E7F]/10 group-hover:bg-[#4A9E7F] group-hover:scale-110 transition-all duration-300">
                  <BarChart3 className="h-6 w-6 text-[#4A9E7F] group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-[#4A9E7F] transition-colors">View Analytics</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">Track your card performance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Leads Table */}
        <Card className="lg:col-span-2 border-0 shadow-smooth">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg font-semibold">Recent Leads</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10" asChild>
              <Link href="/dashboard/contacts">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground border-b border-border">
                    <th className="pb-3 font-semibold uppercase tracking-wider">Lead</th>
                    <th className="pb-3 font-semibold uppercase tracking-wider">Phone</th>
                    <th className="pb-3 font-semibold uppercase tracking-wider hidden sm:table-cell">Employee</th>
                    <th className="pb-3 font-semibold uppercase tracking-wider">Tag</th>
                    <th className="pb-3 font-semibold uppercase tracking-wider hidden md:table-cell">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {recentLeads.map((lead, index) => (
                    <tr key={index} className="group hover:bg-secondary/30 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-[#4A9E7F] flex items-center justify-center text-xs font-bold text-white">
                            {lead.avatar}
                          </div>
                          <span className="font-medium text-foreground">{lead.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-muted-foreground font-mono text-sm">{lead.phone}</td>
                      <td className="py-4 text-muted-foreground hidden sm:table-cell">{lead.employee}</td>
                      <td className="py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${tagColors[lead.tag].bg} ${tagColors[lead.tag].text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${tagColors[lead.tag].dot}`} />
                          {lead.tag}
                        </div>
                      </td>
                      <td className="py-4 text-muted-foreground text-sm hidden md:table-cell">{lead.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border-0 shadow-smooth">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#8ED1A6]/20">
                <Clock className="h-5 w-5 text-[#2F6F5F]" />
              </div>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="group flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer">
                  <div className={`p-2 rounded-xl ${activity.color} group-hover:scale-110 transition-transform`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
