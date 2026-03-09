// User & Auth Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  companyId: string
  role: 'admin' | 'manager' | 'employee'
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Company Types
export interface Company {
  id: string
  name: string
  logo?: string
  website?: string
  address?: string
  industry?: string
  createdAt: string
}

// Card Types
export interface SocialLink {
  platform: 'twitter' | 'instagram' | 'threads' | 'linkedin' | 'facebook' | 'youtube' | 'whatsapp' | 'telegram' | 'discord' | 'github'
  url: string
}

export interface CardData {
  id: string
  type: 'company' | 'employee'
  companyId: string
  employeeId?: string
  
  // Theme
  themeId: string
  
  // Images
  logo?: string
  profilePicture?: string
  coverPhoto?: string
  
  // Personal Details
  name: string
  jobTitle?: string
  department?: string
  companyName: string
  headline?: string
  accreditations?: string
  
  // Contact Info
  email?: string
  phone?: string
  companyUrl?: string
  customLink?: string
  address?: string
  
  // Social Links
  socialLinks: SocialLink[]
  
  // QR Code
  qrCode?: string
  
  // Stats
  totalScans: number
  totalLeads: number
  
  createdAt: string
  updatedAt: string
}

// Lead Types
export type LeadTag = 'hot' | 'interested' | 'distributor' | 'retailer'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'

export interface Lead {
  id: string
  cardId: string
  employeeId?: string
  employeeName?: string
  
  // Lead Info
  name?: string
  phone: string
  email?: string
  company?: string
  
  // Classification
  tag?: LeadTag
  status: LeadStatus
  notes?: string
  
  // Tracking
  scanTime: string
  source?: string
  
  createdAt: string
  updatedAt: string
}

// Employee Types
export interface Employee {
  id: string
  companyId: string
  name: string
  email: string
  designation: string
  department?: string
  avatar?: string
  phone?: string
  cardId?: string
  qrCode?: string
  leadCount: number
  isActive: boolean
  createdAt: string
}

// Analytics Types
export interface AnalyticsData {
  totalScans: number
  totalLeads: number
  conversionRate: number
  activeEmployees: number
  scansByDay: { date: string; scans: number }[]
  leadsByDay: { date: string; leads: number }[]
  employeePerformance: { name: string; scans: number; leads: number }[]
  topSources: { source: string; count: number }[]
}

// Integration Types
export interface Integration {
  id: string
  name: string
  description: string
  icon: string
  enabled: boolean
  configured: boolean
  category: 'communication' | 'crm' | 'analytics' | 'automation'
}

// Activity Types
export interface Activity {
  id: string
  type: 'scan' | 'lead' | 'card_created' | 'employee_added' | 'integration_enabled'
  message: string
  timestamp: string
  metadata?: Record<string, unknown>
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
