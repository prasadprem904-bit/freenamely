import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Baby, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Namely — Free Business & Baby Name Generator" },
      {
        name: "description",
        content:
          "Generate brandable business names and beautiful baby names instantly. Free AI-style name generator for startups, brands and little ones.",
      },
      { property: "og:title", content: "Namely — Free Business & Baby Name Generator" },
      {
        property: "og:description",
        content: "Instantly generate brandable business names and meaningful baby names — free.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="animate-fade-up mx-auto max-w-4xl px-4 py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <Sparkles className="h-4 w-4 text-primary" /> Instant name ideas
          </span>
          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">
            Find the perfect <span className="text-gradient">name</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Two powerful generators in one place. Brandable names for your business and meaningful
            names for your baby — all free and instant.
          </p>
        </div>
        <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-hero opacity-20 blur-3xl" />
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-24 sm:grid-cols-2">
        <Link
          to="/business"
          className="group animate-fade-up rounded-3xl border border-border bg-gradient-card p-8 shadow-soft transition-transform hover:-translate-y-1"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-hero text-primary-foreground shadow-glow">
            <Briefcase className="h-6 w-6" />
          </span>
          <h2 className="mt-5 text-2xl font-semibold">Business Name Generator</h2>
          <p className="mt-2 text-muted-foreground">
            Enter a keyword and industry to get dozens of catchy, brandable company names in seconds.
          </p>
          <span className="mt-5 inline-flex items-center gap-1 font-medium text-primary">
            Generate names <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          to="/baby"
          className="group animate-fade-up rounded-3xl border border-border bg-gradient-card p-8 shadow-soft transition-transform hover:-translate-y-1"
          style={{ animationDelay: "80ms" }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-baby text-foreground shadow-soft">
            <Baby className="h-6 w-6" />
          </span>
          <h2 className="mt-5 text-2xl font-semibold">Baby Name Generator</h2>
          <p className="mt-2 text-muted-foreground">
            Discover beautiful baby names with their origins and meanings, filtered by gender and
            first letter.
          </p>
          <span className="mt-5 inline-flex items-center gap-1 font-medium text-primary">
            Find names <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </section>
    </div>
  );
}
