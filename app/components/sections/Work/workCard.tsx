"use client";

import { useRef } from "react";

type WorkCardProps = {
  src: string;        // image
  video?: string;    
  accentColor?: string;
  offsetX?: number;
  offsetY?: number;
};

export default function WorkCard({
  src,
  video,
  accentColor = "#6CCCCE",
  offsetX = 8,
  offsetY = 8,
}: WorkCardProps) {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div className="relative w-full break-inside-avoid">

      {/* BACK ACCENT CARD */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          backgroundColor: accentColor,
        }}
      >
        <div className="absolute inset-0 rounded-2xl border-2 border-white pointer-events-none" />
      </div>

      {/* FRONT CARD */}
      <div
        className="relative overflow-hidden rounded-2xl border-2 border-white bg-black transition-transform duration-300 hover:scale-[1.07]"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >

        {/* IMAGE */}
        <img
          src={src}
          alt=""
          className="block w-full h-auto object-cover"
        />

        {/* VIDEO */}
        {video && (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            <source src={video} type="video/mp4" />
          </video>
        )}

      </div>

    </div>
  );
}