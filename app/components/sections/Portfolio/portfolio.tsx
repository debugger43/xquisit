"use client";
import React, { useState } from "react";
import Image from "next/image";
import { VideoCard } from "@/app/components/videoCard";

export default function PortfolioPage() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);


    return (
        <div className="relative min-h-screen bg-[#111111] text-[#f7f2eb] font-sans overflow-x-hidden">
            {/* Background Floating Elements */}
            <div
                className="absolute inset-0 pointer-events-none select-none opacity-40 lg:opacity-80"
                aria-hidden="true"
            >
                {/* Clapboard */}
                <div className="absolute top-[2%] left-[5%] scale-75">
                    <img
                        src="/images/Clapboard.png"
                        alt="Clapboard"
                        className="w-[250px] h-[250px] object-contain"
                    />
                </div>

                {/* Color Bars */}
                <div className="absolute top-[33%] right-10 w-[300px] h-[200px] rounded-lg">
                    <img src="/images/brick_design.png" alt="" />
                </div>

                {/* Geometric Shapes */}
                <div className="absolute top-[12%] right-[15%] w-6 h-6 bg-yellow-600/80 rotate-25" />
                <div className="absolute top-[22%] left-[15%] w-12 h-12 rounded-full border-2 border-purple-500" />
                <div className="absolute top-[27%] right-[12%] w-8 h-8 rounded-full border-2 border-green-300" />

                <div className="absolute bottom-[50%] left-[8%] w-5 h-5 bg-green-600/80 rotate-25" />
                <div className="absolute bottom-[44%] left-[1%] w-[350px] h-[200px] flex items-center justify-center">
                    <img src="/images/Video Player.png" alt="" />
                </div>
                <div className="absolute bottom-[42%] left-[15%] w-12 h-12 rounded-full border-2 border-pink-500" />
                <div className="absolute bottom-[43%] right-[10%] w-[50px] h-[50px] flex items-center justify-center">
                    <img src="/images/Vector.png" alt="" />
                </div>
                <div className="absolute bottom-[30%] right-[0%] w-[300px] h-[200px] flex items-center justify-center">
                    <img src="/images/Group.png" alt="" />
                </div>
                <div className="absolute bottom-[18%] left-[3%] w-[250px] h-[170px] flex items-center justify-center">
                    <img src="/images/Pencil.png" alt="" />
                </div>
                <div className="absolute bottom-[17%] right-[5%] w-6 h-6 bg-yellow-600/80 rotate-25" />
            </div>

            <main className="relative z-10 max-w-[800px] mx-auto px-6 py-12">
                <h1
                    id="portfolio-target"
                    className="text-center font-[900] text-[64px] md:text-[80px] mb-12 leading-none tracking-[-0.04em] text-[#f5f5f5]"
                >
                    Portfolio
                </h1>

                {/* --- BRAND WORKS --- */}
                <section className="flex flex-col items-center mb-20">
                    <div className="flex -space-x-8 mb-4 scale-90 md:scale-100">
                        <div className="w-35 h-35 rounded-full border-2 border-white/20 shadow-xl flex items-center justify-center z-30 overflow-hidden">
                            <Image
                                src="/images/ImageWithFallback.png"
                                alt="user1"
                                width={96}
                                height={96}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="w-35 h-35 rounded-full bg-[#1786ee] shadow-xl flex items-center justify-center z-20 overflow-hidden">
                            <Image
                                src="/images/ImageWithFallback (1).png"
                                alt="user2"
                                width={96}
                                height={96}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="w-35 h-35 rounded-full bg-white shadow-xl flex items-center justify-center z-10 overflow-hidden">
                            <Image
                                src="/images/ImageWithFallback (2).png"
                                alt="user3"
                                width={96}
                                height={96}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <h2 className="text-center font-[700] text-[28px] md:text-[34px] mb-6 leading-none tracking-[-0.02em] text-[#f5f5f5]">
                        Brand Works
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <VideoCard
                            thumbnail="/images/Link.png"
                            youtubeId="k0A9teMuksU"
                            onClick={setActiveVideo}
                            className="w-[320px] rounded-xl"
                        >
                            {/* <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-center">
                <h2 className="text-lg font-semibold">Explainer Hype Video</h2>
                <p className="text-sm text-white/80">Shop with Friends</p>
              </div> */}
                        </VideoCard>
                        <VideoCard
                            thumbnail="/images/Link (1).png"
                            youtubeId="dwLWdzU59uo"
                            onClick={setActiveVideo}
                            className="w-[320px] rounded-xl"
                        >
                            {/* <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-center">
                <h2 className="text-lg font-semibold">
                  Brand Integration Demo
                </h2>
                <p className="text-sm text-white/80">Polls For iMessage</p>
              </div> */}
                        </VideoCard>
                    </div>
                </section>

                {/* --- Codie Sanchez --- */}
                <section className="flex flex-col items-center mb-20">
                    {/* Profile */}
                    <div className="w-36 h-36 rounded-full border-4 border-gray-700 overflow-hidden shadow-2xl mb-4 bg-zinc-800">
                        <Image
                            src="/images/CodieSanche.png"
                            alt="Codie Sanchez"
                            width={150}
                            height={150}
                            className="object-cover"
                        />
                    </div>

                    <h2 className="text-center font-[700] text-[28px] md:text-[34px] mb-6 leading-none tracking-[-0.02em] text-[#f5f5f5]">
                        Codie Sanchez
                    </h2>

                    {/* Video Cards */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <VideoCard
                            thumbnail="/images/CodieSanche_Link (1).png"
                            youtubeId="okF7JjfvBiE"
                            onClick={setActiveVideo}
                            className="w-[140px] h-[250px] rounded-2xl"
                        />
                        <VideoCard
                            thumbnail="/images/CodieSanche_Link (2).png"
                            youtubeId="xJ76TLfXjMA"
                            onClick={setActiveVideo}
                            className="w-[140px] h-[250px] rounded-2xl"
                        />
                        <VideoCard
                            thumbnail="/images/CodieSanche_Link (3).png"
                            youtubeId="Lf_12Psq1_I"
                            onClick={setActiveVideo}
                            className="w-[140px] h-[250px] rounded-2xl"
                        />
                    </div>
                </section>

                {/* Jesse Vasquez */}
                <section className="flex flex-col items-center mb-20">
                    <div className="w-35 h-35 rounded-full border-4 border-gray-700 overflow-hidden shadow-2xl mb-4 bg-zinc-800">
                        <Image
                            src="/images/Jesse Vasquez.png"
                            alt="Jesse Vasquez"
                            width={150}
                            height={150}
                            className="object-cover"
                        />
                    </div>
                    <h2 className="text-center font-[700] text-[28px] md:text-[34px] mb-6 leading-none tracking-[-0.02em] text-[#f5f5f5]">
                        Jesse Vasquez
                    </h2>
                    {/* horizontal videos */}
                    <div className="flex flex-col gap-4 items-center">
                        <div className="flex justify-center gap-4">
                            <VideoCard
                                thumbnail="/images/Jesse Vasquez_Link(1).png"
                                youtubeId="wHv2uGQbOvM"
                                onClick={setActiveVideo}
                                className="w-[280px] h-[150px] rounded-xl"
                            />
                            <VideoCard
                                thumbnail="/images/Jesse Vasquez_Link(2).png"
                                youtubeId="-VCuAT5b4Ww"
                                onClick={setActiveVideo}
                                className="w-[280px] h-[150px] rounded-xl"
                            />
                            <VideoCard
                                thumbnail="/images/Jesse Vasquez_Link(3).png"
                                youtubeId="e5Vb0wywADY"
                                onClick={setActiveVideo}
                                className="w-[280px] h-[150px] rounded-xl"
                            />
                        </div>

                        {/* vertical videos */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <VideoCard
                                thumbnail="/images/Jesse Vasquez_Link(4).png"
                                youtubeId="ipvjCvhmfKA"
                                onClick={setActiveVideo}
                                className="w-[140px] h-[250px] rounded-2xl"
                            />
                            <VideoCard
                                thumbnail="/images/Jesse Vasquez_Link(5).png"
                                youtubeId="SfKKV36zpPk"
                                onClick={setActiveVideo}
                                className="w-[140px] h-[250px] rounded-2xl"
                            />
                            <VideoCard
                                thumbnail="/images/Jesse Vasquez_Link(6).png"
                                youtubeId="_cQePQQwbUM"
                                onClick={setActiveVideo}
                                className="w-[140px] h-[250px] rounded-2xl"
                            />
                        </div>
                    </div>
                </section>

                {/* --- CRICFLIX --- */}
                <section className="flex flex-col items-center mb-20">
                    <div className="w-35 h-35 rounded-full border-4 border-gray-700 overflow-hidden shadow-2xl mb-4 bg-zinc-800">
                        <Image
                            src="/images/CricFlix.png"
                            alt="Jesse Vasquez"
                            width={150}
                            height={150}
                            className="object-cover"
                        />
                    </div>
                    <h2 className="text-center font-[700] text-[28px] md:text-[34px] mb-6 leading-none tracking-[-0.02em] text-[#f5f5f5]">
                        CricFlix
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <VideoCard
                            thumbnail="/images/CricFlix_Link(1).png"
                            youtubeId="JUKk9NFD_Ew"
                            onClick={setActiveVideo}
                            className="w-[280px] h-[150px] rounded-xl"
                        />
                        <VideoCard
                            thumbnail="/images/CricFlix_Link(2).png"
                            youtubeId="sKqLhsuYdsM"
                            onClick={setActiveVideo}
                            className="w-[280px] h-[150px] rounded-xl"
                        />
                    </div>
                </section>

                {/* --- DAYANA PLAYS --- */}
                <section className="flex flex-col items-center mb-20">
                    <div className="w-35 h-35 rounded-full border-4 border-gray-700 overflow-hidden shadow-2xl mb-4 bg-zinc-800">
                        <Image
                            src="/images/Dayana Plays.png"
                            alt="Jesse Vasquez"
                            width={150}
                            height={150}
                            className="object-cover"
                        />
                    </div>
                    <h2 className="text-center font-[700] text-[28px] md:text-[34px] mb-6 leading-none tracking-[-0.02em] text-[#f5f5f5]">
                        Dayana Plays
                    </h2>
                    <div className="flex justify-center gap-3">
                        <VideoCard
                            thumbnail="/images/Dayana Plays_Link (1).png"
                            youtubeId="G1rDlHfBor0"
                            onClick={setActiveVideo}
                            className="w-[280px] h-[150px] rounded-xl"
                        />
                        <VideoCard
                            thumbnail="/images/Dayana Plays_Link (2).png"
                            youtubeId="9GjUM9YNXME"
                            onClick={setActiveVideo}
                            className="w-[280px] h-[150px] rounded-xl"
                        />
                        <VideoCard
                            thumbnail="/images/Dayana Plays_Link (3).png"
                            youtubeId="56ullkPtvZQ"
                            onClick={setActiveVideo}
                            className="w-[280px] h-[150px] rounded-xl"
                        />
                    </div>
                </section>

                {/* Personal creativity */}
                <section className="flex flex-col items-center">
                    <div className="w-35 h-35 rounded-full border-4 border-gray-700 overflow-hidden shadow-2xl mb-4 bg-zinc-800">
                        <Image
                            src="/images/PersonalCreativity.png"
                            alt="Jesse Vasquez"
                            width={150}
                            height={150}
                            className="object-cover"
                        />
                    </div>
                    <h2 className="text-center font-[700] text-[28px] md:text-[34px] mb-6 leading-none tracking-[-0.02em] text-[#f5f5f5]">
                        Personal Creatives
                    </h2>
                    {/* horizontal videos */}
                    <div className="flex flex-col gap-4 items-center">
                        <div className="flex justify-center gap-4">
                            <VideoCard
                                thumbnail="/images/PersonalCreativity_Link (1).png"
                                youtubeId="7SzvH6VUzZ4"
                                onClick={setActiveVideo}
                                className="w-[280px] h-[150px] rounded-xl"
                            />
                            <VideoCard
                                thumbnail="/images/PersonalCreativity_Link (2).png"
                                youtubeId="liJLbZrxLcI"
                                onClick={setActiveVideo}
                                className="w-[280px] h-[150px] rounded-xl"
                            />
                            <VideoCard
                                thumbnail="/images/PersonalCreativity_Link (3).png"
                                youtubeId="GpHry5_xr3g"
                                onClick={setActiveVideo}
                                className="w-[280px] h-[150px] rounded-xl"
                            />
                        </div>
                        <div className="flex justify-center gap-4">
                            <VideoCard
                                thumbnail="/images/PersonalCreativity_Link (4).png"
                                youtubeId="a2Y3wdn23l8"
                                onClick={setActiveVideo}
                                className="w-[280px] h-[150px] rounded-xl"
                            />
                            <VideoCard
                                thumbnail="/images/PersonalCreativity_Link (5).png"
                                youtubeId="jbbuvP6i5Uo"
                                onClick={setActiveVideo}
                                className="w-[280px] h-[150px] rounded-xl"
                            />
                            <VideoCard
                                thumbnail="/images/PersonalCreativity_Link (6).png"
                                youtubeId="oOT_Eua2s-U"
                                onClick={setActiveVideo}
                                className="w-[280px] h-[150px] rounded-xl"
                            />
                        </div>

                        {/* vertical videos */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <VideoCard
                                thumbnail="/images/PersonalCreativity_Link (7).png"
                                youtubeId="DLN_iNpCBls"
                                onClick={setActiveVideo}
                                className="w-[140px] h-[250px] rounded-2xl"
                            />
                            <VideoCard
                                thumbnail="/images/PersonalCreativity_Link (8).png"
                                youtubeId="QGknIDqLXVw"
                                onClick={setActiveVideo}
                                className="w-[140px] h-[250px] rounded-2xl"
                            />
                        </div>
                    </div>
                </section>
            </main>
            {activeVideo && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
                    <div className="relative w-[600px] max-w-4xl aspect-video bg-black rounded-xl overflow-hidden">
                        <button
                            onClick={() => setActiveVideo(null)}
                            className="absolute top-3 right-3 z-10 bg-white/20 px-3 py-1 rounded-full text-white"
                        >
                            ✕
                        </button>

                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    );
}