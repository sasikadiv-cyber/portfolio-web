export const PROFILE = {
  name: "Sasika Randunuge",
  initials: "SR",
  role: "Web Developer · UI/UX & Graphic Designer",
  location: "Kandy, Sri Lanka",
  timezone: "Asia/Colombo",
  email: "sasikadiv@gmail.com",
  phone: "+94 71 234 5678",
  intro:
    "I design and build for the web — interfaces that look considered, and code that keeps them fast and accessible. Alongside development I do brand and graphic design, so the whole presence of a business feels like one idea.",
};

export const NAV = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  outcome: string;
  tags: string[];
  image: string;
};

export const PROJECTS: Project[] = [
  {
    id: "aurum",
    title: "Aurum",
    client: "Aurum Parfums",
    category: "Graphic design & e-commerce build",
    year: "2025",
    description:
      "A complete identity and online store for a fragrance house — designed in Figma and built as a fast Shopify storefront.",
    outcome: "+164% online revenue in the first two quarters",
    tags: ["Identity", "Shopify", "Front-end"],
    image:
      "https://images.pexels.com/photos/11417443/pexels-photo-11417443.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "vanta",
    title: "Vanta Pay",
    client: "Vanta Financial",
    category: "UI/UX design",
    year: "2024",
    description:
      "Product design for a mobile banking app — dense data presented calmly, with every state designed and prototyped before build.",
    outcome: "Onboarding time reduced by 51%",
    tags: ["Mobile app", "UX research", "Design system"],
    image:
      "https://images.pexels.com/photos/6406691/pexels-photo-6406691.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "monolith",
    title: "Monolith",
    client: "Monolith Architects",
    category: "Website — design & build",
    year: "2024",
    description:
      "A quiet portfolio site for an architecture studio, where the photography carries the page and the interface stays out of the way.",
    outcome: "Average session time of 4 minutes",
    tags: ["Web design", "React", "CMS"],
    image:
      "https://images.pexels.com/photos/15663488/pexels-photo-15663488.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "noir",
    title: "Noir",
    client: "Noir Cosmetics",
    category: "Design system",
    year: "2023",
    description:
      "A 240-component library in Figma and code so regional teams could ship consistent work without a designer in every room.",
    outcome: "Launch cycle shortened from months to days",
    tags: ["Tokens", "Documentation", "React"],
    image:
      "https://images.pexels.com/photos/13186049/pexels-photo-13186049.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
];

export const SERVICES = [
  {
    title: "Web development",
    text: "Interfaces I design, built properly — semantic HTML, React and TypeScript, measured for speed and accessibility.",
    items: ["React", "TypeScript", "Tailwind", "Performance"],
  },
  {
    title: "UI/UX design",
    text: "Research, information architecture, wireframes and prototypes — tested before a single screen is polished.",
    items: ["UX research", "Wireframing", "Prototyping", "Usability testing"],
  },
  {
    title: "Graphic & brand design",
    text: "Logotypes, identity systems and the print and social graphics a business needs to look like one idea everywhere.",
    items: ["Logotype", "Guidelines", "Print", "Social"],
  },
  {
    title: "Design systems",
    text: "Token-driven component libraries in Figma and code, documented so teams can move quickly without drifting.",
    items: ["Tokens", "Components", "Documentation", "Handover"],
  },
];

export const EXPERIENCE = [
  {
    period: "2019 — Present",
    role: "Independent Developer & Designer",
    org: "Own practice, Kandy",
    note: "Web development and design work for founders, startups and small businesses.",
  },
  {
    period: "2016 — 2019",
    role: "UI/UX Designer",
    org: "Northline, Singapore",
    note: "Designed product flows for a payments platform serving four regional markets.",
  },
  {
    period: "2013 — 2016",
    role: "Graphic Designer",
    org: "Studio Mora, Kandy",
    note: "Identity, print and digital work for hospitality, retail and cultural clients.",
  },
];

export const STATS = [
  { value: "3+", label: "Years of practice" },
  { value: "80+", label: "Projects delivered" },
  { value: "9", label: "Countries" },
  { value: "6", label: "Clients per year" },
];

export const CLIENTS = [
  "Aurum Parfums",
  "Vanta Financial",
  "Monolith Architects",
  "Noir Cosmetics",
  "Ascent Property",
  "Horo Timepieces",
];

export const TESTIMONIALS = [
  {
    quote:
      "Sasika took our fragrance house from a logo on a napkin to a full identity and a store that feels like the brand. Revenue followed within two quarters.",
    name: "Camille Fouret",
    role: "Head of Brand, Aurum Parfums",
    rating: 5,
  },
  {
    quote:
      "The calmest banking interface our users have seen. Onboarding time dropped by half within a quarter of the redesign.",
    name: "Daniel Reyes",
    role: "Product Lead, Vanta Financial",
    rating: 5,
  },
  {
    quote:
      "Our photography finally has a home that stays out of its way. The site is quiet, fast, and endlessly praised by clients.",
    name: "Elena Marlowe",
    role: "Principal, Monolith Architects",
    rating: 5,
  },
  {
    quote:
      "Nine regional teams now ship consistent work without a designer in every room. The system paid for itself in the first month.",
    name: "Priya Nair",
    role: "Design Director, Noir Cosmetics",
    rating: 5,
  },
  {
    quote:
      "From naming to a platform that loads in under a second on 3G — one person, end to end, and everything on time.",
    name: "James Okafor",
    role: "Managing Director, Ascent Property",
    rating: 4,
  },
  {
    quote:
      "An identity drawn from the geometry of our escapement wheel. Customers still mention the campaign a year later.",
    name: "Marta Keller",
    role: "Creative Lead, Horo Timepieces",
    rating: 5,
  },
];

export const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

export const PORTRAIT =
  "https://images.pexels.com/photos/38017833/pexels-photo-38017833.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=960";

/* ---------- full archive page ---------- */
export type ArchiveCategory = "Website" | "UI/UX" | "Graphic Design";

export type ArchiveItem = {
  id: string;
  n: string;
  title: string;
  client: string;
  category: ArchiveCategory;
  year: string;
  blurb: string;
  tags: string[];
  image: string;
  /** real live URL if the project is publicly online — otherwise omit */
  liveUrl?: string;
};

export const ARCHIVE: ArchiveItem[] = [
  {
    id: "thomians",
    n: "01",
    title: "Thomians Media",
    client: "Thomians Media Unit",
    category: "Website",
    year: "2026",
    blurb:
      "A live media platform for a school's broadcasting unit — event coverage, videos and announcements, designed and built end to end, and running in production.",
    tags: ["Web design", "Front-end", "Live platform"],
    image: "/images/thomian.webp",
    liveUrl: "https://live.thomiansmedia.us/",
  },
  {
    id: "aurum",
    n: "02",
    title: "Aurum",
    client: "Aurum Parfums",
    category: "Graphic Design",
    year: "2025",
    blurb:
      "A complete identity and storefront for a fragrance house — the logotype, the packaging line and the Shopify build it all lives on.",
    tags: ["Identity", "Shopify", "Front-end"],
    image:
      "https://images.pexels.com/photos/11417443/pexels-photo-11417443.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1400",
  },
  {
    id: "vanta",
    n: "03",
    title: "Vanta Pay",
    client: "Vanta Financial",
    category: "UI/UX",
    year: "2024",
    blurb:
      "Product design for a mobile banking app — research, flows and a calm interface language for dense financial data.",
    tags: ["Mobile app", "UX research", "Design system"],
    image:
      "https://images.pexels.com/photos/6406691/pexels-photo-6406691.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1400",
  },
  {
    id: "monolith",
    n: "04",
    title: "Monolith",
    client: "Monolith Architects",
    category: "Website",
    year: "2024",
    blurb:
      "A quiet portfolio site where the architecture carries the page. Designed in sections, built in React, edited through a CMS.",
    tags: ["Web design", "React", "CMS"],
    image:
      "https://images.pexels.com/photos/15663488/pexels-photo-15663488.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1400",
  },
  {
    id: "noir",
    n: "05",
    title: "Noir",
    client: "Noir Cosmetics",
    category: "UI/UX",
    year: "2023",
    blurb:
      "A token-driven design system in Figma and code so nine regional teams could ship consistent work without drift.",
    tags: ["Tokens", "Documentation", "React"],
    image:
      "https://images.pexels.com/photos/13186049/pexels-photo-13186049.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1400",
  },
  {
    id: "ascent",
    n: "06",
    title: "Ascent",
    client: "Ascent Property",
    category: "Website",
    year: "2023",
    blurb:
      "From naming to a live listings platform in seven months — identity, search experience and a front-end that loads under a second on 3G.",
    tags: ["Naming", "Platform", "Front-end"],
    image:
      "https://images.pexels.com/photos/5091783/pexels-photo-5091783.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1400",
  },
  {
    id: "horo",
    n: "07",
    title: "Horo",
    client: "Horo Timepieces",
    category: "Graphic Design",
    year: "2022",
    blurb:
      "An identity drawn from the geometry of the escapement wheel — a bespoke serif, campaign art direction and retail print.",
    tags: ["Type design", "Art direction", "Print"],
    image:
      "https://images.pexels.com/photos/36475261/pexels-photo-36475261.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1400",
  },
  {
    id: "meridian",
    n: "08",
    title: "Meridian",
    client: "Meridian Journal",
    category: "Website",
    year: "2021",
    blurb:
      "An editorial reading experience for long-form essays — typographic rhythm, footnotes and a paywall that doesn't insult the reader.",
    tags: ["Editorial", "Typography", "Accessibility"],
    image:
      "https://images.pexels.com/photos/38673756/pexels-photo-38673756.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1400",
  },
  {
    id: "obsidian",
    n: "09",
    title: "Obsidian",
    client: "Obsidian Studio",
    category: "Graphic Design",
    year: "2020",
    blurb:
      "Naming and identity for a photography studio — a strict wordmark, a monochrome paper suite and one usable colour.",
    tags: ["Naming", "Logotype", "Guidelines"],
    image:
      "https://images.pexels.com/photos/9202860/pexels-photo-9202860.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1400",
  },
];

/* ---------- case study detail pages ---------- */

/** pexels photo helper — any crop from a verified photo id */
const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export type StackGroup = { group: string; items: string[] };

export type ProjectScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

/** measured outcomes for UI/UX case studies */
export type ResearchStat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

/** identity palette — graphic design case studies */
export type PaletteColor = { name: string; hex: string; usage: string };

/** type specimen — graphic design case studies */
export type Typeface = {
  family: string;
  role: string;
  sample: string;
  variant: "serif" | "sans" | "mono";
};

export type ProjectDetail = {
  id: string;
  overview: string[];
  role: string;
  timeline: string;
  deliverables: string[];
  stack: StackGroup[];
  /** websites — lighthouse audit rings */
  scores?: ProjectScores;
  /** ui/ux — measured outcome numbers */
  stats?: ResearchStat[];
  /** graphic design — identity palette + type specimens */
  palette?: PaletteColor[];
  typefaces?: Typeface[];
  /** browser/phone preview shots + the URL shown in the chrome bar */
  screens: { desktop: string; mobile: string; url: string };
  gallery: { src: string; caption: string }[];
};

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  /* ============================== WEBSITES ============================== */
  thomians: {
    id: "thomians",
    overview: [
      "The Thomians Media Unit needed a permanent home for everything it produced — match-day coverage, event recaps, announcements and an archive of years of footage. What existed was scattered across social platforms with no identity of its own.",
      "I designed and built the platform end to end: a bold editorial layout that puts the latest coverage first, a video-first architecture tuned for slow connections, and an admin flow the students can run themselves. It is live in production and updated by the unit every week.",
    ],
    role: "Design & development — end to end",
    timeline: "3 months · 2026",
    deliverables: [
      "Brand refresh",
      "Website design",
      "Front-end build",
      "Video pipeline",
      "Deployment & handover",
    ],
    stack: [
      { group: "Framework", items: ["React 19", "Vite"] },
      { group: "Languages", items: ["TypeScript", "HTML", "CSS"] },
      { group: "Styling", items: ["Tailwind CSS", "Framer Motion"] },
      { group: "Platform", items: ["Cloudflare", "Nginx"] },
    ],
    scores: { performance: 94, accessibility: 100, bestPractices: 100, seo: 100 },
    screens: {
      desktop: "/images/thomian.webp",
      mobile: px(15075135, 760, 1560),
      url: "live.thomiansmedia.us",
    },
    gallery: [
      { src: px(13710029, 1400, 1000), caption: "Coverage rigs before kickoff" },
      { src: px(19623302, 1200, 1500), caption: "Field unit on assignment" },
      { src: px(33499834, 1400, 1000), caption: "Outdoor event coverage crew" },
      { src: px(15075135, 1200, 1500), caption: "Night coverage — bokeh test" },
    ],
  },
  monolith: {
    id: "monolith",
    overview: [
      "Monolith's work is quiet and heavy — board-formed concrete, long shadows. The site had to behave the same way: photography that fills the page and an interface that disappears.",
      "Built in Next.js with a Sanity studio the architects update themselves, the site strips navigation down to a single index. Images ship as next-gen formats with per-breakpoint crops — it loads like a document, not an app.",
    ],
    role: "Design & build",
    timeline: "4 months · 2024",
    deliverables: [
      "Art direction",
      "Website design",
      "Next.js build",
      "CMS modelling",
      "Launch & training",
    ],
    stack: [
      { group: "Framework", items: ["Next.js", "React"] },
      { group: "Languages", items: ["TypeScript", "CSS"] },
      { group: "CMS", items: ["Sanity"] },
      { group: "Platform", items: ["Vercel", "Vercel Image CDN"] },
    ],
    scores: { performance: 96, accessibility: 100, bestPractices: 100, seo: 100 },
    screens: {
      desktop: px(15663488, 1440, 1000),
      mobile: px(28506788, 760, 1560),
      url: "monolith.archi",
    },
    gallery: [
      { src: px(9473066, 1400, 1000), caption: "Facade rhythm — case photography" },
      { src: px(28506788, 1200, 1500), caption: "White volume against sky" },
      { src: px(35251110, 1400, 1000), caption: "Madrid structure, study 03" },
      { src: px(31735052, 1200, 1500), caption: "Geometric detail, exterior" },
    ],
  },
  ascent: {
    id: "ascent",
    overview: [
      "Ascent started as a name on a whiteboard and ended as a live property platform — identity, search experience and front-end build in a single engagement.",
      "The brief was speed: under a second on hotel wifi. Static-first pages, edge-cached listings and an Algolia index kept search feeling instant even on 3G.",
    ],
    role: "Naming, identity, design & build",
    timeline: "7 months · 2023",
    deliverables: [
      "Naming & identity",
      "Listings platform",
      "Search experience",
      "Front-end build",
      "Analytics setup",
    ],
    stack: [
      { group: "Framework", items: ["Next.js", "React"] },
      { group: "Languages", items: ["TypeScript", "CSS"] },
      { group: "Services", items: ["Algolia", "Mapbox", "Vercel Analytics"] },
    ],
    scores: { performance: 97, accessibility: 98, bestPractices: 100, seo: 100 },
    screens: {
      desktop: px(5091783, 1440, 1000),
      mobile: px(7031604, 760, 1560),
      url: "ascentproperty.com",
    },
    gallery: [
      { src: px(7031604, 1400, 1000), caption: "Villa listing — hero photography" },
      { src: px(7031600, 1200, 1500), caption: "Courtyard set, summer campaign" },
      { src: px(8134821, 1400, 1000), caption: "Two-story residence exterior" },
      { src: px(7587470, 1200, 1500), caption: "Brick facade, low angle" },
    ],
  },
  meridian: {
    id: "meridian",
    overview: [
      "Meridian publishes four-thousand-word essays. The reading experience had to hold attention for twenty minutes without a single trick.",
      "Typographic rhythm did the work: a measure-capped column, marginalia instead of end-footnotes, and a paywall that asks politely at minute three instead of blocking at second one.",
    ],
    role: "Design & build",
    timeline: "5 months · 2021",
    deliverables: [
      "Editorial design system",
      "Reading experience",
      "Paywall flow",
      "Next.js build",
      "Stripe integration",
    ],
    stack: [
      { group: "Framework", items: ["Next.js", "MDX"] },
      { group: "Languages", items: ["TypeScript", "CSS"] },
      { group: "Services", items: ["Stripe", "PostgreSQL"] },
    ],
    scores: { performance: 98, accessibility: 100, bestPractices: 100, seo: 100 },
    screens: {
      desktop: px(38673756, 1440, 1000),
      mobile: px(4467632, 760, 1560),
      url: "meridianjournal.com",
    },
    gallery: [
      { src: px(4271610, 1400, 1000), caption: "Sunday edition — flat lay" },
      { src: px(8685533, 1200, 1500), caption: "Print pairing studies" },
      { src: px(4467632, 1400, 1000), caption: "Reading habits research" },
      { src: px(4792089, 1200, 1500), caption: "Slow morning, long read" },
    ],
  },

  /* ============================ GRAPHIC DESIGN ============================ */
  aurum: {
    id: "aurum",
    overview: [
      "Aurum launched with a single fragrance and a napkin sketch. The brief was a house that could sit beside the old French maisons — without pretending to be one.",
      "I drew the logotype around a single serif cut at a steeper angle, art-directed the packaging line on uncoated champagne stock, and carried the system into a Shopify storefront trimmed to a three-tap checkout.",
    ],
    role: "Identity, packaging & art direction",
    timeline: "7 months · 2025",
    deliverables: [
      "Logotype & monogram",
      "Packaging line — 6 SKUs",
      "Campaign art direction",
      "Print & stationery suite",
      "Shopify storefront",
    ],
    stack: [
      { group: "Identity", items: ["Figma", "Illustrator", "Glyphs"] },
      { group: "Print", items: ["InDesign", "Foil & emboss spec", "Offset"] },
      { group: "Digital", items: ["Shopify (Liquid)", "Photoshop"] },
    ],
    palette: [
      { name: "Noir", hex: "#0A0A0A", usage: "Primary field — caps, boxes, campaign shadows" },
      { name: "Gold leaf", hex: "#C9A227", usage: "The one accent — logotype, seals, highlights" },
      { name: "Champagne", hex: "#E8DCC4", usage: "Paper stock across the packaging line" },
      { name: "Oxblood", hex: "#4A1622", usage: "Reserved for limited editions" },
    ],
    typefaces: [
      {
        family: "Canela Deck",
        role: "Display — logotype & headlines",
        sample: "Fragrance of permanence",
        variant: "serif",
      },
      {
        family: "Neue Haas Grotesk",
        role: "Text — commerce & captions",
        sample: "Shop the collection",
        variant: "sans",
      },
    ],
    screens: {
      desktop: px(11417443, 1440, 1000),
      mobile: px(36834269, 760, 1560),
      url: "aurumparfums.com",
    },
    gallery: [
      { src: px(36779953, 1400, 1000), caption: "Signature scent — campaign still" },
      { src: px(36779955, 1200, 1500), caption: "Packaging studies on silk" },
      { src: px(36834269, 1400, 1000), caption: "Wild Black — limited edition" },
      { src: px(36779951, 1200, 1500), caption: "Bottle detail, late light" },
    ],
  },
  horo: {
    id: "horo",
    overview: [
      "A watchmaker that machines its own escapements wanted an identity drawn from the same geometry as its movements — nothing decorative, everything earned.",
      "The mark is a section through the escapement wheel; the serif is cut in Glyphs from the movement's curves. I carried the system through campaign art direction, retail print and a quiet launch microsite.",
    ],
    role: "Identity & art direction",
    timeline: "6 months · 2022",
    deliverables: [
      "Logotype & monogram",
      "Custom serif typeface — 2 cuts",
      "Campaign art direction",
      "Retail print suite",
      "Launch campaign assets",
    ],
    stack: [
      { group: "Type design", items: ["Glyphs", "Custom serif family"] },
      { group: "Design", items: ["Illustrator", "InDesign", "After Effects"] },
      { group: "Print", items: ["Letterpress", "Foil stamp", "Embossing"] },
    ],
    palette: [
      { name: "Midnight", hex: "#0B0B0C", usage: "Primary field — dials & evening stock" },
      { name: "Champagne", hex: "#B08D57", usage: "The accent — hands, foils, seals" },
      { name: "Steel", hex: "#8A8D91", usage: "Secondary — spec sheets & captions" },
      { name: "Bone", hex: "#EFEAE0", usage: "Paper & retail environment" },
    ],
    typefaces: [
      {
        family: "Horo Serif — custom cut",
        role: "Logotype & movement notes",
        sample: "Échappement, 1892",
        variant: "serif",
      },
      {
        family: "Suisse Int'l Mono",
        role: "Serial numbers & specifications",
        sample: "CAL. 11 — 28 800 A/h",
        variant: "mono",
      },
    ],
    screens: {
      desktop: px(36475261, 1440, 1000),
      mobile: px(3829441, 760, 1560),
      url: "horo-timepieces.ch",
    },
    gallery: [
      { src: px(29255439, 1400, 1000), caption: "Chronograph calibre — macro" },
      { src: px(13206752, 1200, 1500), caption: "Dial detail, low light" },
      { src: px(3829441, 1400, 1000), caption: "Heritage model on leather" },
      { src: px(6166169, 1200, 1500), caption: "Autumn campaign still life" },
    ],
  },
  obsidian: {
    id: "obsidian",
    overview: [
      "A photography studio that prints in silver gelatin wanted an identity as strict as its process — no decoration the darkroom could not justify.",
      "One wordmark, one usable colour and a paper suite in uncoated monochrome. The guidelines fit on eleven pages; the discipline was the point.",
    ],
    role: "Naming & identity",
    timeline: "3 months · 2020",
    deliverables: [
      "Naming",
      "Wordmark — one weight",
      "Stationery & print suite",
      "Usage guidelines — 11 pages",
      "Digital kit",
    ],
    stack: [
      { group: "Identity", items: ["Figma", "Illustrator"] },
      { group: "Print", items: ["InDesign", "Letterpress spec"] },
      { group: "Guidelines", items: ["11-page usage book"] },
    ],
    palette: [
      { name: "Lamp black", hex: "#111111", usage: "Primary field — plates & frames" },
      { name: "Signal red", hex: "#B53A24", usage: "The one usable colour — sparingly" },
      { name: "Concrete", hex: "#6E6E6A", usage: "Secondary text & captions" },
      { name: "Newsprint", hex: "#F2EFE8", usage: "Uncoated paper everywhere" },
    ],
    typefaces: [
      {
        family: "Obsidian Grotesk",
        role: "Wordmark & wayfinding",
        sample: "Silver, fixed in light",
        variant: "sans",
      },
      {
        family: "Studio Mono",
        role: "Captions & film notes",
        sample: "ISO 400 · f/8 · 1/125",
        variant: "mono",
      },
    ],
    screens: {
      desktop: px(9202860, 1440, 1000),
      mobile: px(4774367, 760, 1560),
      url: "obsidian.studio",
    },
    gallery: [
      { src: px(4774367, 1400, 1000), caption: "Silver gelatin heritage" },
      { src: px(3526906, 1200, 1500), caption: "Voigtländer VSL 1 — bench" },
      { src: px(6598819, 1400, 1000), caption: "Tools of the bench" },
      { src: px(989863, 1200, 1500), caption: "Helios optics study" },
    ],
  },

  /* ================================ UI/UX ================================ */
  vanta: {
    id: "vanta",
    overview: [
      "Vanta's banking app carried institutional density — multi-currency accounts, statements and approvals — squeezed onto consumer screens. Users were getting lost before their first transfer.",
      "Over two quarters I mapped every flow, ran twelve user interviews and rebuilt the information architecture around the three jobs people do daily. Every state — empty, loading, error, success — was designed and prototyped before build.",
    ],
    role: "Product design — research to handoff",
    timeline: "5 months · 2024",
    deliverables: [
      "UX research & interviews",
      "Flow mapping — 98 flows",
      "UI design system",
      "Interactive prototypes",
      "Handoff specs & tokens",
    ],
    stack: [
      { group: "Framework", items: ["React Native", "Expo"] },
      { group: "Languages", items: ["TypeScript"] },
      { group: "Design", items: ["Figma", "Principle"] },
      { group: "Research", items: ["Maze", "Dovetail"] },
    ],
    stats: [
      {
        value: 51,
        prefix: "−",
        suffix: "%",
        label: "Onboarding time",
        note: "one quarter after the redesign shipped",
      },
      {
        value: 12,
        label: "User interviews",
        note: "two rounds, moderated, before a screen was drawn",
      },
      {
        value: 98,
        label: "Flows mapped",
        note: "every empty, loading and error state designed",
      },
      {
        value: 4.8,
        decimals: 1,
        label: "App-store rating",
        note: "up from 3.9 before the redesign",
      },
    ],
    screens: {
      desktop: px(6406691, 1440, 1000),
      mobile: px(33785776, 760, 1560),
      url: "app.vantapay.io",
    },
    gallery: [
      { src: px(6969663, 1400, 1000), caption: "Payments in an everyday context" },
      { src: px(33785776, 1200, 1500), caption: "Portfolio growth states" },
      { src: px(32269244, 1400, 1000), caption: "Multi-currency travel flows" },
      { src: px(6406691, 1200, 1500), caption: "Wallet home — light theme" },
    ],
  },
  noir: {
    id: "noir",
    overview: [
      "Nine regional teams shipping daily, and every team's buttons looked different. Noir did not need another redesign — it needed a system.",
      "I audited north of four hundred screens down to 240 components, built a token pipeline from Figma variables straight into React themes, and wrote the documentation so the system outlives me.",
    ],
    role: "Design systems lead",
    timeline: "8 months · 2023",
    deliverables: [
      "Design tokens",
      "240-component library",
      "Figma & React parity",
      "Documentation site",
      "Team training",
    ],
    stack: [
      { group: "Framework", items: ["React", "Storybook"] },
      { group: "Languages", items: ["TypeScript", "CSS custom properties"] },
      { group: "Tooling", items: ["Style Dictionary", "Figma Variables", "Chromatic"] },
    ],
    stats: [
      {
        value: 240,
        label: "Components shipped",
        note: "audited down from 400+ screens",
      },
      {
        value: 9,
        label: "Regional teams",
        note: "all onboarded in the first quarter",
      },
      {
        value: 96,
        suffix: "%",
        label: "Adoption in month one",
        note: "measured across all shipped surfaces",
      },
      {
        value: 6,
        suffix: "×",
        label: "Faster launch cycle",
        note: "from months of drift to days of assembly",
      },
    ],
    screens: {
      desktop: px(13186049, 1440, 1000),
      mobile: px(5632324, 760, 1560),
      url: "system.noir.co",
    },
    gallery: [
      { src: px(4202321, 1400, 1000), caption: "Component photography — shelf set" },
      { src: px(5632324, 1200, 1500), caption: "Palette studies, pastel range" },
      { src: px(6167445, 1400, 1000), caption: "Jar system with natural props" },
      { src: px(6167444, 1200, 1500), caption: "Marble surface arrangements" },
    ],
  },
};
