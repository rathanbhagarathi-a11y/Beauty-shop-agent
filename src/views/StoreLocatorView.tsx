import React, { useState } from 'react';
import { MapPin, Clock, Phone, Sparkles, Navigation, Calendar, Check } from 'lucide-react';
import { ActivePage } from '../types';

interface StoreLocatorViewProps {
  onNavigate: (page: ActivePage) => void;
}

export const StoreLocatorView: React.FC<StoreLocatorViewProps> = ({ onNavigate }) => {
  const [selectedCity, setSelectedCity] = useState('New York');
  const [bookedStore, setBookedStore] = useState<string | null>(null);

  const boutiques = [
    {
      city: 'New York',
      name: 'SoHo Botanical Flagship',
      address: '482 Broome Street, New York, NY 10013',
      phone: '+1 (212) 555-0192',
      hours: 'Mon - Sat: 10:00 AM – 7:00 PM | Sun: 11:00 AM – 6:00 PM',
      amenities: ['Complimentary Skin Analysis', 'Custom Facial Mist Bar', 'Full Shade Match Studio'],
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop'
    },
    {
      city: 'San Francisco',
      name: 'Pacific Heights Sanctuary',
      address: '2108 Fillmore Street, San Francisco, CA 94115',
      phone: '+1 (415) 555-0841',
      hours: 'Mon - Sun: 10:00 AM – 6:00 PM',
      amenities: ['Organic Tea Lounge', 'Refill Station', 'Holistic Esthetician Consultations'],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
    },
    {
      city: 'Los Angeles',
      name: 'Melrose Place Atelier',
      address: '8452 Melrose Place, West Hollywood, CA 90069',
      phone: '+1 (323) 555-0329',
      hours: 'Tue - Sun: 10:30 AM – 6:30 PM',
      amenities: ['Courtyard Garden Terrace', 'Express Glow Facials', 'Aromatherapy Bar'],
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop'
    },
    {
      city: 'London',
      name: 'Mayfair Clean Boutique',
      address: '14 Mount Street, Mayfair, London W1K 2RF',
      phone: '+44 20 7946 0912',
      hours: 'Mon - Sat: 10:00 AM – 6:30 PM',
      amenities: ['British Herbarium Showcase', 'Private VIP Suite', 'Shade Advisor Appointments'],
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] bg-[#E8F0E7] px-3 py-1 rounded-full inline-block">
            Our Sanctuaries
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1E1E]">
            Store Locator & Ateliers
          </h1>
          <p className="text-xs sm:text-sm text-[#1E1E1E]/80">
            Step inside our peaceful sanctuaries for hands-on sensory testing, complimentary skin consultations, and customized shade matching.
          </p>
        </div>

        {/* City Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {boutiques.map((b) => (
            <button
              key={b.city}
              onClick={() => setSelectedCity(b.city)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCity === b.city 
                  ? 'bg-[#145C3A] text-white shadow-xs' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-[#E9DDC8]'
              }`}
            >
              {b.city}
            </button>
          ))}
        </div>

        {/* Boutiques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {boutiques
            .filter((b) => selectedCity === 'All' || b.city === selectedCity)
            .map((store) => (
              <div key={store.name} className="bg-white rounded-3xl overflow-hidden border border-[#E9DDC8] shadow-xs flex flex-col">
                <div className="h-56 w-full overflow-hidden relative">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#145C3A] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {store.city} Flagship
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl font-bold text-[#1E1E1E]">
                      {store.name}
                    </h3>
                    <div className="space-y-2 text-xs text-gray-600">
                      <p className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#145C3A] shrink-0 mt-0.5" />
                        <span>{store.address}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#145C3A] shrink-0" />
                        <span>{store.phone}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-[#145C3A] shrink-0 mt-0.5" />
                        <span>{store.hours}</span>
                      </p>
                    </div>

                    <div className="pt-2">
                      <h4 className="text-[11px] uppercase tracking-wider font-bold text-[#145C3A] mb-2">
                        Sanctuary Services
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {store.amenities.map((item, i) => (
                          <span key={i} className="text-[10px] bg-[#FAF8F3] border border-[#E9DDC8] text-[#1E1E1E] px-2.5 py-1 rounded-md">
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E9DDC8]/60 flex gap-2">
                    <button
                      onClick={() => setBookedStore(store.name)}
                      className="flex-1 py-2.5 bg-[#145C3A] text-white rounded-full text-xs font-bold hover:bg-[#0B452A] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {bookedStore === store.name ? (
                        <>
                          <Check className="w-4 h-4 text-[#C9A45C]" /> Consultation Booked!
                        </>
                      ) : (
                        <>
                          <Calendar className="w-3.5 h-3.5" /> Book Complimentary Glow Ritual
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
