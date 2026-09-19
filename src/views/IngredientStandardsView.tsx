import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  Ban, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  Award, 
  Droplet, 
  HeartHandshake, 
  ArrowRight,
  Info
} from 'lucide-react';
import { ActivePage } from '../types';

interface IngredientStandardsViewProps {
  onNavigate: (page: ActivePage) => void;
}

export const IngredientStandardsView: React.FC<IngredientStandardsViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'banned' | 'hero'>('all');

  // Comprehensive Banned List
  const bannedIngredients = [
    { name: 'Parabens (Methyl, Propyl, Butyl)', category: 'Preservative', reason: 'Disrupts endocrine hormone balance and causes skin sensitivity.' },
    { name: 'Sulfates (SLS, SLES, ALS)', category: 'Surfactant', reason: 'Strips protective lipid barrier causing chronic dryness and irritation.' },
    { name: 'Synthetic Fragrance / Parfum', category: 'Aromatics', reason: 'Hidden phthalates and sensitizing petrochemical allergens.' },
    { name: 'Phthalates (DBP, DEHP, DEP)', category: 'Plasticizer', reason: 'Potential reproductive and cellular endocrine toxicity.' },
    { name: 'Mineral Oil & Petrolatum', category: 'Petrochemical', reason: 'Comedogenic barrier occlusion that traps bacteria and impedes respiration.' },
    { name: 'Formaldehyde & Releasers (DMDM Hydantoin)', category: 'Preservative', reason: 'Classified carcinogen and known severe contact allergen.' },
    { name: 'Oxybenzone & Octinoxate', category: 'Chemical UV Filter', reason: 'Bleaches marine coral reefs and induces phototoxic contact dermatitis.' },
    { name: 'Silicones (Dimethicone, Cyclomethicone)', category: 'Occlusive', reason: 'Non-biodegradable synthetic polymers that create false surface smoothness.' },
    { name: 'Microplastics & Polyethylene Beads', category: 'Exfoliant', reason: 'Environmental waterway bio-accumulation harming aquatic wildlife.' },
    { name: 'PEGs & Ethoxylated Compounds', category: 'Emulsifier', reason: 'Risk of contamination with 1,4-dioxane carcinogen.' },
    { name: 'Coal Tar Dyes (CI 77266, D&C Colors)', category: 'Synthetic Pigment', reason: 'Heavy metal contaminants linked to systemic toxicity.' },
    { name: 'Triclosan & Triclocarban', category: 'Antimicrobial', reason: 'Promotes antibiotic microbial resistance and thyroid deregulation.' },
  ];

  // Hero Botanical Actives
  const heroIngredients = [
    {
      name: 'Cold-Pressed Wild Rosehip Seed Oil',
      origin: 'Chilean Andes Highlands',
      benefit: 'Natural trans-retinoic acid and omega-3, 6 & 9 to accelerate cellular renewal and fade dark spots.',
      source: '100% Certified Organic Rosa Canina',
    },
    {
      name: 'Bio-Fermented Snow Mushroom (Tremella)',
      origin: 'Fujian Mountain Mist Forests',
      benefit: 'Holds 500x its weight in water; particles smaller than Hyaluronic Acid penetrate deep into epidermal strata.',
      source: 'Cold Enzymatic Fermentation',
    },
    {
      name: '100% Plant-Derived Olive Squalane',
      origin: 'Mediterranean Basin',
      benefit: 'Biomimetic to human sebum. Instantly restores skin barrier cohesion without clogging pores.',
      source: 'Sustainably Upcycled Olive Oil',
    },
    {
      name: 'Organic Damask Rose Hydrosol',
      origin: 'Kazanlak Valley of Roses, Bulgaria',
      benefit: 'Delicate astringent and anti-inflammatory tonic that balances natural skin pH.',
      source: 'Single-Distillation Steam Extractions',
    },
    {
      name: 'Wild Atlantic Marine Kelp (Laminaria)',
      origin: 'Brittany Emerald Coastline',
      benefit: 'Rich in 60+ bio-trace minerals, fucoidan, and protective polysaccharides that quench oxidative stress.',
      source: 'Wild-Harvested Hand Diver Sustainable Gatherings',
    },
    {
      name: 'Clinical Vitamin C Ester (THD Ascorbate)',
      origin: 'Clean Bio-Synthesis',
      benefit: 'Lipid-soluble, 50x more stable than L-ascorbic acid. Clarifies hyperpigmentation without stinging.',
      source: 'Non-Acidic Sensitive-Safe Molecule',
    },
  ];

  // Filtered queries
  const filteredBanned = bannedIngredients.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHeroes = heroIngredients.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.benefit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0E7] text-[#145C3A] text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Clinical Botanical Transparency
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1E1E] leading-tight">
            Our Ingredient Standards
          </h1>
          <p className="text-sm sm:text-base text-[#1E1E1E]/80 leading-relaxed">
            We believe you deserve full honesty about what touches your skin every day. Our formulations adhere to the strictest European clean cosmetics regulations, banning over 2,400 questionable compounds in favor of pure, nutrient-dense botanical synergy.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E9DDC8] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto">
              <Ban className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1E1E1E]">Zero Toxins</h3>
            <p className="text-xs text-gray-600">
              No parabens, sulfates, phthalates, synthetic colorants, mineral oils, or endocrine disruptors. Ever.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E9DDC8] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto">
              <Droplet className="w-6 h-6 text-[#145C3A]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1E1E1E]">Cold-Pressed Potency</h3>
            <p className="text-xs text-gray-600">
              Unrefined botanical seed oils extracted without high heat or solvents to preserve heat-sensitive antioxidants.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E9DDC8] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto">
              <Award className="w-6 h-6 text-[#145C3A]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1E1E1E]">Dermatologist Verified</h3>
            <p className="text-xs text-gray-600">
              All final batches undergo independent 50-person Human Repeat Insult Patch Testing (HRIPT) for hypoallergenic safety.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E9DDC8] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto">
              <HeartHandshake className="w-6 h-6 text-[#145C3A]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1E1E1E]">100% Cruelty-Free</h3>
            <p className="text-xs text-gray-600">
              Certified by Leaping Bunny and PETA. We never test on animals, nor do we commission third-party animal testing.
            </p>
          </div>
        </div>

        {/* Interactive Search / Filter Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DDC8] shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                Ingredient Transparency Index
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Search any compound or explore our strictly forbidden vs. hero active directory.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ingredient (e.g. Parabens, Squalane)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#E9DDC8] bg-[#FAF8F3] text-xs text-[#1E1E1E] focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                />
              </div>

              <div className="flex gap-1 bg-[#FAF8F3] p-1 rounded-full border border-[#E9DDC8] shrink-0">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeFilter === 'all' ? 'bg-[#145C3A] text-white shadow-2xs' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter('hero')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeFilter === 'hero' ? 'bg-[#145C3A] text-white shadow-2xs' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Hero Actives
                </button>
                <button
                  onClick={() => setActiveFilter('banned')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeFilter === 'banned' ? 'bg-[#145C3A] text-white shadow-2xs' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Banned List
                </button>
              </div>
            </div>
          </div>

          {/* Section: Hero Actives */}
          {(activeFilter === 'all' || activeFilter === 'hero') && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E9DDC8]">
                <Leaf className="w-5 h-5 text-[#145C3A]" />
                <h3 className="font-serif text-xl font-bold text-[#145C3A]">
                  Our Revered Botanical Actives ({filteredHeroes.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredHeroes.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8] flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#145C3A] block mb-1">
                        {item.origin}
                      </span>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#1E1E1E]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                        {item.benefit}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E9DDC8]/60 flex items-center justify-between text-[11px] text-[#145C3A] font-semibold">
                      <span>✓ {item.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: The Banned 30+ List */}
          {(activeFilter === 'all' || activeFilter === 'banned') && (
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E9DDC8]">
                <Ban className="w-5 h-5 text-red-600" />
                <h3 className="font-serif text-xl font-bold text-red-700">
                  Strictly Banned Ingredients ({filteredBanned.length})
                </h3>
              </div>

              <div className="divide-y divide-[#E9DDC8]/80 border border-[#E9DDC8] rounded-2xl overflow-hidden bg-white">
                {filteredBanned.map((item, idx) => (
                  <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-red-50/40 transition-colors">
                    <div className="sm:w-1/3">
                      <span className="text-[10px] uppercase font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full inline-block mb-1">
                        {item.category}
                      </span>
                      <h5 className="font-serif font-bold text-sm text-[#1E1E1E]">
                        {item.name}
                      </h5>
                    </div>

                    <div className="sm:w-2/3 flex items-start gap-2 text-xs text-gray-600">
                      <Info className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span><strong>Why excluded:</strong> {item.reason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#145C3A] rounded-3xl p-8 sm:p-12 text-white text-center max-w-3xl mx-auto space-y-4 shadow-xl">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A45C]">
            Experience Pure Formulations
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold">
            Ready to Transform Your Daily Ritual?
          </h2>
          <p className="text-xs sm:text-sm text-[#E8F0E7]/90 max-w-lg mx-auto leading-relaxed">
            Every formula is crafted with these strict ethical standards in small batches for optimal potency and skin radiance.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-3.5 bg-[#C9A45C] text-[#0B452A] rounded-full text-xs sm:text-sm font-bold hover:bg-white transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              Shop Clean Skincare <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
