// Petits utilitaires de rendu HTML partagés par les gabarits.
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const SITE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../site');

// Les attributs sont toujours entre guillemets doubles : l'apostrophe n'a pas besoin d'être échappée.
const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
export const esc = (value = '') => String(value).replace(/[&<>"]/g, (c) => ESCAPES[c]);

// Gabarit étiqueté : les valeurs interpolées sont insérées telles quelles (HTML de confiance, écrit par nous).
// Les tableaux sont concaténés, les valeurs nulles/false ignorées.
export const html = (strings, ...values) =>
  strings.reduce((out, str, i) => {
    const v = values[i - 1];
    const s = Array.isArray(v) ? v.join('') : v === null || v === undefined || v === false ? '' : v;
    return out + s + str;
  });

// Évite la coupure de ligne sur les mots composés (Kiyomizu-dera, Ginkaku-ji, Rendez-vous…).
export const keep = (value = '') =>
  esc(value).replace(/(\p{L}+(?:-\p{L}+)+)/gu, '<span class="nowrap">$1</span>');

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const formatDate = (iso) => dateFormatter.format(new Date(`${iso}T00:00:00Z`));

// Photos : si site/assets/img/photos/<clé>.webp (ou .jpg) existe, on affiche la photo ;
// sinon un cadre typographique (caractère japonais) tient sa place et un TODO est laissé dans le code.
const missingPhotos = new Set();
export const getMissingPhotos = () => [...missingPhotos].sort();

const RATIO_SIZES = { '4/3': [1200, 900], '3/2': [1200, 800], '4/5': [960, 1200], '1/1': [1000, 1000], '16/9': [1600, 900] };

export const hasPhoto = (key) =>
  ['webp', 'jpg', 'jpeg', 'png'].some((e) => existsSync(path.join(SITE_DIR, `assets/img/photos/${key}.${e}`)));

export function photo({ root, key, alt, kanji, label, ratio = '4/3', eager = false, className = '' }) {
  const [w, h] = RATIO_SIZES[ratio] ?? RATIO_SIZES['4/3'];
  const style = `--ratio: ${ratio.replace('/', ' / ')}`;
  const base = `assets/img/photos/${key}`;
  const ext = ['webp', 'jpg', 'jpeg', 'png'].find((e) => existsSync(path.join(SITE_DIR, `${base}.${e}`)));
  if (ext) {
    const loading = eager ? 'fetchpriority="high"' : 'loading="lazy"';
    return html`<figure class="frame ${className}" style="${style}"><img src="${root}${base}.${ext}" alt="${esc(alt)}" width="${w}" height="${h}" ${loading} decoding="async"></figure>`;
  }
  missingPhotos.add(`${base}.webp (ratio ${ratio.replace('/', ':')})`);
  return html`<!-- TODO photo : déposer ${base}.webp (ratio ${ratio.replace('/', ':')}) — ${esc(alt)} -->
<div class="frame frame--empty ${className}" style="${style}" aria-hidden="true"><span class="frame__kanji" lang="ja">${kanji}</span>${label ? html`<span class="frame__label">${esc(label)}</span>` : ''}</div>`;
}

// Typographie française : espaces insécables avant ; : ! ? » et après «, hors <script> et <style>.
export function frenchTypography(source) {
  return source
    .split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->)/)
    .map((chunk, i) => {
      if (i % 2 === 1) return chunk;
      return chunk
        .replace(/(<[^>]*>)|([^<]+)/g, (m, tag, text) => {
          if (tag) {
            // Attributs lisibles (alt, title, aria-label, content) : même traitement.
            return tag.replace(/((?:alt|title|aria-label|content|placeholder)=")([^"]*)(")/g, (_, a, v, b) => a + fixText(v) + b);
          }
          return fixText(text);
        });
    })
    .join('');
}

function fixText(text) {
  return text
    .replace(/(\p{L})'(?=\p{L})/gu, '$1’')
    .replace(/ ([;!?])/g, ' $1')
    .replace(/ :(\s|$)/g, ' :$1')
    .replace(/« /g, '« ')
    .replace(/ »/g, ' »');
}
