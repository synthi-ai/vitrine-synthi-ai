'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Check, 
  ArrowRight, 
  Microscope, 
  Building2, 
  GraduationCap,
  Sparkles,
  Target,
  Users,
  ChevronRight,
  Star,
  Zap,
  BrainCircuit,
  MessageCircle,
  Brain,
  Lightbulb,
  TrendingUp,
  Shield,
  BarChart3,
  Database,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const pricingPlans = [
  {
    id: 'labs',
    name: 'Synthi AI Labs',
    tagline: 'Research & Development',
    description: 'We design advanced algorithms in AI, NLP, and computer vision, applied to the challenges of Africa and the world.',
    icon: <Microscope className="w-8 h-8" />,
    color: {
      primary: '#6b7db8',
      secondary: '#8a9fd9',
      bg: 'from-[#6b7db8]/10 to-purple-500/5',
      border: 'border-[#6b7db8]/20',
      hoverBorder: 'hover:border-[#6b7db8]/40'
    },
    popular: false,
    features: [
      'Collaborative research projects with renowned universities and institutes',
      'Academic publications and access to datasets and resources',
      'Development of AI models for health, environment, and finance',
      'Priority access to cutting-edge research findings',
      'Custom algorithm development for specific use cases'
    ],
    benefits: [
      { icon: <Star className="w-4 h-4" />, text: 'World-class research team' },
      { icon: <Target className="w-4 h-4" />, text: 'Africa-focused solutions' },
      { icon: <Sparkles className="w-4 h-4" />, text: 'Innovative methodologies' }
    ],
    cta: 'Start Research',
    link: '/contact?plan=labs'
  },
  {
    id: 'solutions',
    name: 'Synthi AI Solutions',
    tagline: 'AI for Businesses & Institutions',
    description: 'We develop tailored AI solutions, adapted to the challenges of industries and governments.',
    icon: <Building2 className="w-8 h-8" />,
    color: {
      primary: '#6b7db8',
      secondary: '#8a9fd9',
      bg: 'from-[#6b7db8]/15 to-blue-500/10',
      border: 'border-[#6b7db8]/30',
      hoverBorder: 'hover:border-[#6b7db8]/60'
    },
    popular: true,
    features: [
      'Health: AI for medical diagnosis, teleconsultation and smart hospital management',
      'Agriculture: Yield prediction, smart irrigation and agricultural disease detection',
      'Finance: Financial inclusion, fraud detection and bank-risk management',
      'Climate & Environment: Climate modeling and natural resource management',
      'Industry and Logistics: Process automation and supply chain management'
    ],
    benefits: [
      { icon: <Zap className="w-4 h-4" />, text: 'Rapid deployment' },
      { icon: <Users className="w-4 h-4" />, text: 'Industry expertise' },
      { icon: <Target className="w-4 h-4" />, text: 'Scalable solutions' }
    ],
    cta: 'Get Solution',
    link: '/contact?plan=solutions'
  },
  {
    id: 'academy',
    name: 'Synthi AI Academy',
    tagline: 'Training & Education',
    description: 'We train the next generation of AI experts through programs tailored to market needs.',
    icon: <GraduationCap className="w-8 h-8" />,
    color: {
      primary: '#6b7db8',
      secondary: '#8a9fd9',
      bg: 'from-[#6b7db8]/10 to-indigo-500/5',
      border: 'border-[#6b7db8]/20',
      hoverBorder: 'hover:border-[#6b7db8]/40'
    },
    popular: false,
    features: [
      'Training in AI, robotics and computer vision, from beginner to advanced level',
      'Mentoring and certifications to support professionals and students',
      'Educational resources: Courses, tutorials and practical workshops',
      'Industry-recognized certifications and credentials',
      'Career placement assistance and networking opportunities'
    ],
    benefits: [
      { icon: <GraduationCap className="w-4 h-4" />, text: 'Expert instructors' },
      { icon: <Star className="w-4 h-4" />, text: 'Hands-on learning' },
      { icon: <Users className="w-4 h-4" />, text: 'Community support' }
    ],
    cta: 'Start Learning',
    link: '/contact?plan=academy'
  },
  {
    id: 'neuralynx',
    name: 'NeuroLynx Advisor',
    tagline: 'Strategic AI & Data Consulting',
    description: 'Our specialized department providing strategic consulting in AI, data analytics, and digital transformation for enterprises.',
    icon: <BrainCircuit className="w-8 h-8" />,
    color: {
      primary: '#6b7db8',
      secondary: '#8a9fd9',
      bg: 'from-[#6b7db8]/15 to-cyan-500/10',
      border: 'border-[#6b7db8]/30',
      hoverBorder: 'hover:border-[#6b7db8]/50'
    },
    popular: false,
    isNew: true,
    features: [
      'Strategic AI implementation roadmaps and digital transformation planning',
      'Data architecture design and analytics strategy development',
      'AI governance frameworks and ethical AI implementation',
      'Technology stack optimization and vendor selection guidance',
      'Executive training and organizational change management for AI adoption'
    ],
    benefits: [
      { icon: <Brain className="w-4 h-4" />, text: 'Strategic expertise' },
      { icon: <TrendingUp className="w-4 h-4" />, text: 'Business growth' },
      { icon: <Shield className="w-4 h-4" />, text: 'Risk mitigation' }
    ],
    cta: 'Get Consulting',
    link: '/contact?plan=neuralynx'
  }
];

