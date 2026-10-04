"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const readSaved = (): Theme | null => {
  try {
    const s = localStorage.getItem("theme");
    return s === "light" || s === "dark" ? s : null;
  } catch {
    return null;
  }
};

/** Light/dark switch. The first theme is set in layout.tsx before paint; this keeps it in sync. */
export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    // Follow the system setting until the visitor picks one.
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      if (readSaved()) return;
      const next: Theme = e.matches ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const label = theme === "light" ? "Dark mode" : "Light mode";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${label.toLowerCase()}`}
      title={`Switch to ${label.toLowerCase()}`}
      className="flex h-9 items-center gap-2 rounded-full border border-line-2 px-3 text-sm text-paper transition hover:border-lime hover:text-lime"
    >
      {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
      {!compact && <span className="hidden lg:inline">{label}</span>}
    </button>
  );
}
