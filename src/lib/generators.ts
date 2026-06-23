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

export const BUSINESS_TYPES = [
  "Tech",
  "Clothing",
  "Restaurant",
  "Health",
  "Beauty",
  "Fitness",
  "Finance",
  "Education",
  "Real Estate",
  "Creative Agency",
] as const;

export const BUSINESS_INDUSTRIES = BUSINESS_TYPES;
export type BusinessStyle = "modern" | "luxury" | "professional" | "creative";

const PREFIXES = ["Neo", "Zen", "Aero", "Lumi", "Nova", "Vibe", "Peak", "Eco", "Hyper", "Aura", "Pure", "Bright", "Bold", "Swift", "True"];
const SUFFIXES = ["ly", "ify", "io", "labs", "hub", "works", "wave", "verse", "ster", "ora", "ium", "go", "spark", "flow", "nest"];
const DESCRIPTORS = ["Studio", "Collective", "Co", "Group", "House", "Digital", "Solutions", "Ventures", "& Co", "Agency"];

const BUSINESS_STYLE_WORDS: Record<BusinessStyle, { prefixes: string[]; suffixes: string[]; descriptors: string[] }> = {
  modern: {
    prefixes: PREFIXES,
    suffixes: SUFFIXES,
    descriptors: ["Labs", "Studio", "Hub", "Works", "Digital", "HQ"],
  },
  luxury: {
    prefixes: ["Luxe", "Maison", "Royal", "Velvet", "Noble", "Opal", "Aurum", "Elite"],
    suffixes: ["haus", "ora", "elle", "atelier", "society", "maison", "reserve"],
    descriptors: ["Atelier", "Maison", "House", "Reserve", "Collection", "Society"],
  },
  professional: {
    prefixes: ["Prime", "Core", "Vertex", "Trust", "Apex", "Pioneer", "Summit", "Clarity"],
    suffixes: ["pro", "group", "partners", "works", "base", "point", "line"],
    descriptors: ["Group", "Partners", "Solutions", "Consulting", "Associates", "Systems"],
  },
  creative: {
    prefixes: ["Spark", "Muse", "Wild", "Odd", "Fresh", "Pixel", "Craft", "Bloom"],
    suffixes: ["spark", "muse", "craft", "pop", "lab", "wave", "story"],
    descriptors: ["Studio", "Collective", "Workshop", "Lab", "House", "Agency"],
  },
};

const INDUSTRY_WORDS: Record<string, string[]> = {
  Tech: ["byte", "code", "logic", "cloud", "data", "stack", "pixel", "loop"],
  Clothing: ["thread", "vogue", "stitch", "luxe", "drape", "muse", "atelier", "chic"],
  Restaurant: ["fork", "feast", "crumb", "harvest", "brew", "spice", "savor", "graze"],
  Health: ["vital", "thrive", "glow", "calm", "bloom", "pulse", "balance", "nourish"],
  Beauty: ["glow", "bloom", "aura", "silk", "blush", "pure", "shine", "flora"],
  Fitness: ["fit", "pulse", "lift", "stride", "core", "flex", "move", "peak"],
  Finance: ["mint", "vault", "ledger", "capital", "asset", "fund", "coin", "trust"],
  Education: ["mind", "learn", "scholar", "spark", "guide", "campus", "mentor", "quill"],
  "Real Estate": ["nest", "abode", "haven", "estate", "dwell", "keystone", "manor", "anchor"],
  "Creative Agency": ["ink", "canvas", "form", "shade", "craft", "render", "frame", "palette"],
};

function parseKeywords(input: string): string[] {
  return input
    .split(/[\s,]+/)
    .map((word) => word.toLowerCase().replace(/[^a-z0-9]/g, ""))
    .filter(Boolean)
    .slice(0, 3);
}

