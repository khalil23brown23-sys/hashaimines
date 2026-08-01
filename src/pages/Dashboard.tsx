import { Link } from 'react-router-dom'
import { Activity, Pickaxe, Wallet } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button, Card } from '@/components/ui'

export function Dashboard() {
  const { user } = useAuth()
  const activePlans = user?.plans.filter((p) => p.status === 'active').length || 0
  const recent = user?.ledger.slice(0, 6) || []

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Wallet className="h-4 w-4 text-primary" />
            Total Balance
          </div>
          <p className="text-3xl font-bold text-primary">
            ${user?.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Pickaxe className="h-4 w-4 text-primary" />
            Active Plans
          </div>
          <p className="text-3xl font-bold">{activePlans}</p>
        </Card>
        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="h-4 w-4 text-primary" />
            Transactions
          </div>
          <p className="text-3xl font-bold">{user?.ledger.length || 0}</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Quick actions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/deposit">
            <Button>Deposit</Button>
          </Link>
          <Link to="/dashboard/mining">
            <Button variant="outline">Open Mining</Button>
          </Link>
          <Link to="/start-mining">
            <Button variant="secondary">Buy mining plan</Button>
          </Link>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-xl font-bold">Recent activity</h2>
        {recent.length === 0 ? (
          <p className="text-muted-foreground">No activity yet. Deposit funds to get started.</p>
        ) : (
          <div className="space-y-3">
            {recent.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 px-4 py-3"
              >
                <div>
                  <p className="font-medium capitalize">{entry.type}</p>
                  <p className="text-sm text-muted-foreground">{entry.note}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">
                    {entry.type === 'deposit' ? '+' : '-'}${entry.amount.toLocaleString()}
                  </p>
                  <p className="text-xs capitalize text-muted-foreground">{entry.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
