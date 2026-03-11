"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_COUNT = 10;

export default function DynamicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  const mouse = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });

  const trail = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }))
  );

  const [cursorColor, setCursorColor] = useState("orange");
  const colorRef = useRef("orange");

  useEffect(() => {
    const updateCursorColor = () => {
      const element = document.elementFromPoint(
        mouse.current.x,
        mouse.current.y
      );

      const section = element?.closest("[data-cursor]");

      if (section) {
        const color = section.getAttribute("data-cursor");

        if (color && color !== colorRef.current) {
          colorRef.current = color;
          setCursorColor(color);
        }
      }
    };

    const moveCursor = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      updateCursorColor();
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("scroll", updateCursorColor);

    const animate = () => {
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;

      const velocity = Math.sqrt(dx * dx + dy * dy);

      lastMouse.current.x = mouse.current.x;
      lastMouse.current.y = mouse.current.y;

      /* POINTER LIQUID SCALE */

      if (cursorRef.current) {
        const stretch = Math.min(velocity * 0.02, 0.35);

        const scaleX = 1 + stretch;
        const scaleY = 1 - stretch;

        cursorRef.current.style.transform = `
          translate(${mouse.current.x - 12}px, ${mouse.current.y - 8}px)
          scale(${scaleX}, ${scaleY})
        `;
      }

      /* TRAIL */
let prev = { x: mouse.current.x, y: mouse.current.y };

trailRefs.current.forEach((dot, index) => {

  const pos = trail.current[index];

  pos.x += (prev.x - pos.x) * 0.25;
  pos.y += (prev.y - pos.y) * 0.25;

  const scale = (TRAIL_COUNT - index) / TRAIL_COUNT;

  const stretch = Math.min(velocity * 0.02, 0.6);

  const scaleX = scale + stretch;
  const scaleY = scale - stretch;

  if (dot) {

    dot.style.transform =
      `translate(${pos.x - 16}px, ${pos.y - 15}px)
       scale(${scaleX}, ${scaleY})`;

    dot.style.opacity = `${scale}`;
  }

  prev = pos;

});

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", updateCursorColor);
    };
  }, []);

  return (
    <>
      {/* TRAIL DOTS */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full blur-[1px]
          ${cursorColor === "green" ? "bg-[#8BE5B2]" : "bg-[#FF9860]"}`}
          style={{
            width: "10px",
            height: "10px",
          }}
        />
      ))}

      {/* POINTER */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        <img
          src={`/cursor/${cursorColor}.svg`}
          className="w-[36px] h-[36px]"
        />
      </div>
    </>
  );
}