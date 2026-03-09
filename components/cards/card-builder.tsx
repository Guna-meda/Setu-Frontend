'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useCardStore } from '@/store'
import { CardPreview } from './card-preview'
import { cardThemes, getThemeById } from '@/lib/card-themes'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  User,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Briefcase,
  Award,
  Link as LinkIcon,
  Save,
  Upload,
  Image as ImageIcon,
  Palette,
  Sparkles,
  Check,
  Loader2,
} from 'lucide-react'
import type { SocialLink } from '@/types'

const socialPlatforms: { platform: SocialLink['platform']; label: string; placeholder: string; color: string }[] = [
  { platform: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/username', color: '#0A66C2' },
  { platform: 'twitter', label: 'Twitter / X', placeholder: 'x.com/username', color: '#1DA1F2' },
  { platform: 'instagram', label: 'Instagram', placeholder: 'instagram.com/username', color: '#E4405F' },
  { platform: 'facebook', label: 'Facebook', placeholder: 'facebook.com/username', color: '#1877F2' },
  { platform: 'youtube', label: 'YouTube', placeholder: 'youtube.com/@channel', color: '#FF0000' },
  { platform: 'github', label: 'GitHub', placeholder: 'github.com/username', color: '#181717' },
  { platform: 'whatsapp', label: 'WhatsApp', placeholder: '+1234567890', color: '#25D366' },
  { platform: 'telegram', label: 'Telegram', placeholder: 't.me/username', color: '#26A5E4' },
  { platform: 'discord', label: 'Discord', placeholder: 'discord.gg/server', color: '#5865F2' },
  { platform: 'threads', label: 'Threads', placeholder: 'threads.net/@username', color: '#000000' },
]

export function CardBuilder() {
  const router = useRouter()
  const { currentCard, updateCurrentCard, addSocialLink, removeSocialLink } = useCardStore()
  const [cardType, setCardType] = useState<'company' | 'employee'>('employee')
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('theme')

  const currentTheme = getThemeById(currentCard?.themeId || 'sage-minimal')

  const handleInputChange = (field: string, value: string) => {
    updateCurrentCard({ [field]: value })
  }

  const handleSocialChange = (platform: SocialLink['platform'], url: string) => {
    if (url) {
      addSocialLink({ platform, url })
    } else {
      removeSocialLink(platform)
    }
  }

  const getSocialUrl = (platform: SocialLink['platform']) => {
    return currentCard?.socialLinks.find(l => l.platform === platform)?.url || ''
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Card saved successfully!')
    setIsSaving(false)
    router.push('/dashboard/cards')
  }

  return (
    <div className="grid lg:grid-cols-[1fr,400px] gap-8">
      {/* Left Side - Form */}
      <div className="space-y-6">
        {/* Card Type Selection */}
        <Card className="border-0 shadow-smooth bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </span>
              Card Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setCardType('company')
                  updateCurrentCard({ type: 'company' })
                }}
                className={cn(
                  'group relative p-5 rounded-2xl border-2 transition-all duration-300',
                  cardType === 'company'
                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                    : 'border-border hover:border-primary/30 hover:bg-secondary/50'
                )}
              >
                <div className={cn(
                  'absolute top-3 right-3 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all',
                  cardType === 'company' ? 'border-primary bg-primary' : 'border-border'
                )}>
                  {cardType === 'company' && <Check className="h-3 w-3 text-primary-foreground" />}
                </div>
                <Building2 className={cn(
                  'h-8 w-8 mb-3 transition-colors',
                  cardType === 'company' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary/70'
                )} />
                <p className={cn(
                  'font-semibold transition-colors',
                  cardType === 'company' ? 'text-primary' : 'text-foreground'
                )}>Company Card</p>
                <p className="text-xs text-muted-foreground mt-1">For your organization</p>
              </button>
              <button
                onClick={() => {
                  setCardType('employee')
                  updateCurrentCard({ type: 'employee' })
                }}
                className={cn(
                  'group relative p-5 rounded-2xl border-2 transition-all duration-300',
                  cardType === 'employee'
                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                    : 'border-border hover:border-primary/30 hover:bg-secondary/50'
                )}
              >
                <div className={cn(
                  'absolute top-3 right-3 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all',
                  cardType === 'employee' ? 'border-primary bg-primary' : 'border-border'
                )}>
                  {cardType === 'employee' && <Check className="h-3 w-3 text-primary-foreground" />}
                </div>
                <User className={cn(
                  'h-8 w-8 mb-3 transition-colors',
                  cardType === 'employee' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary/70'
                )} />
                <p className={cn(
                  'font-semibold transition-colors',
                  cardType === 'employee' ? 'text-primary' : 'text-foreground'
                )}>Employee Card</p>
                <p className="text-xs text-muted-foreground mt-1">For team members</p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Form Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full h-12 p-1 bg-secondary/50 rounded-xl">
            <TabsTrigger value="theme" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Images</span>
            </TabsTrigger>
            <TabsTrigger value="personal" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Details</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
          </TabsList>

          {/* Theme Selection Tab */}
          <TabsContent value="theme" className="mt-6">
            <Card className="border-0 shadow-smooth">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <Palette className="h-4 w-4 text-primary" />
                  </span>
                  Choose Your Style
                </CardTitle>
                <p className="text-sm text-muted-foreground">Select a theme that matches your brand personality</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {cardThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => updateCurrentCard({ themeId: theme.id })}
                      className={cn(
                        'group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 text-left',
                        currentCard?.themeId === theme.id
                          ? 'border-primary ring-4 ring-primary/20'
                          : 'border-border hover:border-primary/30'
                      )}
                    >
                      {/* Theme Preview */}
                      <div 
                        className="h-24 relative"
                        style={{ background: theme.coverGradient }}
                      >
                        <div 
                          className="absolute bottom-0 left-0 right-0 h-12"
                          style={{ 
                            background: `linear-gradient(to top, ${theme.backgroundColor}, transparent)` 
                          }}
                        />
                        <div 
                          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 flex items-center justify-center"
                          style={{ 
                            backgroundColor: theme.backgroundColor,
                            borderColor: theme.backgroundColor,
                          }}
                        >
                          <span 
                            className="text-xs font-bold"
                            style={{ color: theme.primaryColor }}
                          >
                            AB
                          </span>
                        </div>
                        {currentCard?.themeId === theme.id && (
                          <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-3.5 w-3.5 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      {/* Theme Info */}
                      <div className="p-3" style={{ backgroundColor: theme.backgroundColor }}>
                        <p 
                          className="font-semibold text-sm"
                          style={{ color: theme.textColor }}
                        >
                          {theme.name}
                        </p>
                        <p 
                          className="text-xs mt-0.5 opacity-70"
                          style={{ color: theme.textColor }}
                        >
                          {theme.description}
                        </p>
                        <div className="flex gap-1 mt-2">
                          {[theme.primaryColor, theme.secondaryColor, theme.accentColor].map((color, i) => (
                            <div 
                              key={i}
                              className="h-4 w-4 rounded-full border border-black/10"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="mt-6">
            <Card className="border-0 shadow-smooth">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <ImageIcon className="h-4 w-4 text-primary" />
                  </span>
                  Upload Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cover Photo */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Cover Photo</Label>
                  <div className="relative h-36 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden group bg-secondary/30">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const url = URL.createObjectURL(file)
                          handleInputChange('coverPhoto', url)
                        }
                      }}
                    />
                    {currentCard?.coverPhoto ? (
                      <>
                        <img src={currentCard.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-sm font-medium">Change cover photo</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground group-hover:text-primary transition-colors">
                        <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                          <Upload className="h-6 w-6" />
                        </div>
                        <span className="text-sm font-medium">Upload cover photo</span>
                        <span className="text-xs text-muted-foreground mt-1">Recommended: 1200x400px</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Picture / Logo */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {cardType === 'company' ? 'Company Logo' : 'Profile Picture'}
                    </Label>
                    <div className="relative h-32 w-32 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden group bg-secondary/30">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const url = URL.createObjectURL(file)
                            handleInputChange(cardType === 'company' ? 'logo' : 'profilePicture', url)
                          }
                        }}
                      />
                      {(cardType === 'company' ? currentCard?.logo : currentCard?.profilePicture) ? (
                        <>
                          <img 
                            src={cardType === 'company' ? currentCard?.logo : currentCard?.profilePicture} 
                            alt="Profile" 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Upload className="h-6 w-6 text-white" />
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground group-hover:text-primary transition-colors">
                          <Upload className="h-8 w-8 mb-2" />
                          <span className="text-xs">Upload</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personal Details Tab */}
          <TabsContent value="personal" className="mt-6">
            <Card className="border-0 shadow-smooth">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </span>
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      {cardType === 'company' ? 'Company Name' : 'Full Name'}
                    </Label>
                    <Input
                      id="name"
                      placeholder={cardType === 'company' ? 'Acme Corporation' : 'John Smith'}
                      value={currentCard?.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="h-11 rounded-xl border-border/50 focus:border-primary"
                    />
                  </div>

                  {cardType === 'employee' && (
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="text-sm font-medium flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                        Job Title
                      </Label>
                      <Input
                        id="jobTitle"
                        placeholder="Chief Technology Officer"
                        value={currentCard?.jobTitle || ''}
                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                        className="h-11 rounded-xl border-border/50 focus:border-primary"
                      />
                    </div>
                  )}
                </div>

                {cardType === 'employee' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                      <Input
                        id="department"
                        placeholder="Engineering"
                        value={currentCard?.department || ''}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="h-11 rounded-xl border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-medium flex items-center gap-2">
                        <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Acme Corporation"
                        value={currentCard?.companyName || ''}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="h-11 rounded-xl border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="headline" className="text-sm font-medium">Headline / Tagline</Label>
                  <Textarea
                    id="headline"
                    placeholder="Building the future of digital networking..."
                    value={currentCard?.headline || ''}
                    onChange={(e) => handleInputChange('headline', e.target.value)}
                    rows={2}
                    className="rounded-xl border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accreditations" className="text-sm font-medium flex items-center gap-2">
                    <Award className="h-3.5 w-3.5 text-muted-foreground" />
                    Accreditations / Certifications
                  </Label>
                  <Input
                    id="accreditations"
                    placeholder="MBA, PMP, AWS Certified"
                    value={currentCard?.accreditations || ''}
                    onChange={(e) => handleInputChange('accreditations', e.target.value)}
                    className="h-11 rounded-xl border-border/50 focus:border-primary"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="mt-6">
            <Card className="border-0 shadow-smooth">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-4 w-4 text-primary" />
                  </span>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@acmecorp.com"
                    value={currentCard?.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-11 rounded-xl border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={currentCard?.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="h-11 rounded-xl border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyUrl" className="text-sm font-medium flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                    Company Website
                  </Label>
                  <Input
                    id="companyUrl"
                    type="url"
                    placeholder="https://acmecorp.com"
                    value={currentCard?.companyUrl || ''}
                    onChange={(e) => handleInputChange('companyUrl', e.target.value)}
                    className="h-11 rounded-xl border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customLink" className="text-sm font-medium flex items-center gap-2">
                    <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    Custom Link
                  </Label>
                  <Input
                    id="customLink"
                    type="url"
                    placeholder="https://calendly.com/johnsmith"
                    value={currentCard?.customLink || ''}
                    onChange={(e) => handleInputChange('customLink', e.target.value)}
                    className="h-11 rounded-xl border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="123 Business Ave, Suite 100, San Francisco, CA 94102"
                    value={currentCard?.address || ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={2}
                    className="rounded-xl border-border/50 focus:border-primary resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Links Tab */}
          <TabsContent value="social" className="mt-6">
            <Card className="border-0 shadow-smooth">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <Globe className="h-4 w-4 text-primary" />
                  </span>
                  Social Links
                </CardTitle>
                <p className="text-sm text-muted-foreground">Connect your social profiles</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialPlatforms.map((social) => (
                  <div key={social.platform} className="flex items-center gap-3">
                    <div 
                      className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${social.color}15` }}
                    >
                      <span 
                        className="text-sm font-bold"
                        style={{ color: social.color }}
                      >
                        {social.label.charAt(0)}
                      </span>
                    </div>
                    <Input
                      placeholder={social.placeholder}
                      value={getSocialUrl(social.platform)}
                      onChange={(e) => handleSocialChange(social.platform, e.target.value)}
                      className="h-11 rounded-xl border-border/50 focus:border-primary"
                    />
                    {getSocialUrl(social.platform) && (
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <Button 
          onClick={handleSave} 
          className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all" 
          size="lg" 
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-5 w-5 mr-2" />
              Save Card
            </>
          )}
        </Button>
      </div>

      {/* Right Side - Preview */}
      <div className="lg:sticky lg:top-6 h-fit">
        <Card className="border-0 shadow-smooth overflow-hidden">
          <CardHeader className="pb-4 bg-secondary/30">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Live Preview</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {currentTheme.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center py-8 bg-gradient-to-b from-secondary/30 to-transparent">
            <CardPreview card={currentCard} cardType={cardType} theme={currentTheme} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
