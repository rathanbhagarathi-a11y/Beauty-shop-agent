import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  RotateCcw, 
  ShieldCheck, 
  FileText, 
  Leaf, 
  ChevronDown, 
  ChevronUp, 
  Package, 
  Truck, 
  CreditCard, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ActivePage } from '../types';

interface FAQAndPoliciesViewProps {
  initialTab?: 'faq' | 'returns' | 'privacy' | 'terms' | 'sustainability';
  onNavigate: (page: ActivePage) => void;
}

export const FAQAndPoliciesView: React.FC<FAQAndPoliciesViewProps> = ({ 
  initialTab = 'faq',
  onNavigate 
}) => {
  const [activeTab, setActiveTab] = useState<'faq' | 'returns' | 'privacy' | 'terms' | 'sustainability'>(initialTab);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    setActiveTab(initialTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialTab]);

  const faqs = [
    {
      q: "Are all Beauty Shop products truly 100% clean and organic?",
      a: "Yes. Every single product in our catalog complies with stringent European Union cosmetic standards, banning over 2,400 harmful chemicals. We use only organic, wildcrafted, and non-toxic botanical ingredients verified by independent third-party laboratories."
    },
    {
      q: "How does shipping work, and do you ship internationally?",
      a: "We offer complimentary carbon-neutral shipping on all domestic orders over $50. Standard delivery arrives within 2-4 business days. Expedited next-day options are available at checkout. We also ship worldwide to over 45 countries with pre-paid customs clearance."
    },
    {
      q: "What is your return & exchange guarantee?",
      a: "We stand behind our formulas with our 30-Day Radiant Guarantee. If any product does not suit your skin type or meet your highest expectations, return it within 30 days for a full refund or exchange—even if gently used."
    },
    {
      q: "Are your formulas safe for pregnant and nursing mothers?",
      a: "Most of our collection is completely pregnancy-safe. However, products containing concentrated botanicals or active acids will display a clear safety indicator on the product page. We always recommend consulting with your obstetrician."
    },
    {
      q: "How can I track my shipment once placed?",
      a: "As soon as your package is dispatched from our eco-sanctuary warehouse, you will receive an email and SMS with live tracking details. You can also track your order at any time using our dedicated Order Tracking page."
    },
    {
      q: "Are your glass bottles and packaging recyclable?",
      a: "Yes, 98% of our packaging is infinitely recyclable amber glass, FSC-certified post-consumer recycled paper, and soy inks. We also offer a Return-for-Refill program where you receive $5 credit for every 3 empty bottles returned."
    }
  ];

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] bg-[#E8F0E7] px-3 py-1 rounded-full inline-block">
            Support & Information
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">
            {activeTab === 'faq' && 'Frequently Asked Questions'}
            {activeTab === 'returns' && 'Return & Exchange Policy'}
            {activeTab === 'privacy' && 'Privacy Policy'}
            {activeTab === 'terms' && 'User Terms & Conditions'}
            {activeTab === 'sustainability' && 'Sustainability Manifesto'}
          </h1>
          <p className="text-xs sm:text-sm text-[#1E1E1E]/75">
            Transparent policies, prompt client care, and complete ethical commitment.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'faq' ? 'bg-[#145C3A] text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-[#E9DDC8]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> FAQ Help Center
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'returns' ? 'bg-[#145C3A] text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-[#E9DDC8]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" /> Return & Exchange
          </button>
          <button
            onClick={() => setActiveTab('sustainability')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'sustainability' ? 'bg-[#145C3A] text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-[#E9DDC8]'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" /> Sustainability Manifesto
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'privacy' ? 'bg-[#145C3A] text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-[#E9DDC8]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'terms' ? 'bg-[#145C3A] text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-[#E9DDC8]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Terms & Conditions
          </button>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#E9DDC8] shadow-xs">
          {/* TAB 1: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-6">
              <div className="border-b border-[#E9DDC8] pb-4">
                <h2 className="font-serif text-xl font-bold text-[#145C3A]">
                  Common Client Questions
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Answers regarding ingredients, shipping, returns, and sustainable packaging.
                </p>
              </div>

              <div className="divide-y divide-[#E9DDC8]/80">
                {faqs.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={index} className="py-4">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between text-left gap-4 font-serif font-semibold text-sm sm:text-base text-[#1E1E1E] hover:text-[#145C3A] transition-colors"
                      >
                        <span>{item.q}</span>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-[#145C3A] shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed pl-1 animate-in fade-in duration-200">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Still need help CTA */}
              <div className="mt-8 p-6 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#1E1E1E]">
                    Have a specific skin question?
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Our licensed aesthetician team is here to assist 7 days a week.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 bg-[#145C3A] text-white rounded-full text-xs font-bold hover:bg-[#0B452A] transition-colors shrink-0"
                >
                  Contact Concierge
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: RETURNS & EXCHANGES */}
          {activeTab === 'returns' && (
            <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <div className="border-b border-[#E9DDC8] pb-4">
                <h2 className="font-serif text-xl font-bold text-[#145C3A]">
                  Our 30-Day Radiant Guarantee
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Hassle-free complimentary returns on all skincare and cosmetic orders.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8] text-center space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto font-bold text-xs">
                    1
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">Initiate Online</h4>
                  <p className="text-[11px] text-gray-500">Contact concierge or enter your order number for a prepaid return label.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8] text-center space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto font-bold text-xs">
                    2
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">Pack Safely</h4>
                  <p className="text-[11px] text-gray-500">Place items in their protective packaging with the enclosed return docket.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8] text-center space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto font-bold text-xs">
                    3
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">Prompt Refund</h4>
                  <p className="text-[11px] text-gray-500">Refunds are issued to your original payment method within 48 hours of receipt.</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-[#1E1E1E]">Return Eligibility Terms</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
                  <li>Items must be returned within 30 days of the recorded delivery date.</li>
                  <li>Gently sampled products are accepted—we want you to love what you put on your skin.</li>
                  <li>Gift cards, bespoke holiday sample sets, and final clearance items are exempt from refunds.</li>
                  <li>For broken or damaged goods, snap a photo and email concierge@beautyshop.com for immediate replacement dispatch.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: SUSTAINABILITY */}
          {activeTab === 'sustainability' && (
            <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <div className="border-b border-[#E9DDC8] pb-4">
                <h2 className="font-serif text-xl font-bold text-[#145C3A]">
                  Our Sustainability Manifesto
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Committed to leaving the planet more vibrant than we found it.
                </p>
              </div>

              <p>
                True luxury is never built on environmental depletion. At Beauty Shop, every step of our product lifecycle—from regenerative soil cultivation to post-consumer bottle recycling—is engineered with circularity in mind.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8] space-y-2">
                  <Leaf className="w-6 h-6 text-[#145C3A]" />
                  <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">Regenerative Wildcrafting</h4>
                  <p className="text-xs text-gray-600">
                    We harvest only 30% of wild plant canopies at any time, allowing natural botanical ecosystems to replenish and thrive perpetually.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8] space-y-2">
                  <Package className="w-6 h-6 text-[#145C3A]" />
                  <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">Zero Single-Use Plastic</h4>
                  <p className="text-xs text-gray-600">
                    Our dropper caps and jars utilize upcycled aluminum, cork, and heavy UV-protective glass that protects delicate bio-active compounds.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <div className="border-b border-[#E9DDC8] pb-4">
                <h2 className="font-serif text-xl font-bold text-[#145C3A]">
                  Privacy & Data Protection Policy
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Last updated: February 2025. Fully GDPR and CCPA Compliant.
                </p>
              </div>
              <p>
                Beauty Shop respects your personal privacy. We never sell, lease, or monetize your personal data, skin health consultation records, or browsing history to third-party ad brokers.
              </p>
              <h4 className="font-serif font-bold text-[#1E1E1E] pt-2">Data We Collect</h4>
              <p className="text-xs text-gray-600">
                When you create an account, purchase products, or consult our shade-finder tool, we securely store your delivery address, transaction history, and encrypted authentication tokens. Payment details are processed directly via PCI-DSS Level 1 compliant financial gateways.
              </p>
              <h4 className="font-serif font-bold text-[#1E1E1E] pt-2">Your Rights</h4>
              <p className="text-xs text-gray-600">
                You possess the legal right to request a complete export of your personal data or immediate account deletion by writing to privacy@beautyshop.com.
              </p>
            </div>
          )}

          {/* TAB 5: TERMS */}
          {activeTab === 'terms' && (
            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <div className="border-b border-[#E9DDC8] pb-4">
                <h2 className="font-serif text-xl font-bold text-[#145C3A]">
                  User Terms & Conditions
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Effective as of January 1, 2025.
                </p>
              </div>
              <p>
                Welcome to Beauty Shop. By accessing or using our website, services, and online store, you agree to comply with and be bound by the following terms and conditions.
              </p>
              <h4 className="font-serif font-bold text-[#1E1E1E] pt-2">Cosmetic Use Disclaimer</h4>
              <p className="text-xs text-gray-600">
                Our skincare products are formulated for topical cosmetic use only. Products are not intended to diagnose, treat, cure, or prevent any medical dermatological diseases. We recommend patch testing any new botanical formulation 24 hours prior to full facial application.
              </p>
              <h4 className="font-serif font-bold text-[#1E1E1E] pt-2">Intellectual Property</h4>
              <p className="text-xs text-gray-600">
                All editorial photography, proprietary formulation naming, visual branding, and trademarks are the sole property of Beauty Shop Clean Luxury Inc.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
