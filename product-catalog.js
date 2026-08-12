/**
 * <product-catalog> — category filter + product grid. Cards are real links to
 * Product.dc.html?id=<id>, a dedicated detail page per product.
 *
 * Builds its own shadow root in the CONSTRUCTOR, mirroring <image-slot>'s
 * pattern exactly (see image-slot.js): the host page is rendered through a
 * React tree, and any custom element that mutates its own LIGHT DOM children
 * (e.g. innerHTML on the element itself) races React's reconciliation of that
 * same subtree and crashes it ("removeChild ... not a child of this node").
 * A shadow root is opaque to that reconciliation, so all rendering happens
 * inside one — with its own <style>, since shadow DOM does not inherit
 * class-based rules from the host page (only inherited properties like the
 * --color, --space and --font custom properties cross the boundary).
 *
 * Requires product-data.js (window.SHOP_PRODUCTS / SHOP_CATEGORIES) loaded first.
 */
(function () {
  var PRODUCTS = window.SHOP_PRODUCTS;
  var CATS = window.SHOP_CATEGORIES;

  var STYLE =
    ':host { display: block; }' +
    '.cat-tabs { display: flex; gap: var(--space-2); flex-wrap: wrap; padding-bottom: var(--space-4); border-bottom: 1px solid var(--color-divider); }' +
    '.cat-tab { font-family: var(--font-body); font-size: 13.5px; padding: 8px 16px; border-radius: 999px; border: 1px solid var(--color-divider); background: transparent; color: var(--color-text); cursor: pointer; }' +
    '.cat-tab:hover { border-color: var(--color-accent); color: var(--color-accent); }' +
    '.cat-tab.active { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-bg); }' +
    '.pgrid { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--space-6); margin-top: var(--space-6); }' +
    '@media (max-width: 980px) { .pgrid { grid-template-columns: repeat(2,1fr); } }' +
    '@media (max-width: 620px) { .pgrid { grid-template-columns: 1fr; } }' +
    '.pcard2 { display: flex; flex-direction: column; gap: var(--space-3); text-align: left; font-family: var(--font-body); color: inherit; text-decoration: none; }' +
    '.pcard2 .print { aspect-ratio: 4/3; border-radius: var(--radius-md); overflow: hidden; }' +
    '.pcard2 h3 { font-family: var(--font-heading); font-weight: var(--font-heading-weight); font-size: 19px; margin: var(--space-2) 0 0; letter-spacing: -0.01em; }' +
    '.pcard2 .sub { font-size: 13px; color: color-mix(in srgb, var(--color-text) 62%, transparent); margin: var(--space-1) 0 0; }' +
    '.pcard2 .view-link { font-size: 13px; color: var(--color-accent); margin-top: var(--space-1); }' +
    '.pcard2:hover .view-link { text-decoration: underline; }' +
    '.tag { display: inline-flex; align-items: center; font-size: 11px; letter-spacing: 0.02em; padding: 3px 10px; border-radius: calc(var(--radius-md) * 0.75); }' +
    '.tag-outline { border: 1px solid var(--color-accent); color: var(--color-accent); }';

  var TEMPLATE =
    '<style>' + STYLE + '</style>' +
    '<div class="cat-tabs"></div>' +
    '<div class="pgrid"></div>';

  class ProductCatalog extends HTMLElement {
    constructor() {
      super();
      var root = this.shadowRoot || this.attachShadow({ mode: 'open' });
      root.innerHTML = TEMPLATE;

      this._activeCat = 'All';
      this._tabsEl = root.querySelector('.cat-tabs');
      this._gridEl = root.querySelector('.pgrid');

      this.renderTabs();
      this.renderGrid();
    }

    renderTabs() {
      var self = this;
      this._tabsEl.innerHTML = '';
      CATS.forEach(function (cat) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'cat-tab' + (cat === self._activeCat ? ' active' : '');
        b.textContent = cat;
        b.addEventListener('click', function () {
          self._activeCat = cat;
          self.renderTabs();
          self.renderGrid();
        });
        self._tabsEl.appendChild(b);
      });
    }

    renderGrid() {
      var self = this;
      this._gridEl.innerHTML = '';
      PRODUCTS.filter(function (p) { return self._activeCat === 'All' || p.category === self._activeCat; }).forEach(function (p) {
        var card = document.createElement('a');
        card.className = 'pcard2';
        card.href = './Product.dc.html?id=' + encodeURIComponent(p.id);

        var figure = document.createElement('figure');
        figure.style.margin = '0';
        var printDiv = document.createElement('div');
        printDiv.className = 'print';
        var slot = document.createElement('image-slot');
        slot.setAttribute('shape', 'rect');
        slot.setAttribute('placeholder', p.name + ' photo');
        if (p.gallery[0]) slot.setAttribute('src', p.gallery[0]);
        printDiv.appendChild(slot);
        figure.appendChild(printDiv);
        card.appendChild(figure);

        var meta = document.createElement('div');
        var tag = document.createElement('span');
        tag.className = 'tag tag-outline';
        tag.textContent = p.category;
        var h3 = document.createElement('h3');
        h3.textContent = p.name;
        var sub = document.createElement('p');
        sub.className = 'sub';
        sub.textContent = p.sub;
        meta.appendChild(tag);
        meta.appendChild(h3);
        meta.appendChild(sub);
        card.appendChild(meta);

        var link = document.createElement('span');
        link.className = 'view-link';
        link.textContent = 'View details →';
        card.appendChild(link);

        self._gridEl.appendChild(card);
      });
    }
  }

  if (!customElements.get('product-catalog')) {
    customElements.define('product-catalog', ProductCatalog);
  }
})();
