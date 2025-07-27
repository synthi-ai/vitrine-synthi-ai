"use client";

import { ArrowRight, Cpu, Brain, Sparkles, Play, Zap, BarChart3, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// AI Statistics data
const AI_STATISTICS = {
  modelsDeployed: 47,
  successRate: 98,
  dataProcessed: 2.3,
};

// AI Brain visualization component
const AIBrainVisualization = () => {
  const brainRef = useRef(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 100);

    return () => clearInterval(rotationInterval);
  }, []);

  return (
    <div className="relative w-[200px] h-[200px]">
      <svg 
        ref={brainRef} 
        className="absolute inset-0 w-full h-full transition-transform duration-100"
        style={{ transform: `rotate(${rotationAngle}deg)` }}
        viewBox="0 0 200 200"
      >
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6b7db8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8a9fd9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6b7db8" stopOpacity="0.4" />
          </linearGradient>
          <filter id="aiGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background neural network */}
        <g opacity="0.3">
          {[...Array(8)].map((_, i) => (
            <path
              key={i}
              d={`M${20 + i * 20},${50 + Math.sin(i) * 30} Q${100},${100} ${180 - i * 15},${150 + Math.cos(i) * 20}`}
              fill="none"
              stroke="url(#brainGradient)"
              strokeWidth="1"
              filter="url(#aiGlow)"
              className="animate-pulse"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </g>

        {/* Neural nodes */}
        {[...Array(6)].map((_, i) => (
          <g key={i}>
            <circle
              cx={50 + i * 25}
              cy={100 + Math.sin(i) * 40}
              r="4"
              fill="#6b7db8"
              filter="url(#aiGlow)"
            />
            <circle
              cx={50 + i * 25}
              cy={100 + Math.sin(i) * 40}
              r="4"
              fill="none"
              stroke="#6b7db8"
              strokeWidth="1"
              opacity="0.5"
              className="animate-ping"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          </g>
        ))}

        {/* Central AI brain */}
        <circle
          cx="100"
          cy="100"
          r="25"
          fill="url(#brainGradient)"
          filter="url(#aiGlow)"
          className="animate-pulse"
        />
        
        <foreignObject x="88" y="88" width="24" height="24">
          <Brain className="w-6 h-6 text-white" />
        </foreignObject>
      </svg>

      {/* Floating AI indicators */}
      <div className="absolute -top-2 -right-2">
        <span className="inline-flex items-center bg-blue-400/20 text-blue-400 border border-blue-400/30 px-2 py-1 text-xs rounded-full animate-bounce">
          <Cpu className="w-3 h-3 mr-1" />
          AI
        </span>
      </div>
    </div>
  );
};

// Floating tech cards component
const FloatingTechCards = () => {
  const [positions, setPositions] = useState([
    { y: 0, rotateY: 0, rotateX: 0 },
    { y: 0, rotateY: 0, rotateX: 0 },
    { y: 0, rotateY: 0, rotateX: 0 }
  ]);

  useEffect(() => {
    const animateCards = () => {
      const time = Date.now() * 0.001;
      setPositions([
        {
          y: Math.sin(time) * 20,
          rotateY: Math.sin(time * 0.5) * 15,
          rotateX: Math.cos(time * 0.3) * 5
        },
        {
          y: Math.sin(time + 0.8) * 20,
          rotateY: Math.sin(time * 0.5 + 0.8) * 15,
          rotateX: Math.cos(time * 0.3 + 0.8) * 5
        },
        {
          y: Math.sin(time + 1.6) * 20,
          rotateY: Math.sin(time * 0.5 + 1.6) * 15,
          rotateX: Math.cos(time * 0.3 + 1.6) * 5
        }
      ]);
    };

    const interval = setInterval(animateCards, 50);
    return () => clearInterval(interval);
  }, []);

  const Card = ({ children, className = "", style = {} }) => (
    <div className={`rounded-lg ${className}`} style={style}>
      {children}
    </div>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={className}>
      {children}
    </div>
  );

  return (
    <>
      {/* AI Models Card */}
      <Card 
        className="absolute w-48 h-32 top-8 right-16 bg-gradient-to-br from-blue-400/20 to-purple-500/10 border border-blue-400/30 backdrop-blur-sm shadow-xl transition-transform duration-75"
        style={{
          transform: `translateY(${positions[0].y}px) rotateY(${positions[0].rotateY}deg) rotateX(${positions[0].rotateX}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <CardContent className="p-4 flex flex-col justify-between h-full">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-blue-400" />
            <span className="text-white text-sm font-medium">AI Models</span>
          </div>
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              47+
            </div>
            <div className="text-xs text-gray-400">Deployed Models</div>
          </div>
        </CardContent>
      </Card>

      {/* Success Rate Card */}
      <Card 
        className="absolute w-44 h-28 bottom-24 right-8 bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border border-emerald-500/30 backdrop-blur-sm shadow-xl transition-transform duration-75"
        style={{
          transform: `translateY(${positions[1].y}px) rotateY(${positions[1].rotateY}deg) rotateX(${positions[1].rotateX}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <CardContent className="p-4 flex flex-col justify-between h-full">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span className="text-white text-sm font-medium">Success</span>
          </div>
          <div>
            <div className="text-xl font-bold text-emerald-400">98%</div>
            <div className="text-xs text-gray-400">Accuracy Rate</div>
          </div>
        </CardContent>
      </Card>

      {/* Data Processing Card */}
      <Card 
        className="absolute w-40 h-24 top-32 left-12 bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/30 backdrop-blur-sm shadow-xl transition-transform duration-75"
        style={{
          transform: `translateY(${positions[2].y}px) rotateY(${positions[2].rotateY}deg) rotateX(${positions[2].rotateX}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <CardContent className="p-3 flex flex-col justify-between h-full">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-white text-xs font-medium">Processing</span>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-400">2.3TB</div>
            <div className="text-xs text-gray-400">Daily Data</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default function HeroSection() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    models: 0,
    success: 0,
    data: 0
  });
  const [backgroundPosition, setBackgroundPosition] = useState(0);

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

  // Animation du background
  useEffect(() => {
    const backgroundInterval = setInterval(() => {
      setBackgroundPosition(prev => (prev + 1) % 200);
    }, 150);

    return () => clearInterval(backgroundInterval);
  }, []);

  // Animation des statistiques
  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 secondes
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const statsInterval = setInterval(() => {
        const progress = currentStep / steps;
        const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Easing function

        setAnimatedStats({
          models: Math.round(easeOutProgress * AI_STATISTICS.modelsDeployed),
          success: Math.round(easeOutProgress * AI_STATISTICS.successRate),
          data: parseFloat((easeOutProgress * AI_STATISTICS.dataProcessed).toFixed(1))
        });

        currentStep++;
        if (currentStep > steps) {
          clearInterval(statsInterval);
        }
      }, stepDuration);

      return () => clearInterval(statsInterval);
    }
  }, [isInView]);

  const Card = ({ children, className = "", style = {} }) => (
    <div className={`rounded-lg ${className}`} style={style}>
      {children}
    </div>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={className}>
      {children}
    </div>
  );

  const Button = ({ children, className = "", variant = "default", ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantClasses = variant === "outline" 
      ? "border bg-transparent hover:bg-opacity-10" 
      : "text-white shadow-lg hover:shadow-xl";
    
    return (
      <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
        {children}
      </button>
    );
  };

  const Badge = ({ children, className = "" }) => (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${className}`}>
      {children}
    </span>
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden py-20 lg:py-32"
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(107, 125, 184, 0.3) 0%, transparent 50%), 
            radial-gradient(circle at 80% 70%, rgba(138, 159, 217, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(107, 125, 184, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: "200% 200%",
          backgroundPosition: `${backgroundPosition}% ${backgroundPosition}%`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + Math.sin(i) * 40}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row items-center justify-between min-h-[70vh] gap-16">
          
          {/* Left Section - Hero Content */}
          <div className={`flex-1 max-w-3xl text-center xl:text-left transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className={`mb-8 transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <Badge className="px-6 py-3 bg-blue-400/10 border border-blue-400/20 text-blue-400 uppercase text-sm font-semibold tracking-widest rounded-full backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                AI-Driven Innovation
              </Badge>
            </div>

            <h1 className={`text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 transition-all duration-1000 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                for a Sustainable
              </span>
              <br />
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Future
              </span>
            </h1>

            <p className={`text-lg lg:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto xl:mx-0 transition-all duration-1000 delay-300 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              Synthi AI is a leading technology company specializing in advanced solutions 
              in artificial intelligence, custom software development, and robotics. 
              We harness the power of AI to transform businesses and drive innovation across Africa.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center xl:justify-start transition-all duration-800 delay-400 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <Button className="bg-gradient-to-r from-blue-400 to-blue-300 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-400/30 transition-all duration-300 group">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button 
                variant="outline"
                className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 group backdrop-blur-sm"
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span>Watch Demo</span>
              </Button>
            </div>

            {/* Key Features */}
            <div className={`mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto xl:mx-0 transition-all duration-1000 delay-500 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              {[
                { icon: <Brain className="w-6 h-6" />, label: "AI Research", value: "47+ Models" },
                { icon: <Shield className="w-6 h-6" />, label: "Secure & Ethical", value: "100% Compliant" },
                { icon: <Zap className="w-6 h-6" />, label: "Fast Deployment", value: "24/7 Support" }
              ].map((feature, index) => (
                <div key={index} className="text-center xl:text-left group">
                  <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mx-auto xl:mx-0 mb-3 group-hover:bg-blue-400/30 transition-colors duration-300">
                    <div className="text-blue-400">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="text-white font-semibold text-sm">{feature.label}</div>
                  <div className="text-gray-400 text-xs">{feature.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - AI Visualization & Stats */}
          <div className={`flex-1 max-w-lg relative transition-all duration-1000 delay-600 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="relative h-[600px] w-full">
              
              {/* Floating Tech Cards */}
              <FloatingTechCards />

              {/* Main AI Statistics Card */}
              <Card 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-blue-400/30 backdrop-blur-sm shadow-2xl shadow-blue-400/20 hover:shadow-blue-400/30 transition-all duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
              >
                <CardContent className="p-8 h-full flex flex-col justify-between relative">
                  
                  {/* Card Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-white font-bold text-lg mb-2">AI Performance</h3>
                    <p className="text-gray-400 text-sm">Real-time Analytics</p>
                  </div>

                  {/* AI Brain Visualization */}
                  <div className="flex justify-center mb-6">
                    <AIBrainVisualization />
                  </div>

                  {/* Statistics Grid */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        {animatedStats.models}
                      </div>
                      <div className="text-xs text-gray-400">Models</div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto animate-pulse"></div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        {animatedStats.success}%
                      </div>
                      <div className="text-xs text-gray-400">Success %</div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mx-auto animate-pulse"></div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                        {animatedStats.data}
                      </div>
                      <div className="text-xs text-gray-400">TB Data</div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full mx-auto animate-pulse"></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    className="w-full mt-6 border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/50 transition-all duration-300 py-3"
                  >
                    View Analytics
                  </Button>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-500/5 rounded-lg pointer-events-none" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}