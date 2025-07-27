"use client";

import { Calendar, Clock, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";


import React from "react";
import { CardContent } from "./ui/card";


export default function BlogSection() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [animatedSpheres, setAnimatedSpheres] = useState([
    { x: 0, y: 0, scale: 1 },
    { x: 0, y: 0, scale: 1 },
    { x: 0, y: 0, scale: 1 }
  ]);

  // Blog post data for mapping
  const blogPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&auto=format",
      categories: ["AI", "Robotics"],
      title: "Unlocking the potential of AI: Robotics applied to African market.",
      date: "February 17, 2025",
      readTime: "3 min read",
      excerpt: "Discover how AI and robotics are transforming African markets with innovative solutions."
    },
    {
      id: 2,
      image: null,
      categories: ["AI", "Testimonies"],
      title: "Case studies from companies that have adopted our solutions.",
      date: "February 15, 2025",
      readTime: "4 min read",
      specialBackground: true,
      excerpt: "Real success stories from businesses leveraging our AI-powered solutions."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format",
      categories: ["Tech trends"],
      title: "Interviews and analyses on AI and innovation trends.",
      date: "February 12, 2025",
      readTime: "4 min read",
      gradientBackground: true,
      excerpt: "Expert insights on the latest trends shaping the future of artificial intelligence."
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

  // Animation des sphères flottantes
  useEffect(() => {
    const animateSpheres = () => {
      const time = Date.now() * 0.001;
      setAnimatedSpheres([
        {
          x: Math.sin(time) * 20,
          y: Math.cos(time * 0.8) * 15,
          scale: 1 + Math.sin(time * 1.2) * 0.2
        },
        {
          x: Math.sin(time + 0.75) * 25,
          y: Math.cos(time * 0.6 + 0.75) * 20,
          scale: 1 + Math.sin(time * 1.5 + 0.75) * 0.3
        },
        {
          x: Math.sin(time + 1.5) * 15,
          y: Math.cos(time * 1.1 + 1.5) * 10,
          scale: 1 + Math.sin(time * 0.9 + 1.5) * 0.25
        }
      ]);
    };

    const interval = setInterval(animateSpheres, 50);
    return () => clearInterval(interval);
  }, []);

  // Composants UI natifs avec le thème Synthi AI
  type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Card: React.FC<CardProps> = ({ children, className, style }) => (
  <div className={className} style={style}>
    {children}
  </div>
);

  const Badge = ({ children, className = "" }) => (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${className}`}>
      {children}
    </span>
  );

  const Separator = ({ className = "" }) => (
    <hr className={`border-0 h-px ${className}`} />
  );

  const Button = ({ children, className = "", variant = "default", size = "default", ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const sizeClasses = size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm";
    const variantClasses = variant === "outline"
      ? "border-2 border-[#6b7db8]/30 text-[#6b7db8] hover:bg-[#6b7db8]/10 hover:border-[#6b7db8]/50 backdrop-blur-sm"
      : "bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] hover:from-[#5a6ba3] hover:to-[#7a8fc9] text-white shadow-lg hover:shadow-xl hover:shadow-[#6b7db8]/30";

    return (
      <button className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
        {children}
      </button>
    );
  };

  const renderSpecialBackground = () => (
    <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-gradient-to-b from-[#6b7db8] to-[#8a9fd9]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Animated spheres */}
        <div className="relative w-32 h-32">
          {animatedSpheres.map((sphere, index) => (
            <div
              key={index}
              className={`absolute rounded-full blur-sm transition-all duration-75 ${index === 0 ? 'w-16 h-16 bg-gradient-to-r from-[#b3c0de] to-[#ebf1ff] opacity-80' :
                  index === 1 ? 'w-20 h-20 bg-gradient-to-r from-[#8a9fd9] to-[#b3c0de] opacity-70' :
                    'w-12 h-12 bg-gradient-to-r from-[#ebf1ff] to-white opacity-90'
                }`}
              style={{
                transform: `translate(${sphere.x}px, ${sphere.y}px) scale(${sphere.scale})`,
                ...(index === 0 && { top: '0', left: '0' }),
                ...(index === 1 && { top: '16px', right: '0' }),
                ...(index === 2 && { bottom: '0', left: '50%', marginLeft: '-24px' })
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]"></div>
    </div>
  );



const renderGradientBackground = (imageSrc: string) => (
  <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-[#6b7db8] via-[#8a9fd9] to-[#b3c0de]">
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="relative w-full h-full max-w-[200px]">
        <Image
          src={imageSrc}
          alt="Blog featured image"
          fill
          className="object-contain drop-shadow-lg"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-[#6b7db8]/20 to-transparent"></div>
  </div>
);

  return (
    <section ref={sectionRef} className="w-full py-20 lg:py-32 bg-black">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-2 h-2 bg-[#6b7db8] rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-[#6b7db8]/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-1 h-1 bg-[#6b7db8]/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header Section */}
        <div className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="inline-block mb-4">
            <span className="inline-block px-6 py-3 bg-[#6b7db8]/10 border border-[#6b7db8]/20 text-[#6b7db8] text-xs font-semibold tracking-widest uppercase rounded-full backdrop-blur-sm">
              Monitoring and Innovation
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent leading-tight">
            Blog & News
          </h2>
          <p className="mt-6 text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest insights, trends, and innovations in artificial intelligence and technology.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className={`group bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-3xl border border-[#6b7db8]/20 shadow-sm hover:shadow-xl hover:shadow-[#6b7db8]/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden backdrop-blur-sm ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-0">

                {/* Card Image/Background */}
                <div className="relative overflow-hidden">
                  {post.specialBackground ? (
                    renderSpecialBackground()
                  ) : post.gradientBackground ? (
                    renderGradientBackground(post.image)
                  ) : (
                    <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-t-3xl">
                      <Image
                        src={post.image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&auto=format"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, 33vw"
                        priority={index === 0} // Optionally prioritize the first image
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#6b7db8]/10 via-transparent to-purple-500/5"></div>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 lg:p-8">

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((category, catIndex) => (
                      <Badge
                        key={catIndex}
                        className="px-3 py-1 bg-[#6b7db8]/20 hover:bg-[#6b7db8]/30 text-[#6b7db8] border border-[#6b7db8]/30 text-xs font-medium tracking-wide rounded-full transition-all duration-300 hover:scale-105"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent leading-tight mb-3 transition-all duration-300 group-hover:from-white group-hover:to-[#ebf1ff]">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#6b6b6b] text-sm leading-relaxed mb-6 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                    {post.excerpt}
                  </p>

                  {/* Separator */}
                  <Separator className="mb-6 bg-[#6b7db8]/20" />

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-[#6b6b6b] mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#6b7db8]" />
                        <span className="font-medium">{post.date}</span>
                      </div>
                      <div className="w-1 h-1 bg-[#6b7db8] rounded-full"></div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#6b7db8]" />
                        <span className="font-medium">{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <div className="mt-4 pt-4 border-t border-[#6b7db8]/20">
                    <button className="inline-flex items-center gap-2 text-[#6b7db8] hover:text-[#8a9fd9] font-semibold text-sm transition-all duration-300 group/link hover:translate-x-1">
                      <span>Read More</span>
                      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className={`text-center transition-all duration-1000 delay-600 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <Button
            variant="outline"
            size="lg"
            className="group hover:shadow-lg hover:shadow-[#6b7db8]/20"
          >
            <span>View All Articles</span>
            <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}