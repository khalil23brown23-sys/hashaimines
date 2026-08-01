import { useLocation } from 'react-router-dom'
import { Card, SectionHeading } from '@/components/ui'
import { brand } from '@/data/content'

const pages: Record<string, { title: string; body: string[] }> = {
  '/privacy': {
    title: 'Privacy Policy',
    body: [
      `${brand.name} respects your privacy. We collect account details you provide (such as name and email) to operate the platform, process deposits and withdrawals, and deliver support.`,
      'We do not sell personal information. Access to account data is limited to authorized personnel and service providers needed to run the product.',
      'Contact us if you need to update or delete your account information.',
    ],
  },
  '/terms': {
    title: 'Terms of Service',
    body: [
      `By creating an account on ${brand.name}, you agree to use the platform lawfully and keep your credentials secure.`,
      'Mining plans, payouts, and balances shown in the demo environment are simulated for product demonstration unless a live backend is connected.',
      'We may update these terms; continued use of the site after changes constitutes acceptance.',
    ],
  },
  '/cookie-policy': {
    title: 'Cookie Policy',
    body: [
      'We use essential cookies and local storage to keep you signed in and remember basic preferences.',
      'Analytics or advertising cookies are only used if explicitly configured for your deployment.',
    ],
  },
  '/usage-policy': {
    title: 'Usage Policy',
    body: [
      'Do not attempt to abuse, reverse engineer, or disrupt Hashaimines services.',
      'One person should maintain one account unless we approve otherwise.',
      'Suspicious activity may result in temporary holds or account review.',
    ],
  },
}

export function Legal() {
  const { pathname } = useLocation()
  const page = pages[pathname] || {
    title: 'Policy',
    body: ['This page is not available.'],
  }

  return (
    <div className="px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-3xl">
        <SectionHeading title={page.title} />
        <Card className="space-y-5 p-8 text-muted-foreground md:p-10">
          {page.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="text-sm">
            Questions? Email{' '}
            <a className="text-primary hover:underline" href={`mailto:${brand.supportEmail}`}>
              {brand.supportEmail}
            </a>
          </p>
        </Card>
      </div>
    </div>
  )
}
