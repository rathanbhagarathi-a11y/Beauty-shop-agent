import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { ActivePage } from '../types';

interface ContactViewProps {
  onNavigate: (page: ActivePage) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Skincare Consultation',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-2">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1E1E] mb-3">
            We’re Here for Your Beauty Journey
          </h1>
          <p className="text-sm text-gray-600">
            Have questions about ingredients, shade matching, or an existing order? Our licensed beauty advisors respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info & Hours (col-span-5) */}
          <div className="lg:col-span-5 bg-[#145C3A] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#C9A45C]">
                Beauty Shop Concierge
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                Reach Our Skincare Specialists
              </h2>
            </div>

            <div className="space-y-6 text-sm text-[#F8F5ED]/90">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Flagship Sanctuary</strong>
                  <span>184 Botanical Avenue, Presidio Heights<br />San Francisco, CA 94118</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Phone Support</strong>
                  <span>+1 (800) 555-GLOW (4569)</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Direct Email</strong>
                  <span>concierge@beautyshop.com</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Advisory Hours</strong>
                  <span>Monday – Friday: 8:00 AM – 8:00 PM EST<br />Saturday – Sunday: 10:00 AM – 6:00 PM EST</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/20">
              <span className="text-xs text-[#F8F5ED]/70 block">
                Looking for answers right away? Check our comprehensive FAQ.
              </span>
              <button
                onClick={() => onNavigate('home')}
                className="mt-2 text-xs font-bold text-[#C9A45C] hover:underline"
              >
                Browse Frequently Asked Questions →
              </button>
            </div>
          </div>

          {/* Right: Contact Form (col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E9DDC8] shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you, {form.name}. One of our beauty advisors has received your request and will contact you at {form.email} shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#145C3A] text-white rounded-full text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#1E1E1E] mb-2">
                  Send Us a Note
                </h3>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. eleanor@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                    Topic / Query Type
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                  >
                    <option value="Skincare Consultation">Personal Skincare Consultation</option>
                    <option value="Order Tracking & Returns">Order Status & Returns</option>
                    <option value="Product Ingredients Inquiry">Ingredient Safety & Allergies</option>
                    <option value="Press & Partnerships">Press & Collaborations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your skin type, current routine, or question..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#145C3A] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#0B452A] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
