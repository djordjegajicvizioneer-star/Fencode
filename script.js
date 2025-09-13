// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Active link highlighting
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(1, 17, 51, 0.98)';
    } else {
        navbar.style.background = 'rgba(1, 17, 51, 0.95)';
    }
});

// Simplified animations for better performance
document.addEventListener('DOMContentLoaded', () => {
    // Remove heavy scroll animations - just show elements immediately
    const animateElements = document.querySelectorAll('.service-card, .project-card, .about-content, .value-content, .contact-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'none'; // Remove transitions for better performance
    });
    
    // Simplified stats animation
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        // Just show the final number immediately
        const target = parseInt(stat.textContent);
        stat.textContent = target + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
    });
});

// Counter animation for stats
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Removed parallax effect for better performance

// Initialize Calendly widget
function initializeCalendly() {
    const widget = document.querySelector('.calendly-inline-widget');
    const loadingElement = document.querySelector('.calendly-loading');
    
    if (!widget) return;
    
    // Check if Calendly is loaded
    if (typeof Calendly !== 'undefined') {
        try {
            // Hide loading state
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            // Clear any existing content
            widget.innerHTML = '';
            
            // Initialize the widget with proper error handling
            Calendly.initInlineWidget({
                url: 'https://calendly.com/vizioneer/30min?hide_event_type_details=1&hide_gdpr_banner=1',
                parentElement: widget,
                prefill: {},
                utm: {}
            });
            
            console.log('Calendly widget initialized successfully');
        } catch (error) {
            console.error('Calendly initialization error:', error);
            showCalendlyError();
        }
    } else {
        // Calendly not loaded yet, wait and retry
        setTimeout(initializeCalendly, 200);
    }
}

