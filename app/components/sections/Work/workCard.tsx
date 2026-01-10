"use client";

type WorkCardProps = {
  src: string;
  accentColor?: string;
  offsetX?: number;
  offsetY?: number;
};

export default function WorkCard({
  src,
  accentColor = "#6CCCCE",
  offsetX = 8,
  offsetY = 8,
}: WorkCardProps) {
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

      {/* FRONT IMAGE CARD */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-white bg-black transition-transform duration-300 hover:scale-[1.05]">
        <img
          src={src}
          alt=""
          className="block w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}