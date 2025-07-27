"use client";

import {
    Brain,
    Cpu,
    Sprout,
    Building2,
    ShoppingCart,
    Home,
    ArrowRight,
    ExternalLink,
    Sparkles,
    Target,
    Users,
    TrendingUp,
    Zap,
    Globe,
    Shield,
    Radar,
    Scan,
    Radio,
    Activity
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { JSX } from "react/jsx-runtime";

type FloatingElement = {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    type: 'neural' | 'particle' | 'signal' | 'pulse';
    angle: number;
    frequency: number;
};

interface RadarModuleProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    isActive?: boolean;
}

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
}

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'outline';
    onClick?: () => void;
}

export default function SolutionsShowcaseSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [activeSolution, setActiveSolution] = useState<number | null>(null);
    const [radarAnimation, setRadarAnimation] = useState(0);
    const [scanAngle, setScanAngle] = useState(0);
    const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Synthi AI's flagship solutions avec positionnement optimisé
    const solutions = [
        {
            id: 1,
            name: "Ubora AI",
            tagline: "Intelligent Document Processing",
            description: "Revolutionary AI-powered platform for automated document analysis, data extraction, and intelligent processing. Transform your paperwork into actionable insights with advanced OCR and NLP capabilities.",
            icon: <Brain className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop&auto=format",
            features: ["Smart OCR", "Data Extraction", "Document Classification", "Workflow Automation"],
            technologies: ["Computer Vision", "NLP", "Machine Learning", "Cloud Computing"],
            color: "from-[#6b7db8] to-[#8a9fd9]",
            accentColor: "#6b7db8",
            stats: { accuracy: "99.2%", processing: "10K+", time_saved: "80%" },
            category: "AI Platform",
            link: "/solutions/ubora-ai",
            radarPosition: { angle: 0, distance: 220 },
            signalStrength: 95,
            gridPosition: { row: 0, col: 1 }
        },
        {
            id: 2,
            name: "Farm2Market",
            tagline: "Agricultural Supply Chain",
            description: "End-to-end digital platform connecting farmers directly to markets, optimizing supply chains, and ensuring fair pricing through AI-driven market analysis and logistics optimization.",
            icon: <Sprout className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&h=300&fit=crop&auto=format",
            features: ["Market Connect", "Price Analytics", "Logistics Optimization", "Quality Assurance"],
            technologies: ["IoT", "Blockchain", "Predictive Analytics", "Mobile Apps"],
            color: "from-[#8a9fd9] to-[#b3c0de]",
            accentColor: "#8a9fd9",
            stats: { farmers: "5K+", markets: "200+", revenue_boost: "35%" },
            category: "AgriTech",
            link: "/solutions/farm2market",
            radarPosition: { angle: 72, distance: 240 },
            signalStrength: 88,
            gridPosition: { row: 0, col: 2 }
        },
        {
            id: 3,
            name: "Kamer Heaven",
            tagline: "Smart Real Estate Platform",
            description: "Intelligent property management platform leveraging AI for property valuation, tenant screening, maintenance prediction, and automated property management workflows.",
            icon: <Home className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop&auto=format",
            features: ["Property Valuation", "Tenant Screening", "Maintenance Prediction", "Digital Contracts"],
            technologies: ["AI Analytics", "Computer Vision", "Blockchain", "IoT Sensors"],
            color: "from-[#b3c0de] to-[#6b7db8]",
            accentColor: "#b3c0de",
            stats: { properties: "10K+", satisfaction: "95%", efficiency: "60%" },
            category: "PropTech",
            link: "/solutions/kamer-heaven",
            radarPosition: { angle: 144, distance: 230 },
            signalStrength: 92,
            gridPosition: { row: 1, col: 0 }
        },
        {
            id: 4,
            name: "Smart Cities",
            tagline: "Urban Intelligence System",
            description: "Comprehensive smart city solutions integrating IoT sensors, AI analytics, and automated systems to optimize traffic, energy consumption, waste management, and public services.",
            icon: <Building2 className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=500&h=300&fit=crop&auto=format",
            features: ["Traffic Optimization", "Energy Management", "Waste Analytics", "Public Safety"],
            technologies: ["IoT Networks", "Edge Computing", "Big Data", "5G Integration"],
            color: "from-[#6b7db8] to-[#ebf1ff]",
            accentColor: "#6b7db8",
            stats: { cities: "15+", energy_saved: "40%", traffic_flow: "50%" },
            category: "Smart Infrastructure",
            link: "/solutions/smart-cities",
            radarPosition: { angle: 216, distance: 225 },
            signalStrength: 96,
            gridPosition: { row: 1, col: 2 }
        },
        {
            id: 5,
            name: "Smart Farming",
            tagline: "Precision Agriculture AI",
            description: "Advanced precision agriculture platform using drones, IoT sensors, and AI to optimize crop yields, monitor soil health, predict weather impacts, and automate irrigation systems.",
            icon: <Sprout className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=300&fit=crop&auto=format",
            features: ["Crop Monitoring", "Soil Analysis", "Weather Prediction", "Automated Irrigation"],
            technologies: ["Drone Technology", "Satellite Imagery", "AI Prediction", "IoT Sensors"],
            color: "from-[#8a9fd9] to-[#6b7db8]",
            accentColor: "#8a9fd9",
            stats: { yield_increase: "45%", water_saved: "30%", farms: "500+" },
            category: "AgriTech",
            link: "/solutions/smart-farming",
            radarPosition: { angle: 288, distance: 235 },
            signalStrength: 91,
            gridPosition: { row: 2, col: 1 }
        }
    ];

    // Mouse tracking for radar effects
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

    // Radar and floating elements animation
    useEffect(() => {
        const generateFloatingElements = (): void => {
            const elements: FloatingElement[] = [];
            for (let i = 0; i < 40; i++) {
                elements.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 10 + 2,
                    speed: Math.random() * 2 + 0.2,
                    opacity: Math.random() * 0.7 + 0.1,
                    angle: Math.random() * Math.PI * 2,
                    frequency: Math.random() * 3 + 1,
                    type: Math.random() > 0.7 ? (Math.random() > 0.6 ? 'neural' : Math.random() > 0.5 ? 'signal' : 'pulse') : 'particle'
                });
            }
            setFloatingElements(elements);
        };

        generateFloatingElements();

        const animateElements = (): void => {
            const time = Date.now() * 0.0012;
            setRadarAnimation(time);
            setScanAngle((prev) => (prev + 1.2) % 360);

            setFloatingElements(prev =>
                prev.map(el => ({
                    ...el,
                    y: (el.y + el.speed * 0.02) % 100,
                    x: el.x + Math.sin(time * el.frequency + el.id + el.angle) * 0.015,
                    angle: el.angle + 0.005,
                    opacity: el.type === 'neural'
                        ? 0.3 + Math.sin(time * 2 + el.id) * 0.4 + 0.3
                        : el.type === 'signal'
                        ? 0.2 + Math.sin(time * 4 + el.id * 0.8) * 0.3 + 0.4
                        : el.type === 'pulse'
                        ? 0.1 + Math.sin(time * 6 + el.id * 1.2) * 0.5 + 0.4
                        : el.opacity
                }))
            );
        };

        const interval = setInterval(animateElements, 35);
        return () => clearInterval(interval);
    }, []);

    const RadarModule: React.FC<RadarModuleProps> = ({
        children,
        className,
        style,
        onMouseEnter,
        onMouseLeave,
        isActive
    }) => (
        <div
            className={`${className} ${isActive ? 'radar-active' : ''}`}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </div>
    );

    const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}>
            {children}
        </span>
    );

    const Button: React.FC<ButtonProps> = ({ children, className = "", variant = "default", ...props }) => {
        const baseClasses = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
        const variantClasses = variant === "outline"
            ? "border-2 border-[#6b7db8]/30 text-[#6b7db8] hover:bg-[#6b7db8]/10 hover:border-[#6b7db8]/50 backdrop-blur-sm"
            : "bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] hover:from-[#5a6ba3] hover:to-[#7a8fc9] text-white shadow-lg hover:shadow-xl hover:shadow-[#6b7db8]/30";

        return (
            <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
                {children}
            </button>
        );
    };

    const handleSolutionClick = (link: string): void => {
        console.log(`Navigating to: ${link}`);
    };

    // Render optimized radar screen
    const renderRadarScreen = (): JSX.Element => {
        return (
            <div className="relative w-full max-w-2xl mx-auto aspect-square">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                    <defs>
                        <radialGradient id="radarGradient" cx="50%" cy="50%">
                            <stop offset="0%" stopColor="#6b7db8" stopOpacity="0.1"/>
                            <stop offset="30%" stopColor="#6b7db8" stopOpacity="0.05"/>
                            <stop offset="60%" stopColor="#8a9fd9" stopOpacity="0.03"/>
                            <stop offset="100%" stopColor="transparent"/>
                        </radialGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    
                    {/* Background circle */}
                    <circle cx="200" cy="200" r="180" fill="url(#radarGradient)" />
                    
                    {/* Radar circles */}
                    {[40, 80, 120, 160, 180].map((radius, index) => (
                        <circle
                            key={index}
                            cx="200"
                            cy="200"
                            r={radius}
                            stroke="#6b7db8"
                            strokeWidth="0.8"
                            fill="none"
                            opacity={0.4 - index * 0.05}
                            filter="url(#glow)"
                        />
                    ))}
                    
                    {/* Radar grid lines */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, index) => {
                        const x1 = 200 + Math.cos((angle - 90) * Math.PI / 180) * 20;
                        const y1 = 200 + Math.sin((angle - 90) * Math.PI / 180) * 20;
                        const x2 = 200 + Math.cos((angle - 90) * Math.PI / 180) * 180;
                        const y2 = 200 + Math.sin((angle - 90) * Math.PI / 180) * 180;
                        
                        return (
                            <line
                                key={index}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="#6b7db8"
                                strokeWidth="0.4"
                                opacity="0.25"
                            />
                        );
                    })}
                    
                    {/* Central radar dot */}
                    <circle
                        cx="200"
                        cy="200"
                        r="6"
                        fill="#6b7db8"
                        opacity="0.9"
                        filter="url(#glow)"
                    />
                    
                    {/* Scanning beam */}
                    <g style={{ transformOrigin: '200px 200px' }}>
                        <defs>
                            <linearGradient id="scanBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#6b7db8" stopOpacity="0"/>
                                <stop offset="70%" stopColor="#6b7db8" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#8a9fd9" stopOpacity="0.6"/>
                            </linearGradient>
                        </defs>
                        <path
                            d="M200,200 L200,20 A180,180 0 0,1 290,110 Z"
                            fill="url(#scanBeam)"
                            style={{ 
                                transform: `rotate(${scanAngle}deg)`,
                                transformOrigin: '200px 200px'
                            }}
                        />
                    </g>
                    
                    {/* Solution blips */}
                    {solutions.map((solution) => {
                        const blipX = 200 + Math.cos((solution.radarPosition.angle - 90) * Math.PI / 180) * 140;
                        const blipY = 200 + Math.sin((solution.radarPosition.angle - 90) * Math.PI / 180) * 140;
                        const isScanned = Math.abs(scanAngle - solution.radarPosition.angle) < 45 || 
                                        Math.abs(scanAngle - solution.radarPosition.angle - 360) < 45 ||
                                        Math.abs(scanAngle - solution.radarPosition.angle + 360) < 45;
                        
                        return (
                            <g key={solution.id}>
                                {/* Signal rings */}
                                <circle
                                    cx={blipX}
                                    cy={blipY}
                                    r="15"
                                    stroke={solution.accentColor}
                                    strokeWidth="1"
                                    fill="none"
                                    opacity={activeSolution === solution.id ? "0.6" : "0.2"}
                                    className="animate-ping-slow"
                                />
                                <circle
                                    cx={blipX}
                                    cy={blipY}
                                    r="10"
                                    stroke={solution.accentColor}
                                    strokeWidth="1.5"
                                    fill="none"
                                    opacity={activeSolution === solution.id ? "0.8" : "0.3"}
                                    className="animate-pulse"
                                />
                                
                                {/* Main blip */}
                                <circle
                                    cx={blipX}
                                    cy={blipY}
                                    r="5"
                                    fill={solution.accentColor}
                                    opacity={isScanned || activeSolution === solution.id ? "1" : "0.7"}
                                    filter="url(#glow)"
                                    className={activeSolution === solution.id ? "animate-pulse" : ""}
                                />
                            </g>
                        );
                    })}
                </svg>
                
                {/* Radar info overlay */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-[#6b7db8]/40">
                    <div className="flex items-center gap-3 mb-2">
                        <Radar className="w-5 h-5 text-[#6b7db8] animate-spin-slow" />
                        <span className="text-[#6b7db8] font-bold text-sm">SOLUTIONS RADAR</span>
                    </div>
                    <div className="text-xs text-gray-400 space-y-0.5">
                        <div>Range: 360° Coverage</div>
                        <div>Active: {solutions.length} Solutions</div>
                        <div>Status: <span className="text-green-400">OPERATIONAL</span></div>
                    </div>
                </div>
                
                {/* Signal strength indicator */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-[#6b7db8]/40">
                    <div className="flex items-center gap-2 mb-2">
                        <Radio className="w-4 h-4 text-[#8a9fd9]" />
                        <span className="text-[#8a9fd9] font-bold text-xs">SIGNAL</span>
                    </div>
                    <div className="flex gap-1">
                        {[1,2,3,4,5].map((bar) => (
                            <div 
                                key={bar} 
                                className={`w-1.5 bg-[#6b7db8] ${bar <= 4 ? 'opacity-100' : 'opacity-30'}`}
                                style={{ height: `${bar * 4 + 4}px` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section ref={sectionRef} className="relative py-20 lg:py-32 bg-black overflow-hidden">
            {/* Enhanced radar background */}
            <div className="absolute inset-0">
                {/* Cursor radar effect */}
                <div 
                    className="absolute w-96 h-96 bg-gradient-radial from-[#6b7db8]/08 via-[#6b7db8]/04 to-transparent rounded-full blur-2xl transition-all duration-500 ease-out"
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
                                : el.type === 'signal'
                                ? 'bg-gradient-to-tr from-[#8a9fd9]/50 to-[#b3c0de]/30 rounded-lg rotate-45'
                                : el.type === 'pulse'
                                ? 'bg-gradient-to-br from-[#b3c0de]/40 to-[#ebf1ff]/20 rounded-sm rotate-12'
                                : 'bg-[#6b7db8]/20 rounded-full'
                        }`}
                        style={{
                            left: `${el.x}%`,
                            top: `${el.y}%`,
                            width: `${el.size}px`,
                            height: `${el.size}px`,
                            opacity: el.opacity,
                            filter: `blur(${el.type === 'neural' ? '1.5px' : el.type === 'signal' ? '1px' : el.type === 'pulse' ? '0.5px' : '0.8px'})`,
                            transform: el.type === 'neural'
                                ? `scale(${1 + Math.sin(radarAnimation * 2 + el.id) * 0.4}) rotate(${el.angle * 180 / Math.PI}deg)`
                                : el.type === 'signal'
                                ? `rotate(${el.angle * 180 / Math.PI + 45}deg) scale(${1 + Math.sin(radarAnimation * 3 + el.id) * 0.3})`
                                : el.type === 'pulse'
                                ? `rotate(${el.angle * 180 / Math.PI + 12}deg) scaleX(${1 + Math.sin(radarAnimation * 4 + el.id) * 0.2})`
                                : `scale(${1 + Math.sin(radarAnimation + el.id) * 0.1})`
                        }}
                    />
                ))}
            </div>

            {/* Radar grid background */}
            <div className="absolute inset-0 opacity-3">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                        <pattern id="radarGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" stroke="#6b7db8" strokeWidth="0.1" fill="none"/>
                            <circle cx="5" cy="5" r="0.5" fill="#8a9fd9" opacity="0.3"/>
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#radarGrid)" />
                </svg>
            </div>

            {/* Decorative radar elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-32 h-32 border border-[#6b7db8]/15 rounded-full animate-ping-slow"></div>
                <div className="absolute bottom-32 left-32 w-24 h-24 border-2 border-[#8a9fd9]/10 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-[#6b7db8]/08 to-transparent rounded-full animate-bounce-slow"></div>
                <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-[#b3c0de]/20 rounded-full animate-spin-slow"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Enhanced Header Section */}
                <div className={`text-center mb-16 lg:mb-20 transition-all duration-1500 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}>
                    <div className="inline-block mb-8 relative">
                        <Badge className="px-10 py-5 bg-gradient-to-r from-[#6b7db8]/20 to-[#8a9fd9]/15 border-2 border-[#6b7db8]/40 text-[#6b7db8] uppercase text-base font-black tracking-[0.25em] rounded-3xl backdrop-blur-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6b7db8]/30 to-transparent animate-shimmer"></div>
                            <Radar className="w-6 h-6 mr-4 animate-spin-slow" />
                            Revolutionary AI Solutions
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#6b7db8] rounded-full animate-ping"></div>
                        </Badge>
                    </div>

                    <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] mb-10 tracking-tight">
                        <span className="block bg-gradient-to-r from-[#ebf1ff] via-[#b3c0de] to-[#ebf1ff] bg-clip-text text-transparent animate-gradient-x bg-400%">
                            Our Flagship
                        </span>
                        <span className="block bg-gradient-to-r from-[#6b7db8] via-[#8a9fd9] to-[#6b7db8] bg-clip-text text-transparent animate-gradient-x bg-400% mt-3">
                            Solutions
                        </span>
                    </h2>

                    <p className="text-xl lg:text-2xl text-[#6b6b6b] leading-relaxed max-w-4xl mx-auto font-light">
                        Discover our portfolio of cutting-edge AI solutions that are transforming industries
                        <span className="text-[#6b7db8] font-semibold"> across Africa</span> and driving 
                        <span className="text-[#8a9fd9] font-semibold"> digital innovation at scale</span>.
                    </p>

                    {/* Radar scanning indicator */}
                    <div className="flex justify-center mt-12">
                        <div className="flex items-center space-x-6">
                            <Scan className="w-6 h-6 text-[#6b7db8] animate-pulse" />
                            <div className="w-32 h-px bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9]"></div>
                            <Activity className="w-5 h-5 text-[#8a9fd9] animate-bounce" />
                            <div className="w-32 h-px bg-gradient-to-r from-[#8a9fd9] to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Layout avec Radar et Solutions */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 xl:gap-16 items-start">
                    {/* Colonne gauche - Solutions 1 & 3 */}
                    <div className="space-y-8">
                        {[solutions[0], solutions[2]].map((solution, index) => (
                            <RadarModule
                                key={solution.id}
                                className={`group transition-all duration-800 cursor-pointer ${
                                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                                }`}
                                style={{ 
                                    transitionDelay: `${0.3 + index * 0.2}s`
                                }}
                                onMouseEnter={() => setActiveSolution(solution.id)}
                                onMouseLeave={() => setActiveSolution(null)}
                                isActive={activeSolution === solution.id}
                            >
                                {renderSolutionCard(solution)}
                            </RadarModule>
                        ))}
                    </div>

                    {/* Colonne centrale - Radar Screen */}
                    <div className={`flex justify-center transition-all duration-1200 ${
                        isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`} style={{ transitionDelay: '0.5s' }}>
                        {renderRadarScreen()}
                    </div>

                    {/* Colonne droite - Solutions 2 & 4 */}
                    <div className="space-y-8">
                        {[solutions[1], solutions[3]].map((solution, index) => (
                            <RadarModule
                                key={solution.id}
                                className={`group transition-all duration-800 cursor-pointer ${
                                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                                }`}
                                style={{ 
                                    transitionDelay: `${0.7 + index * 0.2}s`
                                }}
                                onMouseEnter={() => setActiveSolution(solution.id)}
                                onMouseLeave={() => setActiveSolution(null)}
                                isActive={activeSolution === solution.id}
                            >
                                {renderSolutionCard(solution)}
                            </RadarModule>
                        ))}
                    </div>
                </div>

                {/* Solution centrale - Smart Farming */}
                <div className="flex justify-center mt-12">
                    <RadarModule
                        className={`group transition-all duration-800 cursor-pointer max-w-md ${
                            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                        }`}
                        style={{ 
                            transitionDelay: '1.1s'
                        }}
                        onMouseEnter={() => setActiveSolution(solutions[4].id)}
                        onMouseLeave={() => setActiveSolution(null)}
                        isActive={activeSolution === solutions[4].id}
                    >
                        {renderSolutionCard(solutions[4])}
                    </RadarModule>
                </div>

                {/* Enhanced Call to Action Section */}
                <div className={`text-center mt-20 transition-all duration-1200 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`} style={{ transitionDelay: '1.3s' }}>
                    <div className="relative inline-block mb-8">
                        <Button className="px-16 py-8 text-xl font-black group/cta relative overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#6b7db8] via-[#8a9fd9] to-[#b3c0de] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500"></div>
                            <span className="relative z-10 flex items-center gap-4">
                                <Radar className="w-8 h-8 group-hover/cta:animate-spin transition-transform duration-300" />
                                Explore All Solutions
                                <Zap className="w-8 h-8 group-hover/cta:scale-110 transition-transform duration-300" />
                            </span>
                        </Button>
                        
                        {/* Enhanced decorative radar elements */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-[#6b7db8]/60 animate-pulse"></div>
                        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-[#8a9fd9]/60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#6b7db8] rounded-full animate-ping"></div>
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#8a9fd9] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        
                        {/* Radar sweep around button */}
                        <div className="absolute inset-0 rounded-2xl border border-[#6b7db8]/20 animate-ping-slow"></div>
                    </div>

                    <p className="text-[#6b6b6b] text-xl leading-relaxed mb-8">
                        Ready to deploy cutting-edge AI solutions for your business?
                        <br />
                        <span className="text-[#6b7db8] font-bold">Let&apos;s scan the possibilities together.</span>
                    </p>

                    {/* Radar scanning status */}
                    <div className="flex justify-center items-center gap-4 text-sm text-[#6b6b6b]">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>System Online</span>
                        </div>
                        <div className="w-px h-4 bg-[#6b7db8]/30"></div>
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-[#6b7db8] animate-pulse" />
                            <span>Scanning Active</span>
                        </div>
                        <div className="w-px h-4 bg-[#6b7db8]/30"></div>
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#8a9fd9]" />
                            <span>Global Coverage</span>
                        </div>
                    </div>
                </div>
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
                
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                
                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 1; }
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
                
                .animate-gradient-x {
                    animation: gradient-x 12s ease infinite;
                }
                
                .animate-shimmer {
                    animation: shimmer 3s linear infinite;
                }
                
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
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
                
                .radar-active {
                    transform: scale(1.05);
                }
                
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
                
                .shadow-3xl {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.5);
                }
            `}</style>
        </section>
    );

    // Fonction pour rendre une carte de solution
    function renderSolutionCard(solution: any) {
        const isActive = activeSolution === solution.id;
        
        return (
            <div className={`relative bg-gradient-to-br from-gray-900/95 to-gray-800/90 border-2 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-700 rounded-3xl ${
                isActive 
                    ? `border-[${solution.accentColor}]/60 scale-105 shadow-3xl` 
                    : 'border-[#6b7db8]/25 hover:border-[#6b7db8]/40'
            }`} 
            style={{ 
                boxShadow: isActive 
                    ? `0 25px 50px -12px ${solution.accentColor}40, 0 0 0 1px ${solution.accentColor}30`
                    : '',
            }}>
                
                {/* Panel glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 ${isActive ? 'opacity-15' : ''} transition-opacity duration-700 rounded-3xl`}></div>
                
                {/* Circuit pattern background */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <svg className="absolute inset-0 w-full h-full opacity-8" viewBox="0 0 100 100">
                        <defs>
                            <pattern id={`circuit-${solution.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M0,10 L5,10 L7,8 L13,8 L15,10 L20,10" stroke={solution.accentColor} strokeWidth="0.2" fill="none" opacity="0.3"/>
                                <path d="M10,0 L10,5 L8,7 L8,13 L10,15 L10,20" stroke={solution.accentColor} strokeWidth="0.2" fill="none" opacity="0.3"/>
                                <circle cx="7" cy="8" r="0.8" fill={solution.accentColor} opacity="0.5"/>
                                <circle cx="13" cy="8" r="0.8" fill={solution.accentColor} opacity="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill={`url(#circuit-${solution.id})`} />
                    </svg>
                </div>

                <div className="relative p-6 z-10">
                    {/* Header section */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            {/* Solution icon with radar effect */}
                            <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} p-4 transition-all duration-500 ${
                                isActive ? 'scale-110 shadow-lg' : ''
                            }`} style={{ boxShadow: isActive ? `0 0 30px ${solution.accentColor}40` : 'none' }}>
                                <div className="text-white w-full h-full flex items-center justify-center">
                                    {solution.icon}
                                </div>
                                
                                {/* Radar ping rings */}
                                {isActive && (
                                    <>
                                        <div className="absolute inset-0 rounded-2xl border-2 border-current animate-ping opacity-20"></div>
                                        <div className="absolute inset-2 rounded-xl border border-current animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
                                    </>
                                )}
                            </div>
                            
                            <div>
                                <h3 className={`text-xl font-black bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent transition-all duration-500 leading-tight ${
                                    isActive ? 'scale-105' : ''
                                }`}>
                                    {solution.name}
                                </h3>
                                <p className="text-[#6b7db8] text-sm font-bold uppercase tracking-wider">
                                    {solution.tagline}
                                </p>
                            </div>
                        </div>
                        
                        {/* Signal strength indicator */}
                        <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                                <div className="text-xs text-[#6b6b6b] font-mono">{solution.signalStrength}%</div>
                                <div className="flex gap-0.5">
                                    {[1,2,3,4].map((bar) => (
                                        <div 
                                            key={bar} 
                                            className={`w-1 bg-[#6b7db8] transition-all duration-300 ${
                                                bar <= Math.floor(solution.signalStrength / 25) ? 'opacity-100' : 'opacity-20'
                                            }`}
                                            style={{ height: `${bar * 2 + 4}px` }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <Badge className="px-2 py-1 bg-black/40 text-[#6b7db8] border border-[#6b7db8]/30 text-xs rounded-lg font-bold">
                                {solution.category}
                            </Badge>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#6b6b6b] text-sm leading-relaxed mb-6 font-light">
                        {solution.description.substring(0, 150)}...
                    </p>

                    {/* Stats grid
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {Object.entries(solution.stats).map(([key, value], statIndex) => (
                            <div key={statIndex} className="text-center p-2 bg-black/30 rounded-xl border border-[#6b7db8]/20">
                                <div className={`text-sm font-black bg-gradient-to-r ${solution.color} bg-clip-text text-transparent transition-transform duration-300 ${
                                    isActive ? 'scale-110' : ''
                                }`}>
                                    {value}
                                </div>
                                <div className="text-[8px] text-[#6b6b6b] uppercase tracking-wider font-medium">
                                    {key.replace('_', ' ')}
                                </div>
                            </div>
                        ))} 
                    </div>  */}

                    {/* Key features */}
                    <div className="mb-6">
                        <h4 className="text-white text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Target className="w-3 h-3 text-[#6b7db8]" />
                            Key Features
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {solution.features.slice(0, 4).map((feature: string, featureIndex: number) => (
                                <div key={featureIndex} className="flex items-center gap-2 text-xs text-[#6b6b6b]">
                                    <div className={`w-1.5 h-1.5 bg-gradient-to-r ${solution.color} rounded-full`}></div>
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                        <h4 className="text-white text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Cpu className="w-3 h-3 text-[#6b7db8]" />
                            Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {solution.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                                <Badge
                                    key={techIndex}
                                    className="px-2 py-1 bg-gradient-to-r from-[#6b7db8]/20 to-[#8a9fd9]/10 text-[#6b7db8] border border-[#6b7db8]/30 text-xs rounded-lg hover:scale-105 transition-all duration-200 font-semibold"
                                >
                                    {tech}
                                </Badge>
                            ))}
                            {solution.technologies.length > 3 && (
                                <Badge className="px-2 py-1 bg-gradient-to-r from-gray-700/40 to-gray-600/20 text-gray-300 text-xs rounded-lg border border-gray-600/30 font-semibold">
                                    +{solution.technologies.length - 3}
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Action button */}
                    <Button 
                        className="w-full group/btn relative overflow-hidden py-3"
                        onClick={() => handleSolutionClick(solution.link)}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r ${solution.color} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}></div>
                        <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-white transition-colors duration-300">
                            <Scan className="w-4 h-4" />
                            Scan Solution
                            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </span>
                    </Button>

                    {/* Connection line to radar when active */}
                    {isActive && (
                        <div className="absolute top-1/2 left-1/2 w-16 h-16 pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}>
                            <div className={`w-2 h-2 bg-${solution.accentColor} rounded-full animate-ping`} style={{ backgroundColor: solution.accentColor }}></div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}