import { create } from 'zustand'
import type { Employee } from '@/types'

interface TeamState {
  employees: Employee[]
  selectedEmployee: Employee | null
  isLoading: boolean
  error: string | null
}

interface TeamActions {
  setEmployees: (employees: Employee[]) => void
  addEmployee: (employee: Employee) => void
  updateEmployee: (id: string, updates: Partial<Employee>) => void
  deleteEmployee: (id: string) => void
  setSelectedEmployee: (employee: Employee | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

type TeamStore = TeamState & TeamActions

export const useTeamStore = create<TeamStore>((set, get) => ({
  employees: [],
  selectedEmployee: null,
  isLoading: false,
  error: null,

  setEmployees: (employees) => set({ employees }),

  addEmployee: (employee) => {
    const { employees } = get()
    set({ employees: [...employees, employee] })
  },

  updateEmployee: (id, updates) => {
    const { employees } = get()
    set({
      employees: employees.map(emp =>
        emp.id === id ? { ...emp, ...updates } : emp
      ),
    })
  },

  deleteEmployee: (id) => {
    const { employees } = get()
    set({ employees: employees.filter(emp => emp.id !== id) })
  },

  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}))
