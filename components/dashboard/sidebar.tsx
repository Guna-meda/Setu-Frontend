'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  LayoutDashboard,
  CreditCard,
  Users,
  BarChart3,
  UsersRound,
  Plug,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Cards', href: '/dashboard/cards', icon: CreditCard, badge: '3' },
  { label: 'Contacts', href: '/dashboard/contacts', icon: Users, badge: '12' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Team', href: '/dashboard/team', icon: UsersRound },
  { label: 'Integrations', href: '/dashboard/integrations', icon: Plug, isNew: true },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface DashboardSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function DashboardSidebar({ collapsed, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 hidden lg:flex lg:flex-col',
          collapsed ? 'w-[72px]' : 'w-[260px]'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 flex-shrink-0">
              <svg
                className="h-5 w-5 text-primary-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 8h10M7 12h6" />
              </svg>
            </div>
            {!collapsed && (
              <span className="text-lg font-bold text-foreground tracking-tight">
                Card<span className="text-primary">Flow</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  collapsed && 'justify-center px-0',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn(
                  'h-5 w-5 flex-shrink-0 transition-transform',
                  !isActive && 'group-hover:scale-110'
                )} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant={isActive ? 'secondary' : 'outline'} 
                        className={cn(
                          'h-5 min-w-5 px-1.5 text-[10px] font-semibold',
                          isActive && 'bg-primary-foreground/20 text-primary-foreground border-0'
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {item.isNew && (
                      <Badge className="h-5 px-1.5 text-[10px] font-semibold bg-[#8ED1A6] text-[#1F2D2A] border-0">
                        New
                      </Badge>
                    )}
                  </>
                )}
                {/* Active indicator */}
                {isActive && !collapsed && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-r-full -ml-3" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Upgrade Card */}
        {!collapsed && (
          <div className="p-3">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-4">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-semibold text-sm text-foreground">Upgrade to Pro</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Unlock unlimited cards, advanced analytics, and more.
                </p>
                <button className="w-full py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help & Collapse */}
        <div className="p-3 border-t border-border space-y-1">
          {!collapsed && (
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help & Support</span>
            </Link>
          )}
          <button
            onClick={onToggle}
            className={cn(
              'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors',
              collapsed && 'justify-center px-0'
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity duration-300',
          collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
        onClick={onToggle}
      />

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-[280px] bg-card border-r border-border transition-transform duration-300 lg:hidden',
          collapsed ? '-translate-x-full' : 'translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <svg
                className="h-5 w-5 text-primary-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 8h10M7 12h6" />
              </svg>
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              Card<span className="text-primary">Flow</span>
            </span>
          </Link>
          <button
            onClick={onToggle}
            className="h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onToggle}
                className={cn(
                  'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant={isActive ? 'secondary' : 'outline'} 
                    className={cn(
                      'h-5 min-w-5 px-1.5 text-[10px] font-semibold',
                      isActive && 'bg-primary-foreground/20 text-primary-foreground border-0'
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
                {item.isNew && (
                  <Badge className="h-5 px-1.5 text-[10px] font-semibold bg-[#8ED1A6] text-[#1F2D2A] border-0">
                    New
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
