"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { SessionDTO } from "@dto/auth.dto"
import type { UserDTO } from "@dto/user.dto"
import { getConnector } from "@/lib/api"

interface AuthState {
  user: UserDTO | null
  session: SessionDTO | null
  isAuthenticated: boolean
  isLoading: boolean
  needsOnboarding: boolean
}

interface RegisterData {
  email: string
  firstname: string
  lastname: string
  role?: string
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; needsOnboarding?: boolean }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  oauthLogin: (provider: "line" | "google") => void
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

const API_BASE = process.env.NEXT_PUBLIC_SERVICE_URL || "http://localhost:3030"

/** Check if the user has completed onboarding (adultChild profile saved). */
function isOnboarded(user: UserDTO | null): boolean {
  if (!user) return false
  const ac = user.adultChild
  if (!ac) return false
  return !!(user.phone && ac.relationship && ac.goal && ac.concerns?.length)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: true,
    needsOnboarding: false,
  })

  const fetchSession = useCallback(async () => {
    try {
      const connector = getConnector()

      const sessionRes = await connector.GET<{ user?: SessionDTO } & SessionDTO>("auth/session")
      if (!sessionRes.isSuccess()) {
        setState({ user: null, session: null, isAuthenticated: false, isLoading: false, needsOnboarding: false })
        return
      }

      const sessionData = sessionRes.payload
      const session: SessionDTO = sessionData?.user ?? sessionData as SessionDTO

      const userRes = await connector.GET<UserDTO>("users/me")
      const user = userRes.isSuccess() ? (userRes.payload ?? null) : null

      setState({
        user,
        session,
        isAuthenticated: true,
        isLoading: false,
        needsOnboarding: !isOnboarded(user),
      })
    } catch {
      setState({ user: null, session: null, isAuthenticated: false, isLoading: false, needsOnboarding: false })
    }
  }, [])

  useEffect(() => {
    fetchSession() // eslint-disable-line react-hooks/set-state-in-effect
  }, [fetchSession])

  const login = async (email: string, password: string) => {
    try {
      const connector = getConnector()
      const res = await connector.POST("auth/login", { email, password: password || undefined })

      if (!res.isSuccess()) {
        return { success: false, error: res.message || "Login failed" }
      }

      await fetchSession()
      return { success: true, needsOnboarding: state.needsOnboarding }
    } catch {
      return { success: false, error: "Network error" }
    }
  }

  const register = async (data: RegisterData) => {
    try {
      const connector = getConnector()
      const res = await connector.POST("auth/register", {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        role: data.role || "adult_child",
      })

      if (!res.isSuccess()) {
        return { success: false, error: res.message || "Registration failed" }
      }

      await fetchSession()
      return { success: true }
    } catch {
      return { success: false, error: "Network error" }
    }
  }

  const logout = async () => {
    try {
      const connector = getConnector()
      await connector.POST("auth/logout")
    } catch { /* ignore */ }
    setState({ user: null, session: null, isAuthenticated: false, isLoading: false, needsOnboarding: false })
  }

  const oauthLogin = (provider: "line" | "google") => {
    const redirectUrl = `${window.location.origin}/auth/callback`
    window.location.href = `${API_BASE}/auth/oauth?provider=${provider}&redirect_url=${encodeURIComponent(redirectUrl)}`
  }

  const refreshSession = fetchSession

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, oauthLogin, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
