// Carnets de voyages. Textes repris de l'ancien site (vdejapon-asso.fr/pages/carnets-de-voyages/).
// Champs :
//   ja / romaji   nom du lieu en japonais (affiché verticalement tant qu'aucune photo n'est fournie)
//   photo         clé de photo : site/assets/img/photos/<clé>.webp (ratio 4:5 pour la grille, 3:2 dans la page)
//   sections      [{ title, html }]

export const carnets = [
  {
    slug: 'kyoto-kiyomizu-dera',
    title: 'Kyoto · Kiyomizu-dera',
    region: 'Kyoto',
    ja: '清水寺',
    romaji: 'Kiyomizu-dera',
    excerpt: "Un temple aux origines millénaires, une cascade à l'eau pure et des ruelles anciennes à flâner.",
    sections: [
      {
        title: 'Un temple millénaire',
        html: `<p>Les origines du Kiyomizu-dera remontent à 798. Les bâtiments que l'on visite aujourd'hui datent de 1633.</p>`,
      },
      {
        title: "L'eau pure",
        html: `<p>Le temple tient son nom de la cascade qui coule dans son enceinte : <i lang="ja-Latn">kiyomizu</i> signifie « eau pure ».</p>`,
      },
      {
        title: 'Y aller',
        html: `<p>Depuis la gare de Kyoto, prenez le bus 206 ou 208. Le billet à la journée s'achète au distributeur, près de l'arrêt (500 yens lors de notre voyage : vérifiez les tarifs en vigueur). Descendez à l'arrêt Kiyomizu, puis marchez environ 670 mètres jusqu'au temple.</p>`,
      },
      {
        title: 'À ne pas manquer',
        html: `<p>Prenez le temps de visiter les jardins, puis de flâner dans les ruelles voisines de Ninen-zaka et de Sannen-zaka.</p><p><em>À suivre…</em></p>`,
      },
    ],
    source: 'http://www.vdejapon-asso.fr/pages/carnets-de-voyages/ca.html',
    todo: 'reprendre les photos du carnet original ; vérifier le tarif du billet de bus (information datée)',
  },
  {
    slug: 'fujiyoshida',
    title: 'Fujiyoshida',
    region: 'Yamanashi',
    ja: '富士吉田',
    romaji: 'Fujiyoshida',
    excerpt: 'Au pied du mont Fuji, une ville avec laquelle nous avons noué de beaux liens.',
    sections: [
      {
        title: 'Au pied du mont Fuji',
        html: `<p>Fujiyoshida se trouve au pied du mont Fuji, dans la préfecture de Yamanashi. Nous avons eu le plaisir d'en rencontrer des habitants lors de la Japan Expo 2024.</p>
          <!-- TODO: reprendre le texte complet du carnet « Fujiyoshida » depuis l'ancien site (non récupéré). -->
          <p class="note">Le récit complet de ce carnet sera bientôt mis en ligne.</p>`,
      },
    ],
    source: 'http://www.vdejapon-asso.fr/pages/carnets-de-voyages/',
    todo: "reprendre le texte et les photos du carnet original (contenu non récupéré)",
  },
  {
    slug: 'kyoto-gion',
    title: 'Kyoto · Gion',
    region: 'Kyoto',
    ja: '祇園',
    romaji: 'Gion',
    excerpt: 'Le sanctuaire Yasaka, les maisons de bois du quartier et, au détour d’une rue, geiko et maiko.',
    sections: [
      {
        title: 'Le sanctuaire Yasaka',
        html: `<p>Aussi appelé sanctuaire de Gion, le Yasaka-jinja est un sanctuaire shintô fondé en 656 et reconstruit entre 1654 et 1664.</p>`,
      },
      {
        title: 'Les machiya',
        html: `<p>Le quartier a conservé ses maisons traditionnelles en bois, les <i lang="ja-Latn">machiya</i>. Certaines abritent des maisons de thé, les <i lang="ja-Latn">ochaya</i>.</p>`,
      },
      {
        title: 'Geiko et maiko',
        html: `<p>On croise encore dans les rues de Gion des <i lang="ja-Latn">geiko</i> et des <i lang="ja-Latn">maiko</i> en tenue traditionnelle, le soir comme en journée.</p>`,
      },
    ],
    source: 'http://www.vdejapon-asso.fr/pages/carnets-de-voyages/carnet-de-voyage-kyoto-gion.html',
    todo: 'reprendre les photos du carnet original',
  },
  {
    slug: 'kyoto-promenade-de-la-philosophie',
    title: 'Kyoto · Promenade de la Philosophie',
    region: 'Kyoto',
    ja: '哲学の道',
    romaji: 'Tetsugaku-no-michi',
    excerpt: 'Un chemin paisible le long d’un canal bordé de cerisiers, entre deux grands temples.',
    sections: [
      {
        title: 'Le long du canal',
        html: `<p>La promenade de la Philosophie suit un canal bordé de cerisiers, entre le Ginkaku-ji et le Nanzen-ji.</p>`,
      },
      {
        title: 'Combien de temps ?',
        html: `<p>Comptez environ 30 minutes de marche… et souvent bien davantage, tant les lieux à visiter en chemin invitent à s'arrêter.</p>`,
      },
    ],
    source: 'http://www.vdejapon-asso.fr/pages/carnets-de-voyages/voyage-a-kyoto-promenade-de-la-philosophie.html',
    todo: 'reprendre les photos du carnet original',
  },
  {
    slug: 'kyoto-ginkaku-ji',
    title: "Kyoto · Ginkaku-ji, le pavillon d'argent",
    region: 'Kyoto',
    ja: '銀閣寺',
    romaji: 'Ginkaku-ji',
    excerpt: "Construit pour rivaliser avec le pavillon d'or, il n'a jamais reçu son revêtement d'argent.",
    sections: [
      {
        title: "Le pavillon d'argent",
        html: `<p>De son nom officiel Jishō-ji, le temple a été construit en 1482 à l'initiative du shogun Ashikaga Yoshimasa. Il voulait rivaliser avec le Kinkaku-ji, le pavillon d'or, bâti par son grand-père Ashikaga Yoshimitsu.</p>`,
      },
      {
        title: "Un argent qui n'est jamais venu",
        html: `<p>Le pavillon n'a pourtant jamais été recouvert d'argent : la guerre d'Ōnin, commencée en 1467, a interrompu le projet. Le pavillon d'argent est l'un des rares bâtiments d'origine encore debout.</p>`,
      },
      {
        title: 'Y aller',
        html: `<p>Le temple se trouve au bout de la promenade de la Philosophie : une belle façon d'y arriver à pied.</p>`,
      },
    ],
    source: 'http://www.vdejapon-asso.fr/pages/carnets-de-voyages/voyage-a-kyoto-ginkaku-ji-pavillon-d-argent.html',
    todo: 'reprendre les photos du carnet original',
  },
  {
    slug: 'hiroshima-miyajima',
    title: 'Hiroshima · Miyajima',
    region: 'Hiroshima',
    ja: '宮島',
    romaji: 'Miyajima',
    excerpt: "L'île de Miyajima, de son nom officiel Itsukushima, au large d'Hiroshima.",
    sections: [
      {
        title: "L'île d'Itsukushima",
        html: `<p>Au large d'Hiroshima, l'île de Miyajima porte officiellement le nom d'Itsukushima.</p>
          <!-- TODO: reprendre le texte complet du carnet « Hiroshima (Miyajima = Itsukushima) » depuis l'ancien site (non récupéré). -->
          <p class="note">Le récit complet de ce carnet sera bientôt mis en ligne.</p>`,
      },
    ],
    source: 'http://www.vdejapon-asso.fr/pages/carnets-de-voyages/',
    todo: "reprendre le texte et les photos du carnet original (contenu non récupéré)",
  },
];
