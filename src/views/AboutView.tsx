import React from 'react';
import { Leaf, Award, HeartHandshake, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ActivePage } from '../types';

interface AboutViewProps {
  onNavigate: (page: ActivePage) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block">
            Our Brand Story
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] leading-tight">
            Nourishing Skin with Clean, Botanical Integrity
          </h1>
          <p className="text-base sm:text-lg text-[#1E1E1E]/80 leading-relaxed">
            Founded with a reverence for botanical biology and gentle dermatological science, Beauty Shop bridges nature’s most potent extracts with modern skincare elegance.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80"
              alt="Woman in spa environment"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A]">
              Ethical Formulation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">
              From Organic Soil to Radiant Glow
            </h2>
            <p className="text-sm sm:text-base text-[#1E1E1E]/80 leading-relaxed">
              We source organic rosehip from the Chilean Andes, cold-pressed argan from women’s cooperatives in southwestern Morocco, and sustainably harvested marine algae from coastal Brittany.
            </p>
            <p className="text-sm sm:text-base text-[#1E1E1E]/80 leading-relaxed">
              Our products are dermatologically validated, hypoallergenic, and packaged in endlessly recyclable amber flacons to protect cold-pressed phytochemicals against photo-oxidation.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E9DDC8]">
              <div>
                <span className="font-serif text-3xl font-bold text-[#145C3A] block">24+</span>
                <span className="text-xs text-gray-500">Curated Categories</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-[#145C3A] block">2500+</span>
                <span className="text-xs text-gray-500">Artisanal Batches</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-[#145C3A] block">99%</span>
                <span className="text-xs text-gray-500">Satisfaction Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Pillars */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E9DDC8] shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
              Our Non-Negotiable Standards
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Every drop is held to the highest standard of international clean beauty certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8]">
              <div className="w-12 h-12 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1E1E1E] mb-1">100% Vegan</h4>
              <p className="text-xs text-gray-600">Zero animal derivatives or byproducts in any formula.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8]">
              <div className="w-12 h-12 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1E1E1E] mb-1">Cruelty Free</h4>
              <p className="text-xs text-gray-600">Certified by Leaping Bunny international testing boards.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8]">
              <div className="w-12 h-12 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1E1E1E] mb-1">Derm Tested</h4>
              <p className="text-xs text-gray-600">Rigorous clinical trials ensuring sensitivity safety.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8]">
              <div className="w-12 h-12 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1E1E1E] mb-1">Clean INCI</h4>
              <p className="text-xs text-gray-600">No sulfates, silicones, PEGs, parabens, or synthetic dyes.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-4 bg-[#145C3A] text-white rounded-full text-xs sm:text-sm font-bold hover:bg-[#0B452A] transition-colors inline-flex items-center gap-2 shadow-md cursor-pointer"
          >
            Explore the Collection <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
