"use client";

import {
    Brain,
    Eye,
    Bot,
    MessageSquare,
    Code2,
    Cpu,
    Sparkles,
    ArrowRight,
    Users,
    Target,
    BarChart3,
    Zap,
    Activity,
    Circle,
    Hexagon
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
    type: 'neural' | 'particle' | 'energy' | 'data';
    angle: number;
    pulse: number;
};

interface HexModuleProps {
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

export default function ExpertiseDomainsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [activeModule, setActiveModule] = useState<number | null>(null);
    const [neuralAnimation, setNeuralAnimation] = useState(0);
    const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Synthi AI's specialized AI expertise domains
    const expertiseDomains = [
        {
            id: 1,
            title: "Artificial Intelligence",
            subtitle: "Machine Learning & Deep Learning",
            description: "Development of cutting-edge AI algorithms using deep neural networks, reinforcement learning, and advanced optimization techniques to create intelligent adaptive systems that learn and evolve.",
            icon: <Brain className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&auto=format",
            technologies: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "CUDA", "OpenAI"],
            applications: ["Predictive models", "Neural networks", "Machine learning", "Generative AI", "Optimization"],
            color: "from-[#6b7db8] to-[#8a9fd9]",
            bgGlow: "shadow-[#6b7db8]/20",
            accentColor: "#6b7db8",
            stats: { models: "47+", accuracy: "98.5%", datasets: "500TB" },
            specialties: ["Deep Learning", "Neural Networks", "AutoML", "Transfer Learning"],
            hexColor: "#6b7db8"
        },
        {
            id: 2,
            title: "Computer Vision",
            subtitle: "Advanced Image Analysis & Recognition",
            description: "Advanced computer vision solutions for object detection, facial recognition, medical analysis, and intelligent surveillance using the latest CNN and transformer algorithms.",
            icon: <Eye className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&auto=format",
            technologies: ["OpenCV", "YOLO", "MediaPipe", "Detectron2", "TensorRT", "ONNX"],
            applications: ["Object detection", "Facial recognition", "Intelligent OCR", "Medical imaging", "Smart surveillance"],
            color: "from-[#6b7db8] to-[#b3c0de]",
            bgGlow: "shadow-[#6b7db8]/20",
            accentColor: "#6b7db8",
            stats: { fps: "120+", precision: "99.2%", objects: "1000+" },
            specialties: ["Object Detection", "Image Segmentation", "Face Recognition", "Medical Imaging"],
            hexColor: "#7c8dca"
        },
        {
            id: 3,
            title: "Intelligent Robotics",
            subtitle: "Autonomous Robotic Systems",
            description: "Design and development of intelligent robots integrating AI, autonomous navigation, object manipulation, and human-machine interaction for Industry 4.0 and services.",
            icon: <Bot className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format",
            technologies: ["ROS2", "Gazebo", "MoveIt", "Navigation2", "Arduino", "Raspberry Pi"],
            applications: ["Industrial robots", "Autonomous navigation", "Object manipulation", "Intelligent drones", "Collaborative robots"],
            color: "from-[#8a9fd9] to-[#6b7db8]",
            bgGlow: "shadow-[#8a9fd9]/20",
            accentColor: "#8a9fd9",
            stats: { robots: "35+", autonomy: "95%", industries: "15" },
            specialties: ["Autonomous Navigation", "Robotic Manipulation", "SLAM", "Path Planning"],
            hexColor: "#8a9fd9"
        },
        {
            id: 4,
            title: "NLP & Language AI",
            subtitle: "Natural Language Processing",
            description: "Natural language processing solutions for understanding, generation, and text analysis. Intelligent chatbots, automatic translation, and sentiment analysis powered by transformer models.",
            icon: <MessageSquare className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop&auto=format",
            technologies: ["Transformers", "BERT", "GPT", "spaCy", "Hugging Face", "LangChain"],
            applications: ["AI chatbots", "Sentiment analysis", "Auto translation", "Text generation", "Entity extraction"],
            color: "from-[#b3c0de] to-[#6b7db8]",
            bgGlow: "shadow-[#b3c0de]/20",
            accentColor: "#b3c0de",
            stats: { languages: "25+", accuracy: "96.8%", queries: "1M+" },
            specialties: ["Conversational AI", "Text Generation", "Sentiment Analysis", "Named Entity Recognition"],
            hexColor: "#b3c0de"
        },
        {
            id: 5,
            title: "AI Software Engineering",
            subtitle: "Architecture & AI Development",
            description: "Development of intelligent applications with microservices architecture, MLOps, edge computing deployment, and AI API integration in complex systems.",
            icon: <Code2 className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&auto=format",
            technologies: ["Python", "FastAPI", "Docker", "Kubernetes", "MLflow", "Apache Kafka"],
            applications: ["MLOps pipelines", "AI APIs", "Edge computing", "Microservices", "AI monitoring"],
            color: "from-[#6b7db8] to-[#ebf1ff]",
            bgGlow: "shadow-[#6b7db8]/20",
            accentColor: "#6b7db8",
            stats: { apis: "200+", uptime: "99.9%", deployments: "5000+" },
            specialties: ["MLOps", "AI APIs", "Edge Deployment", "Model Serving"],
            hexColor: "#6b7db8"
        },
        {
            id: 6,
            title: "Data Science & Analytics",
            subtitle: "Intelligent Data Science",
            description: "Advanced analysis of massive datasets, discovery of hidden patterns, business predictions, and intelligent dashboards to transform your data into strategic insights.",
            icon: <BarChart3 className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&auto=format",
            technologies: ["Pandas", "NumPy", "Apache Spark", "Databricks", "Power BI", "Plotly"],
            applications: ["Business predictions", "Data mining", "AI visualization", "Real-time analytics", "Intelligent KPIs"],
            color: "from-[#8a9fd9] to-[#b3c0de]",
            bgGlow: "shadow-[#8a9fd9]/20",
            accentColor: "#8a9fd9",
            stats: { insights: "10K+", models: "150+", ROI: "340%" },
            specialties: ["Predictive Analytics", "Real-time Processing", "Business Intelligence", "Data Mining"],
            hexColor: "#9fb5e5"
        }
    ];

    // Mouse tracking for interactive effects
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

    // Advanced floating elements animation
    useEffect(() => {
        const generateFloatingElements = (): void => {
            const elements: FloatingElement[] = [];
            for (let i = 0; i < 50; i++) {
                elements.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 12 + 3,
                    speed: Math.random() * 3 + 0.2,
                    opacity: Math.random() * 0.8 + 0.1,
                    angle: Math.random() * Math.PI * 2,
                    pulse: Math.random() * 2 + 1,
                    type: Math.random() > 0.6 ? (Math.random() > 0.5 ? 'neural' : Math.random() > 0.5 ? 'energy' : 'data') : 'particle'
                });
            }
            setFloatingElements(elements);
        };

        generateFloatingElements();

        const animateElements = (): void => {
            const time = Date.now() * 0.001;
            setNeuralAnimation(time);

            setFloatingElements(prev =>
                prev.map(el => ({
                    ...el,
                    y: (el.y + el.speed * 0.03) % 100,
                    x: el.x + Math.sin(time * el.pulse + el.id + el.angle) * 0.02,
                    angle: el.angle + 0.008,
                    opacity: el.type === 'neural'
                        ? 0.3 + Math.sin(time * 2 + el.id) * 0.4 + 0.3
                        : el.type === 'energy'
                        ? 0.2 + Math.sin(time * 3 + el.id * 0.7) * 0.3 + 0.4
                        : el.type === 'data'
                        ? 0.1 + Math.sin(time * 1.5 + el.id * 1.2) * 0.4 + 0.4
                        : el.opacity
                }))
            );
        };

        const interval = setInterval(animateElements, 40);
        return () => clearInterval(interval);
    }, []);

    const HexModule: React.FC<HexModuleProps> = ({
        children,
        className,
        style,
        onMouseEnter,
        onMouseLeave,
        isActive
    }) => (
        <div
            className={`${className} ${isActive ? 'hex-active' : ''}`}
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

    // Hexagonal holographic pattern
    const renderHexagonalPattern = (domain: any, isActive: boolean): JSX.Element => {
        return (
            <div className="absolute inset-0 overflow-hidden">
                {/* Hexagonal grid */}
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
                    <defs>
                        <pattern id={`hexGrid-${domain.id}`} x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                            <polygon points="10,0 20,5.77 20,11.55 10,17.32 0,11.55 0,5.77" 
                                     stroke={domain.hexColor} 
                                     strokeWidth="0.3" 
                                     fill="none" 
                                     opacity={isActive ? "0.8" : "0.4"} />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill={`url(#hexGrid-${domain.id})`} />
                </svg>

                {/* Data stream lines */}
                <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 100 100">
                    {isActive && (
                        <>
                            <line x1="0" y1="20" x2="100" y2="25" stroke={domain.hexColor} strokeWidth="0.5" opacity="0.7">
                                <animate attributeName="stroke-dasharray" values="0,10;5,5;10,0" dur="2s" repeatCount="indefinite"/>
                            </line>
                            <line x1="0" y1="50" x2="100" y2="55" stroke={domain.hexColor} strokeWidth="0.3" opacity="0.5">
                                <animate attributeName="stroke-dasharray" values="0,8;4,4;8,0" dur="3s" repeatCount="indefinite"/>
                            </line>
                            <line x1="0" y1="80" x2="100" y2="75" stroke={domain.hexColor} strokeWidth="0.4" opacity="0.6">
                                <animate attributeName="stroke-dasharray" values="0,12;6,6;12,0" dur="2.5s" repeatCount="indefinite"/>
                            </line>
                        </>
                    )}
                </svg>
            </div>
        );
    };

    return (
        <section ref={sectionRef} className="relative py-20 lg:py-32 bg-black overflow-hidden">
            {/* Enhanced background with futuristic elements */}
            <div className="absolute inset-0">
                {/* Dynamic holographic grid */}
                <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <defs>
                            <pattern id="holoGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                <rect width="10" height="10" stroke="#6b7db8" strokeWidth="0.1" fill="none" opacity="0.3"/>
                                <circle cx="5" cy="5" r="0.5" fill="#8a9fd9" opacity="0.4"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#holoGrid)" />
                    </svg>
                </div>

                {/* Cursor-following holographic field */}
                <div 
                    className="absolute w-[500px] h-[500px] bg-gradient-radial from-[#6b7db8]/15 via-[#6b7db8]/5 to-transparent rounded-full blur-3xl transition-all duration-700 ease-out"
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
                                : el.type === 'energy'
                                ? 'bg-gradient-to-tr from-[#8a9fd9]/60 to-[#b3c0de]/40 rounded-lg rotate-45'
                                : el.type === 'data'
                                ? 'bg-gradient-to-br from-[#b3c0de]/50 to-[#ebf1ff]/30 rounded-sm rotate-12'
                                : 'bg-[#6b7db8]/25 rounded-full'
                        }`}
                        style={{
                            left: `${el.x}%`,
                            top: `${el.y}%`,
                            width: `${el.size}px`,
                            height: `${el.size}px`,
                            opacity: el.opacity,
                            filter: `blur(${el.type === 'neural' ? '2px' : el.type === 'energy' ? '1px' : el.type === 'data' ? '0.5px' : '1px'})`,
                            transform: el.type === 'neural'
                                ? `scale(${1 + Math.sin(neuralAnimation * 2 + el.id) * 0.5}) rotate(${el.angle * 180 / Math.PI}deg)`
                                : el.type === 'energy'
                                ? `rotate(${el.angle * 180 / Math.PI + 45}deg) scale(${1 + Math.sin(neuralAnimation * 3 + el.id) * 0.3})`
                                : el.type === 'data'
                                ? `rotate(${el.angle * 180 / Math.PI + 12}deg) scaleX(${1 + Math.sin(neuralAnimation * 1.5 + el.id) * 0.2})`
                                : `scale(${1 + Math.sin(neuralAnimation + el.id) * 0.1})`
                        }}
                    />
                ))}
            </div>

            {/* Holographic neural network */}
            <div className="absolute inset-0 opacity-6">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    {[...Array(15)].map((_, i) => (
                        <g key={i}>
                            <path
                                d={`M${3 + i * 6.5},${10 + Math.sin(neuralAnimation + i * 0.3) * 8} 
                                    Q${50 + Math.cos(neuralAnimation + i * 0.8) * 20},${50 + Math.sin(neuralAnimation * 1.2 + i) * 25} 
                                    ${97 - i * 6.2},${90 + Math.cos(neuralAnimation + i * 0.6) * 10}`}
                                stroke="#6b7db8"
                                strokeWidth="0.1"
                                fill="none"
                                opacity={0.4 + Math.sin(neuralAnimation * 2.5 + i) * 0.3}
                            />
                            <circle
                                cx={50 + Math.cos(neuralAnimation + i * 0.8) * 20}
                                cy={50 + Math.sin(neuralAnimation * 1.2 + i) * 25}
                                r="0.8"
                                fill="#8a9fd9"
                                opacity={0.7 + Math.sin(neuralAnimation * 4 + i) * 0.3}
                            />
                        </g>
                    ))}
                </svg>
            </div>

            {/* Geometric holographic elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-16 right-16 w-40 h-40 border border-[#6b7db8]/15 rotate-45 animate-spin-slow"></div>
                <div className="absolute bottom-24 left-24 w-32 h-32 border-2 border-[#8a9fd9]/10 rotate-12 animate-pulse"></div>
                <div className="absolute top-1/2 left-8 w-20 h-20 bg-gradient-to-br from-[#6b7db8]/8 to-transparent rotate-45 animate-bounce-slow"></div>
                <div className="absolute top-1/4 right-1/4 w-28 h-28 border border-[#b3c0de]/20 rounded-full animate-ping-slow"></div>
                
                {/* Hexagonal decorations */}
                <div className="absolute top-32 left-1/3 w-16 h-16 opacity-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
                        <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" stroke="#6b7db8" strokeWidth="2" fill="none"/>
                    </svg>
                </div>
                <div className="absolute bottom-40 right-1/4 w-12 h-12 opacity-15">
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse" style={{ animationDelay: '1s' }}>
                        <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" stroke="#8a9fd9" strokeWidth="2" fill="none"/>
                    </svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Enhanced Header Section */}
                <div className={`text-center mb-20 lg:mb-28 transition-all duration-1500 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}>
                    <div className="inline-block mb-10 relative">
                        <Badge className="px-10 py-5 bg-gradient-to-r from-[#6b7db8]/20 to-[#8a9fd9]/15 border-2 border-[#6b7db8]/40 text-[#6b7db8] uppercase text-base font-black tracking-[0.25em] rounded-3xl backdrop-blur-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6b7db8]/30 to-transparent animate-shimmer"></div>
                            <Sparkles className="w-6 h-6 mr-4 animate-pulse" />
                            AI Excellence & Innovation
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#6b7db8] rounded-full animate-ping"></div>
                            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#8a9fd9] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        </Badge>
                    </div>

                    <h2 className="text-6xl lg:text-8xl xl:text-9xl font-black leading-[0.85] mb-12 tracking-tighter">
                        <span className="block bg-gradient-to-r from-[#ebf1ff] via-[#b3c0de] to-[#ebf1ff] bg-clip-text text-transparent animate-gradient-x bg-400%">
                            Our AI Expertise
                        </span>
                        <span className="block bg-gradient-to-r from-[#6b7db8] via-[#8a9fd9] to-[#6b7db8] bg-clip-text text-transparent animate-gradient-x bg-400% mt-4">
                            Domains
                        </span>
                    </h2>

                    <p className="text-2xl lg:text-3xl text-[#6b6b6b] leading-relaxed max-w-5xl mx-auto font-light">
                        Synthi AI masters the most advanced artificial intelligence technologies to create
                        <span className="text-[#6b7db8] font-semibold"> innovative solutions</span> that transform industries and shape 
                        <span className="text-[#8a9fd9] font-semibold"> Africa&apos;s digital future</span>.
                    </p>

                    {/* Enhanced animated separator */}
                    <div className="flex justify-center mt-16">
                        <div className="flex items-center space-x-6">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#6b7db8] animate-pulse"></div>
                            <Hexagon className="w-6 h-6 text-[#6b7db8] animate-spin-slow" />
                            <div className="w-32 h-px bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9]"></div>
                            <Circle className="w-4 h-4 text-[#8a9fd9] animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <div className="w-16 h-px bg-gradient-to-r from-[#8a9fd9] to-transparent animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Futuristic Hexagonal Modules Grid */}
                <div className="relative mb-20">
                    {/* Central connection hub */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 opacity-30 z-10">
                        <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
                            <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" stroke="#6b7db8" strokeWidth="1" fill="#6b7db8" fillOpacity="0.1"/>
                            <circle cx="50" cy="50" r="8" fill="#8a9fd9" opacity="0.8" />
                        </svg>
                    </div>

                    {/* Hexagonal modules arrangement */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16">
                        {expertiseDomains.map((domain, index) => {
                            const isActive = activeModule === domain.id;
                            
                            return (
                                <HexModule
                                    key={domain.id}
                                    className={`group relative transition-all duration-800 hover:scale-105 cursor-pointer ${
                                        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                                    }`}
                                    style={{ 
                                        transitionDelay: `${index * 0.2}s`
                                    }}
                                    onMouseEnter={() => setActiveModule(domain.id)}
                                    onMouseLeave={() => setActiveModule(null)}
                                    isActive={isActive}
                                >
                                    {/* Hexagonal container */}
                                    <div className="relative">
                                        {/* Main hexagonal module */}
                                        <div className="relative w-full aspect-square max-w-md mx-auto">
                                            {/* Hexagonal border */}
                                            <svg 
                                                viewBox="0 0 200 200" 
                                                className="absolute inset-0 w-full h-full z-10"
                                                style={{ filter: isActive ? `drop-shadow(0 0 20px ${domain.hexColor}40)` : 'none' }}
                                            >
                                                <defs>
                                                    <linearGradient id={`hexGrad-${domain.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor={domain.hexColor} stopOpacity="0.8"/>
                                                        <stop offset="50%" stopColor={domain.hexColor} stopOpacity="0.6"/>
                                                        <stop offset="100%" stopColor={domain.hexColor} stopOpacity="0.9"/>
                                                    </linearGradient>
                                                    <filter id={`glow-${domain.id}`}>
                                                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                                        <feMerge> 
                                                            <feMergeNode in="coloredBlur"/>
                                                            <feMergeNode in="SourceGraphic"/>
                                                        </feMerge>
                                                    </filter>
                                                </defs>
                                                
                                                {/* Outer hexagonal glow */}
                                                <polygon 
                                                    points="100,20 160,60 160,140 100,180 40,140 40,60" 
                                                    stroke={domain.hexColor}
                                                    strokeWidth="0.5"
                                                    fill="none"
                                                    opacity="0.3"
                                                    filter={`url(#glow-${domain.id})`}
                                                    className={isActive ? 'animate-pulse' : ''}
                                                />
                                                
                                                {/* Main hexagonal border */}
                                                <polygon 
                                                    points="100,25 155,57.5 155,137.5 100,175 45,137.5 45,57.5" 
                                                    stroke={`url(#hexGrad-${domain.id})`}
                                                    strokeWidth={isActive ? "2" : "1.5"}
                                                    fill={domain.hexColor}
                                                    fillOpacity={isActive ? "0.15" : "0.08"}
                                                    className="transition-all duration-500"
                                                />
                                                
                                                {/* Inner hexagonal detail */}
                                                <polygon 
                                                    points="100,35 145,62.5 145,132.5 100,165 55,132.5 55,62.5" 
                                                    stroke={domain.hexColor}
                                                    strokeWidth="0.5"
                                                    fill="none"
                                                    opacity={isActive ? "0.8" : "0.4"}
                                                    className="transition-all duration-500"
                                                />
                                            </svg>

                                            {/* Background patterns */}
                                            {renderHexagonalPattern(domain, isActive)}

                                            {/* Content container */}
                                            <div className="absolute inset-6 z-20 flex flex-col justify-center items-center text-center p-6">
                                                {/* Icon section */}
                                                <div className="mb-6 relative">
                                                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${domain.color} p-5 backdrop-blur-sm transition-all duration-500 ${
                                                        isActive ? 'scale-110 shadow-lg' : ''
                                                    }`} style={{ boxShadow: isActive ? `0 0 30px ${domain.hexColor}40` : 'none' }}>
                                                        <div className="text-white w-full h-full flex items-center justify-center">
                                                            {domain.icon}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Orbital rings */}
                                                    <div className={`absolute inset-0 rounded-full border border-[#6b7db8]/30 animate-spin-slow ${isActive ? 'opacity-60' : 'opacity-20'}`}></div>
                                                    <div className={`absolute inset-2 rounded-full border border-[#8a9fd9]/20 animate-spin-slow ${isActive ? 'opacity-40' : 'opacity-10'}`} style={{ animationDirection: 'reverse', animationDuration: '30s' }}></div>
                                                </div>

                                                {/* Title */}
                                                <h3 className={`text-lg lg:text-xl font-black bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent mb-2 transition-all duration-500 leading-tight ${
                                                    isActive ? 'scale-105' : ''
                                                }`}>
                                                    {domain.title}
                                                </h3>

                                                {/* Subtitle with accent line */}
                                                <div className="flex items-center justify-center mb-4">
                                                    <div className={`w-8 h-px bg-gradient-to-r from-transparent to-[#6b7db8] mr-2 transition-all duration-500 ${
                                                        isActive ? 'w-12' : ''
                                                    }`}></div>
                                                    <p className="text-[#6b7db8] text-xs font-bold uppercase tracking-wider">
                                                        {domain.subtitle.split(' ').slice(0, 2).join(' ')}
                                                    </p>
                                                    <div className={`w-8 h-px bg-gradient-to-l from-transparent to-[#6b7db8] ml-2 transition-all duration-500 ${
                                                        isActive ? 'w-12' : ''
                                                    }`}></div>
                                                </div>

                                                {/* Stats in compact format */}
                                                <div className="grid grid-cols-3 gap-2 mb-4 w-full">
                                                    {Object.entries(domain.stats).map(([key, value], statIndex) => (
                                                        <div key={statIndex} className="text-center">
                                                            <div className={`text-sm font-black bg-gradient-to-r ${domain.color} bg-clip-text text-transparent transition-transform duration-300 ${
                                                                isActive ? 'scale-110' : ''
                                                            }`}>
                                                                {value}
                                                            </div>
                                                            <div className="text-[8px] text-[#6b6b6b] uppercase tracking-wider font-medium">
                                                                {key}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Tech tags */}
                                                <div className="flex flex-wrap justify-center gap-1 mb-4">
                                                    {domain.technologies.slice(0, 3).map((tech, techIndex) => (
                                                        <Badge
                                                            key={techIndex}
                                                            className="px-2 py-1 bg-gradient-to-r from-[#6b7db8]/25 to-[#8a9fd9]/15 text-[#6b7db8] border border-[#6b7db8]/40 text-[10px] rounded-lg font-bold backdrop-blur-sm transition-all duration-300 hover:scale-105"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                    {domain.technologies.length > 3 && (
                                                        <Badge className="px-2 py-1 bg-gradient-to-r from-gray-700/40 to-gray-600/20 text-gray-300 text-[10px] rounded-lg border border-gray-600/30 font-bold">
                                                            +{domain.technologies.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Action indicator */}
                                                <div className={`transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                                                    <ArrowRight className="w-4 h-4 text-[#6b7db8] animate-pulse" />
                                                </div>
                                            </div>

                                            {/* Data flow lines for active state */}
                                            {isActive && (
                                                <div className="absolute inset-0 z-15 pointer-events-none">
                                                    <svg viewBox="0 0 200 200" className="w-full h-full">
                                                        <path 
                                                            d="M50,100 Q100,50 150,100" 
                                                            stroke={domain.hexColor} 
                                                            strokeWidth="1" 
                                                            fill="none" 
                                                            opacity="0.6"
                                                            strokeDasharray="5,5"
                                                        >
                                                            <animate attributeName="stroke-dashoffset" values="0;-10" dur="1s" repeatCount="indefinite"/>
                                                        </path>
                                                        <path 
                                                            d="M50,100 Q100,150 150,100" 
                                                            stroke={domain.hexColor} 
                                                            strokeWidth="1" 
                                                            fill="none" 
                                                            opacity="0.4"
                                                            strokeDasharray="3,7"
                                                        >
                                                            <animate attributeName="stroke-dashoffset" values="0;10" dur="1.5s" repeatCount="indefinite"/>
                                                        </path>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Detailed info panel that appears on hover */}
                                        <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-6 w-80 bg-gradient-to-br from-gray-900/95 to-gray-800/90 border border-[#6b7db8]/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl transition-all duration-700 z-30 ${
                                            isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                                        }`} style={{ 
                                            boxShadow: isActive ? `0 20px 40px -12px ${domain.hexColor}30` : 'none'
                                        }}>
                                            {/* Panel background pattern */}
                                            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                                <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-5`}></div>
                                                {renderHexagonalPattern(domain, true)}
                                            </div>

                                            <div className="relative z-10">
                                                {/* Description */}
                                                <p className="text-[#6b6b6b] text-sm leading-relaxed mb-6 font-light">
                                                    {domain.description}
                                                </p>

                                                {/* Specialties */}
                                                <div className="mb-6">
                                                    <h4 className="text-white text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2">
                                                        <Target className="w-3 h-3 text-[#6b7db8]" />
                                                        Core Specialties
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {domain.specialties.map((specialty, specIndex) => (
                                                            <div key={specIndex} className="flex items-center gap-2 text-xs text-[#6b6b6b]">
                                                                <div className={`w-1.5 h-1.5 bg-gradient-to-r ${domain.color} rounded-full`}></div>
                                                                <span className="font-medium">{specialty}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* All Technologies */}
                                                <div className="mb-6">
                                                    <h4 className="text-white text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2">
                                                        <Cpu className="w-3 h-3 text-[#6b7db8]" />
                                                        Full Tech Stack
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {domain.technologies.map((tech, techIndex) => (
                                                            <Badge
                                                                key={techIndex}
                                                                className="px-2 py-1 bg-gradient-to-r from-[#6b7db8]/20 to-[#8a9fd9]/10 text-[#6b7db8] border border-[#6b7db8]/30 text-xs rounded-lg hover:scale-105 transition-all duration-200 font-semibold"
                                                            >
                                                                {tech}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Applications */}
                                                <div className="mb-6">
                                                    <h4 className="text-white text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2">
                                                        <Activity className="w-3 h-3 text-[#6b7db8]" />
                                                        Applications
                                                    </h4>
                                                    <div className="grid grid-cols-1 gap-1">
                                                        {domain.applications.map((app, appIndex) => (
                                                            <div key={appIndex} className="flex items-center gap-2 text-xs text-[#6b6b6b]">
                                                                <div className="w-1 h-1 bg-[#8a9fd9] rounded-full"></div>
                                                                <span className="font-medium">{app}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Explore button */}
                                                <Button 
                                                    variant="outline" 
                                                    className="w-full py-3 text-sm font-bold group/btn relative overflow-hidden"
                                                >
                                                    <div className={`absolute inset-0 bg-gradient-to-r ${domain.color} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}></div>
                                                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-white transition-colors duration-300">
                                                        Explore {domain.title}
                                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </HexModule>
                            );
                        })}
                    </div>
                </div>

                {/* Enhanced Call to Action Section */}
                <div className={`text-center transition-all duration-1200 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`} style={{ transitionDelay: '1s' }}>
                    <div className="relative inline-block mb-8">
                        <Button className="px-16 py-8 text-xl font-black group/cta relative overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#6b7db8] via-[#8a9fd9] to-[#b3c0de] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500"></div>
                            <span className="relative z-10 flex items-center gap-4">
                                <Users className="w-8 h-8 group-hover/cta:rotate-12 transition-transform duration-300" />
                                Discuss Your AI Project
                                <Zap className="w-8 h-8 group-hover/cta:scale-110 transition-transform duration-300" />
                            </span>
                        </Button>
                        
                        {/* Enhanced decorative elements */}
                        <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-[#6b7db8]/60 animate-pulse"></div>
                        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-[#8a9fd9]/60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#6b7db8] rounded-full animate-ping"></div>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#8a9fd9] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    </div>

                    <p className="text-[#6b6b6b] text-xl leading-relaxed">
                        Ready to transform your business with cutting-edge AI?
                        <br />
                        <span className="text-[#6b7db8] font-bold">Let&apos;s build the future together.</span>
                    </p>

                    {/* Final decorative separator */}
                    <div className="flex justify-center mt-12">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#6b7db8]"></div>
                            <Hexagon className="w-4 h-4 text-[#6b7db8] animate-pulse" />
                            <div className="w-40 h-px bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9]"></div>
                            <Circle className="w-3 h-3 text-[#8a9fd9] animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <div className="w-20 h-px bg-gradient-to-r from-[#8a9fd9] to-transparent"></div>
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
                    0%, 100% { transform: translateY(0px) rotate(45deg); }
                    50% { transform: translateY(-12px) rotate(45deg); }
                }
                
                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 1; }
                    75%, 100% { transform: scale(2.5); opacity: 0; }
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
                    animation: bounce-slow 5s ease-in-out infinite;
                }
                
                .animate-ping-slow {
                    animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                
                .bg-400% {
                    background-size: 400% 400%;
                }
                
                .hex-active {
                    transform: scale(1.05);
                }
                
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
            `}</style>
        </section>
    );
}