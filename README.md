# HMV — Buy, Sell & Repairs

Marketing site for **HMV Buy, Sell & Repairs** (heavy machinery & vehicles).
Built with Next.js (App Router), Tailwind CSS v4 and shadcn/ui, and exported as a
**fully static site** so it can be hosted for free on Cloudflare Pages.

- Single-page app with hash routing (`/#inventory`, `/#sell`, `/#repairs`, …)
- Inventory is bundled as static data — no database, no server runtime
- Contact and repair forms post to Cloudflare Pages Functions
  (`/api/contact`, `/api/repairs`) with a `mailto:` fallback

---

## Requirements

- Node.js **20.9+** (22 LTS recommended)
- A GitHub account
- A Cloudflare account

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

The static site is written to `out/`. You can serve it with any static file
server, or preview it locally with Cloudflare Pages Functions:

```bash
npm run preview   # npx wrangler pages dev out
```

> `next dev` does **not** run Cloudflare Pages Functions. When a form is
> submitted locally it falls back to opening your email app — that is expected.

---

## Deploy to Cloudflare Pages

### 1. Push this folder to GitHub

This folder is already a Git repository with an initial commit. Create an **empty**
repository on GitHub (no README, no .gitignore), then run:

```bash
git remote add origin https://github.com/<your-user>/<your-repo>.git
git branch -M main
git push -u origin main
```

### 2. Connect it to Cloudflare Pages

1. In the Cloudflare dashboard go to **Workers & Pages → Create → Pages → Connect to Git**.
2. Pick the repository you just pushed.
3. Use these build settings:

   | Setting              | Value           |
   | -------------------- | --------------- |
   | Framework preset     | None            |
   | Build command        | `npm run build` |
   | Build output directory | `out`         |
   | Node version         | `22` (env var `NODE_VERSION=22`) |

4. Click **Save and Deploy**. Every push to `main` redeploys automatically.

The `functions/` folder at the repo root is picked up automatically by Pages,
so `/api/contact` and `/api/repairs` work alongside the static site.

### 3. Custom domain

In the Pages project: **Custom domains → Set up a custom domain**, then add
`hmvbuysellandrepairs.com` (and `www`). If the domain's DNS is already on
Cloudflare, the CNAME is created for you.

---

## Make the forms deliver email

Out of the box, a form submission opens the visitor's email app with a
prefilled draft (nothing is silently lost). To receive submissions directly,
set **one** of these options under
**Pages project → Settings → Environment variables** (Production and Preview):

### Option A — Resend (recommended, free tier)

1. Create an account at https://resend.com and verify your domain.
2. Create an API key.
3. Add these variables:

   | Variable         | Example                                        |
   | ---------------- | ---------------------------------------------- |
   | `RESEND_API_KEY` | `re_xxxxxxxxx`                                 |
   | `MAIL_TO`        | `info@hmvbuysellandrepairs.com`                |
   | `MAIL_FROM`      | `HMV Website <website@hmvbuysellandrepairs.com>` |

Redeploy after adding them. Until your domain is verified you can test with
`MAIL_FROM="HMV Website <onboarding@resend.dev>"` — Resend only allows that
sender to deliver to the Resend account owner's address.

### Option B — Webhook

Set `FORM_WEBHOOK_URL` to any endpoint that accepts a JSON `POST`
(Zapier, Make, n8n, a Google Apps Script, etc.). The payload includes an `id`,
a `type` (`contact` or `repair`) and the form fields.

---

## Editing content

| What                                | File                                        |
| ----------------------------------- | ------------------------------------------- |
| Phone, email, address, hours, domain | `src/components/hmv/site-data.ts`          |
| Inventory listings                  | `src/components/hmv/inventory-data.ts`      |
| Home page                           | `src/components/hmv/home-view.tsx`          |
| Buy / Sell / Repairs / About pages  | `src/components/hmv/*-view.tsx`             |
| Theme colours, fonts                | `src/app/globals.css`                       |
| Images                              | `public/images/`                            |
| Page title / meta description       | `src/app/layout.tsx`                        |

To add a machine, copy an object in `inventory-data.ts`, give it a unique `id`,
and set `featured: true` if it should appear on the home page first.
Mark it `status: 'sold'` when it sells — it stays visible with a “Sold” badge.

## Project structure

```
src/app/                 Next.js App Router entry (layout + single page)
src/components/hmv/      Site sections, header/footer and site content
src/components/ui/       shadcn/ui primitives used by the site
src/lib/forms.ts         Client-side form helper (POST + mailto fallback)
functions/api/           Cloudflare Pages Functions (form delivery)
public/                  Images, favicon, robots.txt, _headers
wrangler.toml            Pages project config for local preview/deploy
```

## Notes

- The build is static: no Prisma, database, API routes or Node server is needed.
- `next.config.ts` uses `output: "export"`; do not add server-only APIs unless
  you move them into `functions/`.
- The site is a single page with hash links, so no SPA rewrite rules are needed.
