'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    id: 1,
    question: 'What is Synthi AI?',
    answer: 'Synthi AI is an advanced AI platform specializing in innovative solutions for businesses and industries across Africa and beyond. We design cutting-edge algorithms in AI, NLP, and computer vision, applied to real-world challenges in healthcare, agriculture, finance, and education.',
    category: 'General'
  },
  {
    id: 2,
    question: 'What are Synthi AI services?',
    answer: 'We offer comprehensive AI-driven solutions including research & development through Synthi AI Labs, business solutions for enterprises, educational programs via Synthi AI Academy, and our new intelligent advisory service NeuraLynx Advisor for strategic business insights.',
    category: 'Services'
  },
  {
    id: 3,
    question: 'Which solutions does Synthi AI offer?',
    answer: 'Our solutions span multiple sectors: healthcare (medical diagnosis, teleconsultation), agriculture (yield prediction, smart irrigation), finance (fraud detection, risk management), climate & environment (modeling, resource management), and industry & logistics (process automation, supply chain management).',
    category: 'Solutions'
  },
  {
    id: 4,
    question: 'Why choose Synthi AI as your trusted tech partner?',
    answer: 'We are Africa\'s leading AI innovator, specializing in ethical, impactful AI solutions. With strong partnerships with renowned universities and institutes, cutting-edge technology, and a deep understanding of African markets, we\'re transforming key sectors and improving lives across the continent.',
    category: 'Partnership'
  },
  {
    id: 5,
    question: 'How does NeuraLynx Advisor work?',
    answer: 'NeuraLynx Advisor is our AI-powered business intelligence assistant that provides 24/7 strategic insights, market analysis, and personalized recommendations. It integrates with your existing business tools and uses advanced analytics to help you make informed decisions and optimize growth.',
    category: 'NeuraLynx'
  },
  {
    id: 6,
    question: 'What makes Synthi AI different from other AI companies?',
    answer: 'Our unique focus on African challenges, combined with world-class research capabilities and practical business applications, sets us apart. We offer end-to-end solutions from research to implementation, backed by our commitment to ethical AI and sustainable development goals.',
    category: 'Competitive Advantage'
  }
];

