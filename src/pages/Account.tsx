import { useState, type FormEvent } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Button, Card, Input } from '@/components/ui'

export function Account() {
  const { user, updateProfile, updateWallets, changePassword } = useAuth()
  const [fullName, setFullName] = useState(user?.fullName || '')
  const [btc, setBtc] = useState(user?.wallets.btc || '')
  const [usdt, setUsdt] = useState(user?.wallets.usdt || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [nextPassword, setNextPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function saveProfile(e: FormEvent) {
    e.preventDefault()
    updateProfile(fullName.trim())
    setMessage('Profile updated.')
    setError(null)
  }

  function saveWallets(e: FormEvent) {
    e.preventDefault()
    updateWallets({ btc: btc.trim(), usdt: usdt.trim() })
    setMessage('Wallets updated.')
    setError(null)
  }

  function savePassword(e: FormEvent) {
    e.preventDefault()
    const result = changePassword(currentPassword, nextPassword)
    if (result) {
      setError(result)
      setMessage(null)
    } else {
      setMessage('Password changed.')
      setError(null)
      setCurrentPassword('')
      setNextPassword('')
    }
  }

  return (
    <div className="space-y-6">
      {message ? <p className="text-sm text-primary">{message}</p> : null}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <Card className="p-6">
        <h2 className="mb-4 text-xl font-bold">Profile</h2>
        <form className="max-w-md space-y-4" onSubmit={saveProfile}>
          <div>
            <label className="mb-2 block text-sm font-medium">Full name</label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <Input value={user?.email || ''} disabled />
          </div>
          <Button type="submit">Save profile</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-xl font-bold">Wallets</h2>
        <form className="max-w-md space-y-4" onSubmit={saveWallets}>
          <div>
            <label className="mb-2 block text-sm font-medium">BTC address</label>
            <Input value={btc} onChange={(e) => setBtc(e.target.value)} placeholder="bc1..." />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">USDT address</label>
            <Input value={usdt} onChange={(e) => setUsdt(e.target.value)} placeholder="T..." />
          </div>
          <Button type="submit">Save wallets</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-xl font-bold">Change Password</h2>
        <form className="max-w-md space-y-4" onSubmit={savePassword}>
          <div>
            <label className="mb-2 block text-sm font-medium">Current password</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">New password</label>
            <Input
              type="password"
              minLength={6}
              value={nextPassword}
              onChange={(e) => setNextPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Update password</Button>
        </form>
      </Card>
    </div>
  )
}
