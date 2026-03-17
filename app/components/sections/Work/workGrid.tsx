import WorkCard from "./workCard";

export default function WorkGrid({ onVideoClick }: { onVideoClick: (video: string) => void }) {
  return (
    <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-10 mt-[15vh] p-8">

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/works/work-01.webp"
          video="/elements/works/videos/R1C1.mp4"
          accentSvg="/elements/works/R1C1-V.svg"
          onClick={onVideoClick}
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/works/work-08.webp"
          accentSvg="/elements/works/R2C1-V.svg"
          offsetX={60}
          offsetY={-80}
          onClick={onVideoClick}
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/works/work-02.webp"
          video="/elements/works/videos/R1C2 copy.mp4"
          accentSvg="/elements/works/R1C2-V.svg"

          imageClassName="hover:max-h-[200px]"
          onClick={onVideoClick}
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/works/work-05.webp"
          video="/elements/works/videos/R2C2.mp4"
          accentSvg="/elements/works/R2C2-V.svg"
          offsetX={59}
          offsetY={10}
          onClick={onVideoClick}
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/works/work-03.webp"
          video="/elements/works/videos/R1C3.mp4"
          accentSvg="/elements/works/R1C3-V.svg"
          offsetX={9}
          offsetY={8}
          onClick={onVideoClick}
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/works/work-06.webp"
          video="/elements/works/videos/R2C3.mp4"
          accentSvg="/elements/works/R2C3-V.svg"
          offsetX={8}
          offsetY={2}
          onClick={onVideoClick}
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/works/work-04.webp"
          video="/elements/works/videos/R1C4.mp4"
          accentSvg="/elements/works/R1C4-V.svg"
          onClick={onVideoClick}
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/works/work-07.webp"
          video="/elements/works/videos/R2C4.mp4"
          accentSvg="/elements/works/R2C4-V.svg"
          offsetX={17}
          offsetY={8}
          onClick={onVideoClick}
        />
      </div>

    </div>
  );
}