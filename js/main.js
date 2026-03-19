// ============================================
// CANADA-MAURITIUS BUSINESS COUNCIL
// Main JavaScript File
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // LOADING SCREEN
    // ============================================
    const loading = document.getElementById('loading');
    if (loading) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 500);
        });
    }
    
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('nav');
    const navOverlay = document.getElementById('navOverlay');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Fermer menu au clic sur l'overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Fermer menu au clic sur un lien
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                if (navOverlay) {
                    navOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            });
        });
    }
    
    // ============================================
    // ANIMATE ON SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate numbers in stats
                const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
                statNumbers.forEach(num => {
                    const target = parseInt(num.getAttribute('data-target'));
                    if (!num.classList.contains('animated')) {
                        num.classList.add('animated');
                        animateNumber(num, target);
                    }
                });
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    function animateNumber(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }
    
    // ============================================
    // FILTERS (Members page)
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
});