// Gabarit commun : <head>, en-tête, navigation, pied de page (newsletter, liens légaux, réseaux).
import { config } from './config.mjs';
import { html, esc } from './lib/html.mjs';

export const NAV = [
  { id: 'association', label: 'Qui sommes-nous ?', short: "L'association", href: 'qui-sommes-nous.html' },
  { id: 'cours', label: 'Cours de japonais', href: 'cours-de-japonais.html' },
  { id: 'ateliers', label: 'Ateliers', href: 'ateliers.html' },
  { id: 'agenda', label: 'Agenda', href: 'agenda.html' },
  { id: 'actualites', label: 'Actualités', href: 'actualites/index.html' },
  { id: 'carnets', label: 'Carnets de voyages', short: 'Carnets', href: 'carnets-de-voyages/index.html' },
  { id: 'contact', label: 'Contact', href: 'contact.html' },
];

const FONTS =
  'https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;600&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap';

// URL publique d'une page (forme « jolie » pour les index de dossier).
export const publicUrl = (pagePath) => `${config.siteUrl}/${pagePath.replace(/(^|\/)index\.html$/, '$1')}`;

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${config.siteUrl}/#organisation`,
  name: config.legalName,
  alternateName: "Val d'Europe Japon",
  url: `${config.siteUrl}/`,
  logo: `${config.siteUrl}/assets/img/logo-vde-japon.png`,
  image: `${config.siteUrl}/assets/img/og-default.jpg`,
  description:
    "Association culturelle franco-japonaise (loi 1901) basée à Esbly, en Seine-et-Marne : cours de japonais, ateliers de calligraphie et d'origami, salons et événements autour de la culture japonaise.",
  email: config.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: config.city,
    postalCode: config.postalCode,
    addressRegion: config.department,
    addressCountry: 'FR',
  },
  areaServed: ["Val d'Europe", 'Seine-et-Marne', 'Île-de-France'],
  knowsAbout: ['Culture japonaise', 'Cours de japonais', 'Origami', 'Calligraphie japonaise'],
  sameAs: [config.facebook],
});

const breadcrumbLd = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: publicUrl(c.path) })),
});

export function breadcrumb(root, crumbs) {
  return html`<nav class="breadcrumb" aria-label="Fil d'Ariane"><ol>
    ${crumbs.map((c, i) =>
      i === crumbs.length - 1
        ? html`<li><span aria-current="page">${esc(c.label)}</span></li>`
        : html`<li><a href="${root}${c.path}">${esc(c.label)}</a></li>`,
    )}
  </ol></nav>`;
}

function header(root, current) {
  return html`
<a class="skip-link" href="#contenu">Aller au contenu</a>
<header class="site-header" data-header>
  <div class="container site-header__inner">
    <a class="brand" href="${root}index.html">
      <picture>
        <source srcset="${root}assets/img/logo-mark.webp" type="image/webp">
        <img src="${root}assets/img/logo-mark.png" alt="" width="38" height="36">
      </picture>
      <span class="brand__name">Val d'Europe <span class="brand__slash" aria-hidden="true">/</span><span class="visually-hidden"> - </span> Japon</span>
      <span class="visually-hidden">, retour à l'accueil</span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
      <span class="nav-toggle__label" data-nav-label>Menu</span>
      <span class="nav-toggle__icon" aria-hidden="true"></span>
    </button>
    <nav class="site-nav" id="site-nav" aria-label="Navigation principale" data-nav>
      <ul class="site-nav__list">
        ${NAV.map(
          (item) => html`<li><a href="${root}${item.href}"${item.id === current ? ' aria-current="page"' : ''}${item.id === 'contact' ? ' class="site-nav__contact"' : ''}>${
            item.short
              ? html`<span class="site-nav__long">${esc(item.label)}</span><span class="site-nav__short">${esc(item.short)}</span>`
              : esc(item.label)
          }</a></li>`,
        )}
      </ul>
    </nav>
  </div>
</header>`;
}

function hiddenFormFields(name) {
  if (config.forms.provider === 'netlify') return html`<input type="hidden" name="form-name" value="${name}">`;
  return '';
}

export function formAttributes(name, endpoint) {
  if (config.forms.provider === 'netlify') {
    return `action="${name === 'contact' ? 'merci.html' : '#'}" method="POST" name="${name}" data-netlify="true" netlify-honeypot="_gotcha" data-provider="netlify"`;
  }
  return `action="${esc(endpoint)}" method="POST" data-provider="formspree"`;
}

export const honeypot = () =>
  html`<p class="hp" aria-hidden="true"><label>Ne pas remplir ce champ <input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></p>`;

