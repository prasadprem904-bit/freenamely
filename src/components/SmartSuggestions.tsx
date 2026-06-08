import { useState } from "react";
import { Check, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// AI-style smart suggestions panel: shows variant ideas as selectable chips.
export function SmartSuggestions({
  baseName,
  variants,
  onClose,
}: {
  baseName: string;
  variants: string[];
  onClose: () => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);

  const choose = async (v: string) => {
    setPicked(v);
    try {
      await navigator.clipboard.writeText(v);
    } catch {
      /* ignore */
    }
    setTimeout(() => setPicked((p) => (p === v ? null : p)), 1500);
  };

  return (
    <div className="animate-fade-up mt-8 rounded-3xl border border-primary/30 bg-gradient-card p-6 shadow-glow sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-soft">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="font-semibold leading-tight">Smart suggestions</p>
            <p className="text-sm text-muted-foreground">
              AI-style ideas based on <span className="font-medium text-foreground">{baseName}</span>
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close suggestions">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {variants.map((v, i) => (
          <button
            key={v}
            onClick={() => choose(v)}
            className="animate-pop-in hover-scale inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {picked === v ? <Check className="h-3.5 w-3.5 text-primary" /> : null}
            {v}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Tap any idea to copy it.</p>
    </div>
  );
}
