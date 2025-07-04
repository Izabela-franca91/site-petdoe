document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const nav = document.querySelector('nav');

    // Toggle do menu hamburguer
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Fechar menu ao clicar em um link (para UX mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                }
            });
        });
    }

    // Mudar a navbar ao rolar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Adicionar animações com ScrollReveal
    // Certifique-se de que a biblioteca ScrollReveal esteja carregada antes deste script
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.intro__section .header__content', {
            origin: 'left',
            distance: '50px',
            duration: 1000,
            delay: 200,
            easing: 'ease-in-out',
            interval: 100
        });
        ScrollReveal().reveal('.intro__image', {
            origin: 'right',
            distance: '50px',
            duration: 1000,
            delay: 400,
            easing: 'ease-in-out'
        });
        ScrollReveal().reveal('.campaign__section h2, .campaign__section p, .campaign__section .btn', {
            interval: 150,
            origin: 'bottom',
            distance: '30px',
            duration: 800,
            easing: 'ease-in-out'
        });
        ScrollReveal().reveal('.services__card', {
            interval: 100,
            origin: 'bottom',
            distance: '30px',
            duration: 800,
            easing: 'ease-in-out'
        });
        ScrollReveal().reveal('.testimonial__card', {
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            easing: 'ease-in-out'
        });
        /* As linhas abaixo foram removidas (ou você as quer comentar)
        ScrollReveal().reveal('.final-cta__section h2, .final-cta__section p, .final-cta__buttons .btn', {
            interval: 100,
            origin: 'bottom',
            distance: '30px',
            duration: 800,
            easing: 'ease-in-out'
        });
        */ // <--- Agora este '*/' está fechando o '/*' acima.
    } else {
        console.warn('ScrollReveal library not loaded. Animations will not work.');
    }
});