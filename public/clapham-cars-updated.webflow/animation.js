// Clapham Cars Website Animations
// Modern animations to enhance user experience

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Initialize GSAP animations
    initGSAPAnimations();
    
    // Initialize button hover animations
    initButtonAnimations();
    
    // Initialize navbar animations
    initNavbarAnimations();
    
    // Initialize image animations
    initImageAnimations();
    
    // Initialize text animations
    initTextAnimations();
});

// GSAP Animations
function initGSAPAnimations() {
    if (typeof gsap !== 'undefined') {
        // Hero section animation
        gsap.from('.header26_component h1', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.2
        });
        
        gsap.from('.header26_component p', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.4
        });
        
        gsap.from('.header26_component .button-group', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.6
        });
        
        // Staggered animation for navbar links
        gsap.from('.navbar5_link', {
            duration: 0.5,
            opacity: 0,
            y: -20,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.2
        });
    }
}

// Button Hover Animations
function initButtonAnimations() {
    // Select all buttons
    const buttons = document.querySelectorAll('.button');
    
    buttons.forEach(button => {
        // Add hover effect
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // Add click effect
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Animate link buttons with icons
    const linkButtons = document.querySelectorAll('.button.is-link.is-icon');
    
    linkButtons.forEach(button => {
        const iconElement = button.querySelector('.icon-embed-xxsmall');
        
        button.addEventListener('mouseenter', function() {
            if (iconElement) {
                iconElement.style.transition = 'transform 0.3s ease';
                iconElement.style.transform = 'translateX(5px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (iconElement) {
                iconElement.style.transform = 'translateX(0)';
            }
        });
    });
}

// Navbar Animations
function initNavbarAnimations() {
    // Dropdown menu animation
    const dropdowns = document.querySelectorAll('.navbar5_dropdown-toggle');
    
    dropdowns.forEach(dropdown => {
        const dropdownList = dropdown.nextElementSibling;
        const chevron = dropdown.querySelector('.dropdown-chevron');
        
        if (dropdown && dropdownList && chevron) {
            dropdown.addEventListener('mouseenter', function() {
                if (chevron) {
                    chevron.style.transition = 'transform 0.3s ease';
                    chevron.style.transform = 'rotate(180deg)';
                }
            });
            
            dropdown.addEventListener('mouseleave', function() {
                if (chevron) {
                    chevron.style.transform = 'rotate(0)';
                }
            });
        }
    });
    
    // Mobile menu animation
    const menuButton = document.querySelector('.navbar5_menu-button');
    const menuIcon = document.querySelector('.menu-icon1');
    
    if (menuButton && menuIcon) {
        menuButton.addEventListener('click', function() {
            menuIcon.classList.toggle('is-active');
        });
    }
}

// Image Animations
function initImageAnimations() {
    // Add subtle hover effect to images
    const images = document.querySelectorAll('.layout4_image, .layout22_image, .layout1_image, .layout3_image');
    
    images.forEach(image => {
        image.style.transition = 'transform 0.5s ease, filter 0.5s ease';
        
        // Add data attributes for AOS
        image.setAttribute('data-aos', 'fade-up');
        image.setAttribute('data-aos-duration', '800');
        
        // Add hover effect for desktop
        if (window.innerWidth > 991) {
            image.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.filter = 'brightness(1.05)';
            });
            
            image.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.filter = 'brightness(1)';
            });
        }
    });
    
    // Special animation for hero image
    const heroImage = document.querySelector('.header26_image');
    if (heroImage && typeof gsap !== 'undefined') {
        gsap.from(heroImage, {
            duration: 1.2,
            scale: 1.1,
            opacity: 0,
            ease: 'power2.out',
            delay: 0.3
        });
    }
}

// Text Animations
function initTextAnimations() {
    // Add AOS attributes to headings and text blocks
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const textBlocks = document.querySelectorAll('p.text-size-medium');
    
    headings.forEach((heading, index) => {
        heading.setAttribute('data-aos', 'fade-up');
        heading.setAttribute('data-aos-delay', (index * 50).toString());
    });
    
    textBlocks.forEach((block, index) => {
        block.setAttribute('data-aos', 'fade-up');
        block.setAttribute('data-aos-delay', (100 + index * 50).toString());
    });
    
    // Special animation for tagline text
    const taglines = document.querySelectorAll('.text-style-tagline');
    
    if (typeof gsap !== 'undefined') {
        gsap.from(taglines, {
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }
}
