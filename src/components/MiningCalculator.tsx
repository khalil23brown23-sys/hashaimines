import { useMemo, useState } from 'react'
import { Card } from '@/components/ui'
import { estimateDailyMining, formatHashrate } from '@/lib/utils'

export function MiningCalculator() {
  const [hashrate, setHashrate] = useState(25.5)
  const { btc, usd } = useMemo(() => estimateDailyMining(hashrate), [hashrate])

  return (
    <Card className="mt-16 px-6 py-8 shadow-card transition-colors hover:border-primary/30 md:mt-24 md:px-10 md:py-10">
      <p className="mb-4 text-base font-medium text-foreground md:text-lg">
        You could mine
      </p>
      <div className="mb-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
          {btc.toFixed(8)}
        </span>
        <span className="text-lg font-medium text-foreground md:text-xl">BTC / Day</span>
        <span className="ml-auto text-sm text-muted-foreground md:text-base">
          ≈ {usd.toFixed(2)} USD / Day
        </span>
      </div>

      <input
        type="range"
        min={1}
        max={80}
        step={0.1}
        value={hashrate}
        onChange={(e) => setHashrate(Number(e.target.value))}
        aria-label="Hashrate"
        className="mb-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
      />

      <div>
        <p className="text-lg font-semibold text-foreground md:text-xl">
          with {formatHashrate(hashrate)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Antminer S19</p>
      </div>
    </Card>
  )
}
