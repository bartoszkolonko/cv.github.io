// CV Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initializeAnimations();
    initializeSkillHovers();
    initializeContactLinks();
    initializePrintFunction();
});

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe job cards
    const jobs = document.querySelectorAll('.job');
    jobs.forEach((job, index) => {
        job.style.opacity = '0';
        job.style.transform = 'translateY(20px)';
        job.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(job);
    });
}

// Skill tag interactions
function initializeSkillHovers() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            const level = this.classList.contains('expert') ? 'Expert' :
                         this.classList.contains('advanced') ? 'Advanced' : 'Intermediate';
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.textContent = `${level} Level`;
            tooltip.style.cssText = `
                position: absolute;
                background: #2c3e50;
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 100);
            
            this.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
                setTimeout(() => document.body.removeChild(tooltip), 300);
            }, { once: true });
        });
    });
}

// Contact information interactions
function initializeContactLinks() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const text = item.querySelector('span').textContent;
        const icon = item.querySelector('i');
        
        // Make email clickable
        if (icon.classList.contains('fa-envelope')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                window.location.href = `mailto:${text}`;
            });
        }
        
        // Make phone clickable
        if (icon.classList.contains('fa-phone')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                window.location.href = `tel:${text.replace(/\s/g, '')}`;
            });
        }
        
        // Make LinkedIn clickable
        if (icon.classList.contains('fa-linkedin')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                window.open(`https://${text}`, '_blank');
            });
        }
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Print functionality
function initializePrintFunction() {
    // Add keyboard shortcut for printing
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });
    
    // Optimize for printing
    window.addEventListener('beforeprint', function() {
        // Ensure all animations are completed before printing
        const animatedElements = document.querySelectorAll('.section, .job');
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
}

// Progressive enhancement for older browsers
function checkBrowserSupport() {
    // Check for IntersectionObserver support
    if (!window.IntersectionObserver) {
        // Fallback: Show all content immediately
        const sections = document.querySelectorAll('.section, .job');
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }
}

// Smooth scrolling for anchor links (if any are added later)
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Performance optimization: Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any position-dependent elements if needed
    console.log('Window resized - CV layout adjusted');
}, 250));

// Initialize browser support check
checkBrowserSupport();