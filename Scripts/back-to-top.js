function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Smooth scroll to top
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', initBackToTop);
