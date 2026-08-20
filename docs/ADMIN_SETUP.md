# Admin Lead Dashboard — Setup

Two things need to exist before `/admin/leads` works: a database (to store
leads) and a password (to keep it private). Neither exists yet — the code
is in place, but it needs these two real things from you before it goes
live. Until then, `/api/leads` will return an error rather than pretend to
work.

## 1. Create the database (Vercel KV) — ~2 minutes

1. Open your project on vercel.com → **Storage** tab.
2. Click **Create Database** → choose **KV** (this is Upstash Redis under
   the hood — free tier is enough for thousands of leads).
3. Name it anything (e.g. `swami-leads`), create it.
4. On the "Connect to Project" step, connect it to this project
   (`swami-enterprises-website`) for the **Production** environment.
5. Vercel automatically adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` as
   environment variables on the project — you don't type these in
   yourself.

## 2. Set the dashboard password — ~1 minute

1. **Project → Settings → Environment Variables.**
2. Add a new variable:
   - Name: `ADMIN_DASHBOARD_PASSWORD`
   - Value: a real password you choose (not "password123" — this is the
     only thing standing between the public internet and your customer
     list).
   - Environment: Production.
3. Save, then redeploy (Vercel → Deployments → ⋮ on the latest → Redeploy)
   so the function picks up the new env var.

## 3. Use it

Go to `https://swamienterprises.online/admin/leads`, enter the password.
Every quote request and "Talk to a Specialist" submission from now on
will appear there. **Nothing submitted before you complete steps 1–2 is
recoverable** — those leads only exist as WhatsApp messages, there was no
database yet to store them in.

## What this is, honestly

- **Auth**: one shared password, checked on every API call
  (`Authorization: Bearer <password>`). This is not per-user login, roles,
  or sessions — it's the same tier of protection as a shared Wi-Fi
  password. Fine for one owner or a couple of trusted staff sharing it;
  not something to hand to an outside agency or a large sales team.
- **Storage**: Vercel KV (Redis). Each lead is one JSON object; a list
  keeps them in order. This comfortably handles thousands of leads fast —
  it is not a relational database, so complex reporting queries (e.g.
  "average deal size by industry over time") would eventually want a real
  database if the business gets there. Not needed yet.
- **Priority scoring** (`api/leads.js`, `computePriority`): fully
  transparent, no ML. A lead is `HIGH` if 2+ of {quantity ≥ 10, timeline =
  "Immediately", has a company name} are true, `MEDIUM` if 1, else `LOW`.
  Every score shows its `reasons` array so you can see exactly why.
- **Quotation fields** (number, price, GST, delivery, validity, payment
  terms) are stored on the lead when you fill them in from the detail
  panel — there's no separate invoicing/PDF generation, just structured
  metadata sitting on the lead record so it's there when you're ready to
  build that.

## Endpoints

- `POST /api/leads` — public, called by the website's quote/contact
  forms. Validates and caps every field server-side.
- `GET /api/leads` — admin only, returns all leads.
- `PATCH /api/leads?id=<id>` — admin only, updates status / notes /
  follow-up date / quotation / won-lost details.
