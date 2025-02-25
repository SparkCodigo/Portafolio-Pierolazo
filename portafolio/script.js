document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('nav');
    const themeToggle = document.querySelector('#theme-toggle');
    const loader = document.querySelector('#loader');

    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 500);
    }, 1000);

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav ? nav.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            document.body.classList.toggle('light');
            localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
        });
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light');
            themeToggle.checked = true;
        } else {
            document.body.classList.remove('light');
            themeToggle.checked = false;
        }
    } else {
        console.error('El elemento #theme-toggle no se encontró en el DOM');
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));
});

function validateForm(event) {
    event.preventDefault();
}