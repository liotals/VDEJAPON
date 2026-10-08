// Agenda. `upcoming` : rendez-vous à venir ou permanents ; `past` : rendez-vous passés (2024-2026),
// repris des articles de l'ancien site. Ajouter les nouvelles dates en tête de `upcoming`.
//   when    libellé de date affiché ; iso : date ISO pour la balise <time> (facultatif)
//   link    page interne liée (chemin depuis la racine du site)

export const upcoming = [
  {
    when: 'Prochainement',
    title: 'Cours de japonais',
    place: 'À domicile sur Val d’Europe ou en ligne',
    text: 'De nouvelles informations sur les cours seront publiées prochainement.',
    status: 'cours',
    link: { href: 'cours-de-japonais.html', label: 'Voir les cours' },
  },
];

export const past = [
  { iso: '2026-06', when: 'Juin 2026', title: 'Expo Manga 2026', place: 'Lagny-sur-Marne', article: 'expo-manga-2026-lagny-sur-marne' },
  { iso: '2025-07', when: 'Juillet 2025', title: 'Japan Expo 2025 — stand Hiroshima Sightseeing et JR West', place: 'Paris-Nord Villepinte', article: 'japan-expo-2025' },
  { iso: '2025-06', when: 'Juin 2025', title: 'Expo Manga 2025', place: 'Lagny-sur-Marne', article: 'expo-manga-2025-lagny-sur-marne' },
  { iso: '2025-04-12', when: '12 avril 2025', title: "Visite de l'Assemblée nationale", place: 'Paris', article: 'visite-de-l-assemblee-nationale-le-12-avril-2025' },
  { iso: '2025-03', when: 'Mars 2025', title: 'Semaine du Japon et ateliers de calligraphie', place: 'Collège Jacqueline de Romilly, Magny-le-Hongre', article: 'ateliers-calligraphie-2025-college-jacqueline-de-romilly' },
  { iso: '2025', when: '2025', title: 'Salon du livre et du manga — quatre ateliers de calligraphie', place: 'Magny-le-Hongre', article: 'salon-du-livre-et-du-manga-de-magny-le-hongre' },
  { iso: '2025-01', when: 'Janvier 2025', title: "Sortie : exposition d'estampes", place: 'Maison de la culture du Japon à Paris', article: 'sortie-de-debut-d-annee-2025' },
  { iso: '2024-12', when: 'Décembre 2024', title: 'Marché de Noël', place: 'Montry', article: 'marche-de-noel-de-montry-2024' },
  { iso: '2024', when: '2024', title: 'Salon du saké 2024', place: 'Paris', article: 'salon-du-sake-2024' },
  { iso: '2024-09', when: 'Septembre 2024', title: 'Journées européennes du patrimoine', article: 'journees-europeennes-du-patrimoine-2024' },
  { iso: '2024', when: '2024', title: 'Japan Expo 2024', place: 'Paris-Nord Villepinte', article: 'japan-expo-2024' },
  { iso: '2024-03-23', when: '23 mars 2024', title: 'Festival du Printemps sur le thème du Japon', place: 'Esbly', article: 'festival-du-printemps-2024-a-esbly' },
  { iso: '2024-01', when: 'Janvier 2024', title: 'Ateliers origami à l’école', place: 'Esbly', article: 'atelier-origami-a-esbly' },
];
