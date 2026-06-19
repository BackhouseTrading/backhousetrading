/* ============================================================
   BACKHOUSE TRADING — Main JS
   ============================================================ */

(function () {
  'use strict';

  /* ---- Safari detection (iOS Chrome has CriOS in UA; Safari does not) ---- */
  if (/^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)) {
    document.documentElement.classList.add('is-safari');
  }

  /* ---- Navigation scroll behavior ---- */
  const nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('nav--scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav drawer ---- */
  const hamburger = document.querySelector('.nav__hamburger');
  const drawer = document.querySelector('.nav__drawer');
  const drawerLinks = drawer ? drawer.querySelectorAll('a') : [];

  function closeDrawer() {
    hamburger?.classList.remove('open');
    drawer?.classList.remove('open');
    document.body.style.overflow = '';
  }
  function toggleDrawer() {
    const isOpen = hamburger?.classList.toggle('open');
    drawer?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger?.addEventListener('click', toggleDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  /* ---- Active nav link ---- */
  function setActiveLink() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav__links a, .nav__drawer a').forEach(a => {
      a.classList.remove('active');
      const href = a.getAttribute('href') || '';
      const isHome = (href === 'index.html' || href === '/' || href === './') &&
                     (path === '/' || path.endsWith('/index.html') || path === '');
      const isMatch = !isHome && href !== '' && path.includes(href.replace('.html', ''));
      if (isHome || isMatch) a.classList.add('active');
    });
  }
  setActiveLink();

  /* ---- Scroll animations (IntersectionObserver) ---- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---- Number counter animation ---- */
  function animateCounter(el) {
    const end       = parseFloat(el.dataset.to);
    const prefix    = el.dataset.prefix  || '';
    const suffix    = el.dataset.suffix  || '';
    const decimals  = parseInt(el.dataset.decimals || '0', 10);
    const duration  = 1400;
    const startTime = performance.now();

    function tick(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      el.textContent = prefix + (end * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll('[data-to]');
  if ('IntersectionObserver' in window && counters.length) {
    const counterObs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(el => counterObs.observe(el));
  } else {
    counters.forEach(el => {
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      el.textContent = prefix + parseFloat(el.dataset.to).toFixed(decimals) + suffix;
    });
  }

  /* ---- Annual returns bar chart ---- */
  function buildBarChart() {
    const chart = document.getElementById('annual-chart');
    if (!chart) return;

    const data = [
      { year: '2019', val: 30.58 },
      { year: '2020', val: 38.70 },
      { year: '2021', val:  9.02 },
      { year: '2022', val:  3.07 },
      { year: '2023', val: 13.84 },
      { year: '2024', val: 27.66 },
      { year: '2025', val: 14.19 },
      { year: '2026*', val:  5.60 },
    ];

    const maxAbs = Math.max(...data.map(d => Math.abs(d.val)));
    const baseline = 180; // px total height available per bar group

    chart.innerHTML = '';
    data.forEach((d, i) => {
      const heightPx = Math.round((Math.abs(d.val) / maxAbs) * baseline * 0.92);
      const isPos = d.val >= 0;
      const delay = i * 60;

      const item = document.createElement('div');
      item.className = 'bar-chart__item';
      item.innerHTML = `
        <div class="bar-chart__bar bar-chart__bar--${isPos ? 'pos' : 'neg'}"
             style="height: 0; transition: height 0.6s ease ${delay}ms;"
             title="${d.year}: ${isPos ? '+' : ''}${d.val}%">
          <span class="bar-chart__tooltip">${isPos ? '+' : ''}${d.val}%</span>
        </div>
        <span class="bar-chart__year">${d.year}</span>
      `;
      chart.appendChild(item);

      // animate in
      requestAnimationFrame(() => {
        setTimeout(() => {
          item.querySelector('.bar-chart__bar').style.height = heightPx + 'px';
        }, delay + 100);
      });
    });
  }

  if ('IntersectionObserver' in window) {
    const chartEl = document.getElementById('annual-chart');
    if (chartEl) {
      const chartObs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          buildBarChart();
          chartObs.unobserve(chartEl);
        }
      }, { threshold: 0.3 });
      chartObs.observe(chartEl);
    }
  } else {
    buildBarChart();
  }

  /* ---- Contact form (Formspree) ---- */
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        form.innerHTML =
          '<div class="form__success">Thank you for your inquiry. A member of the Backhouse Trading team will be in touch soon.</div>';
      } else {
        throw new Error('failed');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = origText;
      alert('Message could not be sent. Please email us directly at eric@backhousetrading.com.');
    }
  });

})();
