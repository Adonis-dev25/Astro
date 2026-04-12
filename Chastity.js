class ChasityComponent {
    constructor() {
        this.setupEventListeners();
        this.animateCards();
    }

    setupEventListeners() {
        const buttons = document.querySelectorAll('.toggle-button');
        buttons.forEach(button => {
            button.addEventListener('click', this.handleButtonClick.bind(this));
        });
    }

    handleButtonClick(event) {
        const target = event.currentTarget;
        this.toggleActiveState(target);
        this.updateDynamicContent(target);
    }

    toggleActiveState(button) {
        button.classList.toggle('active');
    }

    updateDynamicContent(button) {
        const contentArea = document.querySelector('.content-area');
        contentArea.textContent = `You clicked: ${button.textContent}`;
    }

    animateCards() {
        const cards = document.querySelectorAll('.card');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fadeInUp');
                }
            });
        });

        cards.forEach(card => {
            observer.observe(card);
        });
    }
}

// CSS Keyframes for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        0% {
            transform: translate3d(0, 20px, 0);
            opacity: 0;
        }
        100% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }

    @keyframes slideIn {
        0% {
            transform: translateX(-100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .fadeInUp {
        animation: fadeInUp 0.5s forwards;
    }
`;
document.head.appendChild(style);

// Initialize ChasityComponent
document.addEventListener('DOMContentLoaded', () => {
    new ChasityComponent();
});