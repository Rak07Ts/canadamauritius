/* ===== main.js — Canada Mauritius Trade and Investment Venture ===== */

/* ---------- Shared News Data (single source of truth) ---------- */
const newsData = [
    {
        date: 'January 12–15, 2026',
        title: 'Exploratory Business Mission to Mauritius',
        excerpt: 'The Venture is leading an exploratory business mission from Canada to Mauritius to engage government representatives, private-sector stakeholders, investors and members of the Canadian diaspora in Mauritius.',
        image: 'images/exploratory_business_mission.jpg',
        imageAlt: 'Canadian delegation meeting stakeholders in Mauritius during the exploratory business mission',
        link: 'news.html'
    },
    {
        date: 'January 2026',
        title: 'Leadership Spotlight: Padminee Chundunsing',
        excerpt: 'Padminee Chundunsing, President and Founder, provides strategic direction for the Venture and serves as a bridge-builder across business, community and Francophone networks.',
        image: 'images/team-padminee.webp',
        imageAlt: 'Padminee Chundunsing — President and Founder of the Canada Mauritius Trade and Investment Venture',
        link: 'news.html'
    },
    {
        date: 'December 2025',
        title: 'Strengthening the Canada-Mauritius Business Corridor',
        excerpt: 'The Venture continues its work to build structured and visible pathways for trade, investment and knowledge exchange between Canada and Mauritius.',
        image: 'images/business_event.jpg',
        imageAlt: 'Business event showcasing Canada-Mauritius trade and investment activities',
        link: 'news.html'
    },
    {
        date: 'November 2025',
        title: 'Mauritius as a Gateway to Africa',
        excerpt: 'Mauritius offers Canadian businesses a strategic entry point into Africa and the Indian Ocean region — with a stable investment climate, strong legal frameworks and global connectivity.',
        image: 'images/business_leader_meeting.jpg',
        imageAlt: 'Business leaders discussing Mauritius as a gateway to Africa',
        link: 'news.html'
    }
];

/* ---------- Render News Cards ---------- */
function renderNewsCards(containerId, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const items = limit ? newsData.slice(0, limit) : newsData;
    container.innerHTML = items.map(item => `
        <a href="${item.link}" class="news-card animate-on-scroll" style="text-decoration:none;color:inherit;">
            <div class="news-card-image">
                <img src="${item.image}" alt="${item.imageAlt}">
            </div>
            <div class="news-card-body">
                <p class="news-card-date">${item.date}</p>
                <h3>${item.title}</h3>
                <p>${item.excerpt}</p>
                <span class="read-more">Read more</span>
            </div>
        </a>
    `).join('');
    /* Re-observe newly rendered cards for scroll animations */
    if (window._scrollObserver) {
        container.querySelectorAll('.animate-on-scroll').forEach(el => window._scrollObserver.observe(el));
    }
}

window.addEventListener('load', () => {
    renderNewsCards('home-news-grid', 3);
    renderNewsCards('news-page-grid');
});

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
        window._scrollObserver = observer; /* expose for renderNewsCards */
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
