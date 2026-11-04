// header scroll state
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });

  // mobile menu
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  // skill dots
  document.querySelectorAll('.dots').forEach(el => {
    const level = parseInt(el.dataset.level, 10);
    for (let i = 1; i <= 5; i++) {
      const s = document.createElement('span');
      if (i <= level) s.classList.add('on');
      el.appendChild(s);
    }
  });

  // work filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      workCards.forEach(card => {
        card.classList.toggle('hidden', f !== 'all' && card.dataset.cat !== f);
      });
    });
  });

  // animated counters
  const counters = document.querySelectorAll('[data-count]');
  let countersStarted = false;
  const startCounters = () => {
    if (countersStarted) return;
    countersStarted = true;
    counters.forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      let cur = 0;
      const step = Math.max(1, Math.round(target / 40));
      const tick = () => {
        cur = Math.min(target, cur + step);
        el.textContent = cur;
        if (cur < target) requestAnimationFrame(tick);
      };
      tick();
    });
  };
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) startCounters(); });
  }, { threshold: .4 });
  heroObserver.observe(document.querySelector('.hero-stats'));

  // nav active state on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));


  // subtle parallax on hero shape
  const heroVisual = document.getElementById('heroVisual');
  window.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 900) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;
    heroVisual.style.transform = `translate(${x}px, ${y}px)`;
  });

  const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'light' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  const newTheme = isLight ? 'dark' : 'light';
  root.setAttribute('data-theme', newTheme);
  themeToggle.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('theme', newTheme);
});

// avatar photo carousel
const avatarSlides = document.querySelectorAll('.avatar-slide');
let avatarIndex = 0;
if (avatarSlides.length > 1) {
  setInterval(() => {
    avatarSlides[avatarIndex].classList.remove('active');
    avatarIndex = (avatarIndex + 1) % avatarSlides.length;
    avatarSlides[avatarIndex].classList.add('active');
  }, 3500);
}

// scroll progress bar
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';
});

// back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// reveal on scroll
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: .15 });

document.querySelectorAll('section:not(.hero) .wrap').forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

// efek mengetik
const roles = ['Laravel Developer', 'Flutter Developer', 'UI Designer', 'Database Administrator', 'Machine Learning', 'Data Scientist', 'Software Engineer'];
const typedEl = document.getElementById('typed');
if (typedEl) {
  let r = 0, c = 0, del = false;
  (function type() {
    const word = roles[r];
    typedEl.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(type, 1400); }
    if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
    c += del ? -1 : 1;
    setTimeout(type, del ? 40 : 90);
  })();
}

// klik kartu karya -> halaman detail proyek
document.querySelectorAll('.work-card[data-href]').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return; // link "Baca jurnal" tetap jalan sendiri
    location.href = card.dataset.href;
  });
});

// animasi perjalanan belajar saat terlihat di layar
const journey = document.querySelector('.journey');
if (journey && 'IntersectionObserver' in window) {
  journey.classList.add('anim');
  const journeyObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .4 });
  journeyObs.observe(journey);
}

// buka link lewat tombol, tanpa menampilkan URL di bilah status browser
document.querySelectorAll('[data-go]').forEach(el => {
  el.addEventListener('click', () => {
    window.open(el.dataset.go, '_blank', 'noopener');
  });
});