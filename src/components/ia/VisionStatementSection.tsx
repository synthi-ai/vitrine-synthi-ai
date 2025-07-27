"use client";

import React from "react";

export default function VisionStatementSection() {
  return (
    <section className="w-full py-12 md:py-[50px] relative flex justify-center items-start bg-gradient-to-r from-transparent via-blue-600/40 to-transparent">
      <div className="flex flex-col items-center gap-5 w-full">
        <h2 className="w-full text-[46px] leading-[55.2px] tracking-[-0.92px] text-center font-bold bg-gradient-to-r from-[#EBF1FF] to-[#B3C0DE] bg-clip-text text-transparent">
          Our Vision
        </h2>

        <div className="flex flex-col items-center w-full max-w-[700px]">
          <p className="text-base leading-[28.8px] text-center text-gray">
            We aim to position Africa as a key player in the artificial
            intelligence revolution by developing local solutions with a global
            impact.
            <br />
            <br />
            Our goal is to be the AI leader on the continent, offering
            innovations that improve people&apos;s lives and strengthen the
            competitiveness of businesses.
          </p>
        </div>
      </div>
    </section>
  );
}
