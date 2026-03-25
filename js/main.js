/* ===== main.js — Canada Mauritius Trade and Investment Venture ===== */

document.addEventListener('DOMContentLoaded', () => {
    /* ---------- Loading screen ---------- */
    const loader = document.getElementById('loading');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        });
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
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                menuToggle.classList.remove('open');
                if (overlay) overlay.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ---------- Stagger siblings in grids ---------- */
    const staggerContainers = document.querySelectorAll(
        '.news-grid, .focus-grid, .resource-grid, .services-grid, .members-wall, .leadership-grid, .timeline'
    );
    staggerContainers.forEach(container => {
        const children = container.querySelectorAll('.animate-on-scroll');
        children.forEach((child, i) => {
            child.classList.add('stagger-' + Math.min(i + 1, 9));
        });
    });

    /* ---------- Split layout directional animations ---------- */
    document.querySelectorAll('.split').forEach(split => {
        const isReverse = split.classList.contains('split--reverse');
        const children = split.children;
        if (children[0]) {
            const textAnimations = children[0].querySelectorAll('.animate-on-scroll');
            textAnimations.forEach(el => el.classList.add(isReverse ? 'from-right' : 'from-left'));
        }
        if (children[1] && children[1].classList.contains('animate-on-scroll')) {
            children[1].classList.add(isReverse ? 'from-left' : 'from-right');
        }
    });

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
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
        animatedEls.forEach(el => observer.observe(el));
    } else {
        animatedEls.forEach(el => el.classList.add('visible'));
    }

    /* ---------- Subtle parallax on hero background ---------- */
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    if (scrolled < window.innerHeight) {
                        heroBg.style.transform = 'translateY(' + (scrolled * 0.25) + 'px) scale(1.05)';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* ---------- Counter animation for stat numbers ---------- */
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.textContent.replace(/[^\d]/g, ''), 10);
                    const suffix = el.textContent.replace(/[\d]/g, '');
                    if (isNaN(target)) return;
                    let current = 0;
                    const step = Math.max(1, Math.floor(target / 50));
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) { current = target; clearInterval(timer); }
                        el.textContent = current + suffix;
                    }, 25);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(el => counterObserver.observe(el));
    }

    /* ---------- Section label red line animation ---------- */
    const labels = document.querySelectorAll('.section-label');
    if (labels.length && 'IntersectionObserver' in window) {
        const labelObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('line-visible');
                    labelObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        labels.forEach(el => labelObserver.observe(el));
    }

    /* ---------- Smooth scroll for anchor links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerH = header ? header.offsetHeight : 0;
                const y = target.getBoundingClientRect().top + window.pageYOffset - headerH - 20;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });
});
