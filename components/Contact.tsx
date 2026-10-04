"use client";

import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/content";
import { MailIcon, PhoneIcon, PinIcon, ResumeIcon } from "./Icons";
import { Accent, GithubIcon, LinkedinIcon, Reveal, Section, SectionHead } from "./ui";

/* Paper preview of the one-page resume. */
function ResumeCard() {
  return (
    <div className="relative mx-auto w-56 rotate-[-4deg] sm:w-60">
      <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[6deg] rounded-xl bg-ink-3" aria-hidden />
      <div className="relative rounded-xl bg-[#f3f6ec] p-4 text-[#2d3e2c] shadow-2xl shadow-black/40">
        <span className="absolute -top-2.5 -left-2 rounded-full bg-lime px-2 py-0.5 font-mono text-[9px] font-semibold">1 page</span>
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-[#2d3e2c] font-mono text-[10px] text-[#e4fd97]">KH</span>
          <div>
            <div className="text-[11px] font-semibold">{profile.name}</div>
            <div className="text-[8px] tracking-wider uppercase opacity-60">Full Stack Developer</div>
          </div>
        </div>
        {["Experience", "Projects", "Skills"].map((s, i) => (
          <div key={s} className="mt-3">
            <div className="border-b border-canopy/20 pb-0.5 text-[8px] font-semibold tracking-wider uppercase">{s}</div>
            {i < 2 ? (
              <div className="mt-1.5 flex flex-col gap-1">
                <span className="h-1 w-full rounded bg-[#2d3e2c]/20" />
                <span className="h-1 w-4/5 rounded bg-[#2d3e2c]/20" />
                <span className="h-1 w-3/5 rounded bg-[#2d3e2c]/20" />
              </div>
            ) : (
              <div className="mt-1.5 flex gap-1">
                {["#9cc9ff", "#e4fd97", "#7fd8b6", "#c6b5ff", "#ffc97a"].map((c) => (
                  <span key={c} className="h-1.5 w-6 rounded-full" style={{ background: c }} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { label: "GitHub", value: "Kunjbihari-hirani", href: profile.github, icon: <GithubIcon className="size-4" /> },
    { label: "LinkedIn", value: "kunjbihari-hirani", href: profile.linkedin, icon: <LinkedinIcon className="size-4" /> },
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/-/g, "")}`, icon: <PhoneIcon className="size-8" /> },
    { label: "Based in", value: profile.location, href: undefined, icon: <PinIcon className="size-8" /> },
  ];

  return (
    <Section id="contact" className="pb-12">
      <SectionHead index="07" label="Contact" title={<>Let&apos;s build something <Accent>real</Accent>.</>} />

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="card grid-bg relative h-full overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 sm:p-8">
            <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-canopy/60 blur-3xl" aria-hidden />
            <div className="relative">
              <div className="flex items-center gap-3">
                <MailIcon className="size-12" />
                <div className="font-mono text-xs text-fog">say hello</div>
              </div>
              <a href={`mailto:${profile.email}`} className="mt-2 block text-2xl font-medium break-all text-paper transition hover:text-lime sm:text-4xl">
                {profile.email}
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-on-lime transition hover:brightness-95">
                  <Mail className="size-4" /> Send an email
                </a>
                <button type="button" onClick={copy} className="flex items-center gap-2 rounded-full border border-line-2 px-5 py-2.5 text-sm transition hover:border-lime">
                  {copied ? <Check className="size-4 text-lime" /> : <Copy className="size-4" />}
                  {copied ? "Copied" : "Copy email"}
                </button>
              </div>

              <div className="mt-8 grid gap-2 sm:grid-cols-2">
                {links.map((l) => {
                  const body = (
                    <>
                      <span className="grid size-10 place-items-center rounded-xl border border-line bg-ink text-paper">{l.icon}</span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-fog">{l.label}</span>
                        <span className="block truncate text-sm text-paper">{l.value}</span>
                      </span>
                      {l.href && <ArrowUpRight className="ml-auto size-4 text-fog transition group-hover:text-lime" />}
                    </>
                  );
                  return l.href ? (
                    <a
                      key={l.label}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex items-center gap-3 rounded-xl border border-line bg-ink/60 p-3 transition hover:border-line-2"
                    >
                      {body}
                    </a>
                  ) : (
                    <div key={l.label} className="flex items-center gap-3 rounded-xl border border-line bg-ink/60 p-3">
                      {body}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="card flex h-full flex-col items-center justify-between gap-8 rounded-3xl border border-line bg-ink-2 p-6 text-center sm:p-8">
            <div className="pt-4">
              <ResumeCard />
            </div>
            <div>
              <ResumeIcon className="mx-auto mb-2 size-12" />
              <h3 className="text-xl text-paper">Prefer the one-page version?</h3>
              <p className="mt-1 text-sm text-fog">React · Next.js · Node.js · PostgreSQL · MongoDB</p>
              {profile.resume ? (
                <a href={profile.resume} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-lime">
                  View resume <ArrowUpRight className="size-4" />
                </a>
              ) : (
                <a href={`mailto:${profile.email}?subject=Resume%20request`} className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-lime">
                  Request resume <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      <footer className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 font-mono text-xs text-fog sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Next.js · Tailwind CSS · Framer Motion</span>
      </footer>
    </Section>
  );
}
