// Markdown content-negotiation endpoint (acceptmarkdown.com convention).
// vercel.json rewrites any request whose Accept header contains "text/markdown"
// here, for any path, before it reaches the normal HTML rewrites. route-manifest.json
// is generated from the same real catalog data as llms.txt (see docs/gen-manifest.js) —
// no content is invented here, it's the same specs/descriptions used on the live pages.
const manifest = require('../route-manifest.json');

function normalize(pathname) {
  if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1);
  return pathname || '/';
}

module.exports = async (req, res) => {
  const url = new URL(req.url, 'https://swamienterprises.online');
  const pathname = normalize(url.pathname);
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  const entry = manifest[pathname];
  if (!entry) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    return res.end(
      '# 404 Not Found\n\n' +
      'There is no page at `' + pathname + '` on Swami Enterprises.\n\n' +
      'Where to look next:\n\n' +
      '- [Full catalog (llms.txt)](https://swamienterprises.online/llms.txt)\n' +
      '- [Sitemap](https://swamienterprises.online/sitemap.xml)\n' +
      '- [Machines](https://swamienterprises.online/machines)\n' +
      '- [Accessories & Spare Parts](https://swamienterprises.online/accessories)\n' +
      '- [Homepage](https://swamienterprises.online/)\n'
    );
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('X-Robots-Tag', 'noindex');
  return res.end(entry.markdown);
};
