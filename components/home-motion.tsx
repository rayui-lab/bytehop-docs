"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-home-reveal]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    root.classList.add("bytehop-motion-ready");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      for (const element of elements) element.classList.add("is-visible");
      return () => root.classList.remove("bytehop-motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    for (const element of elements) observer.observe(element);

    return () => {
      observer.disconnect();
      root.classList.remove("bytehop-motion-ready");
    };
  }, []);

  return null;
}
