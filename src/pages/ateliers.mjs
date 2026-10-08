import { html, photo } from '../lib/html.mjs';
import { pageHead, ctaBlock } from '../components.mjs';

const WORKSHOPS = [
  {
    id: 'calligraphie',
    kicker: 'Atelier',
    title: 'Calligraphie',
    kanji: '書',
    reading: 'sho · l’écriture',
    alt: 'Atelier de calligraphie japonaise au pinceau',
    html: `
      <p>Au collège Jacqueline de Romilly de Magny-le-Hongre, lors d'une semaine consacrée au Japon, les élèves ont découvert la culture japonaise par des recherches, du dessin et nos ateliers de calligraphie, qui les ont particulièrement enthousiasmés.</p>
      <p>Au Salon du livre et du manga de Magny-le-Hongre, nos quatre ateliers de calligraphie ont tous affiché complet.</p>`,
    link: { href: 'actualites/ateliers-calligraphie-2025-college-jacqueline-de-romilly.html', label: 'La semaine du Japon au collège' },
  },
  {
    id: 'origami',
    kicker: 'Atelier',
    title: 'Origami',
    kanji: '折',
    reading: 'ori · plier',
    alt: 'Atelier origami avec des enfants',
    html: `
      <p>L'art du pliage de papier se découvre à tout âge. Dans une école élémentaire d'Esbly, deux séances d'origami ont permis aux élèves de CP de plier des tulipes.</p>`,
    link: { href: 'actualites/atelier-origami-a-esbly.html', label: "Lire le récit de l'atelier" },
  },
  {
    id: 'evenements',
    kicker: 'Rencontres',
    title: 'Salons et événements',
    kanji: '祭',
    reading: 'matsuri · la fête',
    alt: "Stand de l'association lors d'un salon",
    html: `
      <p>Tout au long de l'année, l'association fait découvrir la culture japonaise lors des salons et des fêtes de la région : Japan Expo, Expo Manga de Lagny-sur-Marne, Salon du livre et du manga de Magny-le-Hongre, marché de Noël de Montry, Festival du Printemps d'Esbly ou encore Journées européennes du patrimoine.</p>`,
    link: { href: 'agenda.html', label: 'Voir les rendez-vous' },
  },
];

const AUDIENCES = [
  { title: 'Établissements scolaires', text: 'Semaines du Japon, ateliers de calligraphie et d’origami pour les élèves.' },
  { title: 'Collectivités et salons', text: 'Stands et initiations lors de vos fêtes, salons, festivals et marchés.' },
  { title: 'Entreprises', text: 'Ateliers de calligraphie pour découvrir la culture japonaise en équipe.' },
];

export function ateliers() {
  const root = '';
  const crumbs = [
    { label: 'Accueil', path: 'index.html' },
    { label: 'Ateliers', path: 'ateliers.html' },
  ];
  return {
    path: 'ateliers.html',
    nav: 'ateliers',
    title: 'Ateliers de calligraphie et d’origami',
    description:
      "Ateliers de calligraphie japonaise et d'origami, stands lors des salons et fêtes : l'association Val d'Europe / Japon intervient dans les écoles, collectivités et événements de Seine-et-Marne.",
    crumbs,
    body: html`
${pageHead({
  root,
  crumbs,
  kicker: 'Ateliers',
  title: 'Ateliers',
  lead: 'Calligraphie, origami, salons : découvrir le Japon par la pratique, à l’école, lors d’un événement ou en entreprise.',
  kanji: '手',
  reading: 'te · la main',
})}

<nav class="section section--tight" aria-label="Sur cette page">
  <div class="container">
    <ul class="chips" role="list">
      ${WORKSHOPS.map((w) => html`<li><a class="chip" href="#${w.id}">${w.title}</a></li>`)}
    </ul>
  </div>
</nav>

${WORKSHOPS.map(
  (w, i) => html`
<section class="section workshop${i % 2 ? ' workshop--reverse' : ''}${i ? ' section--rule' : ' section--flush-top'}" id="${w.id}" aria-labelledby="${w.id}-titre">
  <div class="container workshop__grid">
    <div class="workshop__media reveal">
      ${photo({ root, key: `ateliers-${w.id}`, alt: w.alt, kanji: w.kanji, label: w.reading, ratio: '4/3' })}
    </div>
    <div class="workshop__text prose reveal">
      <p class="kicker">${w.kicker}</p>
      <h2 id="${w.id}-titre">${w.title}</h2>
      ${w.html}
      <p><a class="link-arrow" href="${w.link.href}">${w.link.label}<span aria-hidden="true"> →</span></a></p>
    </div>
  </div>
</section>`,
)}

<section class="section section--alt" aria-labelledby="publics-titre">
  <div class="container">
    <div class="section-head"><div>
      <p class="kicker">Pour qui ?</p>
      <h2 id="publics-titre">Des ateliers sur mesure</h2>
    </div></div>
    <ul class="shoji publics publics--three" role="list">
      ${AUDIENCES.map((a) => html`<li class="reveal"><h3>${a.title}</h3><p>${a.text}</p></li>`)}
    </ul>
  </div>
</section>

${ctaBlock(root, {
  kicker: 'Votre projet',
  title: 'Organiser un atelier',
  text: 'Décrivez-nous votre projet (public, nombre de participants, date souhaitée) : nous reviendrons vers vous pour en définir le format.',
  primary: { href: 'contact.html?sujet=atelier#formulaire', label: 'Nous écrire' },
  secondary: { href: 'agenda.html', label: "Voir l'agenda" },
})}
`,
  };
}
