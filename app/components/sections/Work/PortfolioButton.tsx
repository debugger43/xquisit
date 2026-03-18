"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/portfolio-button.json";

export default function PortfolioButton() {
  const lottieRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); 
  const router = useRouter();

  const segments = {
    idle: [0, 60],
    hover: [60, 120],
    click: [119, 240],
  };


  useEffect(() => {
    const anim = lottieRef.current;
    if (!anim || !isLoaded) return;

    anim.loop = true;

    const start = segments.idle[0] || 0;
    const end = segments.idle[1] || start + 1;

    try {
      anim.goToAndStop(start, true);
      anim.playSegments([start, end], true);
    } catch (e) {
      console.warn("Lottie init error:", e);
    }
  }, [isLoaded]);

  
  const playSegment = (segment: number[], loop = false) => {
    const anim = lottieRef.current;
    if (!anim || !isLoaded || !Array.isArray(segment)) return;

    const start = isNaN(segment[0]) ? 0 : segment[0];
    const end = isNaN(segment[1]) ? start + 1 : segment[1];

    if (start === end) return;

    anim.loop = loop;

    try {
      anim.goToAndStop(start, true);
      anim.playSegments([start, end], true);
    } catch (e) {
      console.warn("Lottie error prevented:", e);
    }
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="w-[clamp(160px,28vw,400px)] cursor-pointer will-change-transform rounded-full overflow-hidden"
        onMouseEnter={() => playSegment(segments.hover)}
        onMouseLeave={() => playSegment(segments.idle, true)}
        onClick={() => {
          playSegment(segments.click);
          setIsTransitioning(true);

          const el = wrapperRef.current;
          if (!el) return;

          const source = document.getElementById("portfolio-source");
          if (!source) return;

          const textRect = source.getBoundingClientRect();
          const clone = source.cloneNode(true) as HTMLElement;

          clone.style.position = "fixed";
          clone.style.top = `${textRect.top}px`;
          clone.style.left = `${textRect.left}px`;
          clone.style.width = `${textRect.width}px`;
          clone.style.height = `${textRect.height}px`;
          clone.style.zIndex = "99999";
          clone.style.pointerEvents = "none";

          document.body.appendChild(clone);
          (source as HTMLElement).style.opacity = "0";
          el.style.opacity = "0";

          (window as any).__portfolioClone = clone;

          const rect = el.getBoundingClientRect();

          const scaleX = window.innerWidth / rect.width;
          const scaleY = window.innerHeight / rect.height;
          const scale = Math.max(scaleX, scaleY) * 1.2;

          import("gsap").then(({ default: gsap }) => {
            const tl = gsap.timeline({
              onComplete: () => {
                router.push("/portfolio");
              },
            });

            tl.set(el, {
              position: "fixed",
              top: rect.top,
              left: rect.left,
              zIndex: 9999,
            });

            tl.to(
              clone,
              {
                top: window.innerHeight * 0.15,
                left: window.innerWidth / 2,
                x: "-50%",
                scale: 1.8,
                duration: 0.9,
                ease: "power4.inOut",
              },
              0
            );

            tl.to(el, {
              scale,
              x: window.innerWidth / 2 - rect.left - rect.width / 2,
              y: window.innerHeight / 2 - rect.top - rect.height / 2,
              duration: 0.9,
              ease: "power4.inOut",
            });

            tl.to(
              el,
              {
                borderRadius: "0%",
                duration: 0.4,
                ease: "power2.out",
              },
              "-=0.3"
            );

            tl.to({}, { duration: 0.2 });

            tl.to(el, {
              opacity: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          });
        }}
      >
        <span
          id="portfolio-source"
          className="absolute inset-0 flex items-center justify-center text-white font-bold text-[clamp(18px,3vw,32px)] pointer-events-none"
        >
          Portfolio
        </span>

   
  <Lottie
  lottieRef={lottieRef}
  animationData={animationData}
  autoplay={false}
  loop={false}
  onDOMLoaded={() => {
    setIsLoaded(true);

    // FORCE REMOVED ALL FILTERS 
    const svg = lottieRef.current?.container?.querySelector("svg");
    if (svg) {
      const filters = svg.querySelectorAll("filter");
      filters.forEach((f: any) => f.remove());
    }
  }}
  style={{ width: "100%", height: "100%" }}
/>
      </div>

      {/* OVERLAY */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-black z-[9998] pointer-events-none animate-fadeIn" />
      )}
    </>
  );
}