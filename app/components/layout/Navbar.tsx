"use client";

import Image from "next/image";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  return (
    <header
      data-navbar
      className="fixed top-0 left-0 w-full z-[999] opacity-0 -translate-y-5"
    >
      <nav className="max-w-[1400px] mx-auto px-4 h-[59px] flex items-center justify-between">
        <Image src="/logo.png" width={140} height={40} alt="Xquisit Logo" priority className="select-none" />

        <NavbarLinks />

        <button className="px-3 h-[44px] rounded-md bg-[#55bd9f] text-white font-radlush text-[20px] font-[500] leading-[100%] tracking-[0em]">
          CONTACT
        </button>
      </nav>
    </header>
  );
}