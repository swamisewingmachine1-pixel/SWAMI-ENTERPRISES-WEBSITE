/**
 * <product-detail> — dedicated product page body. Reads ?id= from the URL,
 * looks the product up in window.SHOP_PRODUCTS (product-data.js), and renders
 * a full-page detail layout: full-width hero + thumbnail strip, then a wide
 * description, a spec-card grid (not a cramped side column), CTA buttons and
 * a "more in this category" strip.
 *
 * Shadow DOM in the constructor — see product-catalog.js for why (this page's
 * "x-dc" runtime renders through React, which crashes if a custom element
 * mutates its own light-DOM children).
 */
(function () {
  var PRODUCTS = window.SHOP_PRODUCTS;
  var PHONE = window.SHOP_PHONE;

  var STYLE =
    ':host { display: block; }' +
    '.back-link { font-size: 13.5px; color: var(--color-accent); text-decoration: none; display: inline-block; margin-bottom: var(--space-4); }' +
    '.back-link:hover { text-decoration: underline; }' +
    '.pd-header { max-width: 74ch; }' +
    '.tag { display: inline-flex; align-items: center; font-size: 11px; letter-spacing: 0.02em; padding: 3px 10px; border-radius: calc(var(--radius-md) * 0.75); }' +
    '.tag-accent { background: var(--color-accent-100); color: var(--color-accent-800); }' +
    '.tag-outline { border: 1px solid var(--color-accent); color: var(--color-accent); }' +
    '.pd-title { font-family: var(--font-heading); font-weight: var(--font-heading-weight); font-size: clamp(30px,4.5vw,46px); line-height: 1.05; letter-spacing: -0.02em; margin: var(--space-3) 0 0; }' +
    '.pd-sub { font-size: 16px; color: color-mix(in srgb, var(--color-text) 62%, transparent); margin: var(--space-2) 0 0; }' +
    '.pd-blurb { font-size: 17px; line-height: 1.7; color: color-mix(in srgb, var(--color-text) 82%, transparent); margin: var(--space-4) 0 0; }' +
    '.pd-actions { display: flex; gap: var(--space-3); flex-wrap: wrap; margin-top: var(--space-6); }' +
    '.btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer; text-decoration: none; font-family: var(--font-heading); font-weight: var(--font-heading-weight); font-size: 15px; line-height: 1.2; color: var(--color-text); background: transparent; border: 1px solid transparent; padding: var(--space-3) calc(var(--space-4)); border-radius: var(--radius-md); }' +
    '.btn-primary { background: var(--color-accent); color: var(--color-bg); }' +
    '.btn-primary:hover { background: var(--color-accent-600); }' +
    '.btn-ghost { color: var(--color-accent); border-color: var(--color-divider); }' +
    '.btn-ghost:hover { background: color-mix(in srgb, var(--color-accent) 10%, transparent); }' +

    '.pd-main { margin-top: var(--space-6); aspect-ratio: 16/9; border-radius: var(--radius-lg); overflow: hidden; background: var(--color-neutral-100); min-width: 0; }' +
    '.pd-main img { width: 100%; height: 100%; object-fit: contain; display: block; }' +
    '.pd-noimg { width: 100%; height: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: center; text-align: center; padding: var(--space-4); font-size: 14px; color: color-mix(in srgb, var(--color-text) 55%, transparent); border: 1.5px dashed var(--color-divider); border-radius: var(--radius-lg); }' +
    '.pd-thumbs { display: flex; gap: var(--space-2); margin-top: var(--space-3); flex-wrap: wrap; }' +
    '.pd-thumb { width: 84px; height: 84px; object-fit: cover; border-radius: var(--radius-md); cursor: pointer; opacity: 0.6; border: 2px solid transparent; background: var(--color-neutral-100); }' +
    '.pd-thumb:hover { opacity: 0.85; }' +
    '.pd-thumb.active { opacity: 1; border-color: var(--color-accent); }' +

    '.pd-section-h { font-family: var(--font-heading); font-weight: var(--font-heading-weight); font-size: 22px; margin: var(--space-8) 0 var(--space-4); }' +
    '.spec-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--color-divider); border: 1px solid var(--color-divider); border-radius: var(--radius-md); overflow: hidden; }' +
    '@media (max-width: 900px) { .spec-grid { grid-template-columns: repeat(2,1fr); } }' +
    '@media (max-width: 560px) { .spec-grid { grid-template-columns: 1fr; } }' +
    '.spec-cell { background: var(--color-surface); padding: var(--space-4); }' +
    '.spec-cell .k { font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: color-mix(in srgb, var(--color-text) 55%, transparent); margin: 0 0 6px; }' +
    '.spec-cell .v { font-size: 15.5px; font-weight: 600; margin: 0; }' +

    '.related-h { font-family: var(--font-heading); font-weight: var(--font-heading-weight); font-size: 22px; margin: 0 0 var(--space-4); }' +
    '.related-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: var(--space-6); min-width: 0; }' +
    '@media (max-width: 980px) { .related-grid { grid-template-columns: repeat(3,1fr); } }' +
    '@media (max-width: 700px) { .related-grid { grid-template-columns: repeat(2,1fr); } }' +
    '@media (max-width: 440px) { .related-grid { grid-template-columns: 1fr; } }' +
    '.rcard { display: flex; flex-direction: column; gap: var(--space-2); text-align: left; font-family: var(--font-body); color: inherit; text-decoration: none; min-width: 0; }' +
    '.rcard .print { aspect-ratio: 4/3; border-radius: var(--radius-md); overflow: hidden; background: var(--color-neutral-100); min-width: 0; }' +
    '.rcard .print img { width: 100%; height: 100%; object-fit: cover; display: block; }' +
    '.rcard .print.empty { display: flex; align-items: center; justify-content: center; text-align: center; padding: var(--space-3); box-sizing: border-box; border: 1.5px dashed var(--color-divider); background: var(--color-bg); font-size: 12px; color: color-mix(in srgb, var(--color-text) 55%, transparent); }' +
    '.rcard h4 { font-family: var(--font-heading); font-weight: var(--font-heading-weight); font-size: 15px; margin: 0; }' +
    '.rcard:hover h4 { color: var(--color-accent); }' +
    '.not-found { padding: var(--space-8) 0; }';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  class ProductDetail extends HTMLElement {
    constructor() {
      super();
      var root = this.shadowRoot || this.attachShadow({ mode: 'open' });
      root.innerHTML = '<style>' + STYLE + '</style><div class="pd-root"></div>';
      this._root = root.querySelector('.pd-root');
      this._gallery = [];
      this.render();
    }

    render() {
      var id = new URLSearchParams(window.location.search).get('id');
      var product = PRODUCTS.filter(function (p) { return p.id === id; })[0];
      this._root.innerHTML = '';

      var back = el('a', 'back-link', '← All products');
      back.href = './Products.dc.html';
      this._root.appendChild(back);

      if (!product) {
        document.title = 'Product not found — Swami Enterprises';
        var nf = el('div', 'not-found');
        nf.appendChild(el('h1', 'pd-title', 'Product not found'));
        nf.appendChild(el('p', 'pd-blurb', 'We couldn’t find that product — it may have moved. Head back to the full catalogue.'));
        this._root.appendChild(nf);
        return;
      }

      document.title = product.name + ' — Swami Enterprises';

      // — header: tag, title, subtitle, blurb, CTAs —
      var header = el('div', 'pd-header');
      header.appendChild(el('span', 'tag tag-accent', product.category));
      header.appendChild(el('h1', 'pd-title', product.name));
      header.appendChild(el('p', 'pd-sub', product.sub));
      header.appendChild(el('p', 'pd-blurb', product.blurb));

      var actions = el('div', 'pd-actions');
      var wa = el('a', 'btn btn-primary', 'Ask on WhatsApp');
      wa.target = '_blank';
      wa.rel = 'noopener';
      wa.href = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent('Hi, I’m interested in the ' + product.name + '.');
      var visit = el('a', 'btn btn-ghost', 'Visit the shop');
      visit.href = './Contact.dc.html';
      actions.appendChild(wa);
      actions.appendChild(visit);
      header.appendChild(actions);
      this._root.appendChild(header);

      // — full-width hero + thumbnail strip —
      var main = el('div', 'pd-main');
      this._mainImg = document.createElement('img');
      this._mainImg.alt = product.name;
      this._noImg = el('div', 'pd-noimg', 'Photo coming soon — ask at the counter or on WhatsApp for the latest picture and stock.');
      main.appendChild(this._mainImg);
      main.appendChild(this._noImg);
      this._thumbsEl = el('div', 'pd-thumbs');
      this._root.appendChild(main);
      this._root.appendChild(this._thumbsEl);
      this._gallery = product.gallery.slice();
      this.renderGallery(0);

      // — full specifications, as a wide card grid, not a thin sidebar table —
      this._root.appendChild(el('h2', 'pd-section-h', 'Specifications'));
      var grid = el('div', 'spec-grid');
      product.specs.forEach(function (row) {
        var cell = el('div', 'spec-cell');
        cell.appendChild(el('p', 'k', row[0]));
        cell.appendChild(el('p', 'v', row[1]));
        grid.appendChild(cell);
      });
      this._root.appendChild(grid);

      // — related products —
      var related = PRODUCTS.filter(function (p) { return p.category === product.category && p.id !== product.id; });
      if (related.length) {
        this._root.appendChild(el('h2', 'related-h', 'More ' + product.category.toLowerCase() + ' machines'));
        var rgrid = el('div', 'related-grid');
        related.forEach(function (p) {
          var card = el('a', 'rcard');
          card.href = './Product.dc.html?id=' + encodeURIComponent(p.id);
          var printDiv;
          if (p.gallery[0]) {
            printDiv = el('div', 'print');
            var img = document.createElement('img');
            img.src = p.gallery[0];
            img.alt = p.name;
            printDiv.appendChild(img);
          } else {
            printDiv = el('div', 'print empty', 'Photo coming soon');
          }
          card.appendChild(printDiv);
          card.appendChild(el('h4', null, p.name));
          rgrid.appendChild(card);
        });
        this._root.appendChild(rgrid);
      }
    }

    renderGallery(idx) {
      var self = this;
      this._thumbsEl.innerHTML = '';
      if (!this._gallery.length) {
        this._mainImg.style.display = 'none';
        this._noImg.style.display = 'flex';
        return;
      }
      this._mainImg.style.display = 'block';
      this._noImg.style.display = 'none';
      this._mainImg.src = this._gallery[idx];
      if (this._gallery.length > 1) {
        this._gallery.forEach(function (src, i) {
          var t = document.createElement('img');
          t.src = src;
          t.alt = '';
          t.className = 'pd-thumb' + (i === idx ? ' active' : '');
          t.addEventListener('click', function () { self.renderGallery(i); });
          self._thumbsEl.appendChild(t);
        });
      }
    }
  }

  if (!customElements.get('product-detail')) {
    customElements.define('product-detail', ProductDetail);
  }
})();
