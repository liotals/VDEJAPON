import { config } from '../config.mjs';
import { html, esc } from '../lib/html.mjs';
import { pageHead, agendaItem, ctaBlock } from '../components.mjs';
import { upcoming, past } from '../content/agenda.mjs';

export function agenda() {
  const root = '';
  const crumbs = [
    { label: 'Accueil', path: 'index.html' },
    { label: 'Agenda', path: 'agenda.html' },
  ];
  const years = [...new Set(past.map((e) => e.iso.slice(0, 4)))];
  return {
    path: 'agenda.html',
    nav: 'agenda',
    title: 'Agenda',
    description:
      "Agenda de l'association Val d'Europe / Japon : cours de japonais, ateliers de calligraphie et d'origami, salons et sorties à Val d'Europe et en Seine-et-Marne.",
    crumbs,
    body: html`
${pageHead({
  root,
  crumbs,
  kicker: 'Rendez-vous',
  title: 'Agenda',
  lead: "Cours, ateliers, salons et sorties : retrouvez ici les rendez-vous de l'association.",
  kanji: '暦',
  reading: 'koyomi · le calendrier',
})}

<section class="section" aria-labelledby="avenir-titre">
  <div class="container split">
    <div class="split__aside">
      <p class="kicker">À venir</p>
      <h2 id="avenir-titre">Prochainement</h2>
      <p class="split__note">Les prochaines dates de salons et d'ateliers seront annoncées ici et sur <a href="${config.facebook}" rel="noopener">notre page Facebook<span class="visually-hidden"> (site externe)</span></a>.</p>
    </div>
    <!-- TODO: ajouter les prochains rendez-vous dans src/content/agenda.mjs (aucune date à venir sur l'ancien site). -->
    <ul class="agenda" role="list">
      ${upcoming.map((item) => agendaItem(root, item))}
    </ul>
  </div>
</section>

<section class="section section--rule" aria-labelledby="passes-titre">
  <div class="container split">
    <div class="split__aside">
      <p class="kicker">Ils ont eu lieu</p>
      <h2 id="passes-titre"><span class="nowrap">Rendez-vous</span> passés</h2>
    </div>
    <div class="timeline">
      ${years.map(
        (year) => html`
      <section class="timeline__year" aria-labelledby="annee-${year}">
        <h3 class="timeline__label" id="annee-${year}">${year}</h3>
        <ul class="timeline__list" role="list">
          ${past
            .filter((e) => e.iso.startsWith(year))
            .map(
              (e) => html`<li class="timeline__item reveal">
            <time class="timeline__when" datetime="${e.iso}">${esc(e.when)}</time>
            <p class="timeline__what"><a href="actualites/${e.article}.html">${esc(e.title)}</a>${e.place ? html`<span class="timeline__place">${esc(e.place)}</span>` : ''}</p>
          </li>`,
            )}
        </ul>
      </section>`,
      )}
    </div>
  </div>
</section>

${ctaBlock(root, {
  kicker: 'Vos événements',
  title: 'Nous inviter à votre manifestation',
  text: 'Salon, fête de quartier, semaine du Japon dans votre établissement : l’association peut y proposer un stand ou des ateliers.',
  primary: { href: 'contact.html?sujet=evenement#formulaire', label: 'Nous contacter' },
  secondary: { href: '#newsletter', label: 'Recevoir nos actualités' },
})}
`,
  };
}
