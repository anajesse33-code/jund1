/**
 * Cloudflare Pages Function — POST /api/repairs
 *
 * Same delivery options as /api/contact:
 *   RESEND_API_KEY + MAIL_TO  → email through Resend
 *   FORM_WEBHOOK_URL          → POST JSON to any webhook
 *
 * Without either, returns 501 so the browser can fall back to a mailto draft.
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
  return `<div style="font-family:system-ui,sans-serif;font-size:14px"><h2 style="margin:0 0 12px">New repair request</h2><table>${rows}</table></div>`;
}

export async function onRequestPost({ request, env }: Context) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  const equipmentType = clean(body.equipmentType, 120);
  const brandModel = clean(body.brandModel, 160);
  const issue = clean(body.issue, 2000);
  const preferredDate = clean(body.preferredDate, 40);

  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!phone) missing.push("phone");
  if (!equipmentType) missing.push("equipmentType");
  if (!issue) missing.push("issue");
  if (missing.length > 0) {
    return json({ error: `Missing required fields: ${missing.join(", ")}` }, 400);
  }

  const id = crypto.randomUUID();
  const fields = {
    Name: name,
    Phone: phone,
    Email: email,
    Equipment: equipmentType,
    "Make & model": brandModel,
    "Preferred date": preferredDate,
    Issue: issue,
  };

  if (env.FORM_WEBHOOK_URL) {
    try {
      const res = await fetch(env.FORM_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, type: "repair", ...fields }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (error) {
      console.error("Repair webhook error:", error);
      return json({ error: `Could not submit your request. Please email ${CONTACT_EMAIL}.` }, 502);
    }
    return json({
      ok: true,
      id,
      message: "Repair request received. Our service team will call you back within 1 business day.",
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
          reply_to: email || undefined,
          subject: `[Repair Request] ${equipmentType} — ${name}`,
          html: toHtml(fields),
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    } catch (error) {
      console.error("Repair email error:", error);
      return json({ error: `Could not submit your request. Please email ${CONTACT_EMAIL}.` }, 502);
    }
    return json({
      ok: true,
      id,
      message: "Repair request received. Our service team will call you back within 1 business day.",
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
