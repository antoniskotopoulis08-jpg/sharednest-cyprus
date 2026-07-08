import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, Users, ScrollText, Handshake, Home } from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How SharedNest works — co-ownership in Cyprus" },
      { name: "description", content: "Learn how the SharedNest marketplace connects verified co-buyers, with lawyers, due diligence and title deed checks on every property." },
      { property: "og:title", content: "How SharedNest works" },
      { property: "og:description", content: "The trusted co-ownership process, step by step." },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  { icon: Sparkles, t: "Tell us what you want", d: "Share your budget, preferred cities and how you plan to use the home." },
  { icon: Home, t: "Discover properties", d: "Our AI curates listings across Cyprus that fit your share size and use case." },
  { icon: Users, t: "Meet compatible co-buyers", d: "See compatibility scores based on budget, usage calendar and long-term intent." },
  { icon: ShieldCheck, t: "Independent legal review", d: "Cypriot lawyers verify title deeds, encumbrances and identities." },
  { icon: Handshake, t: "Agree the co-ownership terms", d: "Digital co-ownership agreement covering usage, expenses and exit." },
  { icon: ScrollText, t: "Complete & receive your share", d: "Funds flow via escrow. Your share is registered and your certificate issued." },
];

function HowItWorks() {
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest text-gold">How it works</div>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">A trusted path to co-ownership.</h1>
        <p className="mt-4 text-muted-foreground">
          SharedNest is a marketplace built around Cypriot real estate practice — lawyers,
          title deeds and escrow are part of every deal, not an afterthought.
        </p>
      </div>

      <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.t} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="text-sm text-gold font-medium">Step {i + 1}</div>
            </div>
            <div className="mt-4 font-serif text-xl">{s.t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 rounded-2xl border border-border bg-secondary/40 p-8 md:p-12 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h2 className="font-serif text-3xl">Legal, due diligence & title deeds.</h2>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li>Independent Cypriot lawyers appointed for every transaction.</li>
            <li>Full search of the Cyprus Land Registry, encumbrances and planning status.</li>
            <li>Buyer KYC, AML and source-of-funds verification.</li>
            <li>Escrow-secured payments and digital signing of co-ownership agreements.</li>
          </ul>
        </div>
        <Disclaimer />
      </div>
    </div>
  );
}
