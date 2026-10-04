"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { catColor, catLabel, projects, tools, type Cat, type ProjectId } from "@/data/content";
import { Accent, Dot, Reveal, Section, SectionHead } from "./ui";

type NodeId = "next" | "r3f" | "api" | "ws" | "queue" | "ai" | "pg" | "mongo";

const nodes: { id: NodeId; label: string; sub: string; x: number; y: number; cat: Cat }[] = [
  { id: "next", label: "Next.js", sub: "UI · SSR", x: 80, y: 95, cat: "ui" },
  { id: "r3f", label: "R3F", sub: "3D scene", x: 80, y: 255, cat: "3d" },
  { id: "ws", label: "Socket.IO", sub: "realtime", x: 300, y: 45, cat: "api" },
  { id: "api", label: "Node.js", sub: "REST", x: 300, y: 175, cat: "api" },
  { id: "queue", label: "BullMQ", sub: "jobs · pub/sub", x: 300, y: 305, cat: "api" },
  { id: "ai", label: "Gemini", sub: "GenAI · RAG", x: 520, y: 305, cat: "ai" },
  { id: "pg", label: "PostgreSQL", sub: "relational", x: 520, y: 115, cat: "data" },
  { id: "mongo", label: "MongoDB", sub: "documents", x: 520, y: 210, cat: "data" },
];

const edges: [NodeId, NodeId][] = [
  ["next", "api"],
  ["r3f", "api"],
  ["next", "ws"],
  ["api", "pg"],
  ["api", "mongo"],
  ["api", "queue"],
  ["queue", "ai"],
  ["api", "ai"],
];

const projectNodes: Record<ProjectId, NodeId[]> = {
  gograde: ["next", "api", "queue", "ai", "pg"],
  asphalta: ["next", "r3f", "api", "queue", "ai"],
  chatbot: ["next", "ws", "api", "ai", "mongo"],
  cohealth: ["next", "api", "pg"],
};

const cats: Cat[] = ["ui", "api", "data", "3d", "ai"];
const W = 600;
const H = 350;

export default function Stack() {
  const [sel, setSel] = useState<ProjectId | null>(null);
  const project = projects.find((p) => p.id === sel);
  const onNodes = sel ? projectNodes[sel] : nodes.map((n) => n.id);
  const isOn = (n: NodeId) => onNodes.includes(n);
  const toolOn = (name: string) => !project || project.uses.includes(name);

  return (
    <Section id="stack" className="border-y border-line bg-ink-2/40">
      <SectionHead
        index="04"
        label="Tech ecosystem"
        title={<>Layers that <Accent>talk</Accent> to each other.</>}
        sub="Pick a product to see exactly which tools and services it runs on."
      />

      <Reveal className="mb-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-xs text-fog">filter →</span>
        <button
          type="button"
          onClick={() => setSel(null)}
          className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition ${!sel ? "border-lime bg-lime text-on-lime" : "border-line-2 text-fog hover:text-paper"}`}
        >
          All tools
        </button>
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSel(p.id === sel ? null : p.id)}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition ${
              sel === p.id ? "border-lime bg-lime text-on-lime" : "border-line-2 text-fog hover:text-paper"
            }`}
          >
            <Dot color={sel === p.id ? "var(--color-canopy)" : catColor[p.cat]} />
            {p.name}
          </button>
        ))}
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        {/* tools by category */}
        <Reveal>
          <div className="card flex h-full flex-col gap-5 rounded-3xl border border-line bg-ink-2 p-5 sm:p-6">
            {cats.map((c) => (
              <div key={c}>
                <div className="mb-2.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                  <Dot color={catColor[c]} /> {catLabel[c]}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tools
                    .filter((t) => t.cat === c)
                    .map((t) => {
                      const on = toolOn(t.name);
                      return (
                        <motion.span
                          key={t.name}
                          layout
                          animate={{ opacity: on ? 1 : 0.28, scale: on ? 1 : 0.97 }}
                          className="rounded-full border px-3 py-1 text-sm"
                          style={{
                            borderColor: on && project ? catColor[c] : "var(--color-line-2)",
                            color: on ? "var(--color-paper)" : "var(--color-fog)",
                            background: on && project ? `color-mix(in oklab, ${catColor[c]} 10%, transparent)` : "transparent",
                          }}
                        >
                          {t.name}
                        </motion.span>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* architecture graph */}
        <Reveal delay={0.05}>
          <div className="card flex h-full flex-col rounded-3xl border border-line bg-ink-2">
            <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-xs text-fog">
              <span>architecture.svg</span>
              <span className="text-lime">{project ? project.name : "all products"}</span>
            </div>
            <div className="dot-bg flex flex-1 items-center p-3 sm:p-5">
              <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
                <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" fill="none" aria-hidden>
                  {edges.map(([a, b]) => {
                    const na = nodes.find((n) => n.id === a)!;
                    const nb = nodes.find((n) => n.id === b)!;
                    const on = isOn(a) && isOn(b);
                    const mx = (na.x + nb.x) / 2;
                    return (
                      <path
                        key={a + b}
                        d={`M${na.x} ${na.y} C${mx} ${na.y} ${mx} ${nb.y} ${nb.x} ${nb.y}`}
                        className={on ? "flow-line" : ""}
                        stroke={on ? "var(--color-lime)" : "var(--color-line-2)"}
                        strokeOpacity={on ? 0.7 : 0.6}
                        strokeWidth={on ? 1.5 : 1}
                        strokeDasharray={on ? undefined : "2 6"}
                        style={{ transition: "stroke .3s" }}
                      />
                    );
                  })}
                </svg>
                {nodes.map((n) => {
                  const on = isOn(n.id);
                  return (
                    <div
                      key={n.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-ink px-2.5 py-1.5 transition-all duration-300 sm:px-3 sm:py-2"
                      style={{
                        left: `${(n.x / W) * 100}%`,
                        top: `${(n.y / H) * 100}%`,
                        borderColor: on ? `color-mix(in oklab, ${catColor[n.cat]} 70%, transparent)` : "var(--color-line)",
                        opacity: on ? 1 : 0.35,
                      }}
                    >
                      <div className="flex items-center gap-1.5 text-[11px] whitespace-nowrap text-paper sm:text-sm">
                        <Dot color={catColor[n.cat]} /> {n.label}
                      </div>
                      <div className="hidden font-mono text-[10px] whitespace-nowrap text-fog sm:block">{n.sub}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="border-t border-line px-5 py-3 font-mono text-xs text-fog">
              {project ? (
                <>
                  <span className="text-paper">{project.name}:</span> {project.hard}
                </>
              ) : (
                <>
                  {onNodes.length} services · {edges.length} connections
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
