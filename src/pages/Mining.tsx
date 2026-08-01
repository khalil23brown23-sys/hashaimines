import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui'

type LogKind = 'gpu' | 'ok'

type LogLine = {
  id: string
  kind: LogKind
  message: string
  time: string
}

function stamp() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function hexSnippet(len = 18) {
  const chars = '0123456789abcdef'
  let out = '0x'
  for (let i = 0; i < len; i += 1) out += chars[Math.floor(Math.random() * chars.length)]
  return `${out}...`
}

function nonce() {
  return `0x${Math.floor(Math.random() * 0xffffffff)
    .toString(16)
    .padStart(8, '0')}`
}

function randomGpuLine() {
  const id = Math.random() > 0.5 ? 0 : 1
  const temp = id === 0 ? 60 + Math.floor(Math.random() * 10) : 65 + Math.floor(Math.random() * 10)
  const load = id === 0 ? 78 + Math.floor(Math.random() * 12) : 82 + Math.floor(Math.random() * 12)
  const watts = id === 0 ? 185 + Math.floor(Math.random() * 25) : 195 + Math.floor(Math.random() * 30)
  return `GPU${id}: ${temp}°C ${load}% ${watts}W`
}

/** Matches the cryptohash-style mining console sequence from the reference UI. */
function nextLogEvents(blockRef: { current: number }): Omit<LogLine, 'id'>[] {
  const time = stamp()
  const roll = Math.random()

  if (roll < 0.18) {
    return [{ kind: 'gpu', time, message: randomGpuLine() }]
  }

  if (roll < 0.36) {
    return [
      { kind: 'ok', time, message: `Checking address: ${hexSnippet()}` },
      {
        kind: 'ok',
        time,
        message: `Processing block candidate #${blockRef.current++}`,
      },
    ]
  }

  if (roll < 0.55) {
    return [
      { kind: 'ok', time, message: `Hash found! Nonce: ${nonce()}` },
      { kind: 'ok', time, message: 'Submitting share to pool...' },
      {
        kind: 'ok',
        time,
        message: `Share accepted! Difficulty: ${(4 + Math.random() * 8).toFixed(2)}`,
      },
    ]
  }

  if (roll < 0.72) {
    return [{ kind: 'ok', time, message: 'New job received from stratum server' }]
  }

  if (roll < 0.86) {
    return [
      {
        kind: 'ok',
        time,
        message: `Checking next address in queue: ${hexSnippet()}`,
      },
    ]
  }

  return [
    { kind: 'gpu', time, message: randomGpuLine() },
    { kind: 'ok', time, message: `Checking address: ${hexSnippet()}` },
  ]
}

function TerminalLine({ line }: { line: LogLine }) {
  return (
    <div className="whitespace-pre-wrap break-all">
      <span className="text-[#fbbf24]">[{line.time}]</span>{' '}
      <span className={line.kind === 'gpu' ? 'text-[#fbbf24]' : 'text-[#4ade80]'}>
        {line.message}
      </span>
    </div>
  )
}

