import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, companyName: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

type AuthStore = AuthState & AuthActions

// Mock user for demo purposes
const mockUser: User = {
  id: '1',
  email: 'john@acmecorp.com',
  name: 'John Smith',
  avatar: undefined,
  companyId: 'company-1',
  role: 'admin',
  createdAt: new Date().toISOString(),
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, _password: string) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))
          set({ 
            user: { ...mockUser, email }, 
            isAuthenticated: true, 
            isLoading: false 
          })
        } catch {
          set({ error: 'Invalid credentials', isLoading: false })
        }
      },

      signup: async (name: string, email: string, _password: string, _companyName: string) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))
          set({ 
            user: { ...mockUser, name, email }, 
            isAuthenticated: true, 
            isLoading: false 
          })
        } catch {
          set({ error: 'Signup failed', isLoading: false })
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null })
      },

      setUser: (user) => {
        set({ user, isAuthenticated: !!user })
      },

      setLoading: (isLoading) => {
        set({ isLoading })
      },

      setError: (error) => {
        set({ error })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
