export const mockServices = [
  // 1. Beauty by Ada Services
  {
    id: 'svc-001',
    providerId: 'prov-001',
    categoryId: 'hairstyling',
    title: 'Knotless Braids (Standard / Boho)',
    description: 'Neat, lightweight, tension-free knotless braids. Scalp wash & blowdry prep included upon request. Extensions can be provided or brought by client.',
    photos: [
      'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800',
    ],
    variants: [
      {
        id: 'var-001',
        name: 'Small (Waist Length)',
        priceKobo: 900000, // ₦9,000
        durationMinutes: 240,
        description: 'Fine parted small size, waist length. Very full & lasts 8+ weeks.',
      },
      {
        id: 'var-002',
        name: 'Medium (Mid-Back Length)',
        priceKobo: 650000, // ₦6,500
        durationMinutes: 180,
        description: 'Most popular campus length. Clean square partings.',
      },
      {
        id: 'var-003',
        name: 'Large / Jumbo (Bra Length)',
        priceKobo: 500000, // ₦5,000
        durationMinutes: 120,
        description: 'Quick session for lecture weeks. Thick, bold parts.',
      },
      {
        id: 'var-004',
        name: 'Boho Curly Add-On (French Curls)',
        priceKobo: 800000, // ₦8,000
        durationMinutes: 210,
        description: 'Medium knotless braids with wavy curly human hair extensions throughout.',
      },
    ],
  },
  {
    id: 'svc-002',
    providerId: 'prov-001',
    categoryId: 'hairstyling',
    title: 'Stitch Cornrows & All-Back',
    description: 'Crisp, razor-sharp stitch cornrows using precision rat-tail parting. Clean lines that stay laid for weeks.',
    photos: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    ],
    variants: [
      {
        id: 'var-005',
        name: '6 - 8 Straight Back Stitch',
        priceKobo: 450000, // ₦4,500
        durationMinutes: 90,
        description: 'Classic straight-back stitch rows.',
      },
      {
        id: 'var-006',
        name: '10 - 12 Detailed Stitch Pattern',
        priceKobo: 600000, // ₦6,000
        durationMinutes: 130,
        description: 'Intricate zig-zag or curved stitch designs with heart accents.',
      },
    ],
  },

  // 2. Tunde Cuts & Grooming Services
  {
    id: 'svc-003',
    providerId: 'prov-002',
    categoryId: 'barbering',
    title: 'Signature Haircut & Taper Fade',
    description: 'Precision haircut with cordless clippers, skin fade graduation, straight razor contouring, and aftershave balm treatment.',
    photos: [
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
    ],
    variants: [
      {
        id: 'var-007',
        name: 'Low / Mid / High Taper Fade',
        priceKobo: 250000, // ₦2,500
        durationMinutes: 40,
        description: 'Clean fade + razor hairline shape up.',
      },
      {
        id: 'var-008',
        name: 'Haircut + Beard Sculpt & Hot Towel',
        priceKobo: 350000, // ₦3,500
        durationMinutes: 55,
        description: 'Full haircut, beard trim & oil conditioning with hot towel treatment.',
      },
      {
        id: 'var-009',
        name: 'Express Hairline Shape Up Only',
        priceKobo: 150000, // ₦1,500
        durationMinutes: 20,
        description: 'Crisp razor edge touch-up between cuts.',
      },
    ],
  },

  // 3. Nails by Chichi
  {
    id: 'svc-004',
    providerId: 'prov-003',
    categoryId: 'nails',
    title: 'Acrylic Sculpted Full Set',
    description: 'Hand-sculpted acrylic enhancements using odorless EMA monomer. Includes cuticle prep, shaping, and gel topcoat.',
    photos: [
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800',
    ],
    variants: [
      {
        id: 'var-010',
        name: 'Short / Active Length Acrylics',
        priceKobo: 400000, // ₦4,000
        durationMinutes: 75,
        description: 'Practical, exam-safe length in square, round, or coffin shape.',
      },
      {
        id: 'var-011',
        name: 'Medium Length French Ombre',
        priceKobo: 550000, // ₦5,500
        durationMinutes: 90,
        description: 'Baby boomer / classic french gradient acrylic set.',
      },
      {
        id: 'var-012',
        name: 'Long Set with 3D Charms & Chrome Art',
        priceKobo: 750000, // ₦7,500
        durationMinutes: 120,
        description: 'Showstopper set with chrome powders, gems, and custom art.',
      },
    ],
  },

  // 4. Blessing Glam Studio
  {
    id: 'svc-005',
    providerId: 'prov-004',
    categoryId: 'makeup',
    title: 'Professional Glam Makeup',
    description: 'Long-wearing, humidity-resistant makeup application with full lash install. Flawless photography finish.',
    photos: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800',
    ],
    variants: [
      {
        id: 'var-013',
        name: 'Soft Campus Glam',
        priceKobo: 600000, // ₦6,000
        durationMinutes: 60,
        description: 'Skin-like base, neutral eyeshadow, and mink lashes. Perfect for presentations or dates.',
      },
      {
        id: 'var-014',
        name: 'Full Birthday / Event Beat',
        priceKobo: 900000, // ₦9,000
        durationMinutes: 90,
        description: 'Cut crease or smokey eye, contouring, high-impact highlight, and setting mist.',
      },
    ],
  },

  // 5. Lash & Brow Lounge
  {
    id: 'svc-006',
    providerId: 'prov-005',
    categoryId: 'lashes-brows',
    title: 'Individual Lash Extensions',
    description: 'Carefully isolated individual lashes applied 1mm from root to preserve natural lash growth.',
    photos: [
      'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&q=80&w=800',
    ],
    variants: [
      {
        id: 'var-015',
        name: 'Classic Natural Set (1:1)',
        priceKobo: 450000, // ₦4,500
        durationMinutes: 75,
        description: 'Subtle mascara look, lightweight & comfortable.',
      },
      {
        id: 'var-016',
        name: 'Hybrid Wispy Cat Eye',
        priceKobo: 650000, // ₦6,500
        durationMinutes: 90,
        description: 'Fluffy volume fans mixed with classic spikes for textured glam.',
      },
    ],
  },
];
