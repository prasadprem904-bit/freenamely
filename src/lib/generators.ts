// Client-side name generators for business and baby names.
// Pure functions — instant, no backend required.

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ------------------------- BUSINESS NAMES ------------------------- */

export const BUSINESS_INDUSTRIES = [
  "Tech & Software",
  "Fashion & Apparel",
  "Food & Beverage",
  "Health & Wellness",
  "Finance",
  "Creative & Design",
  "Real Estate",
  "Education",
] as const;

const PREFIXES = ["Neo", "Zen", "Aero", "Lumi", "Nova", "Vibe", "Peak", "Eco", "Hyper", "Aura", "Pure", "Bright", "Bold", "Swift", "True"];
const SUFFIXES = ["ly", "ify", "io", "labs", "hub", "works", "wave", "verse", "ster", "ora", "ium", "go", "spark", "flow", "nest"];
const DESCRIPTORS = ["Studio", "Collective", "Co", "Group", "House", "Digital", "Solutions", "Ventures", "& Co", "Agency"];

const INDUSTRY_WORDS: Record<string, string[]> = {
  "Tech & Software": ["byte", "code", "logic", "cloud", "data", "stack", "pixel", "loop"],
  "Fashion & Apparel": ["thread", "vogue", "stitch", "luxe", "drape", "muse", "atelier", "chic"],
  "Food & Beverage": ["fork", "feast", "crumb", "harvest", "brew", "spice", "savor", "graze"],
  "Health & Wellness": ["vital", "thrive", "glow", "calm", "bloom", "pulse", "balance", "nourish"],
  Finance: ["mint", "vault", "ledger", "capital", "asset", "fund", "coin", "trust"],
  "Creative & Design": ["ink", "canvas", "form", "shade", "craft", "render", "frame", "palette"],
  "Real Estate": ["nest", "abode", "haven", "estate", "dwell", "keystone", "manor", "anchor"],
  Education: ["mind", "learn", "scholar", "spark", "guide", "campus", "mentor", "quill"],
};

export function generateBusinessNames(keyword: string, industry: string, count = 12): string[] {
  const base = keyword.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  const words = INDUSTRY_WORDS[industry] ?? PREFIXES.map((p) => p.toLowerCase());
  const results = new Set<string>();
  const root = base || pick(words);

  const builders: Array<() => string> = [
    () => cap(pick(PREFIXES)) + cap(root),
    () => cap(root) + pick(SUFFIXES),
    () => cap(root) + cap(pick(words)),
    () => cap(pick(words)) + cap(root),
    () => cap(root) + " " + pick(DESCRIPTORS),
    () => cap(pick(PREFIXES)) + cap(pick(words)),
    () => "The " + cap(root) + " " + pick(DESCRIPTORS),
    () => cap(root) + pick(SUFFIXES) + " " + pick(DESCRIPTORS),
    () => cap(pick(words)) + pick(SUFFIXES),
    () => "Get" + cap(root),
  ];

  let guard = 0;
  while (results.size < count && guard < count * 20) {
    results.add(pick(builders)());
    guard++;
  }
  return shuffle([...results]).slice(0, count);
}

/* --------------------------- BABY NAMES --------------------------- */

export type Gender = "girl" | "boy" | "neutral";

