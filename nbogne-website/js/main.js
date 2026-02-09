/**
 * nBogne Website - JavaScript
 * Minimal, functional interactions only
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  
  if (mobileToggle && navMobile) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMobile.classList.toggle('active');
      document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close on link click
    navMobile.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // Header scroll effect
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#' && href !== '#book') {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const headerHeight = header?.offsetHeight || 72;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
});

// Contact Form Handler - sends to tchiosekale6@gmail.com
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitBtn = form.querySelector('.form-submit');
  const statusMsg = document.getElementById('form-status');
  const originalText = submitBtn.textContent;
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  statusMsg.style.display = 'block';
  statusMsg.textContent = 'Sending your message...';
  statusMsg.style.color = 'var(--color-text-muted)';
  
  const formData = new FormData(form);
  
  // Use Formspree - update form ID at formspree.io to forward to tchiosekale6@gmail.com
  fetch('https://formspree.io/f/xnnegzqy', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      statusMsg.textContent = 'Message sent! We\'ll respond within 24 hours.';
      statusMsg.style.color = 'var(--color-secondary)';
      form.reset();
      submitBtn.textContent = 'Message Sent';
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        statusMsg.style.display = 'none';
      }, 3000);
    } else {
      throw new Error('Failed');
    }
  })
  .catch(error => {
    statusMsg.textContent = 'Error sending message. Please email tsteve@nbogne.com directly.';
    statusMsg.style.color = '#ef4444';
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}
