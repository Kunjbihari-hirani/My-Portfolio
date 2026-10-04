"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { catColor } from "@/data/content";
import { AiIcon, AppIcon, CubeIcon, DatabaseIcon, QueueIcon, RocketIcon, ServersIcon } from "./Icons";
import { Accent, Reveal, Section, SectionHead, TechTag } from "./ui";

type Layer = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  details: string;
  seen: string;
  stack: string[];
  Icon: typeof AppIcon;
  tone: string;
};

const layers: Layer[] = [
  {
    id: "client",
    label: "Client",
    title: "Interfaces that adapt",
    subtitle: "Next.js · React · TypeScript",
    details: "Configuration-driven screens: tenant terminology, role-based views, a 13-step form and data-heavy dashboards.",
    seen: "GoGrade AI · Co-Health",
    stack: ["Next.js", "React.js", "TypeScript", "Redux Toolkit", "Zustand", "TanStack Query"],
    Icon: AppIcon,
    tone: catColor.ui,
  },
  {
    id: "motion",
    label: "Motion",
    title: "Scroll-driven motion",
    subtitle: "GSAP · ScrollTrigger",
    details: "Product landing pages built as scroll timelines: pinned sections, section-to-section transitions, hover and cursor effects, all tuned per breakpoint.",
    seen: "Product landing pages",
    stack: ["GSAP", "ScrollTrigger"],
    Icon: RocketIcon,
    tone: catColor.ui,
  },
  {
    id: "scene",
    label: "3D scene",
    title: "Interactive 3D in the browser",
    subtitle: "React Three Fiber · Three.js",
    details: "Part-level paint, gloss, matte and carbon finishes, UV-mapped skins and decals placed on curved surfaces.",
    seen: "Asphalta AI",
    stack: ["React Three Fiber", "Three.js"],
    Icon: CubeIcon,
    tone: catColor["3d"],
  },
  {
    id: "api",
    label: "API",
    title: "Python-powered product APIs",
    subtitle: "Python · REST APIs · WebSockets",
    details: "Build React interfaces around Python REST APIs, connect real-time product flows, and integrate AI capabilities. Currently deepening backend skills with FastAPI.",
    seen: "GoGrade AI · AI Chatbot",
    stack: ["Python", "REST APIs", "WebSockets", "FastAPI (learning)"],
    Icon: ServersIcon,
    tone: catColor.api,
  },
  {
    id: "jobs",
    label: "Jobs",
    title: "Slow work off the request path",
    subtitle: "BullMQ · Pub/Sub · project queues",
    details: "Asphalta AI renders use BullMQ; GoGrade answer-sheet marking runs in a Python microservice over Pub/Sub. Each is specific to that product.",
    seen: "Asphalta AI · GoGrade AI",
    stack: ["BullMQ", "Pub/Sub", "Microservices"],
    Icon: QueueIcon,
    tone: catColor.ai,
  },
  {
    id: "storage",
    label: "Storage",
    title: "Data that stays isolated",
    subtitle: "PostgreSQL · MongoDB",
    details: "Relational schemas in PostgreSQL with a database per tenant, role-based access, and MongoDB for per-customer config.",
    seen: "GoGrade AI · Co-Health · Chatbot",
    stack: ["PostgreSQL", "SQL", "Multi-Tenancy", "RBAC", "MongoDB"],
    Icon: DatabaseIcon,
    tone: catColor.data,
  },
];

const aiLayer: Layer = {
  id: "ai",
  label: "AI",
  title: "AI integrated into the product",
  subtitle: "Gemini · RAG · GenAI",
  details: "Gemini image generation from saved liveries and RAG answers grounded in each customer's own files.",
  seen: "Asphalta AI · AI Chatbot",
  stack: ["Gemini", "RAG", "Generative AI"],
  Icon: AiIcon,
  tone: catColor.ai,
};

const all = [...layers, aiLayer];
const CYCLE_MS = 3600;

