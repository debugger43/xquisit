"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoShowreelSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const curvePathRef = useRef<SVGPathElement | null>(null);
  const playRef = useRef<HTMLDivElement | null>(null);
  const cornerLeftRef = useRef<SVGPathElement | null>(null);
  const cornerRightRef = useRef<SVGPathElement | null>(null);
  const decoRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    /* ======================================================
       🔒 HARD SCROLL RESET (RELOAD-SAFE)
       ====================================================== */
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        /* --------------------------------
           FRAME SCALE ON SCROLL
        -------------------------------- */
        if (frameRef.current) {
          gsap.fromTo(
            frameRef.current,
            { scale: 0.8 },
            {
              scale: 1,
              scrollTrigger: {
                trigger: frameRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        /* --------------------------------
           MEDIA SUBTLE ZOOM
        -------------------------------- */
        if (mediaRef.current && frameRef.current) {
          gsap.fromTo(
            mediaRef.current,
            { scale: 1 },
            {
              scale: 1.03,
              scrollTrigger: {
                trigger: frameRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        /* --------------------------------
           MEDIA FADE + BLUR RESOLVE
        -------------------------------- */
        if (mediaRef.current && sectionRef.current) {
          gsap.set(mediaRef.current, {
            opacity: 0,
            filter: "blur(8px)",
          });

          gsap.to(mediaRef.current, {
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top center",
              scrub: 1.2,
              
            },
          });
        }

        /* --------------------------------
           PLAY BUTTON INITIAL STATE
        -------------------------------- */
        if (playRef.current) {
          gsap.set(playRef.current, {
            opacity: 0,
            scale: 0.5,
          });
        }

        /* --------------------------------
           BACKGROUND CURVE DRAW
        -------------------------------- */
        if (curvePathRef.current && sectionRef.current && playRef.current) {
          const length = curvePathRef.current.getTotalLength();

          gsap.set(curvePathRef.current, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          if (cornerLeftRef.current && cornerRightRef.current) {
            gsap.set([cornerLeftRef.current, cornerRightRef.current], {
              opacity: 0,
            });
          }

          gsap.to(curvePathRef.current, {
            strokeDashoffset: 0,
            duration: 8,
            ease: "sine.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 20%",
              once: true,
            },
            onComplete: () => {
              const left = cornerLeftRef.current;
              const right = cornerRightRef.current;

              if (left && right) {
                const leftLen = left.getTotalLength();
                const rightLen = right.getTotalLength();

                gsap.set([left, right], {
                  strokeDasharray: (i: number) => (i === 0 ? leftLen : rightLen),
                  strokeDashoffset: (i: number) => (i === 0 ? leftLen : rightLen),
                });

                gsap.to(left, {
                  opacity: 1,
                  strokeDashoffset: 0,
                  duration: 1.5,
                  ease: "sine.out",
                });

                gsap.to(right, {
                  opacity: 1,
                  strokeDashoffset: 0,
                  duration: 1.5,
                  ease: "sine.out",
                  delay: 0.18,
                });
              }

              gsap.to(playRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
                delay: 0.05,
              });
            },
          });
        }

        /* --------------------------------
           ▶ PLAY BUTTON CLICK
        -------------------------------- */
        if (playRef.current && videoRef.current && mediaRef.current) {
          playRef.current.addEventListener("click", () => {
            gsap.to(playRef.current, {
              opacity: 0,
              scale: 0.8,
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                playRef.current!.style.pointerEvents = "none";
              },
            });

            gsap.to(mediaRef.current, {
              opacity: 0,
              duration: 0.4,
              ease: "power2.out",
            });

            gsap.to(videoRef.current, {
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
              onStart: () => {
                videoRef.current?.play();
              },
            });
          });
        }

        
        ScrollTrigger.refresh();
      }, sectionRef);

      return () => ctx.revert();
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showreel"
      className="relative min-h-screen w-full bg-[#a3d4f3] flex items-center justify-center overflow-hidden"
    >
            {/* DECORATIVE ELEMENTS */}
      {/* {[
        { src: "/elements/showreel-star.png", x: "12%", y: "22%", w: 80 },
        { src: "/elements/showreel-triangle.png", x: "78%", y: "16%", w: 90 },
        { src: "/elements/showreel-filmreel.png", x: "20%", y: "78%", w: 100 },
        { src: "/elements/showreel-ellipse.png", x: "82%", y: "70%", w: 70 },
        { src: "/elements/showreel-circle.png", x: "48%", y: "10%", w: 60 },
      ].map((d, i) => (
        <div
          key={i}
          ref={(el) => {el && (decoRefs.current[i] = el)}}
          className="absolute pointer-events-none"
          style={{ left: d.x, top: d.y }}
        >
          <Image src={d.src} alt="" width={d.w} height={d.w} />
        </div>
      ))} */}

      

         {/* BACKGROUND CURVE */}
      <svg
        className="absolute inset-0 z-0 pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "2950px",
          transform: "rotate(0.75deg) scale(1.01)",
          transformOrigin: "center",
        }}
      >
        <defs>
          <filter
            id="curveBlur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="2" />
          </filter>

          <linearGradient
            id="showreelGradient"
            x1="1088.75"
            y1="-70"
            x2="1088.75"
            y2="1079.73"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#8F91F2" />
            <stop offset="100%" stopColor="#272974" />
          </linearGradient>
        </defs>

        <g filter="url(#curveBlur)">
          <path
            ref={curvePathRef}
            d="M-86 -70
         C5.71 66.67 240 341.8 410 289
         C580 236.2 983.17 645.67 1163.5 857
         C1243.33 968.5 1478.3 1161.6 1779.5 1042
         C2080.7 922.4 2227.67 978.5 2263.5 1021.5"
            fill="none"
            stroke="url(#showreelGradient)"
            strokeWidth="19"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* SHOWREEL FRAME */}
      <div
        ref={frameRef}
        id="showreel-frame"
        className="relative z-10 w-[min(78vw,1360px)] aspect-video rounded-[25px] bg-white p-[8px] shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
      >
        <div className="relative w-full h-full rounded-[18px] overflow-hidden">
          {/* POSTER */}
          <div ref={mediaRef} className="absolute inset-0">
            <Image
              src="/elements/showreel-poster.png"
              alt="Showreel"
              fill
              priority
              className="object-cover blur-[10px] scale-[1.05]"
            />
          </div>

          {/* VIDEO */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-0"
            src="/elements/showreel.mp4"
            playsInline
            controls
          />
        </div>

        {/* CORNER CURVE — BOTTOM LEFT */}
        <svg
          className="absolute -bottom-6 -left-6 rotate-180 pointer-events-none"
          width="166"
          height="173"
          viewBox="0 0 196 203"
          fill="none"
        >
          <path
            ref={cornerLeftRef}
            d="M0 2.5C0 2.5 100 2.5 123 2.5C162 2.5 193.5 34.3 193.5 69.5C193.5 111.5 193.5 202.5 193.5 202.5"
            stroke="#000"
            strokeWidth="5"
          />
        </svg>

        {/* CORNER CURVE — TOP RIGHT */}
        <svg
          className="absolute -top-6 -right-6  pointer-events-none"
          width="166"
          height="173"
          viewBox="0 0 196 203"
          fill="none"
        >
          <path
            ref={cornerRightRef}
            d="M0 2.5C0 2.5 100 2.5 123 2.5C162 2.5 193.5 34.3 193.5 69.5C193.5 111.5 193.5 202.5 193.5 202.5"
            stroke="#000"
            strokeWidth="5"
          />
        </svg>

        {/* PLAY BUTTON */}
        <div ref={playRef} className="absolute inset-0 grid place-items-center">
         <div className="w-24 h-24 rounded-2xl bg-[#4c4dda] grid place-items-center cursor-pointer transition-transform duration-250 ease-out hover:scale-[1.08]">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="white"
              className="translate-x-[2px]"
            >
              <path d="M7 4v16l12-8z" />
            </svg>
          </div>
        </div>
      </div>

    </section>
  );
}