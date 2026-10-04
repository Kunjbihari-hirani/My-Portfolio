"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode, SVGProps } from "react";
import { catColor, tools, type Cat } from "@/data/content";

/* One color per layer so a stack reads at a glance: frontend, backend, data, 3D, AI. */
const extraCat: Record<string, Cat> = {
  React: "ui",
  TS: "ui",
  Zustand: "ui",
  REST: "api",
  "Node.js": "api",
  BullMQ: "api",
  "Pub/Sub": "api",
  R3F: "3d",
  "Next.js API Routes": "api",
};
export const catFor = (tech: string): Cat | undefined => extraCat[tech] ?? tools.find((t) => t.name === tech)?.cat;

export function TechTag({ name, className = "" }: { name: string; className?: string }) {
  const cat = catFor(name);
  if (!cat) return <Tag className={className}>{name}</Tag>;
  const c = catColor[cat];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] leading-5 whitespace-nowrap ${className}`}
      style={{ color: c, borderColor: `color-mix(in oklab, ${c} 35%, transparent)`, background: `color-mix(in oklab, ${c} 8%, transparent)` }}
    >
      {name}
    </span>
  );
}

export function TechTags({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((t) => (
        <li key={t}>
          <TechTag name={t} />
        </li>
      ))}
    </ul>
  );
}

export function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative scroll-mt-20 px-4 py-24 sm:px-6 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/* "01 —— LABEL" kicker over a headline with an italic serif accent word. */
export function SectionHead({ index, label, title, sub }: { index: string; label: string; title: ReactNode; sub?: ReactNode }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fog">
        <span className="text-lime">{index}</span>
        <span className="h-px w-8 bg-line-2" />
        {label}
      </div>
      <h2 className="max-w-3xl text-3xl font-medium tracking-tight text-paper sm:text-4xl md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 max-w-2xl text-fog">{sub}</p>}
    </Reveal>
  );
}

export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal text-lime">{children}</em>;
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Tag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`rounded-full border border-line bg-ink-2 px-2.5 py-1 font-mono text-[11px] text-fog ${className}`}>{children}</span>
  );
}

export function Dot({ color, className = "", pulse = false }: { color: string; className?: string; pulse?: boolean }) {
  return <span className={`inline-block size-1.5 shrink-0 rounded-full ${pulse ? "pulse-dot" : ""} ${className}`} style={{ background: color }} />;
}

/* Browser window chrome around a mock UI. */
export function Browser({ url, children, className = "", style }: { url: string; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line-2 bg-ink mock-shadow ${className}`} style={style}>
      <div className="flex items-center gap-3 border-b border-line bg-ink-2 px-3 py-2">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-line-2" />
          ))}
        </div>
        <div className="mx-auto max-w-[70%] truncate rounded-md bg-ink-3 px-3 py-0.5 font-mono text-[10px] text-fog">{url}</div>
        <span className="w-8" />
      </div>
      {children}
    </div>
  );
}

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
