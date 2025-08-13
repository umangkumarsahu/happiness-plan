(function(){
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('primaryNav');
  const toggle = document.getElementById('menuToggle');
  const backToTop = document.getElementById('backToTop');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }));
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          o.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  if (nav) {
    const map = new Map();
    nav.querySelectorAll('a').forEach(a => map.set(a.getAttribute('href')?.replace('#',''), a));
    if ('IntersectionObserver' in window) {
      const so = new IntersectionObserver((entries) => {
        entries.forEach(ent => {
          const id = ent.target.id;
          const link = map.get(id);
          if (!link) return;
          if (ent.isIntersecting) {
            nav.querySelectorAll('a').forEach(x => x.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });
      ['home','packages','destinations','about','contact'].forEach(id => {
        const el = document.getElementById(id);
        if (el) so.observe(el);
      });
    }
  }

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    header?.classList.toggle('scrolled', y > 10);
    backToTop?.classList.toggle('show', y > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = this.name.value;
      const out = document.getElementById('formResult');
      if (out) out.textContent = `Thanks, ${name}! We'll get back to you soon.`;
      this.reset();
    });
  }

  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e){
      e.preventDefault();
      const q = this.q.value;
      const out = document.getElementById('searchResult');
      if (out) out.textContent = `Showing top picks for ${q}…`;
    });
  }
})();


