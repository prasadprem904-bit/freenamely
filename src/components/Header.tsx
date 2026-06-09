import { Link } from "@tanstack/react-router";
import namelyLogo from "@/assets/namely-logo.png.asset.json";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img
            src={namelyLogo.url}
            alt="Namely logo"
            className="h-9 w-9 rounded-xl shadow-soft"
          />
          <span className="text-gradient">Namely</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            to="/business"
            className="rounded-full px-4 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "rounded-full px-4 py-2 bg-secondary text-foreground" }}
          >
            Business Names
          </Link>
          <Link
            to="/baby"
            className="rounded-full px-4 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "rounded-full px-4 py-2 bg-secondary text-foreground" }}
          >
            Baby Names
          </Link>
        </nav>
      </div>
    </header>
  );
}