function footer(root) {
  const year = new Date().getFullYear();
  return html`
<footer class="site-footer">
  <div class="container">
    <section class="newsletter" id="newsletter" aria-labelledby="newsletter-titre">
      <div class="newsletter__intro">
        <p class="kicker">Lettre d'information</p>
        <h2 class="newsletter__title" id="newsletter-titre">Recevoir nos actualités</h2>
        <p>Ateliers, salons, sorties et nouvelles de l'association, directement dans votre boîte mail.</p>
      </div>
      <!-- Newsletter : l'adresse d'envoi se règle dans src/config.mjs (forms.newsletterEndpoint). -->
      <form class="newsletter__form" ${formAttributes('newsletter', config.forms.newsletterEndpoint)} data-form="newsletter" novalidate>
        ${hiddenFormFields('newsletter')}
        <div class="field">
          <label for="nl-email">Votre adresse e-mail</label>
          <div class="newsletter__row">
            <input type="email" id="nl-email" name="email" autocomplete="email" inputmode="email" required aria-describedby="nl-email-error nl-email-hint" placeholder="prenom@exemple.fr">
            <button class="btn btn--primary" type="submit">S'inscrire</button>
          </div>
          <p class="field__error" id="nl-email-error" data-error-for="nl-email" hidden></p>
          <p class="form-hint" id="nl-email-hint">Désinscription possible à tout moment. Vos données ne servent qu'à l'envoi de nos nouvelles (<a href="${root}mentions-legales.html#donnees">en savoir plus</a>).</p>
        </div>
        <input type="hidden" name="_subject" value="Inscription à la lettre d'information">
        ${honeypot()}
        <p class="form-status" data-form-status role="status" aria-live="polite"></p>
      </form>
    </section>

    <div class="site-footer__grid">
      <div class="site-footer__about">
        <picture>
          <source srcset="${root}assets/img/logo-vde-japon.webp" type="image/webp">
          <img class="site-footer__logo" src="${root}assets/img/logo-vde-japon.png" alt="Val d'Europe / Japon" width="160" height="135" loading="lazy">
        </picture>
        <p>Association culturelle franco-japonaise (loi 1901), basée à ${config.city} (${config.postalCode}), en ${config.department}.</p>
        <p class="site-footer__small">Référencée auprès de l'ambassade du Japon en France depuis 2014.</p>
      </div>
      <nav class="site-footer__nav" aria-label="Plan du site">
        <h2 class="site-footer__heading">Le site</h2>
        <ul>
          <li><a href="${root}index.html">Accueil</a></li>
          ${NAV.map((item) => html`<li><a href="${root}${item.href}">${esc(item.label)}</a></li>`)}
        </ul>
      </nav>
      <div class="site-footer__contact">
        <h2 class="site-footer__heading">Nous joindre</h2>
        <ul>
          <li><a href="mailto:${config.email}">${config.email}</a></li>
          <li>${config.city} (${config.postalCode}), ${config.department}</li>
          <li><a href="${config.facebook}" rel="noopener">Facebook<span class="visually-hidden"> (site externe)</span></a></li>
          <li><a href="${root}contact.html">Formulaire de contact</a></li>
        </ul>
      </div>
    </div>

    <div class="site-footer__bottom">
      <p>© ${year} ${esc(config.legalName)}</p>
      <ul>
        <li><a href="${root}mentions-legales.html">Mentions légales</a></li>
        <li><a href="${root}mentions-legales.html#donnees">Données personnelles</a></li>
        <li><a href="${root}mentions-legales.html#cookies">Cookies</a></li>
      </ul>
    </div>
  </div>
</footer>
${config.consentServices.length ? consentBanner(root) : ''}`;
}

function consentBanner(root) {
  const services = config.consentServices.map((s) => s.label).join(', ');
  return html`
<div class="consent" data-consent-banner data-consent-services="${esc(config.consentServices.map((s) => s.id).join(','))}" role="region" aria-label="Gestion des cookies" hidden>
  <p>Ce site peut afficher des contenus de services tiers (${esc(services)}) susceptibles de déposer des cookies. Acceptez-vous leur chargement ?</p>
  <p class="consent__actions">
    <button class="btn btn--primary" type="button" data-consent="accept">Accepter</button>
    <button class="btn btn--ghost" type="button" data-consent="refuse">Refuser</button>
    <a href="${root}mentions-legales.html#cookies">En savoir plus</a>
  </p>
</div>`;
}

// Page complète.
export function layout({ path, root, nav, title, description, body, ogType = 'website', image, jsonLd = [], crumbs, noindex = false, absoluteRoot }) {
  const fullTitle = path === 'index.html' ? title : `${title} — ${config.siteName}`;
  const url = publicUrl(path);
  const ogImage = image ? `${config.siteUrl}/${image}` : `${config.siteUrl}/assets/img/og-default.jpg`;
  const ld = [...jsonLd];
  if (crumbs) ld.push(breadcrumbLd(crumbs));
  const r = absoluteRoot ?? root;

  return html`<!doctype html>
<html lang="fr" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : html`<link rel="canonical" href="${url}">`}
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(config.siteName)}">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Logo de l'association Val d'Europe / Japon">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#F5F3EA">
<link rel="icon" href="${r}favicon.ico" sizes="48x48">
<link rel="icon" href="${r}assets/img/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${r}assets/img/apple-touch-icon.png">
<link rel="manifest" href="${r}site.webmanifest">
<script>document.documentElement.className = 'js is-entering';</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${r}assets/css/style.css">
<script src="${r}assets/js/main.js" defer></script>
${ld.map((obj) => html`<script type="application/ld+json">${JSON.stringify(obj)}</script>`)}
</head>
<body>
${header(r, nav)}
<main id="contenu" tabindex="-1">
${body}
</main>
${footer(r)}
</body>
</html>
`;
}