// Show error state for Calendly
function showCalendlyError() {
    const widget = document.querySelector('.calendly-inline-widget');
    const loadingElement = document.querySelector('.calendly-loading');
    
    if (widget) {
        widget.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 700px; background: #f8f9fa; border-radius: 8px; text-align: center; padding: 20px;">
                <div>
                    <h3 style="color: #e74c3c; margin-bottom: 16px;">Calendar Temporarily Unavailable</h3>
                    <p style="color: #666; margin-bottom: 24px;">Please try refreshing the page or click the button below to open the calendar in a new tab.</p>
                    <a href="https://calendly.com/vizioneer/30min" target="_blank" style="background: #4CAF50; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-right: 12px;">
                        Open Calendar
                    </a>
                    <button onclick="location.reload()" style="background: #007bff; color: white; padding: 12px 24px; border-radius: 6px; border: none; cursor: pointer;">
                        Refresh Page
                    </button>
                </div>
            </div>
        `;
    }
    
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

// Initialize Calendly when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    let initAttempts = 0;
    const maxAttempts = 50; // Try for up to 10 seconds (50 * 200ms)
    
    function tryInitializeCalendly() {
        initAttempts++;
        
        if (typeof Calendly !== 'undefined') {
            initializeCalendly();
        } else if (initAttempts < maxAttempts) {
            setTimeout(tryInitializeCalendly, 200);
        } else {
            // Final fallback after max attempts
            showCalendlyError();
        }
    }
    
    // Start trying to initialize
    setTimeout(tryInitializeCalendly, 300);
    
    // Also try when the Calendly script loads (for external referrers)
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (typeof Calendly !== 'undefined') {
                initializeCalendly();
            }
        }, 1000);
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#3BFF8F' : '#3B8FFF'};
        color: #011133;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Scroll indicator click handler
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Optimized hover effects - removed heavy JS transforms

// Typing animation for hero title
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

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Uncomment the line below to enable typing animation
        // typeWriter(heroTitle, originalText.replace(/<[^>]*>/g, ''), 50);
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Removed heavy reveal animations for better performance

// Removed heavy ripple effects for better performance

// Removed ripple CSS for better performance

// Removed scroll progress indicator for better performance

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #3BFF8F';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// Performance optimization: Debounce scroll events
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

// Simplified scroll handler for navbar only
const debouncedScrollHandler = debounce(() => {
    // Navbar background only
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(1, 17, 51, 0.98)';
    } else {
        navbar.style.background = 'rgba(1, 17, 51, 0.95)';
    }
}, 16); // Reduced frequency

window.addEventListener('scroll', debouncedScrollHandler);

// Project Modal Functionality
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const caseStudyContent = document.getElementById('case-study-content');

// Case study data for each project
const caseStudies = {
    dallas: {
        title: "Dallas Fencing",
        image: "Pictures/Dallas Fencing Mockup.png",
        overview: "Dallas Fencing approached us with a challenge: their existing website was outdated and didn't reflect the premium quality of their fencing services. As a high-end contractor specializing in both residential and commercial projects, they needed a digital presence that would attract discerning clients and showcase their craftsmanship effectively.",
        challenge: "The main issues were poor mobile responsiveness, slow loading times, and a design that didn't convey professionalism. Their contact form was difficult to find, and the portfolio section didn't properly highlight their best work. They were losing potential customers to competitors with better online presence.",
        solution: "We redesigned their entire website with a focus on user experience and conversion optimization. The new site features a clean, modern design with high-quality imagery, streamlined navigation, and prominent contact forms. We implemented a responsive design that works perfectly on all devices and optimized the site for fast loading speeds.",
        results: [
            { number: "150%", label: "Increase in leads" },
            { number: "40%", label: "Lower bounce rate" },
            { number: "25%", label: "More page views" }
        ],
        tech: ["Web Design", "Web Development", "SEO Optimization", "Analytics", "Logo Redesign"],
        testimonial: "\"Working with Fencode was a game-changer for our business. Our new website looks professional and modern, exactly what we needed to compete in today's market. We've seen a significant increase in inquiries since the launch, and the quality of leads has improved dramatically. The team understood our vision and delivered beyond our expectations.\""
    },
    starman: {
        title: "Starman Fencing",
        image: "Pictures/Starman Fence Mockup.png",
        overview: "Starman Fencing, a family-owned business with over 20 years of experience, came to us because they had no online presence whatsoever. They were losing business to competitors who had websites, and their customers were having trouble finding them online. They needed a professional website that would establish credibility and make it easy for customers to get quotes.",
        challenge: "The biggest challenge was that they had no existing website or digital assets. We had to start from scratch, creating everything from their brand identity to their online presence. They also needed education on how to maintain their website and respond to online inquiries effectively.",
        solution: "We created a comprehensive digital solution including a professional website, optimized for local search, with clear service descriptions and easy-to-use contact forms. The design emphasizes their family values and years of experience while maintaining a modern, trustworthy appearance. We also provided training on managing their online presence.",
        results: [
            { number: "200%", label: "More inquiries" },
            { number: "60%", label: "Faster load time" },
            { number: "35%", label: "Higher conversion" }
        ],
        tech: ["Web Design", "Web Development", "SEO Optimization", "Analytics", "Logo Redesign"],
        testimonial: "\"I can't believe the difference a professional website has made for our business. Before working with Fencode, we relied entirely on word-of-mouth referrals. Now we're getting calls from customers who found us online, and they're often ready to book services immediately. The website perfectly represents our family business values while looking modern and professional. Our phone hasn't stopped ringing since we launched!\""
    },
    hoard: {
        title: "Hoard Fencing",
        image: "Pictures/Mockup.png",
        overview: "Hoard Fencing operates across multiple service lines including residential fencing, commercial installations, and repair services. Their existing website was confusing and didn't clearly communicate their diverse offerings. Customers were having trouble understanding what services they provided and how to contact them for different types of projects.",
        challenge: "The main challenge was organizing their complex service offerings in a way that wouldn't overwhelm visitors. They also needed better local SEO to compete in their market area, and their contact process was cumbersome with multiple forms that didn't clearly indicate which service the customer needed.",
        solution: "We restructured their website with clear service categories and dedicated landing pages for each type of fencing service. We implemented a smart contact system that guides customers to the right form based on their needs, and optimized the entire site for local search to help them rank higher in their service area.",
        results: [
            { number: "180%", label: "Traffic increase" },
            { number: "50%", label: "Better rankings" },
            { number: "30%", label: "More calls" }
        ],
        tech: ["Web Design", "Web Development", "SEO Optimization", "Analytics", "Logo Redesign"],
        testimonial: "\"The new website has completely transformed how customers interact with our business. The service pages are so much clearer now, and customers can easily find exactly what they're looking for. We've seen a huge increase in qualified leads, and the new contact system has made it much easier for our team to respond to inquiries. Our Google rankings have improved significantly, and we're getting calls from areas we never reached before.\""
    }
};

// Helper functions for testimonial authors
function getAuthorName(projectTitle) {
    const authors = {
        "Dallas Fencing": "David Mitchell",
        "Starman Fencing": "Mike Starman", 
        "Hoard Fencing": "Robert Hoard"
    };
    return authors[projectTitle] || "Client";
}

function getAuthorPosition(projectTitle) {
    const positions = {
        "Dallas Fencing": "Owner",
        "Starman Fencing": "Founder",
        "Hoard Fencing": "Operations Manager"
    };
    return positions[projectTitle] || "Client";
}

// Function to generate case study HTML
function generateCaseStudyHTML(project) {
    return `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title} Website">
        </div>
        
        <h3>Project Overview</h3>
        <p>${project.overview}</p>
        
        <h3>The Challenge</h3>
        <p>${project.challenge}</p>
        
        <h3>Our Solution</h3>
        <p>${project.solution}</p>
        
        <div class="stats-grid">
            ${project.results.map(result => `
                <div class="stat-item">
                    <span class="stat-number">${result.number}</span>
                    <span class="stat-label">${result.label}</span>
                </div>
            `).join('')}
        </div>
        
        <h3>Technologies Used</h3>
        <div class="tech-stack">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        <h3>Client Testimonial</h3>
        <div class="testimonial-container">
            <p class="testimonial-text">${project.testimonial}</p>
            <div class="testimonial-author">
                <span class="author-name">${getAuthorName(project.title)}</span>
                <span class="author-position">${getAuthorPosition(project.title)}</span>
                <span class="author-company">${project.title}</span>
            </div>
        </div>
    `;
}

// Function to open modal
function openModal(projectId) {
    const project = caseStudies[projectId];
    if (!project) return;
    
    // Update modal title
    document.querySelector('.modal-title').textContent = `${project.title} - Case Study`;
    
    // Generate and insert case study content
    caseStudyContent.innerHTML = generateCaseStudyHTML(project);
    
    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    modalClose.focus();
}

// Function to close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Clear content after animation
    setTimeout(() => {
        caseStudyContent.innerHTML = '';
    }, 300);
}

// Event listeners for modal
document.addEventListener('DOMContentLoaded', () => {
    // View project buttons
    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });
    
    // Close button
    modalClose.addEventListener('click', closeModal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

// Prevent modal content clicks from closing modal
document.addEventListener('click', (e) => {
    if (e.target.closest('.modal-container')) {
        e.stopPropagation();
    }
});
