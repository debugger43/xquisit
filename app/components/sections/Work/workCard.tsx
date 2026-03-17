"use client";

import { useRef } from "react";

type WorkCardProps = {
  src: string;
  video?: string;
  accentSvg?: string;
  offsetX?: number;
  offsetY?: number;
  className?: string;
  imageClassName?: string;
  onClick?: (video: string) => void;
};

export default function WorkCard({
  src,
  video,
  accentSvg,
  offsetX = 11,
  offsetY = 11,
  className = "",
  imageClassName = "",
  onClick
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
  const handleClick = () => {
    if (video && onClick) {
      onClick(video);
    }
  };
  return (
    <div className="relative w-full break-inside-avoid">

      {/* SVG ACCENT BACKGROUND */}
      {accentSvg && (
        <img
          src={accentSvg}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            transform: `translate(${offsetX}px, ${offsetY}px) scale(1.02)`,
          }}
        />
      )}

      {/* FRONT CARD */}
      <div
        className="relative z-10 overflow-hidden rounded-2xl border-3 border-white bg-black transition-transform duration-300 hover:scale-[1.10]"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
      >

        {/* IMAGE PREVIEW */}
        <img
          src={src}
          alt=""
          className={`block w-full h-auto object-cover ${imageClassName}`}

        />

        {/* HOVER VIDEO */}
        {video && (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="metadata"
            loop
            className={`absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300 ${className}`}
          >
            <source src={video} type="video/mp4" />
          </video>
        )}

      </div>

    </div>
  );
}