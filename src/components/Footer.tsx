import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTwitter, FaInstagram, FaLinkedin, FaDiscord, FaYoutube, FaTiktok, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0c1b] text-white py-12 lg:py-16 mt-12 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 xl:gap-20">
          
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <Image 
                src="/logo.png" 
                alt="Synthi AI Logo" 
                width={170} 
                height={70} 
                className="mb-4 w-auto h-auto max-w-[170px]" 
                priority
              />
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                Dedicated to stay at the forefront of technological advancements through AI-driven solutions.
              </p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://twitter.com/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#161a36] p-3 rounded-lg hover:bg-[#1e2347] transition-all duration-300 group"
                aria-label="Suivez-nous sur Twitter"
              >
                <FaTwitter className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300 w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/synthiai4/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#161a36] p-3 rounded-lg hover:bg-[#1e2347] transition-all duration-300 group"
                aria-label="Suivez-nous sur Instagram"
              >
                <FaInstagram className="text-gray-400 group-hover:text-pink-400 transition-colors duration-300 w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/synthi-ai/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#161a36] p-3 rounded-lg hover:bg-[#1e2347] transition-all duration-300 group"
                aria-label="Suivez-nous sur LinkedIn"
              >
                <FaLinkedin className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300 w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@SYNTHIAI-y2o" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#161a36] p-3 rounded-lg hover:bg-[#1e2347] transition-all duration-300 group"
                aria-label="Abonnez-vous à notre chaîne YouTube"
              >
                <FaYoutube className="text-gray-400 group-hover:text-red-500 transition-colors duration-300 w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@synthi_ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#161a36] p-3 rounded-lg hover:bg-[#1e2347] transition-all duration-300 group"
                aria-label="Suivez-nous sur TikTok"
              >
                <FaTiktok className="text-gray-400 group-hover:text-white transition-colors duration-300 w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Pages Navigation */}
          <div className="col-span-1">
            <h3 className="text-blue-400 font-semibold text-lg mb-6 relative">
              Pages
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-400 rounded-full"></span>
            </h3>
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link 
                    href="/" 
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/services" 
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/solutions" 
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    Solutions
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h3 className="text-blue-400 font-semibold text-lg mb-6 relative">
              Company
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-400 rounded-full"></span>
            </h3>
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link 
                    href="/synthi-ai-lab" 
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm"
                  >
                    Synthi AI Lab
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/academy" 
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm"
                  >
                    Synthi AI Academy
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/solutions" 
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm"
                  >
                    Synthi AI Solutions
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blog" 
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm"
                  >
                    Blog & News
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-blue-400 font-semibold text-lg mb-6 relative">
              Contact
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-400 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <FaMapMarkerAlt className="mt-1 text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm text-gray-400 leading-relaxed">
                  Headquarters: Akwa, Douala, Cameroon
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <FaPhone className="text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex flex-col space-y-1">
                  <a 
                    href="tel:+237680232764" 
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    +237 680 232 764
                  </a>
                  <a 
                    href="tel:+237620207980" 
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    +237 620 207 980
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <FaEnvelope className="text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <a 
                  href="mailto:contact@synthi-ai.com" 
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-300 break-all"
                >
                  contact@synthi-ai.com
                </a>
              </li>
            </ul>
          </div>
        </div>

   

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              Copyright © 2025. All rights reserved to Synthi AI.
            </p>
            <div className="flex items-center space-x-6">
              <Link 
                href="/privacy" 
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;