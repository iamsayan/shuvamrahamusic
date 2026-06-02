import FAQ from "@/components/faq";
import HeroCSS from "@/components/hero-css";
import Pricing from "@/components/pricing";
import ProgramOverview from "@/components/program-overview";
import Reviews from "@/components/reviews";
import StudentResults from "@/components/student-results";
import WhatYouAchieve from "@/components/what-you-achieve";

export default function Page() {
  return (
    <main className="bg-[#05050A]">
      <HeroCSS />
      <StudentResults />
      <ProgramOverview />
      <WhatYouAchieve />

      <div className="flex flex-col border-t border-cyan-500/10">
        <Pricing />
      </div>

      <div className="flex flex-col border-t border-amber-500/10">
        <Reviews />
      </div>

      <div className="flex flex-col border-t border-indigo-500/10">
        <FAQ />
      </div>
    </main>
  );
}
