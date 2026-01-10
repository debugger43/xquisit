"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import FloatingElement from "@/app/components/ui/floatingElements";
import {
  clusterLeft,
  clusterRight,
  clusterBottom,
} from "@/app/data/clusters";

export default function Hero() {
  const textRef = useRef<HTMLImageElement | null>(null);
  const floatRefs = useRef<HTMLDivElement[]>([]);
  const staticRefs = useRef<HTMLDivElement[]>([]);
  const navbarRef = useRef<HTMLElement | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const idleTweens = useRef<Map<HTMLElement, gsap.core.Tween>>(new Map());
  const isNearMap = useRef<Map<HTMLElement, boolean>>(new Map());

  const allItems = [...clusterLeft, ...clusterRight, ...clusterBottom];
  const reactiveItems = allItems.filter((i) => i.reactive);
  const staticItems = allItems.filter((i) => !i.reactive);

  useEffect(() => {
    navbarRef.current = document.querySelector("[data-navbar]");

    /* -------------------------------
       IDLE FLOAT (ONE TIME)
    -------------------------------- */
    const startIdleFloat = (inner: HTMLElement, index: number) => {
      if (idleTweens.current.has(inner)) return;

      const tween = gsap.to(inner, {
        y: "+=10",
        duration: 3.5 + index * 0.15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      idleTweens.current.set(inner, tween);
    };

    /* -------------------------------
       PROXIMITY UPDATE (TICKER)
    -------------------------------- */
    const updateProximity = () => {
      floatRefs.current.forEach((el, index) => {
        if (!el) return;

        const inner = el.querySelector(".float-inner") as HTMLElement | null;
        if (!inner) return;

        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = mouse.current.x - cx;
        const dy = mouse.current.y - cy;
        const distance = Math.hypot(dx, dy);
        const maxDistance = 150;

        const wasNear = isNearMap.current.get(inner) ?? false;
        const isNear = distance < maxDistance;

        isNearMap.current.set(inner, isNear);

        if (!isNear) {
          if (wasNear) {
            gsap.to(inner, {
              x: 0,
              duration: 0.4,
              ease: "power3.out",
            });
          }
          return;
        }

        const strength = (1 - distance / maxDistance) * 10;

        gsap.to(inner, {
          x: dx * 0.008 * strength,
          y: dy * 0.008 * strength,
          duration: 0.45,
          ease: "sine.out",
          overwrite: "auto",
        });
      });
    };

    /* -------------------------------
       MOUSE TRACKING
    -------------------------------- */
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    gsap.ticker.add(updateProximity);

    /* -------------------------------
       HERO ENTRY TIMELINE
    -------------------------------- */
    if (!textRef.current) return;

    gsap.set(staticRefs.current, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to({}, { duration: 1 });

    tl.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 }
    );

    tl.fromTo(
      textRef.current,
      { y: 20 },
      { y: -45, duration: 1.4 }
    );

    if (navbarRef.current) {
      tl.fromTo(
        navbarRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.9, ease: "sine.out" }
      );
    }

    tl.to({}, { duration: 0.6 });

    tl.fromTo(
      floatRefs.current,
      {
        opacity: 0,
        y: 220,
        scale: 0.75,
        rotation: -18,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.9,
        stagger: 0.09,
      },
      "-=0.3"
    );

    tl.set(floatRefs.current, { clearProps: "transform" });

    tl.to(
      staticRefs.current,
      {
        opacity: 1,
        duration: 1.2,
        stagger: 0.04,
        ease: "power2.out",
      },
      "+=0.1"
    );

    /* -------------------------------
       START IDLE FLOAT
    -------------------------------- */
    floatRefs.current.forEach((el, i) => {
      const inner = el.querySelector(".float-inner");
      if (inner) startIdleFloat(inner as HTMLElement, i);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(updateProximity);
      tl.kill();
      idleTweens.current.forEach((t) => t.kill());
      idleTweens.current.clear();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* 🔑 STABLE HERO SCROLL ANCHOR */}
      <span
        id="hero-anchor"
        aria-hidden
        className="absolute top-0 left-0"
      />

      <img
        ref={textRef}
        src="/elements/hero-text.svg"
        alt="Beyond Screens Into Your Heart"
        className="w-[70vw] max-w-[1335px] z-[10] pointer-events-none"
        draggable={false}
      />

      {staticItems.map((item, i) => (
        <FloatingElement
          key={item.id}
          innerRef={(el) => el && (staticRefs.current[i] = el)}
          src={item.src}
          width={item.w}
          height={item.h}
          className={`${item.pos} absolute z-[15]`}
        />
      ))}

      {reactiveItems.map((item, i) => (
        <FloatingElement
          key={item.id}
          innerRef={(el) => el && (floatRefs.current[i] = el)}
          src={item.src}
          width={item.w}
          height={item.h}
          className={`${item.pos} absolute z-[5]`}
        />
      ))}
    </section>
  );
}