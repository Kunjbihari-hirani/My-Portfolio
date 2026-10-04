"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Lock, Mail, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  education,
  jobs,
  profile,
  projects,
  recruiter,
  type ProjectId,
} from "@/data/content";
import {
  CalendarIcon,
  CapIcon,
  CarIcon,
  ChatIcon,
  HeartIcon,
  PinIcon,
  RoleIcon,
} from "./Icons";
import { LinkedinIcon, TechTags } from "./ui";

export const projectIcon: Record<ProjectId, typeof CapIcon> = {
  gograde: CapIcon,
  asphalta: CarIcon,
  chatbot: ChatIcon,
  cohealth: HeartIcon,
};

const OPEN_EVENT = "open-quickview";
export const openQuickView = () => window.dispatchEvent(new Event(OPEN_EVENT));

/* Plain-text profile a recruiter can paste into an ATS note or email. */
const summary = [
  `${profile.name} — ${profile.role} (${recruiter.years} years)`,
  `${profile.location} · ${profile.email} · ${profile.phone}`,
  `Now: ${recruiter.current.role}, ${recruiter.current.company} (${recruiter.current.since} – Present)`,
  `Before: ${jobs[1].role}, ${jobs[1].company} (${jobs[1].period.replace("—", "–")})`,
  `Stack: ${recruiter.core.join(", ")}`,
  `Built: ${projects.map((p) => `${p.name} (${p.kind})`).join("; ")}`,
  `Education: ${education.degree}, ${education.school} (${education.year})`,
  `LinkedIn: ${profile.linkedin}`,
  `GitHub: ${profile.github}`,
].join("\n");

export default function QuickView() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const facts = [
    {
      Icon: CalendarIcon,
      k: "Experience",
      v: `${recruiter.years} years`,
      s: "Sep 2023 — now",
    },
    {
      Icon: RoleIcon,
      k: "Current",
      v: recruiter.current.role,
      s: recruiter.current.company,
    },
    { Icon: PinIcon, k: "Location", v: profile.location, s: "Gujarat" },
    {
      Icon: CapIcon,
      k: "Education",
      v: "B.E. IT",
      s: `${education.school.replace("Gujarat Technological University", "GTU")} · ${education.year}`,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="qv-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-ink-2 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <RoleIcon className="size-12" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime">
                    Quick view
                  </div>
                  <h2 id="qv-title" className="text-xl font-medium text-paper">
                    {profile.name}
                  </h2>
                  <div className="text-sm text-fog">{profile.role}</div>
                </div>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid size-9 place-items-center rounded-full border border-line-2 text-fog transition hover:text-paper"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-5 p-5 sm:p-6">
              <div className="grid gap-2 sm:grid-cols-2">
                {facts.map(({ Icon, k, v, s }) => (
                  <div
                    key={k}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-ink p-3"
                  >
                    <Icon className="size-10 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
                        {k}
                      </div>
                      <div className="truncate text-sm text-paper">{v}</div>
                      <div className="truncate text-xs text-fog">{s}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
                  Core stack
                </div>
                <TechTags items={recruiter.core} />
              </div>

              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
                  Products shipped
                </div>
                <ul className="flex flex-col gap-1.5">
                  {projects.map((p) => {
                    const Icon = projectIcon[p.id];
                    return (
                      <li
                        key={p.id}
                        className="flex items-center gap-3 rounded-xl border border-line bg-ink px-3 py-2"
                      >
                        <Icon className="size-8 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm text-paper">{p.name}</div>
                          <div className="truncate text-xs text-fog">
                            {p.kind} · {p.period}
                          </div>
                        </div>
                        {p.live ? (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 font-mono text-xs text-lime hover:underline"
                          >
                            live <ArrowUpRight className="size-3" />
                          </a>
                        ) : (
                          <span className="flex items-center gap-1 font-mono text-xs text-fog">
                            <Lock className="size-3" /> private
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-line p-5 sm:p-6">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-medium text-on-lime transition hover:brightness-95"
              >
                <Mail className="size-4" /> Email Kunj
              </a>
              <button
                type="button"
                onClick={copy}
                className="flex items-center gap-2 rounded-full border border-line-2 px-4 py-2 text-sm text-paper transition hover:border-lime"
              >
                {copied ? (
                  <Check className="size-4 text-lime" />
                ) : (
                  <Copy className="size-4" />
                )}
                {copied ? "Summary copied" : "Copy profile summary"}
              </button>
              {profile.resume && (
                <a
                  href={profile.resume}
                  download="kunjbihari-hirani-resume.pdf"
                  className="flex items-center gap-2 rounded-full border border-line-2 px-4 py-2 text-sm text-paper transition hover:border-lime"
                >
                  Download resume <ArrowUpRight className="size-4" />
                </a>
              )}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-line-2 px-4 py-2 text-sm text-paper transition hover:border-lime"
              >
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
