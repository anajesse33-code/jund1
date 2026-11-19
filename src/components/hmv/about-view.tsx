'use client';

import { ArrowRight, Handshake, MapPinned, ShieldCheck, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SITE, STATS, type ViewId } from './site-data';

const VALUES = [
  {
    icon: Handshake,
    title: 'Straight Dealing',
    description:
      'One firm number, stated up front, honored at pickup. We would rather walk away from a deal than lowball you twice.',
  },
  {
    icon: Wrench,
    title: 'Real Workshop Skill',
    description:
      'Our technicians have spent decades inside engines, hydraulic systems and undercarriages — the same skill we put into every refurbishment.',
  },
  {
    icon: ShieldCheck,
    title: 'No Surprises',
    description:
      'Real photos, real hours, real condition notes. If a machine has a flaw, we tell you before you buy, not after.',
  },
  {
    icon: MapPinned,
    title: 'Local Everywhere',
    description:
      'Partner yards, ports and haulers around the globe mean faster pickup, fair hauling rates and people who know regional titles and rules.',
  },
];

export function AboutView({ onNavigate }: { onNavigate: (view: ViewId) => void }) {
  return (
    <>
      <section className="border-b bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <Badge variant="outline" className="mb-3 border-primary/40 text-primary">
            About Us
          </Badge>
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            The Dealer Behind {SITE.domain}
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            HMV Buy, Sell &amp; Repairs is what happens when equipment operators get
            tired of how used machinery usually gets traded — the flakes, the
            brokers, the &quot;is it still available?&quot; ghosts. We built a dealer
            that does three things properly: pays fair money for used machines,
            sells inspected equipment that works, and repairs the machines that
            keep fleets earning.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Our Story</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                HMV started in a two-bay shop with a simple trade: buy a worn-out
                machine, put it back together properly, and stand behind it. The
                first machines we refurbished sold by word of mouth before they ever
                reached the internet — and that hasn&apos;t changed much since.
              </p>
              <p>
                Today we buy equipment across every region we serve,
                refurbish in our own workshops, and sell to contractors, farm
                operators and municipalities who need iron that works — not iron
                that looks good in photos. The repair bays are still the heart of
                the business: they keep our own standards honest, and they keep our
                customers&apos; fleets running season after season.
              </p>
              <p>
                Whether you have one idle backhoe in the weeds or a fleet to
                liquidate, you get the same treatment: a real person, a firm number,
                and a pickup date you can plan around.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <Card key={s.label} className="py-0">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-extrabold text-primary">{s.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            How We Do Business
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <Card key={v.title} className="py-0">
                <CardContent className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <v.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight">
            Come See the Machines in Person
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Walk the yard, put a machine through its paces, and talk to the
            technicians who refurbished it. Call ahead and we&apos;ll have it warmed
            up when you arrive.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => onNavigate('contact')} className="h-11 px-6">
              Contact Us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('inventory')}
              className="h-11 px-6"
            >
              See What&apos;s in Stock
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
