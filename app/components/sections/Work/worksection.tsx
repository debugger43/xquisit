import WorkGrid from "./workGrid";

export default function WorkSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* HEADING */}
   <div className="absolute top-[5vh] left-1/2 -translate-x-1/2 w-full max-w-[1500px] text-center pointer-events-none z-10">
     <h2 className="   font-[700] text-[72px]  leading-[102px] tracking-[0em] text-center text-white ">
  Different Styles, Same <span className="text-brand">Excellence</span>
</h2>
      </div>

      {/* WORK FRAME (CLIPPED AREA) */}
     
        <div className="mx-auto mt-[12vh]  w-[min(86vw,1520px)] h-[90vh] overflow-hidden ">
          <WorkGrid />
        </div>
    
    </section>
  );
}