export function generateBusinessNames(keyword: string, industry: string, style: BusinessStyle = "modern", count = 12): string[] {
  const keywords = parseKeywords(keyword);
  const words = INDUSTRY_WORDS[industry] ?? PREFIXES.map((p) => p.toLowerCase());
  const styleWords = BUSINESS_STYLE_WORDS[style];
  const results = new Set<string>();
  const root = keywords.length ? keywords.map(cap).join("") : pick(words);
  const spacedRoot = keywords.length ? keywords.map(cap).join(" ") : cap(root);

  const builders: Array<() => string> = [
    () => cap(pick(styleWords.prefixes)) + cap(root),
    () => cap(root) + pick(styleWords.suffixes),
    () => cap(root) + cap(pick(words)),
    () => cap(pick(words)) + cap(root),
    () => spacedRoot + " " + pick(styleWords.descriptors),
    () => cap(pick(styleWords.prefixes)) + cap(pick(words)),
    () => "The " + spacedRoot + " " + pick(styleWords.descriptors),
    () => cap(root) + pick(styleWords.suffixes) + " " + pick(DESCRIPTORS),
    () => cap(pick(words)) + pick(styleWords.suffixes),
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
export type BabyStyle = "modern" | "traditional" | "unique";

export const BABY_ORIGIN_RELIGIONS = [
  "Any",
  "Hindu / Sanskrit",
  "Muslim / Arabic",
  "Christian / Hebrew",
  "Western / European",
] as const;

const BABY_NAMES: Record<Gender, { name: string; origin: string; religion: string; style: BabyStyle; meaning: string }[]> = {
  girl: [
    { name: "Aria", origin: "Italian", religion: "Western / European", style: "modern", meaning: "Air, melody" },
    { name: "Maya", origin: "Sanskrit", religion: "Hindu / Sanskrit", style: "modern", meaning: "Illusion, dream" },
    { name: "Luna", origin: "Latin", religion: "Western / European", style: "modern", meaning: "Moon" },
    { name: "Saanvi", origin: "Sanskrit", religion: "Hindu / Sanskrit", style: "traditional", meaning: "Goddess Lakshmi" },
    { name: "Isla", origin: "Scottish", religion: "Western / European", style: "modern", meaning: "Island" },
    { name: "Zoya", origin: "Arabic", religion: "Muslim / Arabic", style: "modern", meaning: "Shining, alive" },
    { name: "Nova", origin: "Latin", religion: "Western / European", style: "unique", meaning: "New star" },
    { name: "Anaya", origin: "Hindi", religion: "Hindu / Sanskrit", style: "modern", meaning: "Caring, protected" },
    { name: "Elara", origin: "Greek", religion: "Western / European", style: "unique", meaning: "Bright, shining" },
    { name: "Myra", origin: "Latin", religion: "Western / European", style: "traditional", meaning: "Sweet, fragrant" },
    { name: "Ivy", origin: "English", religion: "Western / European", style: "unique", meaning: "Faithfulness" },
    { name: "Aaradhya", origin: "Sanskrit", religion: "Hindu / Sanskrit", style: "traditional", meaning: "Worshipped" },
    { name: "Maryam", origin: "Arabic", religion: "Muslim / Arabic", style: "traditional", meaning: "Beloved" },
    { name: "Hannah", origin: "Hebrew", religion: "Christian / Hebrew", style: "traditional", meaning: "Grace" },
  ],
  boy: [
    { name: "Aarav", origin: "Sanskrit", religion: "Hindu / Sanskrit", style: "modern", meaning: "Peaceful" },
    { name: "Liam", origin: "Irish", religion: "Western / European", style: "modern", meaning: "Strong-willed warrior" },
    { name: "Vihaan", origin: "Sanskrit", religion: "Hindu / Sanskrit", style: "modern", meaning: "Dawn, new beginning" },
    { name: "Ezra", origin: "Hebrew", religion: "Christian / Hebrew", style: "traditional", meaning: "Helper" },
    { name: "Kai", origin: "Hawaiian", religion: "Western / European", style: "unique", meaning: "Sea" },
    { name: "Reyansh", origin: "Sanskrit", religion: "Hindu / Sanskrit", style: "modern", meaning: "Ray of light" },
    { name: "Atlas", origin: "Greek", religion: "Western / European", style: "unique", meaning: "Enduring" },
    { name: "Arjun", origin: "Sanskrit", religion: "Hindu / Sanskrit", style: "traditional", meaning: "Bright, shining" },
    { name: "Noah", origin: "Hebrew", religion: "Christian / Hebrew", style: "modern", meaning: "Rest, comfort" },
    { name: "Ishaan", origin: "Sanskrit", religion: "Hindu / Sanskrit", style: "traditional", meaning: "Sun, lord" },
    { name: "Leo", origin: "Latin", religion: "Western / European", style: "modern", meaning: "Lion" },
    { name: "Dhruv", origin: "Sanskrit", religion: "Hindu / Sanskrit", style: "traditional", meaning: "Pole star, constant" },
    { name: "Zayan", origin: "Arabic", religion: "Muslim / Arabic", style: "modern", meaning: "Graceful" },
    { name: "Yusuf", origin: "Arabic", religion: "Muslim / Arabic", style: "traditional", meaning: "God increases" },
  ],
  neutral: [
    { name: "River", origin: "English", religion: "Western / European", style: "modern", meaning: "Flowing water" },
    { name: "Sky", origin: "English", religion: "Western / European", style: "unique", meaning: "The heavens" },
    { name: "Avery", origin: "English", religion: "Western / European", style: "modern", meaning: "Ruler of elves" },
    { name: "Rowan", origin: "Irish", religion: "Western / European", style: "traditional", meaning: "Little red one" },
    { name: "Sage", origin: "Latin", religion: "Western / European", style: "unique", meaning: "Wise, herb" },
    { name: "Noor", origin: "Arabic", religion: "Muslim / Arabic", style: "modern", meaning: "Light" },
    { name: "Ezra", origin: "Hebrew", religion: "Christian / Hebrew", style: "traditional", meaning: "Helper" },
    { name: "Kiran", origin: "Sanskrit", religion: "Hindu / Sanskrit", style: "modern", meaning: "Ray of light" },
    { name: "Phoenix", origin: "Greek", religion: "Western / European", style: "unique", meaning: "Rising bird" },
    { name: "Aanya", origin: "Sanskrit", religion: "Hindu / Sanskrit", style: "modern", meaning: "Grace" },
    { name: "Ari", origin: "Hebrew", religion: "Christian / Hebrew", style: "unique", meaning: "Lion" },
    { name: "Devi", origin: "Sanskrit", religion: "Hindu / Sanskrit", style: "traditional", meaning: "Divine" },
  ],
};

export interface BabyName {
  name: string;
  origin: string;
  religion: string;
  style: BabyStyle;
  meaning: string;
}

export function generateBabyNames(
  gender: Gender,
  startsWith: string,
  originReligion = "Any",
  style: BabyStyle = "modern",
  count = 9,
): BabyName[] {
  let pool = [...BABY_NAMES[gender]];
  if (originReligion !== "Any") {
    const filteredByOrigin = pool.filter((n) => n.religion === originReligion);
    if (filteredByOrigin.length) pool = filteredByOrigin;
  }
  const filteredByStyle = pool.filter((n) => n.style === style);
  if (filteredByStyle.length) pool = filteredByStyle;
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
