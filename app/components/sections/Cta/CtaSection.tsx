"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "./CTAbutton";
import { ctaElements } from "@/app/data/ctaElements";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {

    if (headingRef.current && paraRef.current) {
      const words = headingRef.current.querySelectorAll("span");

      gsap.set(words, {
        opacity: 0,
        y: 30,
        filter: "blur(6px)",
      });

      gsap.set(paraRef.current, {
        opacity: 0,
        y: 20,
        filter: "blur(6px)",
      });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.to(paraRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }

    // BACKGROUND ELEMENTS
    if (bgRef.current) {
      const elements = bgRef.current.querySelectorAll("img");

      gsap.set(elements, {
        opacity: 0,
      });

      gsap.to(elements, {
        opacity: 1,
        duration: 0.8,
        ease: "power1.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }

    // BUTTON POP ANIMATION
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        opacity: 0,
        scale: 0.6,
      });

      gsap.to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "elastic.out(1.2, 0.45)",
        delay: 0.5,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }

  }, []);

  return (
    <section
      data-cursor="orange"
      className="relative w-full flex items-center justify-center bg-brand overflow-hidden py-[120px]"
    >
      {/* BACKGROUND ELEMENTS */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none z-0">
        {ctaElements.map((el, i) => (
          <img
            key={i}
            src={el.src}
            className={`absolute ${el.className}`}
            alt=""
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center mt-20">
        
        {/* HEADING */}
        <h2
          ref={headingRef}
          className="font-radlush font-[400] my-[10px] text-[clamp(18px,5vw,48px)] leading-[1.1] text-black"
        >
          {"Ready to level up your content?".split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-[0.35em]">
              {word}
            </span>
          ))}
        </h2>

        {/* TEXT */}
        <p
          ref={paraRef}
          className="max-w-[720px] text-[clamp(14px,1.9vw,22px)] text-black/80"
        >
          We’ll take your brand from where it is... to where it deserves to be.
        </p>

        {/* BUTTON */}
        <div
          data-clickable
          ref={buttonRef}
          className="mt-6 flex justify-center -translate-y-[clamp(10px,4vw,70px)]"
        >
          <CTAButton />
        </div>

      </div>
    </section>
  );
}