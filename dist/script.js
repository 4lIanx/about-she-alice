const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');

if (menuToggle && mobileNav) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileNav.inert = true;
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.classList.toggle('is-open', !isOpen);
    mobileNav.setAttribute('aria-hidden', String(isOpen));
    mobileNav.inert = isOpen;
  });

  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
}

const filterTabs = document.querySelectorAll('[data-filter]');
const serviceCards = document.querySelectorAll('[data-category]');

filterTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;

    filterTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    serviceCards.forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const whatsappNumber = '554299719385';

document.querySelectorAll('.whatsapp-link').forEach((link) => {
  const service = link.dataset.waService;
  const message = link.dataset.waMessage || (service
    ? `Olá, Milleo Designer! Tenho interesse em ${service} e gostaria de agendar um horário. Pode me passar as opções de dia e horário?`
    : 'Olá, Milleo Designer! Gostaria de agendar um horário. Pode me passar as opções de dia e horário?');

  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
});

const lightbox = document.querySelector('#image-lightbox');
const lightboxImage = lightbox?.querySelector('[data-lightbox-image]');
const lightboxCaption = lightbox?.querySelector('[data-lightbox-caption]');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
let lastImageTrigger;

document.querySelectorAll('.image-viewer').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    if (!lightbox || !lightboxImage || typeof lightbox.showModal !== 'function') return;
    event.preventDefault();
    lastImageTrigger = trigger;
    const sourceImage = trigger.querySelector('img');
    lightboxImage.src = trigger.href;
    lightboxImage.alt = sourceImage?.alt || trigger.getAttribute('aria-label') || '';
    lightboxCaption.textContent = trigger.dataset.imageCaption || lightboxImage.alt;
    lightbox.showModal();
    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener('click', () => lightbox?.close());

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

lightbox?.addEventListener('close', () => {
  lastImageTrigger?.focus({ preventScroll: true });
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
