import { config } from '../config.mjs';
import { html, photo } from '../lib/html.mjs';
import { organizationLd } from '../layout.mjs';
import { sectionHead, newsCard, agendaItem, ctaBlock } from '../components.mjs';
import { upcoming, past } from '../content/agenda.mjs';

const ACTIVITIES = [
  {
    kanji: '語',
    reading: 'go · la langue',
    title: 'Cours de japonais',
    text: "Cours particuliers à domicile sur Val d'Europe ou en ligne. Complets pour le moment : de nouvelles informations arrivent prochainement.",
    href: 'cours-de-japonais.html',
    link: 'Les cours de japonais',
  },
  {
    kanji: '書',
    reading: 'sho · l’écriture',
    title: 'Calligraphie',
    text: 'Ateliers de calligraphie pour les établissements scolaires, les salons et les entreprises.',
    href: 'ateliers.html#calligraphie',
    link: 'Les ateliers de calligraphie',
  },
  {
    kanji: '折',
    reading: 'ori · plier',
    title: 'Origami',
    text: 'Initiations à l’art du pliage de papier, à l’école comme lors de nos manifestations.',
    href: 'ateliers.html#origami',
    link: 'Les ateliers d’origami',
  },
  {
    kanji: '祭',
    reading: 'matsuri · la fête',
    title: 'Salons et événements',
    text: 'Japan Expo, Expo Manga, marchés et festivals : retrouvez-nous tout au long de l’année.',
    href: 'agenda.html',
    link: 'Nos rendez-vous',
  },
];

export function home({ articles }) {
  const root = '';
  const latest = articles.slice(0, 3);
  return {
    path: 'index.html',
    nav: 'home',
    title: "Val d'Europe / Japon — Association franco-japonaise en Seine-et-Marne",
    description:
      "Association culturelle franco-japonaise à Esbly (77) : cours de japonais, ateliers de calligraphie et d'origami, salons et événements autour de la culture japonaise en Seine-et-Marne.",
    jsonLd: [organizationLd()],
    body: html`
<section class="hero" aria-labelledby="hero-titre">
  <div class="container hero__grid">
    <div class="hero__text">
      <p class="kicker">Association culturelle franco-japonaise · Esbly (77)</p>
      <h1 class="hero__title" id="hero-titre">Faire découvrir la culture japonaise, au cœur du Val&nbsp;d'Europe.</h1>
      <p class="lead hero__lead">Depuis Esbly, VAL D'EUROPE / JAPON contribue à la connaissance de la culture et de la civilisation japonaises par des échanges, des ateliers, des cours, y compris en ligne, et des manifestations à Val d'Europe et en Seine-et-Marne.</p>
      <p class="hero__actions">
        <a class="btn btn--primary" href="cours-de-japonais.html">Découvrir nos cours</a>
        <a class="btn btn--ghost" href="qui-sommes-nous.html">Qui sommes-nous ?</a>
      </p>
    </div>
    <div class="hero__media">
      <p class="tategaki" lang="ja" aria-hidden="true">日仏文化交流</p>
      ${photo({ root, key: 'accueil', alt: "Atelier de l'association Val d'Europe / Japon", kanji: '間', label: "ma · l'intervalle", ratio: '4/5', eager: true })}
    </div>
  </div>
</section>

<section class="credibility" aria-label="Reconnaissance">
  <div class="container credibility__inner reveal">
    <p class="credibility__text"><strong>Référencée auprès de l'ambassade du Japon depuis 2014</strong> comme association culturelle franco-japonaise.</p>
    <a class="link-arrow" href="${config.embassyUrl}" rel="noopener">Voir la liste de l'ambassade<span class="visually-hidden"> (site externe)</span><span aria-hidden="true"> ↗</span></a>
  </div>
</section>

<section class="section" aria-labelledby="activites-titre">
  <div class="container">
    ${sectionHead({ kicker: 'Nos activités', title: 'Apprendre, créer, se rencontrer', id: 'activites-titre', intro: 'Pour les familles, les adultes, les étudiants en japonais, les entreprises, les collectivités et les établissements scolaires.' })}
    <ul class="shoji activities" role="list">
      ${ACTIVITIES.map(
        (a) => html`
      <li class="activity reveal">
        <p class="activity__kanji" aria-hidden="true"><span lang="ja">${a.kanji}</span></p>
        <p class="activity__reading">${a.reading}</p>
        <h3 class="activity__title"><a href="${a.href}">${a.title}</a></h3>
        <p class="activity__text">${a.text}</p>
        <p class="activity__more" aria-hidden="true">${a.link} <span>→</span></p>
      </li>`,
      )}
    </ul>
  </div>
</section>

<section class="section section--rule" aria-labelledby="actus-titre">
  <div class="container">
    ${sectionHead({ kicker: 'Actualités', title: 'Les dernières nouvelles', id: 'actus-titre', link: { href: 'actualites/index.html', label: 'Toutes les actualités' } })}
    <div class="cards cards--three">
      ${latest.map((a) => newsCard(root, a))}
    </div>
  </div>
</section>

<section class="section section--rule" aria-labelledby="agenda-titre">
  <div class="container split">
    ${sectionHead({ kicker: 'Agenda', title: 'Prochains <span class="nowrap">rendez-vous</span>', id: 'agenda-titre', intro: 'Les prochaines dates de salons, d’ateliers et de sorties sont annoncées ici et sur notre page Facebook.', link: { href: 'agenda.html', label: "Voir l'agenda" } })}
    <div>
      <ul class="agenda" role="list">
        ${upcoming.slice(0, 2).map((item) => agendaItem(root, item))}
      </ul>
      <h3 class="agenda__subhead">Récemment</h3>
      <ul class="agenda agenda--past" role="list">
        ${past.slice(0, 2).map((e) => agendaItem(root, { ...e, link: { href: `actualites/${e.article}.html`, label: 'Lire' } }))}
      </ul>
    </div>
  </div>
</section>

${ctaBlock(root, {
  kicker: 'Contact',
  title: 'Une question, un projet d’atelier ?',
  text: 'Cours de japonais, atelier à l’école ou en entreprise, participation à votre événement : écrivez-nous. Pour suivre nos activités, inscrivez-vous à notre lettre d’information.',
  primary: { href: 'contact.html', label: 'Nous écrire' },
  secondary: { href: '#newsletter', label: 'Recevoir nos actualités' },
})}
`,
  };
}
