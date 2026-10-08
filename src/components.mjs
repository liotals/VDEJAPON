// Composants réutilisés par plusieurs pages.
import { config } from './config.mjs';
import { html, esc, keep, formatDate, photo, hasPhoto } from './lib/html.mjs';
import { breadcrumb } from './layout.mjs';

// En-tête de page intérieure : fil d'Ariane, sur-titre, titre, chapeau et caractère japonais décoratif.
export function pageHead({ root, crumbs, kicker, title, lead, kanji, reading }) {
  return html`
<header class="page-head">
  <div class="container page-head__grid">
    <div class="page-head__text">
      ${crumbs ? breadcrumb(root, crumbs) : ''}
      ${kicker ? html`<p class="kicker">${esc(kicker)}</p>` : ''}
      <h1>${title}</h1>
      ${lead ? html`<p class="lead">${lead}</p>` : ''}
    </div>
    ${kanji ? html`<div class="page-head__mark" aria-hidden="true"><span class="page-head__kanji" lang="ja">${kanji}</span>${reading ? html`<span class="page-head__reading">${esc(reading)}</span>` : ''}</div>` : ''}
  </div>
</header>`;
}

export function sectionHead({ kicker, title, id, intro, link }) {
  return html`
<div class="section-head">
  <div>
    ${kicker ? html`<p class="kicker">${esc(kicker)}</p>` : ''}
    <h2${id ? ` id="${id}"` : ''}>${title}</h2>
    ${intro ? html`<p class="section-head__intro">${intro}</p>` : ''}
  </div>
  ${link ? html`<a class="link-arrow" href="${link.href}">${esc(link.label)}<span aria-hidden="true"> →</span></a>` : ''}
</div>`;
}

export const articleDate = (a) =>
  a.date ? html`<time datetime="${a.date}">${formatDate(a.date)}</time>` : html`<span>${esc(a.dateLabel ?? '')}</span>`;

export function newsCard(root, a, headingLevel = 3) {
  const h = `h${headingLevel}`;
  return html`
<article class="card reveal">
  ${hasPhoto(`actualites/${a.photo ?? a.slug}`) ? photo({ root, key: `actualites/${a.photo ?? a.slug}`, alt: a.title, ratio: '3/2', className: 'card__media' }) : ''}
  <p class="card__meta">${articleDate(a)}<span aria-hidden="true">·</span><span>${esc(a.category)}</span></p>
  <${h} class="card__title"><a href="${root}actualites/${a.slug}.html">${keep(a.title)}</a></${h}>
  <p class="card__excerpt">${esc(a.excerpt)}</p>
  <p class="card__more" aria-hidden="true">Lire l'article <span>→</span></p>
</article>`;
}

// Bandeau d'état des inscriptions aux cours de japonais (piloté par config.cours).
export function coursStatus(root, { compact = false } = {}) {
  const { saison, complet } = config.cours;
  if (!complet) {
    return html`<div class="notice${compact ? ' notice--compact' : ''}">
      <p class="badge">Inscriptions ouvertes · ${esc(saison)}</p>
      <p class="notice__text">Des places sont disponibles : contactez-nous pour convenir de vos horaires.</p>
      <p><a class="btn btn--primary" href="${root}contact.html?sujet=cours#formulaire">S'inscrire</a></p>
    </div>`;
  }
  return html`<div class="notice${compact ? ' notice--compact' : ''}">
    <p class="badge">Complet pour ${esc(saison)}</p>
    <p class="notice__text">Les cours particuliers sont complets pour l'année ${esc(saison)}. Inscrivez-vous sur la liste d'attente : nous vous recontacterons dès qu'une place se libère.</p>
    <p><a class="btn btn--primary" href="${root}contact.html?sujet=liste-attente#formulaire">Rejoindre la liste d'attente</a></p>
  </div>`;
}

export function agendaItem(root, item) {
  const isCours = item.status === 'cours';
  return html`
<li class="agenda__item reveal">
  ${item.todo ? `<!-- TODO: ${esc(item.todo)} -->` : ''}
  <p class="agenda__when">${item.iso ? html`<time datetime="${item.iso}">${esc(item.when)}</time>` : esc(item.when)}${item.detail ? html`<span class="agenda__detail">${esc(item.detail)}</span>` : ''}</p>
  <div class="agenda__body">
    <h3 class="agenda__title">${esc(item.title)}</h3>
    ${item.place ? html`<p class="agenda__place">${esc(item.place)}</p>` : ''}
    ${item.text ? html`<p class="agenda__text">${esc(item.text)}</p>` : ''}
    ${isCours && config.cours.complet ? html`<p class="badge badge--quiet">Complet pour ${esc(config.cours.saison)} · liste d'attente</p>` : ''}
  </div>
  ${item.link ? html`<a class="link-arrow agenda__link" href="${root}${item.link.href}">${esc(item.link.label)}<span class="visually-hidden"> : ${esc(item.title)}</span><span aria-hidden="true"> →</span></a>` : ''}
</li>`;
}

// Préfixe les liens internes par la racine relative ; laisse intacts ancres et liens absolus.
const link = (root, href) => (/^(#|https?:|mailto:)/.test(href) ? href : `${root}${href}`);

export function ctaBlock(root, { kicker = 'Contact', title, text, primary, secondary }) {
  return html`
<section class="section section--rule cta" aria-labelledby="cta-titre">
  <div class="container cta__grid reveal">
    <div>
      <p class="kicker">${esc(kicker)}</p>
      <h2 id="cta-titre">${title}</h2>
      <p class="cta__text">${text}</p>
    </div>
    <p class="cta__actions">
      ${primary ? html`<a class="btn btn--primary" href="${link(root, primary.href)}">${esc(primary.label)}</a>` : ''}
      ${secondary ? html`<a class="btn btn--ghost" href="${link(root, secondary.href)}"${/^https?:/.test(secondary.href) ? ' rel="noopener"' : ''}>${esc(secondary.label)}</a>` : ''}
    </p>
  </div>
</section>`;
}

// Navigation précédent / suivant (articles, carnets).
export function pager(root, dir, prev, next, labels = ['Précédent', 'Suivant']) {
  if (!prev && !next) return '';
  return html`
<nav class="pager" aria-label="${labels[0]} et ${labels[1].toLowerCase()}">
  ${prev ? html`<a class="pager__link pager__prev" href="${root}${dir}/${prev.slug}.html" rel="prev"><span class="pager__label"><span aria-hidden="true">← </span>${labels[0]}</span><span class="pager__title">${keep(prev.title)}</span></a>` : '<span></span>'}
  ${next ? html`<a class="pager__link pager__next" href="${root}${dir}/${next.slug}.html" rel="next"><span class="pager__label">${labels[1]}<span aria-hidden="true"> →</span></span><span class="pager__title">${keep(next.title)}</span></a>` : ''}
</nav>`;
}
