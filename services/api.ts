import type {
  CardData,
  Employee,
  Lead,
  Integration,
  AnalyticsData,
  ApiResponse,
  PaginatedResponse,
} from '@/types'

const API_BASE = '/api'

// Generic fetch wrapper
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}

// Cards API
export const cardsApi = {
  getAll: () => fetchApi<CardData[]>('/cards'),
  getById: (id: string) => fetchApi<CardData>(`/cards/${id}`),
  create: (card: Partial<CardData>) =>
    fetchApi<CardData>('/cards', {
      method: 'POST',
      body: JSON.stringify(card),
    }),
  update: (id: string, card: Partial<CardData>) =>
    fetchApi<CardData>(`/cards/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(card),
    }),
  delete: (id: string) =>
    fetchApi<void>(`/cards/${id}`, {
      method: 'DELETE',
    }),
}

// Employees API
export const employeesApi = {
  getAll: () => fetchApi<Employee[]>('/employees'),
  getById: (id: string) => fetchApi<Employee>(`/employees/${id}`),
  create: (employee: Partial<Employee>) =>
    fetchApi<Employee>('/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    }),
  update: (id: string, employee: Partial<Employee>) =>
    fetchApi<Employee>(`/employees/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(employee),
    }),
  delete: (id: string) =>
    fetchApi<void>(`/employees/${id}`, {
      method: 'DELETE',
    }),
}

// Leads API
export const leadsApi = {
  getAll: (params?: Record<string, string>) => {
    const queryString = params ? `?${new URLSearchParams(params)}` : ''
    return fetchApi<PaginatedResponse<Lead>>(`/leads${queryString}`)
  },
  getById: (id: string) => fetchApi<Lead>(`/leads/${id}`),
  create: (lead: Partial<Lead>) =>
    fetchApi<Lead>('/leads', {
      method: 'POST',
      body: JSON.stringify(lead),
    }),
  update: (id: string, lead: Partial<Lead>) =>
    fetchApi<Lead>(`/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(lead),
    }),
  delete: (id: string) =>
    fetchApi<void>(`/leads/${id}`, {
      method: 'DELETE',
    }),
}

// Integrations API
export const integrationsApi = {
  getAll: () => fetchApi<Integration[]>('/integrations'),
  toggle: (id: string, enabled: boolean) =>
    fetchApi<Integration>(`/integrations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled }),
    }),
  configure: (id: string, config: Record<string, unknown>) =>
    fetchApi<Integration>(`/integrations/${id}/configure`, {
      method: 'POST',
      body: JSON.stringify(config),
    }),
}

// Analytics API
export const analyticsApi = {
  getDashboard: () => fetchApi<AnalyticsData>('/analytics/dashboard'),
  getCardPerformance: (cardId: string) =>
    fetchApi<AnalyticsData>(`/analytics/cards/${cardId}`),
  getEmployeePerformance: (employeeId: string) =>
    fetchApi<AnalyticsData>(`/analytics/employees/${employeeId}`),
}
