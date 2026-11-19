'use client';

import { MapPin, Calendar, Gauge, PhoneCall } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type EquipmentItem = {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  year: number;
  hours: number;
  price: number;
  condition: string;
  location: string;
  description: string;
  image: string;
  featured: boolean;
  status: string;
  createdAt: string;
};

export function formatHours(hours: number): string {
  return `${new Intl.NumberFormat('en-US').format(hours)} hrs`;
}

export function EquipmentCard({
  item,
  onView,
  onQuote,
}: {
  item: EquipmentItem;
  onView: (item: EquipmentItem) => void;
  onQuote: (item: EquipmentItem) => void;
}) {
  const sold = item.status === 'sold';

  return (
    <Card
      className={cn(
        'group overflow-hidden py-0 transition-all hover:shadow-lg',
        sold && 'opacity-95'
      )}
    >
      <div className="relative overflow-hidden">
        <button
          onClick={() => onView(item)}
          className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`View details of ${item.name}`}
        >
          { }
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </button>
        {item.featured && !sold && (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground shadow">
            Featured
          </Badge>
        )}
        {sold && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-900/55">
            <span className="rounded-md border-2 border-white bg-stone-900/70 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-white">
              Sold
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="font-medium uppercase tracking-wide">{item.category}</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {item.location}
          </span>
        </div>

        <h3 className="mt-1.5 text-base font-semibold leading-snug text-foreground">
          {item.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {item.year}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
            {formatHours(item.hours)}
          </span>
          <span
            className={cn(
              'font-medium',
              item.condition === 'Refurbished' ? 'text-primary' : 'text-foreground'
            )}
          >
            {item.condition}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <PhoneCall className="h-4 w-4 text-primary" aria-hidden="true" />
            Pricing on request
          </span>
          <Button
            size="sm"
            onClick={() => onQuote(item)}
            disabled={sold}
            className="text-xs"
          >
            Request Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
