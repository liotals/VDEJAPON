# Val d'Europe / Japon — site web

Nouveau site de l'association culturelle franco-japonaise **VAL D'EUROPE / JAPON** (Esbly, 77450),
destiné à remplacer l'ancien site e-monsite (vdejapon-asso.fr).

Site statique : HTML, une feuille de style, un petit fichier JavaScript, sans framework.
Le dossier **`site/` est le site complet, prêt à être mis en ligne tel quel.**

## Arborescence

```
build.mjs                     générateur (Node.js 18+, aucune dépendance)
src/
  config.mjs                  réglages : URL du site, e-mail, formulaires, état des cours…
  layout.mjs                  en-tête, menu, pied de page, balises SEO
  components.mjs              composants partagés (cartes, agenda, appels à l'action…)
  content/
    articles.mjs              actualités (blog)
    carnets.mjs               carnets de voyages
    agenda.mjs                rendez-vous à venir et passés
  pages/                      une fonction par page (accueil, cours, ateliers, contact…)
  lib/html.mjs                utilitaires (photos, typographie française)
site/                         ← le site généré, à déployer
  index.html, qui-sommes-nous.html, cours-de-japonais.html, ateliers-team-building.html,
  agenda.html, contact.html, mentions-legales.html, merci.html, 404.html
  actualites/                 index.html + une page par article
  carnets-de-voyages/         index.html + une page par carnet
  assets/css/style.css        design system complet (variables, composants)
  assets/js/main.js           menu mobile, formulaires, apparition au défilement, carte
  assets/img/                 logo, favicon, image de partage (Open Graph)
  assets/img/photos/          photos du site (à déposer, voir plus bas)
  sitemap.xml, robots.txt, site.webmanifest
```

Pourquoi un générateur ? Un mini-script Node sans dépendance évite de recopier l'en-tête, le menu,
le pied de page et les métadonnées SEO sur 32 pages ; comme `site/` est versionné, aucun build
n'est nécessaire pour déployer.

## Modifier le contenu

1. Modifier un fichier de `src/` (par exemple ajouter un article en tête de `src/content/articles.mjs`).
2. Lancer `node build.mjs` : les pages de `site/` sont régénérées.
3. Vérifier en local : `npx serve site` puis ouvrir http://localhost:3000.

Le CSS (`site/assets/css/style.css`) et le JavaScript (`site/assets/js/main.js`) se modifient directement.

Réglages courants dans `src/config.mjs` :

| Réglage | Rôle |
| --- | --- |
| `siteUrl` | adresse publique du site (canonique, Open Graph, sitemap) |
| `email`, `facebook` | coordonnées affichées partout |
| `forms.contactEndpoint`, `forms.newsletterEndpoint` | URL Formspree des formulaires |
| `forms.provider` | `'formspree'` ou `'netlify'` (Netlify Forms) |
| `cours.saison`, `cours.complet` | bandeau « Complet pour 2025/2026 » / inscriptions ouvertes |
| `consentServices` | services tiers soumis à consentement (vide = aucun bandeau) |

## Photos

Aucune photo n'a pu être récupérée de l'ancien site (voir « Informations manquantes »). En attendant,
chaque emplacement affiche un caractère japonais en guise d'illustration. Pour afficher une photo,
déposer un fichier WebP (ou JPG) au nom attendu, puis relancer `node build.mjs` :

| Fichier | Page | Ratio |
| --- | --- | --- |
| `assets/img/photos/accueil.webp` | Accueil (hero) | 4:5 |
| `assets/img/photos/association.webp` | Qui sommes-nous ? | 4:3 |
| `assets/img/photos/cours-de-japonais.webp` | Cours de japonais | 4:3 |
| `assets/img/photos/ateliers-team-building.webp`, `ateliers-onigiri.webp`, `ateliers-calligraphie.webp`, `ateliers-cuisine.webp`, `ateliers-origami.webp` | Ateliers | 4:3 |
| `assets/img/photos/actualites/<slug>.webp` | une actualité (facultatif) | 3:2 |
| `assets/img/photos/carnets/<slug>.webp` | un carnet de voyage (facultatif) | 4:5 |

Conseil : 1600 px de large au maximum, compression WebP qualité 80 (par exemple avec squoosh.app).
`node build.mjs --photos` liste les emplacements encore vides.

## Formulaires (sans serveur)

- **Formspree** (par défaut) : créer deux formulaires sur formspree.io, puis remplacer
  `TODO_CONTACT_ID` et `TODO_NEWSLETTER_ID` dans `src/config.mjs`. Tant que ce n'est pas fait,
  le formulaire valide la saisie puis invite à écrire directement par e-mail.
- **Netlify Forms** : passer `forms.provider` à `'netlify'` et relancer le build ; les formulaires
  sont alors détectés automatiquement au déploiement sur Netlify.

## Déploiement

**Netlify** : relier le dépôt ; `netlify.toml` indique le dossier `site/` et la commande `node build.mjs`.
Ou glisser-déposer le dossier `site/` sur app.netlify.com/drop.

**GitHub Pages** : dans *Settings → Pages*, choisir la source « GitHub Actions ».
Le workflow `.github/workflows/pages.yml` publie `site/` à chaque push sur `main`.
Pour un domaine personnalisé (par exemple vdejapon-asso.fr), le déclarer dans *Settings → Pages* et
mettre à jour `siteUrl`. Pour une adresse de projet (`https://<compte>.github.io/<depot>/`), régler aussi
`basePath: '/<depot>/'` (utilisé par la page 404).

**Autre hébergeur** (OVH, o2switch…) : envoyer le contenu de `site/` par FTP à la racine du site.

## Accessibilité, SEO, RGPD

- HTML sémantique, `lang="fr"`, lien d'évitement, focus visible, menu mobile utilisable au clavier
  (Échap, focus géré), contrastes WCAG AA (audit axe-core sans erreur), animations désactivées avec
  `prefers-reduced-motion`.
- Titre et description par page, Open Graph, `sitemap.xml`, `robots.txt`, données structurées
  schema.org (`Organization`, `Course`, `BlogPosting`, `BreadcrumbList`).
- Aucun cookie ; carte OpenStreetMap chargée seulement sur demande ; bandeau de consentement prêt
  mais inactif tant qu'aucun service tiers n'est déclaré dans `consentServices`.

## Informations manquantes (TODO)

Les marqueurs `TODO` sont visibles dans le code (`grep -rn TODO src`). Principaux points :

- Photos de l'ancien site (aucune n'a pu être téléchargée) et textes complets des articles.
- Contenu des carnets « Fujiyoshida » et « Hiroshima / Miyajima ».
- Sushi Workshop : format, durée, nombre de participants, tarif.
- Cours de cuisine (dont enfants) : dates, lieu, âge, tarif.
- Inscriptions 2026/2027 aux cours de japonais (l'ancien site n'indique que « complet pour 2025/2026 »).
- Prochains rendez-vous de l'agenda.
- E-mail de contact à confirmer, téléphone éventuel, direction de la publication, hébergeur retenu.
- Identifiants Formspree, domaine définitif.
