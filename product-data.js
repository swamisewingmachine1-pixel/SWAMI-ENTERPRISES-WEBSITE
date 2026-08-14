/**
 * Shared product data — single source of truth for the catalog grid
 * (product-catalog.js) and the product detail page (product-detail.js).
 * Plain globals, not ES modules: this site loads scripts as classic
 * <script src> tags through its own "x-dc" page runtime, which does not
 * appear to support type="module".
 */
window.SHOP_PHONE = '919971336656';

window.SHOP_PRODUCTS = [
  // — Lockstitch (current Jack line-up we stock) —
  {
    id: 'jack-f6', name: 'Jack F6', category: 'Lockstitch', sub: 'Direct-drive · Computerized',
    blurb: 'Direct-drive, power-saving, fully computerized single-needle lockstitch machine. Our current industrial workhorse — in stock and set up for a demo at the shop.',
    specs: [
      ['Series', 'Lockstitch, direct drive'],
      ['Needle', 'DBx1, 11-18#'],
      ['Number of threads', '2'],
      ['Max stitch length', '5mm'],
      ['Presser foot lift (hand/auto)', '13mm / 6mm'],
      ['Max sewing speed', '5000 s.p.m.'],
      ['Motor', 'Built-in silent, energy-saving servo motor'],
      ['Lubrication', 'Semi-dry head, oil-free'],
      ['Lamp', 'Built-in LED lamp, adjustable brightness'],
      ['Feed', 'Automatic, computerized, auto thread trimmer'],
      ['Best for', 'General to medium-heavy garment stitching'],
      ['Availability', 'In stock']
    ],
    gallery: ['./uploads/jack-f6-hero.jpg', './uploads/jack-f6-side.jpg', './uploads/jack-f6-front34.jpg', './uploads/jack-f6-detail.jpg', './uploads/jack-f6-inuse.jpg']
  },
  {
    id: 'jack-a2c', name: 'Jack A2C', category: 'Lockstitch', sub: 'Computerized · Auto-trimmer',
    blurb: 'Computerized single-needle lockstitch machine with auto thread trimmer, from Jack’s A-series. Ask us for current stock and pricing.',
    specs: [
      ['Series', 'Lockstitch (A-series)'],
      ['Needle', 'DBx1, 11-18#'],
      ['Number of threads', '2'],
      ['Max stitch length', '5mm'],
      ['Presser foot lift (hand/auto)', '13mm / 6mm'],
      ['Max sewing speed', '5000 s.p.m.'],
      ['Motor', 'Direct-drive servo, up to 5.5Nm torque'],
      ['Controls', 'Manual bartack lever, knee-operated presser lift'],
      ['Feed', 'Computerized, auto-trimmer, auto backtack'],
      ['Best for', 'General garment stitching, production lines'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-a2c-hero.jpg', './uploads/jack-a2c-side.jpg', './uploads/jack-a2c-front34.jpg', './uploads/jack-a2c-detail.jpg', './uploads/jack-a2c-inuse.jpg']
  },
  {
    id: 'jack-a3c', name: 'Jack A3C', category: 'Lockstitch', sub: 'Computerized · Auto-trimmer',
    blurb: 'Computerized single-needle lockstitch machine with auto thread trimmer, from Jack’s A-series — a step up from the A2C with Jack’s newer intelligent control system.',
    specs: [
      ['Series', 'Lockstitch (A-series)'],
      ['Needle', 'DBx1, 11-18#'],
      ['Number of threads', '2'],
      ['Max stitch length', '5mm'],
      ['Presser foot lift (hand/auto)', '13mm / 6mm'],
      ['Max sewing speed', '5000 s.p.m.'],
      ['Motor', 'Direct-drive integrated servo motor'],
      ['Controls', 'Intelligent operation panel, one-key reset'],
      ['Feed', 'Computerized, auto-trimmer, auto backtack, auto foot lift'],
      ['Best for', 'General garment stitching, production lines'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-a3c-hero.jpg', './uploads/jack-a3c-side.jpg', './uploads/jack-a3c-front34.jpg', './uploads/jack-a3c-detail.jpg', './uploads/jack-a3c-inuse.jpg']
  },
  {
    id: 'jack-a4c', name: 'Jack A4C', category: 'Lockstitch', sub: 'AI-integrated · Auto-trimmer',
    blurb: 'AI-integrated single-needle direct-drive lockstitch machine, powered by Jack’s NTB system and Octopus “Nine-Brain” chip — Jack’s current flagship computerized lockstitch.',
    specs: [
      ['Series', 'Lockstitch (A-series, AI-integrated)'],
      ['Needle', 'DBx1, 11-18#'],
      ['Number of threads', '2'],
      ['Max stitch length', '5mm'],
      ['Presser foot lift (hand/auto)', '13mm / 6mm'],
      ['Max sewing speed', '5000 s.p.m.'],
      ['Control system', 'Jack NTB system with Octopus “Nine-Brain” AI chip'],
      ['Motor', 'Direct-drive integrated servo motor'],
      ['Feed', 'Computerized, auto-trimmer, auto backtack, auto foot lift, intelligent presser control'],
      ['Best for', 'General garment stitching, production lines'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-a4c-hero.jpg', './uploads/jack-a4c-side.jpg', './uploads/jack-a4c-front34.jpg', './uploads/jack-a4c-detail.jpg', './uploads/jack-a4c-inuse.jpg']
  }
];

window.SHOP_CATEGORIES = ['All', 'Lockstitch', 'Motors & Parts'];

// — Motors/Parts (no manufacturer catalog for these — generic/placeholder) —
window.SHOP_PRODUCTS.push(
  {
    id: 'motors', name: 'Motors', category: 'Motors & Parts', sub: 'Clutch & servo',
    blurb: 'Clutch and servo motors for industrial machines, sized and wired to match your setup.',
    specs: [['Types', 'Clutch, Servo'], ['Fits', 'Industrial machines'], ['Availability', 'In stock']],
    gallery: []
  },
  {
    id: 'parts', name: 'Spare Parts & Accessories', category: 'Motors & Parts', sub: 'Needles · Bobbins · Belts',
    blurb: 'Needles, bobbins, presser feet, belts and other consumables kept in stock for same-day fixes.',
    specs: [['Includes', 'Needles, bobbins, presser feet, belts'], ['Availability', 'In stock, same-day']],
    gallery: []
  }
);
