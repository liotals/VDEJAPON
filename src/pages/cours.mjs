import { config } from '../config.mjs';
import { html, photo } from '../lib/html.mjs';
import { pageHead, coursStatus, ctaBlock } from '../components.mjs';

const FAQ = [
  {
    q: 'Les cours sont-ils complets ?',
    a: () =>
      config.cours.complet
        ? `Oui, pour l'instant. ${config.cours.annonce} Pour être prévenu, <a href="contact.html?sujet=infos-cours#formulaire">laissez-nous vos coordonnées</a> ou inscrivez-vous à la <a href="#newsletter">lettre d'information</a>.`
        : 'Des places sont disponibles : <a href="contact.html?sujet=cours#formulaire">contactez-nous</a> pour convenir de vos horaires.',
  },
  {
    q: 'Peut-on suivre les cours en ligne ?',
    a: () => "Oui. Les cours particuliers ont lieu à domicile sur Val d'Europe ou en ligne.",
  },
  {
    q: "Comment fonctionne la réduction d'impôt ?",
    a: () =>
      "Les sommes versées ouvrent droit à une réduction d'impôt de 50 % : un cours de 30 € vous revient ainsi à 15 €, selon votre situation fiscale.",
  },
  {
    q: 'Proposez-vous des cours collectifs ?',
    a: () => 'Non, les cours collectifs ne sont plus proposés : seuls les cours particuliers sont ouverts.',
  },
];

export function cours() {
  const root = '';
  const crumbs = [
    { label: 'Accueil', path: 'index.html' },
    { label: 'Cours de japonais', path: 'cours-de-japonais.html' },
  ];
  return {
    path: 'cours-de-japonais.html',
    nav: 'cours',
    title: 'Cours de japonais à Val d’Europe et en ligne',
    description:
      "Cours particuliers de japonais d'une heure à domicile sur Val d'Europe (Seine-et-Marne) ou en ligne : 30 € le cours, soit 15 € après réduction d'impôt, horaires personnalisés.",
    crumbs,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Cours particuliers de japonais',
        description: "Cours particuliers de japonais d'une heure, à domicile sur Val d'Europe ou en ligne, avec des horaires personnalisés.",
        inLanguage: 'ja',
        provider: { '@id': `${config.siteUrl}/#organisation` },
        offers: { '@type': 'Offer', price: '30', priceCurrency: 'EUR', category: 'Cours de 1 heure' },
        hasCourseInstance: [
          { '@type': 'CourseInstance', courseMode: 'onsite', location: { '@type': 'Place', name: "Val d'Europe", address: { '@type': 'PostalAddress', addressRegion: config.department, addressCountry: 'FR' } }, courseWorkload: 'PT1H' },
          { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT1H' },
        ],
      },
    ],
    body: html`
${pageHead({
  root,
  crumbs,
  kicker: 'Cours',
  title: 'Cours de japonais',
  lead: "Des cours particuliers d'une heure, à domicile sur Val d'Europe ou en ligne, à votre rythme.",
  kanji: '語',
  reading: 'go · la langue',
})}

<section class="section section--tight" aria-label="Inscriptions">
  <div class="container">
    ${coursStatus(root)}
  </div>
</section>

<section class="section section--flush-top" aria-labelledby="format-titre">
  <div class="container">
    <div class="section-head"><div>
      <p class="kicker">L'essentiel</p>
      <h2 id="format-titre">Le format des cours</h2>
    </div></div>
    <dl class="shoji facts facts--five reveal">
      <div><dt>Format</dt><dd>Cours particulier</dd></div>
      <div><dt>Durée</dt><dd>1 heure</dd></div>
      <div><dt>Lieu</dt><dd>À domicile sur Val d'Europe, ou en ligne</dd></div>
      <div><dt>Tarif</dt><dd>30 € le cours<span class="facts__note">soit 15 € après réduction d'impôt</span></dd></div>
      <div><dt>Horaires</dt><dd>Personnalisés</dd></div>
    </dl>
  </div>
</section>

<section class="section section--rule" aria-labelledby="deroulement-titre">
  <div class="container split">
    <div class="split__aside">
      ${photo({ root, key: 'cours-de-japonais', alt: 'Cours particulier de japonais', kanji: '学', label: 'gaku · apprendre', ratio: '4/3' })}
    </div>
    <div class="prose reveal">
      <p class="kicker">Déroulement</p>
      <h2 id="deroulement-titre">Un cours qui s'adapte à vous</h2>
      <p>Chaque cours est individuel et dure une heure. Il a lieu chez vous, sur Val d'Europe, ou en ligne si vous préférez.</p>
      <p>Le rythme est personnalisé et les horaires sont fixés avec vous, selon vos disponibilités.</p>
      <h3>Tarif et réduction d'impôt</h3>
      <p>Le cours d'une heure coûte 30 €. Les sommes versées ouvrent droit à une réduction d'impôt de 50 % : le cours vous revient ainsi à 15 €, selon votre situation fiscale.</p>
      <h3>Et les cours collectifs ?</h3>
      <p>Les cours collectifs ne sont plus proposés : l'association se consacre désormais aux cours particuliers.</p>
    </div>
  </div>
</section>

<section class="section section--alt" aria-labelledby="jlpt-titre">
  <div class="container split">
    <div class="split__aside">
      <p class="kicker">Résultats</p>
      <h2 id="jlpt-titre">Le JLPT</h2>
    </div>
    <div class="reveal">
      <p class="stat"><span class="stat__value">3 / 3</span><span class="stat__label">candidats reçus à la session de décembre 2025</span></p>
      <div class="prose">
        <p>Le JLPT est le test officiel d'aptitude en langue japonaise. À la session de décembre 2025, nos trois candidats l'ont réussi : deux au niveau N5 et un au niveau N2.</p>
        <p><a class="link-arrow" href="actualites/resultats-jlpt-decembre-2025.html">Lire l'actualité<span aria-hidden="true"> →</span></a></p>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="faq-titre">
  <div class="container split">
    <div class="split__aside">
      <p class="kicker">Questions fréquentes</p>
      <h2 id="faq-titre">Bon à savoir</h2>
    </div>
    <div class="faq">
      ${FAQ.map(
        (item) => html`<details class="faq__item reveal">
        <summary><span>${item.q}</span></summary>
        <div class="faq__answer"><p>${item.a()}</p></div>
      </details>`,
      )}
    </div>
  </div>
</section>

${ctaBlock(root, {
  kicker: config.cours.complet ? 'Prochainement' : 'Inscription',
  title: config.cours.complet ? 'Être informé des prochains cours' : 'S’inscrire à un cours',
  text: config.cours.complet
    ? `Les cours sont complets pour le moment. ${config.cours.annonce} Laissez-nous vos coordonnées ou inscrivez-vous à la lettre d’information pour être prévenu.`
    : 'Indiquez-nous vos disponibilités et votre niveau : nous reviendrons vers vous.',
  primary: config.cours.complet
    ? { href: 'contact.html?sujet=infos-cours#formulaire', label: 'Être informé des prochains cours' }
    : { href: 'contact.html?sujet=cours#formulaire', label: "S'inscrire" },
  secondary: config.cours.complet ? { href: '#newsletter', label: 'Recevoir la lettre d’information' } : { href: 'contact.html', label: 'Poser une question' },
})}
`,
  };
}
