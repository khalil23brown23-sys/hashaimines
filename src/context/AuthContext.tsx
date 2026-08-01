import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { MiningPlan } from '@/data/content'

export type PurchasedPlan = MiningPlan & {
  purchasedAt: string
  status: 'active' | 'completed'
}

export type LedgerEntry = {
  id: string
  type: 'deposit' | 'withdraw' | 'purchase' | 'mining'
  amount: number
  method?: string
  note: string
  createdAt: string
  status: 'pending' | 'completed' | 'rejected'
}

export type MiningSession = {
  active: boolean
  minedUsd: number
  target: number
  hashrate: number
  shares: number
  startedAt: string | null
}

export type UserAccount = {
  id: string
  email: string
  fullName: string
  password: string
  balance: number
  plans: PurchasedPlan[]
  ledger: LedgerEntry[]
  wallets: { btc: string; usdt: string }
  mining: MiningSession
  createdAt: string
}

type AuthContextValue = {
  user: UserAccount | null
  loading: boolean
  login: (email: string, password: string) => Promise<string | null>
  signup: (fullName: string, email: string, password: string) => Promise<string | null>
  logout: () => void
  deposit: (amount: number, method: string) => void
  withdraw: (amount: number, method: string) => string | null
  buyPlan: (plan: MiningPlan) => string | null
  startMiningSession: () => string | null
  stopMiningSession: () => void
  tickMining: (minedDelta: number, sharesDelta: number, hashrate: number) => void
  claimMiningEarnings: () => string | null
  updateProfile: (fullName: string) => void
  updateWallets: (wallets: { btc: string; usdt: string }) => void
  changePassword: (current: string, next: string) => string | null
}

const STORAGE_KEY = 'hashaimines.users'
const SESSION_KEY = 'hashaimines.session'

const defaultMining = (): MiningSession => ({
  active: false,
  minedUsd: 0,
  target: 0,
  hashrate: 13.1,
  shares: 0,
  startedAt: null,
})

const AuthContext = createContext<AuthContextValue | null>(null)

function normalizeUser(raw: UserAccount): UserAccount {
  return {
    ...raw,
    mining: raw.mining ?? defaultMining(),
  }
}

function readUsers(): UserAccount[] {
  try {
    return (JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as UserAccount[]).map(
      normalizeUser,
    )
  } catch {
    return []
  }
}

