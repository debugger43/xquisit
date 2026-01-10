import WorkCard from "./workCard";

export default function WorkGrid() {
  return (
    <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-10 mt-[15vh] p-8">
      <div className="mb-10">
        <WorkCard src="/elements/work-01.webp" accentColor="#6CCCCE" />
      </div>

       <div className="mb-10 sm:display-block">
        <WorkCard src="/elements/work-08.webp" accentColor="#6CCCCE" />
      </div>

      <div className="mb-10">
        <WorkCard src="/elements/work-02.webp" accentColor="rgb(236,231,126)" />
      </div>

      <div className="mb-10">
        <WorkCard src="/elements/work-05.webp" accentColor="#6CCCCE" />
      </div>

      <div className="mb-10">
        <WorkCard src="/elements/work-03.webp" accentColor="rgb(227,73,72)" />
      </div>

      <div className="mb-10">
        <WorkCard src="/elements/work-06.webp" accentColor="rgb(206,107,178)" />
      </div>

      <div className="mb-10">
        <WorkCard src="/elements/work-04.webp" accentColor="rgb(107,206,115)" />
      </div>

      <div className="mb-10">
        <WorkCard src="/elements/work-07.webp" accentColor="rgb(123,107,206)" />
      </div>

     
    </div>
  );
}