'use client'

import { useCallback, useEffect, useState } from 'react';
import { Header } from '@/components/hmv/header';
import { Footer } from '@/components/hmv/footer';
import { HomeView } from '@/components/hmv/home-view';
import { InventoryView } from '@/components/hmv/inventory-view';
import { BuyView } from '@/components/hmv/buy-view';
import { SellView } from '@/components/hmv/sell-view';
import { RepairsView } from '@/components/hmv/repairs-view';
import { AboutView } from '@/components/hmv/about-view';
import { ContactView } from '@/components/hmv/contact-view';
import { NAV_ITEMS, type ViewId } from '@/components/hmv/site-data';

const VALID_VIEWS = NAV_ITEMS.map((i) => i.id);

function viewFromHash(): ViewId {
  const hash = window.location.hash.replace('#', '');
  return VALID_VIEWS.includes(hash as ViewId) ? (hash as ViewId) : 'home';
}

export default function Page() {
  const [view, setView] = useState<ViewId>('home');
  const [prefillSubject, setPrefillSubject] = useState<string | undefined>(undefined);

  // Sync view with URL hash (supports deep links like #inventory)
  useEffect(() => {
    const onHash = () => setView(viewFromHash());
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Keep the document title in sync with the active view
  useEffect(() => {
    const label = NAV_ITEMS.find((i) => i.id === view)?.label ?? 'Home';
    document.title = `${label} | HMV Buy, Sell & Repairs — Heavy Machinery & Vehicles`;
  }, [view]);

  const navigate = useCallback(
    (next: ViewId) => {
      if (next !== 'contact') setPrefillSubject(undefined);
      if (next === view) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setPrefillSubject((prefill) => (next === 'contact' ? prefill : undefined));
      window.location.hash = next;
    },
    [view]
  );

  // Scroll to top when the view changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  const goBuyContact = useCallback(() => {
    setPrefillSubject('I Want to Buy Equipment');
    window.location.hash = 'contact';
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header current={view} onNavigate={navigate} />

      <main className="flex-1">
        {view === 'home' && <HomeView onNavigate={navigate} />}
        {view === 'inventory' && (
          <InventoryView onNavigateToContact={goBuyContact} />
        )}
        {view === 'buy' && <BuyView onNavigate={navigate} />}
        {view === 'sell' && <SellView onNavigate={navigate} />}
        {view === 'repairs' && <RepairsView />}
        {view === 'about' && <AboutView onNavigate={navigate} />}
        {view === 'contact' && <ContactView prefillSubject={prefillSubject} />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
