import { CollectionDefinition } from '../types';

export const BEAUTY_COLLECTIONS: CollectionDefinition[] = [
  {
    id: 'makeup',
    name: 'Makeup',
    emoji: '💄',
    tagline: 'Clean color cosmetics, radiant bases & high-pigment botanicals',
    subcategories: [
      'Foundation',
      'Concealer',
      'Compact',
      'Blush',
      'Lipstick',
      'Lip Liner',
      'Mascara',
      'Eyeliner',
      'Eyeshadow'
    ]
  },
  {
    id: 'skincare',
    name: 'Skincare',
    emoji: '🧴',
    tagline: 'Clinically proven, organic botanicals for a lit-from-within glow',
    subcategories: [
      'Face Wash',
      'Moisturizer',
      'Sunscreen',
      'Serum',
      'Toner',
      'Face Mask'
    ]
  },
  {
    id: 'haircare',
    name: 'Hair care',
    emoji: '💇‍♀️',
    tagline: 'Plant-powered restorative shampoos, scalp oils & keratin therapies',
    subcategories: [
      'Shampoo',
      'Conditioner',
      'Hair Oil',
      'Hair Serum',
      'Hair Color'
    ]
  },
  {
    id: 'nailcare',
    name: 'Nail care',
    emoji: '💅',
    tagline: '21-free non-toxic polishes, precision tools & salon artificials',
    subcategories: [
      'Nail Polish',
      'Remover',
      'Nail Cutter',
      'Nail File',
      'Artificial Nails'
    ]
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    emoji: '🌸',
    tagline: 'Artisanal Eau de Parfum, botanical body sprays & gentle deos',
    subcategories: [
      'Perfume',
      'Body Spray',
      'Deodorant'
    ]
  },
  {
    id: 'personalcare',
    name: 'Personal care',
    emoji: '🧼',
    tagline: 'Spa-grade bath washes, nourishing body lotions & rich hand balms',
    subcategories: [
      'Body Wash',
      'Soap',
      'Scrub',
      'Lotion',
      'Hand Cream'
    ]
  },
  {
    id: 'beautytools',
    name: 'Beauty tools',
    emoji: '🪮',
    tagline: 'Sandalwood combs, vegan brushes, silk bands & precision blenders',
    subcategories: [
      'Comb',
      'Hair Brush',
      'Hair Clips',
      'Rubber Bands',
      'Makeup Brushes',
      'Beauty Blender'
    ]
  },
  {
    id: 'other',
    name: 'Other',
    emoji: '👁️',
    tagline: 'Faux-mink lashes, brow pomades, royal bindis & pure herbal mehendi',
    subcategories: [
      'Eyelashes',
      'Eyebrow Products',
      'Bindi',
      'Mehendi',
      'Waxing Products'
    ]
  }
];
