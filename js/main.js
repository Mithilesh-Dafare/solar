document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            // Add active class to clicked nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
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
            }
        });
    });

    // Set active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    
    function setActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === current) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink(); // Call once on page load

    // ROI Calculator
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateROI);
        
        // Also calculate when pressing Enter in input fields
        const inputs = document.querySelectorAll('.calculator input');
        inputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    calculateROI();
                }
            });
        });
    }
    
    function calculateROI() {
        const systemCost = parseFloat(document.getElementById('systemCost').value);
        const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
        
        // Basic validation
        if (isNaN(systemCost) || isNaN(monthlyBill) || systemCost <= 0 || monthlyBill <= 0) {
            alert('Please enter valid numbers greater than 0');
            return;
        }
        
        // Simple ROI calculation (can be adjusted based on more complex formulas)
        const annualSavings = monthlyBill * 12;
        const paybackYears = systemCost / annualSavings;
        const annualROI = (annualSavings / systemCost) * 100;
        
        // Display results
        document.getElementById('paybackPeriod').textContent = paybackYears.toFixed(1) + ' years';
        document.getElementById('annualROI').textContent = annualROI.toFixed(1) + '%';
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .step, .contact-form, .roi-calculator');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        // Close all answers by default
        if (answer) {
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
        }
        
        if (question && answer) {
            question.addEventListener('click', () => {
                // Toggle the active class on the question
                question.classList.toggle('active');
                
                // Toggle the answer visibility
                if (question.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.padding = '15px 0';
                    if (toggle) toggle.textContent = '−'; // Minus symbol
                } else {
                    answer.style.maxHeight = '0';
                    answer.style.padding = '0';
                    if (toggle) toggle.textContent = '+';
                }
                
                // Close other open FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        
                        otherQuestion.classList.remove('active');
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.padding = '0';
                        if (otherToggle) otherToggle.textContent = '+';
                    }
                });
            });
        }
    });

    // Set initial styles for animation
    document.querySelectorAll('.service-card, .step, .contact-form, .roi-calculator, .faq-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
