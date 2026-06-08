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
          "Free baby name generator. Discover beautiful baby names with origins and meanings, plus smart variant ideas, filtered by gender and starting letter.",
      },
      { property: "og:title", content: "Baby Name Generator — Namely" },
      {
        property: "og:description",
        content: "Discover beautiful baby names with origins, meanings and smart variants — free.",
      },
    ],
  }),
  component: BabyPage,
});

const GENDERS: { value: Gender; label: string }[] = [
  { value: "girl", label: "Girl" },
  { value: "boy", label: "Boy" },
  { value: "neutral", label: "Neutral" },
];

function BabyPage() {
  const [gender, setGender] = useState<Gender>("girl");
  const [startsWith, setStartsWith] = useState("");
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
      setNames(generateBabyNames(gender, startsWith, 9));
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
        <div className="space-y-2">
          <Label>Gender</Label>
          <div className="flex gap-2">
            {GENDERS.map((g) => (
              <button
                key={g.value}
                onClick={() => setGender(g.value)}
                className={
                  "flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors " +
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

        <div className="mt-5 space-y-2">
          <Label htmlFor="starts">Starts with (optional)</Label>
          <Input
            id="starts"
            maxLength={1}
            placeholder="e.g. A"
            value={startsWith}
            onChange={(e) => setStartsWith(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
          />
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
              subtitle={`${n.origin} · ${n.meaning}`}
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
