document.getElementById('year').textContent = new Date().getFullYear();

  // header scroll state
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // mobile menu
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  // typed role line
  const roles = ['Cyber Security Student', 'Software Engineer', 'AI-Augmented Developer'];
  const typedEl = document.getElementById('typedRole');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeLoop(){
    if(reduceMotion){ typedEl.textContent = roles[0]; return; }
    let ri = 0, ci = 0, deleting = false;
    function tick(){
      const word = roles[ri];
      if(!deleting){
        ci++;
        typedEl.textContent = word.slice(0, ci);
        if(ci === word.length){ deleting = true; setTimeout(tick, 1500); return; }
      } else {
        ci--;
        typedEl.textContent = word.slice(0, ci);
        if(ci === 0){ deleting = false; ri = (ri + 1) % roles.length; }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }
  typeLoop();

  // scroll reveal + skill bars
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        if(entry.target.classList.contains('skill')){
          const fill = entry.target.querySelector('.bar-fill');
          const level = entry.target.getAttribute('data-level');
          requestAnimationFrame(() => { fill.style.width = level + '%'; });
        }
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  revealEls.forEach(el => io.observe(el));

  // contact form -> mailto
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:fakhirhassan702@gmail.com?subject=${subject}&body=${body}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
    form.reset();
  });

  // download CV placeholder
  document.getElementById('downloadCvBtn').addEventListener('click', () => {
    window.open('My_cv.pdf', '_blank');
});
    