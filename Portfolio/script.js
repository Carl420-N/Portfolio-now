// Professional Portfolio Website - Enhanced JavaScript
// All interactive functionality with professional animations and sounds

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== SOUND MANAGEMENT ==========
    const clickSound = document.getElementById('clickSound');
    const hoverSound = document.getElementById('hoverSound');
    const successSound = document.getElementById('successSound');
    const scrollSound = document.getElementById('scrollSound');
    
    // Sound utility functions
    function playSound(sound, volume = 0.3) {
        if (!sound) return;
        try {
            sound.volume = volume;
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Sound play failed:", e));
        } catch (e) {
            console.log("Sound error:", e);
        }
    }
    
    // ========== LOADING ANIMATION ==========
    const loader = document.querySelector('.loader');
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loaded');
            // Initialize animations after loading
            initAnimations();
            // Play subtle sound on load complete
            playSound(successSound, 0.2);
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
    
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        body.classList.toggle('dark-theme');
        
        // Play sound
        playSound(clickSound);
        
        // Professional animation
        themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
        
        // Save theme preference
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
    
    // ========== IMPROVED HEADER SCROLL BEHAVIOR ==========
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    
    // ========== GOOGLE MAPS IFRAME CONTROLS ==========
    const mapContainer = document.getElementById('mapContainer');
    const refreshMapBtn = document.getElementById('refresh-map');
    const openGoogleMapsBtn = document.getElementById('open-google-maps');
    
    // Initialize map controls
    function initMapControls() {
        // Refresh map button
        if (refreshMapBtn) {
            refreshMapBtn.addEventListener('click', (e) => {
                e.preventDefault();
                playSound(clickSound);
                refreshMap();
            });
        }
        
        // Open in Google Maps button
        if (openGoogleMapsBtn) {
            openGoogleMapsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                playSound(clickSound);
                openGoogleMaps();
            });
        }
    }
    
    // Refresh the map iframe
    function refreshMap() {
        if (!mapContainer) return;
        
        const currentSrc = mapContainer.src;
        mapContainer.src = currentSrc.split('?')[0] + '?v=' + new Date().getTime();
        
        // Show feedback with animation
        const originalHTML = refreshMapBtn.innerHTML;
        refreshMapBtn.innerHTML = '<i class="fas fa-check"></i> Refreshed';
        refreshMapBtn.classList.add('refreshing');
        refreshMapBtn.disabled = true;
        
        setTimeout(() => {
            refreshMapBtn.innerHTML = originalHTML;
            refreshMapBtn.classList.remove('refreshing');
            refreshMapBtn.disabled = false;
        }, 1500);
    }
    
    // Open location in Google Maps app/website
    function openGoogleMaps() {
        const googleMapsUrl = 'https://www.google.com/maps?q=Mabini,+Batangas&z=15';
        window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    }
    
    // ========== MOBILE NAVIGATION WITH ANIMATIONS ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        playSound(clickSound);
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            // Add backdrop
            const backdrop = document.createElement('div');
            backdrop.className = 'nav-backdrop';
            backdrop.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(3px);
                z-index: 998;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(backdrop);
            setTimeout(() => backdrop.style.opacity = '1', 10);
            
            backdrop.addEventListener('click', closeMobileMenu);
        } else {
            closeMobileMenu();
        }
    });
    
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        const backdrop = document.querySelector('.nav-backdrop');
        if (backdrop) {
            backdrop.style.opacity = '0';
            setTimeout(() => backdrop.remove(), 300);
        }
        playSound(clickSound, 0.2);
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            playSound(clickSound, 0.3);
            setTimeout(() => {
                closeMobileMenu();
            }, 300);
        });
    });
    
    // ========== SMOOTH SCROLLING WITH SOUND ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Play scroll sound
                playSound(scrollSound, 0.2);
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Smooth scroll
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Reset header
                header.classList.remove('hidden');
            }
        });
    });
    
    // ========== HOVER SOUND EFFECTS ==========
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .filter-btn, .project-link, .social-link, .service-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            playSound(hoverSound, 0.1);
        });
        
        element.addEventListener('click', (e) => {
            if (element.tagName === 'A' && element.getAttribute('href').startsWith('#')) {
                return; // Skip for smooth scrolling links
            }
            playSound(clickSound);
            
            // Add ripple effect
            const rect = element.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
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
                            playSound(successSound, 0.1);
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
                // Play subtle sound when counter completes
                playSound(successSound, 0.05);
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
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: ${Math.random() * 0.3 + 0.1};
                }
                25% {
                    transform: translateY(-20px) translateX(10px) rotate(90deg);
                }
                50% {
                    transform: translateY(-40px) translateX(0) rotate(180deg);
                    opacity: ${Math.random() * 0.5 + 0.3};
                }
                75% {
                    transform: translateY(-20px) translateX(-10px) rotate(270deg);
                }
                100% {
                    transform: translateY(0) translateX(0) rotate(360deg);
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
            // Play sound
            playSound(clickSound);
            
            // Update active button with animation
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'scale(1)';
            });
            button.classList.add('active');
            button.style.transform = 'scale(1.1)';
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.animation = 'slideInFromBottom 0.6s ease-out';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    }, index * 100);
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
    
    // Project data
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
                // Play sound
                playSound(clickSound);
                
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
                document.body.style.overflow = 'hidden';
                
                // Play success sound
                setTimeout(() => playSound(successSound, 0.2), 300);
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', () => {
        playSound(clickSound, 0.3);
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            playSound(clickSound, 0.2);
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
            // Play error sound (using click sound for now)
            playSound(clickSound, 0.1);
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
            // Play success sound
            playSound(successSound);
            
            // Simulate form submission with animations
            const submitBtn = contactForm.querySelector('.btn-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');
            const originalText = btnText.textContent;
            
            btnText.textContent = 'Sending...';
            btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            submitBtn.classList.add('sending');
            
            // Simulate API call
            setTimeout(() => {
                // Show success toast with animation
                toast.classList.add('show');
                
                // Play celebration sound
                setTimeout(() => playSound(successSound, 0.3), 100);
                
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
                
                // Reset form
                contactForm.reset();
                
                // Reset button with animation
                submitBtn.classList.add('sent');
                setTimeout(() => {
                    btnText.textContent = originalText;
                    btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('sending', 'sent');
                }, 500);
                
                // Reset border colors
                [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                    input.style.borderBottomColor = '';
                });
            }, 1500);
        } else {
            // Play error sound
            playSound(clickSound, 0.3);
            
            // Shake form for error
            contactForm.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                contactForm.style.animation = '';
            }, 500);
        }
    });
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        playSound(scrollSound, 0.3);
        
        // Add bounce animation
        backToTopBtn.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            backToTopBtn.style.animation = '';
        }, 500);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== UPDATE COPYRIGHT YEAR ==========
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
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
    
    // ========== ADD CSS FOR ANIMATIONS ==========
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn.sending {
            background: linear-gradient(135deg, #20c997, #198754) !important;
        }
        
        .btn.sent {
            background: linear-gradient(135deg, #198754, #20c997) !important;
        }
        
        .refreshing {
            animation: pulse 1s infinite;
        }
        
        .nav-backdrop {
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // ========== INITIALIZE ON LOAD ==========
    // Set initial header state
    window.dispatchEvent(new Event('scroll'));
    
    // Initialize back to top button
    window.dispatchEvent(new Event('scroll'));
});
