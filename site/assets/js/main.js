/* Val d'Europe / Japon — JavaScript sans dépendance.
   1. Navigation sans rechargement et transitions de page
   2. Menu mobile          3. Apparition au défilement     4. Formulaires
   5. Filtre des actualités 6. Carte à la demande          7. Consentement aux services tiers
   Amélioration progressive : sans JavaScript, le site reste lisible et navigable par liens classiques. */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reducedMotion = () => motionQuery.matches;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /* En-tête : filet inférieur après défilement --------------------------- */
  const updateHeader = () => $('[data-header]')?.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* 2. Menu mobile -------------------------------------------------------- */
  // Écouteurs délégués : l'en-tête est remplacé à chaque changement de page.
  const isNavOpen = () => Boolean($('[data-nav]')?.classList.contains('is-open'));

  function setNav(open, { focus = true } = {}) {
    const toggle = $('[data-nav-toggle]');
    const nav = $('[data-nav]');
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    const label = $('[data-nav-label]', toggle);
    if (label) label.textContent = open ? 'Fermer' : 'Menu';
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    $$('main, footer').forEach((el) => (el.inert = open));
    if (focus) (open ? $('a', nav) : toggle)?.focus();
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-nav-toggle]')) setNav(!isNavOpen());
    else if (isNavOpen() && e.target.closest('[data-nav] a')) setNav(false, { focus: false });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isNavOpen()) setNav(false);
  });
  window.matchMedia('(min-width: 1180px)').addEventListener('change', (e) => {
    if (e.matches && isNavOpen()) setNav(false, { focus: false });
  });

  /* 3. Apparition douce au défilement ------------------------------------- */
  let revealObserver;

  function initReveal() {
    revealObserver?.disconnect();
    const els = $$('.reveal:not(.is-visible)');
    if (!els.length || reducedMotion() || !('IntersectionObserver' in window)) return;
    root.classList.add('reveal-ready');
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    els.forEach((el) => revealObserver.observe(el));
  }

  /* 4. Formulaires --------------------------------------------------------- */
  const MESSAGES = {
    nom: 'Indiquez votre nom.',
    email: 'Indiquez une adresse e-mail valide, par exemple prenom@exemple.fr.',
    sujet: 'Choisissez un sujet.',
    message: 'Écrivez votre message (10 caractères au moins).',
  };
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const fieldError = (field) => {
    const value = field.value.trim();
    if (field.required && !value) return MESSAGES[field.name] ?? 'Ce champ est obligatoire.';
    if (field.type === 'email' && value && !EMAIL_RE.test(value)) return MESSAGES.email;
    if (field.minLength > 0 && value.length < field.minLength) return MESSAGES[field.name] ?? 'Ce champ est trop court.';
    return '';
  };

  const showError = (form, field, message) => {
    const box = $(`[data-error-for="${field.id}"]`, form);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (!box) return;
    box.textContent = message;
    box.hidden = !message;
  };

  const validate = (form) => {
    let firstInvalid = null;
    $$('input[required], select[required], textarea[required]', form).forEach((field) => {
      const message = fieldError(field);
      showError(form, field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });
    return firstInvalid;
  };

  const setStatus = (form, message, type) => {
    const status = $('[data-form-status]', form);
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-error', type === 'error');
    status.classList.toggle('is-success', type === 'success');
  };

  const contactEmail = () => $('a[href^="mailto:"]')?.getAttribute('href').replace('mailto:', '') ?? '';

  function bindForm(form) {
    const kind = form.dataset.form;
    const provider = form.dataset.provider;
    let attempted = false;

    // Revalidation au fil de la saisie, après une première tentative d'envoi.
    const recheck = (e) => {
      if (attempted && e.target.matches('[required]')) showError(form, e.target, fieldError(e.target));
    };
    form.addEventListener('input', recheck);
    form.addEventListener('focusout', recheck);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      attempted = true;
      setStatus(form, '');
      const invalid = validate(form);
      if (invalid) {
        invalid.focus();
        setStatus(form, 'Merci de corriger le ou les champs signalés.', 'error');
        return;
      }

      const action = form.getAttribute('action') || '';
      if (provider !== 'netlify' && /TODO/.test(action)) {
        const mail = contactEmail();
        setStatus(form, `L’envoi en ligne n’est pas encore activé. Écrivez-nous directement${mail ? ` à ${mail}` : ''}.`, 'error');
        return;
      }

      const button = $('button[type="submit"]', form);
      button.disabled = true;
      setStatus(form, 'Envoi en cours…');
      const data = new FormData(form);

      try {
        const response =
          provider === 'netlify'
            ? await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data).toString(),
              })
            : await fetch(action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(String(response.status));
        form.reset();
        attempted = false;
        setStatus(
          form,
          kind === 'newsletter'
            ? 'Merci ! Votre inscription à la lettre d’information est bien enregistrée.'
            : 'Merci ! Votre message a bien été envoyé. Nous vous répondrons dès que possible.',
          'success',
        );
      } catch {
        const mail = contactEmail();
        setStatus(form, `L’envoi n’a pas abouti. Réessayez dans un instant${mail ? ` ou écrivez-nous à ${mail}` : ''}.`, 'error');
      } finally {
        button.disabled = false;
      }
    });
  }

  function initForms() {
    $$('form[data-form]').forEach(bindForm);

    // Sujet présélectionné depuis l'adresse : contact.html?sujet=infos-cours
    const subject = $('#c-sujet');
    const wanted = new URLSearchParams(window.location.search).get('sujet');
    if (subject && wanted && $$('option', subject).some((o) => o.value === wanted)) subject.value = wanted;
  }

  /* 5. Filtre des actualités par catégorie -------------------------------- */
  function initFilters() {
    const box = $('[data-filters]');
    if (!box) return;
    box.hidden = false;
    const status = $('[data-filter-status]', box);

    box.addEventListener('click', (e) => {
      const button = e.target.closest('[data-filter]');
      if (!button) return;
      const value = button.dataset.filter;
      $$('[data-filter]', box).forEach((b) => b.setAttribute('aria-pressed', String(b === button)));

      let count = 0;
      $$('[data-category]').forEach((card) => {
        const show = !value || card.dataset.category === value;
        card.hidden = !show;
        card.classList.remove('is-filtered');
        if (!show) return;
        count += 1;
        void card.offsetWidth; // relance l'animation d'apparition
        card.classList.add('is-filtered');
      });
      $$('[data-year]').forEach((section) => {
        section.hidden = !$$('[data-category]', section).some((card) => !card.hidden);
        const chip = $(`[data-year-chip="${section.dataset.year}"]`);
        if (chip) chip.hidden = section.hidden;
      });
      if (status) status.textContent = `${count} article${count > 1 ? 's' : ''} affiché${count > 1 ? 's' : ''}.`;
    });
  }

  /* 6. Carte OpenStreetMap chargée à la demande ---------------------------- */
  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-map-load]');
    const map = button?.closest('[data-map]');
    if (!map) return;
    const iframe = document.createElement('iframe');
    iframe.src = map.dataset.mapSrc;
    iframe.title = 'Carte de la localisation de l’association à Esbly';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer';
    map.prepend(iframe);
    button.remove();
  });

  /* 7. Consentement aux services tiers (inactif tant qu'aucun service n'est configuré) */
  const STORE = 'vde-consent';
  const readConsent = () => {
    try { return localStorage.getItem(STORE); } catch { return null; }
  };
  const writeConsent = (value) => {
    try { localStorage.setItem(STORE, value); } catch { /* stockage indisponible : choix non mémorisé */ }
  };
  const activateThirdParty = () => {
    $$('template[data-consent]').forEach((tpl) => tpl.replaceWith(tpl.content.cloneNode(true)));
  };

  function initConsent() {
    const banner = $('[data-consent-banner]');
    if (!banner) return;
    const choice = readConsent();
    if (choice === 'accept') activateThirdParty();
    banner.hidden = choice === 'accept' || choice === 'refuse';
  }

  document.addEventListener('click', (e) => {
    const choice = e.target.closest('[data-consent-banner] [data-consent]');
    if (choice) {
      writeConsent(choice.dataset.consent);
      $('[data-consent-banner]').hidden = true;
      if (choice.dataset.consent === 'accept') activateThirdParty();
    }
    if (e.target.closest('[data-consent-reset]')) {
      try { localStorage.removeItem(STORE); } catch { /* rien */ }
      const banner = $('[data-consent-banner]');
      if (banner) banner.hidden = false;
    }
  });

  /* Initialisation propre à chaque page ----------------------------------- */
  function initPage() {
    updateHeader();
    initReveal();
    initForms();
    initFilters();
    initConsent();
  }

  /* 1. Navigation sans rechargement et transitions de page ---------------- */
  // Au clic sur un lien interne, la page suivante est chargée en arrière-plan puis
  // échangée avec la page courante : sortie (fondu + trait vermillon), entrée
  // (texte qui monte, caractères japonais « tracés » de haut en bas).
  // Toute erreur retombe sur une navigation classique.
  const LEAVE_MS = 380;
  const ENTER_MS = 1300;
  const SWAPPED = ['[data-header]', 'main', '.site-footer', '[data-consent-banner]'];
  const HEAD_TAGS = [
    'meta[name="description"]',
    'meta[name="robots"]',
    'link[rel="canonical"]',
    'meta[property="og:type"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:url"]',
  ];

  const pageKey = (href) => {
    const url = new URL(href, window.location.href);
    url.hash = '';
    return url.href;
  };

  const cache = new Map();
  let currentKey = pageKey(window.location.href);
  let navId = 0;
  let enterTimer;
  let announcer;

  const isRoutable = (a) => {
    if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download') || a.closest('[data-no-router]')) return false;
    const url = new URL(a.href, window.location.href);
    return url.origin === window.location.origin && /(\.html?|\/)$/.test(url.pathname);
  };

  function fetchPage(href) {
    const key = pageKey(href);
    if (!cache.has(key)) {
      const request = fetch(key, { credentials: 'same-origin' }).then((res) => {
        if (!res.ok || !(res.headers.get('content-type') || '').includes('text/html')) throw new Error(`HTTP ${res.status}`);
        return res.text().then((text) => ({ text, url: res.url || key }));
      });
      request.catch(() => cache.delete(key));
      cache.set(key, request);
      if (cache.size > 40) cache.delete(cache.keys().next().value);
    }
    return cache.get(key);
  }

  function endEnterSoon() {
    clearTimeout(enterTimer);
    enterTimer = setTimeout(() => root.classList.remove('is-entering', 'is-routing'), ENTER_MS);
  }

  function leave() {
    clearTimeout(enterTimer);
    root.classList.remove('is-entering');
    root.classList.add('is-leaving', 'is-routing');
    return wait(LEAVE_MS);
  }

  function enter() {
    root.classList.remove('is-leaving');
    root.classList.add('is-entering');
    endEnterSoon();
  }

  function swap(doc) {
    document.title = doc.title;
    HEAD_TAGS.forEach((sel) => {
      const current = document.head.querySelector(sel);
      const next = doc.head.querySelector(sel);
      if (current && next) current.replaceWith(next);
      else if (current) current.remove();
      else if (next) document.head.append(next);
    });
    SWAPPED.forEach((sel) => {
      const current = $(sel);
      const next = doc.querySelector(sel);
      if (current && next) current.replaceWith(next);
      else if (current) current.remove();
      else if (next) document.body.append(next);
    });
    document.body.classList.remove('nav-open');
  }

  function announce(text) {
    if (!announcer) {
      announcer = document.createElement('p');
      announcer.className = 'visually-hidden';
      announcer.setAttribute('aria-live', 'polite');
      document.body.append(announcer);
    }
    announcer.textContent = '';
    requestAnimationFrame(() => (announcer.textContent = text));
  }

  async function navigate(href, { push = true, restoreY = 0 } = {}) {
    const id = ++navId;
    const target = new URL(href, window.location.href);
    const motion = !reducedMotion();
    if (isNavOpen()) setNav(false, { focus: false });
    if (push) history.replaceState({ ...history.state, scrollY: window.scrollY }, '');

    let page;
    try {
      [page] = await Promise.all([fetchPage(target.href), motion ? leave() : null]);
    } catch {
      window.location.assign(target.href);
      return;
    }
    if (id !== navId) return; // une navigation plus récente a pris le relais

    const doc = new DOMParser().parseFromString(page.text, 'text/html');
    if (!doc.querySelector('main')) {
      window.location.assign(target.href);
      return;
    }

    if (push) {
      const finalUrl = new URL(page.url);
      finalUrl.hash = target.hash;
      history.pushState({ scrollY: 0 }, '', finalUrl.href);
    }
    currentKey = pageKey(window.location.href);
    swap(doc);
    if (motion) enter();
    else root.classList.remove('is-leaving', 'is-routing');

    const anchor = push && target.hash && document.getElementById(decodeURIComponent(target.hash.slice(1)));
    if (anchor) anchor.scrollIntoView({ block: 'start', behavior: 'instant' });
    else window.scrollTo({ top: push ? 0 : restoreY, behavior: 'instant' });

    initPage();
    $('main')?.focus({ preventScroll: true });
    announce(document.title);
  }

  if (window.location.protocol.startsWith('http') && 'fetch' in window && 'DOMParser' in window) {
    history.scrollRestoration = 'manual';

    const line = document.createElement('div');
    line.className = 'route-line';
    line.setAttribute('aria-hidden', 'true');
    document.body.append(line);

    document.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href]');
      if (!isRoutable(a)) return;
      if (pageKey(a.href) === currentKey) {
        if (new URL(a.href).hash) return; // ancre dans la page : défilement natif
        e.preventDefault();
        window.scrollTo({ top: 0 });
        return;
      }
      e.preventDefault();
      navigate(a.href);
    });

    window.addEventListener('popstate', (e) => {
      if (pageKey(window.location.href) === currentKey) return; // simple changement d'ancre
      navigate(window.location.href, { push: false, restoreY: e.state?.scrollY ?? 0 });
    });

    // Préchargement au survol ou au focus : la page suivante est souvent prête avant le clic.
    if (!navigator.connection?.saveData) {
      const prefetch = (e) => {
        const a = e.target.closest?.('a[href]');
        if (isRoutable(a) && pageKey(a.href) !== currentKey) fetchPage(a.href).catch(() => {});
      };
      document.addEventListener('pointerover', prefetch, { passive: true });
      document.addEventListener('focusin', prefetch);
    }

    // Position de défilement conservée lors d'un rechargement ou d'un retour depuis un autre site.
    window.addEventListener('pagehide', () => history.replaceState({ ...history.state, scrollY: window.scrollY }, ''));
    const navType = performance.getEntriesByType?.('navigation')[0]?.type;
    if ((navType === 'reload' || navType === 'back_forward') && history.state?.scrollY) {
      window.scrollTo({ top: history.state.scrollY, behavior: 'instant' });
    }
  }

  initPage();
  endEnterSoon(); // fin de l'animation d'entrée du premier affichage
})();
