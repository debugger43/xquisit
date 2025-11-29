"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "@/app/lib/gsap";
import FloatingElement from "./floatingElements";

import {
  clusterLeft,
  clusterRight,
  clusterBottom,
  mobileItems,
} from "@/app/data/clusters";

type FloatItem = {
  id: string;
  src: string;
  w: number;
  h: number;
  pos: string;
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLImageElement | null>(null);

  const [screenWidth, setScreenWidth] = useState<number>(() =>
    typeof window === "undefined" ? 1920 : window.innerWidth
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const floatingItems: FloatItem[] =
    screenWidth <= 768
      ? mobileItems
      : screenWidth <= 1280
      ? [
          ...mobileItems,
          ...clusterLeft.slice(0, 4),
          ...clusterRight.slice(0, 4),
        ]
      : [...clusterLeft, ...clusterRight, ...clusterBottom];

  const floatRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const map: Record<string, HTMLDivElement | null> = {};

    floatingItems.forEach((item) => {
      map[item.id] = floatRefs.current[item.id] ?? null;
    });

    floatRefs.current = map;
  }, [floatingItems]);

  // GSAP ANIMATIONS

  useEffect(() => {
    const els = Object.values(floatRefs.current).filter(
      (el): el is HTMLDivElement => !!el
    );

    if (!textRef.current) return;

    const tl = gsap.timeline();

    tl.set(textRef.current, { opacity: 0, y: 80 });
    tl.set(els, { opacity: 0, scale: 0.8, y: 30 });

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power4.out",
    });

    tl.to(textRef.current, {
      y: -30,
      duration: 0.9,
      ease: "power3.inOut",
    });

    tl.to(
      els,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    );

    // floating animation
    els.forEach((el, i) =>
      gsap.to(el, {
        y: "+=16",
        rotation: i % 2 ? "+=5" : "-=5",
        duration: 4 + i * 0.15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    );

    return () => {
      tl.kill();
      gsap.killTweensOf(els);
    };
  }, [floatingItems, screenWidth]);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100vh] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* HERO TEXT */}
      <img
        ref={textRef}
        src="/hero-text.svg"
        alt="Beyond Screens Into Your Heart"
        className="w-[70vw] max-w-[1335px] select-none z-[10] mix-blend-normal"
        style={{ height: "auto" }}
      />

      {/* FLOATING ICONS */}
      {floatingItems.map((item) => (
        <FloatingElement
          key={item.id}
          innerRef={(el) => {
            floatRefs.current[item.id] = el;
          }}
          src={item.src}
          width={item.w}
          height={item.h}
          className={`${item.pos} absolute z-[5]`}
        />
      ))}
    </section>
  );
}
