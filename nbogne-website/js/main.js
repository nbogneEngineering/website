/**
 * nBogne Website — 2026
 */

document.addEventListener('DOMContentLoaded', function() {

  // Mobile Navigation
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (mobileToggle && navMobile) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMobile.classList.toggle('active');
      document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });

    navMobile.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Header scroll shadow
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.style.boxShadow = window.scrollY > 40
        ? '0 1px 4px rgba(0,0,0,0.06)'
        : 'none';
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href !== '#' && href !== '#book') {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          var offset = (header ? header.offsetHeight : 68) + 16;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth'
          });
        }
      }
    });
  });

});

// Contact Form Handler — sends to tchiosekale6@gmail.com via Formspree
function handleFormSubmit(event) {
  event.preventDefault();

  var form = event.target;
  var submitBtn = form.querySelector('.form-submit');
  var statusMsg = document.getElementById('form-status');
  var originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  statusMsg.style.display = 'block';
  statusMsg.textContent = 'Sending your message...';
  statusMsg.style.color = 'var(--text-muted)';

  var formData = new FormData(form);

  fetch('https://formspree.io/f/xnnegzqy', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(function(response) {
    if (response.ok) {
      statusMsg.textContent = 'Message sent! We\'ll respond within 24 hours.';
      statusMsg.style.color = 'var(--teal)';
      form.reset();
      submitBtn.textContent = 'Message Sent';
      setTimeout(function() {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        statusMsg.style.display = 'none';
      }, 3000);
    } else {
      throw new Error('Failed');
    }
  })
  .catch(function() {
    statusMsg.textContent = 'Error sending. Please email tsteve@nbogne.com directly.';
    statusMsg.style.color = '#ef4444';
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}
