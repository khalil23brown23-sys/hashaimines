import { useMemo, useState, type FormEvent } from 'react'
import { useAuth } from '@/context/AuthContext'
import { depositMethods } from '@/data/content'
import { Button, Card, Input } from '@/components/ui'

export function Deposit() {
  const { deposit, user } = useAuth()
  const [method, setMethod] = useState(depositMethods[0].value)
  const [amount, setAmount] = useState('100')
  const [message, setMessage] = useState<string | null>(null)

  const selected = useMemo(
    () => depositMethods.find((m) => m.value === method) || depositMethods[0],
    [method],
  )

  const logs = user?.ledger.filter((e) => e.type === 'deposit') || []

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const value = Number(amount)
    if (!Number.isFinite(value) || value < selected.min || value > selected.max) {
      setMessage(`Enter an amount between $${selected.min} and $${selected.max}.`)
      return
    }
    deposit(value, selected.label)
    setMessage(`Deposit of $${value.toLocaleString()} via ${selected.label} recorded.`)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-8">
        <h2 className="mb-2 text-2xl font-bold">Deposit Now</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Choose a payment method and amount. Demo mode credits your local balance instantly.
        </p>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {depositMethods.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setMethod(item.value)}
                className={`rounded-xl border px-4 py-4 text-left transition ${
                  method === item.value
                    ? 'border-primary bg-primary/10'
                    : 'border-white/10 hover:border-primary/40'
                }`}
              >
                <p className="font-semibold">{item.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.network}</p>
                <p className="mt-2 text-xs text-white/50">{item.description}</p>
              </button>
            ))}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Amount (USD) — min ${selected.min}
            </label>
            <Input
              type="number"
              min={selected.min}
              max={selected.max}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {message ? <p className="text-sm text-primary">{message}</p> : null}
          <Button type="submit">Confirm deposit</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-bold">Deposit Log</h3>
        {logs.length === 0 ? (
          <p className="text-muted-foreground">No deposits yet.</p>
        ) : (
          <div className="space-y-3">
            {logs.map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm"
              >
                <span>{entry.note}</span>
                <span className="font-semibold text-primary">
                  +${entry.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
