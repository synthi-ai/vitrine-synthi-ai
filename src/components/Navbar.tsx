'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Code,
  Brain,
  Eye,
  Shield,
  Cloud,
  GraduationCap,
  Wheat,
  HeartPulse,
  Factory,
  Truck,
  Building2,
  Cpu,
  BookOpen,
  Briefcase,
  Users,
  Mail,
  FileText,
  Scale,
} from 'lucide-react';

/* ─────────── Dropdown Data ─────────── */

const aiServicesItems = [
  { label: 'AI Development', desc: 'Custom AI model development & integration', href: '/solutions', icon: Code },
  { label: 'Computer Vision', desc: 'Object detection, segmentation & tracking', href: '/solutions', icon: Eye },
  { label: 'Generative AI', desc: 'LLMs, content generation & chatbots', href: '/solutions', icon: Brain },
  { label: 'AI Consulting', desc: 'Strategy, roadmaps & implementation', href: '/solutions', icon: Briefcase },
  { label: 'Data Services', desc: 'Data engineering, analytics & pipelines', href: '/solutions', icon: Cpu },
  { label: 'Cloud AI Infrastructure', desc: 'Scalable deployment & MLOps', href: '/solutions', icon: Cloud },
  { label: 'AI Security & Ethics', desc: 'Responsible AI & compliance', href: '/solutions', icon: Shield },
  { label: 'Training & Workshops', desc: 'Upskill your team in AI & ML', href: '/solutions', icon: GraduationCap },
];

const industriesItems = [
  { label: 'Agriculture', desc: 'Precision farming & crop monitoring', href: '/solutions', icon: Wheat },
  { label: 'Healthcare', desc: 'Medical imaging & diagnostics', href: '/solutions', icon: HeartPulse },
  { label: 'Manufacturing', desc: 'Quality control & process automation', href: '/solutions', icon: Factory },
  { label: 'Logistics', desc: 'Supply chain & delivery optimization', href: '/solutions', icon: Truck },
  { label: 'Smart City', desc: 'Traffic, energy & urban intelligence', href: '/solutions', icon: Building2 },
  { label: 'Education', desc: 'Adaptive learning & analytics', href: '/solutions', icon: BookOpen },
];

const companyItems = [
  { label: 'About Us', desc: 'Our mission, vision & team', href: '/about', icon: Users },
  { label: 'Enterprise', desc: 'Solutions for large organizations', href: '/enterprise', icon: Building2 },
  { label: 'Portfolio', desc: 'Projects & case studies', href: '/labs', icon: FileText },
  { label: 'Blog', desc: 'Insights & technical articles', href: '/blog', icon: BookOpen },
  { label: 'Careers', desc: 'Join our team', href: '/about', icon: Briefcase },
  { label: 'Contact', desc: 'Get in touch with us', href: 'mailto:contact@synthi-ai.com', icon: Mail },
  { label: 'Legal', desc: 'Privacy, terms & policies', href: '/privacy', icon: Scale },
];

type DropdownKey = 'services' | 'industries' | 'company' | null;

