'use client';

import { ArrowRight, Camera, DollarSign, FileText, Phone, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EQUIPMENT_TYPES_WE_BUY, SITE, type ViewId } from './site-data';

const STEPS = [
  {
    icon: Camera,
    title: '1. Send Photos & Specs',
    description:
      'Snap a few photos of your machine and tell us the make, model, year, hours and what does or doesn\'t work. A two-minute form or one phone call is all it takes.',
  },
  {
    icon: FileText,
    title: '2. Get a Firm Cash Offer',
    description:
      'Our buyers price it against live market comps and come back with a firm number — usually within 48 hours. No "we\'ll call you back" runaround.',
  },
  {
    icon: Truck,
    title: '3. We Pick Up & You Get Paid',
    description:
      'Accept the offer and we schedule pickup at your convenience. Our hauler loads it, paperwork is handled on the spot, and payment is released on collection.',
  },
];

const OFFER_FACTORS = [
  ['Age & model year', 'Newer machines command stronger offers, but older iron still has real value.'],
  ['Working hours', 'Lower-hour machines price higher; high hours don\'t automatically mean low offers.'],
  ['Condition', 'Running and complete machines earn the most — but we still buy salvage and seized units.'],
  ['Attachments', 'Buckets, hammers, rippers and forks add real money to the offer.'],
  ['Location', 'We arrange hauling everywhere we serve; remote sites may factor into the math.'],
];

export function SellView({ onNavigate }: { onNavigate: (view: ViewId) => void }) {
  return (
    <>
      <section className="border-b bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <Badge variant="outline" className="mb-3 border-primary/40 text-primary">
            Sell Yours
          </Badge>
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Turn Idle Equipment Into Cash — Running or Not
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Every week a machine sits unused, it loses value and costs you storage
            and insurance. HMV buys used construction and heavy equipment
            worldwide — single machines or entire fleets — and we handle
            everything after the handshake.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          How Selling Works
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <Card key={step.title} className="py-0">
              <CardContent className="p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              What Goes Into Your Offer
            </h2>
            <p className="mt-3 text-muted-foreground">
              We price honestly against real market comps — the same way we
              evaluate machines for our own yard. Here&apos;s what moves the number:
            </p>
            <ul className="mt-6 space-y-4">
              {OFFER_FACTORS.map(([title, desc]) => (
                <li key={title} className="flex gap-3">
                  <DollarSign className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">{title}: </span>
                    <span className="text-muted-foreground">{desc}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Equipment We Buy Every Week
            </h2>
            <p className="mt-3 text-muted-foreground">
              From skid steers to 100-ton cranes. If it works outdoors, chances are
              we have a buyer for it or a spot for it in our own yard.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {EQUIPMENT_TYPES_WE_BUY.map((t) => (
                <li
                  key={t}
                  className="rounded-lg border bg-background px-3 py-2.5 text-sm font-medium text-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Don&apos;t see yours? Call anyway — this list is a sampling, not a limit.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center gap-6 rounded-xl border bg-background p-10 text-center shadow-sm">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight">
            Ready to Get a Number?
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Call us or send the details through the contact form. Photos help us
            price faster — include the data plate if you can.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild className="h-11 px-6">
              <a href={SITE.phoneHref}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {SITE.phoneDisplay}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('contact')}
              className="h-11 px-6"
            >
              Send Photos &amp; Specs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
