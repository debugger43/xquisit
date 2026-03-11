"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ITEMS = [
  { label: "HOME", id: "hero" },
  { label: "WORKS", id: "works" },
  { label: "TESTIMONIALS", id: "testimonials" },
];

export default function NavbarLinks() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const activeIndex = useRef(0);
  const isClickScrolling = useRef(false);

  const movePill = (index: number) => {
    const nav = navRef.current;
    const pill = pillRef.current;
    const link = linkRefs.current[index];
    if (!nav || !pill || !link) return;

    const linkRect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    gsap.to(pill, {
      width: linkRect.width,
      x: linkRect.left - navRect.left,
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });

    // mark active
    linkRefs.current.forEach((l) => l?.classList.remove("is-active"));
    link.classList.add("is-active");
  };

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;

    const links = linkRefs.current.filter(Boolean) as HTMLAnchorElement[];

    // RESET ON RELOAD
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
      requestAnimationFrame(() => {
        gsap.to(window, { scrollTo: 0, duration: 0 });
      });
    }

    // SCROLL + URL
    links.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const target = document.getElementById(ITEMS[index].id);
        if (!target) return;

        isClickScrolling.current = true;
        activeIndex.current = index;
        movePill(index);

        gsap.to(window, {
          scrollTo: { y: target, offsetY: 88 },
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            isClickScrolling.current = false;
            history.pushState(null, "", `#${ITEMS[index].id}`);
          },
        });
      });
    });

    // Temporary hover effect
    links.forEach((link, index) => {
      link.addEventListener("mouseenter", () => {
        if (isClickScrolling.current) return;
        movePill(index);
      });
    });

    nav.addEventListener("mouseleave", () => {
      movePill(activeIndex.current);
    });

    // HERO 
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top+=80",
      end: "bottom top+=80",
      onEnter: () => {
        if (isClickScrolling.current) return;
        activeIndex.current = 0;
        movePill(0);
      },
      onEnterBack: () => {
        if (isClickScrolling.current) return;
        activeIndex.current = 0;
        movePill(0);
      },
    });

    // WORKS + TESTIMONIALS
    ITEMS.slice(1).forEach((item, offset) => {
      const index = offset + 1;

      ScrollTrigger.create({
        trigger: `#${item.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          if (isClickScrolling.current) return;
          activeIndex.current = index;
          movePill(index);
        },
        onEnterBack: () => {
          if (isClickScrolling.current) return;
          activeIndex.current = index;
          movePill(index);
        },
      });
    });

    requestAnimationFrame(() => movePill(0));
  }, []);

  return (
    <div ref={navRef} className="relative flex items-center gap-6 h-[44px]">
      <span
        ref={pillRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 h-[34px] rounded-md bg-[#3cb5ff] opacity-0"
      />

      {ITEMS.map((item, i) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          ref={(el) => {linkRefs.current[i] = el}}
          className="nav-link relative z-10 px-4 h-[44px] flex items-center font-radlush text-[20px] font-[500] leading-[100%] tracking-[0em] text-white"
        >
          <span className="nav-text">
            <span className="nav-text-inner">
              <span className="nav-text-front">{item.label}</span>
              <span className="nav-text-back">{item.label}</span>
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}