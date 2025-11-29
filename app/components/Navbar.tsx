"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.set(navRef.current, { opacity: 0, y: -20 });

    gsap.to(navRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 1.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <header
      ref={navRef}
      data-nav
      className="fixed top-0 left-0 w-full z-[999] bg-transparent"
    >
      <nav className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-[88px] text-white">

        <Image
          src="/logo.png"
          width={160}
          height={50}
          alt="logo"
          className="select-none pointer-events-none"
        />

        <div className="hidden md:flex gap-8 font-semibold tracking-wide">
          <a href="#" >HOME</a>
          <a href="#">WORKS</a>
          <a href="#">TESTIMONIALS</a>
        </div>

        <button className="px-6 py-2 bg-primary rounded-full font-semibold">
          CONTACT
        </button>
      </nav>
    </header>
  );
}