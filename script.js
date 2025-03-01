// Navigation Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= (sectionTop - 200)) {
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

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 100);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');

let currentSlide = 0;
const maxSlide = testimonialSlides.length - 1;

// Set initial active slide
function showSlide(n) {
  // Remove active class from all slides and dots
  testimonialSlides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Add active class to current slide and dot
  testimonialSlides[n].classList.add('active');
  dots[n].classList.add('active');
  
  currentSlide = n;
}

// Next slide
function nextSlide() {
  if (currentSlide === maxSlide) {
    showSlide(0);
  } else {
    showSlide(currentSlide + 1);
  }
}

// Previous slide
function prevSlide() {
  if (currentSlide === 0) {
    showSlide(maxSlide);
  } else {
    showSlide(currentSlide - 1);
  }
}

// Event listeners for testimonial controls
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Dot navigation
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.getAttribute('data-slide'));
    showSlide(slideIndex);
  });
});

// Auto slide change
let testimonialInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
  clearInterval(testimonialInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
  testimonialInterval = setInterval(nextSlide, 5000);
});

// Form Submission
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    
    // Simple form validation
    if (name && email && service) {
      // In a real application, you would send this data to a server
      // For demo purposes, we'll just show an alert
      alert(`Thank you, ${name}! Your booking request for ${service} photography has been received. We'll contact you at ${email} shortly.`);
      bookingForm.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    if (email) {
      // In a real application, you would send this to a server
      alert(`Thank you for subscribing with ${email}! You'll now receive our latest updates.`);
      newsletterForm.reset();
    } else {
      alert('Please enter a valid email address.');
    }
  });
}

// Animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.service-card, .portfolio-item, .location-card, .about-content, .testimonial-content');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.classList.add('animate');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize testimonial slider
  showSlide(0);
  
  // Check for animations
  animateOnScroll();
  
  // Add animation class to service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate');
    }, 200 * index);
  });
});