"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/portfolio-button.json";

export default function PortfolioButton() {
  const lottieRef = useRef<any>(null);
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

    const [start, end] = segments.idle;

    try {
      anim.goToAndStop(start, true);
      anim.playSegments([start, end], true);
    } catch (e) {
      console.warn("Lottie init error:", e);
    }
  }, [isLoaded]);

  const playSegment = (segment: number[], loop = false) => {
    const anim = lottieRef.current;
    if (!anim || !isLoaded) return;

    const [start, end] = segment;

    anim.loop = loop;

    try {
      anim.goToAndStop(start, true);
      anim.playSegments([start, end], true);
    } catch (e) {
      console.warn("Lottie error:", e);
    }
  };

  return (
    <div
      className="w-[clamp(160px,28vw,400px)] cursor-pointer rounded-full overflow-hidden"
      onMouseEnter={() => playSegment(segments.hover)}
      onMouseLeave={() => playSegment(segments.idle, true)}
      onClick={() => {
        playSegment(segments.click);

        setTimeout(() => {
          router.push("/portfolio");
        }, 400);
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
        onDOMLoaded={() => {
          setIsLoaded(true);

          const svg = lottieRef.current?.container?.querySelector("svg");
          if (svg) {
            const filters = svg.querySelectorAll("filter");
            filters.forEach((f: any) => f.remove());
          }
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
