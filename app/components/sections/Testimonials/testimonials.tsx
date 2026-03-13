"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TestimonialCard from "./TestimonialsCard";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const curveRef = useRef<SVGPathElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const slide1CardsRef = useRef<HTMLDivElement[]>([]);
  const slide2CardsRef = useRef<HTMLDivElement[]>([]);

  const slide1HeadingRef = useRef<HTMLHeadingElement | null>(null);
  const slide2HeadingRef = useRef<HTMLHeadingElement | null>(null);

  const slide1ParagraphRef = useRef<HTMLParagraphElement | null>(null);
  const slide2ParagraphRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {

    if (!sectionRef.current || !trackRef.current) return;

    const slide1Words = slide1HeadingRef.current?.querySelectorAll("span");
    const slide2Words = slide2HeadingRef.current?.querySelectorAll("span");

    if (!slide1Words || !slide2Words) return;

    let slide2HeadingPlayed = false;
    let slide2CardsPlayed = false;

    /* CURVE INITIAL STATE */

    let curveLength = 0;

    if (curveRef.current) {
      curveLength = curveRef.current.getTotalLength();

      gsap.set(curveRef.current, {
        strokeDasharray: curveLength,
        strokeDashoffset: curveLength
      });
    }

    const ctx = gsap.context(() => {

      /* SPLIT TEXT */

      const slide1Split = new SplitType(slide1ParagraphRef.current!, {
        types: "words,chars"
      });

      const slide2Split = new SplitType(slide2ParagraphRef.current!, {
        types: "words,chars"
      });

      /* INITIAL STATES */

      gsap.set([slide1Words, slide2Words], {
        opacity: 0,
        y: 20,
        filter: "blur(8px)"
      });

      gsap.set([...slide1CardsRef.current, ...slide2CardsRef.current], {
        opacity: 0,
        scale: 0.7
      });

      gsap.set([...(slide1Split.chars || []), ...(slide2Split.chars || [])], {
        opacity: 0,
        y: 12,
        filter: "blur(6px)"
      });

      /* SLIDE 1 ANIMATIONS */

      gsap.to(slide1Words, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true
        }
      });

      gsap.to(slide1CardsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1,0.5)",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true
        }
      });

      gsap.to(slide1Split.chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.01,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true
        }
      });

      /* HORIZONTAL SCROLL */

      gsap.to(trackRef.current, {
        x: "-100vw",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=40%",
          scrub: 0.5,
          pin: true,

          onUpdate: (self) => {

            const p = self.progress;

            /* CURVE PROGRESS WITH SCROLL */

            if (curveRef.current) {
              gsap.set(curveRef.current, {
                strokeDashoffset: curveLength * (1 - p)
              });
            }

            /* SLIDE 2 */

            if (p > 0.45 && !slide2HeadingPlayed) {

              slide2HeadingPlayed = true;

              gsap.to(slide2Words, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.12
              });

            }

            if (p > 0.55 && !slide2CardsPlayed) {

              slide2CardsPlayed = true;

              gsap.to(slide2CardsRef.current, {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "elastic.out(1,0.5)",
                stagger: 0.12
              });

            }

            if (p > 0.65) {

              gsap.to(slide2Split.chars, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.45,
                ease: "power2.out",
                stagger: 0.01
              });

            }

          }
        }
      });

      return () => {
        slide1Split.revert();
        slide2Split.revert();
      };

    }, sectionRef);

    return () => ctx.revert();

  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      data-cursor="orange"
      className="relative w-full h-screen overflow-hidden bg-brand"
    >
      {/* GLOW CURVE BACKGROUND */}

      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          fill="none"
          className="w-[180vw] max-w-none"
        >
          <defs>
            <filter
              id="testimonial_curve_blur"
              x="-120"
              y="-66"
              width="2162"
              height="1147"
              filterUnits="userSpaceOnUse"
            >
              <feGaussianBlur stdDeviation="6.5" />
            </filter>

            <linearGradient
              id="testimonial_curve_gradient"
              x1="967"
              y1="-28"
              x2="967"
              y2="1042"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#33E069" />
              <stop offset="50%" stopColor="#33E069" />
              <stop offset="80%" stopColor="#1C727A" />
              <stop offset="100%" stopColor="#1C727A" />
            </linearGradient>
          </defs>

          <g filter="url(#testimonial_curve_blur)">
            <path
              ref={curveRef}
              d="M2021.5 -28.5C1914.5 3.16 1687.8 113.9 1637 303.5C1573.5 540.5 1478.5 685.5 1191.5 722.5C904.5 759.5 793.5 501.5 422 836C124.8 1103.6 -40.83 1054.5 -86.5 996.5"
              stroke="url(#testimonial_curve_gradient)"
              strokeWidth="55"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>
      </div>
      <div className="relative z-10 h-full overflow-hidden">
        <div ref={trackRef} className="flex w-[200vw] h-full">
          {/* SLIDE 1 */}

          <div className="w-screen h-full flex justify-center">

            <div className="max-w-[1400px] w-full px-8 pt-[70px] space-y-10">

              <div className="text-center">

                <h2
                  ref={slide1HeadingRef}
                  className="font-radlush text-[57px] leading-[100%] font-[900] text-black text-stroke-white"
                >
                  {"We Don’t Make The Claims, Our Clients Do"
                    .split(" ")
                    .map((word, i) => (
                      <span
                        key={i}
                        className={`inline-block mr-[10px] ${["Our", "Clients", "Do"].includes(word) ? "text-[#3d318d]" : ""
                          }`}
                      >
                        {word}
                      </span>
                    ))}
                </h2>

              </div>

              <div className="flex justify-center gap-10">

                <TestimonialCard
                  src="/elements/testimonials/test_1.png"
                  ref={(el) => {
                    if (el) slide1CardsRef.current[0] = el;
                  }}
                />

                <TestimonialCard
                  src="/elements/testimonials/test_2.png"
                  ref={(el) => {
                    if (el) slide1CardsRef.current[1] = el;
                  }}
                />

              </div>

              <div className="max-w-[1100px]">

                <p
                  ref={slide1ParagraphRef}
                  className="font-radlush text-[40px] leading-[120%] font-[500] text-black text-balance"
                >
                  At Xquisit, we solve what frustrates creators the most:
                  delays, confusion, and edits that miss the mark. We<br />stay aligned, move
                  fast, study your niche, and deliver<br />visuals that fit your brand
                  perfectly. Smooth process,<br /> solid results.
                </p>

              </div>

            </div>

          </div>

          {/* SLIDE 2 */}

          <div className="w-screen h-full flex justify-center">

            <div className="max-w-[1400px] w-full px-8 pt-[70px] space-y-10">

              <div className="text-center">

                <h2
                  ref={slide2HeadingRef}
                  className="font-radlush text-[57px] leading-[100%] font-[900] text-black text-stroke-white"
                >
                  {"We Don’t Make The Claims, Our Clients Do"
                    .split(" ")
                    .map((word, i) => (
                      <span
                        key={i}
                        className={`inline-block mr-[10px] ${["Our", "Clients", "Do"].includes(word) ? "text-[#3d318d]" : ""
                          }`}
                      >
                        {word}
                      </span>
                    ))}
                </h2>

              </div>


              <div
                ref={slide2ParagraphRef}
                className="font-radlush text-[40px] leading-[115%] font-[500] text-black max-w-[1400px] mx-auto grid grid-cols-12 gap-y-1 text-balance"
              >

                <p className="col-start-2 col-span-12">
                  We listen before we edit. We study your tone, your audience,
                </p>

                <p className="lg:col-start-2 col-span-11">
                  and your pace to craft visuals that sync perfectly with your
                </p>

                <p className="lg:col-start-3 col-span-10">
                  brand’s heartbeat. We don’t follow rhythm. We create it.
                </p>

              </div>

              <div className="flex justify-center gap-10 mt-24">

                <TestimonialCard
                  src="/elements/testimonials/test_3.png"
                  ref={(el) => {
                    if (el) slide2CardsRef.current[0] = el;
                  }}
                />

                <TestimonialCard
                  src="/elements/testimonials/test_4.png"
                  ref={(el) => {
                    if (el) slide2CardsRef.current[1] = el;
                  }}
                />

              </div>

            </div>

          </div>

        </div>
      </div>

    </section>

  );
}