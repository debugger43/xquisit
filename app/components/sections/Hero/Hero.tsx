"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import FloatingElement from "@/app/components/ui/floatingElements";
import { clusterLeft, clusterRight, clusterBottom } from "@/app/data/clusters";

export default function Hero() {
  const textRef = useRef<HTMLDivElement | null>(null);
  const floatRefs = useRef<HTMLDivElement[]>([]);
  const staticRefs = useRef<HTMLDivElement[]>([]);
  const navbarRef = useRef<HTMLElement | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const idleTweens = useRef<Map<HTMLElement, gsap.core.Tween>>(new Map());
  const isNearMap = useRef<Map<HTMLElement, boolean>>(new Map());

  const allItems = [...clusterLeft, ...clusterRight, ...clusterBottom];
  const reactiveItems = allItems.filter((i) => i.reactive);
  const staticItems = allItems.filter((i) => !i.reactive);

  useLayoutEffect(() => {


    navbarRef.current = document.querySelector("[data-navbar]");

    /* -------------------------------
       IDLE FLOAT ANIMATION
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
       PROXIMITY ANIMATION 
    -------------------------------- */
    const updateProximity = () => {
      floatRefs.current.forEach((el, index) => {
        if (!el) return;

        const proximityInner = el.querySelector(
          ".proximity-inner",
        ) as HTMLElement | null;
        if (!proximityInner) return;

        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = mouse.current.x - cx;
        const dy = mouse.current.y - cy;
        const distance = Math.hypot(dx, dy);
        const maxDistance = 150;

        const wasNear = isNearMap.current.get(proximityInner) ?? false;
        const isNear = distance < maxDistance;

        isNearMap.current.set(proximityInner, isNear);

        if (!isNear) {
          if (wasNear) {
            gsap.to(proximityInner, {
              x: 0,
              duration: 0.4,
              ease: "power3.out",
            });
          }
          return;
        }

        const strength = (1 - distance / maxDistance) * 10;
        gsap.to(proximityInner, {
          x: dx * 0.008 * strength,
          y: dy * 0.008 * strength,
          duration: 0.45,
          ease: "sine.out",
          overwrite: "auto",
        });
      });
    };

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

    const words = textRef.current.querySelectorAll("span");

    const line1Words = Array.from(words).slice(0, 2);
    const line2Words = Array.from(words).slice(2);

    gsap.set(words, {
      opacity: 0,
      y: 38,
      filter: "blur(8px)",
    });

    tl.to(line1Words, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
      stagger: 0.06,
    });

    tl.to(
      line2Words,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      },
      "-=0.6",
    );


    if (navbarRef.current) {
      tl.fromTo(
        navbarRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.9, ease: "sine.out" },
      );
    }

    tl.to({}, { duration: 0.6 });

    /* -------------------------------
       FLOATING ELEMENTS ENTRY
    -------------------------------- */
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
        duration: 0.65,
        ease: "power3.out",
      },
      "-=0.3",
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
      "+=0.1",
    );

    /* -------------------------------
       START IDLE FLOAT FOR REACTIVE ELEMENTS
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
      data-cursor="green"
      className="relative w-full h-[var(--app-height)] overflow-hidden bg-black">
    
      <span id="hero-anchor" aria-hidden className="absolute top-0 left-0" />

      
      <div
        ref={textRef}
   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+45px)] z-[100] text-center pointer-events-none select-none"
      >
        <h1 className="font-[900] tracking-[-0.01em] leading-[0.95]">
    
  <span className="block whitespace-nowrap">
    {"BEYOND SCREENS".split(" ").map((word, i) => (
      <span
        key={i}
        className="inline-block mr-[0.35em] text-white text-[clamp(36px,9vw,120px)]"
      >
        {word}
      </span>
    ))}
  </span>

  <span className="block whitespace-nowrap">
    {"INTO YOUR HEART".split(" ").map((word, i) => (
      <span
        key={i}
        className="inline-block mr-[0.35em] text-[#bfe3ff] text-[clamp(36px,9vw,120px)]"
      >
        {word}
      </span>
    ))}
  </span>

</h1>
      </div>

      {staticItems.map((item, i) => (
        <FloatingElement
          key={item.id}
          innerRef={(el) => el && (staticRefs.current[i] = el)}
          src={item.src}
          width={item.w}
          height={item.h}
          className={`${item.pos} absolute z-[15] shrink-0`}
        />
      ))}

      {reactiveItems.map((item, i) => (
        <FloatingElement
          key={item.id}
          innerRef={(el) => el && (floatRefs.current[i] = el)}
          src={item.src}
          width={item.w}
          height={item.h}
          className={`${item.pos} absolute z-[5] shrink-0`}
        />
      ))}
    </section>
  );
}