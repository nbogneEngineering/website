/**
 * nBogne Website - Main JavaScript
 * Handles navigation, animations, and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // Mobile Navigation
  // ============================================
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  
  if (mobileToggle && navMobile) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMobile.classList.toggle('active');
      document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = navMobile.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // ============================================
  // Header Scroll Effect
  // ============================================
  const header = document.querySelector('.header');
  
  if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }
  
  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // ============================================
  // Active Navigation State
  // ============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // ============================================
  // Intersection Observer for Animations
  // ============================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Add stagger animation to children if needed
        const staggerChildren = entry.target.querySelectorAll('.stagger-child');
        staggerChildren.forEach((child, index) => {
          child.style.animationDelay = `${index * 0.1}s`;
          child.classList.add('visible');
        });
      }
    });
  }, observerOptions);
  
  // Observe elements with animate class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
  
  // ============================================
  // Auto-animate common elements on scroll
  // ============================================
  const autoAnimateElements = () => {
    // Feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
      card.classList.add('animate-on-scroll', 'fade-up', `stagger-${(index % 6) + 1}`);
      observer.observe(card);
    });
    
    // Team cards
    document.querySelectorAll('.team-card').forEach((card, index) => {
      card.classList.add('animate-on-scroll', 'scale-in', `stagger-${(index % 6) + 1}`);
      observer.observe(card);
    });
    
    // Process steps
    document.querySelectorAll('.process-step').forEach((step, index) => {
      if (index % 2 === 0) {
        step.classList.add('animate-on-scroll', 'slide-left', `stagger-${(index % 6) + 1}`);
      } else {
        step.classList.add('animate-on-scroll', 'slide-right', `stagger-${(index % 6) + 1}`);
      }
      observer.observe(step);
    });
    
    // Value cards
    document.querySelectorAll('.value-card').forEach((card, index) => {
      card.classList.add('animate-on-scroll', 'fade-up', `stagger-${(index % 6) + 1}`);
      observer.observe(card);
    });
    
    // Section headings
    document.querySelectorAll('section > .container > h2').forEach((heading) => {
      heading.classList.add('animate-on-scroll', 'fade-up');
      observer.observe(heading);
    });
    
    // Credential badges
    document.querySelectorAll('.credential-badge').forEach((badge, index) => {
      badge.classList.add('animate-on-scroll', 'scale-in', `stagger-${(index % 6) + 1}`);
      observer.observe(badge);
    });
  };
  
  autoAnimateElements();
  
  // ============================================
  // Counter Animation for Stats
  // ============================================
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString() + (element.getAttribute('data-suffix') || '');
      }
    };
    
    updateCounter();
  };
  
  // Observe counter elements
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('[data-count]').forEach(counter => {
    counterObserver.observe(counter);
  });
  
  // ============================================
  // Interactive Scale Cards
  // ============================================
  const scaleCards = document.querySelectorAll('.scale-card');
  scaleCards.forEach((card, index) => {
    // Animate on scroll
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-in');
          }, index * 100);
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    cardObserver.observe(card);
  });
  
  // ============================================
  // Timeline Item Animations
  // ============================================
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-up');
      }
    });
  }, { threshold: 0.1 });
  
  timelineItems.forEach((item, index) => {
    item.style.animationDelay = (index * 0.1) + 's';
    timelineObserver.observe(item);
  });
  
  // ============================================
  // Typed Text Effect (optional)
  // ============================================
  const typedElement = document.querySelector('.typed-text');
  
  if (typedElement) {
    const words = JSON.parse(typedElement.getAttribute('data-words') || '[]');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const type = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }
      
      setTimeout(type, typeSpeed);
    };
    
    if (words.length > 0) {
      type();
    }
  }
  
  // ============================================
  // Feature Cards Stagger Animation
  // ============================================
  const featureCards = document.querySelectorAll('.feature-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  featureCards.forEach(card => {
    card.style.opacity = '0';
    cardObserver.observe(card);
  });
  
  // ============================================
  // Number Highlight Animation
  // ============================================
  const numberHighlights = document.querySelectorAll('.number-highlight');
  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'pulse-badge 2s ease-in-out infinite';
        numberObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  numberHighlights.forEach(num => {
    numberObserver.observe(num);
  });
  
  // ============================================
  // Contact Form Submission Handler
  // ============================================
  function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.form-submit');
    const statusMsg = document.getElementById('form-status');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusMsg.style.display = 'block';
    statusMsg.className = 'form-note form-status-success';
    statusMsg.textContent = '⏳ Sending your message...';
    
    // Create FormData
    const formData = new FormData(form);
    
    // Send to Formspree
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(async response => {
      if (response.ok) {
        statusMsg.className = 'form-note form-status-success';
        statusMsg.textContent = '✅ Message sent! We\'ll respond within 24 hours.';
        form.reset();
        submitBtn.textContent = 'Message Sent!';
        
        setTimeout(() => {
          statusMsg.style.display = 'none';
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          window.location.href = 'contact.html';
        }, 1200);
        return;
      }
      const error = new Error('Form submission failed');
      error.status = response.status;
      try {
        const data = await response.json();
        error.detail = data?.error || data?.message || data?.errors?.[0]?.message;
      } catch (e) {
        error.detail = undefined;
      }
      throw error;
    })
    .catch(error => {
      const mailtoBody = [
        `Name: ${form.name?.value || ''}`,
        `Email: ${form.email?.value || ''}`,
        `Organization: ${form.organization?.value || ''}`,
        `Role: ${form.role?.value || ''}`,
        '',
        `Message: ${form.message?.value || ''}`
      ].join('\n');
      const mailtoLink = `mailto:tsteve@nbogne.com?subject=Contact%20via%20nBogne%20site&body=${encodeURIComponent(mailtoBody)}`;
      
      statusMsg.className = 'form-note form-status-error';
      
      if (error.status === 404) {
        statusMsg.innerHTML = `❌ Form service not configured (Formspree hash not found). Please email <a href="${mailtoLink}">tsteve@nbogne.com</a> while we fix this.`;
      } else {
        const detail = error.detail ? ` (${error.detail})` : '';
        statusMsg.innerHTML = `❌ Error sending message${detail}. Please email <a href="${mailtoLink}">tsteve@nbogne.com</a>.`;
      }
      
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  }
  
  window.handleFormSubmit = handleFormSubmit;
  
  // ============================================
  // Number Counter Animation
  // ============================================
  const animateNumbers = (element) => {
    const target = parseInt(element.getAttribute('data-target')) || 0;
    const duration = parseInt(element.getAttribute('data-duration')) || 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + (element.getAttribute('data-suffix') || '');
        clearInterval(counter);
      } else {
        element.textContent = Math.floor(current) + (element.getAttribute('data-suffix') || '');
      }
    }, 16);
  };
  
  // Observe number elements
  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        animateNumbers(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('[data-target]').forEach(el => {
    numberObserver.observe(el);
  });
  
  // ============================================
  // Enhanced Scroll Animations with Parallax
  // ============================================
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    // Parallax effect on hero section
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
    
    // Add subtle glow to floating elements on scroll
    const floatingElements = document.querySelectorAll('[style*="animation: float"]');
    floatingElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        el.style.filter = `brightness(${1 + (scrollY % 100) / 1000})`;
      }
    });
  });
  
  // ============================================
  // Smooth Scroll Reveal for Sections
  // ============================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0.95';
    section.style.transform = 'translateY(10px)';
    section.style.transition = 'all 0.6s ease-out';
    revealObserver.observe(section);
  });
  
  // ============================================
  // Add interactive ripple effect to buttons
  // ============================================
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // ============================================
  // Intersection Observer for Card Lift Effects
  // ============================================
  const liftObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('lift-on-hover');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.feature-card, .value-card, .process-step, .team-card').forEach(card => {
    liftObserver.observe(card);
  });
  

  // ============================================
  // Section Reveal on Scroll
  // ============================================
  const revealSections = document.querySelectorAll('.section-reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  revealSections.forEach(section => {
    revealObserver.observe(section);
  });
  
});

// ============================================
// Utility: Debounce Function
// ============================================
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

// ============================================
// Utility: Throttle Function
// ============================================
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}