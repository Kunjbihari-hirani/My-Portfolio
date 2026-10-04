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

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);

    return () => {
      motionPreference.removeEventListener("change", syncMotionPreference);
      lenis?.destroy();
    };
  }, []);

  return null;
}
