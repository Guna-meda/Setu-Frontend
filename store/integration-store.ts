import { create } from 'zustand'
import type { Integration } from '@/types'

interface IntegrationState {
  integrations: Integration[]
  isLoading: boolean
  error: string | null
}

interface IntegrationActions {
  setIntegrations: (integrations: Integration[]) => void
  toggleIntegration: (id: string) => void
  updateIntegration: (id: string, updates: Partial<Integration>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

type IntegrationStore = IntegrationState & IntegrationActions

const defaultIntegrations: Integration[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Send instant follow-ups via WhatsApp when a lead scans your card',
    icon: 'whatsapp',
    enabled: false,
    configured: false,
    category: 'communication',
  },
  {
    id: 'crm-sync',
    name: 'CRM Sync',
    description: 'Automatically sync leads to your CRM (Salesforce, HubSpot, Pipedrive)',
    icon: 'database',
    enabled: false,
    configured: false,
    category: 'crm',
  },
  {
    id: 'analytics',
    name: 'Advanced Analytics',
    description: 'Connect Google Analytics and get deeper insights into card performance',
    icon: 'chart',
    enabled: true,
    configured: true,
    category: 'analytics',
  },
  {
    id: 'email-followups',
    name: 'Email Follow-ups',
    description: 'Automated email sequences for new leads captured from your cards',
    icon: 'mail',
    enabled: false,
    configured: false,
    category: 'automation',
  },
]

export const useIntegrationStore = create<IntegrationStore>((set, get) => ({
  integrations: defaultIntegrations,
  isLoading: false,
  error: null,

  setIntegrations: (integrations) => set({ integrations }),

  toggleIntegration: (id) => {
    const { integrations } = get()
    set({
      integrations: integrations.map(int =>
        int.id === id ? { ...int, enabled: !int.enabled } : int
      ),
    })
  },

  updateIntegration: (id, updates) => {
    const { integrations } = get()
    set({
      integrations: integrations.map(int =>
        int.id === id ? { ...int, ...updates } : int
      ),
    })
  },

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}))
