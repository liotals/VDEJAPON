import { config } from '../config.mjs';
import { html, photo } from '../lib/html.mjs';
import { organizationLd } from '../layout.mjs';
import { pageHead, ctaBlock } from '../components.mjs';

const MISSIONS = [
  "Contribuer à la connaissance de la culture et de la civilisation japonaises par toute forme d'échanges, d'ateliers, de cours, de cours en ligne et de manifestations, à Val d'Europe et en Seine-et-Marne.",
  "Favoriser la connaissance et la promotion du Val d'Europe au Japon.",
  "Entretenir de bonnes relations entre le Val d'Europe et le Japon.",
  "Aider à l'intégration des Japonais et des Franco-Japonais à Marne-la-Vallée.",
];

const PUBLICS = [
  { title: 'Familles et enfants', text: 'Origami, calligraphie et découvertes lors des fêtes et festivals locaux.' },
  { title: 'Adultes et étudiants en japonais', text: 'Cours particuliers à domicile ou en ligne, sorties culturelles et rencontres lors des salons.' },
  { title: 'Entreprises', text: 'Ateliers de calligraphie pour découvrir la culture japonaise en équipe.' },
  { title: 'Collectivités et établissements scolaires', text: 'Ateliers de calligraphie et d’origami, semaines du Japon, participation aux salons et événements.' },
];

export function about() {
  const root = '';
  const crumbs = [
    { label: 'Accueil', path: 'index.html' },
    { label: 'Qui sommes-nous ?', path: 'qui-sommes-nous.html' },
  ];
  return {
    path: 'qui-sommes-nous.html',
    nav: 'association',
    title: 'Qui sommes-nous ?',
    description:
      "VAL D'EUROPE / JAPON, association franco-japonaise loi 1901 basée à Esbly (77), référencée auprès de l'ambassade du Japon depuis 2014 : nos missions et nos activités.",
    crumbs,
    jsonLd: [organizationLd()],
    body: html`
${pageHead({
  root,
  crumbs,
  kicker: "L'association",
  title: 'Qui sommes-nous ?',
  lead: "VAL D'EUROPE / JAPON est une association franco-japonaise régie par la loi de 1901, dont le siège est à Esbly, en Seine-et-Marne.",
  kanji: '交',
  reading: "kō · l'échange",
})}

<section class="section" aria-labelledby="mission-titre">
  <div class="container split">
    <div class="split__aside">
      <p class="kicker">Notre mission</p>
      <h2 id="mission-titre">Quatre engagements</h2>
    </div>
    <ol class="numbered" role="list">
      ${MISSIONS.map((m) => html`<li class="reveal"><p>${m}</p></li>`)}
    </ol>
  </div>
</section>

<section class="section section--alt" aria-labelledby="reconnaissance-titre">
  <div class="container split">
    <div class="split__aside">
      ${photo({ root, key: 'association', alt: "Les membres de l'association Val d'Europe / Japon lors d'une manifestation", kanji: '縁', label: 'en · le lien', ratio: '4/3' })}
    </div>
    <div class="prose reveal">
      <p class="kicker">Une association reconnue</p>
      <h2 id="reconnaissance-titre">Référencée par l'ambassade du Japon</h2>
      <p>Depuis l'été 2014, nous avons l'honneur d'être référencés auprès de l'ambassade du Japon en France en tant qu'association culturelle franco-japonaise.</p>
      <p><a class="link-arrow" href="${config.embassyUrl}" rel="noopener">Consulter la liste des associations de l'ambassade<span class="visually-hidden"> (site externe)</span><span aria-hidden="true"> ↗</span></a></p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="activites-titre">
  <div class="container split">
    <div class="split__aside">
      <p class="kicker">Ce que nous faisons</p>
      <h2 id="activites-titre">Cours, ateliers et rencontres</h2>
    </div>
    <div class="prose reveal">
      <p>Nous proposons des <a href="cours-de-japonais.html">cours particuliers de japonais</a>, à domicile sur Val d'Europe ou en ligne, ainsi que des <a href="ateliers.html">ateliers</a> de calligraphie et d'origami. Les cours sont complets pour le moment : de nouvelles informations seront publiées prochainement.</p>
      <p>Tout au long de l'année, l'association participe aux salons et aux fêtes de la région : Japan Expo, Expo Manga de Lagny-sur-Marne, Salon du livre et du manga de Magny-le-Hongre, marché de Noël de Montry, Festival du Printemps d'Esbly ou encore Journées européennes du patrimoine.</p>
      <p>Nous organisons aussi des sorties, comme une exposition d'estampes à la Maison de la culture du Japon à Paris ou la visite de l'Assemblée nationale en avril 2025. Et nos élèves présentent le JLPT, le test officiel de japonais : en décembre 2025, nos trois candidats l'ont réussi.</p>
      <p><a class="link-arrow" href="actualites/index.html">Lire nos actualités<span aria-hidden="true"> →</span></a></p>
    </div>
  </div>
</section>

<section class="section section--rule" aria-labelledby="publics-titre">
  <div class="container">
    <div class="section-head"><div>
      <p class="kicker">Pour qui ?</p>
      <h2 id="publics-titre">Nos publics</h2>
    </div></div>
    <ul class="shoji publics" role="list">
      ${PUBLICS.map((p) => html`<li class="reveal"><h3>${p.title}</h3><p>${p.text}</p></li>`)}
    </ul>
  </div>
</section>

<section class="section section--rule" aria-labelledby="fiche-titre">
  <div class="container split">
    <div class="split__aside">
      <p class="kicker">En bref</p>
      <h2 id="fiche-titre">Fiche d'identité</h2>
    </div>
    <dl class="shoji facts reveal">
      <div><dt>Statut</dt><dd>Association loi 1901</dd></div>
      <div><dt>Siège</dt><dd>${config.city} (${config.postalCode})</dd></div>
      <div><dt>RNA</dt><dd>${config.rna}</dd></div>
      <div><dt>Ambassade du Japon</dt><dd>Référencée depuis 2014</dd></div>
    </dl>
  </div>
</section>

${ctaBlock(root, {
  kicker: 'Nous rejoindre',
  title: 'Envie de participer ?',
  text: 'Pour un cours, un atelier ou un projet commun, écrivez-nous : nous serons ravis d’échanger avec vous.',
  primary: { href: 'contact.html', label: 'Nous contacter' },
  secondary: { href: 'agenda.html', label: "Voir l'agenda" },
})}
`,
  };
}
