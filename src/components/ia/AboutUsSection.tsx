"use client";

import { 
    MoreHorizontal, 
    Brain, 
    Zap, 
    Globe, 
    Target, 
    Activity, 
    TrendingUp,
    Users,
    Cpu,
    Network,
    Shield,
    Sparkles,
    Binary,
    Database
} from "lucide-react";
import { JSX, useEffect, useRef, useState } from "react";

type FloatingElement = {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    type: 'neural' | 'particle' | 'data' | 'signal';
    angle: number;
    frequency: number;
};

type HologramData = {
    id: number;
    label: string;
    value: number;
    icon: JSX.Element;
    color: string;
    progress: number;
};

export default function AboutUsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const holoRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [activeHolo, setActiveHolo] = useState<number | null>(null);
    const [neuralAnimation, setNeuralAnimation] = useState(0);
    const [scanAngle, setScanAngle] = useState(0);
    const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Données holographiques futuristes
    const hologramData: HologramData[] = [
        {
            id: 1,
            label: "AI Models Deployed",
            value: 47,
            icon: <Brain className="w-6 h-6" />,
            color: "#6b7db8",
            progress: 85
        },
        {
            id: 2,
            label: "Solutions Active",
            value: 12,
            icon: <Zap className="w-6 h-6" />,
            color: "#8a9fd9",
            progress: 92
        },
        {
            id: 3,
            label: "Countries Served",
            value: 8,
            icon: <Globe className="w-6 h-6" />,
            color: "#b3c0de",
            progress: 78
        },
        {
            id: 4,
            label: "Success Rate",
            value: 98.5,
            icon: <Target className="w-6 h-6" />,
            color: "#6b7db8",
            progress: 98
        }
    ];

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100
                });
            }
        };

        if (sectionRef.current) {
            sectionRef.current.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (sectionRef.current) {
                sectionRef.current.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    // Intersection Observer
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

    // Advanced animations
    useEffect(() => {
        const generateFloatingElements = (): void => {
            const elements: FloatingElement[] = [];
            for (let i = 0; i < 30; i++) {
                elements.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 8 + 2,
                    speed: Math.random() * 2 + 0.3,
                    opacity: Math.random() * 0.6 + 0.1,
                    angle: Math.random() * Math.PI * 2,
                    frequency: Math.random() * 2 + 0.5,
                    type: Math.random() > 0.7 ? (Math.random() > 0.6 ? 'neural' : Math.random() > 0.5 ? 'data' : 'signal') : 'particle'
                });
            }
            setFloatingElements(elements);
        };

        generateFloatingElements();

        const animateElements = (): void => {
            const time = Date.now() * 0.001;
            setNeuralAnimation(time);
            setScanAngle((prev) => (prev + 0.8) % 360);

            setFloatingElements(prev =>
                prev.map(el => ({
                    ...el,
                    y: (el.y + el.speed * 0.02) % 100,
                    x: el.x + Math.sin(time * el.frequency + el.id + el.angle) * 0.02,
                    angle: el.angle + 0.008,
                    opacity: el.type === 'neural'
                        ? 0.2 + Math.sin(time * 2 + el.id) * 0.3 + 0.3
                        : el.type === 'data'
                        ? 0.15 + Math.sin(time * 3 + el.id * 0.7) * 0.4 + 0.4
                        : el.type === 'signal'
                        ? 0.1 + Math.sin(time * 4 + el.id * 1.2) * 0.5 + 0.4
                        : el.opacity
                }))
            );
        };

        const interval = setInterval(animateElements, 40);
        return () => clearInterval(interval);
    }, []);

    // Holographic interface renderer
    const renderHolographicInterface = (): JSX.Element => {
        return (
            <div className="relative w-full h-full">
                {/* Main holographic container */}
                <div className="relative w-full max-w-md mx-auto aspect-square">
                    {/* Central holographic core */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-[#6b7db8]/20 to-[#8a9fd9]/10 rounded-full border border-[#6b7db8]/40 flex items-center justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#6b7db8]/30 to-[#8a9fd9]/20 rounded-full border border-[#6b7db8]/60 flex items-center justify-center animate-pulse">
                            <Brain className="w-10 h-10 text-[#6b7db8]" />
                        </div>
                        
                        {/* Orbital rings */}
                        <div className="absolute inset-0 rounded-full border border-[#6b7db8]/20 animate-spin-slow"></div>
                        <div className="absolute inset-4 rounded-full border border-[#8a9fd9]/15 animate-spin-reverse"></div>
                    </div>

                    {/* Holographic data points */}
                    {hologramData.map((data, index) => {
                        const angle = (index * 90) - 45;
                        const radius = 120;
                        const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
                        const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
                        const isActive = activeHolo === data.id;

                        return (
                            <div
                                key={data.id}
                                className={`absolute w-20 h-20 transition-all duration-500 cursor-pointer ${
                                    isActive ? 'scale-110' : 'hover:scale-105'
                                }`}
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                                }}
                                onMouseEnter={() => setActiveHolo(data.id)}
                                onMouseLeave={() => setActiveHolo(null)}
                            >
                                {/* Data node */}
                                <div className={`relative w-full h-full rounded-xl bg-gradient-to-br from-gray-900/90 to-gray-800/80 border-2 backdrop-blur-sm transition-all duration-300 ${
                                    isActive ? `border-[${data.color}]/60 shadow-lg` : 'border-[#6b7db8]/30'
                                }`} style={{
                                    boxShadow: isActive ? `0 0 20px ${data.color}40` : ''
                                }}>
                                    {/* Icon */}
                                    <div className={`absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-lg bg-gradient-to-br from-[#6b7db8]/30 to-[#8a9fd9]/20 flex items-center justify-center transition-colors duration-300`}>
                                        <div className="text-white text-sm">
                                            {data.icon}
                                        </div>
                                    </div>

                                    {/* Value */}
                                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                                        <div className={`text-lg font-black bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent transition-transform duration-300 ${
                                            isActive ? 'scale-110' : ''
                                        }`}>
                                            {data.value}{data.label.includes('Rate') ? '%' : ''}
                                        </div>
                                    </div>

                                    {/* Progress ring */}
                                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
                                        <circle
                                            cx="40"
                                            cy="40"
                                            r="35"
                                            stroke="#374151"
                                            strokeWidth="2"
                                            fill="none"
                                            opacity="0.3"
                                        />
                                        <circle
                                            cx="40"
                                            cy="40"
                                            r="35"
                                            stroke={data.color}
                                            strokeWidth="2"
                                            fill="none"
                                            strokeDasharray={`${data.progress * 2.2} 220`}
                                            strokeDashoffset="0"
                                            transform="rotate(-90 40 40)"
                                            className="transition-all duration-1000"
                                            style={{
                                                filter: isActive ? `drop-shadow(0 0 5px ${data.color})` : 'none'
                                            }}
                                        />
                                    </svg>

                                    {/* Connection line to center */}
                                    {isActive && (
                                        <svg className="absolute top-1/2 left-1/2 w-32 h-32 pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}>
                                            <line 
                                                x1="16" 
                                                y1="16" 
                                                x2={16 - x/4} 
                                                y2={16 - y/4} 
                                                stroke={data.color} 
                                                strokeWidth="1" 
                                                strokeDasharray="2,2" 
                                                opacity="0.6"
                                            >
                                                <animate attributeName="stroke-dashoffset" values="0;-4" dur="1s" repeatCount="indefinite"/>
                                            </line>
                                        </svg>
                                    )}
                                </div>

                                {/* Floating label */}
                                {isActive && (
                                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-[#6b7db8]/30">
                                        <span className="text-xs text-[#6b7db8] font-semibold">{data.label}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Scanning beam effect */}
                    <div className="absolute inset-0">
                        <svg className="w-full h-full" viewBox="0 0 200 200">
                            <defs>
                                <linearGradient id="scanBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#6b7db8" stopOpacity="0"/>
                                    <stop offset="70%" stopColor="#6b7db8" stopOpacity="0.3"/>
                                    <stop offset="100%" stopColor="#8a9fd9" stopOpacity="0.6"/>
                                </linearGradient>
                            </defs>
                            <path
                                d="M100,100 L100,50 A50,50 0 0,1 135.4,64.6 Z"
                                fill="url(#scanBeam)"
                                style={{ 
                                    transform: `rotate(${scanAngle}deg)`,
                                    transformOrigin: '100px 100px'
                                }}
                            />
                        </svg>
                    </div>
                </div>

                {/* Holographic info panel */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-[#6b7db8]/40 min-w-48">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-4 h-4 text-[#6b7db8] animate-pulse" />
                        <span className="text-[#6b7db8] font-bold text-sm">SYNTHI AI CORE</span>
                    </div>
                    <div className="text-xs text-gray-400 space-y-0.5">
                        <div>Status: <span className="text-green-400">OPERATIONAL</span></div>
                        <div>Neural Networks: <span className="text-[#8a9fd9]">ACTIVE</span></div>
                        <div>Performance: <span className="text-[#b3c0de]">OPTIMAL</span></div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section
            ref={sectionRef}
            className="relative flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16 px-4 lg:px-8 py-16 lg:py-24 max-w-7xl mx-auto bg-black overflow-hidden"
        >
            {/* Enhanced futuristic background */}
            <div className="absolute inset-0">
                {/* Mouse-following holographic field */}
                <div 
                    className="absolute w-96 h-96 bg-gradient-radial from-[#6b7db8]/08 via-[#6b7db8]/04 to-transparent rounded-full blur-2xl transition-all duration-700 ease-out"
                    style={{
                        left: `${mousePosition.x}%`,
                        top: `${mousePosition.y}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                />

                {/* Enhanced floating elements */}
                {floatingElements.map(el => (
                    <div
                        key={el.id}
                        className={`absolute transition-all duration-200 ${
                            el.type === 'neural'
                                ? 'bg-gradient-to-br from-[#6b7db8]/60 to-[#8a9fd9]/40 rounded-full'
                                : el.type === 'data'
                                ? 'bg-gradient-to-tr from-[#8a9fd9]/50 to-[#b3c0de]/30 rounded-lg rotate-45'
                                : el.type === 'signal'
                                ? 'bg-gradient-to-br from-[#b3c0de]/40 to-[#ebf1ff]/20 rounded-sm rotate-12'
                                : 'bg-[#6b7db8]/20 rounded-full'
                        }`}
                        style={{
                            left: `${el.x}%`,
                            top: `${el.y}%`,
                            width: `${el.size}px`,
                            height: `${el.size}px`,
                            opacity: el.opacity,
                            filter: `blur(${el.type === 'neural' ? '1.5px' : el.type === 'data' ? '1px' : el.type === 'signal' ? '0.5px' : '0.8px'})`,
                            transform: el.type === 'neural'
                                ? `scale(${1 + Math.sin(neuralAnimation * 2 + el.id) * 0.4}) rotate(${el.angle * 180 / Math.PI}deg)`
                                : el.type === 'data'
                                ? `rotate(${el.angle * 180 / Math.PI + 45}deg) scale(${1 + Math.sin(neuralAnimation * 3 + el.id) * 0.3})`
                                : el.type === 'signal'
                                ? `rotate(${el.angle * 180 / Math.PI + 12}deg) scaleX(${1 + Math.sin(neuralAnimation * 4 + el.id) * 0.2})`
                                : `scale(${1 + Math.sin(neuralAnimation + el.id) * 0.1})`
                        }}
                    />
                ))}
            </div>

            {/* Holographic grid background */}
            <div className="absolute inset-0 opacity-3">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                        <pattern id="futuristicGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" stroke="#6b7db8" strokeWidth="0.1" fill="none"/>
                            <circle cx="5" cy="5" r="0.3" fill="#8a9fd9" opacity="0.4"/>
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#futuristicGrid)" />
                </svg>
            </div>

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-32 h-32 border border-[#6b7db8]/15 rounded-full animate-ping-slow"></div>
                <div className="absolute bottom-32 left-32 w-24 h-24 border-2 border-[#8a9fd9]/10 rotate-45 animate-pulse"></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-[#6b7db8]/08 to-transparent rounded-full animate-bounce-slow"></div>
            </div>

            {/* Content Section */}
            <div ref={contentRef} className={`flex flex-col w-full lg:w-1/2 items-start gap-8 relative z-10 transition-all duration-1500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}>
                {/* Enhanced badge */}
                <div className="inline-block relative">
                    <span className="px-8 py-4 bg-gradient-to-r from-[#6b7db8]/20 to-[#8a9fd9]/15 border-2 border-[#6b7db8]/40 text-[#6b7db8] uppercase text-sm font-black tracking-[0.2em] rounded-2xl backdrop-blur-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6b7db8]/30 to-transparent animate-shimmer"></div>
                        <Sparkles className="w-5 h-5 mr-3 animate-pulse inline" />
                        About Us
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#6b7db8] rounded-full animate-ping"></div>
                    </span>
                </div>

                {/* Enhanced title */}
                <h2 className={`bg-gradient-to-r from-[#ebf1ff] via-[#b3c0de] to-[#ebf1ff] bg-clip-text text-transparent font-black text-4xl lg:text-6xl tracking-tight leading-[1.1] mb-6 animate-gradient-x bg-400% transition-all duration-1200 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: '0.3s' }}>
                    Artificial Intelligence for a Sustainable Future
                </h2>

                {/* Enhanced text content */}
                <div className="w-full space-y-6 text-left">
                    <p className={`font-light text-[#6b6b6b] text-lg leading-relaxed max-w-2xl transition-all duration-1000 ${
                        isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`} style={{ transitionDelay: '0.5s' }}>
                        At <span className="text-[#6b7db8] font-semibold">Synthi AI</span>, we develop advanced solutions in artificial
                        intelligence (AI), robotics, and computer vision to accelerate
                        innovation and address the strategic challenges of businesses and
                        institutions.
                    </p>

                    <p className={`font-light text-[#6b6b6b] text-lg leading-relaxed max-w-2xl transition-all duration-1000 ${
                        isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`} style={{ transitionDelay: '0.7s' }}>
                        Our ambition is clear: to make <span className="text-[#8a9fd9] font-semibold">Africa a global leader in AI</span> by
                        creating ethical, high-performance, and accessible technologies
                        capable of transforming key sectors such as health, agriculture,
                        finance and climate.
                    </p>

                    <p className={`font-light text-[#6b6b6b] text-lg leading-relaxed max-w-2xl transition-all duration-1000 ${
                        isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`} style={{ transitionDelay: '0.9s' }}>
                        We believe that AI is not just a technology, but a <span className="text-[#b3c0de] font-semibold">powerful lever
                        for development</span> and economic transformation. That&apos;s why we
                        collaborate with researchers, startups, businesses, and governments
                        to build a strong technological ecosystem.
                    </p>
                </div>

                {/* Enhanced features grid */}
                <div className={`grid grid-cols-2 gap-4 mt-8 transition-all duration-1200 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: '1.1s' }}>
                    {[
                        { icon: <Network className="w-5 h-5" />, label: "Advanced AI", color: "#6b7db8" },
                        { icon: <Shield className="w-5 h-5" />, label: "Secure Systems", color: "#8a9fd9" },
                        { icon: <Database className="w-5 h-5" />, label: "Big Data", color: "#b3c0de" },
                        { icon: <Binary className="w-5 h-5" />, label: "Machine Learning", color: "#6b7db8" }
                    ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-xl border border-[#6b7db8]/20 hover:border-[#6b7db8]/40 transition-all duration-300 backdrop-blur-sm">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6b7db8]/30 to-[#8a9fd9]/20 flex items-center justify-center" style={{ color: feature.color }}>
                                {feature.icon}
                            </div>
                            <span className="text-white text-sm font-semibold">{feature.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Holographic Statistics Section */}
            <div ref={holoRef} className={`relative w-full lg:w-1/2 h-[500px] mt-8 lg:mt-0 transition-all duration-1500 ${
                isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`} style={{ transitionDelay: '0.6s' }}>
                {renderHolographicInterface()}
            </div>

            {/* Enhanced CSS animations */}
            <style jsx>{`
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                
                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 1; }
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
                
                .animate-gradient-x {
                    animation: gradient-x 10s ease infinite;
                }
                
                .animate-shimmer {
                    animation: shimmer 2.5s linear infinite;
                }
                
                .animate-spin-slow {
                    animation: spin-slow 25s linear infinite;
                }
                
                .animate-spin-reverse {
                    animation: spin-reverse 20s linear infinite;
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
                
                .animate-ping-slow {
                    animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                
                .bg-400% {
                    background-size: 400% 400%;
                }
                
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
            `}</style>
        </section>
    );
}