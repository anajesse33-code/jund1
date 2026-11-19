'use client';

import { ArrowRight, CheckCircle2, ClipboardCheck, PackageCheck, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type ViewId } from './site-data';

const PROCESS = [
  {
    icon: ClipboardCheck,
    title: 'Full Inspection',
    description:
      'Every incoming machine gets a documented inspection: engine, hydraulics, driveline, undercarriage, structure and electrics — with real hour verification.',
  },
  {
    icon: PackageCheck,
    title: 'Refurbished Where Needed',
    description:
      'Worn components are rebuilt or replaced in our workshops. Machines are serviced, repainted where it matters, and tested under load before listing.',
  },
  {
    icon: Truck,
    title: 'Delivered Work-Ready',
    description:
      'Photos, hours and price are exactly what you get. We arrange delivery to your gate or job site around the world, and the machine is ready to earn.',
  },
];

const CHECKLIST = [
  'Compression & injection tests on arrival',
  'Hydraulic pump and cylinder cycle testing',
  'Final drives, swing and travel checks',
  'Undercarriage wear measurement',
  'Structural crack inspection (boom, stick, frame)',
  'Cab, controls and safety systems verified',
];

export function BuyView({ onNavigate }: { onNavigate: (view: ViewId) => void }) {
  return (
    <>
      <section className="border-b bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <Badge variant="outline" className="mb-3 border-primary/40 text-primary">
            Buy Ours
          </Badge>
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Machines That Go Back to Work the Day They Arrive
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            We don&apos;t flip machines as-they-come. Everything we sell has passed a
            documented inspection and, where needed, a full refurbishment in our own
            workshops — so the hours and photos you see are the machine you get.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {PROCESS.map((p) => (
            <Card key={p.title} className="py-0">
              <CardContent className="p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <p.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-secondary">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              What Our Inspection Covers
            </h2>
            <p className="mt-3 text-muted-foreground">
              The same checklist runs on every machine — whether it&apos;s a compact
              excavator or a 100-ton crane. You can ask for the inspection sheet on
              anything in stock.
            </p>
            <ul className="mt-6 space-y-3">
              {CHECKLIST.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-muted-foreground">{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            { }
            <img
              src="/images/hero.jpg"
              alt="Row of inspected machines at the HMV yard"
              className="aspect-[16/10] w-full rounded-xl border object-cover shadow-md"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight">
            Need Something Specific?
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Our stock moves fast and much of it sells before it&apos;s listed. Tell
            us the machine, size class and budget — we source machines weekly and
            will find yours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => onNavigate('inventory')} className="h-11 px-6">
              Browse Current Inventory
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('contact')}
              className="h-11 px-6"
            >
              Send Us a Want List
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
