"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function NavigationMenuSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Navigation menu items data avec sous-menus
  const navItems = [
    { 
      label: "Home", 
      href: "#",
      isActive: true
    },
    { 
      label: "About", 
      href: "#about",
      dropdown: [
        { label: "Our Story", href: "#story" },
        { label: "Team", href: "#team" },
        { label: "Values", href: "#values" }
      ]
    },
    { 
      label: "Services", 
      href: "#services",
      dropdown: [
        { label: "AI Development", href: "#ai-dev" },
        { label: "Computer Vision", href: "#vision" },
        { label: "NLP Solutions", href: "#nlp" },
        { label: "Robotics", href: "#robotics" }
      ]
    },
    { 
      label: "Solutions", 
      href: "#solutions",
      dropdown: [
        { label: "Ubora AI", href: "#ubora" },
        { label: "Farm2Market", href: "#farm2market" },
        { label: "Smart Cities", href: "#smart-cities" }
      ]
    },
    { 
      label: "Contact", 
      href: "#contact"
    },
  ];

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile quand on clique sur un lien
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Gestion des dropdowns
  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-[#6b7db8]/20 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between py-4 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative group">
              <Image
                className="h-[45px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                alt="Synthi AI Logo"
                src="/logo.png"
                width={120}
                height={45}
                priority
              />
              {/* Glow effect au hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#6b7db8]/20 to-[#8a9fd9]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"></div>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  className={`font-medium text-base transition-all duration-300 flex items-center gap-1 py-2 px-3 rounded-lg ${
                    item.isActive
                      ? 'text-[#6b7db8] bg-[#6b7db8]/10'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                  }`}
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`} />
                  )}
                </a>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-md border border-[#6b7db8]/20 rounded-xl shadow-xl transition-all duration-300 transform ${
                      activeDropdown === item.label
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-2">
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block px-4 py-3 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#6b7db8]/10 rounded-lg transition-colors duration-200"
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Indicateur de navigation active */}
                {item.isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#6b7db8] rounded-full"></div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="relative px-6 py-3 bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] hover:from-[#5a6ba3] hover:to-[#7a8fc9] text-white font-semibold text-sm rounded-xl transition-all duration-300 overflow-hidden group shadow-lg hover:shadow-xl hover:shadow-[#6b7db8]/25 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6b7db8] via-[#8a9fd9] to-[#b3c0de] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">Get Started</span>
            </button>
          </div>

          {/* Menu Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-[#A1A1AA] hover:text-white transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation Mobile */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-screen opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <div className="px-4 pb-4 bg-gray-900/98 backdrop-blur-md border-t border-[#6b7db8]/20">
            <nav className="space-y-2 py-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <a
                      href={item.href}
                      className={`flex-1 block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                        item.isActive
                          ? 'text-[#6b7db8] bg-[#6b7db8]/10'
                          : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                      }`}
                      onClick={handleLinkClick}
                    >
                      {item.label}
                    </a>
                    {item.dropdown && (
                      <button
                        className="p-3 text-[#A1A1AA] hover:text-white transition-colors duration-200"
                        onClick={() => handleDropdownToggle(item.label)}
                        aria-label={`Toggle ${item.label} dropdown`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      </button>
                    )}
                  </div>

                  {/* Dropdown Mobile */}
                  {item.dropdown && (
                    <div className={`transition-all duration-300 overflow-hidden ${
                      activeDropdown === item.label ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pl-6 pr-4 py-2 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <a
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#6b7db8]/10 rounded-lg transition-colors duration-200"
                            onClick={handleLinkClick}
                          >
                            {dropdownItem.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Mobile */}
            <div className="pt-4 border-t border-[#6b7db8]/20">
              <button 
                className="w-full px-6 py-3 bg-gradient-to-r from-[#6b7db8] to-[#8a9fd9] hover:from-[#5a6ba3] hover:to-[#7a8fc9] text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-lg"
                onClick={handleLinkClick}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer pour éviter que le contenu passe sous la navbar fixe */}
      <div className="h-[73px]"></div>

      {/* Overlay pour fermer le menu mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </>
  );
}