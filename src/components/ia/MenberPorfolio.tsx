"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Linkedin,
    Twitter,
    Github,
    Mail,
    MapPin,
    Calendar,
    Award,
    Users,
    Code,
    Brain,
    Rocket,
    Star,
    Download,
    ExternalLink,
    Play,
    BookOpen
} from "lucide-react";
import React from "react";

// Extended team member data
const teamMembersData = {
    "adam-dongmo": {
        id: 1,
        slug: "adam-dongmo",
        name: "Vincess Dongmo",
        role: "Founder & CEO",
        location: "Douala, Cameroon",
        joinDate: "January 2020",
        image: "/founder/adam.png",
        coverImage: "/portfolio/adam-cover.jpg",
        bio: "Visionary leader driving AI innovation across Africa with 5+ years of experience in machine learning and robotics.",
        longBio: "Vincess Dongmo is a pioneering entrepreneur and AI researcher who has dedicated his career to advancing artificial intelligence technologies in Africa. With a PhD in Computer Science from the University of Cambridge and extensive experience at leading tech companies, Adam recognized the untapped potential of AI to solve uniquely African challenges. His work spans from developing autonomous systems for agriculture to creating AI-powered solutions for healthcare in underserved communities. Under his leadership, Synthi AI has grown from a small startup to a recognized leader in African AI innovation.",

        expertise: ["AI Strategy", "Robotics", "Leadership", "Machine Learning", "Computer Vision", "Natural Language Processing"],

        social: {
            linkedin: "https://linkedin.com/in/adam-dongmo",
            twitter: "https://twitter.com/adamdongmo",
            github: "https://github.com/adamdongmo",
            email: "adam@synthi-ai.com",
            website: "https://adamdongmo.com"
        },

        stats: {
            projectsLed: 50,
            yearsExperience: 12,
            teamsManaged: 8,
            publicationsCount: 25
        },

        achievements: [
            {
                title: "AI Innovation Award 2024",
                organization: "African Tech Summit",
                date: "2024",
                description: "Recognized for outstanding contribution to AI development in Africa"
            },
            {
                title: "Forbes 30 Under 30",
                organization: "Forbes Africa",
                date: "2022",
                description: "Featured in Technology category for revolutionary AI solutions"
            },
            {
                title: "PhD in Computer Science",
                organization: "University of Cambridge",
                date: "2018",
                description: "Thesis: 'Adaptive Machine Learning Systems for Resource-Constrained Environments'"
            }
        ],

        projects: [
            {
                id: 1,
                title: "AgriBot AI",
                description: "Autonomous farming robot powered by computer vision and machine learning for crop monitoring and pest detection.",
                image: "/projects/agribot.jpg",
                technologies: ["Python", "TensorFlow", "OpenCV", "ROS", "IoT"],
                status: "Live",
                impact: "Increased crop yield by 35% for 200+ farmers",
                link: "https://agribot.synthi-ai.com"
            },
            {
                id: 2,
                title: "MedAI Diagnostics",
                description: "AI-powered medical diagnosis system for rural healthcare centers.",
                image: "/projects/medai.jpg",
                technologies: ["PyTorch", "FastAPI", "React", "Docker", "AWS"],
                status: "Production",
                impact: "Serving 50+ healthcare centers across West Africa",
                link: "https://medai.synthi-ai.com"
            },
            {
                id: 3,
                title: "EduBot Tutor",
                description: "Intelligent tutoring system that adapts to individual learning styles.",
                image: "/projects/edubot.jpg",
                technologies: ["NLP", "Node.js", "MongoDB", "React Native"],
                status: "Beta",
                impact: "10,000+ students using the platform",
                link: "https://edubot.synthi-ai.com"
            }
        ],

        skills: [
            { name: "Machine Learning", level: 95, category: "AI/ML" },
            { name: "Python", level: 98, category: "Programming" },
            { name: "Leadership", level: 92, category: "Management" },
            { name: "Computer Vision", level: 90, category: "AI/ML" },
            { name: "Strategic Planning", level: 88, category: "Management" },
            { name: "Robotics", level: 85, category: "Engineering" },
            { name: "Deep Learning", level: 93, category: "AI/ML" },
            { name: "Team Building", level: 90, category: "Management" }
        ],

        education: [
            {
                degree: "PhD in Computer Science",
                institution: "University of Cambridge",
                year: "2018",
                specialization: "Machine Learning & Robotics"
            },
            {
                degree: "MSc in Artificial Intelligence",
                institution: "Stanford University",
                year: "2015",
                specialization: "Deep Learning & Neural Networks"
            },
            {
                degree: "BSc in Computer Engineering",
                institution: "University of Yaoundé I",
                year: "2013",
                specialization: "Software Engineering & Systems"
            }
        ],

        testimonials: [
            {
                text: "Adam's vision for AI in Africa is truly transformative. His leadership at Synthi AI has been instrumental in our partnership success.",
                author: "Dr. Sarah Johnson",
                role: "Director of AI Research, Microsoft Africa",
                avatar: "/testimonials/sarah.jpg"
            },
            {
                text: "Working with Adam has been an incredible experience. His technical expertise combined with his understanding of African markets is unmatched.",
                author: "Prof. Jean-Claude Mbarga",
                role: "Dean of Computer Science, University of Douala",
                avatar: "/testimonials/jean.jpg"
            }
        ]
    },

    "fokam-minyim": {
        id: 2,
        slug: "fokam-minyim",
        name: "Fokam Minyim",
        role: "Full-Stack Developer",
        location: "Yaoundé, Cameroon",
        joinDate: "March 2021",
        image: "/founder/melvin.png",
        coverImage: "/portfolio/fokam-cover.jpg",
        bio: "Expert full-stack developer specializing in AI-powered web applications and scalable backend systems.",
        longBio: "Fokam Minyim is a versatile full-stack developer with a passion for creating innovative web applications that integrate artificial intelligence seamlessly. With over 8 years of experience in software development, Fokam has mastered the art of building scalable, performant applications that handle complex AI workloads. His expertise spans from modern frontend frameworks to robust backend architectures.",

        expertise: ["React", "Node.js", "AI Integration", "TypeScript", "Python", "Cloud Architecture"],

        social: {
            linkedin: "https://linkedin.com/in/fokam-minyim",
            twitter: "https://twitter.com/fokamminyim",
            github: "https://github.com/fokamminyim",
            email: "fokam@synthi-ai.com",
            website: "https://fokamminyim.dev"
        },

        stats: {
            projectsCompleted: 75,
            yearsExperience: 8,
            codeCommits: 5420,
            openSourceContributions: 45
        },

        achievements: [
            {
                title: "Full-Stack Developer of the Year",
                organization: "Cameroon Tech Awards",
                date: "2023",
                description: "Recognized for exceptional contribution to web development in Cameroon"
            },
            {
                title: "AWS Certified Solutions Architect",
                organization: "Amazon Web Services",
                date: "2022",
                description: "Professional level certification for cloud architecture"
            },
            {
                title: "React Expert Certification",
                organization: "Meta Blueprint",
                date: "2021",
                description: "Advanced React development certification"
            }
        ],

        projects: [
            {
                id: 1,
                title: "Synthi AI Dashboard",
                description: "Comprehensive admin dashboard for managing AI models and deployments.",
                image: "/projects/dashboard.jpg",
                technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
                status: "Live",
                impact: "Used by 500+ AI researchers and engineers",
                link: "https://dashboard.synthi-ai.com"
            },
            {
                id: 2,
                title: "AI Model Marketplace",
                description: "E-commerce platform for buying and selling pre-trained AI models.",
                image: "/projects/marketplace.jpg",
                technologies: ["Next.js", "Stripe", "Docker", "Kubernetes", "MongoDB"],
                status: "Production",
                impact: "1000+ models sold, $2M revenue generated",
                link: "https://marketplace.synthi-ai.com"
            },
            {
                id: 3,
                title: "Real-time Chat AI",
                description: "Intelligent chat application with natural language processing.",
                image: "/projects/chatai.jpg",
                technologies: ["React Native", "WebSocket", "FastAPI", "Redis", "NLP"],
                status: "Beta",
                impact: "Handling 10k+ conversations daily",
                link: "https://chat.synthi-ai.com"
            }
        ],

        skills: [
            { name: "React/Next.js", level: 96, category: "Frontend" },
            { name: "Node.js", level: 94, category: "Backend" },
            { name: "TypeScript", level: 92, category: "Programming" },
            { name: "Python", level: 88, category: "Programming" },
            { name: "AWS/Cloud", level: 90, category: "DevOps" },
            { name: "Database Design", level: 87, category: "Backend" },
            { name: "API Development", level: 93, category: "Backend" },
            { name: "UI/UX Design", level: 85, category: "Design" }
        ],

        education: [
            {
                degree: "MSc in Software Engineering",
                institution: "University of Yaoundé I",
                year: "2019",
                specialization: "Web Technologies & Distributed Systems"
            },
            {
                degree: "BSc in Computer Science",
                institution: "University of Buea",
                year: "2017",
                specialization: "Software Development & Programming"
            }
        ],

        testimonials: [
            {
                text: "Fokam's ability to translate complex AI requirements into user-friendly interfaces is remarkable.",
                author: "Marie Dubois",
                role: "Product Manager, Orange Digital Center",
                avatar: "/testimonials/marie.jpg"
            },
            {
                text: "The applications Fokam built for us exceeded all expectations. His technical skills are outstanding.",
                author: "Dr. Emmanuel Tonye",
                role: "CTO, National Advanced School of Engineering",
                avatar: "/testimonials/emmanuel.jpg"
            }
        ]
    }
};

