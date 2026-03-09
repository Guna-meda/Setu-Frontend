'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  QrCode,
  Users,
  TrendingUp,
  UserCheck,
  ArrowUpRight,
} from 'lucide-react'

// Mock data
const scanData = [
  { date: 'Mon', scans: 120, leads: 8 },
  { date: 'Tue', scans: 180, leads: 12 },
  { date: 'Wed', scans: 150, leads: 10 },
  { date: 'Thu', scans: 220, leads: 18 },
  { date: 'Fri', scans: 280, leads: 22 },
  { date: 'Sat', scans: 190, leads: 14 },
  { date: 'Sun', scans: 140, leads: 9 },
]

const employeePerformance = [
  { name: 'John Smith', scans: 1245, leads: 89 },
  { name: 'Jane Doe', scans: 2156, leads: 156 },
  { name: 'Mike Johnson', scans: 876, leads: 45 },
  { name: 'Sarah Wilson', scans: 1532, leads: 98 },
  { name: 'Alex Turner', scans: 654, leads: 32 },
]

const leadSources = [
  { name: 'Conference', value: 35, color: '#22C55E' },
  { name: 'Website', value: 25, color: '#10B981' },
  { name: 'Referral', value: 20, color: '#2BB673' },
  { name: 'Email', value: 15, color: '#34D399' },
  { name: 'Other', value: 5, color: '#6EE7B7' },
]

const stats = [
  {
    title: 'Total Scans',
    value: '12,459',
    change: '+12.5%',
    trend: 'up',
    icon: QrCode,
    description: 'vs last period',
  },
  {
    title: 'Leads Generated',
    value: '847',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    description: 'vs last period',
  },
  {
    title: 'Conversion Rate',
    value: '6.8%',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp,
    description: 'vs last period',
  },
  {
    title: 'Active Team',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: UserCheck,
    description: 'members',
  },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your card performance and team metrics</p>
        </div>
        <Select defaultValue="7d">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">{stat.change}</span>
                    <span className="text-sm text-muted-foreground">{stat.description}</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scans Over Time */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Scans & Leads Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scanData}>
                  <defs>
                    <linearGradient id="scansGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6EAE8" />
                  <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E6EAE8',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="scans"
                    stroke="#22C55E"
                    strokeWidth={2}
                    fill="url(#scansGradient)"
                    name="Scans"
                  />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="#10B981"
                    strokeWidth={2}
                    fill="url(#leadsGradient)"
                    name="Leads"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {leadSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E6EAE8',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {leadSources.map((source) => (
                <div key={source.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {source.name} ({source.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Performance */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Employee Performance</CardTitle>
            <Badge variant="secondary">Top 5</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employeePerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E6EAE8" />
                <XAxis type="number" stroke="#6B7280" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#6B7280" fontSize={12} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E6EAE8',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="scans" fill="#22C55E" name="Scans" radius={[0, 4, 4, 0]} />
                <Bar dataKey="leads" fill="#10B981" name="Leads" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Stats Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Team Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b border-border">
                  <th className="pb-3 font-medium">Employee</th>
                  <th className="pb-3 font-medium text-right">Scans</th>
                  <th className="pb-3 font-medium text-right">Leads</th>
                  <th className="pb-3 font-medium text-right">Conversion</th>
                  <th className="pb-3 font-medium text-right">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {employeePerformance.map((employee, index) => {
                  const conversion = ((employee.leads / employee.scans) * 100).toFixed(1)
                  const performance = index < 2 ? 'Excellent' : index < 4 ? 'Good' : 'Average'
                  const performanceColor = index < 2 ? 'text-green-600 bg-green-100' : index < 4 ? 'text-blue-600 bg-blue-100' : 'text-orange-600 bg-orange-100'
                  return (
                    <tr key={employee.name} className="hover:bg-muted/50 transition-colors">
                      <td className="py-3 font-medium text-foreground">{employee.name}</td>
                      <td className="py-3 text-right text-foreground">{employee.scans.toLocaleString()}</td>
                      <td className="py-3 text-right text-foreground">{employee.leads}</td>
                      <td className="py-3 text-right text-foreground">{conversion}%</td>
                      <td className="py-3 text-right">
                        <Badge variant="secondary" className={performanceColor}>
                          {performance}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
