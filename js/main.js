/* ===== main.js — Canada Mauritius Trade and Investment Venture ===== */

document.addEventListener('DOMContentLoaded', () => {
    /* ---------- Loading screen ---------- */
    const loader = document.getElementById('loading');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        });
        // Fallback: hide after 3 seconds even if load event doesn't fire
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }, 3000);
    }

    /* ---------- Header scroll ---------- */
    const header = document.getElementById('header');
    if (header) {
        const onScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 60);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- Mobile menu ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('navOverlay');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            menuToggle.classList.toggle('open', isOpen);
            if (overlay) overlay.classList.toggle('open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        if (overlay) {
            overlay.addEventListener('click', () => {
                nav.classList.remove('open');
                menuToggle.classList.remove('open');
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            });
        }
        // Close on link click (mobile)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                menuToggle.classList.remove('open');
                if (overlay) overlay.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ---------- Animate on scroll (IntersectionObserver) ---------- */
    const animatedEls = document.querySelectorAll('.animate-on-scroll');
    if (animatedEls.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        animatedEls.forEach(el => observer.observe(el));
    } else {
        // Fallback: make everything visible
        animatedEls.forEach(el => el.classList.add('visible'));
    }

    /* ---------- Smooth scroll for anchor links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
