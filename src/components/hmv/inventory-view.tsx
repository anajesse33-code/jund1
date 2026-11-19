'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw, PackageSearch } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  EquipmentCard,
  formatHours,
  type EquipmentItem,
} from './equipment-card';
import { EQUIPMENT_CATEGORIES } from './site-data';
import { INVENTORY } from './inventory-data';

export function InventoryView({
  onNavigateToContact,
}: {
  onNavigateToContact: () => void;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [detail, setDetail] = useState<EquipmentItem | null>(null);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INVENTORY.filter((item) => {
      if (category !== 'All' && item.category !== category) return false;
      if (status !== 'All' && item.status !== status) return false;
      if (!q) return true;
      return [item.name, item.brand, item.model, item.category].some((value) =>
        value.toLowerCase().includes(q)
      );
    });
  }, [query, category, status]);

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setStatus('All');
  };

  const hasFilters = query || category !== 'All' || status !== 'All';

  return (
    <>
      <section className="border-b bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <Badge variant="outline" className="mb-3 border-primary/40 text-primary">
            Current Inventory
          </Badge>
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            A Working Sampling of What We Have
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Machines are bought and sold here every day, so treat this as a snapshot.
            Search and filter below — and if you don&apos;t see what you need, call us:
            much of our stock never makes it to the website before it&apos;s gone.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Filters */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, brand or model…"
              className="pl-9"
              aria-label="Search inventory"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="status-filter" className="text-sm text-muted-foreground">
              Status:
            </label>
            <select
              id="status-filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="All">All</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {EQUIPMENT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                category === cat
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          {`${items.length} machine${items.length === 1 ? '' : 's'} found`}
        </p>

        {/* Grid */}
        <div className="mt-4">
          {items.length === 0 ? (
            <Card className="mt-2">
              <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
                <PackageSearch className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
                <p className="font-medium">No machines match your filters.</p>
                <p className="max-w-md text-sm text-muted-foreground">
                  New stock arrives weekly and much of it sells before it&apos;s listed.
                  Call us with what you need — odds are it&apos;s in the yard or on the way.
                </p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={resetFilters}>
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Clear filters
                  </Button>
                  <Button size="sm" onClick={onNavigateToContact}>
                    Ask about availability
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <EquipmentCard
                  key={item.id}
                  item={item}
                  onView={setDetail}
                  onQuote={() => onNavigateToContact()}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail dialog */}
      <Dialog open={detail !== null} onOpenChange={(open) => !open && setDetail(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          {detail && (
            <>
              <DialogHeader>
                <DialogDescription className="text-xs font-medium uppercase tracking-wide">
                  {detail.category} · {detail.location}
                </DialogDescription>
                <DialogTitle className="text-left text-xl">{detail.name}</DialogTitle>
              </DialogHeader>
              <img
                src={detail.image}
                alt={detail.name}
                className="aspect-[16/9] w-full rounded-lg border object-cover"
              />
              <p className="text-sm leading-relaxed text-muted-foreground">
                {detail.description}
              </p>
              <Separator />
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
                {[
                  ['Brand', detail.brand],
                  ['Model', detail.model],
                  ['Year', String(detail.year)],
                  ['Hours', formatHours(detail.hours)],
                  ['Condition', detail.condition],
                  ['Status', detail.status === 'sold' ? 'Sold' : 'Available'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
                    <dd className="mt-0.5 font-medium text-foreground">{value}</dd>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                  Pricing on request — ask us about current
                  availability and financing options.
                </span>
                <Button onClick={onNavigateToContact} disabled={detail.status === 'sold'}>
                  {detail.status === 'sold' ? 'This machine is sold' : 'Request a Quote'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
