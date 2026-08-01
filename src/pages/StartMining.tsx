import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { miningPlans, type MiningPlan } from '@/data/content'
import { Button, Card, SectionHeading } from '@/components/ui'

type Tab = 'buy' | 'purchased' | 'mining'

function PlanCard({
  plan,
  onBuy,
  canBuy,
}: {
  plan: MiningPlan
  onBuy: (plan: MiningPlan) => void
  canBuy: boolean
}) {
  const yieldText = plan.totalMining
    ? `Total: ${plan.totalMining.btc} BTC (≈ $${plan.totalMining.usd.toLocaleString()})`
    : plan.dailyMining
      ? `Daily: ${plan.dailyMining.btc} BTC (≈ $${plan.dailyMining.usd.toLocaleString()})`
      : ''

  return (
    <Card className="flex h-full flex-col p-6 transition hover:border-primary/40">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <p className="text-sm text-muted-foreground">{plan.hardware}</p>
        </div>
        <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
          {plan.duration} day{plan.duration > 1 ? 's' : ''}
        </span>
      </div>
      <p className="mb-2 font-display text-3xl font-bold text-primary">
        ${plan.price.toLocaleString()}
      </p>
      <p className="mb-4 text-sm text-muted-foreground">{yieldText}</p>
      {plan.referralRewards ? (
        <p className="mb-4 text-xs text-white/50">
          Referral rewards: ${plan.referralRewards.toLocaleString()}
        </p>
      ) : null}
      <div className="mt-auto space-y-3">
        <p className="text-xs text-muted-foreground">
          Available {plan.available.toLocaleString()} · Sold {plan.sold.toLocaleString()}
        </p>
        {canBuy ? (
          <Button className="w-full" onClick={() => onBuy(plan)}>
            Buy plan
          </Button>
        ) : (
          <Link to="/login">
            <Button className="w-full">Sign in to buy</Button>
          </Link>
        )}
      </div>
    </Card>
  )
}

export function StartMining() {
  const { user, buyPlan } = useAuth()
  const [tab, setTab] = useState<Tab>('buy')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const purchased = user?.plans || []
  const active = useMemo(
    () => purchased.filter((p) => p.status === 'active'),
    [purchased],
  )

  function handleBuy(plan: MiningPlan) {
    setMessage(null)
    setError(null)
    const result = buyPlan(plan)
    if (result) setError(result)
    else {
      setMessage(`${plan.name} plan purchased successfully.`)
      setTab('purchased')
    }
  }

  return (
    <div className="px-4 py-10 md:py-14">
      <div className="container mx-auto">
        {!user ? (
          <SectionHeading
            title="Start Mining"
            subtitle="Choose a Hashaimines cloud mining plan powered by Antminer S19 hardware."
          />
        ) : null}

        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              ['buy', 'Buy Plan'],
              ['purchased', 'Purchased Plans'],
              ['mining', 'Mining'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === id
                  ? 'bg-gradient-gold text-primary-foreground'
                  : 'border border-white/10 text-white/70 hover:border-primary/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {message ? <p className="mb-4 text-sm text-primary">{message}</p> : null}
        {error ? <p className="mb-4 text-sm text-red-400">{error}</p> : null}

        {tab === 'buy' ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {miningPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onBuy={handleBuy}
                canBuy={Boolean(user)}
              />
            ))}
          </div>
        ) : null}

        {tab === 'purchased' ? (
          <Card className="p-6">
            {!user ? (
              <p className="text-muted-foreground">
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>{' '}
                to view purchased plans.
              </p>
            ) : purchased.length === 0 ? (
              <p className="text-muted-foreground">No purchased plans yet.</p>
            ) : (
              <div className="space-y-3">
                {purchased.map((plan) => (
                  <div
                    key={`${plan.id}-${plan.purchasedAt}`}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold">{plan.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Bought {new Date(plan.purchasedAt).toLocaleString()} · {plan.duration} days
                      </p>
                    </div>
                    <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold capitalize text-green-400">
                      {plan.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ) : null}

        {tab === 'mining' ? (
          <Card className="p-6">
            {!user ? (
              <p className="text-muted-foreground">Sign in to monitor active mining.</p>
            ) : active.length === 0 ? (
              <p className="text-muted-foreground">No active mining contracts.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {active.map((plan) => (
                  <div
                    key={`${plan.id}-mining-${plan.purchasedAt}`}
                    className="rounded-xl border border-primary/20 bg-panel p-5"
                  >
                    <p className="text-sm text-primary">Mining live</p>
                    <h3 className="mt-1 text-xl font-bold">{plan.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Hardware: {plan.hardware}
                    </p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full w-2/3 animate-pulse bg-gradient-gold" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ) : null}
      </div>
    </div>
  )
}
