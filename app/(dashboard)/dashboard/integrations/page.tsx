'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { useIntegrationStore } from '@/store'
import { toast } from 'sonner'
import {
  MessageCircle,
  Database,
  BarChart3,
  Mail,
  Settings,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

const integrationIcons: Record<string, React.ElementType> = {
  whatsapp: MessageCircle,
  database: Database,
  chart: BarChart3,
  mail: Mail,
}

const categoryLabels: Record<string, string> = {
  communication: 'Communication',
  crm: 'CRM & Sales',
  analytics: 'Analytics',
  automation: 'Automation',
}

export default function IntegrationsPage() {
  const { integrations, toggleIntegration } = useIntegrationStore()

  const handleToggle = (id: string, currentState: boolean) => {
    toggleIntegration(id)
    if (!currentState) {
      toast.success('Integration enabled')
    } else {
      toast.info('Integration disabled')
    }
  }

  const groupedIntegrations = integrations.reduce((acc, integration) => {
    if (!acc[integration.category]) {
      acc[integration.category] = []
    }
    acc[integration.category].push(integration)
    return acc
  }, {} as Record<string, typeof integrations>)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
          <p className="text-muted-foreground">Connect your favorite tools and services</p>
        </div>
        <Button variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          Browse Marketplace
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Integrations</p>
                <p className="text-2xl font-bold text-foreground">{integrations.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Settings className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-foreground">
                  {integrations.filter(i => i.enabled).length}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Needs Setup</p>
                <p className="text-2xl font-bold text-foreground">
                  {integrations.filter(i => i.enabled && !i.configured).length}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-yellow-100">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integrations by Category */}
      {Object.entries(groupedIntegrations).map(([category, categoryIntegrations]) => (
        <Card key={category}>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">
              {categoryLabels[category] || category}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryIntegrations.map((integration) => {
              const Icon = integrationIcons[integration.icon] || Settings
              return (
                <div
                  key={integration.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${integration.enabled ? 'bg-primary/10' : 'bg-muted'}`}>
                      <Icon className={`h-6 w-6 ${integration.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{integration.name}</h3>
                        {integration.enabled && integration.configured && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Connected
                          </Badge>
                        )}
                        {integration.enabled && !integration.configured && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                            Setup Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {integration.enabled && (
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    )}
                    <Switch
                      checked={integration.enabled}
                      onCheckedChange={() => handleToggle(integration.id, integration.enabled)}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      ))}

      {/* Coming Soon */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Slack', description: 'Get notifications in your Slack channels' },
              { name: 'Zapier', description: 'Connect to 5000+ apps with Zapier' },
              { name: 'Salesforce', description: 'Direct CRM sync with Salesforce' },
            ].map((item) => (
              <div
                key={item.name}
                className="p-4 rounded-xl border border-dashed border-border bg-muted/30"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
