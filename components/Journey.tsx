"use client";

import { motion } from "framer-motion";
import { catColor, education, jobs, timeline, type Cat } from "@/data/content";
import { AppIcon, CapIcon, DatabaseIcon, RoleIcon, ServersIcon } from "./Icons";
import { Accent, Reveal, Section, SectionHead, Tag } from "./ui";

const pillarIcon: Record<string, typeof AppIcon> = { Frontend: AppIcon, Backend: ServersIcon, Data: DatabaseIcon };

const idx = ([y, m]: [number, number]) => (y - timeline.start[0]) * 12 + (m - timeline.start[1]);
const total = idx(timeline.end) + 1;
const ticks = [
  { label: "2024", at: idx([2024, 1]) },
  { label: "2025", at: idx([2025, 1]) },
  { label: "2026", at: idx([2026, 1]) },
];

/* Projects placed on a month axis from Sep 2023 to now. */
function ProjectTimeline() {
  return (
    <div className="rounded-xl border border-line bg-ink p-4">
      <div className="mb-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
        <span>products on the timeline</span>
        <span>now</span>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 right-0 left-24" aria-hidden>
          {ticks.map((t) => (
            <span key={t.label} className="absolute inset-y-0 border-l border-dashed border-line-2" style={{ left: `${(t.at / total) * 100}%` }}>
              <span className="absolute -top-0.5 left-1 font-mono text-[9px] text-fog">{t.label}</span>
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2 pt-4">
          {timeline.rows.map((r, i) => {
            const left = (idx(r.from) / total) * 100;
            const width = ((idx(r.to) - idx(r.from) + 1) / total) * 100;
            const ongoing = r.to[0] === timeline.end[0] && r.to[1] === timeline.end[1];
            return (
              <div key={r.label} className="flex items-center">
                <span className="w-24 shrink-0 truncate pr-2 text-xs text-paper/85">{r.label}</span>
                <div className="relative h-4 flex-1">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-y-0 origin-left rounded-full"
                    style={{ left: `${left}%`, width: `${width}%`, background: catColor[r.cat as Cat] }}
                  >
                    {ongoing && <span className="pulse-dot absolute top-1/2 right-1 size-1.5 -translate-y-1/2 rounded-full bg-ink" />}
                  </motion.span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* A tiny code-review diff, the visual for the first role. */
function ReviewDiff() {
  const lines = [
    { s: "-", t: "useEffect(() => fetchAll(), [])", c: "text-[#e5866f]" },
    { s: "+", t: "const { data } = useQuery(key, fetch)", c: "text-lime" },
    { s: "-", t: "<img src={hero} />", c: "text-[#e5866f]" },
    { s: "+", t: '<img src={hero} loading="lazy" />', c: "text-lime" },
  ];
  return (
    <div className="hidden w-64 shrink-0 rounded-xl border border-line bg-ink p-3 font-mono text-[10px] sm:block">
      <div className="mb-2 text-fog">review · perf.diff</div>
      {lines.map((l, i) => (
        <div key={i} className={`truncate ${l.c}`}>
          {l.s} {l.t}
        </div>
      ))}
    </div>
  );
}

export default function Journey() {
  return (
    <Section id="journey">
      <SectionHead index="05" label="Journey" title={<>Where I&apos;ve <Accent>built</Accent>.</>} />

      <div className="relative">
        <div className="absolute top-6 bottom-6 left-[21px] w-px bg-gradient-to-b from-lime/60 via-line-2 to-transparent" aria-hidden />

        <ol className="flex flex-col gap-6">
          {jobs.map((j, i) => (
            <Reveal key={j.company} delay={i * 0.05}>
              <li className="grid grid-cols-[40px_1fr] gap-4 sm:gap-6">
                <span className={`relative mt-6 grid size-11 place-items-center rounded-2xl border ${j.current ? "border-lime/60 bg-canopy" : "border-line-2 bg-ink-2"}`}>
                  {j.current ? <RoleIcon className="size-9" /> : <AppIcon className="size-9" />}
                  {j.current && <span className="pulse-dot absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-ink bg-lime" />}
                </span>

                <div className="card rounded-3xl border border-line bg-ink-2 p-5 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-medium text-paper">{j.company}</h3>
                      <div className={j.current ? "text-lime" : "text-c-blue"}>{j.role}</div>
                    </div>
                    <span className="rounded-full border border-line-2 px-3 py-1 font-mono text-xs text-fog">{j.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-fog">{j.line}</p>

                  {j.pillars.length > 0 ? (
                    <>
                      <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        {j.pillars.map((p, k) => {
                          const Icon = pillarIcon[p.title] ?? AppIcon;
                          return (
                            <div key={p.title}>
                              <motion.span
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.1 + k * 0.1 }}
                                className="block h-0.5 origin-left rounded-full"
                                style={{ background: catColor[p.cat] }}
                              />
                              <Icon className="mt-3 size-10" />
                              <div className="mt-2 text-paper">{p.title}</div>
                              <div className="font-mono text-[11px] text-fog">{p.sub}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-6">
                        <ProjectTimeline />
                      </div>
                    </>
                  ) : (
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {j.chips.map((c) => (
                          <Tag key={c}>{c}</Tag>
                        ))}
                      </div>
                      <ReviewDiff />
                    </div>
                  )}

                  {j.pillars.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {j.chips.map((c) => (
                        <Tag key={c}>{c}</Tag>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            </Reveal>
          ))}

          <Reveal>
            <li className="grid grid-cols-[40px_1fr] gap-4 sm:gap-6">
              <span className="relative mt-4 grid size-11 place-items-center rounded-2xl border border-line-2 bg-ink-2">
                <CapIcon className="size-9" />
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-line bg-ink-2 p-5 sm:px-7">
                <div>
                  <div className="text-lg text-paper">{education.degree}</div>
                  <div className="text-sm text-fog">{education.school}</div>
                </div>
                <span className="rounded-full border border-line-2 px-3 py-1 font-mono text-xs text-fog">Graduated {education.year}</span>
              </div>
            </li>
          </Reveal>
        </ol>
      </div>
    </Section>
  );
}
