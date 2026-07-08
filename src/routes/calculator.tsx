import { createFileRoute } from "@tanstack/react-router";
import { AffordabilityCalculator } from "@/components/affordability-calculator";

export const Route = createFileRoute("/calculator")({
  component: CalculatorPage,
  head: () => ({
    meta: [
      { title: "Affordability Calculator | Share B&B" },
      {
        name: "description",
        content:
          "Calculate your co-ownership costs for Cyprus real estate. See share price, upfront cost, monthly cost and rental income per share.",
      },
    ],
  }),
});

function CalculatorPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-hero)" }} />
      <div className="relative container-page py-16 md:py-24">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow">Affordability</div>
          <h1 className="mt-3 text-display text-4xl md:text-5xl">
            Enter Cyprus real estate at your own pace.
          </h1>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Adjust the numbers to see how buying a share compares to full ownership. All figures are
            estimates for planning purposes only.
          </p>
        </div>
        <AffordabilityCalculator />
      </div>
    </div>
  );
}