export function Mining() {
  const {
    user,
    startMiningSession,
    stopMiningSession,
    tickMining,
    claimMiningEarnings,
  } = useAuth()
  const mining = user?.mining
  const [logs, setLogs] = useState<LogLine[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef(8)

  useEffect(() => {
    if (!mining?.active) return

    const bootTime = stamp()
    setLogs([
      {
        id: crypto.randomUUID(),
        kind: 'ok',
        time: bootTime,
        message: `Checking address: ${hexSnippet()}`,
      },
      {
        id: crypto.randomUUID(),
        kind: 'ok',
        time: bootTime,
        message: `Processing block candidate #${blockRef.current++}`,
      },
      {
        id: crypto.randomUUID(),
        kind: 'gpu',
        time: bootTime,
        message: 'GPU1: 70°C 86% 201W',
      },
      {
        id: crypto.randomUUID(),
        kind: 'ok',
        time: bootTime,
        message: `Hash found! Nonce: ${nonce()}`,
      },
      {
        id: crypto.randomUUID(),
        kind: 'ok',
        time: bootTime,
        message: 'Submitting share to pool...',
      },
      {
        id: crypto.randomUUID(),
        kind: 'ok',
        time: bootTime,
        message: 'Share accepted! Difficulty: 9.92',
      },
    ])

    const baseHashrate = mining.hashrate || 13.1
    const timer = window.setInterval(() => {
      const batch = nextLogEvents(blockRef).map((line) => ({
        ...line,
        id: crypto.randomUUID(),
      }))
      setLogs((prev) => [...prev, ...batch].slice(-90))

      const hashrate = Number((baseHashrate + (Math.random() * 1.2 - 0.4)).toFixed(1))
      const sharesDelta = Math.random() > 0.4 ? 1 : 0
      const minedDelta = Math.max(0.01, hashrate * 0.0022 * (0.7 + Math.random() * 0.6))
      tickMining(minedDelta, sharesDelta, Math.max(1, hashrate))
    }, 1400)

    return () => window.clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mining?.active])

  useEffect(() => {
    const el = terminalRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [logs])

  function handleStart() {
    setError(null)
    setMessage(null)
    const result = startMiningSession()
    if (result) setError(result)
    else {
      setLogs([])
      setMessage('Mining session activated.')
    }
  }

  function handleStop() {
    stopMiningSession()
    setMessage('Mining session stopped.')
  }

  function handleClaim() {
    setError(null)
    setMessage(null)
    const result = claimMiningEarnings()
    if (result) setError(result)
    else setMessage('Mined earnings added to your balance. You can withdraw anytime.')
  }

  if (!mining) return null

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-3xl font-bold text-white">Mining</h2>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-[#111b2d] px-4 text-sm text-white/85"
        >
          English
          <ChevronDown className="h-3.5 w-3.5 text-white/50" />
        </button>
      </div>

      <div
        ref={terminalRef}
        className="h-[340px] overflow-y-auto rounded-2xl border border-white/10 bg-[#0b111b] p-4 font-mono text-[13px] leading-6 md:h-[400px] md:p-5"
      >
        <div className="mb-1">
          <span className="text-[#4ade80]">miner@cryptohash</span>
          <span className="text-white"> ~ </span>
          <span className="text-[#fbbf24]">stratum+tcp:</span>
        </div>

        {mining.active
          ? logs.map((line) => <TerminalLine key={line.id} line={line} />)
          : null}

        <div className="mt-1 inline-block h-4 w-2 animate-pulse bg-[#4ade80]/80" />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: 'MINED (USD)', value: mining.minedUsd.toFixed(2) },
          { label: 'TARGET', value: mining.target.toFixed(2) },
          { label: 'HASHRATE', value: `${mining.hashrate.toFixed(1)} TH/s` },
          { label: 'SHARES', value: String(mining.shares) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-[#0b152f] px-4 py-5 text-center"
          >
            <p className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</p>
            <p className="mt-2 text-xs tracking-wide text-white/50 md:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {!mining.active ? (
        <div className="rounded-lg border border-primary/40 bg-[#0b152f] px-4 py-3 text-sm text-primary">
          Mining session is not activated
        </div>
      ) : (
        <div className="rounded-lg border border-emerald-500/30 bg-[#0b152f] px-4 py-3 text-sm text-emerald-400">
          Mining session is active · earnings update in real time
        </div>
      )}

      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      {message ? <p className="text-sm text-primary">{message}</p> : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {mining.active ? (
          <Button className="h-12 w-full" variant="secondary" onClick={handleStop}>
            Stop Session
          </Button>
        ) : (
          <Button className="h-12 w-full" onClick={handleStart}>
            Start New Session
          </Button>
        )}
        {mining.minedUsd > 0 ? (
          <Button className="h-12 w-full" variant="outline" onClick={handleClaim}>
            Claim ${mining.minedUsd.toFixed(2)}
          </Button>
        ) : (
          <Link to="/withdraw" className="block">
            <Button className="h-12 w-full" variant="outline">
              Withdraw
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
