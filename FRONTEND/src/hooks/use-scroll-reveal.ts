import { useEffect } from "react";

type RevealOptions = {
  selector?: string;
  staggerChildrenSelector?: string;
};

export function useScrollReveal(options: RevealOptions = {}) {
  const { selector = "[data-reveal]", staggerChildrenSelector = "[data-reveal-stagger] > *" } = options;

  useEffect(() => {
    let isMounted = true;
    let cleanupFns: Array<() => void> = [];

    const setup = async () => {
      try {
        const gsapModule = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        const gsap = gsapModule.gsap || gsapModule.default || gsapModule;

        if (!isMounted) return;

        if (!gsap.core.globals().ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
        }

        // Generic: animate any explicitly marked element
        const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
        elements.forEach((el) => {
          if (el.dataset.gsapProcessed === "true") return;
          el.dataset.gsapProcessed = "true";
          const ctx = gsap.context(() => {
            gsap.from(el, {
              autoAlpha: 0,
              y: 24,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
              },
            });
          }, el);
          cleanupFns.push(() => ctx.revert());
        });

        // Stagger children if container is marked
        const staggerParents = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-stagger]"));
        staggerParents.forEach((parent) => {
          if (parent.dataset.gsapProcessed === "true") return;
          parent.dataset.gsapProcessed = "true";
          const items = Array.from(parent.querySelectorAll<HTMLElement>(staggerChildrenSelector));
          if (items.length === 0) return;
          const ctx = gsap.context(() => {
            gsap.from(items, {
              autoAlpha: 0,
              y: 20,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: parent,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
              },
            });
          }, parent);
          cleanupFns.push(() => ctx.revert());
        });

        // Lightweight default for pages not annotated: fade in top-level content
        const mainContainers = Array.from(document.querySelectorAll<HTMLElement>(".min-h-screen"));
        mainContainers.forEach((container) => {
          if (container.dataset.gsapAutobind === "true") return;
          container.dataset.gsapAutobind = "true";
          const children = Array.from(container.children) as HTMLElement[];
          const ctx = gsap.context(() => {
            gsap.from(children, {
              autoAlpha: 0,
              y: 16,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.06,
              scrollTrigger: {
                trigger: container,
                start: "top 90%",
                once: true,
              },
            });
          }, container);
          cleanupFns.push(() => ctx.revert());
        });
      } catch {
        // gsap not installed; fail silently to avoid breaking the app
      }
    };

    setup();

    return () => {
      isMounted = false;
      cleanupFns.forEach((fn) => fn());
      cleanupFns = [];
    };
  }, [selector, staggerChildrenSelector]);
}


