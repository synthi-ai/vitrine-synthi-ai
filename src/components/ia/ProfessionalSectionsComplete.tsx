"use client";

import { 
    Badge, 
    Check, 
    Zap, 
    Shield, 
    Network, 
    Target, 
    Globe, 
    Brain, 
    Activity, 
    Binary, 
    Cpu, 
    Database,
    Sparkles,
    ArrowRight,
    Send,
    Users,
    TrendingUp
} from "lucide-react";



export type BulletPoint = {
  readonly text: string;
  readonly icon: JSX.Element;
  readonly metric: string;
  readonly color: string;
};


import { useState, useEffect, useRef, JSX } from "react";

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

type TechCursor = {
    id: string;
    name: string;
    color: string;
    position: { x: number; y: number };
    active: boolean;
};

// Enhanced data with professional elements
const BULLET_POINTS : BulletPoint[] = [
    {
        text: "The AI leader in Africa: Unique expertise in AI applied to the continent's needs.",
        icon: <Globe className="w-5 h-5" />,
        metric: "15 Countries",
        color: "#6b7db8"
    },
    {
        text: "An ethical and responsible approach: Secure and accessible AI solutions.",
        icon: <Shield className="w-5 h-5" />,
        metric: "99.9% Security",
        color: "#8a9fd9"
    },
    {
        text: "A strong network of partners: Collaboration with businesses, startups, universities, and institutions.",
        icon: <Network className="w-5 h-5" />,
        metric: "500+ Partners",
        color: "#b3c0de"
    },
    {
        text: "Concrete impact: Transformation of key sectors and improvement of people's lives.",
        icon: <Target className="w-5 h-5" />,
        metric: "1M+ Lives",
        color: "#6b7db8"
    },
    {
        text: "Cutting-edge technology: Integration of the latest advances in AI, NLP, and computer vision.",
        icon: <Brain className="w-5 h-5" />,
        metric: "98.7% Accuracy",
        color: "#8a9fd9"
    }
] as const;

