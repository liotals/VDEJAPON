# Habiller le site e-monsite aux couleurs du nouveau design

Le fichier `vdejapon-e-monsite.css` applique le nouveau design (fond washi, typographie Shippori Mincho
et Zen Kaku Gothic New, boutons vermillon, traits fins, transitions entre les pages) **directement à votre
site e-monsite**, sans JavaScript et sans changer de thème.

## Installation (5 minutes)

1. Ouvrez `vdejapon-e-monsite.css`, sélectionnez **tout** le contenu (Ctrl+A) et copiez-le (Ctrl+C).
2. Dans le manager e-monsite : **Configuration > Apparence > Personnaliser**.
3. En bas du formulaire, dans la partie Experts, ouvrez **« Modifier / Ajouter du code CSS »**.
4. Collez le code (Ctrl+V), puis **Enregistrer**.
5. Ouvrez votre site dans un nouvel onglet et rechargez la page (Ctrl+F5) pour voir le résultat.

Pour une cohérence parfaite, réglez aussi les couleurs du formulaire de personnalisation du thème :
fond `#F5F3EA`, texte `#2B2A27`, couleur principale et boutons `#B3261E`, bordures `#E6E1D3`.

À savoir :

- Le code s'ajoute **à la fin** de la feuille de style du thème : il la complète et la remplace là où c'est utile.
- **Changer de thème efface ce code** : gardez ce fichier, il suffira de le recoller.
- Utilisez le champ « Ajouter du code CSS » plutôt que le « Mode avancé » : revenir ensuite au mode simple
  ferait perdre les modifications faites en mode avancé.

## Ce que fait la feuille de style

| Élément | Effet |
| --- | --- |
| Page | fond blanc cassé `#F5F3EA`, texte `#2B2A27` en 17-18 px, interlignage généreux |
| Titres | Shippori Mincho ; petit trait vermillon au-dessus du titre de chaque page |
| Liens | soulignement fin, gris puis foncé au survol |
| Menu | fond clair, page en cours en vermillon, sous-menus et menu mobile assortis |
| Boutons | principal en vermillon, secondaires en contour ; rayon de 4 px partout |
| Formulaires | champs à bordure fine, focus bien visible, champ invalide en vermillon |
| Blocs, listes, tableaux | aplats, bordures de 1 px, aucune ombre ni dégradé |
| Pied de page | fond `#E6E1D3`, liens sobres |
| Transitions | fondu entre les pages, trait vermillon tracé en haut de l'écran à chaque arrivée |
| Défilement | photos et blocs apparaissent en douceur en entrant à l'écran |

Les animations respectent le réglage « réduire les animations » de l'ordinateur ou du téléphone.
Les transitions entre pages fonctionnent dans Chrome, Edge et Safari récents ; dans les autres
navigateurs, la page change normalement, sans animation. Les polices se chargent depuis Google Fonts.

## Blocs HTML facultatifs

Pour aller plus loin, quatre blocs prêts à l'emploi reprennent la mise en page du nouveau design.
Collez-les dans une page e-monsite à l'aide d'un élément « Code HTML » (ou en mode « code source »
d'un bloc de texte), puis adaptez les textes.

**Sur-titre avec trait vermillon**

```html
<p class="vde-kicker">Nos activités</p>
```

**Encart « cours complets »**

```html
<div class="vde-notice">
  <p class="vde-badge">Complet pour le moment</p>
  <p>Pour l'instant, les cours sont complets. De nouvelles informations sur les cours seront publiées prochainement.</p>
  <p><a class="btn btn-primary" href="/contact/">Être informé des prochains cours</a></p>
</div>
```

**Bandeau « ambassade du Japon »**

```html
<div class="vde-band">
  <p><strong>Référencée auprès de l'ambassade du Japon depuis 2014</strong> comme association culturelle franco-japonaise.</p>
  <a href="https://www.fr.emb-japan.go.jp/itpr_fr/culture.html#panelAssoc">Voir la liste de l'ambassade ↗</a>
</div>
```

**Grille d'activités**

```html
<ul class="vde-grid">
  <li>
    <span class="vde-kanji" lang="ja">語<small>go · la langue</small></span>
    <h3>Cours de japonais</h3>
    <p>Cours particuliers d'une heure, à domicile sur Val d'Europe ou en ligne.</p>
  </li>
  <li>
    <span class="vde-kanji" lang="ja">書<small>sho · l'écriture</small></span>
    <h3>Calligraphie</h3>
    <p>Ateliers pour les établissements scolaires, les salons et les entreprises.</p>
  </li>
  <li>
    <span class="vde-kanji" lang="ja">折<small>ori · plier</small></span>
    <h3>Origami</h3>
    <p>Initiations au pliage de papier, à l'école comme lors de nos manifestations.</p>
  </li>
</ul>
```

## Si un élément ne prend pas le style

Chaque thème e-monsite a ses propres noms de classes. La feuille vise les classes communes aux thèmes
Bootstrap d'e-monsite (`.view`, `.navbar`, `.btn`, `.panel`, `#footer`…) et a été testée sur une page qui
imite cette structure. Si une zone garde l'ancien style : clic droit sur l'élément > **Inspecter**, notez
sa classe, et envoyez-la (ou une capture d'écran) pour ajuster la règle correspondante.