const BABY_NAMES: Record<Gender, { name: string; origin: string; meaning: string }[]> = {
  girl: [
    { name: "Aria", origin: "Italian", meaning: "Air, melody" },
    { name: "Maya", origin: "Sanskrit", meaning: "Illusion, dream" },
    { name: "Luna", origin: "Latin", meaning: "Moon" },
    { name: "Saanvi", origin: "Sanskrit", meaning: "Goddess Lakshmi" },
    { name: "Isla", origin: "Scottish", meaning: "Island" },
    { name: "Zoya", origin: "Persian", meaning: "Shining, alive" },
    { name: "Nova", origin: "Latin", meaning: "New star" },
    { name: "Anaya", origin: "Hindi", meaning: "Caring, protected" },
    { name: "Elara", origin: "Greek", meaning: "Bright, shining" },
    { name: "Myra", origin: "Latin", meaning: "Sweet, fragrant" },
    { name: "Ivy", origin: "English", meaning: "Faithfulness" },
    { name: "Aaradhya", origin: "Sanskrit", meaning: "Worshipped" },
  ],
  boy: [
    { name: "Aarav", origin: "Sanskrit", meaning: "Peaceful" },
    { name: "Liam", origin: "Irish", meaning: "Strong-willed warrior" },
    { name: "Vihaan", origin: "Sanskrit", meaning: "Dawn, new beginning" },
    { name: "Ezra", origin: "Hebrew", meaning: "Helper" },
    { name: "Kai", origin: "Hawaiian", meaning: "Sea" },
    { name: "Reyansh", origin: "Sanskrit", meaning: "Ray of light" },
    { name: "Atlas", origin: "Greek", meaning: "Enduring" },
    { name: "Arjun", origin: "Sanskrit", meaning: "Bright, shining" },
    { name: "Noah", origin: "Hebrew", meaning: "Rest, comfort" },
    { name: "Ishaan", origin: "Sanskrit", meaning: "Sun, lord" },
    { name: "Leo", origin: "Latin", meaning: "Lion" },
    { name: "Dhruv", origin: "Sanskrit", meaning: "Pole star, constant" },
  ],
  neutral: [
    { name: "River", origin: "English", meaning: "Flowing water" },
    { name: "Sky", origin: "English", meaning: "The heavens" },
    { name: "Avery", origin: "English", meaning: "Ruler of elves" },
    { name: "Rowan", origin: "Irish", meaning: "Little red one" },
    { name: "Sage", origin: "Latin", meaning: "Wise, herb" },
    { name: "Noor", origin: "Arabic", meaning: "Light" },
    { name: "Ezra", origin: "Hebrew", meaning: "Helper" },
    { name: "Kiran", origin: "Sanskrit", meaning: "Ray of light" },
    { name: "Phoenix", origin: "Greek", meaning: "Rising bird" },
    { name: "Aanya", origin: "Sanskrit", meaning: "Grace" },
    { name: "Ari", origin: "Hebrew", meaning: "Lion" },
    { name: "Devi", origin: "Sanskrit", meaning: "Divine" },
  ],
};

export interface BabyName {
  name: string;
  origin: string;
  meaning: string;
}

export function generateBabyNames(gender: Gender, startsWith: string, count = 9): BabyName[] {
  let pool = [...BABY_NAMES[gender]];
  const letter = startsWith.trim().charAt(0).toLowerCase();
  if (letter) {
    const filtered = pool.filter((n) => n.name.toLowerCase().startsWith(letter));
    if (filtered.length) pool = filtered;
  }
  return shuffle(pool).slice(0, count);
}

/* ----------------------- SMART SUGGESTIONS ----------------------- */
// AI-style variant ideas derived from a chosen name. Instant + client-side.

export function generateBusinessVariants(name: string, count = 6): string[] {
  // Use the first word of the chosen name as the root.
  const root = name.split(/[\s&]+/)[0].replace(/[^a-zA-Z0-9]/g, "");
  const base = cap(root.toLowerCase());
  const out = new Set<string>();

  const builders: Array<() => string> = [
    () => base + pick(SUFFIXES),
    () => cap(pick(PREFIXES)) + base,
    () => base + " " + pick(DESCRIPTORS),
    () => "The " + base + " " + pick(DESCRIPTORS),
    () => base + cap(pick(["go", "now", "lab", "box", "pro", "max", "hq"])),
    () => "Get" + base,
    () => base + "." + pick(["io", "co", "app", "ai"]),
    () => cap(pick(["my", "try", "go"])) + base,
  ];

  let guard = 0;
  while (out.size < count && guard < count * 20) {
    out.add(pick(builders)());
    guard++;
  }
  return shuffle([...out]).slice(0, count);
}

const BABY_SUFFIXES = ["ah", "ie", "a", "elle", "ette", "ina", "lyn", "ya"];

export function generateBabyVariants(name: string, count = 6): string[] {
  const base = name.replace(/[^a-zA-Z]/g, "");
  const stem = base.slice(0, Math.max(2, base.length - 1));
  const out = new Set<string>();

  const builders: Array<() => string> = [
    () => cap(stem + pick(BABY_SUFFIXES)),
    () => cap(base + pick(["a", "ie", "y"])),
    () => cap(stem.slice(0, 3) + pick(BABY_SUFFIXES)),
    () => cap(base.slice(0, 1) + pick(["ae", "ia", "io", "ya"]) + stem.slice(1)),
    () => cap(base) + pick(["", "-Rose", "-Lee", "-Mae"]),
    () => cap(pick(["a", "e", "i"]) + base.toLowerCase()),
  ];

  let guard = 0;
  while (out.size < count && guard < count * 20) {
    const v = pick(builders)();
    if (v.toLowerCase() !== base.toLowerCase()) out.add(v);
    guard++;
  }
  return shuffle([...out]).slice(0, count);
}
