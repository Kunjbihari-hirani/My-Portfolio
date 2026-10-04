// Single source of truth for the portfolio. Mirrors Kunjbihari_Hirani_Resume_FullStack_3years.tex.

export const profile = {
  name: "Kunjbihari Hirani",
  first: "Kunjbihari",
  last: "Hirani",
  role: "Full Stack Developer",
  line: "Interfaces, APIs and 3D, shipped end to end.",
  location: "Ahmedabad, India",
  email: "kunjbiharihirani@gmail.com",
  phone: "+91-9409378990",
  linkedin: "https://www.linkedin.com/in/kunjbihari-hirani-93a6b0303/",
  github: "https://github.com/Kunjbihari-hirani",
  domain: "kunjbihari-hirani.vercel.app",
  // Drop the PDF into /public and set this to "/<file>.pdf" to show every Resume button.
  resume: "",
  flow: ["React", "Next.js", "Node.js", "PostgreSQL"],
};

/* Category colors used by dots, chips and bars across the site. */
export type Cat = "ui" | "api" | "data" | "ai" | "3d";
export const catColor: Record<Cat, string> = {
  ui: "var(--color-c-blue)",
  api: "var(--color-lime)",
  data: "var(--color-c-mint)",
  ai: "var(--color-c-violet)",
  "3d": "var(--color-c-amber)",
};
export const catLabel: Record<Cat, string> = {
  ui: "Frontend",
  api: "Backend",
  data: "Data",
  ai: "AI",
  "3d": "3D",
};

export const snapshot = {
  years: "3+",
  since: "Sep 2023 — now",
  products: 4,
  live: [
    { host: "gograde.ai", href: "https://gograde.ai/" },
    { host: "asphalta.3dxai.io", href: "https://asphalta.3dxai.io/garage" },
  ],
  depth: [
    { label: "Interface", cat: "ui" as Cat },
    { label: "State & data", cat: "ui" as Cat },
    { label: "REST / WebSocket", cat: "api" as Cat },
    { label: "PostgreSQL / MongoDB", cat: "data" as Cat },
    { label: "3D web", cat: "3d" as Cat },
    { label: "GSAP motion", cat: "ui" as Cat },
    { label: "AI / RAG", cat: "ai" as Cat },
  ],
};

export type Tool = { name: string; cat: Cat };

export const tools: Tool[] = [
  { name: "React.js", cat: "ui" },
  { name: "Next.js", cat: "ui" },
  { name: "TypeScript", cat: "ui" },
  { name: "Tailwind CSS", cat: "ui" },
  { name: "shadcn/ui", cat: "ui" },
  { name: "Ant Design", cat: "ui" },
  { name: "Redux Toolkit", cat: "ui" },
  { name: "Zustand", cat: "ui" },
  { name: "TanStack Query", cat: "ui" },
  { name: "GSAP", cat: "ui" },
  { name: "ScrollTrigger", cat: "ui" },
  { name: "Node.js", cat: "api" },
  { name: "REST APIs", cat: "api" },
  { name: "WebSockets", cat: "api" },
  { name: "Socket.IO", cat: "api" },
  { name: "BullMQ", cat: "api" },
  { name: "Microservices", cat: "api" },
  { name: "Pub/Sub", cat: "api" },
  { name: "Stripe", cat: "api" },
  { name: "PostgreSQL", cat: "data" },
  { name: "MongoDB", cat: "data" },
  { name: "SQL", cat: "data" },
  { name: "Multi-Tenancy", cat: "data" },
  { name: "RBAC", cat: "data" },
  { name: "Three.js", cat: "3d" },
  { name: "React Three Fiber", cat: "3d" },
  { name: "Gemini", cat: "ai" },
  { name: "RAG", cat: "ai" },
  { name: "Generative AI", cat: "ai" },
];

export type ProjectId = "gograde" | "asphalta" | "chatbot" | "cohealth";

export type Project = {
  id: ProjectId;
  index: string;
  name: string;
  kind: string;
  cat: Cat;
  tagline: string;
  host: string;
  live?: string;
  period: string;
  stack: string[];
  uses: string[]; // tool names lit up in the Stack section
  hard: string;
};

