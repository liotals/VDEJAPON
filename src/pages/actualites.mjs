import { config } from '../config.mjs';
import { html, esc, keep, photo, hasPhoto } from '../lib/html.mjs';
import { pageHead, newsCard, articleDate, pager, ctaBlock } from '../components.mjs';
import { breadcrumb, publicUrl } from '../layout.mjs';

const yearOf = (a) => (a.date ?? a.sortDate).slice(0, 4);

export function actualitesIndex({ articles }) {
  const root = '../';
  const crumbs = [
    { label: 'Accueil', path: 'index.html' },
    { label: 'Actualités', path: 'actualites/index.html' },
  ];
  const years = [...new Set(articles.map(yearOf))];
  return {
    path: 'actualites/index.html',
    root,
    nav: 'actualites',
    title: 'Actualités',
    description:
      "Les actualités de l'association franco-japonaise Val d'Europe / Japon : salons (Japan Expo, Expo Manga de Lagny-sur-Marne), ateliers de calligraphie et d'origami, sorties, résultats du JLPT.",
    crumbs,
    body: html`
${pageHead({
  root,
  crumbs,
  kicker: 'Le journal',
  title: 'Actualités',
  lead: "Salons, ateliers, sorties et nouvelles de nos élèves : la vie de l'association, de 2024 à aujourd'hui.",
  kanji: '便り',
  reading: 'tayori · les nouvelles',
})}

<div class="section">
  <div class="container">
    <nav class="chips-nav" aria-label="Années">
      <ul class="chips" role="list">
        ${years.map((y) => html`<li><a class="chip" href="#annee-${y}">${y}</a></li>`)}
      </ul>
    </nav>
    ${years.map(
      (y) => html`
    <section class="news-year" aria-labelledby="annee-${y}">
      <h2 class="news-year__label" id="annee-${y}">${y}</h2>
      <div class="cards">
        ${articles.filter((a) => yearOf(a) === y).map((a) => newsCard(root, a, 3))}
      </div>
    </section>`,
    )}
  </div>
</div>

${ctaBlock(root, {
  kicker: 'Agenda',
  title: 'Ne manquez pas nos prochains <span class="nowrap">rendez-vous</span>',
  text: 'Consultez l’agenda ou suivez-nous sur Facebook. Pour recevoir nos nouvelles par e-mail, inscrivez-vous à la lettre d’information ci-dessous.',
  primary: { href: 'agenda.html', label: "Voir l'agenda" },
  secondary: { href: config.facebook, label: 'Facebook' },
})}
`,
  };
}

export function articlePage({ article: a, older, newer }) {
  const root = '../';
  const path = `actualites/${a.slug}.html`;
  const crumbs = [
    { label: 'Accueil', path: 'index.html' },
    { label: 'Actualités', path: 'actualites/index.html' },
    { label: a.title, path },
  ];
  const key = `actualites/${a.photo ?? a.slug}`;
  const withPhoto = hasPhoto(key);
  return {
    path,
    root,
    nav: 'actualites',
    title: a.title,
    description: a.excerpt,
    ogType: 'article',
    crumbs,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: a.title,
        description: a.excerpt,
        ...(a.date ? { datePublished: a.date } : {}),
        inLanguage: 'fr',
        mainEntityOfPage: publicUrl(path),
        author: { '@id': `${config.siteUrl}/#organisation` },
        publisher: { '@id': `${config.siteUrl}/#organisation` },
      },
    ],
    body: html`
<article class="article">
  <header class="page-head page-head--article">
    <div class="container">
      ${breadcrumb(root, crumbs)}
      <p class="card__meta">${articleDate(a)}<span aria-hidden="true">·</span><span>${esc(a.category)}</span></p>
      <h1>${keep(a.title)}</h1>
      <p class="lead">${esc(a.excerpt)}</p>
    </div>
  </header>
  <div class="section section--tight">
    <div class="container article__body">
      ${a.todo ? `<!-- TODO: ${esc(a.todo)} — source : ${a.source} -->` : ''}
      ${withPhoto ? photo({ root, key, alt: a.photoAlt ?? a.title, ratio: '3/2', className: 'article__photo' }) : ''}
      <div class="prose">
        ${a.body}
      </div>
      ${pager(root, 'actualites', older, newer, ['Article précédent', 'Article suivant'])}
      <p class="article__back"><a class="link-arrow" href="${root}actualites/index.html"><span aria-hidden="true">← </span>Toutes les actualités</a></p>
    </div>
  </div>
</article>
`,
  };
}
