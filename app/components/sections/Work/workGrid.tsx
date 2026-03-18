import WorkCard from "./workCard";
import { works } from "@/app/data/works"; // adjust path if needed

export default function WorkGrid() {
  return (
    <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-10 mt-[15vh] p-8">
      {works.map((work) => (
        <div key={work.src} className="mb-10 work-item">
          <WorkCard {...work} />
        </div>
      ))}
    </div>
  );
}