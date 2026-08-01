import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { brand } from '@/data/content'

const legal = [
  { to: '/usage-policy', label: 'Usage Policy' },
  { to: '/cookie-policy', label: 'Cookie Policy' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#050c1a]">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <img src="/favicon.svg" alt="" className="h-9 w-9" />
            <span className="font-display text-xl font-bold">{brand.name}</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            {brand.description}
          </p>
        </div>

        <div>
          <h5 className="relative mb-4 pb-2 text-lg font-semibold text-white">
            Legal
            <span className="absolute bottom-0 left-0 h-0.5 w-12 bg-yellow-400" />
          </h5>
          <ul className="space-y-3">
            {legal.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-white/70 transition-colors hover:text-yellow-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="relative mb-4 pb-2 text-lg font-semibold text-white">
            Contact Info
            <span className="absolute bottom-0 left-0 h-0.5 w-12 bg-yellow-400" />
          </h5>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-yellow-400" />
              <a
                href={`mailto:${brand.supportEmail}`}
                className="text-white/70 transition-colors hover:text-yellow-400"
              >
                {brand.supportEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-5 text-center text-sm text-white/45">
        © {new Date().getFullYear()} {brand.name} All Rights Reserved
      </div>
    </footer>
  )
}
