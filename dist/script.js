(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touchMotion = window.matchMedia('(pointer: coarse)').matches && !reducedMotion;

  document.documentElement.classList.toggle('touch-motion', touchMotion);

  const closeNav = () => {
    document.body.classList.remove('nav-open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.querySelector('.sr-only')?.replaceChildren('Menü öffnen');
  };

  toggle?.addEventListener('click', () => {
    const open = !document.body.classList.contains('nav-open');
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only')?.replaceChildren(open ? 'Menü schließen' : 'Menü öffnen');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNav(); });

  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  document.querySelectorAll('.format-list, .medal-grid, .media-items, .accordions').forEach(group => {
    [...group.children].forEach((item, index) => {
      if (!item.matches('.reveal, .image-reveal')) return;
      item.classList.add('motion-step');
      item.style.setProperty('--reveal-order', String(Math.min(index, 5)));
    });
  });

  const motionSections = [...document.querySelectorAll('.intro, .formats, .achievements, .media, .fit, .faq, .impact-break, .contact')];
  motionSections.forEach(section => section.classList.add('motion-section'));

  const reveals = [...new Set(document.querySelectorAll('.reveal, .image-reveal'))];
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(item => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -5% 0px' });
    reveals.forEach(item => revealObserver.observe(item));
  }

  if (reducedMotion || !('IntersectionObserver' in window)) {
    motionSections.forEach(section => section.classList.add('is-scene-active'));
  } else {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-scene-active');
        sectionObserver.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -12% 0px' });
    motionSections.forEach(section => sectionObserver.observe(section));
  }

  const countElements = [...document.querySelectorAll('[data-count]')];
  const formatCount = (element, value) => {
    const decimals = Number.parseInt(element.dataset.countDecimals || '0', 10);
    const suffix = element.dataset.countSuffix || '';
    return `${new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value)}${suffix}`;
  };

  const finishCount = element => {
    const target = Number.parseFloat(element.dataset.count || '0');
    element.textContent = formatCount(element, target);
    element.classList.remove('is-counting');
    element.classList.add('is-counted');
  };

  const animateCount = element => {
    if (element.classList.contains('is-counted')) return;
    const target = Number.parseFloat(element.dataset.count || '0');
    const duration = reducedMotion ? 480 : Number.parseInt(element.dataset.countDuration || '1300', 10);
    const delay = reducedMotion ? 0 : Number.parseInt(element.dataset.countDelay || '0', 10);
    const startAnimation = () => {
      const startedAt = performance.now();
      element.classList.add('is-counting');
      const tick = now => {
        const progress = clamp((now - startedAt) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        element.textContent = formatCount(element, target * eased);
        if (progress < 1) {
          window.requestAnimationFrame(tick);
        } else {
          finishCount(element);
        }
      };
      window.requestAnimationFrame(tick);
    };
    if (delay > 0) window.setTimeout(startAnimation, delay);
    else startAnimation();
  };

  countElements.forEach(element => {
    const target = Number.parseFloat(element.dataset.count || '0');
    element.setAttribute('aria-label', formatCount(element, target));
  });

  if (!('IntersectionObserver' in window)) {
    countElements.forEach(finishCount);
  } else {
    countElements.forEach(element => { element.textContent = formatCount(element, 0); });
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: .38, rootMargin: '0px 0px -6% 0px' });
    countElements.forEach(element => countObserver.observe(element));
  }

  const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
  const scrollScenes = [...document.querySelectorAll('[data-scroll-scene]')];
  const orbitScenes = [...document.querySelectorAll('[data-parallax-root], .atlanta')];
  let motionFrame = 0;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const updateScrollMotion = () => {
    motionFrame = 0;
    const viewport = window.innerHeight;
    const scrollRange = Math.max(1, document.documentElement.scrollHeight - viewport);
    document.documentElement.style.setProperty('--scroll-progress', String(clamp(window.scrollY / scrollRange, 0, 1)));

    if (!reducedMotion) {
      reveals.forEach(item => {
        if (item.classList.contains('is-visible')) return;
        const rect = item.getBoundingClientRect();
        if (rect.top < viewport * .94 && rect.bottom > viewport * .06) item.classList.add('is-visible');
      });
    }

    if (!reducedMotion) {
      parallaxItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.bottom < -viewport * .2 || rect.top > viewport * 1.2) return;
        const authoredStrength = Number.parseFloat(item.dataset.parallax || '0');
        const strength = window.innerWidth <= 760 ? Math.min(authoredStrength, .035) : authoredStrength;
        const limit = window.innerWidth <= 760 ? 28 : 82;
        const centerDelta = rect.top + rect.height / 2 - viewport / 2;
        item.style.setProperty('--parallax-y', `${clamp(-centerDelta * strength, -limit, limit).toFixed(1)}px`);
      });
    }

    if (!reducedMotion) {
      scrollScenes.forEach(scene => {
        const rect = scene.getBoundingClientRect();
        const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1);
        const arc = Math.sin(progress * Math.PI);
        scene.style.setProperty('--line-offset', String(1 - progress));
        scene.style.setProperty('--disc-x', `${(4 + progress * 91).toFixed(2)}%`);
        scene.style.setProperty('--disc-y', `${(82 - progress * 58 - arc * 18).toFixed(2)}%`);
        scene.style.setProperty('--disc-rotation', `${Math.round(progress * 980)}deg`);
      });

      orbitScenes.forEach(scene => {
        const rect = scene.getBoundingClientRect();
        const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1);
        scene.style.setProperty('--orbit-rotation', `${Math.round(progress * 120)}deg`);
      });

      motionSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < -viewport * .2 || rect.top > viewport * 1.2) return;
        const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1);
        section.style.setProperty('--section-progress', progress.toFixed(3));
        section.style.setProperty('--section-drift', `${((progress - .5) * 16).toFixed(1)}px`);
      });
    }
  };

  const requestScrollMotion = () => {
    if (!motionFrame) motionFrame = window.requestAnimationFrame(updateScrollMotion);
  };
  updateScrollMotion();
  window.addEventListener('scroll', requestScrollMotion, { passive: true });
  window.addEventListener('resize', requestScrollMotion, { passive: true });

  const formatSelect = document.querySelector('#format-select');
  document.querySelectorAll('[data-format]').forEach(link => {
    link.addEventListener('click', () => {
      if (formatSelect) formatSelect.value = link.dataset.format;
    });
  });

  document.querySelector('#inquiry-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Anfrage Lars Riedel – ${form.get('format')}`;
    const lines = [
      'Guten Tag,',
      '',
      'ich interessiere mich für einen Auftritt von Lars Riedel.',
      '',
      `Name: ${form.get('name') || ''}`,
      `Unternehmen: ${form.get('company') || ''}`,
      `E-Mail: ${form.get('email') || ''}`,
      `Format: ${form.get('format') || ''}`,
      `Wunschtermin: ${form.get('date') || 'noch offen'}`,
      '',
      'Details:',
      `${form.get('message') || ''}`,
      '',
      'Freundliche Grüße'
    ];
    window.location.href = `mailto:info@sport-speaker.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  });

  document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));
})();
