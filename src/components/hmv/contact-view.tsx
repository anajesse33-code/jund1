'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Send,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { buildMailto, submitForm } from '@/lib/forms';
import { LOCATIONS, SITE } from './site-data';

const SUBJECTS = [
  'General Inquiry',
  'I Want to Sell Equipment',
  'I Want to Buy Equipment',
  'Repair / Service Question',
  'Pickup or Delivery',
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: 'General Inquiry',
  message: '',
};

export function ContactView({ prefillSubject }: { prefillSubject?: string }) {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>({
    ...EMPTY,
    subject: prefillSubject ?? 'General Inquiry',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ id?: string; viaEmail: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const mailto = buildMailto(SITE.email, `[Website] ${form.subject}`, [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.phone ? `Phone: ${form.phone}` : '',
        `Subject: ${form.subject}`,
        '',
        form.message,
      ]);

      const result = await submitForm('/api/contact', form, mailto);

      if (result.ok) {
        setSuccess({ id: result.id, viaEmail: false });
        toast({
          title: 'Message sent',
          description: 'Our team will get back to you within 1 business day.',
        });
      } else if (result.fallback) {
        setSuccess({ viaEmail: true });
        toast({
          title: 'Email draft ready',
          description: 'Press Send in your email app to deliver your message.',
        });
        window.location.href = result.mailto;
      } else {
        throw new Error(result.error);
      }

      setForm({ ...EMPTY, subject: prefillSubject ?? 'General Inquiry' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(msg);
      toast({ title: 'Could not send', description: msg, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="border-b bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <Badge variant="outline" className="mb-3 border-primary/40 text-primary">
            Contact
          </Badge>
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Talk to a Real Person
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Call or text anytime during business hours, or send the form below and
            we&apos;ll get back to you within one business day. Selling equipment?
            Include the make, model, year, hours and a few photos if you can —
            we&apos;ll price it faster.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        {/* Contact cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="py-0">
            <CardContent className="p-6">
              <Phone className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-bold">Call or Text</h3>
              <a
                href={SITE.phoneHref}
                className="mt-1 block text-sm font-medium text-primary hover:underline"
              >
                {SITE.phoneDisplay}
              </a>
              <p className="mt-1 text-xs text-muted-foreground">Fastest for quotes &amp; pickup</p>
            </CardContent>
          </Card>
          <Card className="py-0">
            <CardContent className="p-6">
              <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-bold">Email</h3>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1 block break-all text-sm font-medium text-primary hover:underline"
              >
                {SITE.email}
              </a>
              <p className="mt-1 text-xs text-muted-foreground">Include photos with your message</p>
            </CardContent>
          </Card>
          <Card className="py-0">
            <CardContent className="p-6">
              <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-bold">Main Yard &amp; Shop</h3>
              <p className="mt-1 text-sm text-muted-foreground">{SITE.address}</p>
            </CardContent>
          </Card>
          <Card className="py-0">
            <CardContent className="p-6">
              <Clock className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-bold">Hours</h3>
              <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                {SITE.hours.map((h) => (
                  <li key={h.days}>
                    {h.days}: <span className="text-foreground">{h.time}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            Send Us a Message
          </h2>
          {success ? (
            <Card className="mt-8 border-primary/40">
              <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden="true" />
                <h3 className="text-xl font-bold">
                  {success.viaEmail ? 'One Last Step' : 'Message Sent'}
                </h3>
                {success.viaEmail ? (
                  <p className="max-w-md text-sm text-muted-foreground">
                    Your email app should have opened with your message already filled in.
                    Press <span className="font-semibold text-foreground">Send</span> there
                    to deliver it — or email us directly at{' '}
                    <a href={`mailto:${SITE.email}`} className="font-medium text-primary hover:underline">
                      {SITE.email}
                    </a>
                    .
                  </p>
                ) : (
                  <p className="max-w-md text-sm text-muted-foreground">
                    Thanks — we&apos;ve logged your message with reference{' '}
                    <span className="font-mono font-semibold text-foreground">
                      {(success.id ?? '').slice(-8).toUpperCase()}
                    </span>{' '}
                    and will reply within one business day.
                  </p>
                )}
                <Button variant="outline" onClick={() => setSuccess(null)} className="mt-2">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Send another message
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="mt-8 py-0">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="c-name">Name *</Label>
                      <Input
                        id="c-name"
                        value={form.name}
                        onChange={(e) => set('name')(e.target.value)}
                        placeholder="John Miller"
                        required
                        maxLength={120}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="c-email">Email *</Label>
                      <Input
                        id="c-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set('email')(e.target.value)}
                        placeholder="you@company.com"
                        required
                        maxLength={160}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="c-phone">Phone (optional)</Label>
                      <Input
                        id="c-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => set('phone')(e.target.value)}
                        placeholder="(555) 555-0100"
                        maxLength={40}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="c-subject">What&apos;s this about?</Label>
                      <select
                        id="c-subject"
                        value={form.subject}
                        onChange={(e) => set('subject')(e.target.value)}
                        className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="c-message">Message *</Label>
                    <Textarea
                      id="c-message"
                      value={form.message}
                      onChange={(e) => set('message')(e.target.value)}
                      placeholder="Tell us about the equipment or the work you need — make, model, year, hours, condition, and where it's located."
                      rows={6}
                      required
                      maxLength={3000}
                    />
                  </div>

                  {error && (
                    <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      {error}
                    </p>
                  )}

                  <Button type="submit" size="lg" disabled={submitting} className="h-11">
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Service area */}
      <section className="border-t bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Where We Work
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            We buy, deliver and refurbish worldwide through our
            partner yards, ports and haulers. If your equipment is somewhere in between,
            it&apos;s still in range — just ask.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LOCATIONS.map((region) => (
              <Card key={region.region} className="py-0 bg-background">
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
        </div>
      </section>
    </>
  );
}
