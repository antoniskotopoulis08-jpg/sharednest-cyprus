import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SharedNest — Cyprus co-ownership" },
      { name: "description", content: "Get in touch with the SharedNest team in Cyprus for co-ownership enquiries, partnerships and press." },
      { property: "og:title", content: "Contact SharedNest" },
      { property: "og:description", content: "Reach the SharedNest team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest text-gold">Contact</div>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">Let's talk co-ownership.</h1>
        <p className="mt-4 text-muted-foreground">
          Whether you're an owner ready to list or a buyer exploring a share, our Limassol team
          is here to help.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          {sent ? (
            <div className="text-center py-14">
              <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
              <h2 className="mt-4 font-serif text-2xl">Message sent</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We'll get back to you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-4 md:grid-cols-2">
              <Field label="Name"><input required className={inputCls} /></Field>
              <Field label="Email"><input required type="email" className={inputCls} /></Field>
              <Field label="I am a…">
                <select className={inputCls} defaultValue="buyer">
                  <option value="buyer">Potential buyer</option>
                  <option value="owner">Property owner</option>
                  <option value="partner">Legal / partner</option>
                  <option value="press">Press</option>
                </select>
              </Field>
              <Field label="Phone (optional)"><input className={inputCls} /></Field>
              <Field label="Message" className="md:col-span-2">
                <textarea required rows={6} className={inputCls} />
              </Field>
              <div className="md:col-span-2 flex justify-end">
                <button className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Send message
                </button>
              </div>
            </form>
          )}
        </div>
        <aside className="space-y-4">
          <InfoRow icon={MapPin} title="Office" body="Limassol Marina, Cyprus" />
          <InfoRow icon={Mail} title="Email" body="hello@sharednest.com" />
          <InfoRow icon={Phone} title="Phone" body="+357 25 000 000" />
          <Disclaimer />
        </aside>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={"block " + className}>
      <div className="text-xs text-muted-foreground mb-1.5">{label}</div>
      {children}
    </label>
  );
}

function InfoRow({ icon: Icon, title, body }: { icon: typeof Mail; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{title}</div>
        <div className="font-medium">{body}</div>
      </div>
    </div>
  );
}
