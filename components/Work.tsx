"use client";

import { ArrowUpRight, Gauge, Lock } from "lucide-react";
import { catColor, projects, type Project } from "@/data/content";
import Mockup from "./Mockups";
import { projectIcon } from "./QuickView";
import { Accent, Dot, Reveal, Section, SectionHead, TechTags } from "./ui";

function ProjectCard({ p, wide = false }: { p: Project; wide?: boolean }) {
  const color = catColor[p.cat];
  const Icon = projectIcon[p.id];
  return (
    <article id={p.id} className="card group relative flex h-full min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-line bg-ink-2 transition-colors hover:border-line-2">
      {/* category-tinted stage for the mock */}
      <div
        className="relative px-4 pt-12 sm:px-8"
        style={{ background: `radial-gradient(120% 90% at 50% 0%, color-mix(in oklab, ${color} 13%, transparent), transparent 70%)` }}
      >
        <span className="absolute top-4 left-5 font-mono text-xs text-fog">{p.index}</span>
        <span className="absolute top-4 right-5 font-mono text-xs text-fog">{p.period}</span>
        <div className={`mx-auto transition-transform duration-500 group-hover:-translate-y-1 ${wide ? "max-w-3xl" : ""}`}>
          <Mockup id={p.id} />
        </div>
        <div className="h-6" />
      </div>

      <div className="flex flex-1 flex-col border-t border-line p-5 sm:p-6">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
          <Dot color={color} /> {p.kind}
        </div>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3.5">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-line bg-ink">
              <Icon className="size-11" />
            </span>
            <div className="min-w-0">
              <h3 className="text-2xl font-medium tracking-tight text-paper sm:text-3xl">{p.name}</h3>
              <p className="mt-1 text-fog">{p.tagline}</p>
            </div>
          </div>
          {p.live ? (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${p.name}`}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-line-2 text-paper transition hover:border-lime hover:bg-lime hover:text-on-lime"
            >
              <ArrowUpRight className="size-4" />
            </a>
          ) : (
            <span title="Private client product" className="grid size-11 shrink-0 place-items-center rounded-full border border-dashed border-line-2 text-fog">
              <Lock className="size-4" />
            </span>
          )}
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-line bg-ink px-3.5 py-3 text-sm">
          <Gauge className="mt-0.5 size-4 shrink-0" style={{ color }} />
          <span className="text-paper/85">
            <span className="text-paper">Hard part:</span> {p.hard}
          </span>
        </div>

        <TechTags items={p.stack} className="mt-4 md:mt-auto md:pt-4" />
      </div>
    </article>
  );
}

export default function Work() {
  const [gograde, asphalta, chatbot, cohealth] = projects;
  return (
    <Section id="work">
      <SectionHead
        index="02"
        label="Selected work"
        title={<>Things I&apos;ve <Accent>shipped</Accent>.</>}
        sub="Four production products. Every preview below is live: switch tenants, repaint the car, re-theme the bot."
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal className="min-w-0 md:col-span-2">
          <ProjectCard p={gograde} wide />
        </Reveal>
        <Reveal className="min-w-0">
          <ProjectCard p={asphalta} />
        </Reveal>
        <Reveal delay={0.05} className="min-w-0">
          <ProjectCard p={chatbot} />
        </Reveal>
        <Reveal className="min-w-0 md:col-span-2">
          <ProjectCard p={cohealth} wide />
        </Reveal>
      </div>
    </Section>
  );
}
