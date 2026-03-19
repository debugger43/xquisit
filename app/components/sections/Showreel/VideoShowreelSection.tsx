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

  /* ---------------
     ▶ PLAY HANDLER 
  ------------------- */
  const handlePlayClick = () => {
    if (!playRef.current || !videoRef.current || !mediaRef.current) return;

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
        videoRef.current!.style.pointerEvents = "auto";
        videoRef.current!.currentTime = 0;
        videoRef.current!.play();
      },
    });
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

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
          },
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
          },
        );
      }

      /* --------------------------------
       MEDIA FADE + BLUR ON SCROLL
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
       CURVE + CORNERS + PLAY
      -------------------------------- */
      if (
        curvePathRef.current &&
        playRef.current &&
        cornerLeftRef.current &&
        cornerRightRef.current
      ) {
        const bigLength = curvePathRef.current.getTotalLength();
        const leftLength = cornerLeftRef.current.getTotalLength();
        const rightLength = cornerRightRef.current.getTotalLength();

        gsap.set(curvePathRef.current, {
          strokeDasharray: bigLength,
          strokeDashoffset: bigLength,
        });

        gsap.set([cornerLeftRef.current, cornerRightRef.current], {
          strokeDasharray: (i: number) => (i === 0 ? leftLength : rightLength),
          strokeDashoffset: (i: number) => (i === 0 ? leftLength : rightLength),
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 20%",
              once: true,
            },
          })
          .to(curvePathRef.current, { strokeDashoffset: 0, duration: 8 })
          .to(cornerLeftRef.current, { strokeDashoffset: 0, duration: 1.5 }, 0)
          .to(cornerRightRef.current, { strokeDashoffset: 0, duration: 1.5 }, 0)
          .to(playRef.current, { opacity: 1, scale: 1, duration: 0.5 }, 0);
      }
      if (videoRef.current && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom 50%",
          onLeave: () => {
            if (!videoRef.current) return;

            gsap.to(videoRef.current, {
              opacity: 0.3,
              filter: "blur(10px)", 
              duration: 0.4,
              ease: "power2.out",
              onComplete: () => {
                videoRef.current?.pause();
              },
            });
          },

          onLeaveBack: () => {
            if (!videoRef.current) return;

            gsap.to(videoRef.current, {
              opacity: 0.3,
              filter: "blur(10px)",
              duration: 0.4,
              ease: "power2.out",
              onComplete: () => {
                videoRef.current?.pause();
              },
            });
          },

          onEnter: () => {
            if (videoRef.current?.style.pointerEvents === "auto") {
              videoRef.current.play();

              gsap.to(videoRef.current, {
                opacity: 1,
                filter: "blur(0px)", 
                duration: 0.4,
                ease: "power2.out",
              });
            }
          },
          onEnterBack: () => {
            if (videoRef.current?.style.pointerEvents === "auto") {
              videoRef.current.play();

              gsap.to(videoRef.current, {
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.4,
                ease: "power2.out",
              });
            }
          },
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showreel"
      data-cursor="orange"
      className="relative h-[var(--app-height)] w-full bg-[#a3d4f3] overflow-hidden"
    >
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full grid grid-cols-12 grid-rows-6">
          <div className="col-start-7 row-start-1 self-start justify-self-center">
            <Image
              src="/elements/showreel/showreel-star.png"
              alt=""
              width={80}
              height={80}
              className="w-10 sm:w-14 lg:w-20 h-auto"
            />
          </div>

          <div className="col-start-12 row-start-4 self-start justify-self-end">
            <Image
              src="/elements/showreel/showreel-triangle.png"
              alt=""
              width={90}
              height={90}
              className="w-12 sm:w-16 lg:w-24 h-auto"
            />
          </div>

          <div className="col-start-12 row-start-1 self-start justify-self-end">
            <Image
              src="/elements/showreel/showreel-filmreel.png"
              alt=""
              width={100}
              height={100}
              className="w-14 sm:w-18 lg:w-24 h-auto"
            />
          </div>

          <div className="col-start-10 row-start-5 self-end justify-self-end">
            <Image
              src="/elements/showreel/showreel-ellipse.png"
              alt=""
              width={70}
              height={70}
              className="w-10 sm:w-14 lg:w-16 h-auto"
            />
          </div>

          <div className="absolute left-0 bottom-0">
            <Image
              src="/elements/showreel/showreel-circle.png"
              alt=""
              width={60}
              height={60}
              className="w-8 sm:w-12 lg:w-16 h-auto"
            />
          </div>
        </div>
      </div>

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
          <filter id="curveBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" />
          </filter>

          <linearGradient
            id="showreelGradient"
            x1="1088.75"
            y1="-70"
            x2="1088.75"
            y2="1079.73"
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

      {/* CENTER WRAPPER */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={frameRef}
          id="showreel-frame"
          className="relative z-10 w-[min(78vw,1360px)] aspect-video rounded-[25px] bg-white p-[8px] shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        >
          <div className="relative w-full h-full rounded-[18px] overflow-hidden">
            <div ref={mediaRef} className="absolute inset-0">
              <Image
                src="/elements/showreel/showreel-poster.png"
                alt="Showreel"
                fill
                priority
                className="object-cover blur-[10px] scale-[1.05]"
              />
            </div>

            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
              src="https://res.cloudinary.com/dnlwpwsgh/video/upload/f_auto,q_auto/showreel_v2_2_uefhtr.mp4"
              playsInline
              preload="auto"
              onEnded={() => {
                if (!playRef.current) return;

                gsap.to(playRef.current, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.4,
                  ease: "power2.out",
                  onStart: () => {
                    playRef.current!.style.pointerEvents = "auto";
                  },
                });
              }}
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
              strokeWidth="4"
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
              strokeWidth="4"
            />
          </svg>

          {/* PLAY BUTTON */}
          <div
            ref={playRef}
            onClick={handlePlayClick}
            className="absolute inset-0 grid place-items-center"
          >
            <div className="w-24 h-24 rounded-2xl bg-[#4c4dda] grid place-items-center cursor-pointer transition-transform duration-250 ease-out hover:scale-[1.08]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M7 4v16l12-8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
