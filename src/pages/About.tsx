import { Link } from 'react-router-dom'
import { Button, Card, SectionHeading } from '@/components/ui'
import { brand } from '@/data/content'

export function About() {
  return (
    <div className="px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading
          title={`About ${brand.name}`}
          subtitle={brand.tagline}
        />
        <Card className="space-y-6 p-8 leading-relaxed text-muted-foreground md:p-10">
          <p>{brand.description}</p>
          <p>
            With Hashaimines you connect hashrate to a global marketplace, monitor performance
            in real time, and receive daily mining rewards without managing hardware yourself.
          </p>
          <p>
            Our facilities span multiple continents with redundant power, cooling, and network
            infrastructure designed for 99.9% uptime.
          </p>
          <div className="pt-2">
            <Link to="/signup">
              <Button>Get started</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
