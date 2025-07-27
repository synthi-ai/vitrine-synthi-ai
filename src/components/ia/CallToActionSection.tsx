"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function CallToActionSection() {
  return (
    <section className="w-full py-12 md:py-16">
      <Card className="mx-auto max-w-7xl rounded-[24px] overflow-hidden border border-color-palette-stroke">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:px-16 md:py-10 [background:linear-gradient(117deg,rgba(82,134,246,1)_0%,rgba(21,69,201,1)_100%)]">
            <div className="flex flex-col gap-3 max-w-[600px]">
              <h2 className="[background:linear-gradient(95deg,rgba(235,241,255,1)_0%,rgba(179,192,222,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Arial_Rounded_MT_Bold-Regular',Helvetica] font-bold text-3xl md:text-4xl leading-tight">
                Empower your future with Synthi AI
              </h2>
              <p className="[font-family:'Arial-Regular',Helvetica] text-white text-base leading-relaxed">
                Ready to harness the power of AI for your business or
                institution? Contact us today to explore how Synthi AI can
                tailor cutting-edge solutions to your specific needs. Let&apos;s
                innovate together and create a sustainable, tech-driven future.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                className="h-auto px-8 py-3 text-base font-medium bg-white text-blue-600 hover:bg-gray-100"
                size="lg"
              >
                Contact us
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
