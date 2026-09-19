/**
 * POST /api/contact
 *
 * Takes the portfolio contact form and delivers it by email through Resend
 * (https://resend.com). The API key lives in an environment variable on
 * Vercel, so it never reaches the browser.
 *
 * The email is a custom-designed HTML template (dark + gold, matching the
 * portfolio theme) with a plain-text fallback for clients that block HTML.
 *
 * Security layers (in order):
 *   1. POST-only
 *   2. per-IP rate limit (best-effort, in-memory)
 *   3. honeypot field (bots)
 *   4. strict validation + length caps (abuse)
 *   5. HTML escaping on every user value (email template injection)
 *
 * Environment variables (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY — key from resend.com → API Keys
 *   CONTACT_TO     — where enquiries land (defaults to hello@sasika.dev)
 *   EMAIL_FROM     — "Name <address>" to send from. Defaults to Resend's
 *                   onboarding@resend.dev, which on the free plan only
 *                   delivers to the email you signed up to Resend with.
 *                   Verify your own domain in Resend to send from it.
 */

type Body = {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  message?: string;
  /** honeypot — real people never see or fill this */
  website?: string;
};

type ApiRequest = {
  method?: string;
  body?: Body;
  headers?: Record<string, string | string[] | undefined>;
};
type ApiResponse = {
  status(code: number): ApiResponse;
  json(payload: { ok?: boolean; error?: string }): void;
};

/* email must not contain whitespace, angle brackets or quotes — stops
   header tricks and keeps the generated mailto link safe */
const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

/* hard caps on every field — nobody needs a 10k-character enquiry */
const MAX = { name: 100, email: 254, company: 120, budget: 60, message: 5000 };

/* ---------- rate limiting (best-effort, per serverless instance) ----------
 * 5 messages per minute per IP. Serverless instances don't share memory, so
 * this is a soft limit — pair with Vercel WAF / Upstash Redis for strict
 * global limits if abuse ever becomes a real problem. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

const rateLimited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  /* prune stale entries so the map never grows unbounded */
  if (hits.size > 10_000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
};

const clientIp = (req: ApiRequest) => {
  const fwd = req.headers?.["x-forwarded-for"];
  const raw = Array.isArray(fwd) ? fwd[0] : fwd;
  return (raw?.split(",")[0] ?? "").trim() || "unknown";
};

/* ---------- email template helpers ---------- */

/** escape user input so it can never inject HTML into the email */
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** escape + preserve line breaks in the message body */
const br = (s: string) => esc(s).replace(/\n/g, "<br />");

