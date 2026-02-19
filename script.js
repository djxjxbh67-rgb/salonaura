// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE MENU =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});
nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav__link');
const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
            if (link) link.classList.add('active');
        }
    });
}, { threshold: 0.3 });
sections.forEach(s => observerNav.observe(s));

// ===== TABS =====
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.services__panel');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
});

// ===== REVIEWS SLIDER =====
const track = document.getElementById('reviewsTrack');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');
let currentSlide = 0;
function getCardsVisible() { return window.innerWidth < 900 ? 1 : 2; }
function totalSlides() {
    return track.children.length - getCardsVisible();
}
function updateSlider() {
    const card = track.children[0];
    const gap = 24;
    const cardW = card.offsetWidth + gap;
    track.style.transform = `translateX(-${currentSlide * cardW}px)`;
}
prevBtn.addEventListener('click', () => { currentSlide = Math.max(0, currentSlide - 1); updateSlider(); });
nextBtn.addEventListener('click', () => { currentSlide = Math.min(totalSlides(), currentSlide + 1); updateSlider(); });
window.addEventListener('resize', updateSlider);

// ===== FORM =====
const form = document.getElementById('bookingForm');
const toast = document.getElementById('toast');
form.addEventListener('submit', e => {
    e.preventDefault();
    toast.classList.add('show');
    form.reset();
    setTimeout(() => toast.classList.remove('show'), 4000);
});

// ===== PHONE MASK =====
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 0 && v[0] === '8') v = '7' + v.slice(1);
    if (v.length > 11) v = v.slice(0, 11);
    let formatted = '';
    if (v.length > 0) formatted = '+7';
    if (v.length > 1) formatted += ' (' + v.slice(1, 4);
    if (v.length > 4) formatted += ') ' + v.slice(4, 7);
    if (v.length > 7) formatted += '-' + v.slice(7, 9);
    if (v.length > 9) formatted += '-' + v.slice(9, 11);
    e.target.value = formatted;
});

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    particlesContainer.appendChild(p);
}

// ===== SCROLL ANIMATIONS (DISABLED FOR DEBUGGING) =====
const animateEls = document.querySelectorAll('.animate-up, .about__card, .team__card, .contact-item, .gallery__item, .service-item');
animateEls.forEach(el => {
    el.classList.add('visible'); // Force visible immediately
    el.style.opacity = '1';
    el.style.transform = 'none';
});
/*
const observerAnim = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observerAnim.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
animateEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observerAnim.observe(el);
});
*/

// ===== DATE MIN =====
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);
