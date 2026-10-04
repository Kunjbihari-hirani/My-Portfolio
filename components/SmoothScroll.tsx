"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export const SMOOTH_SCROLL_LOCK_EVENT = "smooth-scroll-lock";

export function SmoothScroll() {
  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let lenis: Lenis | undefined;
    let scrollLocked = false;

    const syncMotionPreference = () => {
      if (motionPreference.matches) {
        lenis?.destroy();
        lenis = undefined;
      } else if (!lenis) {
        lenis = new Lenis({ autoRaf: true, lerp: 0.16 });
        if (scrollLocked) lenis.stop();
      }
    };

    const handleScrollLock = (event: Event) => {
      scrollLocked = (event as CustomEvent<boolean>).detail;
      if (scrollLocked) {
        lenis?.stop();
      } else {
        lenis?.start();
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
      lenis.scrollTo(target, { duration: 0.8 });
    };

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);
    window.addEventListener(SMOOTH_SCROLL_LOCK_EVENT, handleScrollLock);
    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      motionPreference.removeEventListener("change", syncMotionPreference);
      window.removeEventListener(SMOOTH_SCROLL_LOCK_EVENT, handleScrollLock);
      document.removeEventListener("click", handleAnchorClick, true);
      lenis?.destroy();
    };
  }, []);

  return null;
}
