"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "./CTAbutton";
import { ctaElements } from "@/app/data/ctaElements";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (headingRef.current && paraRef.current && buttonRef.current) {
      const words = headingRef.current.querySelectorAll("span");

      const split = new SplitType(paraRef.current, {
        types: "chars",
      });

      gsap.set(words, {
        opacity: 0,
        y: 30,
        filter: "blur(6px)",
      });

      gsap.set(split.chars, {
        opacity: 0,
        y: 12,
        filter: "blur(6px)",
      });

      gsap.set(buttonRef.current, {
        opacity: 0,
        scale: 0.6,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // HEADING
      tl.to(words, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
      });

      // PARAGRAPH
      tl.to(
        split.chars,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.008,
        },
        ">",
      );

      // BUTTON
      tl.to(
        buttonRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1.2, 0.45)",
        },
        "-=0.5",
      );

      return () => {
        split.revert();
        tl.kill();
      };
    }

    // BACKGROUND ELEMENTS
    if (bgRef.current) {
      const elements = bgRef.current.querySelectorAll("img");

      gsap.set(elements, {
        opacity: 0,
      });

      gsap.to(elements, {
        opacity: 1,
        duration: 1.2,
        ease: "power1.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top 20%",
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
          className="font-radlush font-[500] my-[6px] text-[clamp(20px,5vw,42px)] leading-[1.15] tracking-[0] text-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.30)]"
        >
          {"Ready to level up your content?".split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-[0.20em]">
              {word}
            </span>
          ))}
        </h2>

        {/* TEXT */}
        <p
          ref={paraRef}
          className="max-w-[700px] text-[clamp(14px,1.9vw,19px)] text-black"
        >
          We’ll take your brand from where it is - to where it deserves to be.
        </p>

        {/* BUTTON */}
        <div
          data-clickable
          ref={buttonRef}
          className="mt-3 flex justify-center tracking-[0] -translate-y-[clamp(10px,4vw,70px)]"
        >
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
