import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Baby, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NameCard } from "@/components/NameCard";
import { generateBabyNames, type BabyName, type Gender } from "@/lib/generators";

export const Route = createFileRoute("/baby")({
  head: () => ({
    meta: [
      { title: "Baby Name Generator — Namely" },
      {
        name: "description",
        content:
          "Free baby name generator. Discover beautiful baby names with origins and meanings, filtered by gender and starting letter.",
      },
      { property: "og:title", content: "Baby Name Generator — Namely" },
      {
        property: "og:description",
        content: "Discover beautiful baby names with their origins and meanings — free.",
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

  const generate = () => setNames(generateBabyNames(gender, startsWith, 9));

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <div className="text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-baby text-foreground shadow-soft">
          <Baby className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Baby Name Generator</h1>
        <p className="mt-2 text-muted-foreground">
          Find a meaningful name for your little one, complete with origin and meaning.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-gradient-card p-6 shadow-soft sm:p-8">
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

        <Button onClick={generate} size="lg" className="mt-6 w-full bg-gradient-baby text-foreground shadow-soft hover:opacity-90">
          <Wand2 className="h-4 w-4" /> Generate Names
        </Button>
      </div>

      {names.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {names.map((n, i) => (
            <NameCard key={n.name} name={n.name} subtitle={`${n.origin} · ${n.meaning}`} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
