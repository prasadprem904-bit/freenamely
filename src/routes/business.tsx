import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Wand2, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NameCard } from "@/components/NameCard";
import { NameSkeleton } from "@/components/NameSkeleton";
import { SmartSuggestions } from "@/components/SmartSuggestions";
import {
  BUSINESS_TYPES,
  type BusinessStyle,
  generateBusinessNames,
  generateBusinessVariants,
} from "@/lib/generators";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "Business Name Generator — Namely" },
      {
        name: "description",
        content:
          "Free business name generator with business type, 1–3 keywords and modern, luxury, professional or creative style options.",
      },
      { property: "og:title", content: "Business Name Generator — Namely" },
      {
        property: "og:description",
        content: "Create catchy business names by type, keywords and brand style — free.",
      },
      { name: "twitter:title", content: "Business Name Generator — Namely" },
      {
        name: "twitter:description",
        content: "Create catchy business names by type, keywords and brand style — free.",
      },
    ],
  }),
  component: BusinessPage,
});

function BusinessPage() {
  const [keyword, setKeyword] = useState("");
  const [businessType, setBusinessType] = useState<string>(BUSINESS_TYPES[0]);
  const [style, setStyle] = useState<BusinessStyle>("modern");
  const [names, setNames] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [suggestFor, setSuggestFor] = useState<{ name: string; variants: string[] } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const generate = () => {
    setGenerating(true);
    setDone(false);
    setSuggestFor(null);
    setNames([]);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setNames(generateBusinessNames(keyword, businessType, style, 12));
      setGenerating(false);
      setDone(true);
      setTimeout(() => setDone(false), 2200);
    }, 650);
  };

  const showVariants = (name: string) =>
    setSuggestFor({ name, variants: generateBusinessVariants(name, 8) });

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <div className="animate-fade-up text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-hero text-primary-foreground shadow-glow">
          <Briefcase className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Business Name Generator</h1>
        <p className="mt-2 text-muted-foreground">
          Describe your idea and we&apos;ll brainstorm brandable names — with smart variants for each.
        </p>
      </div>

      <div className="animate-fade-up mt-10 rounded-3xl border border-border bg-gradient-card p-6 shadow-soft sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <select
              id="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keyword">Keywords (1–3 words)</Label>
            <Input
              id="keyword"
              placeholder="e.g. coffee, fitness, cloud"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value.split(/[\s,]+/).slice(0, 3).join(" "))}
              onKeyDown={(e) => e.key === "Enter" && generate()}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Style</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {([
                ["modern", "Modern"],
                ["luxury", "Luxury"],
                ["professional", "Professional"],
                ["creative", "Creative"],
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setStyle(value)}
                  className={
                    "rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors " +
                    (style === value
                      ? "border-primary bg-secondary text-foreground"
                      : "border-border bg-background text-muted-foreground hover:bg-secondary/60")
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Button
          onClick={generate}
          size="lg"
          disabled={generating}
          className={`mt-6 w-full bg-gradient-hero text-primary-foreground shadow-soft hover:opacity-90 ${generating ? "animate-generating" : ""}`}
        >
          {generating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Generating…
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4" /> Generate Names
            </>
          )}
        </Button>
      </div>

      {done && (
        <div className="animate-success-pop mt-6 flex items-center justify-center gap-2 text-sm font-medium text-primary">
          <CheckCircle2 className="h-5 w-5" /> Names generated!
        </div>
      )}

      {generating && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <NameSkeleton count={6} />
        </div>
      )}

      {!generating && names.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {names.map((n, i) => (
            <NameCard key={n} name={n} index={i} onVariants={showVariants} />
          ))}
        </div>
      )}

      {suggestFor && (
        <SmartSuggestions
          baseName={suggestFor.name}
          variants={suggestFor.variants}
          onClose={() => setSuggestFor(null)}
        />
      )}
    </div>
  );
}
