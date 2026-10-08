import { html, esc, keep, photo, hasPhoto } from '../lib/html.mjs';
import { breadcrumb } from '../layout.mjs';
import { pageHead, pager, ctaBlock } from '../components.mjs';

// Vignette : photo si fournie, sinon le nom japonais du lieu écrit verticalement.
function cover(root, c, ratio, eager = false) {
  const key = `carnets/${c.photo ?? c.slug}`;
  if (hasPhoto(key)) return photo({ root, key, alt: `${c.title} : photo du carnet de voyage`, ratio, eager });
  return html`<!-- TODO photo : déposer assets/img/photos/${key}.webp (ratio ${ratio.replace('/', ':')}) -->
<div class="frame frame--empty frame--vertical" style="--ratio: ${ratio.replace('/', ' / ')}" aria-hidden="true"><span class="frame__kanji" lang="ja">${c.ja}</span><span class="frame__label">${esc(c.romaji)}</span></div>`;
}

export function carnetsIndex({ carnets }) {
  const root = '../';
  const crumbs = [
    { label: 'Accueil', path: 'index.html' },
    { label: 'Carnets de voyages', path: 'carnets-de-voyages/index.html' },
  ];
  return {
    path: 'carnets-de-voyages/index.html',
    root,
    nav: 'carnets',
    title: 'Carnets de voyages au Japon',
    description:
      "Carnets de voyages au Japon : Kyoto (Kiyomizu-dera, Gion, Ginkaku-ji, promenade de la Philosophie), Fujiyoshida et Hiroshima-Miyajima. Histoire des lieux et conseils pratiques.",
    crumbs,
    body: html`
${pageHead({
  root,
  crumbs,
  kicker: 'Voyager',
  title: 'Carnets de voyages',
  lead: 'Loin du tourisme de masse, visitez le vrai Japon : histoire des lieux, conseils pratiques et coups de cœur de l’association.',
  kanji: '旅',
  reading: 'tabi · le voyage',
})}

<section class="section" aria-label="Les carnets">
  <div class="container">
    <ul class="carnets" role="list">
      ${carnets.map(
        (c) => html`
      <li class="carnet-card reveal">
        ${cover(root, c, '4/5')}
        <p class="carnet-card__region">${esc(c.region)}</p>
        <h2 class="carnet-card__title"><a href="${root}carnets-de-voyages/${c.slug}.html">${keep(c.title)}</a></h2>
        <p class="carnet-card__excerpt">${esc(c.excerpt)}</p>
      </li>`,
      )}
    </ul>
  </div>
</section>

${ctaBlock(root, {
  kicker: 'Partager',
  title: 'Envie de parler du Japon ?',
  text: 'Questions sur un lieu, envie d’apprendre la langue avant de partir : écrivez-nous.',
  primary: { href: 'contact.html', label: 'Nous écrire' },
  secondary: { href: 'cours-de-japonais.html', label: 'Les cours de japonais' },
})}
`,
  };
}

export function carnetPage({ carnet: c, prev, next }) {
  const root = '../';
  const path = `carnets-de-voyages/${c.slug}.html`;
  const crumbs = [
    { label: 'Accueil', path: 'index.html' },
    { label: 'Carnets de voyages', path: 'carnets-de-voyages/index.html' },
    { label: c.title, path },
  ];
  return {
    path,
    root,
    nav: 'carnets',
    title: `Carnet de voyage : ${c.title}`,
    description: `Carnet de voyage au Japon — ${c.title} (${c.ja}). ${c.excerpt}`,
    ogType: 'article',
    crumbs,
    body: html`
<article class="carnet">
  <header class="page-head">
    <div class="container page-head__grid">
      <div class="page-head__text">
        ${breadcrumb(root, crumbs)}
        <p class="kicker">Carnet de voyage · ${esc(c.region)}</p>
        <h1>${keep(c.title)}</h1>
        <p class="lead">${esc(c.excerpt)}</p>
      </div>
      <div class="page-head__mark" aria-hidden="true"><span class="page-head__kanji page-head__kanji--vertical" lang="ja">${c.ja}</span><span class="page-head__reading">${esc(c.romaji)}</span></div>
    </div>
  </header>
  <div class="section section--tight">
    <div class="container carnet__body">
      ${c.todo ? `<!-- TODO: ${esc(c.todo)} — source : ${c.source} -->` : ''}
      ${hasPhoto(`carnets/${c.photo ?? c.slug}`) ? cover(root, c, '3/2', true) : ''}
      <div class="prose">
        ${c.sections.map((s) => html`<h2>${esc(s.title)}</h2>${s.html}`)}
      </div>
      ${pager(root, 'carnets-de-voyages', prev, next, ['Carnet précédent', 'Carnet suivant'])}
      <p class="article__back"><a class="link-arrow" href="${root}carnets-de-voyages/index.html"><span aria-hidden="true">← </span>Tous les carnets</a></p>
    </div>
  </div>
</article>
`,
  };
}
