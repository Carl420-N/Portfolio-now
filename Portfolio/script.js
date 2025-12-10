// Professional Portfolio Website - Enhanced JavaScript
// All interactive functionality with professional animations and Google Maps iframe

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== LOADING ANIMATION ==========
    const loader = document.querySelector('.loader');
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loaded');
            // Initialize animations after loading
            initAnimations();
        }, 800);
    });
    
    // ========== THEME TOGGLE ==========
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        // Simple click effect without moving the button
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
        
        // Save theme preference
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
    
    // ========== MINIMIZED HEADER ON SCROLL - FIXED ==========
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let scrollTimeout;
    
    function handleHeaderScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down - minimize header
                header.classList.add('minimized');
            } else {
                // Scrolling up - show header
                header.classList.remove('minimized');
            }
        } else {
            // At top of page - show full header
            header.classList.remove('minimized');
        }
        
        lastScrollTop = scrollTop;
        
        // Existing scroll effect
        if (scrollTop > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.backdropFilter = 'blur(10px)';
        }
    }
    
    // Throttle scroll events for better performance
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleHeaderScroll();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    // ========== MINIMIZED FOOTER TOGGLE ==========
    const footer = document.querySelector('.footer');
    
    // Check for saved footer state
    const footerState = localStorage.getItem('footerMinimized');
    if (footerState === 'true') {
        footer.classList.add('minimized');
    }
    
    // Create and add footer toggle button
    const footerToggle = document.createElement('button');
    footerToggle.className = 'footer-toggle';
    footerToggle.innerHTML = '<i class="fas fa-chevron-up"></i>';
    footerToggle.setAttribute('aria-label', 'Toggle footer');
    footerToggle.setAttribute('title', 'Toggle footer size');
    
    // Insert toggle button at the beginning of footer bottom
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
        footerBottom.insertBefore(footerToggle, footerBottom.firstChild);
        
        // Update toggle icon based on saved state
        const icon = footerToggle.querySelector('i');
        if (footerState === 'true') {
            icon.style.transform = 'rotate(180deg)';
        }
        
        // Add click event to toggle footer
        footerToggle.addEventListener('click', (e) => {
            e.preventDefault();
            footer.classList.toggle('minimized');
            
            // Save footer state
            const isMinimized = footer.classList.contains('minimized');
            localStorage.setItem('footerMinimized', isMinimized);
            
            // Update toggle icon
            const icon = footerToggle.querySelector('i');
            icon.style.transform = isMinimized ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    }
    
    // ========== GOOGLE MAPS IFRAME CONTROLS ==========
    const mapContainer = document.getElementById('mapContainer');
    const refreshMapBtn = document.getElementById('refresh-map');
    const openGoogleMapsBtn = document.getElementById('open-google-maps');
    
    // Initialize map controls
    function initMapControls() {
        // Refresh map button
        if (refreshMapBtn) {
            refreshMapBtn.addEventListener('click', refreshMap);
        }
        
        // Open in Google Maps button
        if (openGoogleMapsBtn) {
            openGoogleMapsBtn.addEventListener('click', openGoogleMaps);
        }
    }
    
    // Refresh the map iframe
    function refreshMap() {
        if (!mapContainer) return;
        
        const currentSrc = mapContainer.src;
        mapContainer.src = currentSrc.split('?')[0] + '?v=' + new Date().getTime();
        
        // Show feedback
        const originalHTML = refreshMapBtn.innerHTML;
        refreshMapBtn.innerHTML = '<i class="fas fa-check"></i> Refreshed';
        refreshMapBtn.disabled = true;
        
        setTimeout(() => {
            refreshMapBtn.innerHTML = originalHTML;
            refreshMapBtn.disabled = false;
        }, 1500);
    }
    
    // Open location in Google Maps app/website
    function openGoogleMaps() {
        const googleMapsUrl = 'https://www.google.com/maps?q=Mabini,+Batangas&z=15';
        window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    }
    
    // ========== MOBILE NAVIGATION ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Reset header to full size when clicking navigation
                header.classList.remove('minimized');
            }
        });
    });
    
    // ========== SCROLL ANIMATIONS ==========
    function initAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Animate skill bars when they come into view
                    if (entry.target.classList.contains('skill-progress')) {
                        const level = entry.target.getAttribute('data-level');
                        setTimeout(() => {
                            entry.target.style.width = `${level}%`;
                        }, 300);
                        
                        // Animate percentage counter
                        const percentageElement = entry.target.closest('.skill-card').querySelector('.percentage');
                        if (percentageElement) {
                            animateCounter(percentageElement);
                        }
                    }
                    
                    // Animate stats counters
                    if (entry.target.classList.contains('stat')) {
                        const numberElement = entry.target.querySelector('h3');
                        if (numberElement && !numberElement.hasAttribute('data-animated')) {
                            animateCounter(numberElement);
                            numberElement.setAttribute('data-animated', 'true');
                        }
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.fade-up, .slide-left, .slide-right, .skill-progress, .stat').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Counter animation function
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target') || element.textContent);
        const duration = 1500; // 1.5 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // ========== PARTICLES BACKGROUND ==========
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            const opacity = Math.random() * 0.3 + 0.1;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: var(--primary-color);
                border-radius: 50%;
                left: ${posX}%;
                top: ${posY}%;
                opacity: ${opacity};
                animation: float-particle ${duration}s linear ${delay}s infinite;
            `;
            
            container.appendChild(particle);
        }
        
        // Add CSS animation for particles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: ${Math.random() * 0.3 + 0.1};
                }
                25% {
                    transform: translateY(-20px) translateX(10px);
                }
                50% {
                    transform: translateY(-40px) translateX(0);
                    opacity: ${Math.random() * 0.5 + 0.3};
                }
                75% {
                    transform: translateY(-20px) translateX(-10px);
                }
                100% {
                    transform: translateY(0) translateX(0);
                    opacity: ${Math.random() * 0.3 + 0.1};
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize particles
    createParticles();
    
    // ========== PROJECT FILTERING ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ========== PROJECT MODAL ==========
    const projectButtons = document.querySelectorAll('.view-project');
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.querySelector('.modal-body');
    
    // Project data - Updated with Carl's actual projects
    const projects = {
        1: {
            title: "Modern E-Commerce Store",
            description: "A fully functional e-commerce platform built with modern web technologies. Features include product catalog with filtering and search, user authentication, shopping cart with real-time updates, secure checkout process, and admin dashboard for inventory management. The project demonstrates full-stack development skills and understanding of e-commerce business logic.",
            technologies: ["HTML", "CSS", "JS", "JSON"],
            features: [
                "User authentication & authorization system",
                "Product catalog with search and filtering",
                "Shopping cart with real-time updates",
                "Secure payment processing integration",
                "Order tracking and history",
                "Admin dashboard for product management",
                "Responsive design for all devices",
                "Product reviews and ratings system"
            ],
            liveLink: "https://e-commerce-1-lac.vercel.app/",
            githubLink: "#"
        },
        2: {
            title: "Mabini Tourism Website",
            description: "A tourism website dedicated to promoting the beautiful coastal town of Mabini, Batangas. This project showcases local attractions, diving spots, accommodations, and travel information. Features interactive maps, image galleries, and information about local culture and activities. The website aims to boost local tourism and provide valuable information for travelers.",
            technologies: ["HTML5", "CSS3", "JavaScript", "Google Maps API"],
            features: [
                "Interactive Google Maps integration",
                "Photo gallery of tourist attractions",
                "Diving spot information and locations",
                "Accommodation and restaurant listings",
                "Travel tips and local information",
                "Responsive design for mobile users",
                "Contact form for inquiries",
                "Local events calendar"
            ],
            liveLink: "https://mabini-tourism-nine.vercel.app/",
            githubLink: "#"
        },
        3: {
            title: "Interactive Puzzle Game",
            description: "A fun and challenging puzzle game built with vanilla JavaScript. Features multiple difficulty levels, score tracking, timer, and responsive design. The game includes smooth animations, sound effects, and intuitive controls. This project demonstrates game development skills, algorithm implementation, and user experience design.",
            technologies: ["JavaScript", "HTML", "CSS"],
            features: [
                "Multiple difficulty levels (Easy, Medium, Hard)",
                "Score tracking and high score system",
                "Timer with countdown feature",
                "Smooth animations and transitions",
                "Sound effects and background music",
                "Responsive design for all devices",
                "Game instructions and tutorials",
                "Pause and resume functionality"
            ],
            liveLink: "https://puzzle-game-ten-tawny.vercel.app/",
            githubLink: "#"
        }
    };
    
    // Open modal when clicking project buttons
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                modalBody.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    
                    <h4>Technologies Used</h4>
                    <div class="project-tags">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    
                    <h4>Key Features</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    
                    <div class="modal-buttons">
                        <a href="${project.liveLink}" class="btn btn-primary" target="_blank">
                            <i class="fas fa-external-link-alt"></i>Visit Live Site
                        </a>
                    </div>
                `;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // ========== CONTACT FORM VALIDATION ==========
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const toast = document.getElementById('success-toast');
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            showError(nameInput, 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError(nameInput, 'Name must be at least 2 characters');
            return false;
        } else {
            showSuccess(nameInput);
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailInput, 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(emailInput);
            return true;
        }
    }
    
    function validateSubject() {
        const subject = subjectInput.value.trim();
        if (subject === '') {
            showError(subjectInput, 'Subject is required');
            return false;
        } else {
            showSuccess(subjectInput);
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            showError(messageInput, 'Message is required');
            return false;
        } else if (message.length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
            return false;
        } else {
            showSuccess(messageInput);
            return true;
        }
    }
    
    function showError(input, message) {
        const errorElement = input.nextElementSibling?.nextElementSibling;
        if (errorElement) {
            errorElement.textContent = message;
            input.style.borderBottomColor = '#dc3545';
        }
    }
    
    function showSuccess(input) {
        const errorElement = input.nextElementSibling?.nextElementSibling;
        if (errorElement) {
            errorElement.textContent = '';
            input.style.borderBottomColor = '#20c997';
        }
    }
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    subjectInput.addEventListener('input', validateSubject);
    messageInput.addEventListener('input', validateMessage);
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.btn-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');
            const originalText = btnText.textContent;
            
            btnText.textContent = 'Sending...';
            btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success toast
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                btnText.textContent = originalText;
                btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
                
                // Reset border colors
                [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                    input.style.borderBottomColor = '';
                });
            }, 1500);
        }
    });
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            backToTopBtn.style.transform = 'translateY(10px)';
        }
    });
    
    // ========== UPDATE COPYRIGHT YEAR ==========
    const currentYearSpan = document.getElementById('current-year');
    currentYearSpan.textContent = new Date().getFullYear();
    
    // ========== IMAGE LOAD HANDLER ==========
    // Handle image loading and fallback
    const profileImages = document.querySelectorAll('.profile-img');
    const projectLogos = document.querySelectorAll('.project-logo');
    
    function handleImageError(img) {
        console.log('Image failed to load, using fallback');
        const parent = img.parentElement;
        const fallbackIcon = document.createElement('i');
        
        if (img.classList.contains('profile-img')) {
            fallbackIcon.className = 'fas fa-user-tie';
            fallbackIcon.style.fontSize = '8rem';
        } else if (img.classList.contains('project-logo')) {
            fallbackIcon.className = 'fas fa-project-diagram';
            fallbackIcon.style.fontSize = '4rem';
        }
        
        fallbackIcon.style.color = 'white';
        fallbackIcon.style.opacity = '0.9';
        img.style.display = 'none';
        parent.appendChild(fallbackIcon);
    }
    
    profileImages.forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
    });
    
    projectLogos.forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
    });
    
    // ========== INITIALIZE SKILL BARS ==========
    // Skill bars will be animated when they come into view (handled by IntersectionObserver)
    // But we need to set initial width to 0
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0';
    });
    
    // ========== INITIALIZE MAP CONTROLS ==========
    initMapControls();
    
    // ========== INITIALIZE ON LOAD ==========
    // Set initial header state
    window.dispatchEvent(new Event('scroll'));
    
    // Initialize back to top button
    window.dispatchEvent(new Event('scroll'));
});