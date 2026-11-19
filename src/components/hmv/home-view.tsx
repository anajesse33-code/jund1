'use client';

import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Phone,
  ShoppingBag,
  Tag,
  Truck,
  Wrench,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EquipmentCard } from './equipment-card';
import { INVENTORY } from './inventory-data';
import {
  BRANDS,
  EQUIPMENT_TYPES_WE_BUY,
  LOCATIONS,
  SITE,
  STATS,
  WHY_US,
  type ViewId,
} from './site-data';

const FEATURED = INVENTORY.filter((item) => item.status !== 'sold').slice(0, 3);

export function HomeView({
  onNavigate,
}: {
  onNavigate: (view: ViewId) => void;
}) {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/60 to-stone-900/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start px-4 py-24 sm:py-32 lg:px-8">
          <Badge className="mb-4 bg-primary text-primary-foreground">Worldwide — Running or Not</Badge>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            We Buy, Sell &amp; Repair Heavy Machinery &amp; Vehicles
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-200">
            HMV takes idle excavators, dozers, loaders and more off your lot —
            pays fair cash, handles pickup worldwide — and sells
            fully inspected, refurbished machines that are ready to go back to work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => onNavigate('inventory')} className="h-11 px-6">
              Browse Inventory
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('sell')}
              className="h-11 border-white/40 bg-white/10 px-6 text-white hover:bg-white/20 hover:text-white"
            >
              Sell Your Equipment
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('repairs')}
              className="h-11 border-white/40 bg-transparent px-6 text-white hover:bg-white/20 hover:text-white"
            >
              Book a Repair
            </Button>
          </div>
          <a
            href={SITE.phoneHref}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-stone-300 hover:text-white"
          >
            <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
            Call for a fast quote — <span className="font-bold">{SITE.phoneDisplay}</span>
          </a>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="border-b bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-extrabold text-primary sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Three services ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Buy or Sell Equipment — One Call Does It
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Whether you need a machine off your hands or one on your job site
            next week, HMV handles the whole transaction honestly.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card className="group py-0 transition-all hover:shadow-lg">
            <CardContent className="p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <ShoppingBag className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold">Buy Our Equipment</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Inspected, refurbished machines ready for the job site. Every listing
                shows real hours, real photos and a firm price — no surprises, no
                games. Worldwide shipping arranged.
              </p>
              <Button
                variant="link"
                className="mt-4 px-0 text-primary"
                onClick={() => onNavigate('buy')}
              >
                See how we sell
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group py-0 transition-all hover:shadow-lg">
            <CardContent className="p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Tag className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold">Sell Your Equipment</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Got unused, idle machinery taking up yard space? We buy running or
                not — single machines or entire fleets — with pickup handled and
                payment on collection.
              </p>
              <Button
                variant="link"
                className="mt-4 px-0 text-primary"
                onClick={() => onNavigate('sell')}
              >
                Get your offer
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group py-0 transition-all hover:shadow-lg">
            <CardContent className="p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Wrench className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold">Repairs &amp; Refurbishing</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                From hydraulic cylinder reseals to full engine overhauls, our
                workshops put worn machines back to work. Book a service and our
                team calls you back within one business day.
              </p>
              <Button
                variant="link"
                className="mt-4 px-0 text-primary"
                onClick={() => onNavigate('repairs')}
              >
                Book a repair
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== What we buy ===== */}
      <section className="border-y bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Just a Sampling of What We Buy…
              </h2>
              <p className="mt-3 text-muted-foreground">
                If it digs, lifts, pushes, hauls or grades, we want to see it.
                Running, salvage or seized — send photos and specs and get a
                firm cash offer, usually within 48 hours.
              </p>
              <Button className="mt-6" onClick={() => onNavigate('sell')}>
                Sell Your Equipment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <ul className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Equipment types we buy">
              {EQUIPMENT_TYPES_WE_BUY.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2.5 text-sm font-medium text-foreground"
                >
                  <BadgeCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Featured inventory ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              On the Lot Right Now
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Live from our inventory. Every machine is inspected, and refurbished
              where needed, before it is listed.
            </p>
          </div>
          <Button variant="outline" onClick={() => onNavigate('inventory')}>
            View full inventory
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((item) => (
            <EquipmentCard
              key={item.id}
              item={item}
              onView={() => onNavigate('inventory')}
              onQuote={() => onNavigate('contact')}
            />
          ))}
        </div>
      </section>

      {/* ===== Workshop / pickup band ===== */}
      <section className="border-y bg-secondary">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div className="relative">
            { }
            <img
              src="/images/workshop.jpg"
              alt="HMV workshop: a mechanic servicing a large excavator"
              className="aspect-[16/10] w-full rounded-xl border object-cover shadow-md"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              We&apos;ll Pick It Up — Or Deliver It to You
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Our haulers and freight partners run routes across every region we
              serve. When we buy from you, loading and transport are on us. When you buy
              from us, your machine arrives inspected, serviced and work-ready —
              with delivery arranged to your gate or your job site.
            </p>
            <ul className="mt-6 space-y-3">
              {SITE.hours.map((h) => (
                <li key={h.days} className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="font-medium text-foreground">{h.days}:</span>
                  <span className="text-muted-foreground">{h.time}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-7" onClick={() => onNavigate('contact')}>
              <Truck className="h-4 w-4" aria-hidden="true" />
              Arrange Pickup or Delivery
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Why us ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Why Owners and Crews Deal With HMV
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            No brokers, no listing fees, no &quot;marketplace mystery buyers.&quot;
            Just a dealer that picks up the phone.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US.map((w) => (
            <Card key={w.title} className="py-0">
              <CardContent className="p-6">
                <h3 className="flex items-center gap-2 font-bold text-foreground">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  {w.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {w.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== Brands ===== */}
      <section className="border-y bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            We Have Experience With Manufacturers Like…
          </h2>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3" aria-label="Brands we work with">
            {BRANDS.map((b) => (
              <li key={b} className="text-lg font-bold text-foreground/70 transition-colors hover:text-primary">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Locations ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Buying &amp; Selling Worldwide
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Global logistics matter when it comes to hauling, customs and titles.
          We work through partner yards, ports and haulers in every region
          below — and we arrange transport anywhere in between.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LOCATIONS.map((region) => (
            <Card key={region.region} className="py-0">
              <CardContent className="p-5">
                <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
                  {region.region}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {region.cities.map((city) => (
                    <li key={city}>{city}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="bg-primary">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center lg:px-8">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
            Got Unused, Idle Equipment?
          </h2>
          <p className="max-w-2xl text-primary-foreground/90">
            Excavators, dozers, backhoes, cranes, graders, dump trucks — running
            or not. One call gets you a firm offer and a pickup date.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" variant="outline" asChild className="h-11 border-white/40 bg-transparent px-6 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
              <a href={SITE.phoneHref}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {SITE.phoneDisplay}
              </a>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onNavigate('contact')}
              className="h-11 px-6"
            >
              Send Us the Details
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