export default function PricingSection() {
  const ref = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef(null);
  const ctaRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
        // Header animation
        gsap.fromTo(headerRef.current, 
          { opacity: 0, y: -50 },
          { 
            opacity: 1, 
            y: 0, 
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

        // Cards stagger animation
        gsap.fromTo(cardsRef.current,
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current[0],
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // CTA animation
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse"
            }
          }
        );

      }, ref);

      return () => ctx.revert();
    }
  }, []);

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
        duration: 0.8,
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
        <div className="absolute top-1/2 left-10 w-1 h-1 bg-[#6b7db8]/40 rounded-full animate-pulse animation-delay-500"></div>
        
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#6b7db8]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <div className="inline-block mb-6">
            <Badge className="px-4 py-2 bg-[#6b7db8]/10 border border-[#6b7db8]/20 text-[#6b7db8] uppercase text-xs font-semibold tracking-widest rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#6b7db8] rounded-full mr-2 animate-pulse"></span>
              Flexible Solutions
            </Badge>
          </div>
          
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent">
              Choose the{' '}
            </span>
            <span className="bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] bg-clip-text text-transparent">
              right fit
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent">
              for your business
            </span>
          </h2>
          
          <p className="text-lg text-[#6b6b6b] max-w-3xl mx-auto leading-relaxed">
            From cutting-edge research to practical business solutions, comprehensive education, and strategic AI consulting - 
            we provide AI services tailored to drive innovation across Africa and beyond.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              className="group relative h-full"
            >
              <Card className={`
                relative h-full overflow-hidden backdrop-blur-sm transition-all duration-500
                ${plan.popular 
                  ? 'bg-gradient-to-b from-gray-900/80 to-gray-900/60 border-[#6b7db8]/50 shadow-lg shadow-[#6b7db8]/10' 
                  : 'bg-gray-900/50 border-[#6b7db8]/20 hover:border-[#6b7db8]/40'
                }
                hover:shadow-2xl hover:shadow-[#6b7db8]/20 hover:bg-gray-900/70
              `}>
                
                {/* Popular/New badge */}
                {(plan.popular || plan.isNew) && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className={`${
                      plan.isNew 
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                        : 'bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9]'
                    } text-white px-4 py-1 font-semibold shadow-lg`}>
                      {plan.isNew ? (
                        <>
                          <Sparkles className="w-3 h-3 mr-1" />
                          New Department
                        </>
                      ) : (
                        <>
                          <Star className="w-3 h-3 mr-1" />
                          Most Popular
                        </>
                      )}
                    </Badge>
                  </div>
                )}

                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.color.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <CardHeader className="relative z-10 p-6 pb-4">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-[#6b7db8]/20 rounded-2xl flex items-center justify-center text-[#6b7db8] group-hover:bg-[#6b7db8]/30 transition-colors duration-300">
                      {plan.icon}
                    </div>
                  </div>

                  {/* Plan details */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#6b7db8] transition-all duration-300">
                      {plan.name}
                    </h3>
                    <p className="text-[#6b7db8] font-semibold text-xs">
                      {plan.tagline}
                    </p>
                    <p className="text-[#6b6b6b] leading-relaxed text-xs group-hover:text-gray-300 transition-colors duration-300">
                      {plan.description}
                    </p>
                  </div>

                  {/* Benefits highlight */}
                  <div className="flex flex-wrap gap-1 mt-4">
                    {plan.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 px-2 py-1 bg-[#6b7db8]/10 rounded-full text-xs text-[#6b7db8] group-hover:bg-[#6b7db8]/20 transition-colors duration-300"
                      >
                        {benefit.icon}
                        <span className="text-xs">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 p-6 pt-0">
                  {/* Features list */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-white font-semibold text-xs mb-3">What&apos;s included:</h4>
                    {plan.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 group/item">
                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#6b7db8]/20 flex items-center justify-center mt-0.5 group-hover/item:bg-[#6b7db8]/30 transition-colors duration-300">
                          <Check className="w-2 h-2 text-[#6b7db8]" />
                        </div>
                        <span className="text-[#6b6b6b] text-xs leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {plan.features.length > 3 && (
                      <p className="text-[#6b7db8] text-xs font-medium">
                        +{plan.features.length - 3} more features
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className={`
                      w-full py-3 rounded-xl font-semibold transition-all duration-300 group/button text-sm
                      ${plan.popular 
                        ? 'bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] hover:from-[#5a6ba3] hover:to-[#7a8fc9] text-white shadow-lg hover:shadow-xl hover:shadow-[#6b7db8]/30' 
                        : plan.isNew
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/30'
                        : 'bg-[#6b7db8]/20 hover:bg-[#6b7db8] text-[#6b7db8] hover:text-white border border-[#6b7db8]/30 hover:border-[#6b7db8]'
                      }
                    `}
                    asChild
                  >
                    <a href={plan.link}>
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform duration-300" />
                    </a>
                  </Button>

                  {/* Additional info */}
                  <p className="text-xs text-[#6b6b6b] text-center mt-3 group-hover:text-gray-400 transition-colors duration-300">
                    {plan.isNew ? 'Expert consulting available' : 'Custom pricing available'}
                  </p>
                </CardContent>

                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6b7db8]/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -m-px"></div>
              </Card>
            </div>
          ))}
        </div>

        {/* NeuraLynx Spotlight Section */}
        <div className="mt-20">
          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-emerald-500/30 shadow-2xl shadow-emerald-500/10 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left side - Content */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                      <BrainCircuit className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1 font-semibold">
                        <Sparkles className="w-3 h-3 mr-1" />
                        New Department
                      </Badge>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                    NeuroLynx Advisor
                  </h3>
                  
                  <p className="text-[#6b6b6b] text-lg leading-relaxed mb-6">
                    Our specialized strategic consulting department combines deep AI expertise with business acumen 
                    to guide enterprises through digital transformation. We provide comprehensive consulting services 
                    in AI implementation, data strategy, and technology optimization.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-emerald-400" />
                      <span className="text-white text-sm">AI Strategy & Implementation Planning</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-emerald-400" />
                      <span className="text-white text-sm">Data Architecture & Analytics Strategy</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-emerald-400" />
                      <span className="text-white text-sm">Technology Stack Optimization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-emerald-400" />
                      <span className="text-white text-sm">Business Intelligence & Decision Support</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300">
                      <BrainCircuit className="w-4 h-4 mr-2" />
                      Schedule Consultation
                    </Button>
                    <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </div>
                
                {/* Right side - Visual */}
                <div className="relative bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8 lg:p-12 flex items-center justify-center">
                  <div className="relative">
                    {/* Central brain circuit icon */}
                    <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50">
                      <BrainCircuit className="w-16 h-16 text-white" />
                    </div>
                    
                    {/* Static surrounding elements */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-400/30 rounded-full"></div>
                    <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-cyan-400/30 rounded-full"></div>
                    <div className="absolute top-8 -right-8 w-4 h-4 bg-emerald-300/40 rounded-full"></div>
                    <div className="absolute -bottom-8 left-8 w-5 h-5 bg-cyan-300/40 rounded-full"></div>
                    
                    {/* Static positioned elements */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                      <Brain className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                      <TrendingUp className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
                      <Database className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
                      <BarChart3 className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA Section
        <div ref={ctaRef} className="text-center mt-16 lg:mt-20">
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-[#6b7db8]/20 rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-[#6b6b6b] text-lg mb-8 max-w-2xl mx-auto">
              Every business is unique. Let&apos;s discuss how we can create a tailored AI solution 
              that perfectly fits your specific requirements and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] hover:from-[#5a6ba3] hover:to-[#7a8fc9] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-[#6b7db8]/30 transition-all duration-300"
                asChild
              >
                <a href="/contact">
                  <Users className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </a>
              </Button>
              <Button 
                variant="outline"
                className="border-[#6b7db8]/30 text-[#6b7db8] hover:bg-[#6b7db8]/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                asChild
              >
                <a href="/case-studies">
                  <Target className="w-4 h-4 mr-2" />
                  View Case Studies
                </a>
              </Button>
            </div>
          </div>
        </div>  */}
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
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}