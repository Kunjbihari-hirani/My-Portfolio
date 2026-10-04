"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/content";
import { openQuickView } from "./QuickView";

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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  // Highlight the link of the section in view; clear it back at the top.
  useEffect(() => {
    const ids = ["top", ...links.map((l) => l.href.slice(1))];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) =>
            e.isIntersecting &&
            setActive(e.target.id === "top" ? "" : e.target.id),
        ),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!menu) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !menuButtonRef.current?.contains(target) &&
        !menuPanelRef.current?.contains(target)
      ) {
        setMenu(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menu]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-lime"
        style={{ scaleX: progress }}
      />
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-6">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-line bg-ink/80 py-1.5 pr-1.5 pl-3 backdrop-blur-md">
          <a
            href="#top"
            className="flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="grid size-7 place-items-center rounded-full bg-lime font-mono text-[11px] font-semibold text-on-lime">
              KH
            </span>
            <span className="hidden text-sm font-medium text-paper sm:block">
              {profile.name}
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => {
              const on = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <motion.a
                    href={l.href}
                    whileTap={{ scale: 0.98 }}
                    aria-current={on ? "location" : undefined}
                    className={`group relative isolate flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-[color,transform] duration-200 ease-out hover:-translate-y-px hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none ${
                      on ? "text-lime" : "text-fog"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 z-0 rounded-full bg-canopy shadow-sm shadow-lime/10 ring-1 ring-inset ring-lime/25"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {!on && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 z-0 rounded-full bg-ink-3 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className={`relative z-10 size-1.5 shrink-0 rounded-full bg-lime transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
                        on
                          ? "scale-100 opacity-100"
                          : "scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                      }`}
                    />
                    <span className="relative z-10">{l.label}</span>
                  </motion.a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openQuickView}
              className="flex h-9 items-center gap-1.5 rounded-full bg-lime px-3.5 text-sm font-medium text-on-lime transition hover:brightness-95"
            >
              <Zap className="size-3.5" />
              Quick view
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="mobile-navigation"
              className={`grid size-9 place-items-center rounded-full border transition-all duration-200 lg:hidden ${
                menu
                  ? "border-lime/50 bg-canopy/50 text-lime"
                  : "border-line-2 text-paper hover:border-lime/50 hover:bg-ink-3"
              }`}
            >
              {menu ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menu && (
            <motion.div
              ref={menuPanelRef}
              id="mobile-navigation"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-line bg-ink-2/95 p-2 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl lg:hidden"
            >
            <div className="flex items-center justify-between px-3 pb-2 pt-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                Navigate
              </span>
            </div>
            <div className="grid gap-1">
              {links.map((l, index) => {
                const on = active === l.href.slice(1);
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenu(false)}
                    aria-current={on ? "location" : undefined}
                    className={`group flex items-center gap-3 rounded-2xl px-3 py-3 transition-[background-color,color,transform] duration-200 ease-out hover:translate-x-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime motion-reduce:transform-none motion-reduce:transition-none ${
                      on
                        ? "bg-canopy text-lime shadow-sm shadow-lime/10 ring-1 ring-inset ring-lime/20"
                        : "text-fog hover:bg-ink-3/70 hover:text-paper"
                    }`}
                  >
                    <span
                      className={`w-6 font-mono text-[10px] ${on ? "text-lime" : "text-fog/60"}`}
                    >
                      0{index + 1}
                    </span>
                    <span className="flex-1 text-sm font-medium">
                      {l.label}
                    </span>
                    <span
                      className={`size-1.5 rounded-full transition-opacity ${on ? "bg-lime opacity-100" : "bg-line-2 opacity-0 group-hover:opacity-100"}`}
                    />
                  </a>
                );
              })}
              </div>
              {profile.resume && (
                <a
                  href={profile.resume}
                  download="kunjbihari-hirani-resume.pdf"
                  className="mt-1 block rounded-2xl px-3 py-3 text-sm text-lime transition hover:bg-ink-3"
                >
                  Download resume ↓
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
