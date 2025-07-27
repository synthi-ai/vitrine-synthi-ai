import About from '@/components/About';
import FAQSection from '@/components/Faq';
import AboutUsSection from '@/components/ia/AboutUsSection';
import AssetsDisplaySection from '@/components/ia/ProfessionalSectionsComplete';
import FeaturesDisplaySection from '@/components/ia/TeamSection';
import FeaturesOverviewSection from '@/components/ia/FeaturesOverviewSection';
import VisionStatementSection from '@/components/ia/VisionStatementSection';
import React from 'react';

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0a0a1a]">
    <AboutUsSection />
    <VisionStatementSection />
    <FeaturesOverviewSection />
    <AssetsDisplaySection />
    <FAQSection/>
    </main>
  );
}

  {/* <FAQSection /><FeaturesDisplaySection />*/}