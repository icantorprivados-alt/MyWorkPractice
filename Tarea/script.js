/**
 * Instituto Nacional Albert Camus — script.js
 * Funcionalidades: Navbar, Hamburger, Form Validation, Scroll Animations, Footer year
 */

'use strict';

/* ════════════════════════════════════════════════════
   1. NAVBAR — Scroll effect & active link highlighting
════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('nav-links');
  const allLinks   = document.querySelectorAll('.nav-link[data-section]');

  // Scroll: add/remove .scrolled class
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveSection();
  }

  // Highlight nav link matching current section
  function highlightActiveSection() {
    const sections = ['inicio', 'nosotros', 'servicios', 'matricula', 'contacto'];
    let currentId  = '';
    const offset   = navbar.offsetHeight + 40;

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (window.scrollY >= el.offsetTop - offset) {
        currentId = id;
      }
    });

    allLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === currentId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // Hamburger toggle
  function toggleMenu(open) {
    hamburger.classList.toggle('active', open);
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    toggleMenu(!isOpen);
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close menu on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) toggleMenu(false);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });
})();


/* ════════════════════════════════════════════════════
   2. SCROLL REVEAL ANIMATIONS
════════════════════════════════════════════════════ */
(function initScrollReveal() {
  // Elements to animate
  const selectors = [
    '.nosotros-visual',
    '.nosotros-text',
    '.pillar',
    '.service-card',
    '.matricula-info',
    '.form-container',
    '.footer-brand',
    '.footer-col',
  ];

  // Collect elements
  const elements = [];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger siblings
      if (el.closest('.servicios-grid') || el.closest('.footer-grid') || el.closest('.nosotros-pillars')) {
        el.style.transitionDelay = `${i * 0.1}s`;
      }
      elements.push(el);
    });
  });

  // IntersectionObserver for performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  });

  elements.forEach(el => observer.observe(el));
})();


/* ════════════════════════════════════════════════════
   3. FORM VALIDATION — Matrícula 2027
════════════════════════════════════════════════════ */
(function initForm() {
  const form       = document.getElementById('matricula-form');
  const successBox = document.getElementById('form-success');
  const resetBtn   = document.getElementById('reset-form');
  const submitBtn  = document.getElementById('submit-btn');

  if (!form) return;

  // ── Validation rules ──────────────────────────
  const rules = {
    nombre: {
      validate: v => v.trim().length >= 2,
      message:  'Por favor ingresa tu nombre (mínimo 2 caracteres).',
    },
    apellido: {
      validate: v => v.trim().length >= 2,
      message:  'Por favor ingresa tu apellido (mínimo 2 caracteres).',
    },
    dui: {
      validate: v => /^\d{8}-\d$|^\d{9}$|^[A-Z0-9]{6,15}$/i.test(v.trim()),
      message:  'Ingresa un DUI o pasaporte válido.',
    },
    'fecha-nac': {
      validate: v => {
        if (!v) return false;
        const date    = new Date(v);
        const now     = new Date();
        const minDate = new Date();
        minDate.setFullYear(now.getFullYear() - 40);
        const maxDate = new Date();
        maxDate.setFullYear(now.getFullYear() - 12);
        return date >= minDate && date <= maxDate;
      },
      message: 'La fecha de nacimiento no es válida (12 – 40 años).',
    },
    bachillerato: {
      validate: v => ['general', 'software', 'contabilidad', 'salud'].includes(v),
      message:  'Selecciona un bachillerato.',
    },
    telefono: {
      validate: v => /^[\d\s\-\+]{7,15}$/.test(v.trim()),
      message:  'Ingresa un número de teléfono válido.',
    },
    correo: {
      validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
      message:  'Ingresa un correo electrónico válido.',
    },
    municipio: {
      validate: v => v.trim().length >= 2,
      message:  'Por favor ingresa tu municipio o ciudad.',
    },
    terminos: {
      validate: (_, el) => el && el.checked,
      message:  'Debes aceptar el tratamiento de datos para continuar.',
    },
  };

  // ── Helpers ────────────────────────────────────
  function getField(name) {
    return form.querySelector(`[name="${name}"]`);
  }
  function getError(name) {
    return document.getElementById(`${name}-error`);
  }

  function setError(name, message) {
    const field = getField(name);
    const error = getError(name);
    if (field) {
      field.classList.add('error');
      field.classList.remove('valid');
      field.setAttribute('aria-invalid', 'true');
    }
    if (error) error.textContent = message;
  }

  function setValid(name) {
    const field = getField(name);
    const error = getError(name);
    if (field) {
      field.classList.remove('error');
      field.classList.add('valid');
      field.removeAttribute('aria-invalid');
    }
    if (error) error.textContent = '';
  }

  function clearState(name) {
    const field = getField(name);
    const error = getError(name);
    if (field) {
      field.classList.remove('error', 'valid');
      field.removeAttribute('aria-invalid');
    }
    if (error) error.textContent = '';
  }

  function validateField(name) {
    const rule  = rules[name];
    const field = getField(name);
    if (!rule || !field) return true;

    const value = field.type === 'checkbox' ? field.value : field.value;
    const isOk  = rule.validate(value, field);

    if (isOk) { setValid(name); return true; }
    else       { setError(name, rule.message); return false; }
  }

  // ── Live validation on blur ────────────────────
  Object.keys(rules).forEach(name => {
    const field = getField(name);
    if (!field) return;

    const event = field.type === 'checkbox' ? 'change' : 'blur';
    field.addEventListener(event, () => validateField(name));

    // Clear error on focus
    field.addEventListener('focus', () => clearState(name));
  });

  // ── Simulate email sending ─────────────────────
  function simulateSendEmail(data) {
    return new Promise(resolve => {
      // Simulate async (replace with real fetch in production)
      setTimeout(() => {
        console.log('📧 Email simulado enviado a:', data.correo);
        console.log('📋 Datos del estudiante:', data);
        resolve({ ok: true });
      }, 2000);
    });
  }

  // ── Collect form data ──────────────────────────
  function collectData() {
    const data = {};
    Object.keys(rules).forEach(name => {
      const field = getField(name);
      if (!field) return;
      data[name] = field.type === 'checkbox' ? field.checked : field.value.trim();
    });
    return data;
  }

  // ── Submit ─────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let allValid = true;
    const fieldNames = Object.keys(rules);
    fieldNames.forEach(name => {
      if (!validateField(name)) allValid = false;
    });

    if (!allValid) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      const data = collectData();
      await simulateSendEmail(data);

      // Show success
      form.hidden = true;
      successBox.hidden = false;
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (err) {
      console.error('Error al enviar:', err);
      alert('Ocurrió un error al enviar el formulario. Por favor intenta de nuevo.');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });

  // ── Reset ──────────────────────────────────────
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      Object.keys(rules).forEach(name => clearState(name));
      form.hidden = false;
      successBox.hidden = true;
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();


/* ════════════════════════════════════════════════════
   4. FOOTER YEAR
════════════════════════════════════════════════════ */
(function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ════════════════════════════════════════════════════
   5. SMOOTH ANCHOR LINKS (offset for fixed navbar)
════════════════════════════════════════════════════ */
(function smoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      const navbar = document.getElementById('navbar');
      const offset = navbar ? navbar.offsetHeight : 70;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ════════════════════════════════════════════════════
   6. CARD HOVER — Tilt effect (subtle)
════════════════════════════════════════════════════ */
(function cardTilt() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const dx     = (x - cx) / cx;
      const dy     = (y - cy) / cy;
      const tiltX  = dy * -4; // max 4deg
      const tiltY  = dx *  4;

      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
