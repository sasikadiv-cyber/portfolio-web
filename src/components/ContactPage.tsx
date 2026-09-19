import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PROFILE, SOCIALS } from "../data/site";
import { useReveal } from "../lib/hooks";

const BUDGETS = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 +",
  "Not sure yet",
];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "field w-full rounded-[12px] border border-line bg-paper px-3 py-2.5 text-[14.5px] text-ink placeholder:text-mute/70 transition-colors duration-200 focus:border-ink focus:outline-none";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: BUDGETS[1],
    message: "",
    website: "", // honeypot — humans never see it
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  /* re-run the reveal observer whenever the form is swapped for the success
     panel (and back) — freshly mounted [data-reveal] nodes start invisible */
  useReveal(true, sent);

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    if (form.name.trim().length < 2) err.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      err.email = "Please enter a valid email address.";
    if (form.message.trim().length < 12)
      err.message = "A sentence or two about the project helps.";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setSending(true);
    setServerError("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setServerError(
        "That didn’t go through. Please try again, or email me directly.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 md:px-10 md:pb-28">
      {/* ---------------- header ---------------- */}
      <header className="pt-20 md:pt-28">
        <p data-reveal className="label mb-6">
          Contact
        </p>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-16">
          <h1
            className="t-mask max-w-2xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.1] font-medium text-ink"
            style={{ ["--rv-delay" as string]: "60ms" }}
          >
            <span>Tell me what you're working on.</span>
          </h1>
          <p
            data-reveal
            style={{ ["--rv-delay" as string]: "120ms" }}
            className="max-w-sm text-[14.5px] leading-[1.7] text-mute"
          >
            I reply to every enquiry within two working days.
          </p>
        </div>
      </header>

      <div className="mt-14 grid gap-x-12 gap-y-12 md:mt-20 md:grid-cols-12">
        {/* ---------------- details ---------------- */}
        <div className="md:col-span-5">
          <dl className="space-y-7">
            <div data-reveal>
              <dt className="label mb-2">Email</dt>
              <dd>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="u-link text-[16px] text-ink"
                >
                  {PROFILE.email}
                </a>
              </dd>
            </div>
            <div data-reveal style={{ ["--rv-delay" as string]: "70ms" }}>
              <dt className="label mb-2">Phone</dt>
              <dd>
                <a
                  href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                  className="u-link text-[16px] text-ink"
                >
                  {PROFILE.phone}
                </a>
              </dd>
            </div>
            <div data-reveal style={{ ["--rv-delay" as string]: "140ms" }}>
              <dt className="label mb-2">Based in</dt>
              <dd className="text-[15px] text-ink-2">{PROFILE.location}</dd>
            </div>
            <div data-reveal style={{ ["--rv-delay" as string]: "210ms" }}>
              <dt className="label mb-3">Elsewhere</dt>
              <dd className="flex flex-wrap gap-x-6 gap-y-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="u-link text-[14.5px] text-mute hover:text-ink"
                  >
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        {/* ---------------- form ---------------- */}
        <div className="md:col-span-7">
          {sent ? (
            <div className="fade-up panel rounded-[20px] border border-line bg-paper-2 p-8 md:p-10">
              <p className="label mb-5">Message sent</p>
              <h2 className="text-[clamp(1.3rem,2.6vw,1.8rem)] font-medium text-ink">
                Thanks, {form.name.split(" ")[0]} — I'll be in touch shortly.
              </h2>
              <p className="mt-4 max-w-md text-[14.5px] leading-[1.7] text-mute">
                A copy is on its way to my inbox. I read everything personally
                and reply within two working days.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setForm({
                    name: "",
                    email: "",
                    company: "",
                    budget: BUDGETS[1],
                    message: "",
                    website: "",
                  });
                }}
                className="mt-6 cursor-pointer rounded-full border border-line px-4 py-2.5 text-[14px] text-ink transition-colors duration-200 hover:border-ink"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              {/* honeypot — invisible to humans, tasty for bots */}
              <div aria-hidden className="hidden">
                <label>
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => set("website")(e.target.value)}
                  />
                </label>
              </div>

              <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                <div data-reveal>
                  <label htmlFor="cp-name" className="label mb-2.5 block">
                    Name
                  </label>
                  <input
                    id="cp-name"
                    className={field}
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-[12.5px] text-accent">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div data-reveal style={{ ["--rv-delay" as string]: "60ms" }}>
                  <label htmlFor="cp-email" className="label mb-2.5 block">
                    Email
                  </label>
                  <input
                    id="cp-email"
                    type="email"
                    className={field}
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-[12.5px] text-accent">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div data-reveal style={{ ["--rv-delay" as string]: "120ms" }}>
                  <label htmlFor="cp-company" className="label mb-2.5 block">
                    Company <span className="normal-case">(optional)</span>
                  </label>
                  <input
                    id="cp-company"
                    className={field}
                    value={form.company}
                    onChange={(e) => set("company")(e.target.value)}
                    placeholder="Company or project"
                  />
                </div>
                <div data-reveal style={{ ["--rv-delay" as string]: "180ms" }}>
                  <label htmlFor="cp-budget" className="label mb-2.5 block">
                    Budget
                  </label>
                  <select
                    id="cp-budget"
                    className={`${field} cursor-pointer`}
                    value={form.budget}
                    onChange={(e) => set("budget")(e.target.value)}
                  >
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                data-reveal
                style={{ ["--rv-delay" as string]: "240ms" }}
                className="mt-6"
              >
                <label htmlFor="cp-message" className="label mb-2.5 block">
                  The project
                </label>
                <textarea
                  id="cp-message"
                  rows={6}
                  className={`${field} resize-none`}
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                  placeholder="What are you building, and what should it achieve?"
                />
                {errors.message && (
                  <p className="mt-2 text-[12.5px] text-accent">
                    {errors.message}
                  </p>
                )}
              </div>

              {serverError && (
                <p className="mt-4 flex items-center gap-2.5 text-[13px] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {serverError}
                </p>
              )}

              <div
                data-reveal
                style={{ ["--rv-delay" as string]: "300ms" }}
                className="mt-8"
              >
                <button
                  type="submit"
                  disabled={sending}
                  className="group btn-lift inline-flex cursor-pointer items-center gap-3 rounded-full bg-ink px-5 py-3 text-[14px] text-paper transition-opacity duration-200 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send message"}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
