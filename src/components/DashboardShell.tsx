import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowDownToLine,
  ArrowUpFromLine,
  Pickaxe,
  Cpu,
  UserRound,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'

const nav = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/deposit', label: 'Deposit', icon: ArrowDownToLine },
  { to: '/withdraw', label: 'Withdraw', icon: ArrowUpFromLine },
  { to: '/start-mining', label: 'Buy Plan', icon: Pickaxe },
  { to: '/dashboard/mining', label: 'Mining', icon: Cpu },
  { to: '/dashboard/account', label: 'My Account', icon: UserRound },
]

export function DashboardShell() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm text-muted-foreground">Signed in as</p>
          <h1 className="font-display text-3xl font-bold">
            {user?.fullName || user?.email}
          </h1>
        </div>
        <div className="rounded-xl border border-primary/30 bg-panel px-5 py-3">
          <p className="text-xs uppercase tracking-wider text-white/50">Available balance</p>
          <p className="text-2xl font-bold text-primary">
            ${user?.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-xl border border-border bg-gradient-card p-3">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white',
                    isActive && 'bg-primary/15 text-primary',
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
