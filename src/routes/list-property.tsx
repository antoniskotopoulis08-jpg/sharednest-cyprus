import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { cities, propertyTypes, uses } from "@/lib/properties";
import { Disclaimer } from "@/components/disclaimer";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/list-property")({
  head: () => ({
    meta: [
      { title: "List your property for co-ownership — SharedNest" },
      { name: "description", content: "Owners: list your Cyprus home on SharedNest and offer a share to verified co-buyers." },
      { property: "og:title", content: "List your property on SharedNest" },
      { property: "og:description", content: "Reach verified co-buyers across Cyprus and Europe." },
    ],
  }),
  component: ListProperty,
});

function ListProperty() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="container-page py-24 max-w-xl text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
        <h1 className="mt-4 font-serif text-3xl">Thank you — we'll be in touch.</h1>
        <p className="mt-3 text-muted-foreground">
          Our listings team will review your submission and contact you within two business days
          to schedule an on-site visit and legal review.
        </p>
      </div>
    );
  }

  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest text-gold">Owners</div>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">List your property.</h1>
        <p className="mt-4 text-muted-foreground">
          Share part of your home's value and keep the rest. Our team handles vetting, matching
          and paperwork with a Cypriot law firm on your side.
        </p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setDone(true); }}
        className="mt-10 grid gap-8 lg:grid-cols-3"
      >
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 grid gap-4 md:grid-cols-2">
          <Field label="Your full name"><input required className={inputCls} placeholder="Maria Constantinou" /></Field>
          <Field label="Email"><input required type="email" className={inputCls} placeholder="you@email.com" /></Field>
          <Field label="Phone"><input className={inputCls} placeholder="+357 …" /></Field>
          <Field label="Property title"><input required className={inputCls} placeholder="Seafront villa in…" /></Field>
          <Field label="City">
            <select className={inputCls} defaultValue="">
              <option value="" disabled>Select</option>
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Type">
            <select className={inputCls} defaultValue="">
              <option value="" disabled>Select</option>
              {propertyTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Full property value (€)"><input required type="number" min={100_000} className={inputCls} placeholder="1200000" /></Field>
          <Field label="Share offered (%)"><input required type="number" min={5} max={90} className={inputCls} placeholder="40" /></Field>
          <Field label="Expected use">
            <select className={inputCls} defaultValue="">
              <option value="" disabled>Select</option>
              {uses.map((u) => <option key={u}>{u}</option>)}
            </select>
          </Field>
          <Field label="Est. monthly costs (€)"><input type="number" className={inputCls} placeholder="850" /></Field>
          <Field label="About the property" className="md:col-span-2">
            <textarea rows={5} className={inputCls} placeholder="Describe the home, its location, standout features and any restrictions." />
          </Field>
          <div className="md:col-span-2 flex justify-end">
            <button className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Submit listing
            </button>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-secondary/40 p-6">
            <h3 className="font-serif text-xl">What happens next</h3>
            <ol className="mt-4 space-y-3 text-sm text-muted-foreground list-decimal pl-5">
              <li>Our team reviews your submission within 2 business days.</li>
              <li>We arrange a professional photoshoot and legal review.</li>
              <li>Your listing goes live to verified co-buyers.</li>
              <li>Offers are collected in-app and reviewed by your lawyer.</li>
            </ol>
          </div>
          <Disclaimer />
        </aside>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Field({
  label, children, className = "",
}: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={"block " + className}>
      <div className="text-xs text-muted-foreground mb-1.5">{label}</div>
      {children}
    </label>
  );
}