export const projects: Project[] = [
  {
    id: "gograde",
    index: "01",
    name: "GoGrade AI",
    kind: "Multi-tenant EdTech SaaS",
    cat: "data",
    tagline: "AI assessment platform. One codebase, every institution.",
    host: "xyz-school.gograde.in",
    live: "https://gograde.ai/",
    period: "Apr 2025 — Present",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Pub/Sub", "Microservices"],
    uses: ["Next.js", "React.js", "TypeScript", "GSAP", "ScrollTrigger", "Node.js", "REST APIs", "PostgreSQL", "SQL", "Multi-Tenancy", "RBAC", "Microservices", "Pub/Sub", "Generative AI"],
    hard: "Labels, roles and data change per tenant without forking the UI.",
  },
  {
    id: "asphalta",
    index: "02",
    name: "Asphalta AI",
    kind: "3D car studio",
    cat: "3d",
    tagline: "Paint, finish and decal a car in 3D, then render it with AI.",
    host: "asphalta.3dxai.io/garage",
    live: "https://asphalta.3dxai.io/garage",
    period: "Dec 2025 — Mar 2026",
    stack: ["React Three Fiber", "Three.js", "Node.js", "BullMQ", "Gemini", "Stripe"],
    uses: ["React.js", "React Three Fiber", "Three.js", "Zustand", "GSAP", "ScrollTrigger", "Node.js", "BullMQ", "Gemini", "Generative AI", "Stripe", "REST APIs"],
    hard: "Mapping 2D pointer input onto curved 3D surfaces so decals drag and mirror right.",
  },
  {
    id: "chatbot",
    index: "03",
    name: "AI Chatbot Widget",
    kind: "Embeddable AI SaaS",
    cat: "ai",
    tagline: "One script tag. A themed, RAG-grounded assistant on any site.",
    host: "acme.com",
    period: "Sep 2025 — Nov 2025",
    stack: ["Node.js", "MongoDB", "WebSockets", "RAG"],
    uses: ["React.js", "TypeScript", "Node.js", "MongoDB", "WebSockets", "Socket.IO", "RAG", "Generative AI", "REST APIs"],
    hard: "One widget that drops into any website and still looks native.",
  },
  {
    id: "cohealth",
    index: "04",
    name: "Co-Health",
    kind: "Healthcare platform",
    cat: "ui",
    tagline: "Patients, nurse scheduling, ECG and medicine orders in one place.",
    host: "admin.co-health",
    period: "Oct 2024 — Jul 2025",
    stack: ["React", "Node.js", "PostgreSQL", "RBAC"],
    uses: ["React.js", "Redux Toolkit", "TanStack Query", "Ant Design", "Node.js", "REST APIs", "PostgreSQL", "SQL", "RBAC"],
    hard: "A 13-page form and slots that hold as many bookings as nurses assigned.",
  },
];

export const jobs = [
  {
    company: "Devstree IT Services",
    role: "Full Stack Developer",
    period: "Jul 2024 — Present",
    current: true,
    line: "Production SaaS, EdTech, healthcare, AI and 3D products, end to end.",
    pillars: [
      { title: "Frontend", sub: "React · Next.js · R3F", cat: "ui" as Cat },
      { title: "Backend", sub: "Node.js · REST · BullMQ", cat: "api" as Cat },
      { title: "Data", sub: "PostgreSQL · MongoDB", cat: "data" as Cat },
    ],
    chips: ["Multi-tenant data models", "RBAC", "Microservices · Pub/Sub", "Stripe", "Gemini · RAG", "Socket.IO real-time", "GSAP scroll animations", "Google Maps"],
  },
  {
    company: "The Special Character",
    role: "Frontend Developer",
    period: "Sep 2023 — Jun 2024",
    current: false,
    line: "Faster, cleaner websites.",
    pillars: [],
    chips: ["Performance optimization", "GSAP landing page motion", "Debugging", "Code reviews"],
  },
];

/* Months since Sep 2023 for the project timeline inside the Devstree card. */
export const timeline = {
  start: [2023, 9] as [number, number],
  end: [2026, 10] as [number, number],
  rows: [
    { label: "Co-Health", from: [2024, 10], to: [2025, 7], cat: "ui" },
    { label: "GoGrade AI", from: [2025, 4], to: [2026, 10], cat: "data" },
    { label: "AI Chatbot", from: [2025, 9], to: [2025, 11], cat: "ai" },
    { label: "Asphalta AI", from: [2025, 12], to: [2026, 3], cat: "3d" },
  ] as { label: string; from: [number, number]; to: [number, number]; cat: Cat }[],
};

/* What a recruiter needs in ten seconds. Also copied as plain text by the Quick view. */
export const recruiter = {
  years: "3+",
  current: { role: "Full Stack Developer", company: "Devstree IT Services", since: "Jul 2024" },
  core: ["React.js", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "Socket.IO", "BullMQ", "Three.js", "GSAP", "RAG"],
  proof: [
    { n: "1", text: "Multi-tenant SaaS", sub: "PostgreSQL per tenant" },
    { n: "2", text: "3D car studio", sub: "React Three Fiber" },
    { n: "3", text: "RAG chatbot", sub: "embeddable widget" },
  ],
};

export const education = {
  degree: "B.E. Information Technology",
  school: "Gujarat Technological University",
  year: "2024",
};
