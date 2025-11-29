"use client";

import Image from "next/image";

export interface FloatingElementProps {
  innerRef?: (el: HTMLDivElement | null) => void;
  src: string;
  width: number;
  height: number;
  className?: string;
}

export default function FloatingElement({
  innerRef,
  src,
  width,
  height,
  className = "",
}: FloatingElementProps) {
  return (
    <div
      ref={innerRef}
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        width,
        height,
      }}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        draggable={false}
        style={{
          width: "100%",   
          height: "100%",  
          objectFit: "contain",
        }}
      />
    </div>
  );
}