/* ─────────── Component ─────────── */

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);
  const pathname = usePathname();
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);

  /* Scroll */
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 20;
    if (scrolled !== isScrolled) setIsScrolled(scrolled);
  }, [isScrolled]);

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => { handleScroll(); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [handleScroll]);

  /* Route change → close everything */
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  /* Click outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleEnter = (key: DropdownKey) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveDropdown(key);
  };
  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  /* ─── Mega-menu panel ─── */
  const renderDropdown = (
    items: typeof aiServicesItems,
    title: string,
    subtitle: string,
    viewAllHref: string,
    viewAllLabel: string,
  ) => (
    <div
      className={`
        absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px]
        transition-all duration-200 origin-top
        ${activeDropdown ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-[0.98]'}
      `}
      onMouseEnter={() => { if (closeTimeout.current) clearTimeout(closeTimeout.current); }}
      onMouseLeave={handleLeave}
    >
      <div className="bg-[#0c0c24]/95 backdrop-blur-2xl rounded-2xl border border-[#6b7db8]/15 shadow-2xl shadow-black/40 p-6">
        {/* Header */}
        <div className="mb-5 pb-4 border-b border-[#6b7db8]/10">
          <h3 className="text-white font-semibold text-base">{title}</h3>
          <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group/item flex items-start gap-3.5 p-3 rounded-xl hover:bg-[#6b7db8]/8 transition-colors duration-200"
                onClick={() => setActiveDropdown(null)}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#6b7db8]/10 flex items-center justify-center text-[#6b7db8] group-hover/item:bg-[#6b7db8]/20 transition-colors duration-200">
                  <Icon className="w-[18px] h-[18px]" />
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium group-hover/item:text-[#8a9fd9] transition-colors duration-200">
                    {item.label}
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-[#6b7db8]/10">
          <Link
            href={viewAllHref}
            className="inline-flex items-center text-[#6b7db8] hover:text-[#8a9fd9] text-sm font-medium transition-colors duration-200"
            onClick={() => setActiveDropdown(null)}
          >
            {viewAllLabel}
            <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );

  /* ─── Desktop nav item with dropdown ─── */
  const NavDropdown = ({ label, dropdownKey }: { label: string; dropdownKey: DropdownKey }) => (
    <div
      className="relative"
      onMouseEnter={() => handleEnter(dropdownKey)}
      onMouseLeave={handleLeave}
    >
      <button
        className={`
          flex items-center gap-1 px-3.5 py-2 rounded-lg text-[14px] font-medium
          transition-all duration-200
          ${activeDropdown === dropdownKey ? 'text-white' : 'text-gray-400 hover:text-white'}
        `}
        onClick={() => setActiveDropdown(activeDropdown === dropdownKey ? null : dropdownKey)}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === dropdownKey ? 'rotate-180' : ''}`} />
      </button>

      {dropdownKey === 'services' && activeDropdown === 'services' &&
        renderDropdown(aiServicesItems, 'AI Services', 'Comprehensive AI & Computer Vision services', '/solutions', 'View all services')}
      {dropdownKey === 'industries' && activeDropdown === 'industries' &&
        renderDropdown(industriesItems, 'Industries', 'AI solutions tailored for your sector', '/solutions', 'Explore all industries')}
      {dropdownKey === 'company' && activeDropdown === 'company' &&
        renderDropdown(companyItems, 'Company', 'Learn more about Synthi AI', '/about', 'About Synthi AI')}
    </div>
  );

  return (
    <>
      <nav
        ref={navRef}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
          ${isScrolled
            ? 'bg-black/85 backdrop-blur-2xl border-b border-[#6b7db8]/8 py-1.5'
            : 'bg-transparent py-3 sm:py-4'
          }
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0" aria-label="Go to homepage">
              <Image
                src="/logo.png"
                alt="Synthi AI"
                width={40}
                height={40}
                sizes="40px"
                priority
                className="h-10 w-auto transition-opacity duration-300 group-hover:opacity-80"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              <NavDropdown label="AI Services" dropdownKey="services" />
              <NavDropdown label="Industries" dropdownKey="industries" />

              <Link
                href="/labs"
                className={`px-3.5 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 ${
                  isActive('/labs') ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Portfolio
              </Link>

              <NavDropdown label="Company" dropdownKey="company" />
            </div>

            {/* CTA */}
            <a
              href="mailto:contact@synthi-ai.com"
              className="
                hidden lg:inline-flex items-center gap-2
                bg-[#6b7db8] hover:bg-[#5a6ca7]
                text-white font-semibold text-[13px]
                px-5 py-2.5 rounded-xl
                transition-all duration-300 hover:shadow-lg hover:shadow-[#6b7db8]/20
                group
              "
            >
              <span>Get in touch</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            {/* Mobile button */}
            <button
              className="lg:hidden p-2 text-white rounded-lg focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu ─── */}
      <div
        className={`
          fixed inset-0 z-40 lg:hidden transition-all duration-400
          ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

        <div
          className={`
            absolute right-0 top-0 h-full w-full max-w-sm
            bg-[#08081a] border-l border-[#6b7db8]/10
            transform transition-transform duration-500 ease-out
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            overflow-y-auto
          `}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-5">

            {/* Brand */}
            <div className="mb-6 pb-5 border-b border-[#6b7db8]/10 flex items-center justify-between">
              <Image src="/logo.png" alt="Synthi AI" width={40} height={40} sizes="40px" className="h-9 w-auto" />
            </div>

            <nav className="flex-1 space-y-0.5">
              {/* Home */}
              <Link
                href="/"
                className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors duration-200 ${
                  pathname === '/' ? 'text-white bg-[#6b7db8]/12' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* AI Services accordion */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium text-gray-400 hover:text-white transition-colors duration-200"
                  onClick={() => setMobileExpanded(mobileExpanded === 'services' ? null : 'services')}
                >
                  AI Services
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'services' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'services' && (
                  <div className="ml-3 border-l border-[#6b7db8]/10 pl-3 space-y-0.5 pb-2">
                    {aiServicesItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Industries accordion */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium text-gray-400 hover:text-white transition-colors duration-200"
                  onClick={() => setMobileExpanded(mobileExpanded === 'industries' ? null : 'industries')}
                >
                  Industries
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'industries' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'industries' && (
                  <div className="ml-3 border-l border-[#6b7db8]/10 pl-3 space-y-0.5 pb-2">
                    {industriesItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct links */}
              <Link
                href="/labs"
                className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors duration-200 ${
                  isActive('/labs') ? 'text-white bg-[#6b7db8]/12' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </Link>

              {/* Company accordion */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium text-gray-400 hover:text-white transition-colors duration-200"
                  onClick={() => setMobileExpanded(mobileExpanded === 'company' ? null : 'company')}
                >
                  Company
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'company' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'company' && (
                  <div className="ml-3 border-l border-[#6b7db8]/10 pl-3 space-y-0.5 pb-2">
                    {companyItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* CTA */}
            <a
              href="mailto:contact@synthi-ai.com"
              className="flex items-center justify-center gap-2 bg-[#6b7db8] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl mt-6 transition-all duration-300 hover:bg-[#5a6ca7]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Socials */}
            <div className="mt-6 pt-5 border-t border-[#6b7db8]/10 flex items-center gap-5">
              <a href="https://www.linkedin.com/company/synthi-ai/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#6b7db8] text-xs transition-colors">LinkedIn</a>
              <a href="https://www.youtube.com/@SYNTHIAI-y2o" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#6b7db8] text-xs transition-colors">YouTube</a>
              <a href="https://www.instagram.com/synthiai4/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#6b7db8] text-xs transition-colors">Instagram</a>
              <a href="https://www.tiktok.com/@synthi_ai" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#6b7db8] text-xs transition-colors">TikTok</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
