import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Globe2,
  Headset,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react'

export const brand = {
  name: 'Hashaimines',
  tagline: 'Pioneering Web3 Mining Solutions',
  supportEmail: 'support@hashaimines.com',
  description:
    'Hashaimines is one of the leading cryptocurrency mining platforms, offering cryptocurrency mining capacities in every range — for newcomers. Our mission is to make acquiring cryptocurrencies easy and fast for everyone.',
}

export const features: {
  icon: LucideIcon
  title: string
  description: string
}[] = [
  {
    icon: Sparkles,
    title: 'High Performance',
    description:
      'State-of-the-art mining hardware with optimized algorithms for maximum efficiency and profitability.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Platform',
    description:
      'Bank-level security with multi-factor authentication and cold storage for your digital assets.',
  },
  {
    icon: Wallet,
    title: 'Daily Payouts',
    description:
      'Receive your mining rewards automatically every day directly to your wallet.',
  },
  {
    icon: Activity,
    title: 'Real-time Analytics',
    description:
      'Monitor your mining performance with detailed statistics and comprehensive dashboards.',
  },
  {
    icon: Globe2,
    title: 'Global Network',
    description:
      'Mining facilities across multiple continents ensuring 99.9% uptime and reliability.',
  },
  {
    icon: Headset,
    title: '24/7 Support',
    description:
      'Dedicated support team available around the clock to assist with any questions or issues.',
  },
]

export const stats = [
  { value: '50K+', label: 'Active Miners' },
  { value: '250+', label: 'BTC Mined' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Countries' },
]

export type MiningPlan = {
  id: string
  name: string
  price: number
  duration: number
  hardware: string
  totalMining?: { btc: number; usd: number }
  dailyMining?: { btc: number; usd: number }
  monthlyMining?: { btc: number; usd: number }
  referralRewards?: number
  available: number
  sold: number
}

export const miningPlans: MiningPlan[] = [
  {
    id: 'trial',
    name: 'TRIAL',
    price: 50,
    duration: 1,
    hardware: 'Antminer S19',
    totalMining: { btc: 0.00249, usd: 225.04 },
    available: 4000,
    sold: 652,
  },
  {
    id: 'new-beginner',
    name: 'NEW BEGINNER',
    price: 100,
    duration: 3,
    hardware: 'Antminer S19',
    totalMining: { btc: 0.0072, usd: 650.07 },
    available: 4000,
    sold: 652,
  },
  {
    id: 'basic',
    name: 'BASIC',
    price: 200,
    duration: 7,
    hardware: 'Antminer S19',
    totalMining: { btc: 0.01329, usd: 1200.18 },
    available: 4000,
    sold: 452,
  },
  {
    id: 'economy',
    name: 'ECONOMY',
    price: 400,
    duration: 7,
    hardware: 'Antminer S19',
    totalMining: { btc: 0.01994, usd: 1800.37 },
    referralRewards: 72.8,
    available: 3000,
    sold: 2154,
  },
  {
    id: 'bronze',
    name: 'BRONZE',
    price: 1000,
    duration: 30,
    hardware: 'Antminer S19',
    totalMining: { btc: 0.08325, usd: 7500 },
    available: 1000,
    sold: 0,
  },
  {
    id: 'standard',
    name: 'STANDARD',
    price: 2400,
    duration: 90,
    hardware: 'Antminer S19',
    dailyMining: { btc: 0.0025, usd: 225.175 },
    monthlyMining: { btc: 0.075, usd: 6755.525 },
    referralRewards: 240,
    available: 2000,
    sold: 1096,
  },
  {
    id: 'silver',
    name: 'SILVER',
    price: 4000,
    duration: 90,
    hardware: 'Antminer S19',
    dailyMining: { btc: 0.00275, usd: 250 },
    monthlyMining: { btc: 0.08325, usd: 7500 },
    available: 500,
    sold: 0,
  },
  {
    id: 'senior',
    name: 'SENIOR',
    price: 6500,
    duration: 90,
    hardware: 'Antminer S19',
    dailyMining: { btc: 0.005, usd: 450.375 },
    monthlyMining: { btc: 0.15, usd: 13511.05 },
    referralRewards: 650,
    available: 1000,
    sold: 800,
  },
  {
    id: 'advanced',
    name: 'ADVANCED',
    price: 12600,
    duration: 90,
    hardware: 'Antminer S19',
    dailyMining: { btc: 0.015, usd: 1351.1 },
    monthlyMining: { btc: 0.45, usd: 40533.13 },
    referralRewards: 1260,
    available: 800,
    sold: 461,
  },
  {
    id: 'gold',
    name: 'GOLD',
    price: 20000,
    duration: 365,
    hardware: 'Antminer S19',
    dailyMining: { btc: 0.0185, usd: 1666.67 },
    monthlyMining: { btc: 0.555, usd: 50000 },
    available: 200,
    sold: 0,
  },
  {
    id: 'luxurious',
    name: 'LUXURIOUS',
    price: 32000,
    duration: 365,
    hardware: 'Antminer S19',
    dailyMining: { btc: 0.03, usd: 2702.21 },
    monthlyMining: { btc: 0.9, usd: 81066.27 },
    referralRewards: 3200,
    available: 300,
    sold: 177,
  },
]

export const depositMethods = [
  {
    value: 'btc',
    label: 'BTC',
    network: 'Bitcoin',
    min: 70,
    max: 500000,
    description: 'Instant confirmation on Bitcoin network',
  },
  {
    value: 'usdt-trc20',
    label: 'USDT.TRC20',
    network: 'TRC20',
    min: 70,
    max: 250000,
    description: 'Fast & low cost payments on Tron network',
  },
  {
    value: 'usdt-erc20',
    label: 'USDT.ERC20',
    network: 'ERC20',
    min: 70,
    max: 250000,
    description: 'USDT payments on Ethereum network',
  },
  {
    value: 'usdc',
    label: 'USDC',
    network: 'ERC20',
    min: 70,
    max: 250000,
    description: 'USD Coin payments (1:1 USD)',
  },
  {
    value: 'eth',
    label: 'ETH',
    network: 'Ethereum',
    min: 70,
    max: 250000,
    description: 'Native Ethereum network deposits',
  },
]

export const teamMembers = [
  { name: 'Alex Morgan', role: 'Chief Executive Officer', focus: 'Strategy & partnerships' },
  { name: 'Priya Shah', role: 'Chief Technology Officer', focus: 'Mining infrastructure' },
  { name: 'Diego Alvarez', role: 'Head of Security', focus: 'Asset protection' },
  { name: 'Nora Chen', role: 'Customer Success Lead', focus: '24/7 miner support' },
]
