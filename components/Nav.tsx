"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/content";
import { openQuickView } from "./QuickView";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#build", label: "How I build" },
  { href: "#stack", label: "Stack" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [active, setActive] = useState("");
  const [menu, setMenu] = useState(false);

  // Highlight the link of the section in view; clear it back at the top.
  useEffect(() => {
    const ids = ["top", ...links.map((l) => l.href.slice(1))];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id === "top" ? "" : e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-lime" style={{ scaleX: progress }} />
      <header className="fixed inset-x-0 top-3 z-50 px-4 sm:px-6">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-line bg-ink/80 py-1.5 pr-1.5 pl-3 backdrop-blur-md">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top">
            <span className="grid size-7 place-items-center rounded-full bg-lime font-mono text-[11px] font-semibold text-on-lime">KH</span>
            <span className="hidden text-sm font-medium text-paper sm:block">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => {
              const on = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${on ? "bg-ink-3 text-paper" : "text-fog hover:text-paper"}`}
                  >
                    {on && <span className="size-1 rounded-full bg-lime" />}
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <button
              type="button"
              onClick={openQuickView}
              className="flex h-9 items-center gap-1.5 rounded-full bg-lime px-3.5 text-sm font-medium text-on-lime transition hover:brightness-95"
            >
              <Zap className="size-3.5" />
              <span className="hidden sm:inline">Recruiter</span> quick view
            </button>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              className="grid size-9 place-items-center rounded-full border border-line-2 text-paper lg:hidden"
            >
              {menu ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        {menu && (
          <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-ink-2 p-2 shadow-2xl lg:hidden">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenu(false)} className="block rounded-2xl px-4 py-3 text-paper hover:bg-ink-3">
                {l.label}
              </a>
            ))}
            {profile.resume && (
              <a href={profile.resume} target="_blank" rel="noreferrer" className="block rounded-2xl px-4 py-3 text-lime hover:bg-ink-3">
                Resume ↗
              </a>
            )}
          </div>
        )}
      </header>
    </>
  );
}
