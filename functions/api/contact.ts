/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Delivery options (set in the Cloudflare Pages project, Settings → Environment variables):
 *   1. RESEND_API_KEY + MAIL_TO  → sends an email through Resend
 *   2. FORM_WEBHOOK_URL          → POSTs the JSON payload to any webhook (Zapier, Make, etc.)
 *
 * With neither configured it returns 501, and the browser falls back to opening
 * the visitor's email app with a prefilled message.
 */

type Env = {
  RESEND_API_KEY?: string;
  MAIL_TO?: string;
  MAIL_FROM?: string;
  FORM_WEBHOOK_URL?: string;
};

type Context = { request: Request; env: Env };

const CONTACT_EMAIL = "info@hmvbuysellandrepairs.com";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

const clean = (value: unknown, max = 500) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] as string
  );

function toHtml(fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top">${escapeHtml(
          label
        )}</td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    )
    .join("");
  return `<div style="font-family:system-ui,sans-serif;font-size:14px"><h2 style="margin:0 0 12px">New website message</h2><table>${rows}</table></div>`;
}

export async function onRequestPost({ request, env }: Context) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const subject = clean(body.subject, 160) || "General Inquiry";
  const message = clean(body.message, 3000);

  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!email) missing.push("email");
  if (!message) missing.push("message");
  if (missing.length > 0) {
    return json({ error: `Missing required fields: ${missing.join(", ")}` }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Please enter a valid email address" }, 400);
  }

  const id = crypto.randomUUID();
  const fields = { Name: name, Email: email, Phone: phone, Subject: subject, Message: message };

  if (env.FORM_WEBHOOK_URL) {
    try {
      const res = await fetch(env.FORM_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, type: "contact", ...fields }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (error) {
      console.error("Contact webhook error:", error);
      return json({ error: `Could not deliver your message. Please email ${CONTACT_EMAIL}.` }, 502);
    }
    return json({
      ok: true,
      id,
      message: "Message sent. Our team will get back to you within 1 business day.",
    });
  }

  if (env.RESEND_API_KEY && env.MAIL_TO) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${env.RESEND_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: env.MAIL_FROM || "HMV Website <onboarding@resend.dev>",
          to: [env.MAIL_TO],
          reply_to: email,
          subject: `[Website] ${subject}`,
          html: toHtml(fields),
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    } catch (error) {
      console.error("Contact email error:", error);
      return json({ error: `Could not deliver your message. Please email ${CONTACT_EMAIL}.` }, 502);
    }
    return json({
      ok: true,
      id,
      message: "Message sent. Our team will get back to you within 1 business day.",
    });
  }

  return json(
    {
      error: "Form delivery is not configured yet.",
      hint: "Set RESEND_API_KEY and MAIL_TO, or FORM_WEBHOOK_URL, in your Cloudflare Pages environment variables.",
    },
    501
  );
}
