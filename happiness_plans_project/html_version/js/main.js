
// Site enhancements: smooth scroll, mobile nav, active links, reveals, back-to-top, contact form
(function(){
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('primaryNav');
  const toggle = document.getElementById('menuToggle');
  const backToTop = document.getElementById('backToTop');

  const exploreBtn = document.getElementById('exploreBtn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      document.getElementById('services')?.scrollIntoView({behavior:'smooth'});
    });
  }

  // Mobile menu toggle
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close on link click (mobile)
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }));
  }

  // Reveal on scroll for elements with .reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // Active section highlighting
  if (nav) {
    const linkMap = new Map();
    nav.querySelectorAll('a').forEach(a => linkMap.set(a.getAttribute('href')?.replace('#',''), a));
    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.id;
          const link = linkMap.get(id);
          if (!link) return;
          if (entry.isIntersecting) {
            nav.querySelectorAll('a').forEach(x => x.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });
      ['home','services','about','contact'].forEach(id => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
      });
    }
  }

  // Header shadow + back to top visibility
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    header?.classList.toggle('scrolled', y > 10);
    backToTop?.classList.toggle('show', y > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Back to top click
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Brand logo fallback if custom image not found
  const brandLogo = document.getElementById('brandLogo');
  if (brandLogo) {
    const fallbackDataUrl =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23ffffff' stroke='%23f2c134' stroke-width='6'/%3E%3Ctext x='32' y='40' text-anchor='middle' font-size='26' font-weight='800' fill='%230b2147' font-family='Inter,Arial'%3EHP%3C/text%3E%3C/svg%3E";
    brandLogo.addEventListener('error', () => {
      if (brandLogo.getAttribute('data-fallback') === '1') return;
      brandLogo.src = fallbackDataUrl;
      brandLogo.setAttribute('data-fallback', '1');
    }, { once: true });
  }

  // Contact form handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = this.name.value;
      const formResult = document.getElementById('formResult');
      if (formResult) formResult.textContent = `Thanks, ${name}! We'll get back to you soon. (Demo form — not sent)`;
      this.reset();
    });
  }

  // Booking form mock handler
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e){
      e.preventDefault();
      const destination = this.destination.value;
      const startDate = this.startDate.value;
      const endDate = this.endDate.value;
      const guests = this.guests.value;
      const output = document.getElementById('bookingResult');
      if (output) {
        output.textContent = `Showing best deals to ${destination} for ${guests} traveler(s) from ${startDate} to ${endDate}.`;
      }
    });
  }
})();
