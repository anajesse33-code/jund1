'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2, Phone, RotateCcw, Send, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { buildMailto, submitForm } from '@/lib/forms';
import { REPAIR_SERVICES, SITE } from './site-data';

type FormState = {
  name: string;
  phone: string;
  email: string;
  equipmentType: string;
  brandModel: string;
  issue: string;
  preferredDate: string;
};

const EMPTY: FormState = {
  name: '',
  phone: '',
  email: '',
  equipmentType: '',
  brandModel: '',
  issue: '',
  preferredDate: '',
};

export function RepairsView() {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY);
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
      const mailto = buildMailto(SITE.email, '[Website] Repair request', [
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        form.email ? `Email: ${form.email}` : '',
        `Equipment: ${form.equipmentType}`,
        form.brandModel ? `Make & model: ${form.brandModel}` : '',
        form.preferredDate ? `Preferred date: ${form.preferredDate}` : '',
        '',
        form.issue,
      ]);

      const result = await submitForm('/api/repairs', form, mailto);

      if (result.ok) {
        setSuccess({ id: result.id, viaEmail: false });
        toast({
          title: 'Repair request received',
          description: 'Our service team will call you back within 1 business day.',
        });
      } else if (result.fallback) {
        setSuccess({ viaEmail: true });
        toast({
          title: 'Email draft ready',
          description: 'Press Send in your email app to deliver your request.',
        });
        window.location.href = result.mailto;
      } else {
        throw new Error(result.error);
      }

      setForm(EMPTY);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(msg);
      toast({ title: 'Could not submit', description: msg, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="border-b bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <Badge variant="outline" className="mb-3 border-primary/40 text-primary">
            Repairs &amp; Refurbishing
          </Badge>
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            We Fix What Broke — And Rebuild What Wore Out
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            The same workshops that refurbish our own inventory also take in repair
            jobs. Engine overhauls, hydraulic work, undercarriage, electrics,
            welding — for every major brand. Tell us what&apos;s wrong and our
            service team will call you back within one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          Workshop Services
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REPAIR_SERVICES.map((s) => (
            <Card key={s.title} className="py-0">
              <CardContent className="p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Wrench className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-secondary">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8">
          <div className="relative order-2 lg:order-1">
            { }
            <img
              src="/images/workshop.jpg"
              alt="HMV technician refurbishing a large excavator"
              className="aspect-[16/10] w-full rounded-xl border object-cover shadow-md"
              loading="lazy"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Broken Down on the Job?
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Call us first. Quick diagnostic questions over the phone often save a
              service call entirely — and when your machine does need the shop,
              we&apos;ll tell you honestly what it needs, what it will cost, and
              when you&apos;ll get it back. Customers worldwide can arrange
              transport to our shop or ask about field service availability.
            </p>
            <Button size="lg" asChild className="mt-6 h-11 px-6">
              <a href={SITE.phoneHref}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call the Service Line — {SITE.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20" id="booking">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            Book a Repair
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Fields marked * are required. Everything else helps us quote faster.
          </p>

          {success ? (
            <Card className="mt-8 border-primary/40">
              <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden="true" />
                <h3 className="text-xl font-bold">
                  {success.viaEmail ? 'One Last Step' : 'Request Received'}
                </h3>
                {success.viaEmail ? (
                  <p className="max-w-md text-sm text-muted-foreground">
                    Your email app should have opened with your repair request filled in.
                    Press <span className="font-semibold text-foreground">Send</span> there
                    to deliver it — or email us at{' '}
                    <a href={`mailto:${SITE.email}`} className="font-medium text-primary hover:underline">
                      {SITE.email}
                    </a>
                    .
                  </p>
                ) : (
                  <p className="max-w-md text-sm text-muted-foreground">
                    Thanks — your repair request is in our queue with reference{' '}
                    <span className="font-mono font-semibold text-foreground">
                      {(success.id ?? '').slice(-8).toUpperCase()}
                    </span>.
                    Our service team will call you back within one business day.
                  </p>
                )}
                <Button
                  variant="outline"
                  onClick={() => setSuccess(null)}
                  className="mt-2"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Submit another request
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="mt-8 py-0">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="r-name">Your name *</Label>
                      <Input
                        id="r-name"
                        value={form.name}
                        onChange={(e) => set('name')(e.target.value)}
                        placeholder="John Miller"
                        required
                        maxLength={120}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="r-phone">Phone *</Label>
                      <Input
                        id="r-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => set('phone')(e.target.value)}
                        placeholder="(555) 555-0100"
                        required
                        maxLength={40}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="r-email">Email (optional)</Label>
                      <Input
                        id="r-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set('email')(e.target.value)}
                        placeholder="you@company.com"
                        maxLength={160}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="r-date">Preferred service date (optional)</Label>
                      <Input
                        id="r-date"
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) => set('preferredDate')(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="r-type">Equipment type *</Label>
                      <Input
                        id="r-type"
                        value={form.equipmentType}
                        onChange={(e) => set('equipmentType')(e.target.value)}
                        placeholder="e.g. Excavator, backhoe, skid steer"
                        required
                        maxLength={120}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="r-brand">Make &amp; model (optional)</Label>
                      <Input
                        id="r-brand"
                        value={form.brandModel}
                        onChange={(e) => set('brandModel')(e.target.value)}
                        placeholder="e.g. CAT 320, JCB 3CX"
                        maxLength={160}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="r-issue">What&apos;s wrong / what work do you need? *</Label>
                    <Textarea
                      id="r-issue"
                      value={form.issue}
                      onChange={(e) => set('issue')(e.target.value)}
                      placeholder="Describe the symptoms or work needed — sounds, leaks, warning codes, hours since last service, and what the machine is used for."
                      rows={5}
                      required
                      maxLength={2000}
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
                        Submit Repair Request
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
