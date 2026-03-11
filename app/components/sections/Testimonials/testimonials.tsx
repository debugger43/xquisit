"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TestimonialCard from "./TestimonialsCard";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {

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

    let slide1HeadingPlayed = false;
    let slide2HeadingPlayed = false;

    let slide1CardsPlayed = false;
    let slide2CardsPlayed = false;

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

            /* SLIDE 1 */

            if (p > 0.01 && !slide1HeadingPlayed) {

              slide1HeadingPlayed = true;

              gsap.to(slide1Words, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.12
              });

            }

            if (p > 0.02 && !slide1CardsPlayed) {

              slide1CardsPlayed = true;

              gsap.to(slide1CardsRef.current, {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "elastic.out(1,0.5)",
                stagger: 0.12
              });

            }

            if (p > 0.015) {

              gsap.to(slide1Split.chars, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.45,
                ease: "power2.out",
                stagger: 0.01
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
      className={`inline-block mr-[10px] ${
        ["Our", "Clients", "Do"].includes(word) ? "text-[#3d318d]" : ""
      }`}
    >
      {word}
    </span>
  ))}
              </h2>

            </div>

            <div className="flex justify-center gap-10">

              <TestimonialCard
                src="/elements/test_1.png"
                ref={(el) => {
                  if (el) slide1CardsRef.current[0] = el;
                }}
              />

              <TestimonialCard
                src="/elements/test_2.png"
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
      className={`inline-block mr-[10px] ${
        ["Our", "Clients", "Do"].includes(word) ? "text-[#3d318d]" : ""
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
                src="/elements/test_3.png"
                ref={(el) => {
                  if (el) slide2CardsRef.current[0] = el;
                }}
              />

              <TestimonialCard
                src="/elements/test_4.png"
                ref={(el) => {
                  if (el) slide2CardsRef.current[1] = el;
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}