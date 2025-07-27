import BlogSection from '@/components/BlogSection';
import ExpertiseDomainsSection from '@/components/DomainExpertise';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import CustomAssetsSection from '@/components/ia/CustomActionAsset';
import TeamSection from '@/components/ia/TeamSection';
import Services from '@/components/Services';
import SolutionsShowcaseSection from '@/components/ShowCase';
import TrustSection from '@/components/TrustSection';
import React from 'react';


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0a0a1a]">
      <Hero />
      <TrustSection/>
      <Features />
      <CustomAssetsSection /> 
      <Services />
      <ExpertiseDomainsSection />
      <SolutionsShowcaseSection />
      <TeamSection />
      <BlogSection />
      {/*<Footer/> */}
    </main>
  );
}