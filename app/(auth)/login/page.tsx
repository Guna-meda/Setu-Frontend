'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store'
import { Eye, EyeOff, Loader2, ArrowRight, QrCode, Users, BarChart3 } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, error } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    await login(data.email, data.password)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-10 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25 transition-transform group-hover:scale-105">
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
            <span className="text-xl font-bold text-foreground tracking-tight">
              Card<span className="text-primary">Flow</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to your account to continue managing your digital cards
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                {...register('email')}
                className="h-12 rounded-xl border-border/50 focus:border-primary transition-colors"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password')}
                  className="h-12 rounded-xl border-border/50 focus:border-primary pr-12 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm border border-destructive/20">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 rounded-xl border-border/50 hover:bg-secondary transition-colors">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-12 rounded-xl border-border/50 hover:bg-secondary transition-colors">
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/signup" className="text-primary hover:text-primary/80 font-semibold transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-[#2F6F5F] via-[#4A9E7F] to-[#8ED1A6] items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>
        
        <div className="relative z-10 text-center max-w-md">
          {/* Animated phone mockup */}
          <div className="relative mx-auto w-64 h-[420px] mb-10">
            {/* Phone frame */}
            <div className="absolute inset-0 bg-white/95 rounded-[2.5rem] shadow-2xl overflow-hidden">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#2F6F5F] rounded-b-2xl" />
              
              {/* Card content */}
              <div className="h-full pt-10 pb-4 px-4 flex flex-col">
                {/* Cover */}
                <div className="relative h-20 bg-gradient-to-br from-[#2F6F5F] to-[#4A9E7F] rounded-xl mb-8">
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-[#2F6F5F]">JS</span>
                  </div>
                </div>
                
                <div className="text-center mt-2">
                  <h3 className="font-bold text-[#1F2D2A]">John Smith</h3>
                  <p className="text-xs text-[#5F6F6B]">Chief Technology Officer</p>
                </div>
                
                {/* Quick actions */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[QrCode, Users, BarChart3].map((Icon, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-[#EAF6EF]">
                      <Icon className="h-4 w-4 text-[#2F6F5F]" />
                    </div>
                  ))}
                </div>
                
                {/* Contact info placeholder */}
                <div className="mt-auto space-y-2">
                  <div className="h-10 rounded-lg bg-[#EAF6EF]" />
                  <div className="h-10 rounded-lg bg-[#EAF6EF]" />
                </div>
              </div>
            </div>
            
            {/* Floating notification */}
            <div className="absolute -right-8 top-16 bg-white rounded-xl p-3 shadow-lg float">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#EAF6EF] flex items-center justify-center">
                  <QrCode className="h-4 w-4 text-[#2F6F5F]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1F2D2A]">New Scan</p>
                  <p className="text-[10px] text-[#5F6F6B]">Just now</p>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            Your Digital Identity Awaits
          </h2>
          <p className="text-white/80 leading-relaxed">
            Create stunning digital business cards that leave a lasting impression. 
            Join thousands of professionals who have gone digital.
          </p>
        </div>
      </div>
    </div>
  )
}
