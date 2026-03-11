"use client";

import Hero from "@/app/components/sections/Hero/Hero";
import Navbar from "@/app/components/layout/Navbar";
import dynamic from "next/dynamic";
import WorkSection from "@/app/components/sections/Work/worksection";
import Testimonials from "@/app/components/sections/Testimonials/testimonials";
import MobileNav from "./components/layout/MobileDrawer";
import LottieSection from "@/app/components/sections/lottieSection/LottieSection";

const VideoShowreelSection = dynamic(
  () => import("@/app/components/sections/Showreel/VideoShowreelSection"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Navbar />
      {/* <MobileNav /> */}

      <section id="home">
        <Hero />
      </section>

      
        <VideoShowreelSection />
     
      <section id="works">
         <WorkSection />
      </section>
     
      <section id="testimonials"> 
        <Testimonials />
      </section>
     
    
      <LottieSection />
    </>
  );
}
