import { Play } from "lucide-react";

interface VideoCardProps {
    thumbnail: string;
    youtubeId: string;
    onClick: (id: string) => void;
    className?: string;
    children?: React.ReactNode;
}

export const VideoCard = ({
    thumbnail,
    youtubeId,
    onClick,
    className = "",
    children,
}: VideoCardProps) => {
    return (
        <div
            onClick={() => onClick(youtubeId)}
            className={`relative overflow-hidden border border-white/40 group cursor-pointer ${className}`}
        >
            {/* Image */}
            <img
                src={thumbnail}
                alt="video"
                className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center group-hover:scale-110 transition">

                    {/* Play Icon */}
                    <Play className="w-6 h-6 text-white fill-white ml-1" />

                </div>
            </div>

            {/* Extra Content */}
            {children}

            {/* Border */}
            <div className="absolute inset-0 border border-white/30 pointer-events-none rounded-xl" />
        </div>
    );
};