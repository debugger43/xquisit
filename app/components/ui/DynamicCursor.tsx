"use client";

import { useEffect, useRef, useState } from "react";

const TAIL_POINTS = 18;

export default function DynamicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mouse = useRef({ x: 0, y: 0 });

  const points = useRef(
    Array.from({ length: TAIL_POINTS }, () => ({ x: 0, y: 0 }))
  );

  const [cursorColor, setCursorColor] = useState("orange");
  const colorRef = useRef("orange");

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const tipX = mouse.current.x;
      const tipY = mouse.current.y + 5;

      let prev = { x: tipX, y: tipY };

      // smooth physics
      points.current.forEach((p) => {
        p.x += (prev.x - p.x) * 0.18;
        p.y += (prev.y - p.y) * 0.18;
        prev = p;
      });

      // tail end position
      const tailEnd = points.current[points.current.length - 1];

      // gradient depending on cursor color
      const gradient = ctx.createLinearGradient(
        tipX,
        tipY,
        tailEnd.x,
        tailEnd.y
      );

      if (cursorColor === "green") {
        gradient.addColorStop(0, "#8BE5B2");
        gradient.addColorStop(1, "rgba(139,229,178,0)");
      } else {
        gradient.addColorStop(0, "#FF9860");
        gradient.addColorStop(1, "rgba(255,152,96,0)");
      }

      let prevX = tipX;
      let prevY = tipY;

      points.current.forEach((p, i) => {
        ctx.beginPath();

        ctx.moveTo(prevX, prevY);
        ctx.lineTo(p.x, p.y);

        ctx.lineWidth = 3 * (1 - i / TAIL_POINTS);
        ctx.strokeStyle = gradient;

        ctx.lineCap = "round";
        ctx.stroke();

        prevX = p.x;
        prevY = p.y;
      });

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouse.current.x - 12}px, ${mouse.current.y - 8}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", updateCursorColor);
      window.removeEventListener("resize", resize);
    };
  }, [cursorColor]);

  return (
    <>
      {/* LINE TAIL */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] blur-[1px]"
      />

      {/* POINTER */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        <img
          src={`/cursor/${cursorColor}.svg`}
          className="w-[22px] h-[22px]"
        />
      </div>
    </>
  );
}