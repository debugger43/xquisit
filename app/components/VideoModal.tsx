"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type Props = {
    video: string;
    onClose: () => void;
    isClosing?: boolean;
};

export default function VideoModal({ video, onClose, isClosing }: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        videoRef.current?.play();
    }, []);

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-center justify-center"
        >
            {/* CLOSE */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white bg-white/20 rounded-full p-2 backdrop-blur-md"
            >
                <X size={20} />
            </button>

            {/* MODAL BOX */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative w-[90vw] max-w-[600px] max-h-[70vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl bg-black 
  transform transition-all duration-300 ease-out
  ${isClosing ? "animate-[modalOut_0.3s_ease_forwards]" : "animate-[modalIn_0.3s_ease_forwards]"}`}
            >
                <video
                    ref={videoRef}
                    controls
                    autoPlay
                    className="max-w-full max-h-[80vh] object-contain"
                >
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        </div>
    );
}