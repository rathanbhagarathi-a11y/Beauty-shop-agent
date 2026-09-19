import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RefreshCw, ShoppingBag, ShieldCheck } from 'lucide-react';
import { ActivePage, Product } from '../types';

interface ShadeFinderViewProps {
  onNavigate: (page: ActivePage) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ShadeFinderView: React.FC<ShadeFinderViewProps> = ({
  onNavigate,
  onAddToCart,
  onSelectProduct
}) => {
  const [step, setStep] = useState(1);
  const [tone, setTone] = useState<string>('Light');
  const [undertone, setUndertone] = useState<string>('Neutral');
  const [finish, setFinish] = useState<string>('Dewy Radiant');
  const [showResult, setShowResult] = useState(false);

  const tones = [
    { name: 'Fair', desc: 'Porcelain to ivory, sunburns very easily', color: '#FDF0E7' },
    { name: 'Light', desc: 'Cream to peach, sometimes burns then tans', color: '#F7E4D3' },
    { name: 'Medium', desc: 'Golden beige to honey, tans naturally', color: '#DFC0A4' },
    { name: 'Tan', desc: 'Warm amber to caramel, rarely burns', color: '#BA8F6A' },
    { name: 'Deep', desc: 'Rich espresso to chestnut, deep melanin', color: '#6A442E' },
  ];

  const undertones = [
    { name: 'Cool (Rosy)', desc: 'Veins appear blue/purple; silver jewelry flatters you best; burns easily.', test: 'Pink/Berry undertones' },
    { name: 'Neutral', desc: 'Veins appear blue-green; both gold and silver jewelry look harmonious.', test: 'Equal peach & neutral balance' },
    { name: 'Warm (Golden)', desc: 'Veins appear greenish; gold jewelry flatters you best; tans into golden bronze.', test: 'Yellow/Olive undertones' },
  ];

  const finishes = [
    { name: 'Dewy Radiant', desc: 'Luminous glass-skin hydration powered by organic squalane.', tag: 'Bestseller for dry/normal skin' },
    { name: 'Satin Natural', desc: 'Skin-like undetectable healthy glow, balancing oils and hydration.', tag: 'All skin types' },
    { name: 'Soft Velvet Matte', desc: 'Pore-blurring mineral finish that resists heat and humidity.', tag: 'Ideal for combination/oily skin' },
  ];

  const matchedProduct: Product = {
    id: 'foundation-match-01',
    name: `Luminous Botanical Tinted Serum - Shade ${tone} ${undertone.split(' ')[0]}`,
    price: 48,
    rating: 4.9,
    reviewsCount: 384,
    category: 'Makeup',
    subcategory: 'Foundation & Tint',
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop',
    description: `Custom matched formulation for ${tone} skin with ${undertone} undertones and a ${finish} finish. Infused with 10% cold-pressed rosehip seed oil, zinc oxide SPF 30 mineral shield, and bio-fermented snow mushroom for weightless, second-skin coverage that never creases.`,
    ingredients: 'Zinc Oxide 12%, Organic Squalane, Wild Rosehip Seed Oil, Tremella Fuciformis Extract, Mineral Iron Oxides',
    keyIngredients: ['Zinc Oxide 12%', 'Organic Squalane', 'Wild Rosehip Seed Oil', 'Tremella Fuciformis Extract'],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true
  };

  const handleFinish = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setStep(1);
    setShowResult(false);
  };

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] bg-[#E8F0E7] px-3 py-1 rounded-full inline-block">
            Virtual Shade Matching Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1E1E]">
            Find Your Flawless Match
          </h1>
          <p className="text-xs sm:text-sm text-[#1E1E1E]/80">
            Take our 60-second shade diagnostic to discover your bespoke botanical complexion tint and foundation.
          </p>
        </div>

        {!showResult ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#E9DDC8] shadow-xs space-y-8">
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-6 border-b border-[#E9DDC8]">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 1 ? 'bg-[#145C3A] text-white' : 'bg-[#E8F0E7] text-[#145C3A]'
                }`}>
                  1
                </span>
                <span className="text-xs font-semibold text-[#1E1E1E]">Skin Depth</span>
              </div>
              <div className="w-12 h-px bg-[#E9DDC8]" />
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 2 ? 'bg-[#145C3A] text-white' : 'bg-[#E8F0E7] text-[#145C3A]'
                }`}>
                  2
                </span>
                <span className="text-xs font-semibold text-[#1E1E1E]">Undertone</span>
              </div>
              <div className="w-12 h-px bg-[#E9DDC8]" />
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 3 ? 'bg-[#145C3A] text-white' : 'bg-[#E8F0E7] text-[#145C3A]'
                }`}>
                  3
                </span>
                <span className="text-xs font-semibold text-[#1E1E1E]">Ideal Finish</span>
              </div>
            </div>

            {/* STEP 1: TONE */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#1E1E1E]">
                  Step 1: What is your general skin depth?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tones.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setTone(item.name)}
                      className={`p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                        tone === item.name 
                          ? 'border-[#145C3A] bg-[#E8F0E7]/40 ring-1 ring-[#145C3A]' 
                          : 'border-[#E9DDC8] hover:border-[#145C3A]'
                      }`}
                    >
                      <span 
                        className="w-8 h-8 rounded-full border border-black/10 shrink-0 shadow-2xs"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">{item.name}</h4>
                        <p className="text-[11px] text-gray-500">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 bg-[#145C3A] text-white rounded-full text-xs font-bold hover:bg-[#0B452A] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    Continue to Undertone <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: UNDERTONE */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#1E1E1E]">
                  Step 2: What is your primary undertone?
                </h3>
                <div className="space-y-3">
                  {undertones.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setUndertone(item.name)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        undertone === item.name 
                          ? 'border-[#145C3A] bg-[#E8F0E7]/40 ring-1 ring-[#145C3A]' 
                          : 'border-[#E9DDC8] hover:border-[#145C3A]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                        <span className="text-[10px] text-[#145C3A] font-medium block">Key indicator: {item.test}</span>
                      </div>
                      {undertone === item.name && (
                        <div className="w-6 h-6 rounded-full bg-[#145C3A] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-gray-500 hover:text-black cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-[#145C3A] text-white rounded-full text-xs font-bold hover:bg-[#0B452A] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    Continue to Finish <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: FINISH */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#1E1E1E]">
                  Step 3: What texture & finish do you love?
                </h3>
                <div className="space-y-3">
                  {finishes.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setFinish(item.name)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        finish === item.name 
                          ? 'border-[#145C3A] bg-[#E8F0E7]/40 ring-1 ring-[#145C3A]' 
                          : 'border-[#E9DDC8] hover:border-[#145C3A]'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#145C3A] block">
                          {item.tag}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                      </div>
                      {finish === item.name && (
                        <div className="w-6 h-6 rounded-full bg-[#145C3A] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs font-bold text-gray-500 hover:text-black cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleFinish}
                    className="px-6 py-2.5 bg-[#145C3A] text-white rounded-full text-xs font-bold hover:bg-[#0B452A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    Reveal My Custom Match <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* RESULT CARD */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#E9DDC8] shadow-lg space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2 pb-4 border-b border-[#E9DDC8]">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E8F0E7] text-[#145C3A] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" /> 99.4% Precision Scientific Match
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
                Your Bespoke Formula Is Ready
              </h2>
              <p className="text-xs text-gray-600">
                Matched for: <strong>{tone} Depth</strong> • <strong>{undertone}</strong> • <strong>{finish}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8]">
              <img
                src={matchedProduct.image}
                alt={matchedProduct.name}
                className="w-32 h-32 object-cover rounded-xl border border-[#E9DDC8]"
              />
              <div className="space-y-2 flex-1 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#145C3A]">
                  Clean Botanical Mineral Complex
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#1E1E1E]">
                  {matchedProduct.name}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {matchedProduct.description}
                </p>
                <div className="text-sm font-bold text-[#145C3A]">
                  ${matchedProduct.price}.00
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => onAddToCart(matchedProduct)}
                className="py-3 bg-[#145C3A] text-white rounded-full text-xs font-bold hover:bg-[#0B452A] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" /> Add Match to Bag ($48)
              </button>
              <button
                onClick={() => {
                  onSelectProduct(matchedProduct);
                  onNavigate('product-detail');
                }}
                className="py-3 bg-white text-[#145C3A] border border-[#145C3A] rounded-full text-xs font-bold hover:bg-[#E8F0E7] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore Full Ingredients <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={handleReset}
                className="text-xs text-gray-500 hover:text-[#145C3A] font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake Shade Advisor Diagnostic
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
