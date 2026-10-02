// CLIENT CUSTOMIZATION: update this file first when adapting the template.
// Replace the sample contact details, social links, images, copy, prices,
// services, testimonials, opening hours, and palette for each salon client.
export const salonConfig = {
  name: 'ÉLAN BEAUTY STUDIO',
  shortName: 'ÉLAN',
  tagline: 'Where Beauty Meets Confidence',
  location: 'Coimbatore, Tamil Nadu',
  established: '2018',
  address: '123 Beauty Street, Coimbatore, Tamil Nadu',
  phone: '+91 XXXXX XXXXX',
  phoneLink: 'tel:+910000000000',
  email: 'hello@elanbeauty.com',
  whatsapp: 'https://wa.me/910000000000?text=Hello%20%C3%89LAN%2C%20I%27d%20like%20to%20book%20an%20appointment.',
  instagramHandle: '@elanbeautystudio',
  instagramUrl: 'https://www.instagram.com/elanbeautystudio/',
  facebookUrl: 'https://www.facebook.com/',
  youtubeUrl: 'https://www.youtube.com/',
  openingHours: [
    ['Monday – Saturday', '10:00 AM – 8:00 PM'],
    ['Sunday', '11:00 AM – 6:00 PM'],
  ],
  colors: {
    cream: '#f5f0e8',
    ivory: '#fbf8f3',
    beige: '#eae2d8',
    champagne: '#c9aa82',
    rose: '#986458',
    brown: '#59453d',
    ink: '#352b27',
    muted: '#76665d',
  },
  images: {
    hero: '/images/bridal-hero.jpg',
    studio: '/images/studio-interior.jpg',
    bridal: '/images/bridal-detail.jpg',
    beauty: '/images/beauty-portrait.jpg',
  },
};

export const stats = [
  { value: '500+', label: 'Happy clients' },
  { value: '8+', label: 'Years of experience' },
  { value: '25+', label: 'Beauty services' },
  { value: '4.9/5', label: 'Client rating' },
];

export const services = [
  {
    id: 'bridal-makeup',
    title: 'Bridal Makeup',
    category: 'Bridal',
    detail: 'Camera-ready bridal artistry, shaped around your features and your day.',
    price: 'From ₹4,999',
    image: '/images/bridal-hero.jpg',
    alt: 'Bride with softly glowing makeup and an ivory veil',
  },
  {
    id: 'party-makeup',
    title: 'Party Makeup',
    category: 'Makeup',
    detail: 'A polished, long-wearing look for celebrations, evenings and every occasion.',
    price: 'From ₹2,499',
    image: '/images/makeup-editorial.jpg',
    alt: 'A makeup artist adding a soft, precise finish to a client’s look',
  },
  {
    id: 'hair-styling',
    title: 'Hair Styling',
    category: 'Hair',
    detail: 'Romantic waves, sleek finishes and thoughtful up-dos that last beautifully.',
    price: 'From ₹1,499',
    image: '/images/hair-styling.jpg',
    alt: 'Long, polished dark hair styled in soft, flowing waves',
  },
  {
    id: 'hair-care',
    title: 'Hair Care',
    category: 'Hair',
    detail: 'Restorative treatments and expert care for softness, shine and healthy hair.',
    price: 'From ₹1,299',
    image: '/images/bridal-hair.jpg',
    alt: 'Traditional bridal bun with jasmine flowers and gold hair accents',
  },
  {
    id: 'facials-skincare',
    title: 'Facials & Skincare',
    category: 'Skin',
    detail: 'A skin-first facial tailored to your complexion, with a little time to unwind.',
    price: 'From ₹1,799',
    image: '/images/skin-ritual.jpg',
    alt: 'A relaxing facial treatment with a botanical face mask',
  },
  {
    id: 'saree-draping',
    title: 'Saree Draping',
    category: 'Bridal',
    detail: 'Beautifully considered draping that feels comfortable from first look to last dance.',
    price: 'From ₹999',
    image: '/images/bridal-hair.jpg',
    alt: 'Traditional bridal hair and a rich, intricately woven sari blouse',
  },
  {
    id: 'eyebrow-beauty',
    title: 'Eyebrow & Beauty Care',
    category: 'Skin',
    detail: 'Thoughtful finishing touches that bring balance to your natural features.',
    price: 'From ₹499',
    image: '/images/makeup-editorial.jpg',
    alt: 'Close beauty detail while an artist applies a finishing touch',
  },
  {
    id: 'spa-relaxation',
    title: 'Spa & Relaxation',
    category: 'Skin',
    detail: 'A restorative pause with soothing care, gentle touch and premium products.',
    price: 'From ₹1,499',
    image: '/images/skin-ritual.jpg',
    alt: 'A quiet, warm-toned facial treatment in progress',
  },
];

export const serviceCategories = ['All', 'Makeup', 'Hair', 'Skin', 'Bridal'];

export const gallery = [
  { id: 'golden-hour', category: 'Bridal', title: 'Golden hour glow', image: '/images/bridal-hero.jpg', alt: 'Bride in a soft ivory veil with luminous makeup' },
  { id: 'quiet-detail', category: 'Bridal', title: 'The quiet details', image: '/images/bridal-detail.jpg', alt: 'Softly styled bridal hair and delicate accessories' },
  { id: 'modern-beauty', category: 'Makeup', title: 'Modern romantic', image: '/images/makeup-editorial.jpg', alt: 'A makeup artist applying a rose-toned finish for a special occasion' },
  { id: 'studio-light', category: 'Studio', title: 'A softer kind of space', image: '/images/studio-interior.jpg', alt: 'Sunlit beauty studio with a sculptural arch and brass mirror' },
  { id: 'soft-focus', category: 'Hair', title: 'Soft focus', image: '/images/hair-styling.jpg', alt: 'Soft, polished waves with natural movement' },
  { id: 'the-finish', category: 'Makeup', title: 'The finishing touch', image: '/images/beauty-portrait.jpg', alt: 'A calm, confident beauty look with softly defined eyes' },
];

export const galleryCategories = ['All', 'Bridal', 'Makeup', 'Hair', 'Studio'];

export const testimonials = [
  {
    quote: 'Absolutely loved my bridal makeup. The entire experience was elegant and stress-free.',
    name: 'Priya',
    occasion: 'Bridal client',
  },
  {
    quote: 'The team understood exactly what I wanted. My makeup looked beautiful in every photograph.',
    name: 'Ananya',
    occasion: 'Makeup client',
  },
  {
    quote: 'The studio is gorgeous and the service is amazing.',
    name: 'Keerthana',
    occasion: 'Studio client',
  },
];

export const studioFeatures = [
  { number: '01', title: 'Experienced Professionals', detail: 'A thoughtful team with an eye for detail and a feel for what suits you.' },
  { number: '02', title: 'Premium Products', detail: 'Carefully selected products chosen for comfort, quality and lasting results.' },
  { number: '03', title: 'Personalized Service', detail: 'Every appointment begins with listening and a plan made around you.' },
  { number: '04', title: 'A Hygienic, Comfortable Studio', detail: 'A calm, clean space where you can settle in and feel looked after.' },
];