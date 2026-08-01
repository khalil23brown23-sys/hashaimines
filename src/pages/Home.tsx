import { Link } from 'react-router-dom'
import { MiningCalculator } from '@/components/MiningCalculator'
import { Button, Card, SectionHeading } from '@/components/ui'
import { features, stats } from '@/data/content'

export function Home() {
  return (
    <div>
      <section className="relative overflow-hidden px-4 pb-20 pt-16 md:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.16),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.14),transparent_35%)]" />
        <div className="container relative mx-auto max-w-5xl">
          <div className="animate-fade-up">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Hashaimines
            </p>
            <h1 className="mb-5 max-w-3xl font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              Mine with us
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Connect your miners to Hashaimines marketplace and mine BTC for every share.
            </p>
            <Link to="/signup">
              <Button size="lg" className="rounded-full px-10">
                More
              </Button>
            </Link>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
            <MiningCalculator />
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="container mx-auto">
          <SectionHeading title="Why Choose Hashaimines?" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-card"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-secondary p-4 transition-colors group-hover:bg-primary/20">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-crypto-blue-light/50 px-4 py-20">
        <div className="container mx-auto">
          <SectionHeading title="Platform Statistics" />
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="group p-8 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-glow"
              >
                <div className="mb-2 text-4xl font-bold text-primary transition-transform group-hover:scale-110 md:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground md:text-base">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <Card className="overflow-hidden border-primary/20 p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
              <div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  Partnered for seamless deposits
                </h2>
                <p className="text-muted-foreground">
                  Hashaimines has entered a deep strategic partnership agreement with Coinbase,
                  the largest cryptocurrency exchange in the United States. Direct transfers from
                  Coinbase exchange accounts to Hashaimines are already supported.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0F1F3F] p-6 text-center">
                <p className="text-sm uppercase tracking-wider text-white/50">Ready to earn?</p>
                <p className="mt-2 font-display text-2xl font-bold text-primary">Start mining today</p>
                <Link to="/signup" className="mt-5 inline-block">
                  <Button className="w-full">Create free account</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
