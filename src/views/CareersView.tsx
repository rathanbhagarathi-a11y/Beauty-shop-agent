import React, { useState } from 'react';
import { Briefcase, Heart, Sparkles, CheckCircle2, ArrowRight, Send, Check } from 'lucide-react';
import { ActivePage } from '../types';

interface CareersViewProps {
  onNavigate: (page: ActivePage) => void;
}

export const CareersView: React.FC<CareersViewProps> = ({ onNavigate }) => {
  const [appliedRole, setAppliedRole] = useState<string | null>(null);

  const openings = [
    {
      title: 'Senior Green Formulation Chemist',
      department: 'R&D / Clean Lab',
      location: 'San Francisco, CA (Hybrid)',
      type: 'Full-time',
      desc: 'Formulate next-generation bioactive emulsions, anhydrous serums, and mineral cosmetics compliant with EU Clean standard.'
    },
    {
      title: 'Holistic Skin Concierge & Shade Specialist',
      department: 'Client Experience',
      location: 'New York, NY (In-Store)',
      type: 'Full-time',
      desc: 'Conduct 1-on-1 shade matching and custom botanical skincare regimens at our SoHo flagship store.'
    },
    {
      title: 'Sustainable Packaging & Sourcing Lead',
      department: 'Supply Chain & ESG',
      location: 'London, UK / Remote',
      type: 'Full-time',
      desc: 'Oversee our zero-virgin-plastic supply line, PCR aluminum sourcing, and carbon-neutral distribution.'
    },
    {
      title: 'Digital Editorial & Content Storyteller',
      department: 'Creative & Marketing',
      location: 'Los Angeles, CA / Remote',
      type: 'Full-time',
      desc: 'Craft compelling masterclasses, ingredient deep-dives, and video editorials for The Botanical Journal.'
    }
  ];

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] bg-[#E8F0E7] px-3 py-1 rounded-full inline-block">
            Join The Movement
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1E1E]">
            Careers & Culture at Beauty Shop
          </h1>
          <p className="text-xs sm:text-base text-[#1E1E1E]/80 leading-relaxed">
            We are botanists, cosmetic chemists, and aesthetic devotees united by a single vision: redefining luxury skincare through uncompromising clean science and botanical harmony.
          </p>
        </div>

        {/* Culture Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E9DDC8] shadow-xs space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1E1E1E]">Clean Innovation</h3>
            <p className="text-xs text-gray-600">
              We reinvest 15% of annual revenues into independent green chemistry testing and regenerative farming partnerships.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E9DDC8] shadow-xs space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1E1E1E]">Mindful Well-being</h3>
            <p className="text-xs text-gray-600">
              Four-day summer workweeks, comprehensive family wellness stipends, and an annual $1,500 botanical skincare allowance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E9DDC8] shadow-xs space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1E1E1E]">Growth & Equity</h3>
            <p className="text-xs text-gray-600">
              Stock options for all permanent team members, annual education sabbatical budgets, and mentorship with global beauty founders.
            </p>
          </div>
        </div>

        {/* Open Positions */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="border-b border-[#E9DDC8] pb-4">
            <h2 className="font-serif text-2xl font-bold text-[#145C3A]">
              Open Opportunities ({openings.length})
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Explore open positions across our clean laboratories, ateliers, and digital headquarters.
            </p>
          </div>

          <div className="space-y-4">
            {openings.map((job) => (
              <div
                key={job.title}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E9DDC8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E8F0E7] text-[#145C3A] px-2.5 py-0.5 rounded-full">
                      {job.department}
                    </span>
                    <span className="text-[10px] text-gray-500">• {job.location}</span>
                    <span className="text-[10px] text-gray-500">• {job.type}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#1E1E1E]">
                    {job.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {job.desc}
                  </p>
                </div>

                <button
                  onClick={() => setAppliedRole(job.title)}
                  className="px-5 py-2.5 bg-[#145C3A] text-white rounded-full text-xs font-bold hover:bg-[#0B452A] transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {appliedRole === job.title ? (
                    <>
                      <Check className="w-4 h-4 text-[#C9A45C]" /> Application Received
                    </>
                  ) : (
                    <>
                      Apply Now <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* General Application */}
          <div className="p-6 rounded-3xl bg-[#FAF8F3] border border-[#E9DDC8] text-center space-y-2">
            <h4 className="font-serif font-bold text-base text-[#1E1E1E]">
              Don't see your specific role?
            </h4>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              We are perpetually eager to meet exceptional talent in natural sciences and beauty. Send your portfolio and resume to <strong>careers@beautyshop.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
