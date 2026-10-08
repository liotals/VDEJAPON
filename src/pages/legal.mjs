import { config } from '../config.mjs';
import { html } from '../lib/html.mjs';
import { pageHead } from '../components.mjs';

export function mentions() {
  const root = '';
  const crumbs = [
    { label: 'Accueil', path: 'index.html' },
    { label: 'Mentions légales', path: 'mentions-legales.html' },
  ];
  const providerName = config.forms.provider === 'netlify' ? 'Netlify Forms (Netlify, Inc., États-Unis)' : 'Formspree (Formspree, Inc., États-Unis)';
  return {
    path: 'mentions-legales.html',
    nav: null,
    title: 'Mentions légales et cookies',
    description: "Mentions légales, données personnelles et gestion des cookies du site de l'association Val d'Europe / Japon.",
    crumbs,
    body: html`
${pageHead({ root, crumbs, kicker: 'Informations', title: 'Mentions légales', lead: 'Éditeur, hébergement, données personnelles et cookies.' })}

<div class="section">
  <div class="container legal">
    <nav class="legal__toc" aria-label="Sommaire">
      <p class="kicker">Sommaire</p>
      <ol role="list">
        <li><a href="#editeur">Éditeur du site</a></li>
        <li><a href="#hebergement">Hébergement</a></li>
        <li><a href="#propriete">Propriété intellectuelle</a></li>
        <li><a href="#donnees">Données personnelles</a></li>
        <li><a href="#cookies">Cookies</a></li>
      </ol>
    </nav>
    <div class="prose">
      <h2 id="editeur">Éditeur du site</h2>
      <p>Le site est édité par l'association ${config.legalName}, association régie par la loi du 1<sup>er</sup> juillet 1901.</p>
      <ul>
        <li>Numéro RNA : ${config.rna}</li>
        <li>Siège social : ${config.city} (${config.postalCode}), ${config.department}</li>
        <li>Contact : <a href="mailto:${config.email}">${config.email}</a></li>
        <!-- TODO: indiquer le nom du ou de la directeur·rice de la publication (en général la présidence de l'association). -->
        <li>Direction de la publication : la présidence de l'association</li>
      </ul>

      <h2 id="hebergement">Hébergement</h2>
      <!-- TODO: conserver l'hébergeur retenu et supprimer l'autre. -->
      <p>Le site est hébergé par l'un des prestataires suivants, selon l'option de déploiement retenue :</p>
      <ul>
        <li>GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.</li>
        <!-- TODO: compléter l'adresse postale de Netlify si cet hébergeur est retenu (voir netlify.com). -->
        <li>Netlify — Netlify, Inc., San Francisco, Californie, États-Unis (www.netlify.com).</li>
      </ul>

      <h2 id="propriete">Propriété intellectuelle</h2>
      <p>Les textes, photographies et le logo de ce site sont la propriété de l'association ${config.legalName}, sauf mention contraire. Toute reproduction sans autorisation préalable est interdite.</p>

      <h2 id="donnees">Données personnelles</h2>
      <p>Les informations transmises par le formulaire de contact (nom, adresse e-mail, sujet, message) servent uniquement à répondre à votre demande. L'adresse saisie pour la lettre d'information sert uniquement à vous envoyer les nouvelles de l'association ; chaque envoi permet de se désinscrire.</p>
      <p>Ces données sont transmises par l'intermédiaire du service ${providerName}, ne sont ni vendues ni cédées, et sont conservées le temps nécessaire au traitement de votre demande ou jusqu'à votre désinscription.</p>
      <p>Conformément au Règlement général sur la protection des données (RGPD) et à la loi « Informatique et libertés », vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition. Pour l'exercer, écrivez à <a href="mailto:${config.email}">${config.email}</a>. Vous pouvez également adresser une réclamation à la <a href="https://www.cnil.fr/" rel="noopener">CNIL<span class="visually-hidden"> (site externe)</span></a>.</p>

      <h2 id="cookies">Cookies</h2>
      <p><strong>Ce site ne dépose aucun cookie</strong> : ni mesure d'audience, ni publicité, ni réseau social intégré. C'est pourquoi aucun bandeau de consentement ne s'affiche.</p>
      <ul>
        <li>Les polices de caractères sont chargées depuis Google Fonts, qui reçoit à cette occasion l'adresse IP de votre navigateur, sans dépôt de cookie.</li>
        <li>La carte de la page Contact, fournie par OpenStreetMap, ne se charge que si vous cliquez sur « Afficher la carte ».</li>
        <li>Le lien vers notre page Facebook est un simple lien : aucun contenu de Facebook n'est chargé sur ce site.</li>
      </ul>
      <p>Si un service tiers susceptible de déposer des cookies était ajouté (vidéo, carte, statistiques), un bandeau vous demanderait votre accord au préalable, et vous pourriez modifier votre choix à tout moment.</p>
      ${config.consentServices.length ? html`<p><button class="btn btn--ghost" type="button" data-consent-reset>Modifier mes choix de cookies</button></p>` : ''}
    </div>
  </div>
</div>
`,
  };
}

export function merci() {
  return {
    path: 'merci.html',
    nav: null,
    noindex: true,
    title: 'Message envoyé',
    description: 'Merci pour votre message.',
    body: html`
${pageHead({ root: '', kicker: 'Merci', title: 'Votre message a bien été envoyé.', lead: 'Nous vous répondrons dès que possible.', kanji: '礼', reading: 'rei · le remerciement' })}
<div class="section section--tight">
  <div class="container"><p class="hero__actions"><a class="btn btn--primary" href="index.html">Retour à l'accueil</a> <a class="btn btn--ghost" href="actualites/index.html">Lire nos actualités</a></p></div>
</div>
`,
  };
}

export function notFound() {
  const r = config.basePath;
  return {
    path: '404.html',
    nav: null,
    noindex: true,
    absoluteRoot: r,
    title: 'Page introuvable',
    description: "Cette page n'existe pas ou a été déplacée.",
    body: html`
${pageHead({ root: r, kicker: 'Erreur 404', title: 'Cette page est introuvable.', lead: "Elle n'existe pas, ou a été déplacée lors de la refonte du site.", kanji: '迷', reading: "mayoi · s'égarer" })}
<div class="section section--tight">
  <div class="container"><p class="hero__actions"><a class="btn btn--primary" href="${r}index.html">Retour à l'accueil</a> <a class="btn btn--ghost" href="${r}contact.html">Nous contacter</a></p></div>
</div>
`,
  };
}
