"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileDrawer({ open, onClose }: Props) {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  /*  BODY SCROLL LOCK */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /*  ESC CLOSE */
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /*  CLOSE ON ROUTE CHANGE */
useEffect(() => {
  if (open && typeof onClose === "function") {
    onClose();
  }
}, [pathname]);

  /*  CLOSE WHEN SCREEN ≥ 768px */
useEffect(() => {
  if (!open) return;

  const media = window.matchMedia("(min-width: 768px)");

  const handleResize = (e: MediaQueryListEvent) => {
    if (e.matches) {
      onClose();
    }
  };

  media.addEventListener("change", handleResize);

  return () => {
    media.removeEventListener("change", handleResize);
  };
}, [open, onClose]);

  /*  GSAP SLIDE */
useEffect(() => {
  if (!drawerRef.current) return;

  gsap.to(drawerRef.current, {
    x: open ? "0%" : "100%",
    duration: 0.45,
    ease: "power3.out",
  });
}, [open]);


  return (
    <>
      {/* DARK OVERLAY */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-[998]"
        />
      )}

      {/* DRAWER */}
     <div
  ref={drawerRef}
  className="fixed top-0 right-0 h-screen w-[85vw] max-w-[380px] bg-black z-[999]"
  style={{ transform: "translateX(100%)" }}
>
        <div className="h-full flex flex-col px-6 pt-6 pb-8">

          {/* HEADER ROW */}
          <div className="flex items-center justify-between mb-10">
            

        {/* CLOSE BUTTON */}
<button
  onClick={onClose}
  className="absolute top-6 right-6 text-white text-[24px]"
>
  ✕
</button>
          </div>

          {/* LINKS */}
          <div className="flex flex-col divide-y divide-white/10">
            <a
              href="/"
              onClick={onClose}
              className="py-5 text-white text-[18px] font-medium"
            >
              Home
            </a>

            <a
              href="/#works"
              onClick={onClose}
              className="py-5 text-white text-[18px] font-medium"
            >
              Works
            </a>

            <a
              href="/#testimonials"
              onClick={onClose}
              className="py-5 text-white text-[18px] font-medium"
            >
              Testimonials
            </a>
          </div>

          {/* CONTACT BUTTON */}
          <button
            onClick={onClose}
            className="mt-auto h-[48px] rounded-md bg-[#55bd9f] text-white text-[18px] font-medium"
          >
            CONTACT
          </button>
        </div>
      </div>
    </>
  );
}