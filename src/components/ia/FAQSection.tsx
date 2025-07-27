"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export const FAQSection = () => {
  // FAQ data for mapping
  const faqItems = [
    {
      question: "What is Synthi AI ?",
      answer: "",
    },
    {
      question: "What are Synthi AI services ?",
      answer: "",
    },
    {
      question: "Which solutions do Synthi AI offer ?",
      answer: "",
    },
    {
      question: "Why choose Synthi AI as trust tech partener ?",
      answer:
        "We're Africa's AI leader, specializing in ethical, impactful AI solutions. With strong partenerships and cutting-edge technology, we're transforming key sectors and improving lives across the continent.",
    },
  ];

  return (
    <section className="flex flex-col gap-2.5 w-full">
      <div className="flex flex-col md:flex-row justify-between gap-10 w-full">
        <div className="flex flex-col items-start gap-[17px] max-w-[392px]">
          <h2 className="[background:linear-gradient(95deg,rgba(235,241,255,1)_0%,rgba(179,192,222,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Arial_Rounded_MT_Bold-Regular',Helvetica] font-normal text-transparent text-[46px] tracking-[-0.92px] leading-[55.2px]">
            FAQs
          </h2>

          <p className="[font-family:'Arial-Regular',Helvetica] font-normal text-gray text-base leading-[28.8px]">
            We understand that you may have some questions before making a
            decision, and we are here to provide you with all the answers you
            need.
          </p>
        </div>

        <div className="flex flex-col w-full md:w-[680px]">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-line-gray border-opacity-70 py-10 first:pt-0"
              >
                <AccordionTrigger className="flex justify-between items-center">
                  <span className="[font-family:'Arial-Regular',Helvetica] font-normal text-light-gray text-xl leading-[36.0px] text-left pl-2.5">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-2.5 [font-family:'Arial-Regular',Helvetica] font-normal text-gray text-base leading-[28.8px]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
