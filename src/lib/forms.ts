/**
 * Form submission helper.
 *
 * The site posts to Cloudflare Pages Functions at /api/contact and /api/repairs.
 * When a project has no delivery configured yet (no RESEND_API_KEY or
 * FORM_WEBHOOK_URL env vars), the function replies 501 and we fall back to
 * opening the visitor's email client with a prefilled draft — no message is
 * ever silently dropped.
 */

export type SubmitResult =
  | { ok: true; id: string }
  | { ok: false; fallback: true; mailto: string }
  | { ok: false; fallback: false; error: string };

export function buildMailto(to: string, subject: string, lines: string[]): string {
  const body = lines.filter(Boolean).join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitForm(
  endpoint: string,
  payload: Record<string, string>,
  fallbackMailto: string
): Promise<SubmitResult> {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      return { ok: true, id: typeof data.id === 'string' ? data.id : 'local' };
    }

    // Not configured yet (or running `next dev`, where Pages Functions do not
    // exist) — hand the message to the visitor's email app instead.
    if (res.status === 501 || res.status === 404) {
      return { ok: false, fallback: true, mailto: fallbackMailto };
    }

    return {
      ok: false,
      fallback: false,
      error:
        typeof data.error === 'string'
          ? data.error
          : 'Something went wrong. Please try again.',
    };
  } catch {
    return { ok: false, fallback: true, mailto: fallbackMailto };
  }
}
