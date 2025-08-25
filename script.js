// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const navMenuLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

// Mobile navigation toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Add animation class to cards when they come into view
const observeElements = document.querySelectorAll('.benefit-card, .tool-card, .resource-item');
const options = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, options);

// Initialize observers
observeElements.forEach(element => {
    observer.observe(element);
});

// Update active navigation link based on scroll position
function updateActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navMenuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Animate statistics numbers
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50; // Adjust speed of counting
        
        function updateCount() {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current).toLocaleString() + '+';
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target.toLocaleString() + '+';
            }
        }
        
        updateCount();
    });
}

// Initialize all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const floatingItems = document.querySelectorAll('.floating-item');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const counterElements = document.querySelectorAll('.counter');

    // Mobile Navigation Functions
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Event Listeners for Mobile Navigation
    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !e.target.closest('.nav') && 
            !e.target.closest('.hamburger')) {
            closeMenu();
        }
    });

    // Handle resize events
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Parallax Effect for Floating Items
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-speed')) || 1;
            const x = (mouseX - 0.5) * 20 * speed;
            const y = (mouseY - 0.5) * 20 * speed;
            item.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    // Card Animation Observer
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.benefit-card, .tool-card, .resource-item, .feature-item')
        .forEach(element => cardObserver.observe(element));

    // Counter Animation Function
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function updateCount() {
            if (current < target) {
                current = Math.min(current + step, target);
                element.textContent = Math.ceil(current).toLocaleString() + '+';
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target.toLocaleString() + '+';
            }
        }

        updateCount();
    }

    // Counter Observer
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe counter elements
    counterElements.forEach(counter => counterObserver.observe(counter));

    // Update active navigation link based on scroll position
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Event listener for scroll
    window.addEventListener('scroll', updateActiveLink);

    // Initialize active link on page load
    updateActiveLink();
});
