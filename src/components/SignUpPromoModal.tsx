import React, { useState } from 'react';
import { X, Sparkles, Check, Copy, Percent, Gift, Mail, ArrowRight } from 'lucide-react';

interface SignUpPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon?: (code: string) => void;
}

export const SignUpPromoModal: React.FC<SignUpPromoModalProps> = ({
  isOpen,
  onClose,
  onApplyCoupon,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const promoCode = 'WELCOME20';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setIsSubmitted(true);
      if (onApplyCoupon) {
        onApplyCoupon(promoCode);
      }
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#FAF8F3] border border-[#E9DDC8] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 border border-[#E9DDC8] flex items-center justify-center text-gray-500 hover:text-[#1E1E1E] hover:bg-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Top Banner */}
        <div className="bg-[#145C3A] text-white p-6 text-center relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A45C] text-[#0B452A] text-xs font-bold uppercase tracking-wider mb-1">
              <Gift className="w-3.5 h-3.5" /> Exclusive Welcome Privilege
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              GET 20% OFF
            </h3>
            <p className="text-xs text-[#E8F0E7]">
              On your very first organic botanical order
            </p>
          </div>
          {/* Subtle background glow */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#C9A45C]/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs sm:text-sm text-[#1E1E1E]/80 text-center leading-relaxed">
                Join our botanical community to unlock <strong>20% OFF</strong> your initial order, plus access early batch releases, skin consultations, and clean ritual tips.
              </p>

              <div>
                <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                  Your First Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sophie"
                  className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-white text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sophie@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-white text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#145C3A] text-white rounded-full text-xs sm:text-sm font-bold tracking-wider hover:bg-[#0B452A] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer mt-2"
              >
                <Percent className="w-4 h-4" /> Claim My 20% Discount
              </button>

              <p className="text-[11px] text-gray-400 text-center">
                Instant delivery to your screen. No spam. You may unsubscribe at any time.
              </p>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-7 h-7" />
              </div>

              <h4 className="font-serif text-xl font-bold text-[#1E1E1E]">
                Welcome to the Family, {name || 'Friend'}!
              </h4>

              <p className="text-xs sm:text-sm text-gray-600">
                Your exclusive 20% discount code is ready. Use this code at checkout to save 20% on any item:
              </p>

              {/* Code Box */}
              <div className="flex items-center justify-center gap-3 p-4 bg-white border-2 border-dashed border-[#145C3A] rounded-2xl max-w-xs mx-auto">
                <span className="font-mono text-xl font-bold text-[#145C3A] tracking-wider">
                  {promoCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-[#E8F0E7] text-[#145C3A] hover:bg-[#145C3A] hover:text-white transition-colors"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copied && (
                <span className="text-xs text-[#145C3A] font-bold block animate-fade-in">
                  ✓ Copied to clipboard!
                </span>
              )}

              <button
                onClick={onClose}
                className="w-full py-3.5 bg-[#145C3A] text-white rounded-full text-xs sm:text-sm font-bold hover:bg-[#0B452A] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                Start Shopping With 20% OFF <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
