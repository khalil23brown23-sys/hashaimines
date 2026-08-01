import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatHashrate(ph: number) {
  if (ph >= 1) return `${ph.toFixed(ph % 1 === 0 ? 0 : 1)} Ph / s`
  return `${(ph * 1000).toFixed(0)} Th / s`
}

/** Matches hashaimines calculator baseline (~25.5 PH/s ≈ 0.01153139 BTC/day). */
export function estimateDailyMining(hashratePh: number, btcPriceUsd = 62266) {
  const btcPerPhPerDay = 0.01153139 / 25.5
  const btc = hashratePh * btcPerPhPerDay
  return { btc, usd: btc * btcPriceUsd }
}
