"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, Linkedin, Twitter, Github, Mail, Eye, ArrowUpRight } from "lucide-react";
import React from "react";

// Team member data for mapping
const teamMembers = [
  {
    id: 1,
    slug: "adam-dongmo",
    name: "Vincess Dongmo",
    role: "Founder & CEO",
    image: "/founder/image1.jpeg",
    bio: "Visionary leader driving AI innovation across Africa with 5+ years of experience in machine learning and robotics.",
    expertise: ["AI Strategy", "Robotics", "Leadership", "Computer Vision"],
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "vincess.dongmo@synthi-ai.com"
    }
  },
  {
    id: 2,
    slug: "fokam-minyim",
    name: "Fokam Minyim",
    role: "COO",
    image: "/founder/melvin.png",
    bio: "Master's in Machine Learning with expertise in neural networks and NLP applications.",
    expertise: ["Machine Learning", "NLP", "Research"],
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "melvin.fokam@synthi-ai.com"
    }
  },
   {
    id: 3,
    slug: "michael-johnson",
    name: "Michael Johnson",
    role: "Robotics Engineer",
    image: "/founder/woman.jpeg",
    bio: "Robotics specialist focused on autonomous systems and human-robot interaction design.",
    expertise: ["Robotics", "Automation", "IoT"],
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "michael@synthi-ai.com"
    }
  },
  {
    id: 4,
    slug: "sarah-chen",
    name: "Gaëlle Tamho",
    role: "UI/UX designer",
    image: "/founder/gael.jpeg",
    bio: "Bsc in Software Engineering with expertise in UI/UX design and user-centered development.",
    expertise: ["UX/UI Design", "Dev Frontend", "Web Development"],
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "gael@synthi-ai.com"
    }
  }
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section 
      ref={ref}
      className="relative py-20 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-2 h-2 bg-[#6b7db8] rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-[#6b7db8]/60 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-1 h-1 bg-[#6b7db8]/40 rounded-full animate-pulse animation-delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center px-4 py-2 bg-[#6b7db8]/10 border border-[#6b7db8]/20 text-[#6b7db8] uppercase text-xs font-semibold tracking-widest rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#6b7db8] rounded-full mr-2 animate-pulse"></span>
              Our Awesome Team
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We Are Born For Technology
          </motion.h2>
          
          <motion.p 
            className="text-lg text-[#6b6b6b] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            We make life easier for customers and communities through reliable, affordable, powerful, and useful tech innovations. Meet the brilliant minds behind our AI revolution.
          </motion.p>
        </motion.div>

        {/* Team Grid - Better for showcasing all members */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <Link href={`/team/${member.slug}`} className="block">
                <Card className="relative h-[500px] lg:h-[550px] overflow-hidden rounded-2xl border border-[#6b7db8]/20 bg-gradient-to-b from-gray-900/50 to-black/80 backdrop-blur-sm hover:border-[#6b7db8]/40 transition-all duration-500 cursor-pointer">
                  
                  {/* View Portfolio Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="text-center">
                      <Eye className="w-12 h-12 text-[#6b7db8] mx-auto mb-4" />
                      <p className="text-white font-semibold text-lg mb-2">View Portfolio</p>
                      <div className="flex items-center justify-center gap-2 text-[#6b7db8]">
                        <span className="text-sm">Learn more</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Background Image */}
                  <div className="absolute inset-0">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#6b7db8]/20 to-gray-900/80 flex items-center justify-center">
                        <div className="w-32 h-32 bg-[#6b7db8]/30 rounded-full flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  </div>

                  <CardContent className="absolute inset-0 p-0 flex flex-col justify-end z-10">
                    <div className="relative p-6 lg:p-8">
                      
                      {/* Main Info */}
                      <div className="mb-4">
                        <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent mb-2 leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-[#6b7db8] font-semibold text-sm lg:text-base mb-3">
                          {member.role}
                        </p>
                      </div>

                      {/* Bio - appears on hover */}
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={hoveredMember === member.id ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">
                          {member.bio}
                        </p>
                        
                        {/* Expertise tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {member.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#6b7db8]/20 text-[#6b7db8] text-xs font-medium rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Social Links */}
                      <motion.div 
                        className="flex gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={hoveredMember === member.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        onClick={(e) => e.preventDefault()} // Prevent link navigation when clicking social icons
                      >
                        <a 
                          href={member.social.linkedin}
                          className="p-2 bg-[#6b7db8]/20 hover:bg-[#6b7db8]/40 text-[#6b7db8] rounded-lg transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a 
                          href={member.social.twitter}
                          className="p-2 bg-[#6b7db8]/20 hover:bg-[#6b7db8]/40 text-[#6b7db8] rounded-lg transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                        <a 
                          href={member.social.github}
                          className="p-2 bg-[#6b7db8]/20 hover:bg-[#6b7db8]/40 text-[#6b7db8] rounded-lg transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        <a 
                          href={`mailto:${member.social.email}`}
                          className="p-2 bg-[#6b7db8]/20 hover:bg-[#6b7db8]/40 text-[#6b7db8] rounded-lg transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Alternative: Carousel for mobile/smaller screens */}
        <motion.div
          className="lg:hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="relative max-w-sm mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {teamMembers.map((member) => (
                  <CarouselItem key={member.id}>
                    <Link href={`/team/${member.slug}`}>
                      <Card className="relative h-[500px] overflow-hidden rounded-2xl border border-[#6b7db8]/20 bg-gradient-to-b from-gray-900/50 to-black/80 cursor-pointer hover:border-[#6b7db8]/40 transition-all duration-300">
                        
                        {/* Background Image */}
                        <div className="absolute inset-0">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                              sizes="400px"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#6b7db8]/20 to-gray-900/80 flex items-center justify-center">
                              <div className="w-32 h-32 bg-[#6b7db8]/30 rounded-full flex items-center justify-center">
                                <span className="text-4xl font-bold text-white">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80"></div>
                        </div>

                        <CardContent className="absolute inset-0 p-0 flex flex-col justify-end">
                          <div className="relative z-10 p-6">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent mb-2">
                              {member.name}
                            </h3>
                            <p className="text-[#6b7db8] font-semibold text-sm mb-3">
                              {member.role}
                            </p>
                            <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">
                              {member.bio}
                            </p>
                            
                            {/* View Portfolio indication */}
                            <div className="flex items-center gap-2 text-[#6b7db8] text-sm">
                              <Eye className="w-4 h-4" />
                              <span>View Portfolio</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full border border-[#6b7db8]/30 bg-gray-900/80 backdrop-blur-sm hover:bg-[#6b7db8]/20 hover:border-[#6b7db8]/50 transition-all duration-300">
                <ChevronLeft className="w-5 h-5 text-[#6b7db8]" />
              </CarouselPrevious>

              <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full border border-[#6b7db8]/30 bg-gray-900/80 backdrop-blur-sm hover:bg-[#6b7db8]/20 hover:border-[#6b7db8]/50 transition-all duration-300">
                <ChevronRight className="w-5 h-5 text-[#6b7db8]" />
              </CarouselNext>
            </Carousel>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-[#6b7db8] hover:bg-[#5a6ba3] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-[#6b7db8]/20 transition-all duration-300 group"
          >
            <span>Join Our Team</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              →
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}