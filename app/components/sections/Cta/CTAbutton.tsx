"use client";

import { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/Letstalk-button.json";

export default function CTAButton() {
  const lottieRef = useRef<any>(null);

  const segments = {
    idle: [0, 60],
    hover: [60, 119],
    click: [120, 239],
  };

  // Idle loop on load
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.playSegments(segments.idle, true);
    }
  }, []);

  const handleEnter = () => {
    lottieRef.current?.playSegments(segments.hover, true);
  };

  const handleLeave = () => {
    lottieRef.current?.playSegments(segments.idle, true);
  };
const handleClick = () => {
  lottieRef.current?.playSegments(segments.click, true);

  setTimeout(() => {
    window.location.href =
      "https://calendly.com/ghangas-xquisit/30min";
  }, 600);
};

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className="cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
    >
      <div className="w-[clamp(150px,25vw,350px)]">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
        />
      </div>
    </div>
  );
}