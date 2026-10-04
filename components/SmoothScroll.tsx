"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let lenis: Lenis | undefined;

    const syncMotionPreference = () => {
      if (motionPreference.matches) {
        lenis?.destroy();
        lenis = undefined;
      } else if (!lenis) {
        lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
      }
    };

    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !lenis
      ) {
        return;
      }

      const anchor = event
        .composedPath()
        .find((target): target is HTMLAnchorElement => target instanceof HTMLAnchorElement);
      const href = anchor?.getAttribute("href");
      if (!href?.startsWith("#")) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();
      if (window.location.hash !== href) {
        window.history.pushState(null, "", href);
      }
      lenis.scrollTo(target);
    };

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);
    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      motionPreference.removeEventListener("change", syncMotionPreference);
      document.removeEventListener("click", handleAnchorClick, true);
      lenis?.destroy();
    };
  }, []);

  return null;
}
