import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Baby, Wand2, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NameCard } from "@/components/NameCard";
import { NameSkeleton } from "@/components/NameSkeleton";
import { SmartSuggestions } from "@/components/SmartSuggestions";
import {
  BABY_ORIGIN_RELIGIONS,
  type BabyStyle,
  generateBabyNames,
  generateBabyVariants,
  type BabyName,
  type Gender,
} from "@/lib/generators";

export const Route = createFileRoute("/baby")({
  head: () => ({
    meta: [
      { title: "Baby Name Generator — Namely" },
      {
        name: "description",
        content:
          "Free baby name generator with gender, starting letter, origin/religion and style filters for boy, girl and unisex names.",
      },
      { property: "og:title", content: "Baby Name Generator — Namely" },
      {
        property: "og:description",
        content: "Find boy, girl and unisex names by starting letter, origin/religion and style — free.",
      },
      { name: "twitter:title", content: "Baby Name Generator — Namely" },
      {
        name: "twitter:description",
        content: "Find boy, girl and unisex names by starting letter, origin/religion and style — free.",
      },
    ],
  }),
  component: BabyPage,
});

const GENDERS: { value: Gender; label: string }[] = [
  { value: "boy", label: "Boy" },
  { value: "girl", label: "Girl" },
  { value: "neutral", label: "Unisex" },
];

const BABY_STYLES: { value: BabyStyle; label: string }[] = [
  { value: "modern", label: "Modern" },
  { value: "traditional", label: "Traditional" },
  { value: "unique", label: "Unique" },
];

function BabyPage() {
  const [gender, setGender] = useState<Gender>("boy");
  const [startsWith, setStartsWith] = useState("");
  const [originReligion, setOriginReligion] = useState<string>("Any");
  const [style, setStyle] = useState<BabyStyle>("modern");
  const [names, setNames] = useState<BabyName[]>([]);
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
      setNames(generateBabyNames(gender, startsWith, originReligion, style, 9));
      setGenerating(false);
      setDone(true);
      setTimeout(() => setDone(false), 2200);
    }, 650);
  };

  const showVariants = (name: string) =>
    setSuggestFor({ name, variants: generateBabyVariants(name, 8) });

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <div className="animate-fade-up text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-baby text-foreground shadow-soft">
          <Baby className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Baby Name Generator</h1>
        <p className="mt-2 text-muted-foreground">
          Find a meaningful name for your little one, with origin, meaning and smart variants.
        </p>
      </div>

      <div className="animate-fade-up mt-10 rounded-3xl border border-border bg-gradient-card p-6 shadow-soft sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label>Gender</Label>
            <div className="grid grid-cols-3 gap-2">
              {GENDERS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGender(g.value)}
                  className={
                    "rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors " +
                    (gender === g.value
                      ? "border-primary bg-secondary text-foreground"
                      : "border-border bg-background text-muted-foreground hover:bg-secondary/60")
                  }
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="starts">Starting Letter (Optional)</Label>
            <Input
              id="starts"
              maxLength={1}
              placeholder="e.g. A"
              value={startsWith}
              onChange={(e) => setStartsWith(e.target.value.replace(/[^a-z]/gi, "").slice(0, 1).toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && generate()}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="originReligion">Origin/Religion (Optional)</Label>
            <select
              id="originReligion"
              value={originReligion}
              onChange={(e) => setOriginReligion(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {BABY_ORIGIN_RELIGIONS.map((origin) => (
                <option key={origin} value={origin}>
                  {origin}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label>Style</Label>
            <div className="grid grid-cols-3 gap-2">
              {BABY_STYLES.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setStyle(item.value)}
                  className={
                    "rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors " +
                    (style === item.value
                      ? "border-primary bg-secondary text-foreground"
                      : "border-border bg-background text-muted-foreground hover:bg-secondary/60")
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={generate}
          size="lg"
          disabled={generating}
          className={`mt-6 w-full bg-gradient-baby text-foreground shadow-soft hover:opacity-90 ${generating ? "animate-generating" : ""}`}
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
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NameSkeleton count={6} />
        </div>
      )}

      {!generating && names.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {names.map((n, i) => (
            <NameCard
              key={n.name}
              name={n.name}
              subtitle={`${n.origin} · ${n.religion} · ${n.meaning}`}
              index={i}
              onVariants={showVariants}
            />
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
