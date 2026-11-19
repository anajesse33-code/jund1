import { Phone, Mail, MapPin, Clock, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LOCATIONS, NAV_ITEMS, SITE, type ViewId } from './site-data';

export function Footer({ onNavigate }: { onNavigate: (view: ViewId) => void }) {
  return (
    <footer className="mt-auto bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Wrench className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                HMV <span className="text-primary">Buy · Sell · Repair</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Heavy Machinery &amp; Vehicles. We buy used construction and heavy
              equipment in any condition, sell refurbished machines ready to work,
              and repair what keeps your fleet earning — worldwide.
            </p>
            <p className="mt-4 text-sm font-medium text-stone-300">{SITE.domain}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-stone-400 transition-colors hover:text-primary"
                  >
                    {item.label === 'Buy Ours' ? 'Buy Our Equipment' : item.label === 'Sell Yours' ? 'Sell Your Equipment' : item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">What We Handle</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-stone-400">
              <li>Excavators &amp; Dozers</li>
              <li>Wheel Loaders &amp; Backhoes</li>
              <li>Cranes &amp; Motor Graders</li>
              <li>Dump Trucks &amp; Skid Steers</li>
              <li>Full Refurbishment Service</li>
              <li>Pickup &amp; Delivery — Worldwide</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={SITE.phoneHref} className="text-stone-300 hover:text-primary">
                  {SITE.phoneDisplay} — call or text
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="break-all text-stone-300 hover:text-primary">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-stone-400">{SITE.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-stone-400">
                  Mon–Fri 9:00 AM–5:00 PM · Sat 10:00 AM–2:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Locations strip */}
        <div className="mt-12 border-t border-stone-800 pt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Serving crews and owners in
          </p>
          <p className="mt-3 text-xs leading-relaxed text-stone-400">
            {LOCATIONS.flatMap((l) => l.cities).join('  ·  ')} — and everywhere in between, worldwide.
          </p>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-stone-500 sm:flex-row lg:px-8">
          <p>© {SITE.year} {SITE.brandFull}. All rights reserved.</p>
          <p>
            Buying daily worldwide · <span className="text-stone-400">Running or not.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
