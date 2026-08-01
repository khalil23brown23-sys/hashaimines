import { useState, type FormEvent } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Button, Card, Input } from '@/components/ui'

export function Withdraw() {
  const { withdraw, user } = useAuth()
  const [amount, setAmount] = useState('50')
  const [method, setMethod] = useState('BTC')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const logs = user?.ledger.filter((e) => e.type === 'withdraw') || []

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    const value = Number(amount)
    if (!Number.isFinite(value) || value <= 0) {
      setError('Enter a valid amount.')
      return
    }
    const result = withdraw(value, method)
    if (result) setError(result)
    else setMessage(`Withdrawal request for $${value.toLocaleString()} submitted.`)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-8">
        <h2 className="mb-2 text-2xl font-bold">Withdraw Now</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Available balance: $
          {user?.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>

        <form className="max-w-md space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium">Amount (USD)</label>
            <Input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Method</label>
            <select
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option>BTC</option>
              <option>USDT.TRC20</option>
              <option>USDT.ERC20</option>
              <option>ETH</option>
            </select>
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          {message ? <p className="text-sm text-primary">{message}</p> : null}
          <Button type="submit">Request withdrawal</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-bold">Withdraw Log</h3>
        {logs.length === 0 ? (
          <p className="text-muted-foreground">No withdrawals yet.</p>
        ) : (
          <div className="space-y-3">
            {logs.map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm"
              >
                <div>
                  <p>{entry.note}</p>
                  <p className="capitalize text-muted-foreground">{entry.status}</p>
                </div>
                <span className="font-semibold">-${entry.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