const categories = ['All', 'General', 'Services', 'Solutions', 'Partnership', 'NeuraLynx'];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const faqsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contactRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
        // Header animation
        gsap.fromTo(headerRef.current,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // FAQ items stagger animation
        gsap.fromTo(faqsRef.current,
          { opacity: 0, x: 50, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            scrollTrigger: {
              trigger: faqsRef.current[0],
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Contact section animation
        gsap.fromTo(contactRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Floating animation for question marks
        gsap.to(".floating-icon", {
          y: -15,
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.5
        });

      }, sectionRef);

      return () => ctx.revert();
    }
  }, [filteredFaqs]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-black text-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 right-32 w-2 h-2 bg-[#6b7db8] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-[#6b7db8]/60 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-[#6b7db8]/40 rounded-full animate-pulse animation-delay-500"></div>
        
        {/* Floating question marks */}
        <HelpCircle className="floating-icon absolute top-20 right-1/4 w-6 h-6 text-[#6b7db8]/20" />
        <HelpCircle className="floating-icon absolute bottom-40 left-1/3 w-4 h-4 text-[#6b7db8]/15 animation-delay-1000" />
        <MessageCircle className="floating-icon absolute top-1/2 right-20 w-5 h-5 text-[#6b7db8]/25 animation-delay-1500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row items-start gap-12 xl:gap-20">
          
          {/* Left Section - Header */}
          <div ref={headerRef} className="w-full xl:w-2/5 xl:sticky xl:top-32">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Badge className="px-4 py-2 bg-[#6b7db8]/10 border border-[#6b7db8]/20 text-[#6b7db8] uppercase text-xs font-semibold tracking-widest rounded-full backdrop-blur-sm mb-6">
                <HelpCircle className="w-3 h-3 mr-2" />
                Support Center
              </Badge>
              
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent">
                  Frequently Asked
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              
              <p className="text-[#6b6b6b] text-lg leading-relaxed mb-8">
                We understand that you may have some questions before making a decision, 
                and we are here to provide you with all the answers you need. 
                Explore our comprehensive FAQ section or reach out directly.
              </p>

              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-4">Filter by Category:</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === category
                          ? 'bg-[#6b7db8] text-white shadow-lg shadow-[#6b7db8]/30'
                          : 'bg-[#6b7db8]/20 text-[#6b7db8] hover:bg-[#6b7db8]/30'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card className="bg-gray-900/50 border-[#6b7db8]/20 hover:border-[#6b7db8]/40 transition-all duration-300 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#6b7db8]/20 rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-[#6b7db8]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">Live Chat Support</h4>
                        <p className="text-[#6b6b6b] text-xs">Get instant answers</p>
                      </div>
                      <Button size="sm" className="bg-[#6b7db8] hover:bg-[#5a6ba3] text-white">
                        Chat Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-[#6b7db8]/20 hover:border-[#6b7db8]/40 transition-all duration-300 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#6b7db8]/20 rounded-xl flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#6b7db8]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">Email Support</h4>
                        <p className="text-[#6b6b6b] text-xs">contact@synthi-ai.com</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-[#6b7db8]/30 text-[#6b7db8] hover:bg-[#6b7db8]/10">
                        Send Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Right Section - FAQ List */}
          <div className="w-full xl:w-3/5">
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  ref={(el) => {
                    faqsRef.current[index] = el;
                  }}
                  variants={itemVariants}
                  className="group"
                >
                  <Card className="bg-gray-900/50 border-[#6b7db8]/20 hover:border-[#6b7db8]/40 transition-all duration-500 overflow-hidden backdrop-blur-sm group-hover:bg-gray-900/70">
                    <CardContent className="p-0">
                      <button
                        className="w-full text-left flex justify-between items-center p-6 lg:p-8 transition-all duration-300"
                        onClick={() => toggleFAQ(index)}
                      >
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-[#6b7db8]/20 text-[#6b7db8] text-xs px-2 py-1">
                              {faq.category}
                            </Badge>
                          </div>
                          <h3 className="text-lg lg:text-xl font-semibold text-white group-hover:text-[#6b7db8] transition-colors duration-300">
                            {faq.question}
                          </h3>
                        </div>
                        <motion.div
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-6 h-6 text-[#6b7db8] group-hover:text-white transition-colors duration-300" />
                        </motion.div>
                      </button>

                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: openIndex === index ? 'auto' : 0,
                          opacity: openIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                          <div className="w-full h-px bg-[#6b7db8]/20 mb-6"></div>
                          <p className="text-[#6b6b6b] leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                            {faq.answer}
                          </p>
                          
                          {/* Additional actions */}
                          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[#6b7db8]/10">
                            <button className="text-[#6b7db8] hover:text-white text-sm font-medium transition-colors duration-300">
                              Was this helpful?
                            </button>
                            <div className="flex gap-2">
                              <button className="text-[#6b7db8] hover:text-white text-sm transition-colors duration-300">
                                👍 Yes
                              </button>
                              <button className="text-[#6b7db8] hover:text-white text-sm transition-colors duration-300">
                                👎 No
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Still have questions section */}
            <motion.div
              ref={contactRef}
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-[#6b7db8]/30 shadow-2xl shadow-[#6b7db8]/10 overflow-hidden">
                <CardContent className="p-8 lg:p-12 text-center">
                  <div className="w-16 h-16 bg-[#6b7db8]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-8 h-8 text-[#6b7db8] animate-pulse" />
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent mb-4">
                    Still have questions?
                  </h3>
                  
                  <p className="text-[#6b6b6b] text-lg mb-8 max-w-2xl mx-auto">
                    Can&apos;t find the answer you&apos;re looking for? Our friendly team is here to help. 
                    Get in touch and we&apos;ll get back to you as soon as possible.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] hover:from-[#5a6ba3] hover:to-[#7a8fc9] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-[#6b7db8]/30 transition-all duration-300">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                    <Button variant="outline" className="border-[#6b7db8]/30 text-[#6b7db8] hover:bg-[#6b7db8]/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                      <Phone className="w-4 h-4 mr-2" />
                      Schedule Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </section>
  );
}