import { config } from '../config.mjs';
import { html, photo } from '../lib/html.mjs';
import { organizationLd } from '../layout.mjs';
import { sectionHead, newsCard, agendaItem, ctaBlock } from '../components.mjs';
import { upcoming } from '../content/agenda.mjs';

const ACTIVITIES = [
  {
    kanji: '語',
    reading: 'go · la langue',
    title: 'Cours de japonais',
    text: "Cours particuliers d'une heure, à domicile sur Val d'Europe ou en ligne, avec des horaires adaptés à chacun.",
    href: 'cours-de-japonais.html',
    link: 'Les cours de japonais',
  },
  {
    kanji: '食',
    reading: 'shoku · la table',
    title: 'Cuisine et origami',
    text: 'Cours de cuisine japonaise, y compris pour les enfants, et initiations à l’origami, à l’école comme lors de nos manifestations.',
    href: 'ateliers-team-building.html#cuisine',
    link: 'Cuisine et origami',
  },
  {
    kanji: '書',
    reading: 'sho · l’écriture',
    title: 'Calligraphie et ateliers',
    text: 'Ateliers de calligraphie et d’onigiri pour les salons, les établissements scolaires et les entreprises.',
    href: 'ateliers-team-building.html#calligraphie',
    link: 'Nos ateliers',
  },
  {
    kanji: '和',
    reading: 'wa · l’harmonie',
    title: 'Team building',
    text: 'Le Sushi Workshop : un atelier sushi pour réunir vos équipes autour de la cuisine japonaise.',
    href: 'ateliers-team-building.html#team-building',
    link: 'Le Sushi Workshop',
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
      "Association culturelle franco-japonaise à Esbly (77) : cours de japonais, cours de cuisine japonaise, origami, calligraphie, ateliers et team building en Seine-et-Marne.",
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
    ${sectionHead({ kicker: 'Nos activités', title: 'Apprendre, cuisiner, créer ensemble', id: 'activites-titre', intro: 'Pour les familles, les adultes, les étudiants en japonais, les entreprises, les collectivités et les établissements scolaires.' })}
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
    <ul class="agenda" role="list">
      ${upcoming.slice(0, 3).map((item) => agendaItem(root, item))}
    </ul>
  </div>
</section>

${ctaBlock(root, {
  kicker: 'Contact',
  title: 'Une question, un projet d’atelier ?',
  text: 'Cours de japonais, atelier en entreprise ou à l’école, participation à votre événement : écrivez-nous. Pour suivre nos activités, inscrivez-vous à notre lettre d’information.',
  primary: { href: 'contact.html', label: 'Nous écrire' },
  secondary: { href: '#newsletter', label: 'Recevoir nos actualités' },
})}
`,
  };
}
