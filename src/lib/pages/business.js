import { supabase } from '../supabase';

// ==========================================
// ANIMATIONS & SCROLL REVEAL
// ==========================================
export function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in, .reveal').forEach(el => observer.observe(el));
}

// ==========================================
// MOBILE MENU
// ==========================================
export function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!mobileToggle || !mobileMenu) return;

  mobileToggle.onclick = () => mobileMenu.classList.toggle('hidden');
  mobileMenu.onclick = (e) => {
    if (e.target.closest('a')) mobileMenu.classList.add('hidden');
  };
}

// ==========================================
// PARTICLE CANVAS
// ==========================================
export function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const heroSection = document.getElementById('hero-section');
  
  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext('2d');
  let pts = [];

  function resize() {
    if (!heroSection) return;
    canvas.width = window.innerWidth;
    canvas.height = heroSection.offsetHeight;
  }

  function create() {
    pts = [];
    for (let i = 0; i < 35; i++) {
      pts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        s: Math.random() * 2
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#3b82f6';
    pts.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
    create();
  });

  resize();
  create();
  draw();
}

// ==========================================
// BUSINESS CONTACT FORM
// ==========================================
export function initBusinessForm() {
  const bizForm = document.getElementById('business-contact-form');
  const msg = document.getElementById('form-message');
  
  if (!bizForm || !msg) return;

  bizForm.onsubmit = async (e) => {
    e.preventDefault();
    msg.classList.remove('hidden');
    msg.textContent = "Processing Partnership Request...";
    msg.className = "block p-4 rounded-xl text-sm font-bold bg-blue-50 text-primary animate-pulse mt-4";

    const formData = new FormData(bizForm);
    const payload = {
      company_name: formData.get('company_name'),
      inquiry_type: formData.get('inquiry_type'),
      contact_name: formData.get('name'),
      contact_email: formData.get('email')
    };

    try {
      const { error } = await supabase.from('business_inquiries').insert([payload]);
      
      if (error) throw error;

      msg.textContent = "Success! Our partnership team will contact you within 24 hours.";
      msg.className = "block p-4 rounded-xl text-sm font-bold bg-green-50 text-green-600 mt-4";
      bizForm.reset();
    } catch (err) {
      console.error(err);
      msg.textContent = "Submission failed. Please check your connection and try again.";
      msg.className = "block p-4 rounded-xl text-sm font-bold bg-red-50 text-red-600 mt-4";
    }
  };
}

// ==========================================
// MAIN INITIALIZATION FUNCTION
// ==========================================
export function initBusinessPage() {
  initScrollReveal();
  initMobileMenu();
  initHeroCanvas();
  initBusinessForm();
}