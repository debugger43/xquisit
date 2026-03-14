"use client";

import WorkGrid from "./workGrid";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
  const curveRef = useRef<SVGPathElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    /* -------------------------------
       CURVE DRAW ANIMATION
    -------------------------------- */
    if (curveRef.current) {
      const length = curveRef.current.getTotalLength();

      gsap.set(curveRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(curveRef.current, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power1.out",
        scrollTrigger: {
          trigger: curveRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }

    /* -------------------------------
       HERO-STYLE HEADING ANIMATION
    -------------------------------- */
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll("span");

      gsap.set(words, {
        opacity: 0,
        y: 38,
        filter: "blur(8px)",
      });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.3,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }

    /* -------------------------------
       WORK CARDS ANIMATION
    -------------------------------- */
 if (gridRef.current) {
  const cards = gridRef.current.querySelectorAll(".work-item");
gsap.set(cards, {
  opacity: 0,
  scale: 0.6,
});

gsap.to(cards, {
  opacity: 1,
  scale: 1,
  duration: 1.2,
  ease: "elastic.out(1.2, 0.45)",
  stagger: 0.14,
  delay: 1,
  scrollTrigger: {
    trigger: gridRef.current,
    start: "top 90%",
    once: true,
  },
});
}
  }, []);

  return (
    <section 
    id="works"
    data-cursor="green"
    className="relative h-[var(--app-height)] w-full overflow-hidden bg-black">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/elements/works/work-grid.png"
          alt=""
          className="w-full h-full object-cover scale-[1.2]"
        />
      </div>

      {/* BIG CURVE */}
      <div className="absolute inset-0 z-[5] pointer-events-none flex items-center justify-center">
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          fill="none"
          className="w-[180vw] max-w-none"
        >
          <defs>
            <filter
              id="filter0_f_320_34"
              x="-120.028"
              y="-66.5311"
              width="2162.01"
              height="1147.76"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="6.55" result="effect1_foregroundBlur_320_34" />
            </filter>

            <linearGradient
              id="paint0_linear_320_34"
              x1="967.5"
              y1="-28.5"
              x2="967.5"
              y2="1042.14"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DABD4A" />
              <stop offset="1" stopColor="#3DA951" />
            </linearGradient>
          </defs>

          <g filter="url(#filter0_f_320_34)">
            <path
              ref={curveRef}
              d="M2021.5 -28.5C1914.5 3.16667 1687.8 113.9 1637 303.5C1573.5 540.5 1478.5 685.5 1191.5 722.5C904.5 759.5 793.5 501.5 422 836C124.8 1103.6 -40.8333 1054.5 -86.5 996.5"
              stroke="url(#paint0_linear_320_34)"
              strokeWidth="55"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>
      </div>

      {/* HEADING */}
      <div className="absolute top-[6vh] left-1/2 -translate-x-1/2 w-[92vw] max-w-[1500px] text-center pointer-events-none z-10">
        <h2
          ref={headingRef}
          className="font-[900] text-[clamp(16px,7vw,72px)] leading-[1.1] text-white whitespace-nowrap"
        >
          {"Different Styles, Same Excellence".split(" ").map((word, i) => (
            <span
              key={i}
              className={`inline-block mr-[0.35em] ${
                word === "Excellence" ? "text-brand" : ""
              }`}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* WORK GRID */}
      <div
        ref={gridRef}
        className="mx-auto mt-[12vh] w-[min(86vw,1520px)] h-[90vh] overflow-hidden relative z-10"
      >
        <WorkGrid />
      </div>

    </section>
  );
}