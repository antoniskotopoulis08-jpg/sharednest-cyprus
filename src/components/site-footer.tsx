import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-serif text-2xl tracking-tight">
            Share <span className="text-gold">B&amp;B</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            An AI-powered marketplace for real estate co-ownership in Cyprus. Own a share of a
            home you love, alongside verified co-buyers.
          </p>
          <p className="mt-6 text-xs text-muted-foreground max-w-md leading-relaxed">
            <strong className="text-foreground">Disclaimer.</strong> Share B&amp;B is a
            marketplace and matching platform. We do not provide legal, financial, tax,
            investment, immigration, or real estate brokerage advice. All estimates are
            for informational purposes only. Users should consult licensed professionals
            before making decisions.
          </p>
        </div>
        <div>
          <div className="text-sm font-medium gold-underline">Explore</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/browse" className="hover:text-foreground">Browse properties</Link></li>
            <li><Link to="/how-it-works" className="hover:text-foreground">How it works</Link></li>
            <li><Link to="/matchmaker" className="hover:text-foreground">AI Matchmaker</Link></li>
            <li><Link to="/list-property" className="hover:text-foreground">List a property</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium gold-underline">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Limassol, Cyprus</li>
            <li>hello@sharebnb.cy</li>
            <li><Link to="/contact" className="hover:text-foreground">Contact us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-5 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} Share B&amp;B. All rights reserved.</span>
          <span>Marketplace &amp; matching platform — informational only, not advice.</span>
        </div>
      </div>
    </footer>
  );
}
