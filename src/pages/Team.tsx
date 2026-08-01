import { Card, SectionHeading } from '@/components/ui'
import { teamMembers } from '@/data/content'

export function Team() {
  return (
    <div className="px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeading
          title="Our Team"
          subtitle="Operators, engineers, and support specialists keeping Hashaimines online."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold font-display text-xl font-bold">
                {member.name
                  .split(' ')
                  .map((p) => p[0])
                  .join('')}
              </div>
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="mt-1 text-sm text-primary">{member.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{member.focus}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