function writeUsers(users: UserAccount[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

function planHashrate(plans: PurchasedPlan[]) {
  const active = plans.filter((p) => p.status === 'active')
  if (active.length === 0) return 13.1
  return Math.min(
    120,
    active.reduce((sum, plan) => sum + Math.max(2.5, plan.price / 180), 0),
  )
}

function planTarget(plans: PurchasedPlan[]) {
  const active = plans.filter((p) => p.status === 'active')
  if (active.length === 0) return 25
  return active.reduce((sum, plan) => {
    const usd = plan.totalMining?.usd ?? plan.dailyMining?.usd ?? plan.price * 1.5
    return sum + usd
  }, 0)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionId = localStorage.getItem(SESSION_KEY)
    if (sessionId) {
      const found = readUsers().find((u) => u.id === sessionId) || null
      setUser(found)
    }
    setLoading(false)
  }, [])

  const persist = (next: UserAccount) => {
    const users = readUsers()
    const idx = users.findIndex((u) => u.id === next.id)
    if (idx >= 0) users[idx] = next
    else users.push(next)
    writeUsers(users)
    setUser(next)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      async login(email, password) {
        const found = readUsers().find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
        )
        if (!found) return 'Invalid email or password.'
        localStorage.setItem(SESSION_KEY, found.id)
        setUser(found)
        return null
      },
      async signup(fullName, email, password) {
        const users = readUsers()
        if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
          return 'An account with this email already exists.'
        }
        const account: UserAccount = {
          id: crypto.randomUUID(),
          email,
          fullName,
          password,
          balance: 0,
          plans: [],
          ledger: [],
          wallets: { btc: '', usdt: '' },
          mining: defaultMining(),
          createdAt: new Date().toISOString(),
        }
        writeUsers([...users, account])
        localStorage.setItem(SESSION_KEY, account.id)
        setUser(account)
        return null
      },
      logout() {
        localStorage.removeItem(SESSION_KEY)
        setUser(null)
      },
      deposit(amount, method) {
        if (!user) return
        const entry: LedgerEntry = {
          id: crypto.randomUUID(),
          type: 'deposit',
          amount,
          method,
          note: `Deposit via ${method}`,
          createdAt: new Date().toISOString(),
          status: 'completed',
        }
        persist({
          ...user,
          balance: user.balance + amount,
          ledger: [entry, ...user.ledger],
        })
      },
      withdraw(amount, method) {
        if (!user) return 'Not signed in.'
        if (amount > user.balance) return 'Insufficient balance.'
        const entry: LedgerEntry = {
          id: crypto.randomUUID(),
          type: 'withdraw',
          amount,
          method,
          note: `Withdrawal via ${method}`,
          createdAt: new Date().toISOString(),
          status: 'pending',
        }
        persist({
          ...user,
          balance: user.balance - amount,
          ledger: [entry, ...user.ledger],
        })
        return null
      },
      buyPlan(plan) {
        if (!user) return 'Not signed in.'
        if (user.balance < plan.price) return 'Insufficient balance. Please deposit first.'
        const purchased: PurchasedPlan = {
          ...plan,
          purchasedAt: new Date().toISOString(),
          status: 'active',
        }
        const entry: LedgerEntry = {
          id: crypto.randomUUID(),
          type: 'purchase',
          amount: plan.price,
          note: `Purchased ${plan.name} plan`,
          createdAt: new Date().toISOString(),
          status: 'completed',
        }
        const plans = [purchased, ...user.plans]
        persist({
          ...user,
          balance: user.balance - plan.price,
          plans,
          ledger: [entry, ...user.ledger],
          mining: {
            ...user.mining,
            hashrate: planHashrate(plans),
            target: planTarget(plans),
          },
        })
        return null
      },
      startMiningSession() {
        if (!user) return 'Not signed in.'
        if (user.mining.active) return 'Mining session already running.'
        const hashrate = planHashrate(user.plans)
        const target = Math.max(user.mining.target, planTarget(user.plans))
        persist({
          ...user,
          mining: {
            ...user.mining,
            active: true,
            hashrate,
            target: target || 25,
            startedAt: new Date().toISOString(),
          },
        })
        return null
      },
      stopMiningSession() {
        if (!user) return
        persist({
          ...user,
          mining: {
            ...user.mining,
            active: false,
            startedAt: null,
          },
        })
      },
      tickMining(minedDelta, sharesDelta, hashrate) {
        const sessionId = localStorage.getItem(SESSION_KEY)
        if (!sessionId) return
        const current = readUsers().find((u) => u.id === sessionId)
        if (!current?.mining.active) return
        persist({
          ...current,
          mining: {
            ...current.mining,
            minedUsd: Number((current.mining.minedUsd + minedDelta).toFixed(4)),
            shares: current.mining.shares + sharesDelta,
            hashrate,
          },
        })
      },
      claimMiningEarnings() {
        if (!user) return 'Not signed in.'
        if (user.mining.minedUsd <= 0) return 'No mined earnings to claim.'
        const amount = Number(user.mining.minedUsd.toFixed(2))
        const entry: LedgerEntry = {
          id: crypto.randomUUID(),
          type: 'mining',
          amount,
          note: 'Claimed mining rewards',
          createdAt: new Date().toISOString(),
          status: 'completed',
        }
        persist({
          ...user,
          balance: user.balance + amount,
          ledger: [entry, ...user.ledger],
          mining: {
            ...user.mining,
            minedUsd: 0,
            active: false,
            startedAt: null,
          },
        })
        return null
      },
      updateProfile(fullName) {
        if (!user) return
        persist({ ...user, fullName })
      },
      updateWallets(wallets) {
        if (!user) return
        persist({ ...user, wallets })
      },
      changePassword(current, next) {
        if (!user) return 'Not signed in.'
        if (user.password !== current) return 'Current password is incorrect.'
        persist({ ...user, password: next })
        return null
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
