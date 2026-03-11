"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import NavbarLinks from "./NavbarLinks";
import MobileDrawer from "./MobileDrawer";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

  
      if (window.innerWidth < 768) return;

      if (!navbarRef.current) return;

      
      if (currentScroll <= 10) {
        gsap.to(navbarRef.current, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        lastScroll = currentScroll;
        return;
      }

  if (currentScroll > lastScroll) {
  
  gsap.to(navbarRef.current, {
    y: "-100%",
    duration: 0.55,         
    delay: 0.08,             
    ease: "power3.out",      
  });
} else {
  
 
  gsap.to(navbarRef.current, {
    y: 0,
    duration: 0.55,
    delay: 0.06,
    ease: "power2.out",
  });
}

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        ref={navbarRef}
        data-navbar
        className="fixed top-0 left-0 w-full z-[997] bg-black"
      >
        <nav className="max-w-[1400px] mx-auto px-4 h-[59px] flex items-center justify-between">

          {/* LOGO */}
          <Image
            src="/logo.png"
            width={140}
            height={40}
            alt="Xquisit Logo"
            priority
            className="select-none w-[110px] md:w-[140px]"
          />

          {/* DESKTOP LINKS */}
          <div className="hidden md:block">
            <NavbarLinks />
          </div>

          {/* DESKTOP CONTACT */}
          <button className="hidden md:block px-4 h-[44px] rounded-md bg-[#55bd9f] text-white font-radlush text-[20px] font-[500]">
            CONTACT
          </button>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white text-[26px]"
          >
            ☰
          </button>

        </nav>
      </header>

      {/* MOBILE DRAWER */}
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}