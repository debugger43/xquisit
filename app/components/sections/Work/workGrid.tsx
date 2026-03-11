import WorkCard from "./workCard";

export default function WorkGrid() {
  return (
    <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-10 mt-[15vh] p-8">

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/work-01.webp"
          video="/elements/videos/R1C1.mp4"
          accentColor="#6CCCCE"
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/work-08.webp"
          video="/works/work-08.mp4"
          accentColor="#6CCCCE"
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/work-02.webp"
          video="/elements/videos/R1C2.mp4"
          accentColor="rgb(236,231,126)"
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/work-05.webp"
          video="/elements/videos/R2C2.mp4"
          accentColor="#6CCCCE"
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/work-03.webp"
          video="/elements/videos/R1C3.mp4"
          accentColor="rgb(227,73,72)"
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/work-06.webp"
          video="/works/work-06.mp4"
          accentColor="rgb(206,107,178)"
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/work-04.webp"
          video="/elements/videos/R1C4.mp4"
          accentColor="rgb(107,206,115)"
        />
      </div>

      <div className="mb-10 work-item">
        <WorkCard
          src="/elements/work-07.webp"
          video="/works/work-07.mp4"
          accentColor="rgb(123,107,206)"
        />
      </div>

    </div>
  );
}