/** one label/value row — a soft rounded tile, matching the site's cards */
const row = (label: string, value: string) => `
  <tr>
    <td style="padding:0 0 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#141417;border:1px solid #232327;border-radius:14px;">
        <tr>
          <td style="padding:12px 18px;">
            <div style="color:#d4af37;font-family:Helvetica,Arial,sans-serif;font-size:9.5px;letter-spacing:2.4px;text-transform:uppercase;padding-bottom:5px;">${label}</div>
            <div style="color:#efece4;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.5;">${value}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;

type Details = {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

/** the custom HTML email — dark + gold, matching the portfolio theme */
const htmlEmail = (d: Details) => {
  const name = esc(d.name);
  const firstName = esc(d.name.split(" ")[0] || "them");
  const email = esc(d.email);
  const company = d.company ? esc(d.company) : "";
  const budget = esc(d.budget || "—");
  const preview = esc(
    `${d.name} · ${d.budget} · ${d.message.replace(/\s+/g, " ").trim().slice(0, 80)}`,
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>New enquiry — ${name}</title>
</head>
<body style="margin:0;padding:0;background-color:#08080a;">

<!-- preheader (inbox preview text) -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preview}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#08080a;">
<tr>
<td align="center" style="padding:44px 14px;">

<!-- card — soft rounded, matching the site's panels -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#101013;border:1px solid #232327;border-radius:24px;overflow:hidden;">

  <!-- header -->
  <tr>
    <td style="padding:32px 34px 26px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-right:15px;">
            <!-- circular monogram -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="48" height="48" align="center" valign="middle" style="width:48px;height:48px;background-color:#08080a;border:1px solid #d4af37;border-radius:999px;color:#d4af37;font-family:Georgia,'Times New Roman',serif;font-size:16px;letter-spacing:1.5px;text-align:center;">SR</td>
              </tr>
            </table>
          </td>
          <td style="vertical-align:middle;">
            <!-- pill badge -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background-color:rgba(212,175,55,0.12);border:1px solid rgba(212,175,55,0.35);border-radius:999px;padding:5px 13px;color:#d4af37;font-family:Helvetica,Arial,sans-serif;font-size:9px;letter-spacing:2.6px;text-transform:uppercase;">New enquiry</td>
              </tr>
            </table>
            <div style="color:#efece4;font-family:Helvetica,Arial,sans-serif;font-size:22px;font-weight:500;letter-spacing:-0.5px;padding-top:9px;">${name}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- details — rounded tiles -->
  <tr>
    <td style="padding:0 34px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${row("Name", name)}
        ${row("Email", `<a href="mailto:${email}" style="color:#d4af37;text-decoration:none;">${email}</a>`)}
        ${company ? row("Company", company) : ""}
        ${row("Budget", budget)}
      </table>
    </td>
  </tr>

  <!-- message — rounded quote card -->
  <tr>
    <td style="padding:14px 34px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#141417;border:1px solid #232327;border-radius:18px;">
        <tr>
          <td style="padding:20px 22px;">
            <div style="color:#d4af37;font-family:Helvetica,Arial,sans-serif;font-size:9.5px;letter-spacing:2.6px;text-transform:uppercase;padding-bottom:11px;">The project</div>
            <div style="color:#b6b3aa;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.75;">${br(d.message)}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- reply button — a pill -->
  <tr>
    <td style="padding:26px 34px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background-color:#d4af37;border-radius:999px;">
            <a href="mailto:${email}?subject=Re%3A%20your%20enquiry" style="display:inline-block;color:#08080a;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:bold;letter-spacing:1.8px;text-transform:uppercase;text-decoration:none;padding:14px 30px;border-radius:999px;">Reply to ${firstName} &#8594;</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- footer -->
  <tr>
    <td style="padding:18px 34px 24px;border-top:1px solid #232327;">
      <div style="color:#83837d;font-family:Helvetica,Arial,sans-serif;font-size:11.5px;line-height:1.7;">
        Sent from your portfolio contact form — hit reply and it goes straight to
        <span style="color:#d4af37;">${email}</span>
      </div>
    </td>
  </tr>

</table>

<div style="max-width:560px;margin:0 auto;padding-top:18px;color:#54544f;font-family:Helvetica,Arial,sans-serif;font-size:10.5px;letter-spacing:1.5px;text-align:center;">DELIVERED VIA RESEND</div>

</td>
</tr>
</table>
</body>
</html>`;
};

/* ---------- handler ---------- */

export default async function handler(req: ApiRequest, res: ApiResponse) {
  /* 1 — POST only */
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  /* 2 — soft per-IP rate limit */
  if (rateLimited(clientIp(req))) {
    return res
      .status(429)
      .json({ error: "Too many messages — please try again in a minute." });
  }

  const { name, email, company, budget, message, website } = req.body ?? {};

  /* 3 — honeypot filled → almost certainly a bot; pretend all is well */
  if (website && website.trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  /* 4 — strict server-side validation + length caps */
  if (!name || name.trim().length < 2 || name.trim().length > MAX.name) {
    return res.status(400).json({ error: "Please enter your name." });
  }
  if (!email || !EMAIL_RE.test(email) || email.length > MAX.email) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }
  if (company && company.length > MAX.company) {
    return res.status(400).json({ error: "Company name is too long." });
  }
  if (budget && budget.length > MAX.budget) {
    return res.status(400).json({ error: "Budget value is too long." });
  }
  if (
    !message ||
    message.trim().length < 12 ||
    message.trim().length > MAX.message
  ) {
    return res
      .status(400)
      .json({ error: "A sentence or two about the project helps." });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Server not configured." });
  }

  const from = process.env.EMAIL_FROM ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO ?? "hello@sasika.dev";
  const subject = `New enquiry — ${name.trim()}${
    company ? ` (${company.trim()})` : ""
  } — ${budget ?? "budget n/a"}`;

  /* plain-text fallback (for email clients that block HTML) */
  const text = [
    `Name:    ${name.trim()}`,
    `Email:   ${email.trim()}`,
    company ? `Company: ${company.trim()}` : null,
    `Budget:  ${budget ?? "—"}`,
    "",
    message.trim(),
  ]
    .filter((line) => line !== null)
    .join("\n");

  /* the custom styled version (all values escaped) */
  const html = htmlEmail({
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() ?? "",
    budget: budget ?? "—",
    message: message.trim(),
  });

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email.trim(),
        subject,
        text,
        html,
      }),
    });

    if (!r.ok) {
      console.error("Resend error", r.status, await r.text());
      return res.status(500).json({ error: "Email service failed." });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Contact handler error", e);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
