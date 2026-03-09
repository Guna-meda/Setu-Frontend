export interface CardTheme {
  id: string
  name: string
  description: string
  preview: string
  // Colors
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  accentColor: string
  // Style
  style: 'minimal' | 'gradient' | 'bold' | 'elegant' | 'playful' | 'corporate' | 'creative' | 'dark'
  // Cover gradient
  coverGradient: string
  // Button style
  buttonStyle: 'rounded' | 'pill' | 'square'
  // Card shape
  cardRadius: string
  // Font style
  fontStyle: 'modern' | 'classic' | 'bold' | 'elegant'
}

export const cardThemes: CardTheme[] = [
  // 1. Sage Minimal
  {
    id: 'sage-minimal',
    name: 'Sage Minimal',
    description: 'Clean and professional with subtle sage tones',
    preview: '/themes/sage-minimal.png',
    primaryColor: '#2F6F5F',
    secondaryColor: '#8ED1A6',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2D2A',
    accentColor: '#EAF6EF',
    style: 'minimal',
    coverGradient: 'linear-gradient(135deg, #2F6F5F 0%, #4A9E7F 100%)',
    buttonStyle: 'rounded',
    cardRadius: '1.5rem',
    fontStyle: 'modern',
  },
  // 2. Ocean Breeze
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    description: 'Refreshing blue tones inspired by the sea',
    preview: '/themes/ocean-breeze.png',
    primaryColor: '#0EA5E9',
    secondaryColor: '#38BDF8',
    backgroundColor: '#F0F9FF',
    textColor: '#0C4A6E',
    accentColor: '#E0F2FE',
    style: 'gradient',
    coverGradient: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #14B8A6 100%)',
    buttonStyle: 'pill',
    cardRadius: '1.5rem',
    fontStyle: 'modern',
  },
  // 3. Sunset Vibrant
  {
    id: 'sunset-vibrant',
    name: 'Sunset Vibrant',
    description: 'Warm and energetic orange to pink gradient',
    preview: '/themes/sunset-vibrant.png',
    primaryColor: '#F97316',
    secondaryColor: '#FB923C',
    backgroundColor: '#FFFBEB',
    textColor: '#7C2D12',
    accentColor: '#FED7AA',
    style: 'bold',
    coverGradient: 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)',
    buttonStyle: 'rounded',
    cardRadius: '1rem',
    fontStyle: 'bold',
  },
  // 4. Royal Purple
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Luxurious purple tones for a premium feel',
    preview: '/themes/royal-purple.png',
    primaryColor: '#7C3AED',
    secondaryColor: '#A78BFA',
    backgroundColor: '#FAF5FF',
    textColor: '#4C1D95',
    accentColor: '#EDE9FE',
    style: 'elegant',
    coverGradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #EC4899 100%)',
    buttonStyle: 'pill',
    cardRadius: '2rem',
    fontStyle: 'elegant',
  },
  // 5. Neon Night
  {
    id: 'neon-night',
    name: 'Neon Night',
    description: 'Dark mode with vibrant neon accents',
    preview: '/themes/neon-night.png',
    primaryColor: '#22D3EE',
    secondaryColor: '#F472B6',
    backgroundColor: '#0F172A',
    textColor: '#F1F5F9',
    accentColor: '#1E293B',
    style: 'dark',
    coverGradient: 'linear-gradient(135deg, #22D3EE 0%, #F472B6 100%)',
    buttonStyle: 'rounded',
    cardRadius: '1.5rem',
    fontStyle: 'modern',
  },
  // 6. Forest Deep
  {
    id: 'forest-deep',
    name: 'Forest Deep',
    description: 'Rich greens inspired by nature',
    preview: '/themes/forest-deep.png',
    primaryColor: '#059669',
    secondaryColor: '#34D399',
    backgroundColor: '#ECFDF5',
    textColor: '#064E3B',
    accentColor: '#D1FAE5',
    style: 'corporate',
    coverGradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    buttonStyle: 'square',
    cardRadius: '0.75rem',
    fontStyle: 'classic',
  },
  // 7. Cherry Blossom
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom',
    description: 'Soft pink tones with Japanese elegance',
    preview: '/themes/cherry-blossom.png',
    primaryColor: '#EC4899',
    secondaryColor: '#F9A8D4',
    backgroundColor: '#FDF2F8',
    textColor: '#831843',
    accentColor: '#FCE7F3',
    style: 'playful',
    coverGradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 50%, #FBCFE8 100%)',
    buttonStyle: 'pill',
    cardRadius: '2rem',
    fontStyle: 'elegant',
  },
  // 8. Midnight Gold
  {
    id: 'midnight-gold',
    name: 'Midnight Gold',
    description: 'Sophisticated dark with gold accents',
    preview: '/themes/midnight-gold.png',
    primaryColor: '#F59E0B',
    secondaryColor: '#FBBF24',
    backgroundColor: '#1F2937',
    textColor: '#F9FAFB',
    accentColor: '#374151',
    style: 'dark',
    coverGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    buttonStyle: 'rounded',
    cardRadius: '1rem',
    fontStyle: 'bold',
  },
  // 9. Arctic Frost
  {
    id: 'arctic-frost',
    name: 'Arctic Frost',
    description: 'Cool blues with icy undertones',
    preview: '/themes/arctic-frost.png',
    primaryColor: '#3B82F6',
    secondaryColor: '#60A5FA',
    backgroundColor: '#EFF6FF',
    textColor: '#1E3A8A',
    accentColor: '#DBEAFE',
    style: 'minimal',
    coverGradient: 'linear-gradient(135deg, #3B82F6 0%, #2DD4BF 100%)',
    buttonStyle: 'rounded',
    cardRadius: '1.5rem',
    fontStyle: 'modern',
  },
  // 10. Coral Reef
  {
    id: 'coral-reef',
    name: 'Coral Reef',
    description: 'Vibrant coral and turquoise combination',
    preview: '/themes/coral-reef.png',
    primaryColor: '#F43F5E',
    secondaryColor: '#FB7185',
    backgroundColor: '#FFF1F2',
    textColor: '#9F1239',
    accentColor: '#FFE4E6',
    style: 'playful',
    coverGradient: 'linear-gradient(135deg, #F43F5E 0%, #14B8A6 100%)',
    buttonStyle: 'pill',
    cardRadius: '2rem',
    fontStyle: 'bold',
  },
  // 11. Monochrome Pro
  {
    id: 'monochrome-pro',
    name: 'Monochrome Pro',
    description: 'Sleek black and white professional look',
    preview: '/themes/monochrome-pro.png',
    primaryColor: '#18181B',
    secondaryColor: '#3F3F46',
    backgroundColor: '#FAFAFA',
    textColor: '#18181B',
    accentColor: '#E4E4E7',
    style: 'corporate',
    coverGradient: 'linear-gradient(135deg, #18181B 0%, #3F3F46 100%)',
    buttonStyle: 'square',
    cardRadius: '0.5rem',
    fontStyle: 'classic',
  },
  // 12. Lavender Dreams
  {
    id: 'lavender-dreams',
    name: 'Lavender Dreams',
    description: 'Soft lavender with dreamy gradients',
    preview: '/themes/lavender-dreams.png',
    primaryColor: '#8B5CF6',
    secondaryColor: '#C4B5FD',
    backgroundColor: '#F5F3FF',
    textColor: '#5B21B6',
    accentColor: '#EDE9FE',
    style: 'elegant',
    coverGradient: 'linear-gradient(135deg, #8B5CF6 0%, #D946EF 50%, #EC4899 100%)',
    buttonStyle: 'pill',
    cardRadius: '2rem',
    fontStyle: 'elegant',
  },
]

export function getThemeById(id: string): CardTheme {
  return cardThemes.find(theme => theme.id === id) || cardThemes[0]
}

export function getThemeStyles(theme: CardTheme) {
  return {
    '--theme-primary': theme.primaryColor,
    '--theme-secondary': theme.secondaryColor,
    '--theme-bg': theme.backgroundColor,
    '--theme-text': theme.textColor,
    '--theme-accent': theme.accentColor,
    '--theme-cover': theme.coverGradient,
    '--theme-radius': theme.cardRadius,
  } as React.CSSProperties
}
