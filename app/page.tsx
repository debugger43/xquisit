"use client";

import Hero from "@/app/components/sections/Hero/Hero";
import Navbar from "@/app/components/layout/Navbar";
import dynamic from "next/dynamic";
import WorkSection from "@/app/components/sections/Work/worksection";
import Testimonials from "@/app/components/sections/Testimonials/testimonials";
import LottieSection from "@/app/components/sections/lottieSection/LottieSection";
import CTASection from "./components/sections/Cta/CtaSection";

const VideoShowreelSection = dynamic(
  () => import("@/app/components/sections/Showreel/VideoShowreelSection"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <VideoShowreelSection />

      <WorkSection />

      <Testimonials />

      <LottieSection />

      <CTASection />
    </>
  );
}