'use client';

import { useState } from 'react';
import { Phone, Menu, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, SITE, type ViewId } from './site-data';

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      aria-label="HMV home"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <Wrench className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-extrabold tracking-tight text-foreground">
          HMV <span className="text-primary">Buy · Sell · Repair</span>
        </span>
        <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Heavy Machinery &amp; Vehicles
        </span>
      </span>
    </button>
  );
}

export function Header({
  current,
  onNavigate,
}: {
  current: ViewId;
  onNavigate: (view: ViewId) => void;
}) {
  const [open, setOpen] = useState(false);

  const go = (view: ViewId) => {
    setOpen(false);
    onNavigate(view);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Top utility bar */}
      <div className="hidden md:block border-b border-border/60 bg-secondary">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-muted-foreground lg:px-8">
          <p>
            Buying &amp; selling used heavy equipment{' '}
            <span className="font-medium text-foreground">Worldwide</span>
          </p>
          <p>
            Mon–Fri 9–5 · Sat 10–2 ·{' '}
            <a href={`mailto:${SITE.email}`} className="font-medium text-primary hover:underline">
              {SITE.email}
            </a>
          </p>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
        <Logo onClick={() => go('home')} />

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => go(item.id)}
              className={cn(
                'h-9 rounded-md px-3 text-sm font-medium',
                current === item.id
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <a href={SITE.phoneHref} className="gap-2">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
          </Button>

          {/* Mobile nav */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 px-4">
              <SheetHeader>
                <SheetTitle className="text-left text-base">
                  HMV <span className="text-primary">Buy · Sell · Repair</span>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-2">
                {NAV_ITEMS.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => go(item.id)}
                    className={cn(
                      'justify-start text-sm',
                      current === item.id
                        ? 'bg-accent text-accent-foreground font-semibold'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>
              <div className="mt-2 px-2">
                <Button asChild className="w-full">
                  <a href={SITE.phoneHref} className="gap-2">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call {SITE.phoneDisplay}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
