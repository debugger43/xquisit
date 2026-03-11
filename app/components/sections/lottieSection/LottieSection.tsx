"use client";

import Lottie from "lottie-react";
import animationData from "@/public/lottie/devices.json";

export default function LottieSection() {
  return (
    <section
      id="devices"
      data-cursor="green"
      className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-[1400px] w-full px-8 flex flex-col items-center justify-center gap-12">

    

        {/* LOTTIE ANIMATION */}
        <div className="w-[1200px] max-w-full">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
          />
        </div>



      </div>
    </section>
  );
}