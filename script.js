// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll - Fixed to maintain dark theme
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.style.background = 'rgba(7, 1, 50, 0.95)'; // or similar dark color
    } else {
        navbar.style.background = 'linear-gradient(90deg, #010c3e 0%, #020646 100%)';
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.stat-item, .skill-category, .timeline-item, .education-card, .project-card');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('reveal', 'active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Contact Form Handling
function handleContactForm(e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission
    const submitButton = e.target.querySelector('.btn-primary');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Send email using EmailJS
    emailjs.init("s6wUbDwRNJAwN7vWn");

    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: "Dayakar Vallepu"
    };

    emailjs.send('service_1m1kjis', 'template_1n5jvnb', templateParams)
        .then(function (response) {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            e.target.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, function (error) {
            showNotification('Failed to send message. Please try again.', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill Tags Hover Effect
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1) rotateZ(2deg)';
    });

    tag.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) rotateZ(0deg)';
    });
});

// Project Card Tilt Effect - More Subtle
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Reduced rotation values for more subtle effect
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// Statistics Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };

        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter.parentElement);
    });
}

// Initialize counter animation
animateCounters();

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;

    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Theme Toggle (Optional - for future enhancement)
function initThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements for initial animation
    document.querySelectorAll('.hero-content > *').forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('fade-in');
    });

    // Initialize theme toggle
    initThemeToggle();

    // Add loading class to body
    document.body.classList.add('loaded');
});

// Performance optimization - Debounce scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-intensive functions
window.addEventListener('scroll', debounce(() => {
    revealOnScroll();
}));

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        // Add any image URLs you want to preload
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();