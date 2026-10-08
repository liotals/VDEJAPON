/* Val d'Europe / Japon — JavaScript minimal, sans dépendance.
   Menu mobile, apparition au défilement, formulaires (validation + envoi), carte à la demande,
   consentement aux services tiers. Le site reste lisible et navigable sans JavaScript. */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* En-tête : filet inférieur après défilement --------------------------- */
  const header = $('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Menu mobile ----------------------------------------------------------- */
  const toggle = $('[data-nav-toggle]');
  const nav = $('[data-nav]');
  if (toggle && nav) {
    const label = $('[data-nav-label]', toggle);
    const desktop = window.matchMedia('(min-width: 1180px)');
    const outside = () => $$('main, footer');

    const setOpen = (open, { focus = true } = {}) => {
      toggle.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? 'Fermer' : 'Menu';
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      outside().forEach((el) => (el.inert = open));
      if (open && focus) $('a', nav)?.focus();
      if (!open && focus) toggle.focus();
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false, { focus: false });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
    });
    desktop.addEventListener('change', (e) => {
      if (e.matches && nav.classList.contains('is-open')) setOpen(false, { focus: false });
    });
  }

  /* Apparition douce au défilement --------------------------------------- */
  const revealEls = $$('.reveal');
  if (revealEls.length && !reducedMotion && 'IntersectionObserver' in window) {
    root.classList.add('reveal-ready');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* Formulaires ----------------------------------------------------------- */
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
    const fields = $$('input[required], select[required], textarea[required]', form);
    let firstInvalid = null;
    fields.forEach((field) => {
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

  $$('form[data-form]').forEach((form) => {
    const kind = form.dataset.form;
    const provider = form.dataset.provider;
    let attempted = false;

    // Revalidation au fil de la saisie, après une première tentative d'envoi.
    form.addEventListener('input', (e) => {
      if (attempted && e.target.matches('[required]')) showError(form, e.target, fieldError(e.target));
    });
    form.addEventListener('focusout', (e) => {
      if (attempted && e.target.matches('[required]')) showError(form, e.target, fieldError(e.target));
    });

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
        setStatus(
          form,
          `L’envoi en ligne n’est pas encore activé. Écrivez-nous directement${mail ? ` à ${mail}` : ''}.`,
          'error',
        );
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
  });

  // Sujet présélectionné depuis l'adresse : contact.html?sujet=liste-attente
  const subject = $('#c-sujet');
  if (subject) {
    const wanted = new URLSearchParams(window.location.search).get('sujet');
    if (wanted && $$('option', subject).some((o) => o.value === wanted)) subject.value = wanted;
  }

  /* Carte OpenStreetMap chargée à la demande ------------------------------ */
  $$('[data-map]').forEach((map) => {
    const button = $('[data-map-load]', map);
    button?.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = map.dataset.mapSrc;
      iframe.title = 'Carte de la localisation de l’association à Esbly';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer';
      map.prepend(iframe);
      button.remove();
    });
  });

  /* Consentement aux services tiers (inactif tant qu'aucun service n'est configuré) */
  const banner = $('[data-consent-banner]');
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

  if (banner) {
    const choice = readConsent();
    if (choice === 'accept') activateThirdParty();
    else if (choice !== 'refuse') banner.hidden = false;

    banner.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-consent]');
      if (!btn) return;
      writeConsent(btn.dataset.consent);
      banner.hidden = true;
      if (btn.dataset.consent === 'accept') activateThirdParty();
    });
  }

  $('[data-consent-reset]')?.addEventListener('click', () => {
    try { localStorage.removeItem(STORE); } catch { /* rien */ }
    if (banner) banner.hidden = false;
  });
})();
