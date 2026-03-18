"use client";

import { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/devices.json";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { decorativeElements } from "@/app/data/lottieDecorations";

gsap.registerPlugin(ScrollTrigger);

export default function LottieSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const lottieRef = useRef<any>(null);

  const topTextRef = useRef<HTMLParagraphElement | null>(null);
  const bottomTextRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !lottieRef.current) return;

    const ctx = gsap.context(() => {
      /* ---------------------------
         SPLIT TEXT
      --------------------------- */

      const topSplit = new SplitType(topTextRef.current!, {
        types: "words,chars",
      });

      const bottomSplit = new SplitType(bottomTextRef.current!, {
        types: "words,chars",
      });

      /* ---------------------------
         INITIAL TEXT STATE
      --------------------------- */

      gsap.set([...(topSplit.chars || []), ...(bottomSplit.chars || [])], {
        opacity: 0,
        y: 12,
        filter: "blur(6px)",
      });

      /* ---------------------------
         LOTTIE SCROLL ANIMATION
      --------------------------- */

      const playhead = { frame: 0 };
      const totalFrames = lottieRef.current.getDuration(true);
      let topTextPlayed = false;
      let bottomTextPlayed = false;

      gsap.to(playhead, {
        frame: totalFrames - 1,
        ease: "none",

        onUpdate: () => {
          const frame = playhead.frame;

          lottieRef.current.goToAndStop(frame, true);

          if (frame > totalFrames * 0.25 && !topTextPlayed) {
            topTextPlayed = true;

            gsap.to(topSplit.chars, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.01,
            });
          }

          if (frame > totalFrames * 0.4 && !bottomTextPlayed) {
            bottomTextPlayed = true;

            gsap.to(bottomSplit.chars, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.01,
            });
          }
        },

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "+=1200",
          scrub: 2,
        },
      });

      gsap.fromTo(
        ".devices-container",
        { scale: 0.95 },
        {
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "+=1200",
            scrub: true,
          },
        },
      );

      /* ---------------------------
   IDLE FLOATING ELEMENTS
--------------------------- */

      gsap.utils.toArray<HTMLElement>(".float-element").forEach((el, i) => {
        gsap.to(el, {
          y: "random(-18,18)",
          duration: gsap.utils.random(1.6, 2.4),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
        });
      });

      return () => {
        topSplit.revert();
        bottomSplit.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="devicess"
      data-cursor="green"
      className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* DECORATIVE ELEMENTS GRID */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full grid grid-cols-12 grid-rows-6">
          {decorativeElements.map((el, i) => (
            <div key={i} className={el.position}>
              <img
                src={el.src}
                alt={el.alt}
                className={`float-element ${el.size} h-auto ${el.opacity}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-full max-w-[1500px] flex flex-col lg:flex-row items-center justify-center gap-14 px-6 py-8">
        {/* TOP PARAGRAPH */}
        <p
          ref={topTextRef}
          className="lg:absolute lg:top-[0%] lg:right-[3%] max-w-[90%] lg:max-w-[680px] font-radlush font-[500] text-[clamp(22px,4vw,24px)] leading-[120%] text-white/85 text-center lg:text-right"
        >
          We listen before we edit. We study your tone, your audience, and your
          pace to craft visuals that sync perfectly with your brand’s heartbeat.
          We don’t follow rhythm. We create it.
        </p>

        {/* LOTTIE */}
        <div className="devices-container w-[min(90vw,900px)] lg:w-[min(85vw,1100px)]">
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            autoplay={true}
            loop={true}
          />
        </div>

        {/* BOTTOM PARAGRAPH */}
        <p
          ref={bottomTextRef}
          className="lg:absolute lg:bottom-[0%] lg:left-[3%] max-w-[90%] lg:max-w-[750px] font-radlush font-[500] text-[clamp(22px,4vw,24px)] leading-[120%] text-white/85 text-center lg:text-left"
        >
          Before we touch a single frame, we talk. We discuss your goals, your
          tone, your audience, and what your content is actually trying to
          achieve. This simple clarity removes most of the problems creators
          usually face — confusion, mismatched edits, and endless revisions.
        </p>
      </div>
    </section>
  );
}