export default function ProfessionalSectionsComplete() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isCtaInView, setIsCtaInView] = useState(false);
    const [activePoint, setActivePoint] = useState<number | null>(null);
    const [animationTime, setAnimationTime] = useState(0);
    const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
    const [techCursors, setTechCursors] = useState<TechCursor[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Initialize tech cursors
    useEffect(() => {
        setTechCursors([
            {
                id: 'ai',
                name: 'AI Core',
                color: '#6b7db8',
                position: { x: 20, y: 25 },
                active: true
            },
            {
                id: 'vision',
                name: 'Vision',
                color: '#8a9fd9',
                position: { x: 70, y: 40 },
                active: false
            },
            {
                id: 'nlp',
                name: 'NLP',
                color: '#b3c0de',
                position: { x: 50, y: 70 },
                active: false
            }
        ]);
    }, []);

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

    // Intersection Observers
    useEffect(() => {
        const observerOptions = { threshold: 0.1, rootMargin: "-100px" };
        
        const observer1 = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            observerOptions
        );

        const observer2 = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsCtaInView(true);
                }
            },
            observerOptions
        );

        if (sectionRef.current) {
            observer1.observe(sectionRef.current);
        }
        if (ctaRef.current) {
            observer2.observe(ctaRef.current);
        }

        return () => {
            observer1.disconnect();
            observer2.disconnect();
        };
    }, []);

    // Professional animations
    useEffect(() => {
        const generateFloatingElements = (): void => {
            const elements: FloatingElement[] = [];
            for (let i = 0; i < 25; i++) {
                elements.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 8 + 2,
                    speed: Math.random() * 1.5 + 0.3,
                    opacity: Math.random() * 0.4 + 0.1,
                    angle: Math.random() * Math.PI * 2,
                    frequency: Math.random() * 2 + 0.5,
                    type: Math.random() > 0.6 ? 
                        (Math.random() > 0.7 ? 'neural' : 
                         Math.random() > 0.5 ? 'data' : 'signal') : 'particle'
                });
            }
            setFloatingElements(elements);
        };

        generateFloatingElements();

        const animateElements = (): void => {
            const time = Date.now() * 0.0015;
            setAnimationTime(time);

            setFloatingElements(prev =>
                prev.map(el => ({
                    ...el,
                    y: (el.y + el.speed * 0.01) % 100,
                    x: el.x + Math.sin(time * el.frequency + el.id + el.angle) * 0.02,
                    angle: el.angle + 0.008,
                    opacity: el.type === 'neural'
                        ? 0.2 + Math.sin(time * 2 + el.id) * 0.2 + 0.2
                        : el.type === 'data'
                        ? 0.15 + Math.sin(time * 2.5 + el.id * 0.8) * 0.15 + 0.25
                        : el.type === 'signal'
                        ? 0.1 + Math.sin(time * 3 + el.id * 1.1) * 0.2 + 0.2
                        : el.opacity
                }))
            );

            // Animate tech cursors
            setTechCursors(prev => prev.map(cursor => ({
                ...cursor,
                position: {
                    x: cursor.position.x + Math.sin(time * 0.6 + parseInt(cursor.id)) * 0.3,
                    y: cursor.position.y + Math.cos(time * 0.4 + parseInt(cursor.id)) * 0.2
                },
                active: Math.sin(time * 1.5 + parseInt(cursor.id)) > 0.3
            })));
        };

        const interval = setInterval(animateElements, 30);
        return () => clearInterval(interval);
    }, []);

    // Enhanced bullet point component
    const ProfessionalBulletPoint = ({ point, index }: { point: typeof BULLET_POINTS[0], index: number }) => {
        const isActive = activePoint === index;
        
        return (
            <div 
                className={`group relative flex items-start gap-5 w-full p-5 rounded-xl transition-all duration-500 cursor-pointer ${
                    isActive ? 'bg-gradient-to-r from-gray-900/40 to-gray-800/20 border border-[#6b7db8]/30 shadow-lg' : 'hover:bg-gray-900/15'
                }`}
                onMouseEnter={() => setActivePoint(index)}
                onMouseLeave={() => setActivePoint(null)}
            >
                {/* Enhanced icon with professional styling */}
                <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-400 ${
                    isActive ? 'bg-gradient-to-br from-[#6b7db8] to-[#8a9fd9] scale-105 shadow-md' : 'bg-gradient-to-br from-gray-800 to-gray-700'
                }`} style={{ 
                    boxShadow: isActive ? `0 8px 25px ${point.color}30` : 'none'
                }}>
                    <div className="text-white w-full h-full flex items-center justify-center">
                        {point.icon}
                    </div>
                    
                    {/* Subtle glow effect */}
                    {isActive && (
                        <div className="absolute inset-0 rounded-xl border border-current opacity-20 animate-pulse"></div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                        <div className={`text-sm font-bold bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] bg-clip-text text-transparent transition-transform duration-300 ${
                            isActive ? 'scale-105' : ''
                        }`}>
                            {point.metric}
                        </div>
                    </div>
                    
                    <p className={`font-normal text-[#6b6b6b] text-base leading-relaxed transition-colors duration-300 ${
                        isActive ? 'text-gray-300' : 'group-hover:text-gray-400'
                    }`}>
                        {point.text}
                    </p>

                    {/* Professional progress indicator */}
                    <div className="mt-4 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className={`h-full bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] transition-all duration-800 rounded-full`}
                            style={{ 
                                width: isActive ? '100%' : '70%',
                                boxShadow: isActive ? `0 0 8px ${point.color}40` : 'none'
                            }}
                        />
                    </div>
                </div>

                {/* Status indicator */}
                {isActive && (
                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                        <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: point.color }}></div>
                    </div>
                )}
            </div>
        );
    };

    // Professional interface renderer
    const renderProfessionalInterface = (): JSX.Element => {
        return (
            <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-900/90 to-gray-800/80 rounded-2xl border border-[#6b7db8]/20 backdrop-blur-sm overflow-hidden shadow-xl">
                {/* Professional grid pattern */}
                <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <defs>
                            <pattern id="professionalGrid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                                <path d="M 8 0 L 0 0 0 8" stroke="#6b7db8" strokeWidth="0.1" fill="none"/>
                                <circle cx="4" cy="4" r="0.3" fill="#8a9fd9" opacity="0.3"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#professionalGrid)" />
                    </svg>
                </div>

                {/* Tech cursors */}
                {techCursors.map((cursor, index) => (
                    <div
                        key={cursor.id}
                        className={`absolute transition-all duration-400 ${cursor.active ? 'scale-110' : 'scale-100'}`}
                        style={{
                            left: `${cursor.position.x}%`,
                            top: `${cursor.position.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {/* Cursor indicator */}
                        <div className={`relative w-6 h-6 rounded-full border backdrop-blur-sm flex items-center justify-center ${
                            cursor.active ? 'animate-pulse' : ''
                        }`} style={{ 
                            borderColor: cursor.color,
                            backgroundColor: `${cursor.color}15`,
                            boxShadow: cursor.active ? `0 0 15px ${cursor.color}50` : 'none'
                        }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cursor.color }}></div>
                        </div>

                        {/* Cursor label */}
                        <div className={`absolute -bottom-7 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm border ${
                            cursor.active ? 'animate-pulse' : ''
                        }`} style={{ 
                            backgroundColor: `${cursor.color}10`,
                            borderColor: `${cursor.color}30`,
                            color: cursor.color
                        }}>
                            {cursor.name}
                        </div>
                    </div>
                ))}

                {/* Central AI display */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-[#6b7db8]/15 to-[#8a9fd9]/10 rounded-2xl border border-[#6b7db8]/30 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#6b7db8]/20 to-[#8a9fd9]/15 rounded-xl border border-[#6b7db8]/40 flex items-center justify-center">
                        <Brain className="w-12 h-12 text-[#6b7db8]" />
                    </div>
                    
                    {/* Subtle orbital ring */}
                    <div className="absolute inset-0 rounded-2xl border border-[#6b7db8]/10 animate-spin-slow"></div>
                </div>

                {/* Professional dashboard */}
                <div className="absolute bottom-4 left-4 right-4 h-14 bg-black/30 rounded-xl border border-[#6b7db8]/20 backdrop-blur-sm p-3">
                    <div className="flex items-center justify-between h-full">
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-[#6b7db8]" />
                            <span className="text-[#6b7db8] font-semibold text-sm">SYNTHI AI SYSTEM</span>
                        </div>
                        <div className="flex items-center gap-6 text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>Online</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-[#8a9fd9] rounded-full"></div>
                                <span>Processing</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-[#b3c0de] rounded-full"></div>
                                <span>Ready</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data visualization elements */}
                <div className="absolute top-4 right-4 w-16 h-12 bg-black/20 rounded border border-[#6b7db8]/20 p-2">
                    <div className="flex items-end justify-between h-full gap-1">
                        {[0.4, 0.7, 0.3, 0.9, 0.6].map((height, i) => (
                            <div 
                                key={i} 
                                className="bg-[#6b7db8] rounded-sm transition-all duration-500"
                                style={{ 
                                    height: `${height * 100}%`, 
                                    width: '2px',
                                    opacity: 0.6 + height * 0.4
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative bg-black overflow-hidden">
            {/* Professional background */}
            <div className="absolute inset-0">
                {/* Subtle gradient field */}
                <div 
                    className="absolute w-[400px] h-[400px] bg-gradient-radial from-[#6b7db8]/03 via-[#6b7db8]/01 to-transparent rounded-full blur-2xl transition-all duration-500 ease-out"
                    style={{
                        left: `${mousePosition.x}%`,
                        top: `${mousePosition.y}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                />

                {/* Professional floating elements */}
                {floatingElements.map(el => (
                    <div
                        key={el.id}
                        className={`absolute transition-all duration-200 ${
                            el.type === 'neural'
                                ? 'bg-gradient-to-br from-[#6b7db8]/40 to-[#8a9fd9]/30 rounded-full'
                                : el.type === 'data'
                                ? 'bg-gradient-to-tr from-[#8a9fd9]/30 to-[#b3c0de]/20 rounded-lg'
                                : el.type === 'signal'
                                ? 'bg-gradient-to-br from-[#b3c0de]/25 to-[#ebf1ff]/15 rounded-sm'
                                : 'bg-[#6b7db8]/15 rounded-full'
                        }`}
                        style={{
                            left: `${el.x}%`,
                            top: `${el.y}%`,
                            width: `${el.size}px`,
                            height: `${el.size}px`,
                            opacity: el.opacity,
                            filter: `blur(${el.type === 'neural' ? '1px' : el.type === 'data' ? '0.8px' : el.type === 'signal' ? '0.5px' : '0.8px'})`,
                            transform: el.type === 'neural'
                                ? `scale(${1 + Math.sin(animationTime * 2 + el.id) * 0.3})`
                                : el.type === 'data'
                                ? `rotate(${el.angle * 180 / Math.PI}deg) scale(${1 + Math.sin(animationTime * 2.5 + el.id) * 0.2})`
                                : `scale(${1 + Math.sin(animationTime + el.id) * 0.1})`
                        }}
                    />
                ))}
            </div>

            {/* Professional grid background */}
            <div className="absolute inset-0 opacity-2">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                        <pattern id="mainGrid" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                            <path d="M 6 0 L 0 0 0 6" stroke="#6b7db8" strokeWidth="0.08" fill="none"/>
                            <circle cx="3" cy="3" r="0.2" fill="#8a9fd9" opacity="0.3"/>
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#mainGrid)" />
                </svg>
            </div>

            {/* Section 1: Why Choose Us - Professional */}
            <section ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                        {/* Left content - Enhanced */}
                        <div className={`transition-all duration-1200 ${
                            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                        }`}>
                            {/* Professional badge */}
                            <div className="inline-block relative mb-8">
                                <span className="px-6 py-3 bg-gradient-to-r from-[#6b7db8]/15 to-[#8a9fd9]/10 border border-[#6b7db8]/30 text-[#6b7db8] uppercase text-sm font-bold tracking-[0.15em] rounded-xl backdrop-blur-sm relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6b7db8]/20 to-transparent animate-shimmer"></div>
                                    <Sparkles className="w-4 h-4 mr-2 animate-pulse inline" />
                                    Commitment to Excellence
                                </span>
                            </div>

                            {/* Professional title */}
                            <h2 className={`bg-gradient-to-r from-[#ebf1ff] via-[#b3c0de] to-[#ebf1ff] bg-clip-text text-transparent font-black text-4xl lg:text-6xl leading-[1.1] mb-10 animate-gradient-x bg-300% transition-all duration-1000 ${
                                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`} style={{ transitionDelay: '0.2s' }}>
                                Why Choose Us
                            </h2>

                            {/* Professional bullet points */}
                            <div className="space-y-5">
                                {BULLET_POINTS.map((point, index) => (
                                    <div 
                                        key={index}
                                        className={`transition-all duration-800 ${
                                            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                                        }`}
                                        style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
                                    >
                                        <ProfessionalBulletPoint point={point} index={index} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right content - Professional Interface */}
                        <div className={`transition-all duration-1200 ${
                            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                        }`} style={{ transitionDelay: '0.5s' }}>
                            {renderProfessionalInterface()}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Call to Action - Professional */}
            <section ref={ctaRef} className="relative py-16 lg:py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className={`relative transition-all duration-1200 ${
                        isCtaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}>
                        {/* Professional CTA Card */}
                        <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 rounded-2xl border border-[#6b7db8]/20 backdrop-blur-sm overflow-hidden shadow-xl">
                            {/* Professional pattern */}
                            <div className="absolute inset-0 opacity-3">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <defs>
                                        <pattern id="ctaGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                            <path d="M 10 0 L 0 0 0 10" stroke="#6b7db8" strokeWidth="0.15" fill="none"/>
                                            <circle cx="5" cy="5" r="0.5" fill="#8a9fd9" opacity="0.4"/>
                                        </pattern>
                                    </defs>
                                    <rect width="100" height="100" fill="url(#ctaGrid)" />
                                </svg>
                            </div>

                            {/* Professional overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#6b7db8]/08 via-[#8a9fd9]/04 to-[#b3c0de]/06 opacity-60"></div>

                            <div className="relative p-8 lg:p-16">
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                                    {/* Content */}
                                    <div className="flex-1 max-w-3xl">
                                        {/* Professional title */}
                                        <h2 className="bg-gradient-to-r from-[#ebf1ff] via-[#b3c0de] to-[#ebf1ff] bg-clip-text text-transparent font-black text-3xl lg:text-5xl leading-tight mb-6 animate-gradient-x bg-300%">
                                            Empower Your Future with Synthi AI
                                        </h2>

                                        {/* Professional description */}
                                        <p className="font-normal text-[#6b6b6b] text-lg lg:text-xl leading-relaxed mb-8">
                                            Ready to harness the power of AI for your business or
                                            institution? Contact us today to explore how <span className="text-[#6b7db8] font-semibold">Synthi AI</span> can
                                            tailor cutting-edge solutions to your specific needs. Let&apos;s
                                            <span className="text-[#8a9fd9] font-semibold"> innovate together</span> and create a sustainable, tech-driven future.
                                        </p>

                                        {/* Professional features grid */}
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                            {[
                                                { icon: <Brain className="w-4 h-4" />, label: "AI Solutions", color: "#6b7db8" },
                                                { icon: <Shield className="w-4 h-4" />, label: "Secure", color: "#8a9fd9" },
                                                { icon: <Zap className="w-4 h-4" />, label: "Fast Deploy", color: "#b3c0de" },
                                                { icon: <Target className="w-4 h-4" />, label: "24/7 Support", color: "#6b7db8" }
                                            ].map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-900/40 to-gray-800/20 rounded-xl border border-[#6b7db8]/15 hover:border-[#6b7db8]/30 transition-all duration-300 backdrop-blur-sm">
                                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6b7db8]/20 to-[#8a9fd9]/15 flex items-center justify-center" style={{ color: feature.color }}>
                                                        {feature.icon}
                                                    </div>
                                                    <span className="text-white text-sm font-semibold">{feature.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Professional CTA Button */}
                                    <div className="flex-shrink-0">
                                        <div className="relative group">
                                            <button className="relative px-10 py-5 bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] hover:from-[#5a6ba3] hover:to-[#7a8fc9] text-white font-bold text-lg rounded-xl transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#6b7db8]/25 hover:scale-105">
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#6b7db8] via-[#8a9fd9] to-[#b3c0de] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                <span className="relative z-10 flex items-center gap-3">
                                                    <Send className="w-5 h-5 group-hover:rotate-6 transition-transform duration-300" />
                                                    Contact Us
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                                </span>
                                            </button>
                                            
                                            {/* Professional decorative elements */}
                                            <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-[#6b7db8]/40 animate-pulse"></div>
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-[#8a9fd9]/40 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Professional stats */}
                                <div className="flex justify-center items-center gap-8 mt-12 pt-8 border-t border-[#6b7db8]/15">
                                    {[
                                        { label: "Projects Delivered", value: "500+", icon: <Database className="w-4 h-4" /> },
                                        { label: "Success Rate", value: "98.7%", icon: <Target className="w-4 h-4" /> },
                                        { label: "Countries Served", value: "15+", icon: <Globe className="w-4 h-4" /> },
                                        { label: "AI Models", value: "47+", icon: <Cpu className="w-4 h-4" /> }
                                    ].map((stat, index) => (
                                        <div key={index} className="text-center group">
                                            <div className="flex items-center justify-center gap-2 mb-2">
                                                <div className="text-[#6b7db8] group-hover:scale-110 transition-transform duration-300">
                                                    {stat.icon}
                                                </div>
                                                <div className="text-xl font-black bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                                                    {stat.value}
                                                </div>
                                            </div>
                                            <div className="text-xs text-[#6b6b6b] uppercase tracking-wider font-medium">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Professional accent lines */}
                            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6b7db8]/40 to-transparent opacity-60"></div>
                                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#8a9fd9]/40 to-transparent opacity-60"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Professional CSS animations */}
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
                
                .animate-gradient-x {
                    animation: gradient-x 6s ease infinite;
                }
                
                .animate-shimmer {
                    animation: shimmer 2s linear infinite;
                }
                
                .animate-spin-slow {
                    animation: spin-slow 30s linear infinite;
                }
                
                .bg-300% {
                    background-size: 300% 300%;
                }
                
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
            `}</style>
        </div>
    );
}