'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Plus,
  Building2,
  User,
  QrCode,
  Eye,
  Edit,
  MoreVertical,
  Scan,
  Users,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock data
const cards = [
  {
    id: '1',
    type: 'company' as const,
    name: 'Acme Corporation',
    subtitle: 'Official Company Card',
    totalScans: 5420,
    totalLeads: 312,
    lastUpdated: '2 days ago',
  },
  {
    id: '2',
    type: 'employee' as const,
    name: 'John Smith',
    subtitle: 'Chief Technology Officer',
    totalScans: 1245,
    totalLeads: 89,
    lastUpdated: '1 hour ago',
  },
  {
    id: '3',
    type: 'employee' as const,
    name: 'Jane Doe',
    subtitle: 'VP of Sales',
    totalScans: 2156,
    totalLeads: 156,
    lastUpdated: '3 hours ago',
  },
  {
    id: '4',
    type: 'employee' as const,
    name: 'Mike Johnson',
    subtitle: 'Marketing Director',
    totalScans: 876,
    totalLeads: 45,
    lastUpdated: '1 day ago',
  },
]

export default function CardsPage() {
  const [activeTab, setActiveTab] = useState('all')

  const filteredCards = activeTab === 'all' 
    ? cards 
    : cards.filter(card => card.type === activeTab)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Cards</h1>
          <p className="text-muted-foreground">Create and manage your digital business cards</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/cards/new">
            <Plus className="h-4 w-4 mr-2" />
            Create Card
          </Link>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Cards</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="employee">Employee</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card) => (
              <Card key={card.id} className="group hover:border-primary/50 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${card.type === 'company' ? 'bg-primary/10' : 'bg-accent/10'}`}>
                        {card.type === 'company' ? (
                          <Building2 className={`h-6 w-6 ${card.type === 'company' ? 'text-primary' : 'text-accent'}`} />
                        ) : (
                          <User className={`h-6 w-6 ${card.type === 'company' ? 'text-primary' : 'text-accent'}`} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{card.name}</h3>
                        <p className="text-sm text-muted-foreground">{card.subtitle}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 rounded-lg text-muted-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/cards/${card.id}/edit`} className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Edit Card
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <QrCode className="h-4 w-4" />
                          View QR Code
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <Badge variant="secondary" className="mb-4">
                    {card.type === 'company' ? 'Company Card' : 'Employee Card'}
                  </Badge>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Scan className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{card.totalScans.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Scans</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{card.totalLeads}</p>
                        <p className="text-xs text-muted-foreground">Leads</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">Updated {card.lastUpdated}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/cards/${card.id}/edit`}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add New Card */}
            <Card className="border-dashed hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[280px]">
                <Link href="/dashboard/cards/new" className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors mb-4">
                    <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Create New Card</h3>
                  <p className="text-sm text-muted-foreground">Add a new digital business card</p>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
