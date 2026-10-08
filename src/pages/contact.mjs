import { config } from '../config.mjs';
import { html } from '../lib/html.mjs';
import { pageHead } from '../components.mjs';
import { formAttributes, honeypot } from '../layout.mjs';

export const SUBJECTS = [
  { value: 'cours', label: 'Cours de japonais' },
  { value: 'infos-cours', label: 'Être informé des prochains cours' },
  { value: 'atelier', label: 'Atelier (calligraphie, origami)' },
  { value: 'evenement', label: 'Événement, école ou collectivité' },
  { value: 'autre', label: 'Autre demande' },
];

export function contact() {
  const root = '';
  const crumbs = [
    { label: 'Accueil', path: 'index.html' },
    { label: 'Contact', path: 'contact.html' },
  ];
  const { lat, lon } = config.geo;
  const bbox = [lon - 0.035, lat - 0.018, lon + 0.035, lat + 0.018].map((n) => n.toFixed(4)).join('%2C');
  const mapEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=13/${lat}/${lon}`;

  return {
    path: 'contact.html',
    nav: 'contact',
    title: 'Contact',
    description:
      "Contactez l'association Val d'Europe / Japon à Esbly (77450) : cours de japonais, ateliers de calligraphie et d'origami, salons et événements.",
    crumbs,
    body: html`
${pageHead({
  root,
  crumbs,
  kicker: 'Nous écrire',
  title: 'Contact',
  lead: 'Une question sur les cours, un projet d’atelier ou d’événement ? Écrivez-nous, nous vous répondrons dès que possible.',
  kanji: '文',
  reading: 'fumi · la lettre',
})}

<section class="section" aria-label="Formulaire et coordonnées">
  <div class="container contact__grid">
    <div class="contact__form" id="formulaire">
      <h2 class="h3">Formulaire de contact</h2>
      <p class="form-hint">Tous les champs sont obligatoires.</p>
      <!-- Formulaire : l'adresse d'envoi se règle dans src/config.mjs (forms.contactEndpoint, forms.provider). -->
      <form ${formAttributes('contact', config.forms.contactEndpoint)} data-form="contact" novalidate>
        ${config.forms.provider === 'netlify' ? '<input type="hidden" name="form-name" value="contact">' : ''}
        <div class="field">
          <label for="c-nom">Nom</label>
          <input type="text" id="c-nom" name="nom" autocomplete="name" required minlength="2" aria-describedby="c-nom-error">
          <p class="field__error" id="c-nom-error" data-error-for="c-nom" hidden></p>
        </div>
        <div class="field">
          <label for="c-email">Adresse e-mail</label>
          <input type="email" id="c-email" name="email" autocomplete="email" inputmode="email" required aria-describedby="c-email-error">
          <p class="field__error" id="c-email-error" data-error-for="c-email" hidden></p>
        </div>
        <div class="field">
          <label for="c-sujet">Sujet</label>
          <select id="c-sujet" name="sujet" required aria-describedby="c-sujet-error">
            <option value="">Choisissez un sujet</option>
            ${SUBJECTS.map((s) => html`<option value="${s.value}">${s.label}</option>`)}
          </select>
          <p class="field__error" id="c-sujet-error" data-error-for="c-sujet" hidden></p>
        </div>
        <div class="field">
          <label for="c-message">Message</label>
          <textarea id="c-message" name="message" rows="7" required minlength="10" aria-describedby="c-message-error c-message-hint"></textarea>
          <p class="form-hint" id="c-message-hint">Pour un cours, précisez votre niveau ; pour un atelier, le public et le nombre de participants.</p>
          <p class="field__error" id="c-message-error" data-error-for="c-message" hidden></p>
        </div>
        <input type="hidden" name="_subject" value="Nouveau message depuis le site Val d'Europe / Japon">
        ${honeypot()}
        <p class="form-legal">Les informations saisies servent uniquement à répondre à votre demande. <a href="mentions-legales.html#donnees">Données personnelles</a>.</p>
        <button class="btn btn--primary" type="submit">Envoyer le message</button>
        <p class="form-status" data-form-status role="status" aria-live="polite"></p>
      </form>
    </div>

    <div class="contact__aside">
      <h2 class="h3" id="coordonnees-titre">Coordonnées</h2>
      <dl class="contact__list">
        <div><dt>E-mail</dt><dd><a href="mailto:${config.email}">${config.email}</a></dd></div>
        <!-- TODO: ajouter un numéro de téléphone si l'association souhaite le publier. -->
        <div><dt>Localisation</dt><dd>Val d'Europe, ${config.city} (${config.postalCode})<br>${config.department}</dd></div>
        <div><dt>Réseaux</dt><dd><a href="${config.facebook}" rel="noopener">Notre page Facebook<span class="visually-hidden"> (site externe)</span></a></dd></div>
      </dl>

      <div class="map" data-map data-map-src="${mapEmbed}">
        <div class="map__placeholder">
          <p class="map__title">${config.city}, ${config.postalCode}</p>
          <p class="map__text">La carte est fournie par OpenStreetMap. Elle n'est chargée que si vous le demandez.</p>
          <p class="map__actions">
            <button class="btn btn--ghost" type="button" data-map-load>Afficher la carte</button>
            <a class="link-arrow" href="${mapLink}" rel="noopener">Ouvrir dans OpenStreetMap<span class="visually-hidden"> (site externe)</span><span aria-hidden="true"> ↗</span></a>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
`,
  };
}
