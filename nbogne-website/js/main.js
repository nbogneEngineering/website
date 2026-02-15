/**
 * nBogne Website — 2026 Creative Redesign
 * Animation engine: canvas hero, scroll reveals, counters, parallax
 */

(function () {
  'use strict';

  /* ==========================================================================
     0.  THEME TOGGLE (Light / Dark)
     ========================================================================== */
  function initThemeToggle() {
    var btns = document.querySelectorAll('.theme-toggle');
    if (!btns.length) return;
    var isLight = localStorage.getItem('nbogne-theme') === 'light';
    if (isLight) document.body.classList.add('light-mode');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        isLight = !isLight;
        document.body.classList.toggle('light-mode', isLight);
        localStorage.setItem('nbogne-theme', isLight ? 'light' : 'dark');
      });
    });
  }
  initThemeToggle();

  /* ==========================================================================
     1.  HERO CONSTELLATION CANVAS
     ========================================================================== */
  function initHeroCanvas() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var WIDTH, HEIGHT, nodes = [], packets = [], mouse = { x: -1000, y: -1000 };

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      WIDTH = rect.width; HEIGHT = rect.height;
      canvas.width = WIDTH * dpr; canvas.height = HEIGHT * dpr;
      canvas.style.width = WIDTH + 'px'; canvas.style.height = HEIGHT + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Scattered health-facility nodes
    function seed() {
      nodes = [];
      var count = Math.floor((WIDTH * HEIGHT) / 18000);
      count = Math.max(30, Math.min(count, 90));
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * WIDTH,
          y: Math.random() * HEIGHT,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: 1.5 + Math.random() * 1.5,
          pulse: Math.random() * Math.PI * 2
        });
      }
    }

    // Packets that travel between pairs
    function spawnPacket() {
      if (nodes.length < 2) return;
      var a = nodes[Math.floor(Math.random() * nodes.length)];
      var b = nodes[Math.floor(Math.random() * nodes.length)];
      if (a === b) return;
      packets.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, t: 0, speed: 0.008 + Math.random() * 0.012 });
    }

    function draw(time) {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // Edges
      var maxDist = 160;
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x;
          var dy = nodes[i].y - nodes[j].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            var alpha = (1 - d / maxDist) * 0.12;
            ctx.strokeStyle = 'rgba(13,148,136,' + alpha + ')';
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Mouse attraction lines
      for (var k = 0; k < nodes.length; k++) {
        var mDx = nodes[k].x - mouse.x;
        var mDy = nodes[k].y - mouse.y;
        var mD = Math.sqrt(mDx * mDx + mDy * mDy);
        if (mD < 200) {
          var mAlpha = (1 - mD / 200) * 0.2;
          ctx.strokeStyle = 'rgba(6,182,212,' + mAlpha + ')';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[k].x, nodes[k].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Nodes
      for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        node.pulse += 0.02;
        node.x += node.vx; node.y += node.vy;
        // Bounce softly
        if (node.x < 0 || node.x > WIDTH) node.vx *= -1;
        if (node.y < 0 || node.y > HEIGHT) node.vy *= -1;

        var glow = 0.4 + Math.sin(node.pulse) * 0.2;
        ctx.fillStyle = 'rgba(13,148,136,' + glow + ')';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();

        // Outer ring
        ctx.strokeStyle = 'rgba(13,148,136,' + (glow * 0.3) + ')';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r + 3 + Math.sin(node.pulse) * 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Packets
      for (var p = packets.length - 1; p >= 0; p--) {
        var pkt = packets[p];
        pkt.t += pkt.speed;
        if (pkt.t >= 1) { packets.splice(p, 1); continue; }
        var px = pkt.ax + (pkt.bx - pkt.ax) * pkt.t;
        var py = pkt.ay + (pkt.by - pkt.ay) * pkt.t;
        var opacity = pkt.t < 0.1 ? pkt.t * 10 : pkt.t > 0.9 ? (1 - pkt.t) * 10 : 1;

        // Glow
        var grad = ctx.createRadialGradient(px, py, 0, px, py, 6);
        grad.addColorStop(0, 'rgba(6,182,212,' + (0.7 * opacity) + ')');
        grad.addColorStop(1, 'rgba(6,182,212,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = 'rgba(255,255,255,' + (0.9 * opacity) + ')';
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Spawn packets randomly
      if (Math.random() < 0.04) spawnPacket();

      requestAnimationFrame(draw);
    }

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', function () {
      mouse.x = -1000; mouse.y = -1000;
    });

    window.addEventListener('resize', function () { resize(); seed(); });
    resize(); seed(); draw(0);
  }

  /* ==========================================================================
     2.  SCROLL REVEAL
     ========================================================================== */
  function initScrollReveal() {
    var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ==========================================================================
     3.  ANIMATED COUNTERS
     ========================================================================== */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = '1';
          animateCount(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function (el) { observer.observe(el); });

    function animateCount(el) {
      var target = el.getAttribute('data-count');
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var isFloat = target.indexOf('.') !== -1;
      var num = parseFloat(target);
      var duration = 1800;
      var start = performance.now();

      function step(now) {
        var progress = Math.min((now - start) / duration, 1);
        // easeOutExpo
        var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        var current = eased * num;
        el.textContent = prefix + (isFloat ? current.toFixed(0) : Math.floor(current)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target + suffix;
      }
      requestAnimationFrame(step);
    }
  }

  /* ==========================================================================
     4.  HEADER SCROLL
     ========================================================================== */
  function initHeader() {
    var header = document.querySelector('.header');
    if (!header) return;
    var last = 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
      last = y;
    });
  }

  /* ==========================================================================
     5.  MOBILE NAV
     ========================================================================== */
  function initMobileNav() {
    var toggle = document.querySelector('.mobile-toggle');
    var nav = document.querySelector('.nav-mobile');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      this.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    nav.querySelectorAll('.nav-link, .btn').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================================================
     6.  SMOOTH ANCHOR SCROLL
     ========================================================================== */
  function initSmoothScroll() {
    var header = document.querySelector('.header');
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#' || href === '#book') return;
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          var offset = header ? header.offsetHeight + 16 : 88;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ==========================================================================
     7.  FLOW STEP ACTIVATION ON SCROLL
     ========================================================================== */
  function initFlowSteps() {
    var steps = document.querySelectorAll('.flow-step');
    if (!steps.length) return;
    var idx = 0;
    var interval = setInterval(function () {
      steps.forEach(function (s) { s.classList.remove('active'); });
      steps[idx % steps.length].classList.add('active');
      idx++;
    }, 2200);
  }

  /* ==========================================================================
     8. TILT ON HOVER (cards)
     ========================================================================== */
  function initTilt() {
    if (window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.stat-card, .audience-card, .benefit-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ==========================================================================
     9. TYPED TEXT (hero)
     ========================================================================== */
  function initTypedText() {
    var el = document.querySelector('.typed-text');
    if (!el) return;
    var phrases = JSON.parse(el.getAttribute('data-phrases') || '[]');
    if (!phrases.length) return;

    var phraseIdx = 0, charIdx = 0, deleting = false, speed = 70;
    el.textContent = '';

    function type() {
      var current = phrases[phraseIdx];
      if (!deleting) {
        el.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(type, 2000);
          return;
        }
      } else {
        el.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 40 : speed);
    }
    setTimeout(type, 800);
  }

  /* ==========================================================================
     INIT
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    initHeroCanvas();
    initScrollReveal();
    initCounters();
    initHeader();
    initMobileNav();
    initSmoothScroll();
    initFlowSteps();
    initTilt();
    initTypedText();
  });

})();

/* ==========================================================================
   GLOBAL FUNCTIONS (Calendly, Dark mode, Form)
   ========================================================================== */

function openCalendly() {
  if (typeof Calendly !== 'undefined') {
    Calendly.initPopupWidget({ url: 'https://calendly.com/tchiosekale6/30min' });
  } else {
    window.open('https://calendly.com/tchiosekale6/30min', '_blank');
  }
  return false;
}

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
    method: 'POST', body: formData,
    headers: { 'Accept': 'application/json' }
  })
    .then(function (response) {
      if (response.ok) {
        statusMsg.textContent = 'Message sent! We\'ll respond within 24 hours.';
        statusMsg.style.color = 'var(--teal)';
        form.reset();
        submitBtn.textContent = 'Message Sent';
        setTimeout(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          statusMsg.style.display = 'none';
        }, 3000);
      } else { throw new Error('Failed'); }
    })
    .catch(function () {
      statusMsg.textContent = 'Error sending. Please email tchiosekale6@gmail.com directly.';
      statusMsg.style.color = '#ef4444';
      submitBtn.textContent = originalText; submitBtn.disabled = false;
    });
}
