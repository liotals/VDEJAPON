// Configuration du site — c'est le seul fichier à modifier pour les réglages courants.
// Après modification : `node build.mjs` régénère le dossier `site/`.

export const config = {
  // URL publique du site, sans slash final (sert aux balises canoniques, Open Graph et au sitemap).
  // TODO: confirmer le domaine définitif (reprise de vdejapon-asso.fr ou nouvelle adresse).
  siteUrl: 'https://www.vdejapon-asso.fr',

  // Chemin de base, utilisé uniquement par la page 404 (servie à n'importe quelle adresse).
  // '/' pour un domaine dédié ; '/NOM-DU-DEPOT/' pour un site GitHub Pages de projet.
  basePath: '/',

  siteName: "Val d'Europe / Japon",
  legalName: "VAL D'EUROPE / JAPON",
  rna: 'W771011202',
  city: 'Esbly',
  postalCode: '77450',
  department: 'Seine-et-Marne',
  geo: { lat: 48.9053, lon: 2.8128 },

  // TODO: confirmer l'adresse e-mail (relevée dans l'annuaire des associations de l'ambassade
  // du Japon et dans le magazine municipal d'Esbly, non visible sur l'ancien site).
  email: 'vdejapon@outlook.com',
  facebook: 'https://www.facebook.com/pages/Val-Deurope-Japon/300014420144037',
  embassyUrl: 'https://www.fr.emb-japan.go.jp/itpr_fr/culture.html#panelAssoc',

  // Formulaires sans back-end.
  // provider: 'formspree' (URL https://formspree.io/f/XXXX) ou 'netlify' (Netlify Forms, URL ignorée).
  forms: {
    provider: 'formspree',
    // TODO: créer les formulaires sur formspree.io et remplacer les identifiants ci-dessous.
    contactEndpoint: 'https://formspree.io/f/TODO_CONTACT_ID',
    newsletterEndpoint: 'https://formspree.io/f/TODO_NEWSLETTER_ID',
  },

  // État des inscriptions aux cours de japonais (affiché sur l'accueil, la page Cours et l'agenda).
  // TODO: mettre à jour pour 2026/2027 (l'ancien site indiquait seulement « complet pour 2025/2026 »).
  cours: {
    saison: '2025/2026',
    complet: true,
  },

  // Services tiers soumis à consentement (vide = aucun cookie, aucun bandeau).
  // Exemple : [{ id: 'youtube', label: 'vidéos YouTube' }]. Le bandeau apparaît alors automatiquement,
  // et les éléments <template data-consent="youtube"> ne sont activés qu'après accord.
  consentServices: [],
};
