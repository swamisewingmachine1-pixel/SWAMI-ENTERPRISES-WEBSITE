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
  {
    id: 'jack-a5e', name: 'Jack A5E-B AMH2', category: 'Lockstitch', sub: 'AI-integrated lockstitch',
    blurb: 'AI-integrated computerized lockstitch with the largest operating space in its class — automatically adapts to changing fabric thickness mid-seam.',
    specs: [
      ['Series', 'Lockstitch (A-series), AI-integrated'],
      ['Needle', 'DBx1, 11-18# / DPx5, 18-21#'],
      ['Max sewing speed', 'Up to 5000 s.p.m.'],
      ['Operating space', '305 × 130mm — largest in its class'],
      ['Feed', 'Auto-trimmer, auto backtack, auto foot lift'],
      ['Best for', 'Shirts, suits, pants, down jackets'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-a5e-hero.jpg']
  },
  {
    id: 'jack-a6fe', name: 'Jack A6F-E', category: 'Lockstitch', sub: 'Digital needle-feed',
    blurb: 'Digital needle-feed computerized lockstitch with a sealed oil pan and a large 300mm sewing space — feeds smoothly with no short thread tail.',
    specs: [
      ['Series', 'Lockstitch, needle feed'],
      ['Needle', 'DBx1, 11-18# / DPx5, 18-21#'],
      ['Max sewing speed', 'Up to 4000 s.p.m.'],
      ['Sewing space', '300mm, large operating area'],
      ['Lubrication', 'Sealed oil pan, no oil stains'],
      ['Best for', 'Shirts, suits, pants, down jackets'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-a6fe-hero.jpg']
  },
  {
    id: 'jack-2002', name: 'Jack JK-2002G', category: 'Lockstitch', sub: '12mm stitch length',
    blurb: 'Large-hook, heavy-gauge lockstitch built for extra-long stitching — a 12mm stitch length for coarse work most machines in this class can’t do.',
    specs: [
      ['Series', 'Lockstitch, large hook'],
      ['Needle', 'DPx17, 22#'],
      ['Max stitch length', '12mm'],
      ['Max sewing speed', 'Up to 3000 s.p.m.'],
      ['Best for', 'Shirts, jeans, non-woven bags, shoes, bags'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-2002-hero.jpg']
  },
  {
    id: 'jack-5558g', name: 'Jack JK-5558G', category: 'Lockstitch', sub: 'Edge cutter & piping',
    blurb: 'Lockstitch fitted with an edge cutter and piping device in one pass — trims and seams simultaneously for clean-finish work.',
    specs: [
      ['Series', 'Lockstitch, edge cutter'],
      ['Needle', 'DBx1, 11-18#'],
      ['Max sewing speed', 'Up to 4000 s.p.m.'],
      ['Feature', 'Built-in edge cutter and piping device'],
      ['Best for', 'Shirts, suits, pants, down jackets'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-5558g-hero.jpg']
  },
  {
    id: 'jack-5559f', name: 'Jack JK-5559F-W', category: 'Lockstitch', sub: 'Digital edge cutter',
    blurb: 'Semi-dry computerized lockstitch with a stable built-in edge cutter — stepping-motor presser-foot lift for a smoother, quieter finish.',
    specs: [
      ['Series', 'Lockstitch, digital edge cutter'],
      ['Needle', 'DBx1, 11-18#'],
      ['Max sewing speed', 'Up to 4000 s.p.m.'],
      ['Feature', 'Stable built-in edge cutter, stepping-motor foot lift'],
      ['Best for', 'Shirts, suits, pants, down jackets'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-5559f-hero.jpg']
  },
  {
    id: 'jack-8558', name: 'Jack JK-8558G', category: 'Lockstitch', sub: 'Flatbed chain stitch',
    blurb: 'Power-saving flatbed chain-stitch machine, available in 1, 2 or 3-needle configurations, with a rear puller for umbrella, denim and T-shirt work.',
    specs: [
      ['Series', 'Chain stitch, flatbed'],
      ['Needle', 'TVx7, various gauges, 1/2/3-needle'],
      ['Max sewing speed', 'Up to 4000 s.p.m.'],
      ['Best for', 'Umbrella, denim, T-shirt (chain stitch)'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-8558-hero.jpg']
  },
  {
    id: 'jack-58450', name: 'Jack JK-58450J', category: 'Lockstitch', sub: 'Computerized double needle',
    blurb: 'Double-needle computerized lockstitch with auto cornering and a large sewing space — built-in presser-foot lifter, one-shaft drive.',
    specs: [
      ['Series', 'Lockstitch, double needle'],
      ['Needle', 'DPx5, multiple gauges'],
      ['Max sewing speed', 'Up to 3000 s.p.m.'],
      ['Feature', 'Auto cornering, built-in presser-foot lifter'],
      ['Best for', 'Umbrella, denim, T-shirt (chain-stitch work)'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-58450-hero.jpg']
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
  {
    id: 'jack-c60', name: 'Jack C60+', category: 'Overlock', sub: 'Advanced · Touch screen',
    blurb: 'Advanced overlock with a full touch-screen panel — production counter, adjustable speed, RFID and WiFi built in for factory-floor tracking.',
    specs: [
      ['Series', 'Overlock, advanced'],
      ['Max sewing speed', 'Up to 6000 s.p.m.'],
      ['Controls', 'Full touch-screen panel, voice guide, production counter'],
      ['Connectivity', 'Integrated RFID and WiFi'],
      ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-c60-hero.jpg']
  },
  {
    id: 'jack-c5t', name: 'Jack C5T', category: 'Overlock', sub: 'Digital · Top feed',
    blurb: 'Variable top-feed digital overlock built for heavy materials — super-fast start/stop response with no fabric dislocation.',
    specs: [
      ['Series', 'Overlock, digital top feed'],
      ['Needle', 'DCx27, 11#–19# (model-dependent)'],
      ['Max sewing speed', 'Up to 6000 s.p.m.'],
      ['Best for', 'Heavy materials, extra-heavy denim'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-c5t-hero.jpg']
  },
  {
    id: 'jack-797', name: 'Jack JK-797', category: 'Overlock', sub: 'Small-arm overlock',
    blurb: 'Small cylinder-bed, super-fast overlock with variable top feed — a compact bed for flexible, no-dislocation sewing on curved seams.',
    specs: [
      ['Series', 'Overlock, small-arm'],
      ['Needle', 'DCx27, 9#–11#'],
      ['Max sewing speed', 'Up to 7000 s.p.m.'],
      ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-797-hero.jpg']
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
  {
    id: 'jack-k10', name: 'Jack K10+-UT', category: 'Interlock', sub: 'Advanced · Touch screen',
    blurb: 'Jack’s top-of-line cylinder-bed interlock — full touch-screen control, built for the most demanding high-volume interlock production lines.',
    specs: [
      ['Series', 'Interlock (cylinder-bed), advanced'],
      ['Max sewing speed', 'Up to 6000 s.p.m.'],
      ['Controls', 'Full touch-screen panel, voice guide'],
      ['Feed', 'Active Feed system, auto thread trimmer'],
      ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-k10-hero.jpg']
  },
  {
    id: 'jack-8787', name: 'Jack JK-8787-01GX356/UT', category: 'Interlock', sub: 'Super high speed cylinder-bed',
    blurb: 'Super high-speed computerized cylinder-bed interlock with an electromagnetic direct-drive presser-foot lifter group.',
    specs: [
      ['Series', 'Interlock, cylinder-bed'],
      ['Stitch/Thread', '3 stitch / 5 thread'],
      ['Max sewing speed', 'Up to 4500 s.p.m.'],
      ['Best for', 'Shirts, suits, pants, down jackets'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-8787-hero.jpg']
  },
  {
    id: 'jack-8670', name: 'Jack JK-8670BDII/UT', category: 'Interlock', sub: 'Small cylinder-bed',
    blurb: 'High-speed computerized small cylinder-bed interlock (180mm circumference) with auto thread trimming and a built-in cooling fan.',
    specs: [
      ['Series', 'Interlock, small cylinder-bed'],
      ['Needle', 'UY128GAS, 11-14#'],
      ['Max sewing speed', 'Up to 4500 s.p.m.'],
      ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-8670-hero.jpg']
  },
  {
    id: 'jack-8009', name: 'Jack JK-8009VCDII/UTL', category: 'Interlock', sub: 'Multi-needle · Computerized',
    blurb: 'High-speed computerized multi-needle machine (up to 25 needles) with auto presser-foot lifting for elastic attaching, tape and waistband work.',
    specs: [
      ['Series', 'Interlock, multi-needle'],
      ['Needle', 'UO113, 14-16#'],
      ['Max sewing speed', 'Up to 3500 s.p.m.'],
      ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-8009-hero.jpg']
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
  {
    id: 'jack-h2', name: 'Jack H2', category: 'Heavy-Duty', sub: 'Basic top feed',
    blurb: 'Direct-drive top-and-bottom feeding lockstitch for heavy duty — strong feeding, big stitch length, built for sofas, car seats, luggage and bags.',
    specs: [
      ['Series', 'Heavy-Duty, top feed'],
      ['Needle', 'DPx17, 20-23#'],
      ['Max sewing speed', 'Up to 2000 s.p.m.'],
      ['Best for', 'Sofa, car seat, luggage, gloves, bags'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-h2-hero.jpg']
  },
  {
    id: 'jack-h5k', name: 'Jack H5K', category: 'Heavy-Duty', sub: 'Edge cutter · Top feed',
    blurb: 'Side-cutter synchronous heavy-duty lockstitch with a separated cutter for a neat cutting edge and strong durability.',
    specs: [
      ['Series', 'Heavy-Duty, edge cutter'],
      ['Needle', 'DPx17, 20-23#'],
      ['Max sewing speed', 'Up to 2000 s.p.m.'],
      ['Best for', 'Shirts, suits, pants, down jackets'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-h5k-hero.jpg']
  },
  {
    id: 'jack-z7', name: 'Jack Z7', category: 'Heavy-Duty', sub: 'Triple transport · Digital',
    blurb: 'Jack’s newest triple-transport digital lockstitch — needle, top and bottom feed move together for the strongest possible grip on thick, layered material.',
    specs: [
      ['Series', 'Heavy-Duty, triple transport'],
      ['Feed', 'Needle feed + top feed + bottom feed (triple transport)'],
      ['Controls', 'Full digital touch panel'],
      ['Best for', 'Sofa, car seat, luggage, heavy leather goods'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-z7-hero.jpg']
  },
  {
    id: 'jack-2030', name: 'Jack JK-2030G', category: 'Heavy-Duty', sub: 'Top & bottom feeding',
    blurb: 'Full-automatic top-and-bottom feeding computerized lockstitch for heavy duty, with a large working space for 8-layer leather work.',
    specs: [
      ['Series', 'Heavy-Duty, top & bottom feed'],
      ['Needle', 'DPx17, 20-23#'],
      ['Max sewing speed', 'Up to 2200 s.p.m.'],
      ['Best for', 'Sofa, car seat, luggage, shoes'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-2030-hero.jpg']
  },
  {
    id: 'jack-2060', name: 'Jack JK-2060G', category: 'Heavy-Duty', sub: 'Compound feeding',
    blurb: 'Full-automatic compound-feeding computerized lockstitch for heavy duty — large space, sews up to 8 layers of leather.',
    specs: [
      ['Series', 'Heavy-Duty, compound feed'],
      ['Needle', 'DPx17, 20-23#'],
      ['Max sewing speed', 'Up to 2200 s.p.m.'],
      ['Best for', 'Sofa, car seat, luggage, shoes'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-2060-hero.jpg']
  },
  {
    id: 'jack-s5', name: 'Jack S5', category: 'Heavy-Duty', sub: 'Post bed · Synchronized rolls',
    blurb: 'Computerized post-bed roller-feed machine with a built-in panel, QR-code software upgrades and a 100% stitch-overlap ratio.',
    specs: [
      ['Series', 'Post bed'],
      ['Needle', 'INDPX5#16'],
      ['Max sewing speed', 'Up to 3000 s.p.m.'],
      ['Best for', 'Shirts, suits, pants, down jackets'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-s5-hero.jpg']
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
  },
  {
    id: 'jack-1790', name: 'Jack JK-T1790G', category: 'Special Machine', sub: 'Computerized buttonhole',
    blurb: 'Super-fast computerized buttonhole machine with good knitting adaptation and an intelligent high-speed, high-efficiency system.',
    specs: [
      ['Type', 'Buttonhole'],
      ['Needle', 'DPx5, 12#'],
      ['Max sewing speed', 'Up to 4200 s.p.m.'],
      ['Best for', 'Keyhole seams: shirts, cardigans, work clothes, jeans'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-1790-hero.jpg']
  },
  {
    id: 'jack-9270', name: 'Jack JK-T9270D/9280D', category: 'Special Machine', sub: 'Feed-off-the-arm',
    blurb: 'Mechatronic, direct-drive feed-off-the-arm machine with automatic needle stopping and a lubricated rear puller — widely used across garment types.',
    specs: [
      ['Type', 'Feed-off-the-arm'],
      ['Needle', 'TVx64 12# / TVx5 21#'],
      ['Max sewing speed', 'Up to 3500 s.p.m.'],
      ['Best for', 'General feed-off-the-arm work'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-9270-hero.jpg']
  },
  {
    id: 'jack-8740', name: 'Jack JK-8740', category: 'Special Machine', sub: '4-needle feed-off-arm',
    blurb: 'Feed-off-arm interlock with a large operating-space seat design for easier sewing of large fabric pieces — 4 needles, 6 threads.',
    specs: [
      ['Type', 'Feed-off-the-arm, multi-needle'],
      ['Needles / Threads', '4 needles / 6 thread'],
      ['Max sewing speed', 'Up to 3200 s.p.m.'],
      ['Best for', 'Shirts, suits, pants, down jackets'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-8740-hero.jpg']
  },
  {
    id: 'jack-m7', name: 'Jack M7', category: 'Special Machine', sub: 'Extra-large foldable template machine',
    blurb: 'Extra-large 140×95cm template machine that folds down for easy transport and storage — Jack’s largest foldable template machine.',
    specs: [
      ['Type', 'Template / pattern machine'],
      ['Sewing area', '1400 × 950mm (140 × 95cm)'],
      ['Footprint', 'Foldable for easy transport and storage'],
      ['Availability', 'Order on request']
    ],
    gallery: ['./uploads/jack-m7-hero.jpg']
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
