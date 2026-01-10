"use client";

import Hero from "@/app/components/sections/Hero/Hero";
import Navbar from "@/app/components/layout/Navbar";
import dynamic from "next/dynamic";
import WorkSection from "@/app/components/sections/Work/worksection";
import Testimonials from "@/app/components/sections/Testimonials/testimonials";

const VideoShowreelSection = dynamic(
  () => import("@/app/components/sections/Showreel/VideoShowreelSection"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Navbar />

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
     <section className="h-screen bg-black" />
    

    </>
  );
}
