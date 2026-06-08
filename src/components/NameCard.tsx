import { useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NameCard({
  name,
  subtitle,
  index = 0,
  onVariants,
}: {
  name: string;
  subtitle?: string;
  index?: number;
  onVariants?: (name: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className="group animate-pop-in flex items-center justify-between gap-3 rounded-2xl border border-border bg-gradient-card p-5 shadow-soft transition-transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold text-foreground">{name}</p>
        {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {onVariants && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onVariants(name)}
            aria-label={`Get smart variants of ${name}`}
            title="Smart variants"
            className="opacity-60 transition group-hover:opacity-100 hover:text-primary"
          >
            <Sparkles className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={copy}
          aria-label={`Copy ${name}`}
          className="opacity-60 group-hover:opacity-100"
        >
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
