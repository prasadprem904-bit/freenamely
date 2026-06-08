import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NameCard } from "@/components/NameCard";
import { BUSINESS_INDUSTRIES, generateBusinessNames } from "@/lib/generators";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "Business Name Generator — Namely" },
      {
        name: "description",
        content:
          "Free business name generator. Enter a keyword and industry to instantly create catchy, brandable company and startup names.",
      },
      { property: "og:title", content: "Business Name Generator — Namely" },
      {
        property: "og:description",
        content: "Instantly create catchy, brandable company names for free.",
      },
    ],
  }),
  component: BusinessPage,
});

function BusinessPage() {
  const [keyword, setKeyword] = useState("");
  const [industry, setIndustry] = useState<string>(BUSINESS_INDUSTRIES[0]);
  const [names, setNames] = useState<string[]>([]);

  const generate = () => setNames(generateBusinessNames(keyword, industry, 12));

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <div className="text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-hero text-primary-foreground shadow-glow">
          <Briefcase className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Business Name Generator</h1>
        <p className="mt-2 text-muted-foreground">
          Describe your idea and we&apos;ll brainstorm brandable names for you.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-gradient-card p-6 shadow-soft sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="keyword">Keyword</Label>
            <Input
              id="keyword"
              placeholder="e.g. coffee, fitness, cloud"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {BUSINESS_INDUSTRIES.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button onClick={generate} size="lg" className="mt-6 w-full bg-gradient-hero text-primary-foreground shadow-soft hover:opacity-90">
          <Wand2 className="h-4 w-4" /> Generate Names
        </Button>
      </div>

      {names.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {names.map((n, i) => (
            <NameCard key={n} name={n} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
