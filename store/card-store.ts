import { create } from 'zustand'
import type { CardData, SocialLink } from '@/types'

interface CardState {
  cards: CardData[]
  currentCard: CardData | null
  isLoading: boolean
  error: string | null
}

interface CardActions {
  setCards: (cards: CardData[]) => void
  setCurrentCard: (card: CardData | null) => void
  updateCurrentCard: (updates: Partial<CardData>) => void
  addSocialLink: (link: SocialLink) => void
  removeSocialLink: (platform: SocialLink['platform']) => void
  updateSocialLink: (platform: SocialLink['platform'], url: string) => void
  createCard: (card: CardData) => void
  updateCard: (id: string, updates: Partial<CardData>) => void
  deleteCard: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

type CardStore = CardState & CardActions

const emptyCard: CardData = {
  id: '',
  type: 'employee',
  companyId: '',
  themeId: 'sage-minimal',
  name: '',
  companyName: '',
  socialLinks: [],
  totalScans: 0,
  totalLeads: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const useCardStore = create<CardStore>((set, get) => ({
  cards: [],
  currentCard: { ...emptyCard },
  isLoading: false,
  error: null,

  setCards: (cards) => set({ cards }),

  setCurrentCard: (card) => set({ currentCard: card }),

  updateCurrentCard: (updates) => {
    const { currentCard } = get()
    if (currentCard) {
      set({ currentCard: { ...currentCard, ...updates, updatedAt: new Date().toISOString() } })
    }
  },

  addSocialLink: (link) => {
    const { currentCard } = get()
    if (currentCard) {
      const existingIndex = currentCard.socialLinks.findIndex(l => l.platform === link.platform)
      let newLinks: SocialLink[]
      if (existingIndex >= 0) {
        newLinks = [...currentCard.socialLinks]
        newLinks[existingIndex] = link
      } else {
        newLinks = [...currentCard.socialLinks, link]
      }
      set({ currentCard: { ...currentCard, socialLinks: newLinks, updatedAt: new Date().toISOString() } })
    }
  },

  removeSocialLink: (platform) => {
    const { currentCard } = get()
    if (currentCard) {
      set({
        currentCard: {
          ...currentCard,
          socialLinks: currentCard.socialLinks.filter(l => l.platform !== platform),
          updatedAt: new Date().toISOString(),
        },
      })
    }
  },

  updateSocialLink: (platform, url) => {
    const { currentCard } = get()
    if (currentCard) {
      const newLinks = currentCard.socialLinks.map(l =>
        l.platform === platform ? { ...l, url } : l
      )
      set({ currentCard: { ...currentCard, socialLinks: newLinks, updatedAt: new Date().toISOString() } })
    }
  },

  createCard: (card) => {
    const { cards } = get()
    set({ cards: [...cards, card] })
  },

  updateCard: (id, updates) => {
    const { cards } = get()
    set({
      cards: cards.map(card =>
        card.id === id ? { ...card, ...updates, updatedAt: new Date().toISOString() } : card
      ),
    })
  },

  deleteCard: (id) => {
    const { cards } = get()
    set({ cards: cards.filter(card => card.id !== id) })
  },

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}))
