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

/* ---------- cinematic imagery ----------
   HERO_IMAGE drives the home hero; each inner page has its own atmosphere. */
export const HERO_IMAGE =
  "https://images.pexels.com/photos/28901526/pexels-photo-28901526.jpeg?auto=compress&cs=tinysrgb&w=1920";

/** cinematic banner on the inner pages — flip enabled to false to remove it */
export const BANNER = {
  enabled: true,
  images: {
    work: {
      src: "https://images.pexels.com/photos/30820149/pexels-photo-30820149.jpeg?auto=compress&cs=tinysrgb&w=1600",
      position: "center 52%",
    },
    about: {
      src: "https://images.pexels.com/photos/13316185/pexels-photo-13316185.jpeg?auto=compress&cs=tinysrgb&w=1600",
      position: "center 48%",
    },
    services: {
      src: "https://images.pexels.com/photos/17279851/pexels-photo-17279851.jpeg?auto=compress&cs=tinysrgb&w=1600",
      position: "center 54%",
    },
    contact: {
      src: "https://images.pexels.com/photos/8715123/pexels-photo-8715123.jpeg?auto=compress&cs=tinysrgb&w=1600",
      position: "center 50%",
    },
  },
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
    id: "thomiansmedia",
    title: "Thomians' Media",
    client: "Thomians Media Unit",
    category: "Website — live platform",
    year: "2026",
    description:
      "The home of a school broadcasting unit — live match coverage, real-time scores and an archive of years of footage, all run from one CMS.",
    outcome: "Live in production, updated weekly by the students",
    tags: ["Live broadcast", "Realtime scores", "CMS"],
    image: "https://i.ibb.co/mFCks5Yr/thomiansmedia.webp",
  },
  {
    id: "nova",
    title: "Nova",
    client: "Hobby Project",
    category: "E-commerce website",
    year: "2026",
    description:
      "A full commerce stack built end to end — storefront, cart, Stripe checkout, buyer accounts, order and stock management, and an admin panel for the team.",
    outcome: "Storefront to admin, one build",
    tags: ["Next.js", "Stripe", "Admin panel"],
    image: "https://i.ibb.co/j92R3dg7/novastorelk.webp",
  },
  {
    id: "photography",
    title: "Ravin Fernando",
    client: "Hobby Project",
    category: "Website — design & build",
    year: "2026",
    description:
      "A monograph for a photographer — editorial type, cinematic pacing and full-bleed imagery that gets out of the photograph's way.",
    outcome: "A gallery that behaves like a printed folio",
    tags: ["Web design", "React", "Vite"],
    image: "https://i.ibb.co/33N38fh/photography-site.webp",
  },
];

/* ---------- image & layout controls ----------
   Adjust the case-study media from here — no component edits needed. */
