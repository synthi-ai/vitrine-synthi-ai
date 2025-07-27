"use client";

import { 
    BarChart3, 
    Cloud, 
    Globe, 
    Users, 
    Zap, 
    Sparkles, 
    Binary, 
    Network, 
    Cpu, 
    Database, 
    Shield, 
    Target,
    Activity,
    Hexagon
} from "lucide-react";
import React, { useState, useEffect, useRef, JSX } from "react";

type FloatingElement = {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    type: 'neural' | 'particle' | 'data' | 'signal' | 'quantum';
    angle: number;
    frequency: number;
    pulse: number;
};

type ValueCard = {
    icon: JSX.Element;
    title: string;
    description: string;
    color: string;
    accent: string;
    techPattern: string;
    metrics: { label: string; value: string };
};

export default function FeaturesOverviewSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const [neuralAnimation, setNeuralAnimation] = useState(0);
    const [quantumField, setQuantumField] = useState(0);
    const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Enhanced value cards with futuristic data
    const valueCards: ValueCard[] = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Innovation",
            description: "Designing cutting-edge solutions adapted to the market realities with quantum-enhanced algorithms.",
            color: "from-[#6b7db8] to-[#8a9fd9]",
            accent: "#6b7db8",
            techPattern: "innovation",
            metrics: { label: "Innovation Index", value: "98.7%" }
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Excellence",
            description: "Maintaining high technological standards and ensuring reliable solutions through continuous optimization.",
            color: "from-[#8a9fd9] to-[#b3c0de]",
            accent: "#8a9fd9",
            techPattern: "excellence",
            metrics: { label: "Quality Score", value: "99.2%" }
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Ethics & Transparency",
            description: "Ensuring responsible, secure, and user-respectful AI with blockchain-verified processes.",
            color: "from-[#b3c0de] to-[#6b7db8]",
            accent: "#b3c0de",
            techPattern: "ethics",
            metrics: { label: "Trust Level", value: "96.8%" }
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Society Impact",
            description: "Improving people's lives and contributing to the Sustainable Development Goals through AI solutions.",
            color: "from-[#6b7db8] to-[#ebf1ff]",
            accent: "#6b7db8",
            techPattern: "impact",
            metrics: { label: "Impact Score", value: "94.5%" }
        },
        {
            icon: <Cloud className="w-8 h-8" />,
            title: "Collaboration",
            description: "Working with key players to build a strong AI ecosystem in Africa through distributed computing.",
            color: "from-[#8a9fd9] to-[#6b7db8]",
            accent: "#8a9fd9",
            techPattern: "collaboration",
            metrics: { label: "Network Strength", value: "97.3%" }
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

    // Advanced quantum-like animations
    useEffect(() => {
        const generateFloatingElements = (): void => {
            const elements: FloatingElement[] = [];
            for (let i = 0; i < 35; i++) {
                elements.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 12 + 3,
                    speed: Math.random() * 2.5 + 0.2,
                    opacity: Math.random() * 0.8 + 0.1,
                    angle: Math.random() * Math.PI * 2,
                    frequency: Math.random() * 2.5 + 0.5,
                    pulse: Math.random() * 3 + 1,
                    type: Math.random() > 0.6 ? (Math.random() > 0.7 ? 'neural' : Math.random() > 0.6 ? 'data' : Math.random() > 0.5 ? 'signal' : 'quantum') : 'particle'
                });
            }
            setFloatingElements(elements);
        };

        generateFloatingElements();

        const animateElements = (): void => {
            const time = Date.now() * 0.0015;
            setNeuralAnimation(time);
            setQuantumField(time * 0.5);

            setFloatingElements(prev =>
                prev.map(el => ({
                    ...el,
                    y: (el.y + el.speed * 0.015) % 100,
                    x: el.x + Math.sin(time * el.frequency + el.id + el.angle) * 0.025,
                    angle: el.angle + 0.01,
                    opacity: el.type === 'neural'
                        ? 0.3 + Math.sin(time * 2.5 + el.id) * 0.4 + 0.3
                        : el.type === 'data'
                        ? 0.2 + Math.sin(time * 3.5 + el.id * 0.8) * 0.3 + 0.4
                        : el.type === 'signal'
                        ? 0.15 + Math.sin(time * 4.5 + el.id * 1.1) * 0.4 + 0.4
                        : el.type === 'quantum'
                        ? 0.1 + Math.sin(time * 6 + el.id * 1.5) * 0.6 + 0.3
                        : el.opacity
                }))
            );
        };

        const interval = setInterval(animateElements, 30);
        return () => clearInterval(interval);
    }, []);

    // Render futuristic tech patterns
    const renderTechPattern = (pattern: string, isActive: boolean): JSX.Element => {
        const baseOpacity = isActive ? 0.15 : 0.08;
        
        return (
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <svg className="absolute inset-0 w-full h-full" style={{ opacity: baseOpacity }} viewBox="0 0 100 100">
                    <defs>
                        <pattern id={`tech-${pattern}`} x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                            {pattern === 'innovation' && (
                                <>
                                    <path d="M7.5,2 L12,7.5 L7.5,13 L3,7.5 Z" stroke="#6b7db8" strokeWidth="0.3" fill="none" opacity="0.6"/>
                                    <circle cx="7.5" cy="7.5" r="1" fill="#8a9fd9" opacity="0.8"/>
                                    <path d="M0,7.5 L15,7.5 M7.5,0 L7.5,15" stroke="#6b7db8" strokeWidth="0.2" opacity="0.4"/>
                                </>
                            )}
                            {pattern === 'excellence' && (
                                <>
                                    <rect x="3" y="10" width="2" height="3" fill="#8a9fd9" opacity="0.6"/>
                                    <rect x="6" y="8" width="2" height="5" fill="#8a9fd9" opacity="0.7"/>
                                    <rect x="9" y="6" width="2" height="7" fill="#8a9fd9" opacity="0.8"/>
                                    <path d="M4,10 L7,8 L10,6" stroke="#6b7db8" strokeWidth="0.3" opacity="0.5"/>
                                </>
                            )}
                            {pattern === 'ethics' && (
                                <>
                                    <circle cx="7.5" cy="7.5" r="4" stroke="#b3c0de" strokeWidth="0.3" fill="none" opacity="0.6"/>
                                    <path d="M7.5,4 L7.5,11 M4,7.5 L11,7.5" stroke="#b3c0de" strokeWidth="0.4" opacity="0.7"/>
                                    <circle cx="7.5" cy="7.5" r="1.5" fill="#b3c0de" opacity="0.5"/>
                                </>
                            )}
                            {pattern === 'impact' && (
                                <>
                                    <circle cx="7.5" cy="7.5" r="5" stroke="#6b7db8" strokeWidth="0.2" fill="none" opacity="0.4"/>
                                    <circle cx="7.5" cy="7.5" r="3" stroke="#6b7db8" strokeWidth="0.3" fill="none" opacity="0.6"/>
                                    <circle cx="7.5" cy="7.5" r="1" fill="#ebf1ff" opacity="0.8"/>
                                </>
                            )}
                            {pattern === 'collaboration' && (
                                <>
                                    <circle cx="4" cy="4" r="1.5" fill="#8a9fd9" opacity="0.6"/>
                                    <circle cx="11" cy="4" r="1.5" fill="#8a9fd9" opacity="0.6"/>
                                    <circle cx="7.5" cy="11" r="1.5" fill="#8a9fd9" opacity="0.6"/>
                                    <path d="M4,4 L11,4 L7.5,11 L4,4" stroke="#6b7db8" strokeWidth="0.3" opacity="0.5"/>
                                </>
                            )}
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill={`url(#tech-${pattern})`} />
                </svg>

                {/* Data flow animation */}
                {isActive && (
                    <div className="absolute inset-0">
                        <div className="absolute top-2 left-2 w-3 h-0.5 bg-gradient-to-r from-transparent via-[#6b7db8] to-transparent opacity-70 animate-pulse"
                             style={{ 
                                 animation: 'dataFlow 2s linear infinite',
                                 animationDelay: '0s'
                             }} />
                        <div className="absolute top-4 right-3 w-3 h-0.5 bg-gradient-to-r from-transparent via-[#8a9fd9] to-transparent opacity-70"
                             style={{ 
                                 animation: 'dataFlow 2.5s linear infinite',
                                 animationDelay: '0.8s'
                             }} />
                        <div className="absolute bottom-3 left-4 w-3 h-0.5 bg-gradient-to-r from-transparent via-[#b3c0de] to-transparent opacity-70"
                             style={{ 
                                 animation: 'dataFlow 3s linear infinite',
                                 animationDelay: '0.4s'
                             }} />
                    </div>
                )}
            </div>
        );
    };

    return (
        <section
            ref={sectionRef}
            className="relative flex flex-col items-center gap-20 w-full py-20 lg:py-28 bg-black overflow-hidden"
        >
            {/* Enhanced futuristic background */}
            <div className="absolute inset-0">
                {/* Quantum field following mouse */}
                <div 
                    className="absolute w-[500px] h-[500px] bg-gradient-radial from-[#6b7db8]/06 via-[#6b7db8]/03 to-transparent rounded-full blur-3xl transition-all duration-800 ease-out"
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
                        className={`absolute transition-all duration-300 ${
                            el.type === 'neural'
                                ? 'bg-gradient-to-br from-[#6b7db8]/70 to-[#8a9fd9]/50 rounded-full'
                                : el.type === 'data'
                                ? 'bg-gradient-to-tr from-[#8a9fd9]/60 to-[#b3c0de]/40 rounded-lg rotate-45'
                                : el.type === 'signal'
                                ? 'bg-gradient-to-br from-[#b3c0de]/50 to-[#ebf1ff]/30 rounded-sm rotate-12'
                                : el.type === 'quantum'
                                ? 'bg-gradient-to-tr from-[#ebf1ff]/40 to-[#6b7db8]/30 rounded-full'
                                : 'bg-[#6b7db8]/25 rounded-full'
                        }`}
                        style={{
                            left: `${el.x}%`,
                            top: `${el.y}%`,
                            width: `${el.size}px`,
                            height: `${el.size}px`,
                            opacity: el.opacity,
                            filter: `blur(${el.type === 'neural' ? '2px' : el.type === 'data' ? '1.5px' : el.type === 'signal' ? '1px' : el.type === 'quantum' ? '0.8px' : '1px'})`,
                            transform: el.type === 'neural'
                                ? `scale(${1 + Math.sin(neuralAnimation * 2 + el.id) * 0.5}) rotate(${el.angle * 180 / Math.PI}deg)`
                                : el.type === 'data'
                                ? `rotate(${el.angle * 180 / Math.PI + 45}deg) scale(${1 + Math.sin(neuralAnimation * 3 + el.id) * 0.4})`
                                : el.type === 'signal'
                                ? `rotate(${el.angle * 180 / Math.PI + 12}deg) scaleX(${1 + Math.sin(neuralAnimation * 4 + el.id) * 0.3})`
                                : el.type === 'quantum'
                                ? `scale(${1 + Math.sin(quantumField * 5 + el.id) * 0.6}) rotate(${el.angle * 180 / Math.PI}deg)`
                                : `scale(${1 + Math.sin(neuralAnimation + el.id) * 0.1})`
                        }}
                    />
                ))}
            </div>

            {/* Futuristic grid background */}
            <div className="absolute inset-0 opacity-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                        <pattern id="quantumGrid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 8 0 L 0 0 0 8" stroke="#6b7db8" strokeWidth="0.1" fill="none"/>
                            <circle cx="4" cy="4" r="0.4" fill="#8a9fd9" opacity="0.5"/>
                            <path d="M0,4 L8,4 M4,0 L4,8" stroke="#6b7db8" strokeWidth="0.05" opacity="0.3"/>
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#quantumGrid)" />
                </svg>
            </div>

            {/* Decorative quantum elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-16 right-16 w-40 h-40 border border-[#6b7db8]/12 rounded-full animate-ping-slow"></div>
                <div className="absolute bottom-20 left-20 w-28 h-28 border-2 border-[#8a9fd9]/08 rotate-45 animate-pulse"></div>
                <div className="absolute top-1/3 left-8 w-20 h-20 bg-gradient-to-br from-[#6b7db8]/06 to-transparent rounded-full animate-bounce-slow"></div>
                <div className="absolute bottom-1/4 right-1/3 w-24 h-24 border border-[#b3c0de]/15 rounded-full animate-spin-slow"></div>
                
                {/* Hexagonal quantum fields */}
                <div className="absolute top-24 left-1/4 w-16 h-16 opacity-15">
                    <Hexagon className="w-full h-full text-[#6b7db8] animate-pulse" />
                </div>
                <div className="absolute bottom-32 right-1/4 w-12 h-12 opacity-12">
                    <Hexagon className="w-full h-full text-[#8a9fd9] animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
            </div>

            {/* Enhanced Header Section */}
            <div className={`flex flex-col items-center gap-8 max-w-4xl relative z-10 transition-all duration-1500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}>
                {/* Enhanced badge */}
                <div className="inline-block relative">
                    <span className="px-10 py-5 bg-gradient-to-r from-[#6b7db8]/20 to-[#8a9fd9]/15 border-2 border-[#6b7db8]/40 text-[#6b7db8] uppercase text-base font-black tracking-[0.25em] rounded-3xl backdrop-blur-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6b7db8]/30 to-transparent animate-shimmer"></div>
                        <Binary className="w-6 h-6 mr-4 animate-pulse inline" />
                        The DNA of Our AI
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#6b7db8] rounded-full animate-ping"></div>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#8a9fd9] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    </span>
                </div>

                {/* Enhanced title */}
                <h2 className={`bg-gradient-to-r from-[#ebf1ff] via-[#b3c0de] to-[#ebf1ff] bg-clip-text text-transparent font-black text-5xl lg:text-7xl text-center tracking-tight leading-[1.1] mb-4 animate-gradient-x bg-400% transition-all duration-1200 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: '0.3s' }}>
                    Our Core Values
                </h2>

                {/* Enhanced description */}
                <p className={`font-light text-[#6b6b6b] text-xl lg:text-2xl text-center leading-relaxed max-w-3xl transition-all duration-1000 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: '0.5s' }}>
                    We work closely with our clients to understand their unique challenges
                    and deliver <span className="text-[#6b7db8] font-semibold">tailored solutions</span> that drive 
                    <span className="text-[#8a9fd9] font-semibold"> tangible results</span>.
                </p>

                {/* Quantum separator */}
                <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-6">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#6b7db8] animate-pulse"></div>
                        <Target className="w-6 h-6 text-[#6b7db8] animate-spin-slow" />
                        <div className="w-32 h-px bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9]"></div>
                        <Activity className="w-5 h-5 text-[#8a9fd9] animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <div className="w-16 h-px bg-gradient-to-r from-[#8a9fd9] to-transparent animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Enhanced Values Grid */}
            <div className="w-full max-w-7xl relative z-10">
                {/* Central quantum core */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-[#6b7db8]/15 to-[#8a9fd9]/10 rounded-full border border-[#6b7db8]/30 flex items-center justify-center z-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#6b7db8]/20 to-[#8a9fd9]/15 rounded-full border border-[#6b7db8]/40 flex items-center justify-center animate-pulse">
                        <Network className="w-8 h-8 text-[#6b7db8]" />
                    </div>
                    <div className="absolute inset-0 rounded-full border border-[#6b7db8]/15 animate-spin-slow"></div>
                </div>

                {/* Value cards in quantum formation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 relative">
                    {valueCards.map((card, index) => {
                        const isActive = activeCard === index;
                        
                        return (
                            <div
                                key={index}
                                className={`group relative transition-all duration-800 cursor-pointer ${
                                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                                } ${index === 4 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
                                style={{ 
                                    transitionDelay: `${0.7 + index * 0.15}s`
                                }}
                                onMouseEnter={() => setActiveCard(index)}
                                onMouseLeave={() => setActiveCard(null)}
                            >
                                {/* Quantum field container */}
                                <div className={`relative bg-gradient-to-br from-gray-900/95 to-gray-800/90 border-2 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-700 rounded-3xl hover:-translate-y-2 hover:scale-105 ${
                                    isActive 
                                        ? `border-[${card.accent}]/60 shadow-3xl` 
                                        : 'border-[#6b7db8]/25 hover:border-[#6b7db8]/40'
                                }`} 
                                style={{ 
                                    boxShadow: isActive 
                                        ? `0 25px 50px -12px ${card.accent}40, 0 0 0 1px ${card.accent}30`
                                        : '',
                                }}>
                                    
                                    {/* Card glow effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 ${isActive ? 'opacity-12' : ''} transition-opacity duration-700 rounded-3xl`}></div>
                                    
                                    {/* Tech pattern background */}
                                    {renderTechPattern(card.techPattern, isActive)}

                                    <div className="relative p-8 lg:p-10 z-10 flex flex-col gap-6">
                                        {/* Enhanced icon section */}
                                        <div className="flex items-center justify-between">
                                            <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${card.color} p-5 transition-all duration-500 ${
                                                isActive ? 'scale-110 shadow-lg' : ''
                                            }`} style={{ boxShadow: isActive ? `0 0 30px ${card.accent}40` : 'none' }}>
                                                <div className="text-white w-full h-full flex items-center justify-center">
                                                    {card.icon}
                                                </div>
                                                
                                                {/* Quantum orbital rings */}
                                                {isActive && (
                                                    <>
                                                        <div className="absolute inset-0 rounded-2xl border-2 border-current animate-ping opacity-30"></div>
                                                        <div className="absolute inset-2 rounded-xl border border-current animate-ping opacity-40" style={{ animationDelay: '0.5s' }}></div>
                                                    </>
                                                )}
                                            </div>

                                            {/* Metrics display */}
                                            <div className="text-right">
                                                <div className="text-xs text-[#6b6b6b] font-mono mb-1">{card.metrics.label}</div>
                                                <div className={`text-lg font-black bg-gradient-to-r ${card.color} bg-clip-text text-transparent transition-transform duration-300 ${
                                                    isActive ? 'scale-110' : ''
                                                }`}>
                                                    {card.metrics.value}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enhanced content */}
                                        <div className="flex flex-col gap-4">
                                            <h3 className={`font-black text-2xl lg:text-3xl bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent transition-all duration-500 leading-tight ${
                                                isActive ? 'scale-105' : ''
                                            }`}>
                                                {card.title}
                                            </h3>
                                            
                                            <p className="font-light text-[#6b6b6b] text-base lg:text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                                {card.description}
                                            </p>
                                        </div>

                                        {/* Quantum progress bar */}
                                        <div className="mt-4">
                                            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full bg-gradient-to-r ${card.color} transition-all duration-1000 rounded-full`}
                                                    style={{ 
                                                        width: isActive ? '100%' : '70%',
                                                        filter: isActive ? `drop-shadow(0 0 5px ${card.accent})` : 'none'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Connection indicator */}
                                        {isActive && (
                                            <div className="absolute top-1/2 left-1/2 w-8 h-8 pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}>
                                                <div className={`w-2 h-2 rounded-full animate-ping`} style={{ backgroundColor: card.accent }}></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Enhanced CSS animations */}
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes dataFlow {
                    0% { transform: translateX(-100px) scaleX(0); }
                    50% { transform: translateX(0px) scaleX(1); }
                    100% { transform: translateX(100px) scaleX(0); }
                }
                
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 1; }
                    75%, 100% { transform: scale(2.5); opacity: 0; }
                }
                
                @keyframes quantumPulse {
                    0% { transform: scale(1) rotate(0deg); opacity: 0.6; }
                    50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
                    100% { transform: scale(1) rotate(360deg); opacity: 0.6; }
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
                
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
                
                .animate-ping-slow {
                    animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                
                .animate-quantum-pulse {
                    animation: quantumPulse 6s ease-in-out infinite;
                }
                
                .bg-400% {
                    background-size: 400% 400%;
                }
                
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
                
                .shadow-3xl {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.5);
                }
                
                /* Quantum field effects */
                .quantum-field::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, transparent 30%, rgba(107, 125, 184, 0.1) 50%, transparent 70%);
                    animation: quantumSweep 8s linear infinite;
                    pointer-events: none;
                }
                
                @keyframes quantumSweep {
                    0% { transform: translateX(-100%) translateY(-100%); }
                    100% { transform: translateX(100%) translateY(100%); }
                }
                
                /* Holographic text effect */
                .holographic-text {
                    background: linear-gradient(45deg, #ebf1ff, #b3c0de, #6b7db8, #8a9fd9);
                    background-size: 400% 400%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: holographicShift 8s ease-in-out infinite;
                }
                
                @keyframes holographicShift {
                    0%, 100% { background-position: 0% 50%; }
                    25% { background-position: 100% 50%; }
                    50% { background-position: 50% 100%; }
                    75% { background-position: 50% 0%; }
                }
                
                /* Quantum ripple effect */
                .quantum-ripple {
                    position: relative;
                    overflow: hidden;
                }
                
                .quantum-ripple::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(107, 125, 184, 0.3) 0%, transparent 70%);
                    transform: translate(-50%, -50%);
                    animation: quantumRipple 4s ease-out infinite;
                }
                
                @keyframes quantumRipple {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 300px;
                        height: 300px;
                        opacity: 0;
                    }
                }
                
                /* Neural network animation */
                .neural-network {
                    position: relative;
                }
                
                .neural-network::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: 
                        radial-gradient(circle at 20% 20%, rgba(107, 125, 184, 0.1) 1px, transparent 1px),
                        radial-gradient(circle at 80% 20%, rgba(138, 159, 217, 0.1) 1px, transparent 1px),
                        radial-gradient(circle at 20% 80%, rgba(179, 192, 222, 0.1) 1px, transparent 1px),
                        radial-gradient(circle at 80% 80%, rgba(107, 125, 184, 0.1) 1px, transparent 1px);
                    background-size: 40px 40px;
                    animation: neuralPulse 6s ease-in-out infinite;
                    pointer-events: none;
                }
                
                @keyframes neuralPulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.05); }
                }
                
                /* Particle system */
                .particle-system {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }
                
                .particle {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: #6b7db8;
                    border-radius: 50%;
                    animation: particleFloat 20s linear infinite;
                }
                
                @keyframes particleFloat {
                    0% {
                        transform: translateY(100vh) translateX(0px);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) translateX(100px);
                        opacity: 0;
                    }
                }
                
                /* Quantum entanglement lines */
                .quantum-entanglement {
                    stroke-dasharray: 5,5;
                    animation: quantumEntangle 3s linear infinite;
                }
                
                @keyframes quantumEntangle {
                    0% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: 10; }
                }
                
                /* Hologram glitch effect */
                .hologram-glitch {
                    animation: hologramGlitch 10s linear infinite;
                }
                
                @keyframes hologramGlitch {
                    0%, 90%, 100% { transform: translate(0, 0); }
                    91% { transform: translate(-2px, 0); }
                    92% { transform: translate(2px, 0); }
                    93% { transform: translate(-1px, 0); }
                    94% { transform: translate(1px, 0); }
                    95% { transform: translate(0, 0); }
                }
                
                /* Energy flow animation */
                .energy-flow {
                    background: linear-gradient(90deg, 
                        transparent 0%, 
                        rgba(107, 125, 184, 0.5) 50%, 
                        transparent 100%);
                    animation: energyFlow 2s ease-in-out infinite;
                }
                
                @keyframes energyFlow {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </section>
    );
}