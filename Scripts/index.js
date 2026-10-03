const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

document.addEventListener('click', (e) => {
    if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (!backToTopButton) return;
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
const revealSections = () => {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - 150) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        if (this.dataset.failed) return;
        this.dataset.failed = '1';
        this.src = '/api/placeholder/' + (this.width || 800) + '/' + (this.height || 450);
        this.alt = 'Image placeholder';
    });
});