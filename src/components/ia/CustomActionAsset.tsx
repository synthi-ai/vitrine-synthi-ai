"use client";

import { useRef, useEffect, useState } from 'react';
import { Check, MousePointer, Palette, Sliders, Sparkles } from "lucide-react";

export default function CustomAssetsSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const cursorsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [isInView, setIsInView] = useState(false);
  const [colorPosition, setColorPosition] = useState(70);
  const [opacityPosition, setOpacityPosition] = useState(85);

  // Mission statements data for mapping
  const missions = [
    {
      id: 1,
      text: "Develop advanced AI solutions tailored to economic and social challenges",
      icon: <Sparkles className="w-4 h-4" />,
      delay: 0.1
    },
    {
      id: 2,
      text: "Train the talents of tomorrow and strengthen the African technological ecosystem",
      icon: <Check className="w-4 h-4" />,
      delay: 0.2
    },
    {
      id: 3,
      text: "Facilitate the adoption of AI in businesses, institutions, and strategic industries",
      icon: <Check className="w-4 h-4" />,
      delay: 0.3
    },
    {
      id: 4,
      text: "Ensure responsible and ethical AI for sustainable inclusive development",
      icon: <Check className="w-4 h-4" />,
      delay: 0.4
    },
  ];

  // Intersection Observer pour détecter la visibilité
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animations des sliders
  useEffect(() => {
    const animateSliders = () => {
      const time = Date.now() * 0.001;
      setColorPosition(30 + Math.sin(time * 0.8) * 20 + 20);
      setOpacityPosition(60 + Math.cos(time * 0.6) * 15 + 15);
    };

    const interval = setInterval(animateSliders, 50);
    return () => clearInterval(interval);
  }, []);

  // Animation des curseurs flottants
  useEffect(() => {
    const animateCursors = () => {
      cursorsRef.current.forEach((cursor, index) => {
        if (cursor) {
          const time = Date.now() * 0.001;
          const offsetY = Math.sin(time + index * 0.5) * 15;
          const offsetX = Math.cos(time * 0.8 + index * 0.3) * 10;
          cursor.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
      });
    };

    const interval = setInterval(animateCursors, 50);
    return () => clearInterval(interval);
  }, []);

  const Card = ({ children, className = "" }) => (
    <div className={`rounded-lg ${className}`}>
      {children}
    </div>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={className}>
      {children}
    </div>
  );

  const Badge = ({ children, className = "" }) => (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${className}`}>
      {children}
    </span>
  );

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 right-20 w-2 h-2 bg-blue-400 rounded-full transition-opacity duration-1000"
          style={{ 
            opacity: Math.sin(Date.now() * 0.003) * 0.5 + 0.5,
            animationDelay: '0s'
          }}
        ></div>
        <div 
          className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-blue-300 rounded-full transition-opacity duration-1000"
          style={{ 
            opacity: Math.sin(Date.now() * 0.003 + 1) * 0.3 + 0.3,
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-10 w-1 h-1 bg-blue-200 rounded-full transition-opacity duration-1000"
          style={{ 
            opacity: Math.sin(Date.now() * 0.003 + 0.5) * 0.2 + 0.2,
            animationDelay: '0.5s'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row items-center justify-center gap-16 xl:gap-24">
          
          {/* Interactive Design Preview Card */}
          <div
            ref={cardRef}
            className={`relative w-full max-w-md xl:max-w-lg transition-all duration-1000 ${
              isInView 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-8'
            }`}
            style={{ 
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              transform: isInView ? 'rotateY(0deg) rotateX(0deg)' : 'rotateY(-15deg) rotateX(5deg)'
            }}
          >
            <Card className="relative w-full aspect-[4/3] rounded-2xl backdrop-blur-sm border border-blue-400/20 overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/30 shadow-2xl shadow-blue-400/10">
              <CardContent className="relative w-full h-full p-0">
                
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div 
                    className="absolute inset-0 bg-repeat"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236b7db8' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                  ></div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-purple-500/5 rounded-2xl"></div>

                {/* Collaborative cursors */}
                <div 
                  ref={(el) => { cursorsRef.current[0] = el; }}
                  className="absolute top-12 left-16 z-20"
                >
                  <div className="relative group">
                    <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 font-medium shadow-lg">
                      <MousePointer className="w-3 h-3 mr-1" />
                      Adam
                    </Badge>
                    <div className="absolute top-6 left-12 w-4 h-4 text-blue-600 opacity-80">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 4l11.5 7L9 13.5 7 16l-3-12z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div 
                  ref={(el) => { cursorsRef.current[1] = el; }}
                  className="absolute top-32 right-20 z-20"
                >
                  <div className="relative group">
                    <div className="absolute -top-1 -left-1 w-6 h-6 text-red-500 opacity-60">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                    <Badge className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 font-medium shadow-lg mt-6 ml-3">
                      <MousePointer className="w-3 h-3 mr-1" />
                      Fokam
                    </Badge>
                  </div>
                </div>

                {/* Central AI visualization */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative w-40 h-40">
                    {/* Blur background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-xl"></div>
                    
                    {/* Main AI brain visualization */}
                    <div className="relative w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-400/30">
                      <div className="text-white text-4xl font-bold">AI</div>
                      
                      {/* Animated particles */}
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-white/40 rounded-full"
                          style={{
                            top: `${20 + Math.sin(i * Math.PI / 3) * 30}%`,
                            left: `${50 + Math.cos(i * Math.PI / 3) * 30}%`,
                            opacity: Math.sin(Date.now() * 0.003 + i * 0.5) * 0.3 + 0.4,
                            transform: `scale(${Math.sin(Date.now() * 0.002 + i * 0.3) * 0.5 + 1})`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* "Flex the" design tool */}
                <Card className="absolute bottom-4 left-4 w-48 h-24 rounded-xl backdrop-blur-sm border border-blue-400/30 bg-gray-900/50">
                  <CardContent className="relative p-4">
                    <div className="text-white text-xl font-bold">Flex AI</div>
                    
                    {/* Selection border */}
                    <div className="absolute inset-2 border border-dashed border-purple-400/60 rounded-lg">
                      {/* Corner handles */}
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-purple-400 rounded-sm"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-purple-400 rounded-sm"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-purple-400 rounded-sm"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-purple-400 rounded-sm"></div>
                    </div>
                  </CardContent>
                </Card>

                {/* Color picker tool */}
                <Card className="absolute bottom-4 right-4 w-64 h-24 rounded-xl backdrop-blur-sm border border-blue-400/30 bg-gray-900/50">
                  <CardContent className="p-4 space-y-3">
                    {/* Color spectrum slider */}
                    <div className="relative">
                      <div className="h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-pink-500"></div>
                      <div 
                        className="absolute top-0 w-4 h-4 bg-blue-800 rounded-full border-2 border-white shadow-lg -translate-y-0.5 transition-all duration-300"
                        style={{ left: `${colorPosition}%` }}
                      />
                    </div>
                    
                    {/* Opacity slider */}
                    <div className="relative">
                      <div className="h-3 rounded-full bg-gradient-to-r from-transparent to-blue-800 relative overflow-hidden">
                        <div 
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h4v4H0zM4 4h4v4H4z' fill='%23ffffff'/%3E%3C/svg%3E")`
                          }}
                        ></div>
                      </div>
                      <div 
                        className="absolute top-0 w-4 h-4 bg-white rounded-full border-2 border-gray-300 shadow-lg -translate-y-0.5 transition-all duration-300"
                        style={{ left: `${opacityPosition}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Floating tool icons */}
                <div className="absolute top-8 right-8 flex gap-2">
                  <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Palette className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Sliders className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Missions Content */}
          <div
            ref={contentRef}
            className={`flex flex-col items-start gap-8 max-w-xl w-full transition-all duration-1000 delay-300 ${
              isInView 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Header */}
            <div className="space-y-4">
              <Badge className="px-4 py-2 bg-blue-400/10 border border-blue-400/20 text-blue-400 uppercase text-xs font-semibold tracking-widest rounded-full">
                <Sparkles className="w-3 h-3 mr-2" />
                Synthi AI Commitments
              </Badge>
              
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
                Our Missions
              </h2>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                Driving AI innovation across Africa through research, education, and ethical implementation 
                for sustainable development and technological advancement.
              </p>
            </div>

            {/* Mission points */}
            <div className="space-y-6 w-full">
              {missions.map((mission, index) => (
                <div
                  key={mission.id}
                  className={`flex items-start gap-4 group cursor-pointer transition-all duration-500 hover:translate-x-2 ${
                    isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'
                  }`}
                  style={{ 
                    transitionDelay: `${mission.delay + 0.3}s`
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-400/20 rounded-full flex items-center justify-center group-hover:bg-blue-400/30 transition-all duration-300 group-hover:scale-110">
                    <div className="text-blue-400 group-hover:text-white transition-colors duration-300">
                      {mission.icon}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {mission.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to action */}
            <div 
              className={`mt-4 transition-all duration-600 delay-800 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <button className="inline-flex items-center px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-400/20 transition-all duration-300 group">
                <span>Discover Our Impact</span>
                <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}