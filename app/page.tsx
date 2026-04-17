import HeroCSS from "./components/HeroCSS/HeroCSS";
import StudentResults from "./components/StudentResults/StudentResults";
import WhatYouAchieve from "./components/WhatYouAchieve/WhatYouAchieve";
import TargetAudience from "./components/TargetAudience/TargetAudience";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Pricing from "./components/Pricing/Pricing";

export default function Home() {
  return (
    <main className="bg-[#05050A]">
      <HeroCSS />
      <StudentResults />
      <WhatYouAchieve />
      <TargetAudience />
      <div className="flex flex-col border-t border-cyan-500/10">
        <HowItWorks />
      </div>

      <div className="flex flex-col border-t border-cyan-500/10">
        <Pricing />
      </div>
    </main>
  );
}