interface MemberPortfolioProps {
    params?: { slug: string };
}

export default function MemberPortfolio({ params }: MemberPortfolioProps) {
    const router = useRouter();
    const urlParams = useParams();
    const slug = params?.slug || urlParams?.slug as string;

    const [activeTab, setActiveTab] = useState('overview');
    const [member, setMember] = useState<any>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (slug && teamMembersData[slug as keyof typeof teamMembersData]) {
            setMember(teamMembersData[slug as keyof typeof teamMembersData]);
        }
    }, [slug]);

    if (!member) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="text-[#6b7db8] text-6xl mb-4">404</div>
                    <h1 className="text-2xl font-bold text-white mb-4">Member Not Found</h1>
                    <Link href="/team">
                        <Button className="bg-[#6b7db8] hover:bg-[#5a6ba3]">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Team
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <Users className="w-4 h-4" /> },
        { id: 'projects', label: 'Projects', icon: <Rocket className="w-4 h-4" /> },
        { id: 'skills', label: 'Skills', icon: <Code className="w-4 h-4" /> },
        { id: 'experience', label: 'Experience', icon: <Award className="w-4 h-4" /> }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    };

    return (
        <div className="min-h-screen bg-black text-white" ref={ref}>

            {/* Hero Section */}
            <section className="relative h-screen overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    {member.coverImage ? (
                        <Image src={member.coverImage} alt={`${member.name} cover`} fill className="object-cover" priority />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#6b7db8]/30 to-gray-900"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>
                </div>

                {/* Back Button */}
                <motion.div className="absolute top-8 left-8 z-20" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                    <Link href="/team">
                        <Button variant="outline" className="border-[#6b7db8]/30 bg-black/50 backdrop-blur-sm hover:bg-[#6b7db8]/20 hover:border-[#6b7db8]/50 transition-all duration-300">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Team
                        </Button>
                    </Link>
                </motion.div>

                {/* Main Content */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">

                            {/* Profile Image */}
                            <motion.div className="flex justify-center lg:justify-end" initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }} transition={{ duration: 0.8 }}>
                                <div className="relative">
                                    <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-[#6b7db8]/30 shadow-2xl">
                                        {member.image ? (
                                            <Image src={member.image} alt={member.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[#6b7db8]/20 to-gray-900/80 flex items-center justify-center">
                                                <span className="text-6xl font-bold text-white">
                                                    {member.name.split(' ').map((n: string) => n[0]).join('')}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Floating stats */}
                                    <motion.div className="absolute -top-4 -right-4 bg-[#6b7db8] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                        {member.stats.yearsExperience}+ Years
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Profile Info */}
                            <motion.div className="text-center lg:text-left space-y-6" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                                <motion.div variants={itemVariants}>
                                    <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent leading-tight">
                                        {member.name}
                                    </h1>
                                    <p className="text-2xl text-[#6b7db8] font-semibold mt-2">{member.role}</p>
                                </motion.div>

                                <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                    <div className="flex items-center gap-2 text-[#6b6b6b]">
                                        <MapPin className="w-4 h-4" />
                                        <span>{member.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#6b6b6b]">
                                        <Calendar className="w-4 h-4" />
                                        <span>Joined {member.joinDate}</span>
                                    </div>
                                </motion.div>

                                <motion.p variants={itemVariants} className="text-lg text-[#6b6b6b] leading-relaxed max-w-2xl">
                                    {member.bio}
                                </motion.p>

                                <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    {member.expertise.slice(0, 4).map((skill: string, index: number) => (
                                        <Badge key={index} className="bg-[#6b7db8]/20 text-[#6b7db8] border-[#6b7db8]/30 hover:bg-[#6b7db8]/30 transition-colors">
                                            {skill}
                                        </Badge>
                                    ))}
                                </motion.div>

                                <motion.div variants={itemVariants} className="flex gap-4 justify-center lg:justify-start">
                                    <a href={member.social.linkedin} className="p-3 bg-[#6b7db8]/20 hover:bg-[#6b7db8]/40 text-[#6b7db8] rounded-xl transition-colors duration-300">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a href={member.social.twitter} className="p-3 bg-[#6b7db8]/20 hover:bg-[#6b7db8]/40 text-[#6b7db8] rounded-xl transition-colors duration-300">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href={member.social.github} className="p-3 bg-[#6b7db8]/20 hover:bg-[#6b7db8]/40 text-[#6b7db8] rounded-xl transition-colors duration-300">
                                        <Github className="w-5 h-5" />
                                    </a>
                                    <a href={`mailto:${member.social.email}`} className="p-3 bg-[#6b7db8]/20 hover:bg-[#6b7db8]/40 text-[#6b7db8] rounded-xl transition-colors duration-300">
                                        <Mail className="w-5 h-5" />
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <div className="w-6 h-10 border-2 border-[#6b7db8]/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-[#6b7db8] rounded-full mt-2"></div>
                    </div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {Object.entries(member.stats).map(([key, value], index) => (
                            <motion.div key={key} variants={itemVariants} className="text-center group">
                                <Card className="bg-gray-900/50 border-[#6b7db8]/20 hover:border-[#6b7db8]/40 transition-all duration-300 p-6 hover:bg-gray-900/70 backdrop-blur-sm">
                                    <CardContent className="p-0">
                                        <motion.div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent mb-2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                                            {typeof value === 'number'
                                                ? value > 100
                                                    ? `${value}+`
                                                    : value
                                                : typeof value === 'string'
                                                    ? value
                                                    : null}
                                        </motion.div>
                                        <div className="text-[#6b6b6b] capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Navigation Tabs */}
            <section className="sticky top-0 z-30 bg-black/90 backdrop-blur-sm border-b border-[#6b7db8]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8 overflow-x-auto py-4">
                        {tabs.map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab.id ? 'bg-[#6b7db8] text-white' : 'text-[#6b6b6b] hover:text-[#6b7db8] hover:bg-[#6b7db8]/10'}`}>
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tab Content */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-16">
                            {/* About Section */}
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent mb-8">
                                    About {member.name}
                                </h2>
                                <div className="grid lg:grid-cols-2 gap-12">
                                    <div>
                                        <p className="text-[#6b6b6b] leading-relaxed text-lg">{member.longBio}</p>
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-white">Core Expertise</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {member.expertise.map((skill: string, index: number) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <Brain className="w-4 h-4 text-[#6b7db8]" />
                                                    <span className="text-[#6b6b6b]">{skill}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Achievements */}
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent mb-8">
                                    Achievements & Awards
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {member.achievements.map((achievement: any, index: number) => (
                                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                                            <Card className="bg-gray-900/50 border-[#6b7db8]/20 hover:border-[#6b7db8]/40 transition-all duration-300 p-6 h-full hover:bg-gray-900/70 backdrop-blur-sm">
                                                <CardContent className="p-0">
                                                    <Award className="w-8 h-8 text-[#6b7db8] mb-4" />
                                                    <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                                                    <p className="text-[#6b7db8] text-sm mb-2">{achievement.organization} • {achievement.date}</p>
                                                    <p className="text-[#6b6b6b] text-sm leading-relaxed">{achievement.description}</p>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonials */}
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent mb-8">
                                    What Others Say
                                </h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {member.testimonials.map((testimonial: any, index: number) => (
                                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }}>
                                            <Card className="bg-gray-900/50 border-[#6b7db8]/20 p-8 backdrop-blur-sm">
                                                <CardContent className="p-0">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-12 h-12 rounded-full bg-[#6b7db8]/20 flex items-center justify-center">
                                                                <span className="text-[#6b7db8] font-semibold">
                                                                    {testimonial.author.split(' ').map((n: string) => n[0]).join('')}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-[#6b6b6b] italic leading-relaxed mb-4">{testimonial.text}</p>
                                                            <div>
                                                                <p className="text-white font-semibold">{testimonial.author}</p>
                                                                <p className="text-[#6b7db8] text-sm">{testimonial.role}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Projects Tab */}
                    {activeTab === 'projects' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent mb-8">
                                Featured Projects
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {member.projects.map((project: any, index: number) => (
                                    <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -8 }} className="group">
                                        <Card className="bg-gray-900/50 border-[#6b7db8]/20 hover:border-[#6b7db8]/40 transition-all duration-500 overflow-hidden h-full hover:bg-gray-900/70 backdrop-blur-sm">
                                            <div className="relative h-48 overflow-hidden">
                                                {project.image ? (
                                                    <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-[#6b7db8]/20 to-gray-900/80 flex items-center justify-center">
                                                        <Rocket className="w-16 h-16 text-[#6b7db8]/50" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                                <div className="absolute top-4 right-4">
                                                    <Badge className={`${project.status === 'Live' ? 'bg-green-500/20 text-green-400 border-green-400/30' :
                                                            project.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30' :
                                                                'bg-blue-500/20 text-blue-400 border-blue-400/30'
                                                        }`}>
                                                        {project.status}
                                                    </Badge>
                                                </div>
                                            </div>

                                            <CardContent className="p-6">
                                                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#6b7db8] transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">
                                                    {project.description}
                                                </p>

                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-[#6b7db8] text-sm font-medium mb-2">Technologies:</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                                                                <Badge key={techIndex} variant="secondary" className="text-xs bg-[#6b7db8]/10 text-[#6b7db8] border-[#6b7db8]/20">
                                                                    {tech}
                                                                </Badge>
                                                            ))}
                                                            {project.technologies.length > 3 && (
                                                                <Badge variant="secondary" className="text-xs bg-[#6b7db8]/10 text-[#6b7db8] border-[#6b7db8]/20">
                                                                    +{project.technologies.length - 3} more
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="text-[#6b7db8] text-sm font-medium mb-1">Impact:</p>
                                                        <p className="text-[#6b6b6b] text-sm">{project.impact}</p>
                                                    </div>

                                                    {project.link && (
                                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#6b7db8] hover:text-white transition-colors text-sm">
                                                            <ExternalLink className="w-4 h-4" />
                                                            View Project
                                                        </a>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Skills Tab */}
                    {activeTab === 'skills' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-12">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent">
                                Technical Skills
                            </h2>

                            <div className="grid lg:grid-cols-2 gap-12">
                                {['AI/ML', 'Programming', 'Management', 'Engineering', 'Backend', 'Frontend', 'Design', 'DevOps'].map((category) => {
                                    const categorySkills = member.skills.filter((skill: any) => skill.category === category);
                                    if (categorySkills.length === 0) return null;

                                    return (
                                        <div key={category}>
                                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                                <Code className="w-5 h-5 text-[#6b7db8]" />
                                                {category}
                                            </h3>
                                            <div className="space-y-4">
                                                {categorySkills.map((skill: any, index: number) => (
                                                    <motion.div key={skill.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="group">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-white font-medium">{skill.name}</span>
                                                            <span className="text-[#6b7db8] text-sm">{skill.level}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-800 rounded-full h-2">
                                                            <motion.div className="bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] h-2 rounded-full" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1, delay: index * 0.1 }} viewport={{ once: true }} />
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Experience Tab */}
                    {activeTab === 'experience' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-12">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent">
                                Education & Background
                            </h2>

                            <div className="space-y-8">
                                {member.education.map((edu: any, index: number) => (
                                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                                        <Card className="bg-gray-900/50 border-[#6b7db8]/20 hover:border-[#6b7db8]/40 transition-all duration-300 p-6 hover:bg-gray-900/70 backdrop-blur-sm">
                                            <CardContent className="p-0">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0">
                                                        <BookOpen className="w-8 h-8 text-[#6b7db8]" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-semibold text-white mb-2">{edu.degree}</h3>
                                                        <p className="text-[#6b7db8] font-medium mb-1">{edu.institution}</p>
                                                        <p className="text-[#6b6b6b] text-sm mb-2">Graduated: {edu.year}</p>
                                                        <p className="text-[#6b6b6b] text-sm">Specialization: {edu.specialization}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 bg-gradient-to-t from-gray-900 to-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ebf1ff] to-[#b3c0de] bg-clip-text text-transparent mb-4">
                            Let&apos;s Work Together
                        </h2>
                        <p className="text-[#6b6b6b] text-lg mb-8 max-w-2xl mx-auto">
                            Interested in collaborating with {member.name}? Get in touch to discuss opportunities.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button asChild className="bg-[#6b7db8] hover:bg-[#5a6ba3] px-8 py-3">
                                <a href={`mailto:${member.social.email}`}>
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Message
                                </a>
                            </Button>
                            <Button variant="outline" asChild className="border-[#6b7db8]/30 text-[#6b7db8] hover:bg-[#6b7db8]/10 px-8 py-3">
                                <Link href="/team">
                                    <Users className="w-4 h-4 mr-2" />
                                    View Team
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}