export const MEDIA = {
  /** desktop screenshot ratio (width / height) inside the browser frame */
  desktopRatio: "20 / 10",
  /** which part of a tall screenshot stays visible — "top" | "center" | "bottom" */
  desktopAnchor: "top",
  /** phone screen ratio inside the device frame */
  mobileRatio: "9 / 19",
  mobileAnchor: "top",
  /** phone width (px) shown in the desktop / mobile toggle */
  mobileWidth: 300,
  /** the UI/UX hero — desktop shot width as a % of the page */
  heroDesktopWidth: 80,
  /** the UI/UX hero — overlapping phone width as a % of the page */
  heroPhoneWidth: 24,
  heroPhoneMin: 210,
  heroPhoneMax: 280,
  /** phone width (px) below the desktop shot on small screens */
  heroPhoneMobile: 250,
  /** gallery image height (px) from the lg breakpoint up */
  galleryHeight: 380,
  /** custom cursor — set enabled to false to bring the normal arrow back */
  cursor: {
    enabled: true,
    /** centre dot size (px) */
    dot: 8,
    /** ring size (px) while idling */
    ring: 34,
    /** ring size (px) while hovering a link or button */
    ringHover: 58,
  },
};

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
  /*{ label: "LinkedIn", href: "https://linkedin.com" },*/
  { label: "GitHub", href: "https://github.com/sasikadiv-cyber" },
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
    id: "thomiansmedia",
    n: "01",
    title: "Thomians' Media",
    client: "Thomians Media Unit",
    category: "Website",
    year: "2026",
    blurb:
      "A complete website for a live broadcasting platform and real-time score updates with a rich CMS",
    tags: ["Web design", "Front-end", "Live platform"],
    image: "https://i.ibb.co/mFCks5Yr/thomiansmedia.webp",
    liveUrl: "https://live.thomiansmedia.us/",
  },
  {
    id: "nova",
    n: "02",
    title: "Nova",
    client: "Hobby Project",
    category: "Website",
    year: "2026",
    blurb:
      "A digital flagship rooted in quiet luxury — editorial typography, restrained interactions and an end-to-end commerce experience.",
    tags: ["TypeScript", "Next.js", "Front-end", "Back-end"],
    image: "https://i.ibb.co/j92R3dg7/novastorelk.webp",
    liveUrl: "https://novastorelk.vercel.app/",
  },
  {
    id: "photography",
    n: "03",
    title: "Ravin Fernando",
    client: "Hobby Project",
    category: "Website",
    year: "2026",
    blurb:
      "A visual monograph drawn from geometry, shadow and silence — editorial serif typography, cinematic pacing and an archival photography showcase.",
    tags: ["Cinematic", "React", "Vite", "Accessibility"],
    image: "https://i.ibb.co/33N38fh/photography-site.webp",
    liveUrl: "https://hobbyphotographysite.vercel.app/",
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
  thomiansmedia: {
    id: "thomiansmedia",
    overview: [
      "The Thomians Media Unit needed a permanent home for everything it produced — match-day coverage, event recaps, announcements and an archive of years of footage. What existed was scattered across social platforms with no identity of its own.",
      "I designed and built the platform end to end: a bold editorial layout that puts the latest coverage first, a video-first architecture tuned for slow connections, and an admin flow the students can run themselves. It is live in production and updated by the unit every week.",
    ],
    role: "Design & development — end to end",
    timeline: "2 months · 2026",
    deliverables: [
      "Brand refresh",
      "Website design",
      "Front-end build",
      "Back-end build",
      "Deployment & handover",
    ],
    stack: [
      { group: "Framework", items: ["React 19", "Next.js"] },
      { group: "Languages", items: ["TypeScript", "HTML", "CSS"] },
      { group: "Styling", items: ["Tailwind CSS", "Framer Motion"] },
      { group: "Platform", items: ["Cloudflare", "Supabase", "Firebase", "Turso"] },
    ],
    scores: { performance: 96, accessibility: 100, bestPractices: 92, seo: 100 },
    screens: {
      desktop: "https://i.ibb.co/v4sx1knF/thomiansmedia2.webp",
      mobile: "https://i.ibb.co/cS4V0Pb1/thomiansmediamobile.webp",
      url: "live.thomiansmedia.us",
    },
    gallery: [
      {
        src: "https://i.ibb.co/mn6QcnB/thomiangallart1.webp",
        caption: "Live scores, updated mid-over",
      },
      {
        src: "https://i.ibb.co/GvkX7hn8/thomiangallart2.webp",
        caption: "The gallery — every event, one archive",
      },
      {
        src: "https://i.ibb.co/VYCTBGm1/thomiangallart3.webp",
        caption: "Match-day weather, at a glance",
      },
      {
        src: "https://i.ibb.co/bR7bSZ37/thomiangallart4.webp",
        caption: "Fan voting, with live results",
      },
      {
        src: "https://i.ibb.co/5xv6F3ZT/thomiangallart6.webp",
        caption: "One dashboard, everything under control",
      },
      {
        src: "https://i.ibb.co/zKXbw8W/thomiangallart7.webp",
        caption: "Traffic insights on the free tier",
      },
      {
        src: "https://i.ibb.co/5gppPnyx/thomiansmedia5.webp",
        caption: "Fan cards, made in the browser",
      },
    ],
  },
  nova: {
    id: "nova",
    overview: [
      "Nova started as a question: how much of a real store can one person design, build and ship alone? The answer turned out to be all of it — the storefront, the checkout, the accounts and the back office.",
      "Everything a running shop needs is here: filterable collections, product pages with variants, buyer accounts, Stripe checkout, order tracking, stock control and an admin panel with team access — all in one Next.js codebase.",
    ],
    role: "Design & build — storefront to admin",
    timeline: "3 weeks · 2026",
    deliverables: [
      "Storefront design",
      "Next.js build",
      "Stripe checkout",
      "Buyer accounts",
      "Order & stock admin",
      "Team access control",
    ],
    stack: [
      { group: "Framework", items: ["Next.js", "React"] },
      { group: "Languages", items: ["TypeScript", "CSS", "Tailwind CSS"] },
      { group: "Payments", items: ["Stripe"] },
      { group: "Platform", items: ["Vercel", "Supabase", "Resend"] },
    ],
    scores: { performance: 76, accessibility: 93, bestPractices: 100, seo: 92 },
    screens: {
      desktop: "https://i.ibb.co/WXFkkdv/home.webp",
      mobile: "https://i.ibb.co/6JwYt2nm/mobile.webp",
      url: "novastorelk.vercel.app",
    },
    gallery: [
      {
        src: "https://i.ibb.co/b5FLKvpH/collections.webp",
        caption: "Collections, filtered live",
      },
      {
        src: "https://i.ibb.co/jkf8mZXK/product.webp",
        caption: "Product pages with every detail",
      },
      {
        src: "https://i.ibb.co/LdNDCjnw/clients.webp",
        caption: "Buyer accounts, full control",
      },
      {
        src: "https://i.ibb.co/XfpRGg74/order-tracking.webp",
        caption: "Order tracking, cart to door",
      },
      {
        src: "https://i.ibb.co/y3qWrFS/payment.webp",
        caption: "Stripe checkout, secure by default",
      },
      {
        src: "https://i.ibb.co/F4f5vZcD/order-management.webp",
        caption: "Order management, built to configure",
      },
      {
        src: "https://i.ibb.co/M5hDrW71/stock-management.webp",
        caption: "Stock management that keeps count",
      },
      {
        src: "https://i.ibb.co/Ngm6YDvq/product-add.webp",
        caption: "Add or retire products in seconds",
      },
      {
        src: "https://i.ibb.co/nNq73XJw/product-add-3.webp",
        caption: "Variants, colours and sizes",
      },
      {
        src: "https://i.ibb.co/rRvzDfhN/product-add-2.webp",
        caption: "Product entry, without the friction",
      },
      {
        src: "https://i.ibb.co/Pv9vjgsM/access-management.webp",
        caption: "Team access, role by role",
      },
    ],
  },
  photography: {
    id: "photography",
    overview: [
      "A photographer's archive deserved better than a grid of thumbnails. The brief was a monograph — a site that reads like a printed folio, where each series gets its own pace and its own room.",
      "Built with Vite and React in four days: editorial serif type, full-bleed banners, cards that respond to the cursor, and a contact page that stays out of the way of the work.",
    ],
    role: "Design & build",
    timeline: "4 days · 2026",
    deliverables: [
      "Art direction",
      "Website design",
      "React build",
      "Series & banner system",
      "Contact flow",
    ],
    stack: [
      { group: "Framework", items: ["Vite", "React"] },
      { group: "Languages", items: ["TypeScript", "CSS"] },
      { group: "Motion", items: ["CSS keyframes", "Scroll reveals"] },
      { group: "Platform", items: ["Vercel", "Vercel Analytics"] },
    ],
    scores: { performance: 98, accessibility: 100, bestPractices: 100, seo: 100 },
    screens: {
      desktop: "https://i.ibb.co/4w0Lyj7Z/Hero.webp",
      mobile: "https://i.ibb.co/q37XJWHY/mobile-1.webp",
      url: "hobbyphotographysite.vercel.app",
    },
    gallery: [
      {
        src: "https://i.ibb.co/tpM0G1dB/Services.webp",
        caption: "Services, set in editorial type",
      },
      {
        src: "https://i.ibb.co/mCd51wkz/Dynamic-Card.webp",
        caption: "Cards that respond to the cursor",
      },
      {
        src: "https://i.ibb.co/0713D9z/Contact.webp",
        caption: "Contact, quietly inviting",
      },
      {
        src: "https://i.ibb.co/s9F9RCP8/About2.webp",
        caption: "About — the story in first person",
      },
      {
        src: "https://i.ibb.co/Q7Qm4t0X/About.webp",
        caption: "Banners, full bleed",
      },
    ],
  },
 /*meridian: {
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
  },*/

  /* ============================ GRAPHIC DESIGN ============================ */
  /*aurum: {
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
  },*/
  /*horo: {
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
  },*/

  /* ================================ UI/UX ================================ */
 /* vanta: {
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
  },*/
};
