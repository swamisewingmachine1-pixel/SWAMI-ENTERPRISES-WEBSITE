/**
 * Shared product data — single source of truth for the catalog grid
 * (product-catalog.js) and the product detail page (product-detail.js).
 * Plain globals, not ES modules: this site loads scripts as classic
 * <script src> tags through its own "x-dc" page runtime, which does not
 * appear to support type="module".
 */
window.SHOP_PHONE = '919971336656';

window.SHOP_PRODUCTS = [
  // — Lockstitch —
  {
    id: 'jack-f6', name: 'Jack F6', category: 'Lockstitch', sub: 'Direct-drive · Computerized',
    blurb: 'Direct-drive, power-saving, fully computerized single-needle lockstitch machine. Our current industrial workhorse — in stock and set up for a demo at the shop.',
    specs: [['Series', 'Lockstitch (direct drive)'], ['Stitch', 'Single-needle lockstitch'], ['Feed', 'Automatic, computerized'], ['Best for', 'General to medium-heavy garment stitching'], ['Availability', 'In stock']],
    gallery: ['./uploads/jack-f6-hero.jpg', './uploads/jack-f6-side.jpg', './uploads/jack-f6-front34.jpg', './uploads/jack-f6-detail.jpg', './uploads/jack-f6-table.jpg', './uploads/jack-f6-inuse.jpg']
  },
  {
    id: 'jack-a2c', name: 'Jack A2C', category: 'Lockstitch', sub: 'Computerized · Auto-trimmer',
    blurb: 'Computerized single-needle lockstitch machine with auto thread trimmer, from Jack’s A-series. Ask us for current stock and pricing.',
    specs: [['Series', 'Lockstitch (A-series)'], ['Stitch', 'Single-needle lockstitch'], ['Feed', 'Computerized, auto-trimmer'], ['Best for', 'General garment stitching, production lines'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jack-a2c-hero.jpg', './uploads/jack-a2c-side.jpg', './uploads/jack-a2c-front34.jpg', './uploads/jack-a2c-detail.jpg', './uploads/jack-a2c-table.jpg', './uploads/jack-a2c-inuse.jpg']
  },
  {
    id: 'jack-a3c', name: 'Jack A3C', category: 'Lockstitch', sub: 'Computerized · Auto-trimmer',
    blurb: 'Computerized single-needle lockstitch machine with auto thread trimmer, from Jack’s A-series. Ask us for current stock and pricing.',
    specs: [['Series', 'Lockstitch (A-series)'], ['Stitch', 'Single-needle lockstitch'], ['Feed', 'Computerized, auto-trimmer'], ['Best for', 'General garment stitching, production lines'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jack-a3c-hero.jpg', './uploads/jack-a3c-side.jpg', './uploads/jack-a3c-front34.jpg', './uploads/jack-a3c-detail.jpg', './uploads/jack-a3c-table.jpg', './uploads/jack-a3c-inuse.jpg']
  },
  {
    id: 'jack-a4c', name: 'Jack A4C', category: 'Lockstitch', sub: 'Computerized · Auto-trimmer',
    blurb: 'Computerized single-needle lockstitch machine with auto thread trimmer, from Jack’s A-series. Ask us for current stock and pricing.',
    specs: [['Series', 'Lockstitch (A-series)'], ['Stitch', 'Single-needle lockstitch'], ['Feed', 'Computerized, auto-trimmer'], ['Best for', 'General garment stitching, production lines'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jack-a4c-hero.jpg', './uploads/jack-a4c-side.jpg', './uploads/jack-a4c-front34.jpg', './uploads/jack-a4c-detail.jpg', './uploads/jack-a4c-table.jpg', './uploads/jack-a4c-inuse.jpg']
  },
  {
    id: 'jack-a4f', name: 'Jack A4F', category: 'Lockstitch', sub: 'Super-fast · Computerized',
    blurb: 'Super-fast computerized lockstitch machine, Germany-inspired design, with stepping-motor stitch control for a quieter, more precise stitch.',
    specs: [['Series', 'Lockstitch'], ['Needle', 'DBx1 11-18# / DPx5 18-21#'], ['Max speed', 'Up to 5000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/a4f.jpg']
  },
  {
    id: 'jack-a7', name: 'Jack A7', category: 'Lockstitch', sub: 'Intelligent · Light & heavy duty',
    blurb: 'Digital-setting computerized lockstitch with a sealed, oil-free pan and accurate stitch length control — presets a clean stitch for almost any fabric.',
    specs: [['Series', 'Lockstitch'], ['Needle', 'DBx1 11-18# / DPx5 18-21#'], ['Max speed', 'Up to 5000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/a7.jpg']
  },
  {
    id: 'jack-a8', name: 'Jack A8', category: 'Lockstitch', sub: 'Intelligent feeding · Oil-free',
    blurb: 'Oil-free, IoT-ready lockstitch machine with a large 305mm sewing space and semi-dry head for clean, low-maintenance running.',
    specs: [['Series', 'Lockstitch'], ['Needle', 'DBx1 11-18#'], ['Max speed', 'Up to 5000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/a8.jpg']
  },
  {
    id: 'jack-a6f-e', name: 'Jack A6F-E', category: 'Lockstitch', sub: 'Computerized needle feed',
    blurb: 'Needle-feed computerized lockstitch with a sealed oil pan and 300mm large sewing space — feeds smoothly with no short thread tail.',
    specs: [['Series', 'Lockstitch'], ['Needle', 'DBx1 11-18# / DPx5 18-21#'], ['Max speed', 'Up to 4000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/a6f-e.jpg']
  },
  {
    id: 'jack-a5e', name: 'Jack A5E', category: 'Lockstitch', sub: 'Large operation space',
    blurb: 'Computerized lockstitch with the largest operating space in its class (305×130mm) for easier handling of bigger garment pieces.',
    specs: [['Series', 'Lockstitch'], ['Needle', 'DBx1 11-18# / DPx5 18-21#'], ['Max speed', 'Up to 5000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/a5e.jpg']
  },
  {
    id: 'jack-f5', name: 'Jack F5', category: 'Lockstitch', sub: 'Power-saving · Direct drive',
    blurb: 'Direct-drive integrated lockstitch machine built for power saving and high efficiency, with an easy, smart control panel.',
    specs: [['Series', 'Lockstitch'], ['Needle', 'DBx1 11-18# / DPx5 18-21#'], ['Max speed', 'Up to 5000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/f5.jpg']
  },
  {
    id: 'jack-a2b', name: 'Jack A2B', category: 'Lockstitch', sub: 'Auto trimmer',
    blurb: 'Computerized lockstitch with an automatic thread trimmer that leaves under 4cm of thread tail — about 30% more efficient than a standard machine.',
    specs: [['Series', 'Lockstitch'], ['Needle', 'DBx1 11-18# / DPx5 18-21#'], ['Max speed', 'Up to 5000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/a2b.jpg']
  },
  {
    id: 'jack-58450j', name: 'Jack JK-58450J', category: 'Lockstitch', sub: 'Computerized double needle',
    blurb: 'Double-needle computerized lockstitch with auto cornering and a large sewing space — built-in presser-foot lifter, one-shaft drive.',
    specs: [['Series', 'Lockstitch'], ['Needle', 'DPx5, multiple gauges'], ['Max speed', 'Up to 3000 s.p.m.'], ['Best for', 'Umbrella, denim, T-shirt (chain-stitch work)'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-58450j.jpg']
  },
  {
    id: 'jack-5559f-w', name: 'Jack JK-5559F-W', category: 'Lockstitch', sub: 'Computerized edge cutter',
    blurb: 'Semi-dry computerized lockstitch with a stable built-in edge cutter — stepping-motor presser-foot lift for a smoother, quieter finish.',
    specs: [['Series', 'Lockstitch'], ['Needle', 'DBx1 11-18#'], ['Max speed', 'Up to 4000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-5559f-w.jpg']
  },
  {
    id: 'jack-8558g', name: 'Jack JK-8558G', category: 'Lockstitch', sub: 'Power-saving chain stitch',
    blurb: 'Semi-dry, power-saving chain-stitch machine with a rear puller and slant/trigonal needle options for umbrella, denim and T-shirt work.',
    specs: [['Series', 'Chain stitch'], ['Needle', 'TVx7, various gauges'], ['Max speed', 'Up to 4000 s.p.m.'], ['Best for', 'Umbrella, denim, T-shirt (chain stitch)'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-8558g.jpg']
  },

  // — Overlock —
  {
    id: 'jack-c6', name: 'Jack C6', category: 'Overlock', sub: 'Intelligent overlock',
    blurb: 'Intelligent overlock machine that auto-adapts to fabric thickness (Auto / Light / Medium / Heavy-duty modes) for edge-finishing and seaming on knit and woven fabrics.',
    specs: [['Series', 'Overlock'], ['Needle', 'DCx27, 9#–19# (model-dependent)'], ['Max speed', 'Up to 7000 s.p.m.'], ['Modes', 'Auto, Light, Medium, Heavy-duty'], ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jack-c6-hero.jpg']
  },
  {
    id: 'jack-c5s', name: 'Jack C5S', category: 'Overlock', sub: 'Short thread remaining',
    blurb: 'Light-and-heavy quick-adjustable overlock with short thread remaining for more efficiency and durability, front-and-back suction for clean sewing.',
    specs: [['Series', 'Overlock'], ['Needle', 'DCx27, 9#–19# (model-dependent)'], ['Max speed', 'Up to 7000 s.p.m.'], ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'], ['Availability', 'Order on request']],
    gallery: ['./uploads/c5s.jpg']
  },
  {
    id: 'jack-c5t', name: 'Jack C5T', category: 'Overlock', sub: 'Variable top feed · Computerized',
    blurb: 'Variable top-feed computerized overlock built for heavy materials — super-fast start/stop response with no fabric dislocation.',
    specs: [['Series', 'Overlock'], ['Needle', 'DCx27, 11#–19# (model-dependent)'], ['Max speed', 'Up to 6000 s.p.m.'], ['Best for', 'Heavy materials, extra-heavy denim'], ['Availability', 'Order on request']],
    gallery: ['./uploads/c5t.jpg']
  },
  {
    id: 'jack-e3', name: 'Jack E3', category: 'Overlock', sub: 'High speed · Direct drive',
    blurb: 'Direct-drive high-speed overlock with an integrated handwheel design and fully-enclosed needle bar oil return for clean, power-saving operation.',
    specs: [['Series', 'Overlock'], ['Needle', '9#–19# (model-dependent)'], ['Max speed', 'Up to 5500 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/e3.jpg']
  },
  {
    id: 'jack-e4s', name: 'Jack E4S', category: 'Overlock', sub: 'Light & heavy adjustable',
    blurb: 'Power-saving overlock that adjusts freely between light and heavy fabric with quick start/stop response and a one-key reset.',
    specs: [['Series', 'Overlock'], ['Needle', '9#–19# (model-dependent)'], ['Max speed', 'Up to 5500 s.p.m.'], ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'], ['Availability', 'Order on request']],
    gallery: ['./uploads/e4s.jpg']
  },
  {
    id: 'jack-797tdi', name: 'Jack JK-797TDI-4/KS/FR01', category: 'Overlock', sub: 'Small cylinder-bed · Variable top feed',
    blurb: 'Small cylinder-bed, super-fast overlock with variable top feed — a compact 148mm cylinder bed for flexible, no-dislocation sewing.',
    specs: [['Series', 'Overlock'], ['Needle', 'DCx27, 9#–11#'], ['Max speed', 'Up to 7000 s.p.m.'], ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-797tdi.jpg']
  },

  // — Interlock —
  {
    id: 'jack-k6', name: 'Jack K6', category: 'Interlock', sub: 'Super-fast interlock',
    blurb: 'Super-fast, step-motor-driven interlock machine with anti-wrinkle feeding — tape binding, covering stitch, bottom hemming and elastic lace attaching.',
    specs: [['Series', 'Interlock'], ['Needle', '11#/14#, 3-needle'], ['Max speed', '5500 s.p.m.'], ['Drive', 'Step motor, thread trimmer'], ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jack-k6-hero.jpg']
  },
  {
    id: 'jack-k5e', name: 'Jack K5E', category: 'Interlock', sub: 'Large operation space',
    blurb: 'Low-sound, high-efficiency computerized interlock with a large operating space and one-key reset for stable, easy-to-run production.',
    specs: [['Series', 'Interlock'], ['Needle', 'UY128GAS 11-14#'], ['Max speed', 'Up to 5500 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/k5e.jpg']
  },
  {
    id: 'jack-8770', name: 'Jack JK-8770-01GX356/UT', category: 'Interlock', sub: 'Small cylinder-bed · High speed',
    blurb: 'High-speed computerized small cylinder-bed interlock with a front-mounted bobbin thread reel and mini direct-drive servo motor.',
    specs: [['Series', 'Interlock'], ['Stitch/Thread', '3 stitch / 5 thread'], ['Max speed', 'Up to 4200 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-8770.jpg']
  },
  {
    id: 'jack-w4', name: 'Jack W4', category: 'Interlock', sub: 'Flat-bed · Full-automatic',
    blurb: 'High-speed computerized flat-bed interlock, full-automatic and multi-functional — automatic thread trimmer boosts operating efficiency by up to 40%.',
    specs: [['Series', 'Interlock'], ['Needle', 'UY128GAS 11-14#'], ['Max speed', 'Up to 5500 s.p.m.'], ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'], ['Availability', 'Order on request']],
    gallery: ['./uploads/w4.jpg']
  },
  {
    id: 'jack-8670bdii', name: 'Jack JK-8670BDII/UT', category: 'Interlock', sub: 'Small cylinder-bed',
    blurb: 'High-speed computerized small cylinder-bed interlock (180mm circumference) with auto thread trimming and a built-in cooling fan.',
    specs: [['Series', 'Interlock'], ['Needle', 'UY128GAS 11-14#'], ['Max speed', 'Up to 4500 s.p.m.'], ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-8670bdii.jpg']
  },
  {
    id: 'jack-8009vcdii', name: 'Jack JK-8009VCDII/UTL', category: 'Interlock', sub: 'Multi-needle · Computerized',
    blurb: 'High-speed computerized multi-needle machine (up to 25 needles) with auto presser-foot lifting for elastic attaching, tape and waistband work.',
    specs: [['Series', 'Interlock (multi-needle)'], ['Needle', 'UO113 14-16#'], ['Max speed', 'Up to 3500 s.p.m.'], ['Best for', 'T-shirts, underwear, jeans, mid-to-high-level clothing'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-8009vcdii.jpg']
  },
  {
    id: 'jack-8740', name: 'Jack JK-8740-460-02/D/AW/S', category: 'Interlock', sub: '4-needle 6-thread feed-off-arm',
    blurb: 'Feed-off-arm interlock with a large operating-space seat design for easier sewing of large fabric pieces.',
    specs: [['Series', 'Interlock (feed-off-arm)'], ['Needles / Stitches', '4 needles / 6 thread'], ['Max speed', 'Up to 3200 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-8740.jpg']
  },
  {
    id: 'jack-8787', name: 'Jack JK-8787-01GX356/UT', category: 'Interlock', sub: 'Super high speed cylinder-bed',
    blurb: 'Super high-speed computerized cylinder-bed interlock with an electromagnetic direct-drive presser-foot lifter group.',
    specs: [['Series', 'Interlock'], ['Stitch/Thread', '3 stitch / 5 thread'], ['Max speed', 'Up to 4500 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-8787.jpg']
  },
  {
    id: 'jack-1500ut', name: 'Jack JK-1500-UT', category: 'Interlock', sub: 'Feed-up-the-arm cylinder bed',
    blurb: 'High-speed feed-up-the-arm cylinder-bed interlock — one single machine for multiple crafts, with auto trimmer and auto foot lifter.',
    specs: [['Series', 'Interlock'], ['Needle', '#9-#16'], ['Max speed', 'Up to 4000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-1500ut.jpg']
  },

  // — Heavy-Duty —
  {
    id: 'jack-h5', name: 'Jack H5', category: 'Heavy-Duty', sub: 'Top & bottom feed · Single-needle',
    blurb: 'Top-and-bottom feeding computerized lockstitch machine with a sealed, single main shaft (patented) for heavy-duty single-needle work — strong feeding on thick or multi-layer material.',
    specs: [['Series', 'Heavy-Duty'], ['Needle', 'DPx17 20-23# (DPx5 11-17# for glove variant)'], ['Max speed', '2200 s.p.m.'], ['Shaft', 'Sealed, one main shaft (patented)'], ['Best for', 'Shirts, jeans, non-woven bags, shoes, bags'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jack-h5-hero.jpg']
  },
  {
    id: 'jack-h6', name: 'Jack H6', category: 'Heavy-Duty', sub: 'Top & bottom feed · Stepping type',
    blurb: 'Stepping-type top-and-bottom feeding computerized lockstitch for heavy duty — accurate needle stitch with condense stitch lock and short thread remaining.',
    specs: [['Series', 'Heavy-Duty'], ['Needle', 'DPX17 20-23#'], ['Max speed', 'Up to 2200 s.p.m.'], ['Best for', 'Shirts, jeans, non-woven bags, shoes, bags'], ['Availability', 'Order on request']],
    gallery: ['./uploads/h6.jpg']
  },
  {
    id: 'jack-h5k', name: 'Jack H5K', category: 'Heavy-Duty', sub: 'Side cutter synchronous',
    blurb: 'Side-cutter synchronous heavy-duty lockstitch with a separated cutter for a neat cutting edge and strong durability.',
    specs: [['Series', 'Heavy-Duty'], ['Needle', 'DPx17 20-23#'], ['Max speed', 'Up to 2000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/h5k.jpg']
  },
  {
    id: 'jack-h2', name: 'Jack H2', category: 'Heavy-Duty', sub: 'Top & bottom feed · Direct drive',
    blurb: 'Direct-drive top-and-bottom feeding lockstitch for heavy duty — strong feeding, big stitch length, built for sofas, car seats, luggage and bags.',
    specs: [['Series', 'Heavy-Duty'], ['Needle', 'DPx17 20-23#'], ['Max speed', 'Up to 2000 s.p.m.'], ['Best for', 'Sofa, car seat, luggage, gloves, bags'], ['Availability', 'Order on request']],
    gallery: ['./uploads/h2.jpg']
  },
  {
    id: 'jack-s7', name: 'Jack S7', category: 'Heavy-Duty', sub: 'Post bed roller feed · Intelligent',
    blurb: 'Intelligent-control computerized post-bed roller-feed machine — accurate needle stitch, noiseless and faster than standard post-bed machines.',
    specs: [['Series', 'Post bed'], ['Needle', 'DPx5 9-23#'], ['Max speed', 'Up to 2500 s.p.m.'], ['Best for', 'Shirts, jeans, non-woven bags, shoes, bags'], ['Availability', 'Order on request']],
    gallery: ['./uploads/s7.jpg']
  },
  {
    id: 'jack-s5', name: 'Jack S5', category: 'Heavy-Duty', sub: 'Post bed roller feed · High speed',
    blurb: 'High-speed computerized post-bed roller-feed machine with a built-in panel, QR-code software upgrades and a 100% stitch-overlap ratio.',
    specs: [['Series', 'Post bed'], ['Needle', 'INDPX5#16'], ['Max speed', 'Up to 3000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/s5.jpg']
  },
  {
    id: 'jack-2002g', name: 'Jack JK-2002G', category: 'Heavy-Duty', sub: 'Large hook · Computerized',
    blurb: 'Large-hook computerized heavy-duty lockstitch with top-and-bottom feeding, a super-large needle gauge and one main shaft transmission.',
    specs: [['Series', 'Heavy-Duty'], ['Needle', 'DPx17 22#'], ['Max speed', 'Up to 3000 s.p.m.'], ['Best for', 'Shirts, jeans, non-woven bags, shoes, bags'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-2002g.jpg']
  },
  {
    id: 'jack-2060g', name: 'Jack JK-2060G', category: 'Heavy-Duty', sub: 'Compound feeding · Computerized',
    blurb: 'Full-automatic compound-feeding computerized lockstitch for heavy duty — large space, sews up to 8 layers of leather.',
    specs: [['Series', 'Heavy-Duty'], ['Needle', 'DPx17 20-23#'], ['Max speed', 'Up to 2200 s.p.m.'], ['Best for', 'Sofa, car seat, luggage, shoes'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-2060g.jpg']
  },
  {
    id: 'jack-2030g', name: 'Jack JK-2030G', category: 'Heavy-Duty', sub: 'Top & bottom feeding · Computerized',
    blurb: 'Full-automatic top-and-bottom feeding computerized lockstitch for heavy duty, with a large working space for 8-layer leather work.',
    specs: [['Series', 'Heavy-Duty'], ['Needle', 'DPx17 20-23#'], ['Max speed', 'Up to 2200 s.p.m.'], ['Best for', 'Sofa, car seat, luggage, shoes'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-2030g.jpg']
  },
  {
    id: 'jack-6591c', name: 'Jack JK-6591C/6592C', category: 'Heavy-Duty', sub: 'Post bed · Direct drive',
    blurb: 'Direct-drive post-bed sewing machine built for power saving and high efficiency, with a humanized, easy-to-operate design.',
    specs: [['Series', 'Post bed'], ['Needle', 'INDPX5#16'], ['Max speed', 'Up to 3000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-6591c.jpg']
  },
  {
    id: 'jack-6671c', name: 'Jack JK-6671C/6672C', category: 'Heavy-Duty', sub: 'Post bed roller feed · Intelligent',
    blurb: 'Intelligent-control computerized post-bed roller-feed machine with voice guidance, one-key factory reset and a 100% repeated-stitch rate.',
    specs: [['Series', 'Post bed'], ['Needle', 'INDPX5#16'], ['Max speed', 'Up to 3000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-6671c.jpg']
  },

  // — Special Machines —
  {
    id: 'jack-t1900g', name: 'Jack JK-T1900G', category: 'Special Machine', sub: 'Multi-function bartack',
    blurb: 'One machine, many functions: computerized bartacking across bartack, cap-hole, small pattern and elastic-attaching stitches, with short thread remaining.',
    specs: [['Type', 'Bartack / pattern'], ['Needle', 'DPx5 16# / DPx17 19#'], ['Max speed', 'Up to 3200 s.p.m.'], ['Best for', 'Shirts, jeans, non-woven bags, shoes, bags'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-t1900g.jpg']
  },
  {
    id: 'jack-t1790g', name: 'Jack JK-T1790G', category: 'Special Machine', sub: 'Computerized buttonhole',
    blurb: 'Super-fast computerized buttonhole machine with good knitting adaptation and an intelligent high-speed, high-efficiency system.',
    specs: [['Type', 'Buttonhole'], ['Needle', 'DPx5 12#'], ['Max speed', 'Up to 4200 s.p.m.'], ['Best for', 'Keyhole seams: shirts, cardigans, work clothes, jeans'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-t1790g.jpg']
  },
  {
    id: 'jack-t781g', name: 'Jack JK-T781G', category: 'Special Machine', sub: 'Electronic lockstitch buttonholing',
    blurb: 'New integrated electronic lockstitch buttonholing machine — power saving with auto presser-foot lifter and short thread remaining, no need to trim again.',
    specs: [['Type', 'Buttonhole'], ['Needle', 'DPx5 12#'], ['Max speed', 'Up to 3600 s.p.m.'], ['Best for', 'Keyhole seams: shirts, cardigans, work clothes, jeans'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-t781g.jpg']
  },
  {
    id: 'jack-t1903gr', name: 'Jack JK-T1903GR', category: 'Special Machine', sub: 'Electronic button attaching',
    blurb: 'Electronic button-attaching machine with automatic button feeding for high-efficiency, wide-range button work.',
    specs: [['Type', 'Button attaching'], ['Needle', 'DPx17 14#'], ['Max speed', 'Up to 2700 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-t1903gr.jpg']
  },
  {
    id: 'jack-t373g', name: 'Jack JK-T373G', category: 'Special Machine', sub: 'Integrated computerized button attaching',
    blurb: 'Integrated computerized button-attaching machine, stepping-motor driven, with a variety of automatic button-feeding devices available.',
    specs: [['Type', 'Button attaching'], ['Needle', 'TQx1 16#'], ['Max speed', 'Up to 1500 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-t373g.jpg']
  },
  {
    id: 'jack-t1377e', name: 'Jack JK-T1377E', category: 'Special Machine', sub: 'Integrated computerized button attaching',
    blurb: 'Integrated computerized button-attaching machine with an LCD operation panel, three patterns and automatic thread trimming.',
    specs: [['Type', 'Button attaching'], ['Needle', 'TQx1 16#'], ['Max speed', 'Up to 1500 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-t1377e.jpg']
  },
  {
    id: 'jack-t5878-68b', name: 'Jack JK-T5878-68B/78B', category: 'Special Machine', sub: 'Automatic pocket welting',
    blurb: 'Full-automatic pocket welting machine for straight or slant pockets, with an automatic collective device for high output.',
    specs: [['Type', 'Pocket welting'], ['Needle', 'M1x190 14#-18# / DPx17 14#-18#'], ['Max speed', 'Up to 3000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-t5878-68b.jpg']
  },
  {
    id: 'jack-t5878-58g', name: 'Jack JK-T5878-58G', category: 'Special Machine', sub: 'Automatic placket setting',
    blurb: 'Full-automatic placket setting machine with laser positioning and an automatic collective device for different placket styles.',
    specs: [['Type', 'Placket setting'], ['Needle', 'DBX1 11#'], ['Max speed', 'Up to 4000 s.p.m.'], ['Best for', 'Shirts, suits, pants, down jackets'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-t5878-58g.jpg']
  },
  {
    id: 'jack-t9270d', name: 'Jack JK-T9270D/9280D', category: 'Special Machine', sub: 'Direct drive feed-off-the-arm',
    blurb: 'Mechatronic, direct-drive feed-off-the-arm machine with automatic needle stopping and a lubricated rear puller — widely used across garment types.',
    specs: [['Type', 'Feed-off-the-arm'], ['Needle', 'TVx64 12# / TVx5 21#'], ['Max speed', 'Up to 3500 s.p.m.'], ['Best for', 'General feed-off-the-arm work'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-t9270d.jpg']
  },
  {
    id: 'jack-mx-100a', name: 'Jack MX-100A', category: 'Special Machine', sub: 'Perfect stitch template machine',
    blurb: 'No-reverse-seam template machine with a super large sewing area, low noise/vibration, and a shifted folding table for easy transfer.',
    specs: [['Type', 'Template machine'], ['Needle', 'DPx5 / DPx17'], ['Sewing area', '1400×950mm'], ['Max speed', 'Up to 2800 s.p.m.'], ['Availability', 'Order on request']],
    gallery: ['./uploads/mx-100a.jpg']
  },
  {
    id: 'jack-ms-100a', name: 'Jack MS-100A', category: 'Special Machine', sub: 'Large size template machine',
    blurb: 'Multi-process, large-size template machine — electronic tension post function and smart plate recognition, easy to operate and very stable.',
    specs: [['Type', 'Template machine'], ['Needle', 'DPx5 / DPx17'], ['Sewing area', '1400×950mm'], ['Max speed', 'Up to 3000 s.p.m.'], ['Availability', 'Order on request']],
    gallery: ['./uploads/ms-100a.jpg']
  },
  {
    id: 'jack-mg-60a', name: 'Jack MG-60A', category: 'Special Machine', sub: 'Flexible size template',
    blurb: 'Small-footprint flexible-size template machine with an intelligent middle presser foot and quick hook-changing window for wide, efficient use.',
    specs: [['Type', 'Template machine'], ['Needle', 'DBx1 7-14#'], ['Max speed', 'Up to 3300 s.p.m.'], ['Availability', 'Order on request']],
    gallery: ['./uploads/mg-60a.jpg']
  },
  {
    id: 'jack-mg-80a', name: 'Jack MG-80A', category: 'Special Machine', sub: 'Intelligent template machine',
    blurb: 'Wide-use intelligent template machine with a small footprint, humanized operation panel and smart middle presser foot for precise sewing.',
    specs: [['Type', 'Template machine'], ['Needle', 'DPx5 / DPx17'], ['Sewing area', '800×550mm'], ['Max speed', 'Up to 3200 s.p.m.'], ['Availability', 'Order on request']],
    gallery: ['./uploads/mg-80a.jpg']
  },
  {
    id: 'jack-pattern', name: 'Jack Programmable Pattern Series', category: 'Special Machine', sub: 'Electronic pattern sewing',
    blurb: 'Full-automatic programmable electronic pattern machine, visual operation, available in several sewing-area sizes from 130×100mm up to 1000×400mm.',
    specs: [['Type', 'Programmable pattern'], ['Needle', 'DPx17 11-25#'], ['Models', 'JK-T1310 / T2210 / T3020 / T6040 / T10040'], ['Max speed', 'Up to 2700 s.p.m.'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-pattern.jpg']
  },

  // — Cutting & Spreading Equipment —
  {
    id: 'jack-pz5', name: 'Jack JK-PZ5', category: 'Cutting Equipment', sub: 'Knitted & woven fabric spreader',
    blurb: 'Super-accurate knitted and woven dual-purpose fabric spreading machine — servo control, automatic electric-eye alignment, spreads without fabric tension.',
    specs: [['Type', 'Fabric spreading'], ['Max cloth width', 'Up to 2200mm'], ['Travel speed', 'Up to 110m/min'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-pz5.jpg']
  },
  {
    id: 'jack-pz4', name: 'Jack JK-PZ4', category: 'Cutting Equipment', sub: 'Super speed fabric spreader',
    blurb: 'Super-speed knitted and woven dual-purpose spreading machine — compared with manual spreading, the cost is typically recovered within half a year.',
    specs: [['Type', 'Fabric spreading'], ['Max cloth width', 'Up to 2200mm'], ['Travel speed', 'Up to 110m/min'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-pz4.jpg']
  },
  {
    id: 'jack-ps5', name: 'Jack JK-PS5', category: 'Cutting Equipment', sub: 'Knitted fabric spreader',
    blurb: 'Super-accurate knitted fabric spreading machine — a good choice for woven fabrics such as trousers, jackets, down and denim.',
    specs: [['Type', 'Fabric spreading'], ['Max cloth width', 'Up to 1900mm'], ['Travel speed', 'Up to 110m/min'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-ps5.jpg']
  },
  {
    id: 'jack-t8', name: 'Jack JK-T8', category: 'Cutting Equipment', sub: 'Automatic cutting machine',
    blurb: 'High cost-performance automatic fabric cutting machine — high-quality cutting head, aluminium cutter base, built-in automatic filter systems.',
    specs: [['Type', 'Automatic cutting'], ['Cutting width', '1800–2200mm'], ['Max speed', '60m/min'], ['Availability', 'Order on request']],
    gallery: ['./uploads/jk-t8.jpg']
  }
];

window.SHOP_CATEGORIES = ['All', 'Lockstitch', 'Overlock', 'Interlock', 'Heavy-Duty', 'Special Machine', 'Cutting Equipment', 'Motors & Parts'];

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
