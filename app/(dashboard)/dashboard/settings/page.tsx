'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/store'
import { toast } from 'sonner'
import {
  Building2,
  Shield,
  Bell,
  Key,
  Upload,
  Save,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
} from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuthStore()
  const [showApiKey, setShowApiKey] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Company settings state
  const [companySettings, setCompanySettings] = useState({
    name: 'Acme Corporation',
    website: 'https://acmecorp.com',
    industry: 'Technology',
    address: '123 Business Ave, Suite 100, San Francisco, CA 94102',
  })

  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailNewLead: true,
    emailWeeklyReport: true,
    pushNewScan: true,
    pushTeamActivity: false,
  })

  const mockApiKey = 'cf_live_sk_1234567890abcdef1234567890abcdef'

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Settings saved successfully')
    setIsSaving(false)
  }

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(mockApiKey)
    toast.success('API key copied to clipboard')
  }

  const handleRegenerateApiKey = () => {
    toast.success('New API key generated')
  }

  const initials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'U'

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="h-4 w-4 hidden sm:block" />
            Company
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4 hidden sm:block" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4 hidden sm:block" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="h-4 w-4 hidden sm:block" />
            API Keys
          </TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company">
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your personal account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Avatar
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      JPG, GIF or PNG. Max size 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue={user?.name || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user?.email || ''} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Card */}
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Details about your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      This will appear on your team&apos;s cards
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companySettings.name}
                      onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={companySettings.website}
                      onChange={(e) => setCompanySettings({ ...companySettings, website: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={companySettings.industry}
                      onChange={(e) => setCompanySettings({ ...companySettings, industry: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={companySettings.address}
                      onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Change Password</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <Button>Update Password</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                  <div>
                    <p className="font-medium text-foreground">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Active Sessions</h3>
                <div className="space-y-3">
                  {[
                    { device: 'MacBook Pro', location: 'San Francisco, CA', time: 'Current session' },
                    { device: 'iPhone 15 Pro', location: 'San Francisco, CA', time: '2 hours ago' },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border">
                      <div>
                        <p className="font-medium text-foreground">{session.device}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.location} • {session.time}
                        </p>
                      </div>
                      {index > 0 && (
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div>
                      <p className="font-medium text-foreground">New Lead Captured</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone scans your card
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNewLead}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailNewLead: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div>
                      <p className="font-medium text-foreground">Weekly Report</p>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of your performance
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailWeeklyReport}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailWeeklyReport: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Push Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div>
                      <p className="font-medium text-foreground">New Scan Alert</p>
                      <p className="text-sm text-muted-foreground">
                        Real-time notifications for card scans
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushNewScan}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, pushNewScan: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div>
                      <p className="font-medium text-foreground">Team Activity</p>
                      <p className="text-sm text-muted-foreground">
                        Updates about your team members
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushTeamActivity}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, pushTeamActivity: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for external integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl border border-border space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Live API Key</p>
                    <p className="text-sm text-muted-foreground">Use this key for production integrations</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRegenerateApiKey}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-3 rounded-lg bg-muted font-mono text-sm">
                    {showApiKey ? mockApiKey : '••••••••••••••••••••••••••••••••••••'}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyApiKey}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <h4 className="font-medium text-foreground mb-2">API Documentation</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn how to integrate CardFlow with your applications using our comprehensive API documentation.
                </p>
                <Button variant="outline" size="sm">
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
