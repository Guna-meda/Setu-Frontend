'use client'

import type { CardData } from '@/types'
import type { CardTheme } from '@/lib/card-themes'
import { getThemeById } from '@/lib/card-themes'
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Github,
  MessageCircle,
  Share2,
  Download,
} from 'lucide-react'

interface CardPreviewProps {
  card: CardData | null
  cardType: 'company' | 'employee'
  theme?: CardTheme
}

const socialIcons: Record<string, React.ElementType> = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  github: Github,
  whatsapp: MessageCircle,
  telegram: Share2,
  discord: Share2,
  threads: Share2,
}

export function CardPreview({ card, cardType, theme }: CardPreviewProps) {
  const currentTheme = theme || getThemeById(card?.themeId || 'sage-minimal')
  
  const name = card?.name || (cardType === 'company' ? 'Company Name' : 'Your Name')
  const jobTitle = card?.jobTitle || 'Job Title'
  const companyName = card?.companyName || 'Company Name'
  const headline = card?.headline || ''
  const email = card?.email || ''
  const phone = card?.phone || ''
  const website = card?.companyUrl || ''
  const address = card?.address || ''

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const isDark = currentTheme.style === 'dark'

  return (
    <div className="relative">
      {/* Phone Mockup */}
      <div 
        className="relative w-[300px] h-[600px] rounded-[44px] border-[6px] shadow-2xl overflow-hidden transition-all duration-500"
        style={{ 
          borderColor: isDark ? '#2D3748' : '#E2E8E5',
          backgroundColor: currentTheme.backgroundColor,
        }}
      >
        {/* Phone Notch */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 rounded-b-2xl z-10"
          style={{ backgroundColor: isDark ? '#2D3748' : '#E2E8E5' }}
        />

        {/* Card Content */}
        <div className="h-full flex flex-col overflow-y-auto scrollbar-hide">
          {/* Cover Photo */}
          <div 
            className="relative h-32 flex-shrink-0"
            style={{
              background: card?.coverPhoto 
                ? `url(${card.coverPhoto}) center/cover`
                : currentTheme.coverGradient,
            }}
          >
            {/* Decorative pattern for gradient covers */}
            {!card?.coverPhoto && (
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="5" cy="5" r="1" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
            )}
            
            {/* Profile Picture */}
            <div 
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 shadow-xl flex items-center justify-center overflow-hidden transition-all duration-300"
              style={{ 
                backgroundColor: currentTheme.backgroundColor,
                borderColor: currentTheme.backgroundColor,
                borderRadius: currentTheme.buttonStyle === 'square' ? '1rem' : '9999px',
              }}
            >
              {(cardType === 'company' ? card?.logo : card?.profilePicture) ? (
                <img
                  src={cardType === 'company' ? card?.logo : card?.profilePicture}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span 
                  className="text-2xl font-bold"
                  style={{ color: currentTheme.primaryColor }}
                >
                  {initials}
                </span>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="pt-14 px-5 pb-4 text-center">
            <h3 
              className="font-bold text-xl"
              style={{ color: currentTheme.textColor }}
            >
              {name}
            </h3>
            {cardType === 'employee' && (
              <>
                <p 
                  className="text-sm mt-1"
                  style={{ color: `${currentTheme.textColor}99` }}
                >
                  {jobTitle}
                </p>
                <p 
                  className="text-xs font-medium mt-0.5"
                  style={{ color: currentTheme.primaryColor }}
                >
                  {companyName}
                </p>
              </>
            )}
            {headline && (
              <p 
                className="text-xs mt-3 line-clamp-2 leading-relaxed"
                style={{ color: `${currentTheme.textColor}80` }}
              >
                {headline}
              </p>
            )}
            {card?.accreditations && (
              <div className="flex flex-wrap justify-center gap-1 mt-3">
                {card.accreditations.split(',').slice(0, 3).map((acc, i) => (
                  <span 
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ 
                      backgroundColor: currentTheme.accentColor,
                      color: currentTheme.primaryColor,
                    }}
                  >
                    {acc.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-2 px-4 mb-4">
            <button 
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: currentTheme.accentColor,
                borderRadius: currentTheme.buttonStyle === 'square' ? '0.75rem' : currentTheme.buttonStyle === 'pill' ? '1.5rem' : '1rem',
              }}
            >
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${currentTheme.primaryColor}15` }}
              >
                <Share2 className="h-4 w-4" style={{ color: currentTheme.primaryColor }} />
              </div>
              <span 
                className="text-[10px] font-medium"
                style={{ color: currentTheme.textColor }}
              >
                Share
              </span>
            </button>
            <button 
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: currentTheme.accentColor,
                borderRadius: currentTheme.buttonStyle === 'square' ? '0.75rem' : currentTheme.buttonStyle === 'pill' ? '1.5rem' : '1rem',
              }}
            >
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${currentTheme.primaryColor}15` }}
              >
                <Phone className="h-4 w-4" style={{ color: currentTheme.primaryColor }} />
              </div>
              <span 
                className="text-[10px] font-medium"
                style={{ color: currentTheme.textColor }}
              >
                Call
              </span>
            </button>
            <button 
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: currentTheme.accentColor,
                borderRadius: currentTheme.buttonStyle === 'square' ? '0.75rem' : currentTheme.buttonStyle === 'pill' ? '1.5rem' : '1rem',
              }}
            >
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${currentTheme.primaryColor}15` }}
              >
                <Mail className="h-4 w-4" style={{ color: currentTheme.primaryColor }} />
              </div>
              <span 
                className="text-[10px] font-medium"
                style={{ color: currentTheme.textColor }}
              >
                Email
              </span>
            </button>
          </div>

          {/* Contact Info */}
          <div className="px-4 space-y-2 flex-1">
            {email && (
              <div 
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                style={{ 
                  backgroundColor: currentTheme.accentColor,
                  borderRadius: currentTheme.buttonStyle === 'square' ? '0.75rem' : '1rem',
                }}
              >
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${currentTheme.primaryColor}15` }}
                >
                  <Mail className="h-4 w-4" style={{ color: currentTheme.primaryColor }} />
                </div>
                <span 
                  className="text-xs truncate"
                  style={{ color: `${currentTheme.textColor}CC` }}
                >
                  {email}
                </span>
              </div>
            )}
            {phone && (
              <div 
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                style={{ 
                  backgroundColor: currentTheme.accentColor,
                  borderRadius: currentTheme.buttonStyle === 'square' ? '0.75rem' : '1rem',
                }}
              >
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${currentTheme.primaryColor}15` }}
                >
                  <Phone className="h-4 w-4" style={{ color: currentTheme.primaryColor }} />
                </div>
                <span 
                  className="text-xs"
                  style={{ color: `${currentTheme.textColor}CC` }}
                >
                  {phone}
                </span>
              </div>
            )}
            {website && (
              <div 
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                style={{ 
                  backgroundColor: currentTheme.accentColor,
                  borderRadius: currentTheme.buttonStyle === 'square' ? '0.75rem' : '1rem',
                }}
              >
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${currentTheme.primaryColor}15` }}
                >
                  <Globe className="h-4 w-4" style={{ color: currentTheme.primaryColor }} />
                </div>
                <span 
                  className="text-xs truncate"
                  style={{ color: `${currentTheme.textColor}CC` }}
                >
                  {website}
                </span>
              </div>
            )}
            {address && (
              <div 
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                style={{ 
                  backgroundColor: currentTheme.accentColor,
                  borderRadius: currentTheme.buttonStyle === 'square' ? '0.75rem' : '1rem',
                }}
              >
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${currentTheme.primaryColor}15` }}
                >
                  <MapPin className="h-4 w-4" style={{ color: currentTheme.primaryColor }} />
                </div>
                <span 
                  className="text-xs line-clamp-2"
                  style={{ color: `${currentTheme.textColor}CC` }}
                >
                  {address}
                </span>
              </div>
            )}
          </div>

          {/* Social Links */}
          {card?.socialLinks && card.socialLinks.length > 0 && (
            <div 
              className="px-4 py-4 mt-auto border-t"
              style={{ borderColor: `${currentTheme.textColor}10` }}
            >
              <div className="flex flex-wrap justify-center gap-2">
                {card.socialLinks.map((social) => {
                  const Icon = socialIcons[social.platform] || Share2
                  return (
                    <div
                      key={social.platform}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
                      style={{ 
                        backgroundColor: currentTheme.accentColor,
                        borderRadius: currentTheme.buttonStyle === 'square' ? '0.75rem' : '9999px',
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: currentTheme.primaryColor }} />
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Save Contact Button */}
          <div className="p-4 pt-2">
            <button 
              className="w-full py-3 text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02] flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: currentTheme.primaryColor,
                color: '#FFFFFF',
                borderRadius: currentTheme.buttonStyle === 'square' ? '0.75rem' : currentTheme.buttonStyle === 'pill' ? '9999px' : '1rem',
              }}
            >
              <Download className="h-4 w-4" />
              Save Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
