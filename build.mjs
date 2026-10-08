#!/usr/bin/env node
// Générateur du site statique Val d'Europe / Japon — aucune dépendance, Node.js 18 ou plus.
// Usage : node build.mjs   →   régénère les pages HTML, sitemap.xml, robots.txt et le manifeste dans site/.
// Les fichiers CSS, JS et images de site/assets/ sont édités directement et ne sont pas touchés.
import { mkdir, readdir, rm, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { config } from './src/config.mjs';
import { layout, publicUrl } from './src/layout.mjs';
import { SITE_DIR, frenchTypography, getMissingPhotos } from './src/lib/html.mjs';
import { articles as rawArticles } from './src/content/articles.mjs';
import { carnets } from './src/content/carnets.mjs';
import { home } from './src/pages/home.mjs';
import { about } from './src/pages/about.mjs';
import { cours } from './src/pages/cours.mjs';
import { ateliers } from './src/pages/ateliers.mjs';
import { agenda } from './src/pages/agenda.mjs';
import { actualitesIndex, articlePage } from './src/pages/actualites.mjs';
import { carnetsIndex, carnetPage } from './src/pages/carnets.mjs';
import { contact } from './src/pages/contact.mjs';
import { mentions, merci, notFound } from './src/pages/legal.mjs';

const sortKey = (a) => a.date ?? a.sortDate;
const articles = [...rawArticles].sort((a, b) => sortKey(b).localeCompare(sortKey(a)));

const pages = [
  home({ articles }),
  about(),
  cours(),
  ateliers(),
  agenda(),
  actualitesIndex({ articles }),
  ...articles.map((article, i) => articlePage({ article, newer: articles[i - 1], older: articles[i + 1] })),
  carnetsIndex({ carnets }),
  ...carnets.map((carnet, i) => carnetPage({ carnet, prev: carnets[i - 1], next: carnets[i + 1] })),
  contact(),
  mentions(),
  merci(),
  notFound(),
];

// Supprime les pages générées précédemment (jamais le dossier assets/).
async function cleanHtml(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'assets') await cleanHtml(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) await rm(full);
  }
}

await cleanHtml(SITE_DIR);

const seen = new Set();
for (const page of pages) {
  if (seen.has(page.path)) throw new Error(`Chemin en double : ${page.path}`);
  seen.add(page.path);
  const out = path.join(SITE_DIR, page.path);
  await mkdir(path.dirname(out), { recursive: true });
  const root = page.root ?? '';
  await writeFile(out, frenchTypography(layout({ ...page, root })));
}

// sitemap.xml
const lastmod = (page) => {
  const a = articles.find((x) => `actualites/${x.slug}.html` === page.path);
  return a?.date ? `<lastmod>${a.date}</lastmod>` : '';
};
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => !p.noindex)
  .map((p) => `  <url><loc>${publicUrl(p.path)}</loc>${lastmod(p)}</url>`)
  .join('\n')}
</urlset>
`;
await writeFile(path.join(SITE_DIR, 'sitemap.xml'), sitemap);

await writeFile(
  path.join(SITE_DIR, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /merci.html\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`,
);

await writeFile(
  path.join(SITE_DIR, 'site.webmanifest'),
  JSON.stringify(
    {
      name: config.siteName,
      short_name: 'VDE Japon',
      lang: 'fr',
      start_url: './index.html',
      display: 'browser',
      background_color: '#F5F3EA',
      theme_color: '#F5F3EA',
      icons: [
        { src: 'assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ) + '\n',
);

// Rapport
let todoCount = 0;
for (const page of pages) {
  const content = await readFile(path.join(SITE_DIR, page.path), 'utf8');
  todoCount += (content.match(/TODO/g) ?? []).length;
}
const missing = getMissingPhotos();
console.log(`✓ ${pages.length} pages générées dans site/`);
console.log(`  ${todoCount} marqueurs TODO dans le HTML généré, ${missing.length} emplacements photo en attente.`);
if (process.argv.includes('--photos')) missing.forEach((m) => console.log(`  - site/${m}`));
