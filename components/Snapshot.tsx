"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { catColor, projects, snapshot } from "@/data/content";
import { AiIcon, AppIcon, CalendarIcon, CubeIcon, DatabaseIcon, RocketIcon, ServersIcon } from "./Icons";
import { projectIcon } from "./QuickView";
import { Accent, Dot, Reveal, Section, SectionHead, TechTag } from "./ui";

// Sep 2023 .. Oct 2026, one cell per month.
const months = Array.from({ length: 38 }, (_, i) => {
  const m = (8 + i) % 12;
  return { label: "JFMAMJJASOND"[m], year: m === 0 ? 2024 + Math.floor((i - 4) / 12) : null };
});

const areas = [
  { title: "Frontend", icon: AppIcon, chips: ["React", "Next.js", "TS", "Zustand"] },
  { title: "Backend", icon: ServersIcon, chips: ["Python", "REST APIs", "FastAPI", "WebSockets"] },
  { title: "Database", icon: DatabaseIcon, chips: ["PostgreSQL", "MongoDB", "SQL"] },
  { title: "3D", icon: CubeIcon, chips: ["Three.js", "R3F"] },
  { title: "AI", icon: AiIcon, chips: ["Gemini", "RAG", "Generative AI"] },
];

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`card rounded-2xl border border-line bg-ink-2 p-5 sm:p-6 ${className}`}>{children}</div>;
}

export default function Snapshot() {
  return (
    <Section id="snapshot">
      <SectionHead index="01" label="Snapshot" title={<>Engineer at a <Accent>glance</Accent>.</>} />

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <CalendarIcon className="size-14" />
                <div>
                <div className="text-6xl font-medium tracking-tight text-paper">{snapshot.years}</div>
                <div className="mt-1 text-paper/80">Years shipping production code</div>
                </div>
              </div>
              <span className="hidden font-mono text-xs whitespace-nowrap text-fog sm:inline">{snapshot.since}</span>
            </div>
            <div className="mt-8 grid grid-cols-[repeat(19,minmax(0,1fr))] gap-1">
              {months.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.015 }}
                  className="aspect-square rounded-[4px]"
                  style={{ background: `color-mix(in oklab, var(--color-lime) ${18 + (i / months.length) * 82}%, var(--color-canopy))` }}
                  title={m.year ? String(m.year) : undefined}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-fog">
              <span>Sep 2023</span>
              <span>2024</span>
              <span>2025</span>
              <span>Now</span>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="h-full">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <RocketIcon className="size-14" />
                <div>
                  <div className="text-6xl font-medium tracking-tight text-paper">0{snapshot.products}</div>
                  <div className="mt-1 text-paper/80">Products built end to end</div>
                </div>
              </div>
              <span className="font-mono text-xs text-fog">SaaS · AI · 3D</span>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-2 min-[480px]:grid-cols-2">
              {projects.map((p) => {
                const Icon = projectIcon[p.id];
                return (
                  <a key={p.id} href={`#${p.id}`} className="group flex items-center gap-3 rounded-xl border border-line bg-ink p-3 transition hover:border-line-2">
                    <Icon className="size-10 shrink-0 transition-transform group-hover:-translate-y-0.5" />
                    <div className="min-w-0">
                      <div className="truncate text-sm text-paper">{p.name}</div>
                      <div className="truncate font-mono text-[10px] text-fog">{p.kind}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </Card>
        </Reveal>

        <Reveal>
          <Card className="h-full">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-medium text-paper">Full Stack</h3>
              <span className="font-mono text-xs text-fog">UI → DB</span>
            </div>
            <div className="mt-6 flex flex-col gap-3.5">
              {snapshot.depth.map((d, i) => (
                <div key={d.label} className="grid grid-cols-[150px_1fr] items-center gap-3">
                  <span className="font-mono text-xs text-fog">{d.label}</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="h-1.5 origin-left rounded-full"
                    style={{ background: catColor[d.cat] }}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="h-full">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-medium text-paper">In Production</h3>
              <span className="flex items-center gap-1.5 font-mono text-xs text-lime">
                <Dot color="var(--color-lime)" pulse /> live
              </span>
            </div>
            <ul className="mt-6 flex flex-col gap-2">
              {snapshot.live.map((l) => (
                <li key={l.host}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-lg border border-line bg-ink px-3 py-2.5 font-mono text-xs transition hover:border-lime/50">
                    <span className="text-paper">{l.host}</span>
                    <span className="flex items-center gap-1.5 text-lime">
                      <Dot color="var(--color-lime)" /> deployed
                      <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-100" />
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-center justify-between rounded-lg border border-dashed border-line-2 px-3 py-2.5 font-mono text-xs text-fog">
                <span>+ 2 private client platforms</span>
                <Lock className="size-3.5" />
              </li>
            </ul>
          </Card>
        </Reveal>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {areas.map((a, i) => {
          const Icon = a.icon;
          return (
            <Reveal key={a.title} delay={i * 0.05}>
              <Card className="h-full">
                <Icon className="size-14" />
                <h3 className="mt-5 text-lg text-paper">{a.title}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {a.chips.map((c) => (
                    <TechTag key={c} name={c} />
                  ))}
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
