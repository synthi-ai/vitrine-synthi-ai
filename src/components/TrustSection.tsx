'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Star, Users, Award, TrendingUp } from 'lucide-react';

const TrustSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const logos = [
    { 
      src: '/images/dribbble.png', 
      alt: 'Dribbble',
      category: 'Design'
    },
    { 
      src: '/images/xxpeng.png', 
      alt: 'Xpeng',
      category: 'AI Auto'
    },
    { 
      src: '/images/ubora.png', 
      alt: 'Ubora',
      category: 'Health AI'
    },
    { 
      src: '/images/founders_hub.png', 
      alt: 'Founders Hub',
      category: 'Startup'
    },
    { 
      src: '/images/SurveyMonkey.jpg', 
      alt: 'SurveyMonkey',
      category: 'Analytics'
    },
    { 
      src: '/images/verox.webp', 
      alt: 'Veroxfloor',
      category: 'IoT'
    },
  ];

  // Duplicate for infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  const stats = [
    {
      icon: <Users className="w-6 h-6 text-[#6b7db8]" />,
      number: "50+",
      label: "AI Partners"
    },
    {
      icon: <Award className="w-6 h-6 text-[#6b7db8]" />,
      number: "98%",
      label: "Success Rate"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#6b7db8]" />,
      number: "200%",
      label: "ROI Growth"
    },
    {
      icon: <Star className="w-6 h-6 text-[#6b7db8]" />,
      number: "4.9/5",
      label: "Rating"
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-16 lg:py-24 bg-black overflow-hidden"
    >
      {/* Background decorative elements - subtle tech pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-[#6b7db8] rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-1 h-1 bg-[#6b7db8] rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-1.5 h-1.5 bg-[#6b7db8]/50 rounded-full animate-pulse animation-delay-500"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
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
              They Trust Us
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Trusted by Industry Leaders
          </motion.h2>
          
          <motion.p 
            className="text-lg text-[#6b6b6b] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Join innovative companies transforming their businesses with our AI and robotics solutions.
          </motion.p>
        </motion.div>

        {/* Stats Section
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group bg-gray-900/50 backdrop-blur-sm border border-[#6b7db8]/20 rounded-xl p-6 text-center hover:bg-gray-900/70 hover:border-[#6b7db8]/40 transition-all duration-300"
            >
              <motion.div
                className="flex justify-center mb-3"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-[#6b6b6b] font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>  */}

        {/* Main Partners Grid
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {logos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-gray-900/30 backdrop-blur-sm border border-[#6b7db8]/10 rounded-xl p-6 hover:bg-gray-900/50 hover:border-[#6b7db8]/30 transition-all duration-500 cursor-pointer"
              >
            
                <div className="relative w-full h-12 mb-3 filter grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                  />
                </div>
                
              
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 5 }}
                  whileHover={{ y: 0 }}
                >
                  <span className="inline-block px-2 py-1 bg-[#6b7db8]/20 text-[#6b7db8] text-xs font-medium rounded-full">
                    {logo.category}
                  </span>
                </motion.div>

               
                <div className="absolute inset-0 bg-gradient-to-br from-[#6b7db8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>  */}

        {/* Infinite Scroll Section */}
        <motion.div
          className="relative overflow-hidden py-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10"></div>
          
          <motion.div
            className="flex space-x-16"
            animate={{
              x: [0, -1200],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear" as const,
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-16 relative filter grayscale opacity-30 hover:grayscale-0 hover:opacity-80 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Call to Action 
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-[#6b7db8] hover:bg-[#5a6ba3] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-[#6b7db8]/20 transition-all duration-300 group"
          >
            <span>Join Our AI Revolution</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              →
            </motion.div>
          </motion.button>
        </motion.div> */}
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
};

export default TrustSection;