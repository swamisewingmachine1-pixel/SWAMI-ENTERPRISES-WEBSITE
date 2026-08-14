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
  },

  // — Overlock (current Jack line-up) —
  {
    id: 'jack-c7-urus', name: 'Jack C7 URUS', category: 'Overlock', sub: 'AI-integrated · Overlock',
    blurb: 'Jack’s flagship AI overlock machine — reads fabric thickness in real time and adjusts pressure and feed automatically for a perfect stitch, even on difficult materials.',
    specs: [
      ['Series', 'Overlock, AI-integrated'],
      ['Max sewing speed', '7000 s.p.m.'],
      ['Torque', 'Automatic torque increase up to 9.2Nm for thickness changes'],
      ['Presser foot lift', 'Digital, stepper-motor controlled, up to 10mm'],
      ['Thread cutter', 'Automatic electric cutter, short thread remaining (down to 5mm)'],
      ['Feed dog selector', 'Mechanical L/M/H lever for light, medium, heavy fabric'],
      ['Sewing modes', 'Manual, semi-automatic, fully automatic (photocell)'],
      ['Connectivity', 'Integrated WiFi, Industry 4.0 ready'],
      ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-c7-hero.jpg']
  },
  {
    id: 'jack-e4s', name: 'Jack E4S', category: 'Overlock', sub: 'L/M/H feeding selector',
    blurb: 'Power-saving standard overlock with a mechanical L/M/H feed selector — our current everyday overlock for edge-finishing and seaming.',
    specs: [
      ['Series', 'Overlock'],
      ['Feed selector', 'L/M/H lever for light, medium, heavy fabric'],
      ['Response', 'Start/stop response shortened by 40-50%'],
      ['Lubrication', 'Enclosed needle bar, sealed oil tray — no leaks'],
      ['Controls', 'One-key reset intelligent panel, LED light'],
      ['Motor', 'Single-shaft, integrated energy-saving motor'],
      ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-e4s-hero.jpg']
  },

  // — Interlock (current Jack line-up) —
  {
    id: 'jack-k7-ut', name: 'Jack K7-UT', category: 'Interlock', sub: 'AI-integrated · Cylinder-bed',
    blurb: 'Jack’s current cylinder-bed interlock, replacing the older K6 — an AI chip reads fabric thickness in real time and adapts automatically, from heavy to light fabric.',
    specs: [
      ['Series', 'Interlock (cylinder-bed), AI-integrated'],
      ['Max sewing speed', '6000 s.p.m.'],
      ['Transport torque', '9.2Nm'],
      ['Controls', 'Touch screen with voice guide'],
      ['Feed', 'Active Feed system, auto thread trimmer'],
      ['Build', 'Rhombic arm, 20mm edge-to-foot clearance; nano-ceramic thread guides'],
      ['Vibration / noise', 'Reduced vibration and noise vs. previous generation'],
      ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-k7-hero.jpg']
  },
  {
    id: 'jack-w5e-ut', name: 'Jack W5E-UT', category: 'Interlock', sub: 'Flat-bed · Computerized',
    blurb: 'Jack’s current computerized flat-bed interlock with an automatic thread trimmer — a step up from the older W4, built for elastic attaching, tape and waistband work.',
    specs: [
      ['Series', 'Interlock (flat-bed), computerized'],
      ['Max sewing speed', 'Up to 5500 s.p.m.'],
      ['Feed', 'Full-automatic, auto thread trimmer'],
      ['Controls', 'Digital speed display, one-key reset'],
      ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-w5e-hero.jpg']
  },

  // — Heavy-Duty (current Jack line-up) —
  {
    id: 'jack-h7', name: 'Jack H7', category: 'Heavy-Duty', sub: 'Digitalized top feed',
    blurb: 'Jack’s current top-feed heavy-duty lockstitch, replacing the older H5/H6 — pierces 10+ layers of leather with a fully digital, 16-level presser foot lift.',
    specs: [
      ['Series', 'Heavy-Duty, digitalized top feed'],
      ['Motor', '750W integrated motor'],
      ['Presser foot lift', '16 adjustable levels, stepper-motor controlled'],
      ['Stitch length', '1.3mm – 5.5mm, graduated adjustment'],
      ['Material capability', 'Pierces 10+ layers of leather; handles 8 layers cleanly'],
      ['Controls', 'Digital knee lifter with micro-lift, double-row LED lights'],
      ['Best for', 'Sofa, car seat, luggage, gloves, bags, shoes'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-h7-hero.jpg']
  },
  {
    id: 'jack-s7', name: 'Jack S7', category: 'Heavy-Duty', sub: 'Post bed · Digitalized',
    blurb: 'Jack’s current digitalized post-bed machine — three independent stepper motors and a 5-inch touch screen for accurate, noiseless roller-feed sewing.',
    specs: [
      ['Series', 'Post bed, digitalized'],
      ['Motors', '3 stepper motors (needle bar + two rollers) plus main shaft motor'],
      ['Screen', '5-inch multilanguage touch screen'],
      ['Thread trimmer', 'Short-thread cut to 3mm precision'],
      ['Perforation capacity', 'Penetrates 110+ layers of A4 paper'],
      ['Connectivity', 'Industry 4.0 WiFi module (optional)'],
      ['Best for', 'Shirts, jeans, non-woven bags, shoes, bags'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-s7-hero.jpg']
  },

  // — Special Machines (current Jack line-up) —
  {
    id: 'jack-t1900', name: 'Jack JK-T1900/1903', category: 'Special Machine', sub: 'Electronic bartack & button sewer',
    blurb: 'Electronic bartack and button-sewing machine with a touch-screen panel and voice guidance — one machine, transformable between bartack and button-sewing setups.',
    specs: [
      ['Type', 'Bartack / button sewer'],
      ['Stitch field', '60 × 50mm'],
      ['Controls', 'Touch-screen panel with pattern preview, voice guidance'],
      ['Variants', '1900G (shank buttons), 1903GR-D (auto button feeder), 1900-GMC (chain-cutter suction)'],
      ['Connectivity', 'Industry 4.0 WiFi module (optional)'],
      ['Best for', 'Elastic bands, labels, bags, shoes, reinforcement seams'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-1900-hero.jpg']
  },
  {
    id: 'jack-m9', name: 'Jack M9', category: 'Special Machine', sub: '360° rotating template machine',
    blurb: 'Jack’s current flagship template machine — a 360°-rotating aircraft-aluminium head sews in any direction, folds down to a fraction of its footprint in under a minute.',
    specs: [
      ['Type', 'Template / pattern machine'],
      ['Sewing area', '1400 × 950mm (140 × 95cm)'],
      ['Footprint', 'Open 220×250cm; folds to 104×205cm in under 1 minute'],
      ['Max speed', 'Up to 3600 s.p.m.'],
      ['Head', '360° rotating, aircraft-aluminium construction (30% lighter)'],
      ['Controls', 'Touch screen panel, DXF file compatible'],
      ['Connectivity', 'Industry 4.0 cloud connectivity'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-m9-hero.jpg']
  }
];

window.SHOP_CATEGORIES = ['All', 'Lockstitch', 'Overlock', 'Interlock', 'Heavy-Duty', 'Special Machine', 'Motors & Parts'];

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
