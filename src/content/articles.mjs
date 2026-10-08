// Actualités (blog). Textes repris de l'ancien site (vdejapon-asso.fr/blog), reformulés pour la clarté.
// Champs :
//   slug       nom du fichier généré : site/actualites/<slug>.html
//   date       date de publication ISO (AAAA-MM-JJ) ; null si inconnue (préciser alors dateLabel et sortDate)
//   category   Salon | Atelier | Sortie | Cours | Événement
//   photo      clé de la photo : déposer site/assets/img/photos/<clé>.webp (ratio 3:2) pour l'afficher
//   source     adresse de l'article sur l'ancien site (pour reprise du texte complet et des photos)
//   todo       note affichée en commentaire HTML dans la page générée

export const articles = [
  {
    slug: 'expo-manga-2026-lagny-sur-marne',
    title: 'Expo Manga 2026 à Lagny-sur-Marne',
    date: '2026-06-15',
    category: 'Salon',
    excerpt: "Beau temps et visiteurs nombreux pour l'édition 2026 de l'Expo Manga de Lagny-sur-Marne.",
    body: `
      <p>Nous étions de nouveau présents à l'Expo Manga de Lagny-sur-Marne en juin 2026.</p>
      <p>Il faisait beau et les visiteurs sont venus nombreux : une très belle journée pour faire découvrir la culture japonaise.</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/expo-manga-2026-a-lagny-sur-marne.html',
    todo: "compléter le récit et ajouter les photos de l'article original",
  },
  {
    slug: 'resultats-jlpt-decembre-2025',
    title: "Résultats de l'examen JLPT de décembre 2025",
    date: null,
    dateLabel: '2026',
    sortDate: '2026-02-01',
    category: 'Cours',
    excerpt: 'Trois candidats, trois réussites : félicitations à nos élèves !',
    body: `
      <p>Les résultats du JLPT (<span lang="en">Japanese-Language Proficiency Test</span>) de la session de décembre 2025 sont tombés : nos trois candidats ont tous réussi, deux au niveau N5 et un au niveau N2.</p>
      <p>Le JLPT est le test officiel d'aptitude en langue japonaise. Il comporte cinq niveaux, du N5, le premier, au N1, le plus avancé.</p>
      <p>Bravo à eux pour leur travail !</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/resultats-de-l-examen-jlpt-de-decembre-2025.html',
    todo: "préciser la date de publication exacte de l'article original",
  },
  {
    slug: 'japan-expo-2025',
    title: 'Japan Expo 2025',
    date: '2025-07-20',
    category: 'Salon',
    excerpt: 'Quatre jours sur le stand Hiroshima Sightseeing et JR West : les passionnés du Japon sont toujours plus nombreux.',
    body: `
      <p>Cette année, nous tenions le stand <span lang="en">Hiroshima Sightseeing</span> et JR West à la Japan Expo.</p>
      <p>Pendant quatre jours, nous l'avons constaté : le nombre de passionnés du Japon ne cesse d'augmenter !</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/japan-expo-2025.html',
    todo: "ajouter les photos de l'article original",
  },
  {
    slug: 'expo-manga-2025-lagny-sur-marne',
    title: "Nous avons participé à l'Expo Manga de Lagny-sur-Marne",
    date: '2025-06-16',
    category: 'Salon',
    excerpt: "L'association était présente à l'Expo Manga de Lagny-sur-Marne en juin 2025.",
    body: `
      <p>En juin 2025, l'association a participé à l'Expo Manga de Lagny-sur-Marne pour y faire découvrir la culture japonaise.</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/nous-avons-participer-a-manga-expo-a-lagny-sur-marne.html',
    todo: "reprendre le texte complet et les photos de l'article original (seul un extrait a pu être récupéré)",
  },
  {
    slug: 'visite-de-l-assemblee-nationale-le-12-avril-2025',
    title: "Visite de l'Assemblée nationale le 12 avril 2025",
    date: '2025-04-28',
    category: 'Sortie',
    excerpt: 'Une visite rendue possible grâce à la députée Ersilia Soudais, élève de l’association.',
    body: `
      <p>Le 12 avril 2025, nous avons visité l'Assemblée nationale.</p>
      <p>Cette visite a été rendue possible grâce à Ersilia Soudais, députée et élève de l'association. Un grand merci à elle !</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/visite-de-l-assemblee-nationale-le-12-avril-2025.html',
    todo: "reprendre le récit complet de la visite et les photos de l'article original",
  },
  {
    slug: 'ateliers-calligraphie-2025-college-jacqueline-de-romilly',
    title: 'Ateliers de calligraphie au collège Jacqueline de Romilly',
    date: '2025-03-22',
    category: 'Atelier',
    excerpt: 'Une semaine du Japon au collège de Magny-le-Hongre : recherches, dessins et ateliers de calligraphie.',
    body: `
      <p>Le collège Jacqueline de Romilly de Magny-le-Hongre a organisé une semaine consacrée au Japon.</p>
      <p>Les élèves ont découvert la culture japonaise en faisant des recherches et en dessinant, et ils ont participé à nos ateliers de calligraphie, qui les ont particulièrement enthousiasmés.</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/ateliers-calligraphie-2025-au-college-jacqueline-de-romilly-magny-le-hongre.html',
    todo: "ajouter les photos de l'article original",
  },
  {
    slug: 'salon-du-livre-et-du-manga-de-magny-le-hongre',
    title: 'Nous avons participé au Salon du livre et du manga de Magny-le-Hongre',
    date: null,
    dateLabel: '2025',
    sortDate: '2025-03-01',
    category: 'Salon',
    excerpt: 'Quatre ateliers de calligraphie, tous complets.',
    body: `
      <p>L'association a participé au Salon du livre et du manga de Magny-le-Hongre.</p>
      <p>Nous y avons animé quatre ateliers de calligraphie, qui ont tous affiché complet.</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/nous-serons-present-au-salon-du-livre-et-du-manga-de-magny-le-hongre.html',
    todo: "préciser la date du salon et de l'article original",
  },
  {
    slug: 'sortie-de-debut-d-annee-2025',
    title: "Sortie de début d'année 2025",
    date: '2025-01-31',
    category: 'Sortie',
    excerpt: "Exposition d'estampes à la Maison de la culture du Japon à Paris, puis déjeuner entre membres.",
    body: `
      <p>Pour bien commencer l'année, nous sommes allés voir une exposition d'estampes à la Maison de la culture du Japon à Paris.</p>
      <p>La sortie s'est terminée par un déjeuner tous ensemble dans un café-restaurant que nous aimons beaucoup.</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/sortie-de-debut-d-annee-2025.html',
    todo: "ajouter les photos de l'article original",
  },
  {
    slug: 'marche-de-noel-de-montry-2024',
    title: 'Nous avons participé au marché de Noël de Montry 2024',
    date: '2024-12-10',
    category: 'Événement',
    excerpt: 'Cette année encore, nous étions au marché de Noël de Montry : un moment spectaculaire.',
    body: `
      <p>Cette année encore, nous avons participé au marché de Noël de Montry.</p>
      <p>C'était spectaculaire, avec de nombreux spectacles tout au long de l'événement.</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/nous-participons-au-marche-de-noel-de-montry-2024.html',
    todo: "ajouter les photos de l'article original",
  },
  {
    slug: 'salon-du-sake-2024',
    title: 'Salon du saké 2024',
    date: '2024-10-08',
    category: 'Salon',
    excerpt: 'Un beau succès : merci à toutes celles et à tous ceux qui sont venus !',
    body: `
      <p>Le Salon du saké 2024 a été un succès.</p>
      <p>Merci à toutes celles et à tous ceux qui sont venus nous rendre visite !</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/salon-du-sake-2024.html',
    todo: "reprendre le texte complet et les photos de l'article original",
  },
  {
    slug: 'journees-europeennes-du-patrimoine-2024',
    title: 'Journées européennes du patrimoine 2024',
    date: '2024-09-23',
    category: 'Événement',
    excerpt: 'Nous avons eu le plaisir de faire découvrir la culture japonaise.',
    body: `
      <p>À l'occasion des Journées européennes du patrimoine 2024, nous avons eu le plaisir de faire découvrir la culture japonaise.</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/journees-europeennes-du-patrimoine-2024.html',
    todo: "reprendre le texte complet (lieu, programme) et les photos de l'article original",
  },
  {
    slug: 'japan-expo-2024',
    title: 'Japan Expo 2024',
    date: null,
    dateLabel: '2024',
    sortDate: '2024-07-15',
    category: 'Salon',
    excerpt: 'De belles rencontres, avec des habitants de Fujiyoshida et les visiteurs du salon.',
    body: `
      <p>Nous avons passé un très bon moment à la Japan Expo 2024, avec des habitants de Fujiyoshida, ville située au pied du mont Fuji, et avec les visiteurs du salon.</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/japan-expo-2024.html',
    todo: "préciser la date de l'article original et ajouter ses photos",
  },
  {
    slug: 'festival-du-printemps-2024-a-esbly',
    title: 'Festival du Printemps 2024 à Esbly',
    date: '2024-03-24',
    category: 'Événement',
    excerpt: 'Un festival sur le thème du Japon, avec food trucks japonais et musique traditionnelle : un grand succès.',
    body: `
      <p>Le Festival du Printemps d'Esbly, organisé le 23 mars 2024 sur le thème du Japon, a été un grand succès.</p>
      <p>Les food trucks japonais (sushis et ramen) étaient délicieux, et des spectacles de musique traditionnelle japonaise étaient au programme.</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/festival-de-printemps.html',
    todo: "ajouter les photos et l'affiche de l'article original",
  },
  {
    slug: 'atelier-origami-a-esbly',
    title: 'Atelier origami à Esbly',
    date: '2024-01-19',
    category: 'Atelier',
    excerpt: "Deux séances d'origami dans une école d'Esbly : les élèves de CP ont plié des tulipes.",
    body: `
      <p>Nous avons animé deux séances d'origami dans une école élémentaire d'Esbly.</p>
      <p>Les élèves de CP ont appris à plier des tulipes.</p>`,
    source: 'http://www.vdejapon-asso.fr/blog/atelier-origami-a-esbly-1.html',
    todo: "ajouter les photos de l'article original",
  },
];
