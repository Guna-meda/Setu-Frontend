'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Phone,
  Mail,
  Tag,
  Calendar,
  User,
  Trash2,
  Edit,
  Eye,
} from 'lucide-react'

// Mock data
const leads = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '+1 555-0123',
    email: 'sarah@techcorp.com',
    company: 'TechCorp Inc.',
    employee: 'John Smith',
    tag: 'Hot Lead',
    status: 'new',
    scanTime: '2024-03-15T10:30:00',
  },
  {
    id: '2',
    name: 'Michael Chen',
    phone: '+1 555-0124',
    email: 'mchen@innovate.io',
    company: 'Innovate.io',
    employee: 'Jane Doe',
    tag: 'Interested',
    status: 'contacted',
    scanTime: '2024-03-15T09:15:00',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    phone: '+1 555-0125',
    email: 'emma@globalretail.com',
    company: 'Global Retail',
    employee: 'John Smith',
    tag: 'Distributor',
    status: 'qualified',
    scanTime: '2024-03-14T14:45:00',
  },
  {
    id: '4',
    name: 'James Brown',
    phone: '+1 555-0126',
    email: 'jbrown@retailplus.com',
    company: 'Retail Plus',
    employee: 'Mike Johnson',
    tag: 'Retailer',
    status: 'new',
    scanTime: '2024-03-14T11:20:00',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    phone: '+1 555-0127',
    email: 'lisa@businesspro.com',
    company: 'Business Pro',
    employee: 'Jane Doe',
    tag: 'Hot Lead',
    status: 'converted',
    scanTime: '2024-03-13T16:30:00',
  },
  {
    id: '6',
    name: 'David Kim',
    phone: '+1 555-0128',
    email: 'dkim@startupx.com',
    company: 'StartupX',
    employee: 'John Smith',
    tag: 'Interested',
    status: 'contacted',
    scanTime: '2024-03-13T09:00:00',
  },
]

const tagColors: Record<string, string> = {
  'Hot Lead': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'Interested': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Distributor': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Retailer': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
}

const statusColors: Record<string, string> = {
  new: 'bg-green-100 text-green-700',
  contacted: 'bg-blue-100 text-blue-700',
  qualified: 'bg-purple-100 text-purple-700',
  converted: 'bg-primary/10 text-primary',
  lost: 'bg-gray-100 text-gray-700',
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [tagFilter, setTagFilter] = useState('all')
  const [employeeFilter, setEmployeeFilter] = useState('all')

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = tagFilter === 'all' || lead.tag === tagFilter
    const matchesEmployee = employeeFilter === 'all' || lead.employee === employeeFilter
    return matchesSearch && matchesTag && matchesEmployee
  })

  const employees = [...new Set(leads.map(l => l.employee))]
  const tags = [...new Set(leads.map(l => l.tag))]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contacts</h1>
          <p className="text-muted-foreground">Manage and track your captured leads</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold text-foreground">{leads.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hot Leads</p>
                <p className="text-2xl font-bold text-foreground">
                  {leads.filter(l => l.tag === 'Hot Lead').length}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-red-100">
                <Tag className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Converted</p>
                <p className="text-2xl font-bold text-foreground">
                  {leads.filter(l => l.status === 'converted').length}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-green-100">
                <User className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-foreground">{leads.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-100">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={tagFilter} onValueChange={setTagFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {tags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
                <SelectTrigger className="w-[160px]">
                  <User className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  {employees.map(emp => (
                    <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            Leads ({filteredLeads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b border-border">
                  <th className="pb-3 font-medium">Contact</th>
                  <th className="pb-3 font-medium">Phone</th>
                  <th className="pb-3 font-medium hidden md:table-cell">Employee</th>
                  <th className="pb-3 font-medium">Tag</th>
                  <th className="pb-3 font-medium hidden lg:table-cell">Status</th>
                  <th className="pb-3 font-medium hidden sm:table-cell">Time</th>
                  <th className="pb-3 font-medium w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/50 transition-colors group">
                    <td className="py-3">
                      <div>
                        <p className="font-medium text-foreground">{lead.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{lead.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{lead.phone}</span>
                      </div>
                    </td>
                    <td className="py-3 hidden md:table-cell text-muted-foreground">
                      {lead.employee}
                    </td>
                    <td className="py-3">
                      <Badge variant="secondary" className={tagColors[lead.tag]}>
                        {lead.tag}
                      </Badge>
                    </td>
                    <td className="py-3 hidden lg:table-cell">
                      <Badge variant="secondary" className={statusColors[lead.status]}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground hidden sm:table-cell">
                      {formatDate(lead.scanTime)}
                    </td>
                    <td className="py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 rounded-lg text-muted-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Edit Lead
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            Change Tag
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredLeads.length === 0 && (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-1">No leads found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