export default function Build() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const playing = auto && inView && !paused;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % all.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [playing, active]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const cur = all[active];
  const isAi = cur.id === "ai";

  const slab = (l: Layer, i: number) => {
    const on = i === active;
    return (
      <button
        type="button"
        role="tab"
        aria-selected={on}
        onClick={() => pick(i)}
        className={`group relative z-10 flex w-full items-center gap-3 rounded-2xl border p-2 pr-3 text-left transition-all duration-300 ${
          on ? "border-lime/60 bg-canopy/40 lg:translate-x-1" : "card border-line bg-ink-2 hover:border-line-2"
        }`}
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-ink">
          <l.Icon className="size-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block text-[15px] leading-tight ${on ? "text-paper" : "text-paper/80"}`}>{l.label}</span>
          <span className="mt-0.5 block truncate font-mono text-[11px] text-fog">{l.subtitle}</span>
        </span>
        <span className="size-2 shrink-0 rounded-full transition-opacity" style={{ background: l.tone, opacity: on ? 1 : 0.35 }} />
      </button>
    );
  };

  return (
    <Section id="build">
      <SectionHead
        index="03"
        label="How I build"
        title={<>One request, <Accent>top to bottom</Accent>.</>}
        sub="The layers I work across on a product. Watch one pass, or pick a layer."
      />

      <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <Reveal>
          <div role="tablist" aria-orientation="vertical" aria-label="Layers">
            <div className="relative space-y-2.5 pl-7">
              <span className="absolute top-7 bottom-7 left-2.5 w-0.5 bg-line" aria-hidden>
                <span
                  className="absolute inset-x-0 top-0 transition-[height] duration-500"
                  style={{
                    height: isAi ? "50%" : `${(active / (layers.length - 1)) * 100}%`,
                    background: `linear-gradient(${catColor.ui}, ${catColor.api}, ${catColor.data})`,
                  }}
                />
              </span>
              {layers.map((l, i) => (
                <div key={l.id} className="relative">
                  <span
                    className="absolute top-1/2 -left-[22px] size-2.5 -translate-y-1/2 rounded-full border-2 border-ink transition-colors"
                    style={{ background: i <= active && !isAi ? l.tone : "var(--color-line-2)" }}
                    aria-hidden
                  />
                  {slab(l, i)}
                </div>
              ))}
            </div>

            <div className="relative mt-4 border-t border-dashed border-line-2 pt-4 pl-7">
              <span className="absolute top-4 left-1 font-mono text-[10px] text-fog" aria-hidden>
                ++
              </span>
              {slab(aiLayer, all.length - 1)}
              <p className="mt-1.5 pl-1 font-mono text-[10px] text-fog">runs beside the services, not inside them</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="self-start">
          <div role="tabpanel" className="card relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 sm:p-8">
            <span className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full opacity-25 blur-3xl transition-colors duration-500" style={{ background: cur.tone }} aria-hidden />
            <div key={cur.id} className="anim-in relative">
              <div className="flex items-center gap-4">
                <cur.Icon className="size-20 shrink-0" />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-fog">
                    {isAi ? "++" : String(active + 1).padStart(2, "0")} · {cur.subtitle}
                  </p>
                  <h3 className="mt-1 text-2xl leading-tight font-medium text-paper sm:text-3xl">{cur.title}</h3>
                </div>
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-paper/85">{cur.details}</p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-ink px-3 py-1 font-mono text-[11px] text-fog">
                seen in <span className="text-lime">{cur.seen}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                {cur.stack.map((s, i) => (
                  <span key={s} className="anim-in" style={{ "--d": `${150 + i * 70}ms` } as CSSProperties}>
                    <TechTag name={s} />
                  </span>
                ))}
              </div>
            </div>
            {playing && (
              <span className="relative mt-6 block h-0.5 overflow-hidden rounded-full bg-line">
                <span key={active} className="progress-bar block h-full bg-lime" style={{ animationDuration: `${CYCLE_MS}ms` }} />
              </span>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
