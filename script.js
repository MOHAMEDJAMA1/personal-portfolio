
// Initialize immediately (loaded as module)
const initUpdates = () => {

    // --- STAR ANIMATION ---
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas-container';
    if (document.body) {
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = [];

    const initStars = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        stars = [];
        const numStars = 100;
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5,
                vx: Math.random() * 0.5 - 0.25,
                vy: Math.random() * 0.5 - 0.25
            });
        }
    };

    const drawStars = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#FFF';
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            star.x += star.vx;
            star.y += star.vy;
            if (star.x < 0 || star.x > width) star.vx = -star.vx;
            if (star.y < 0 || star.y > height) star.vy = -star.vy;
        });
        requestAnimationFrame(drawStars);
    };

    window.addEventListener('resize', initStars);
    initStars();
    drawStars();

    // --- TILT EFFECT ---
    const tiltElements = document.querySelectorAll('.skill-card, .project-card, .resume-button');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --- SCROLL ANIMATIONS ---
    // --- SCROLL ANIMATIONS (Existing General) ---
    const observerOptions = { threshold: 0.05 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.hero-left-container, .hero-right-container, .title, .desc, .skill-card, .project-card, .contact-form-container, .about-card');
    animateElements.forEach((el) => {
        el.classList.add('fade-up-element');
        observer.observe(el);
    });

    // --- STAGGERED ANIMATIONS (Experience & Education) ---
    const staggeringOptions = {
        threshold: 0.2
    };

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, staggeringOptions);

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((el) => {
        staggerObserver.observe(el);
    });

    // Safety fallback
    setTimeout(() => {
        document.querySelectorAll('.fade-up-element').forEach(el => {
            if (getComputedStyle(el).opacity === '0') {
                el.classList.add('visible');
            }
        });
    }, 1000);

    // --- MOBILE MENU ---
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuIcon && mobileMenu) {
        mobileMenuIcon.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !mobileMenuIcon.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });

    // --- TYPEWRITER ---
    const textElement = document.querySelector('.span-text');
    const roles = ["Full-Stack Developer", "SaaS Builder", "Software Engineer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            textElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }

    if (textElement) type();

    // --- CONTACT FORM (WHATSAPP) ---
    const sendBtn = document.getElementById('send-btn');
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (!name || !message) {
                alert('Please enter your name and message!');
                return;
            }

            const formattedMessage = `Name: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`;
            const whatsappUrl = `https://wa.me/905525612574?text=${formattedMessage}`;

            window.open(whatsappUrl, '_blank');
        });
    }

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

};

// Execute
initUpdates();
