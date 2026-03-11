"use client";

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
      className={`absolute pointer-events-none select-none scale-[0.7] sm:scale-100 ${className}`}
      style={{ width, height }}
    >
      {/* Idle Layer */}
      <div className="float-inner w-full h-full">
        
        {/* Proximity Layer */}
        <div className="proximity-inner w-full h-full">
          <img
            src={src}
            alt=""
            draggable={false}
            className="w-full h-full object-contain block"
          />
        </div>

      </div>
    </div>
  );
}