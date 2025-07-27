"use client";

import FAQSection from "@/components/Faq";
import AboutUsSection from "@/components/ia/AboutUsSection";
import AssetsDisplaySection from "@/components/ia/ProfessionalSectionsComplete";
import CallToActionSection from "@/components/ia/CallToActionSection";
import CustomAssetsSection from "@/components/ia/CustomActionAsset";
import FeaturesDisplaySection from "@/components/ia/TeamSection";
import FeaturesOverviewSection from "@/components/ia/FeaturesOverviewSection";
import NavigationMenuSection from "@/components/ia/NavogationMenuSection";
import VisionStatementSection from "@/components/ia/VisionStatementSection";



export default function About() {
  return (
    <div className="relative w-full bg-color-palette-dark-bg">
      <div className="relative w-full">
        {/* Background gradients */}
        <div className="absolute w-[470px] h-[412px] top-0 left-[147px] rounded-[10px] blur-[100px] bg-gradient-to-b from-[rgba(19,23,56,1)] to-[rgba(49,91,239,1)] opacity-20" />
        <div className="absolute w-[664px] h-[454px] top-[428px] left-[277px] blur-[150px] bg-gradient-to-b from-[rgba(19,23,56,1)] to-[rgba(44,53,134,1)] opacity-[0.16] rounded-[10px]" />
        <div className="absolute w-[537px] h-[428px] top-[2964px] left-[472px] bg-[#1e4290] rotate-[23.32deg] blur-[100px] opacity-[0.06] rounded-[10px]" />
        <div className="absolute w-[655px] h-[412px] top-[2270px] left-[1257px] blur-[100px] bg-gradient-to-b from-[rgba(19,23,56,1)] to-[rgba(49,91,239,1)] opacity-[0.16] rounded-[10px]" />
        <div className="absolute w-[681px] h-[713px] top-[5335px] left-[113px] bg-[#1e4290] rotate-[23.32deg] blur-[150px] opacity-[0.06] rounded-[10px]" />

        {/* Main content */}
        <div className="relative z-10">
          <div className="flex flex-col items-center gap-[150px] pt-[100px]">
            <AboutUsSection />
            <VisionStatementSection />
            <CustomAssetsSection />
            <FeaturesOverviewSection />
            <FeaturesDisplaySection />
            <AssetsDisplaySection />
            <CallToActionSection />
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  );
}
