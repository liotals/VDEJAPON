import { html, photo } from '../lib/html.mjs';
import { pageHead, ctaBlock } from '../components.mjs';

const WORKSHOPS = [
  {
    id: 'team-building',
    kicker: 'Team building',
    title: 'Sushi Workshop',
    kanji: '鮨',
    reading: 'sushi',
    alt: 'Atelier sushi en entreprise',
    html: `
      <p>Le Sushi Workshop réunit vos équipes autour de la préparation des sushis : une activité conviviale pour découvrir ensemble la cuisine japonaise.</p>
      <!-- TODO: format, durée, nombre de participants, lieu et tarif du Sushi Workshop (page de l'ancien site non récupérée). -->
      <p>Format, durée, nombre de participants : <a href="contact.html?sujet=atelier#formulaire">contactez-nous</a> pour construire l'atelier adapté à votre entreprise.</p>`,
    link: { href: 'contact.html?sujet=atelier#formulaire', label: 'Organiser un Sushi Workshop' },
  },
  {
    id: 'onigiri',
    kicker: 'Atelier',
    title: 'Onigiri',
    kanji: '米',
    reading: 'kome · le riz',
    alt: "Atelier onigiri : préparation de boulettes de riz triangulaires",
    html: `
      <p>Les onigiri, boulettes de riz souvent triangulaires, sont un classique de la cuisine japonaise du quotidien.</p>
      <p>En 2025, nous avons animé des ateliers onigiri et calligraphie de fin d'année pour une entreprise japonaise de la région parisienne, avec 80 participants au total. Avec quelques conseils, chacun a façonné de jolis onigiri bien triangulaires… avant de les déguster.</p>`,
    link: { href: 'actualites/ateliers-onigiri-et-calligraphie-chez-kubota.html', label: "Lire le récit de l'atelier" },
  },
  {
    id: 'calligraphie',
    kicker: 'Atelier',
    title: 'Calligraphie',
    kanji: '書',
    reading: 'sho · l’écriture',
    alt: 'Atelier de calligraphie japonaise au pinceau',
    html: `
      <p>Au collège Jacqueline de Romilly de Magny-le-Hongre, lors d'une semaine consacrée au Japon, les élèves ont découvert la culture japonaise par des recherches, du dessin et nos ateliers de calligraphie, qui les ont particulièrement enthousiasmés.</p>
      <p>Au Salon du livre et du manga de Magny-le-Hongre, nos quatre ateliers de calligraphie ont tous affiché complet. En entreprise, les participants ont calligraphié les lettres et les prénoms de leur choix.</p>`,
    link: { href: 'actualites/ateliers-calligraphie-2025-college-jacqueline-de-romilly.html', label: 'La semaine du Japon au collège' },
  },
  {
    id: 'cuisine',
    kicker: 'Cours',
    title: 'Cuisine japonaise',
    kanji: '食',
    reading: 'shoku · la table',
    alt: 'Cours de cuisine japonaise',
    html: `
      <p>L'association propose des cours de cuisine japonaise, y compris des cours pour les enfants.</p>
      <!-- TODO: dates, lieu, âge, durée et tarif des cours de cuisine (fiche agenda de l'ancien site non récupérée). -->
      <p>Pour connaître les prochaines dates, consultez <a href="agenda.html">l'agenda</a> ou <a href="contact.html?sujet=cuisine#formulaire">écrivez-nous</a>.</p>`,
    link: { href: 'contact.html?sujet=cuisine#formulaire', label: 'Se renseigner sur les cours de cuisine' },
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
];

const AUDIENCES = [
  { title: 'Entreprises', text: 'Team building, ateliers de fin d’année, découverte de la culture japonaise pour vos équipes.' },
  { title: 'Établissements scolaires', text: 'Semaines du Japon, ateliers de calligraphie et d’origami pour les élèves.' },
  { title: 'Collectivités et salons', text: 'Stands et initiations lors de vos fêtes, salons, festivals et marchés.' },
];

export function ateliers() {
  const root = '';
  const crumbs = [
    { label: 'Accueil', path: 'index.html' },
    { label: 'Ateliers et team building', path: 'ateliers-team-building.html' },
  ];
  return {
    path: 'ateliers-team-building.html',
    nav: 'ateliers',
    title: 'Ateliers et team building',
    description:
      "Team building Sushi Workshop, ateliers onigiri, calligraphie et origami, cours de cuisine japonaise : des ateliers pour les entreprises, écoles et collectivités en Seine-et-Marne.",
    crumbs,
    body: html`
${pageHead({
  root,
  crumbs,
  kicker: 'Ateliers',
  title: 'Ateliers et team building',
  lead: 'Sushi, onigiri, calligraphie, origami : découvrir le Japon par la pratique, en entreprise, à l’école ou lors d’un événement.',
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
