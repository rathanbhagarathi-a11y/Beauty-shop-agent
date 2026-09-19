import React, { useState } from 'react';
import { 
  Sparkles, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  setSelectedCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, setSelectedCategory }) => {
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD ($)');
  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubscribed, setFooterSubscribed] = useState(false);

  const handleNav = (page: ActivePage, category?: string) => {
    setActivePage(page);
    if (category) setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerEmail && footerEmail.includes('@')) {
      setFooterSubscribed(true);
      setFooterEmail('');
      setTimeout(() => setFooterSubscribed(false), 6000);
    }
  };

  return (
    <footer id="global-footer" className="bg-[#FAF8F3] border-t border-[#E9DDC8]/80 text-[#1E1E1E] pt-16 pb-12 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* TOP ROW: LOGO & 4 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
          {/* Brand Col (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#145C3A] flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4 text-[#C9A45C]" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#145C3A] block leading-none">
                  Beauty Shop
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#C9A45C] font-semibold block mt-0.5">
                  Clean Organic Luxury
                </span>
              </div>
            </div>

            <p className="text-sm text-[#1E1E1E]/75 leading-relaxed max-w-sm">
              Discover clean, clinically proven cosmetics, organic botanical skincare, and transformative haircare crafted for luminous skin and enduring self-confidence.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Follow Beauty Shop on Instagram"
                className="w-9 h-9 rounded-full bg-white border border-[#E9DDC8] flex items-center justify-center text-[#145C3A] hover:bg-[#145C3A] hover:text-white transition-all shadow-xs"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Follow Beauty Shop on Facebook"
                className="w-9 h-9 rounded-full bg-white border border-[#E9DDC8] flex items-center justify-center text-[#145C3A] hover:bg-[#145C3A] hover:text-white transition-all shadow-xs"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Watch Beauty Shop on YouTube"
                className="w-9 h-9 rounded-full bg-white border border-[#E9DDC8] flex items-center justify-center text-[#145C3A] hover:bg-[#145C3A] hover:text-white transition-all shadow-xs"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Follow Beauty Shop on Twitter"
                className="w-9 h-9 rounded-full bg-white border border-[#E9DDC8] flex items-center justify-center text-[#145C3A] hover:bg-[#145C3A] hover:text-white transition-all shadow-xs"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            {/* Trust badge */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0E7] text-[#145C3A] text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Leaping Bunny Certified Cruelty-Free
              </span>
            </div>
          </div>

          {/* Col 1: Company */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-semibold text-[#145C3A] tracking-wide">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-[#1E1E1E]/80">
              <li>
                <button 
                  onClick={() => handleNav('about')}
                  className="hover:text-[#145C3A] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('blogs')}
                  className="hover:text-[#145C3A] transition-colors"
                >
                  Blogs & Editorial
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#145C3A] transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('careers')}
                  className="hover:text-[#145C3A] transition-colors cursor-pointer"
                >
                  Careers & Culture
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('stores')}
                  className="hover:text-[#145C3A] transition-colors cursor-pointer"
                >
                  Store Locator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Customer Services */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-semibold text-[#145C3A] tracking-wide">
              Customer Services
            </h3>
            <ul className="space-y-2 text-sm text-[#1E1E1E]/80">
              <li>
                <button 
                  onClick={() => handleNav('account')}
                  className="hover:text-[#145C3A] transition-colors cursor-pointer"
                >
                  My Account
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('order-tracking')}
                  className="hover:text-[#145C3A] transition-colors cursor-pointer"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('returns')}
                  className="hover:text-[#145C3A] transition-colors cursor-pointer"
                >
                  Return & Exchange
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('faq')}
                  className="hover:text-[#145C3A] transition-colors cursor-pointer"
                >
                  FAQ Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('shade-finder')}
                  className="hover:text-[#145C3A] transition-colors cursor-pointer"
                >
                  Shade Matching Advisor
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Our Information */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-semibold text-[#145C3A] tracking-wide">
              Our Information
            </h3>
            <ul className="space-y-2 text-sm text-[#1E1E1E]/80">
              <li>
                <button 
                  onClick={() => handleNav('privacy')}
                  className="hover:text-[#145C3A] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('terms')}
                  className="hover:text-[#145C3A] transition-colors cursor-pointer"
                >
                  User Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('returns')}
                  className="hover:text-[#145C3A] transition-colors cursor-pointer"
                >
                  Return Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('sustainability')}
                  className="hover:text-[#145C3A] transition-colors cursor-pointer"
                >
                  Sustainability Manifesto
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-ingredient-standards"
                  onClick={() => handleNav('ingredients')}
                  className="hover:text-[#145C3A] transition-colors cursor-pointer font-medium text-[#145C3A]"
                >
                  Ingredient Standards
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-semibold text-[#145C3A] tracking-wide">
              Contact Info
            </h3>
            <div className="space-y-2.5 text-sm text-[#1E1E1E]/80">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#145C3A] shrink-0 mt-0.5" />
                <span>+1 (800) 232-8899</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#145C3A] shrink-0 mt-0.5" />
                <span>care@beautyshop.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#145C3A] shrink-0 mt-0.5" />
                <span>450 Botanical Way, Suite 800, New York, NY 10012</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: COPYRIGHT, LANGUAGE, CURRENCY */}
        <div className="pt-8 border-t border-[#E9DDC8] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#1E1E1E]/70">
          <p>
            Copyright © 2025 <strong className="font-semibold text-[#145C3A]">Beauty Shop Website</strong>. All Rights Reserved. Crafted with care for healthy skin.
          </p>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-white border border-[#E9DDC8] rounded-full px-3 py-1.5 shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-[#145C3A]" />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-xs text-[#1E1E1E] focus:outline-hidden cursor-pointer"
                aria-label="Select website language"
              >
                <option value="English">English</option>
                <option value="Français">Français</option>
                <option value="Español">Español</option>
                <option value="Deutsch">Deutsch</option>
              </select>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-white border border-[#E9DDC8] rounded-full px-3 py-1.5 shadow-2xs">
              <DollarSign className="w-3.5 h-3.5 text-[#C9A45C]" />
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-xs text-[#1E1E1E] focus:outline-hidden cursor-pointer font-medium"
                aria-label="Select pricing currency"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="CAD ($)">CAD ($)</option>
                <option value="AUD ($)">AUD ($)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
