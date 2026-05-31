import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeroCSS from "./components/HeroCSS/HeroCSS";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Pricing from "./components/Pricing/Pricing";
import ProgramOverview from "./components/ProgramOverview/ProgramOverview";
import Reviews from "./components/Reviews/Reviews";
import StudentResults from "./components/StudentResults/StudentResults";
import WhatYouAchieve from "./components/WhatYouAchieve/WhatYouAchieve";
import ThirdSection from "./components/ThirdSection/ThirdSection";

export default function Home() {
  return (
    <main className="bg-[#05050A]">
      <Header />
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

      <Footer />
    </main>
  );
}
