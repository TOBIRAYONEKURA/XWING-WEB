(() => {
  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
  const pageMeta = {
    index: ['TOP', 'XWING'],
    service: ['SERVICES', '事業内容 / WHAT WE DO'],
    about: ['ABOUT', '会社概要 / WHO WE ARE'],
    works: ['WORKS', '実績紹介 / SELECTED WORKS'],
    access: ['ACCESS', 'アクセス / FIND US'],
    hr: ['CAREERS', '求人情報 / JOIN THE TEAM'],
    privacy: ['PRIVACY', '個人情報保護方針 / POLICY']
  };
  document.body.dataset.page = page;
  const hero = document.querySelector('#banner-top');
  if (hero) {
    hero.dataset.page = pageMeta[page]?.[0] || 'XWING';
    const heading = hero.querySelector('h1');
    if (heading) heading.dataset.kicker = pageMeta[page]?.[1] || '';
  }

  const header = document.querySelector('#header');
  const nav = document.querySelector('#nav');
  if (header && nav) {
    const button = document.createElement('button');
    button.className = 'menu-toggle';
    button.type = 'button';
    button.setAttribute('aria-label', 'メニューを開く');
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<span></span>';
    header.appendChild(button);
    const closeMenu = () => {
      nav.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'メニューを開く');
    };
    button.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    addEventListener('resize', () => { if (innerWidth > 960) closeMenu(); });
    addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 24), { passive: true });
  }

  const targets = document.querySelectorAll('#main h1, #main h2, #main .row > div, #cta h1');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((target, index) => {
      target.classList.add('reveal');
      target.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
      observer.observe(target);
    });
  } else {
    targets.forEach((target) => target.classList.add('is-visible'));
  }
})();
