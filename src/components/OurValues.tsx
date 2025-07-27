'use client';

import { FaLightbulb, FaStar, FaBalanceScale, FaUsers, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const values = [
  {
    id: 1,
    title: 'Innovation',
    description: "Designing cutting-edge solutions adapted to the market realities.",
    icon: <FaLightbulb className='text-yellow-400 text-4xl' />,
    gradient: 'from-yellow-400/20 to-orange-400/20',
    borderColor: 'border-yellow-400/30',
    glowColor: 'shadow-yellow-400/20',
  },
  {
    id: 2,
    title: 'Excellence',
    description: "Maintaining high technological standards and ensuring reliable solutions.",
    icon: <FaStar className='text-red-400 text-4xl' />,
    gradient: 'from-red-400/20 to-pink-400/20',
    borderColor: 'border-red-400/30',
    glowColor: 'shadow-red-400/20',
  },
  {
    id: 3,
    title: 'Ethics & Transparency',
    description: "Ensuring responsible, secure, and user-respectful AI.",
    icon: <FaBalanceScale className='text-yellow-500 text-4xl' />,
    gradient: 'from-yellow-500/20 to-amber-400/20',
    borderColor: 'border-yellow-500/30',
    glowColor: 'shadow-yellow-500/20',
  },
  {
    id: 4,
    title: 'Society Impact',
    description: "Improving people's lives and contributing to the Sustainable Development Goals (SDGs).",
    icon: <FaUsers className='text-red-500 text-4xl' />,
    gradient: 'from-red-500/20 to-rose-400/20',
    borderColor: 'border-red-500/30',
    glowColor: 'shadow-red-500/20',
  },
  {
    id: 5,
    title: 'Collaboration',
    description: "Working with key players to build a strong AI ecosystem in Africa.",
    icon: <FaHandshake className='text-blue-400 text-4xl' />,
    gradient: 'from-blue-400/20 to-cyan-400/20',
    borderColor: 'border-blue-400/30',
    glowColor: 'shadow-blue-400/20',
  },
];

// Animation variants with proper typing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function OurValues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className='relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden'
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-blue-500/3 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className='text-center mb-16 lg:mb-20'
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className='inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-400/20 text-blue-400 uppercase tracking-widest text-xs font-semibold rounded-full backdrop-blur-sm'>
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              The DNA of our AI
            </span>
          </motion.div>
          
          <motion.h2 
            className='text-4xl lg:text-5xl xl:text-6xl font-bold mt-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight'
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our Values
          </motion.h2>
          
          <motion.p 
            className='text-gray-400 mt-6 max-w-3xl mx-auto text-lg leading-relaxed'
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            We work closely with our clients to understand their unique challenges and deliver tailored solutions that drive tangible results through our core values.
          </motion.p>
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto'
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" as const }
              }}
              whileTap={{ scale: 0.98 }}
              className={`group relative bg-gradient-to-br ${value.gradient} backdrop-blur-sm border ${value.borderColor} p-8 rounded-2xl shadow-xl hover:${value.glowColor} hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden`}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon with animation */}
                <motion.div 
                  className="mb-6 transform group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {value.icon}
                </motion.div>
                
                {/* Title */}
                <h3 className='text-xl lg:text-2xl font-bold mb-4 text-white group-hover:text-blue-100 transition-colors duration-300'>
                  {value.title}
                </h3>
                
                {/* Description */}
                <p className='text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors duration-300'>
                  {value.description}
                </p>
                
                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 w-full"></div>
              </div>

              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full bg-blue-400 animate-pulse`}
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}