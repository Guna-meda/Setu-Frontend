import { create } from 'zustand'
import type { Lead, LeadTag, LeadStatus } from '@/types'

interface LeadFilters {
  dateFrom?: string
  dateTo?: string
  employeeId?: string
  tag?: LeadTag
  status?: LeadStatus
  search?: string
}

interface LeadState {
  leads: Lead[]
  filters: LeadFilters
  isLoading: boolean
  error: string | null
}

interface LeadActions {
  setLeads: (leads: Lead[]) => void
  addLead: (lead: Lead) => void
  updateLead: (id: string, updates: Partial<Lead>) => void
  deleteLead: (id: string) => void
  setFilters: (filters: Partial<LeadFilters>) => void
  clearFilters: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  getFilteredLeads: () => Lead[]
}

type LeadStore = LeadState & LeadActions

export const useLeadStore = create<LeadStore>((set, get) => ({
  leads: [],
  filters: {},
  isLoading: false,
  error: null,

  setLeads: (leads) => set({ leads }),

  addLead: (lead) => {
    const { leads } = get()
    set({ leads: [lead, ...leads] })
  },

  updateLead: (id, updates) => {
    const { leads } = get()
    set({
      leads: leads.map(lead =>
        lead.id === id ? { ...lead, ...updates, updatedAt: new Date().toISOString() } : lead
      ),
    })
  },

  deleteLead: (id) => {
    const { leads } = get()
    set({ leads: leads.filter(lead => lead.id !== id) })
  },

  setFilters: (newFilters) => {
    const { filters } = get()
    set({ filters: { ...filters, ...newFilters } })
  },

  clearFilters: () => set({ filters: {} }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  getFilteredLeads: () => {
    const { leads, filters } = get()
    return leads.filter(lead => {
      if (filters.dateFrom && new Date(lead.scanTime) < new Date(filters.dateFrom)) return false
      if (filters.dateTo && new Date(lead.scanTime) > new Date(filters.dateTo)) return false
      if (filters.employeeId && lead.employeeId !== filters.employeeId) return false
      if (filters.tag && lead.tag !== filters.tag) return false
      if (filters.status && lead.status !== filters.status) return false
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return (
          lead.name?.toLowerCase().includes(searchLower) ||
          lead.phone.toLowerCase().includes(searchLower) ||
          lead.email?.toLowerCase().includes(searchLower) ||
          lead.company?.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
  },
}))
