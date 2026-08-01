# Hashaimines

Clone of [hashaimines.com](https://hashaimines.com) based on the [btcminingbase.com](https://btcminingbase.com) cloud-mining product structure.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- React Router
- LocalStorage auth (demo backend)

## Scripts

```bash
npm install
npm run dev
npm run build
```

Open the local URL from `npm run dev` (usually `http://localhost:5173`).

## Deploy + custom domain (Vercel)

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite** (build `npm run build`, output `dist`).
4. After deploy, open **Project → Settings → Domains**.
5. Add your domain (e.g. `hashaimines.com` and `www.hashaimines.com`).
6. At your domain registrar, set DNS as Vercel shows:
   - Apex (`hashaimines.com`): **A** record → `76.76.21.21`
   - `www`: **CNAME** → `cname.vercel-dns.com`
7. Wait for SSL to show **Valid** (can take a few minutes to an hour).

## Included pages

- Home with hashrate calculator
- About / Team
- Login / Signup
- Dashboard, Deposit, Withdraw, Start Mining, Account
- Privacy, Terms, Cookie Policy, Usage Policy

Auth, balances, deposits, withdrawals, and plan purchases are stored in the browser for demo purposes. Wire Supabase or your own API when you are ready for production.
