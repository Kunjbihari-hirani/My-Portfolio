"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Check, Copy, Mail, MapPin, Zap } from "lucide-react";
import { useState } from "react";
import { catColor, education, jobs, profile, recruiter, tools } from "@/data/content";
import { AppIcon, CapIcon, ChatIcon, CubeIcon, RoleIcon, TenantsIcon } from "./Icons";
import { openQuickView } from "./QuickView";
import { Dot, GithubIcon, LinkedinIcon } from "./ui";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const proofIcons = [TenantsIcon, CubeIcon, ChatIcon];
const proofColors = [catColor.data, catColor["3d"], catColor.ai];

function Mark({ children, n, color }: { children: React.ReactNode; n: number; color: string }) {
  return (
    <span className="whitespace-nowrap">
      <span className="rounded-sm px-0.5 text-paper" style={{ background: `linear-gradient(transparent 58%, color-mix(in oklab, ${color} 30%, transparent) 58%)` }}>
        {children}
      </span>
      <sup className="ml-0.5 font-mono text-[11px]" style={{ color }}>
        {n}
      </sup>
    </span>
  );
}

/* What a recruiter scans first: years, current role, how the career moved. */
function RecruiterCard() {
  const [copied, setCopied] = useState(false);
  const path = [
    { year: "2023", role: jobs[1].role, where: jobs[1].company, Icon: AppIcon, on: false, span: "2023 — 2024" },
    { year: "2024", role: education.degree, where: "GTU", Icon: CapIcon, on: false, span: `Graduated ${education.year}` },
    { year: "2024", role: jobs[0].role, where: jobs[0].company, Icon: RoleIcon, on: true, span: "2024 — Present" },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-canopy/40 blur-3xl" aria-hidden />
      <div className="card relative rounded-3xl border border-line bg-ink-2/95 p-5 backdrop-blur sm:p-6">
        <div className="flex items-center gap-3 border-b border-line pb-5">
          <RoleIcon className="size-14 shrink-0" />
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">at {recruiter.current.company.split(" ")[0]}</div>
            <div className="text-lg leading-tight text-paper">{recruiter.current.role}</div>
          </div>
          <div className="ml-auto text-right">
            <span className="text-4xl font-medium text-lime">{recruiter.years}</span>
            <span className="ml-1 font-mono text-xs text-fog">yrs</span>
          </div>
        </div>

        <ol className="relative mt-5 flex flex-col gap-3.5">
          <span className="absolute top-3 bottom-3 left-[17px] w-px bg-line-2" aria-hidden />
          {path.map((p) => (
            <li key={p.role} className="relative flex items-center gap-3">
              <span className={`relative grid size-9 place-items-center rounded-xl border ${p.on ? "border-lime/60 bg-canopy" : "border-line bg-ink"}`}>
                <p.Icon className="size-7" />
              </span>
              <div className="min-w-0 flex-1">
                <div className={`truncate text-sm ${p.on ? "text-paper" : "text-paper/80"}`}>{p.role}</div>
                <div className="truncate text-xs text-fog">{p.where}</div>
              </div>
              <span className={`shrink-0 font-mono text-[11px] ${p.on ? "text-lime" : "text-fog"}`}>{p.span}</span>
            </li>
          ))}
        </ol>

        <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4 text-sm text-fog">
          <span className="flex items-center gap-2">
            <MapPin className="size-3.5" /> {profile.location}
          </span>
          <button type="button" onClick={copy} className="group flex items-center gap-2 text-left transition hover:text-paper">
            <Mail className="size-3.5" /> {profile.email}
            <span className="ml-auto flex items-center gap-1 font-mono text-[11px] text-lime">
              {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
              {copied ? "copied" : "copy"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ToolStrip() {
  const items = [...tools, ...tools];
  return (
    <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee flex w-max gap-2 hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-2 rounded-xl border border-line bg-ink-2 px-3.5 py-2 text-sm whitespace-nowrap text-paper/85">
            <Dot color={catColor[t.cat]} />
            {t.name}
            {t.inProgress && (
              <span className="rounded-full border border-line-2 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-fog">
                In progress
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-32 pb-16 sm:px-6 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <motion.div {...rise(0)} className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-fog">
            <span className="flex items-center gap-2 text-lime">
              <Dot color="var(--color-lime)" pulse /> Full Stack AI Engineer
            </span>
            <span>React · Next.js · Python · AI / RAG</span>
          </motion.div>

          <motion.h1 {...rise(0.05)} className="text-6xl leading-[0.95] font-medium tracking-tight text-paper sm:text-7xl md:text-[5.5rem]">
            {profile.first}
            <br />
            <em className="font-serif font-normal text-lime">{profile.last}</em>
          </motion.h1>

          <motion.p {...rise(0.15)} className="mt-7 max-w-2xl text-xl leading-relaxed text-fog sm:text-2xl">
            I build with <Mark n={1} color={proofColors[0]}>React and Next.js</Mark>, integrate <Mark n={2} color={proofColors[1]}>Python APIs</Mark>, and ship{" "}
            <Mark n={3} color={proofColors[2]}>AI and RAG features</Mark> from interface to production.
          </motion.p>

          <motion.ul {...rise(0.22)} className="mt-6 flex flex-wrap gap-2">
            {recruiter.proof.map((p, i) => {
              const Icon = proofIcons[i];
              return (
                <li key={p.n} className="flex items-center gap-2.5 rounded-2xl border border-line bg-ink-2 py-1.5 pr-3.5 pl-1.5">
                  <Icon className="size-8" />
                  <span className="font-mono text-xs" style={{ color: proofColors[i] }}>
                    {p.n}
                  </span>
                  <span className="text-xs text-paper">{p.text}</span>
                  <span className="hidden text-xs text-fog sm:inline">· {p.sub}</span>
                </li>
              );
            })}
          </motion.ul>

          <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className="flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-on-lime transition hover:brightness-95">
              See the work <ArrowDownRight className="size-4" />
            </a>
            <button type="button" onClick={openQuickView} className="flex items-center gap-2 rounded-full border border-line-2 px-5 py-2.5 text-sm text-paper transition hover:border-lime">
              <Zap className="size-4 text-lime" /> 10-second summary
            </button>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-10 place-items-center rounded-full border border-line-2 text-paper transition hover:border-lime">
              <GithubIcon className="size-4" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full border border-line-2 text-paper transition hover:border-lime">
              <LinkedinIcon className="size-4" />
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <RecruiterCard />
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl">
        <ToolStrip />
      </div>
    </section>
  );
}
