// lib/pages/courses.js

import { supabase } from '../supabase';

export async function init() {
    // Initialize Lucide icons if available
    if (typeof window !== 'undefined' && typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    try {
        const { data: courses, error } = await supabase.from('courses').select('*').order('category', { ascending: true });

        if (error || !courses || !courses.length) {
            grid.innerHTML = `<div class="col-span-full py-20 text-center text-slate-400 font-bold">New learning paths are currently being co-created. Stay tuned!</div>`;
            return;
        }

        renderCourses(courses);
        renderFilters(courses);
        setupAnimations();
        setupAuthUI();
    } catch (err) {
        console.error(err);
        grid.innerHTML = `<div class="col-span-full py-20 text-center text-red-400 font-bold">Failed to load courses. Please try again later.</div>`;
    }
}

async function setupAuthUI() {
    const { data: { session } } = await supabase.auth.getSession();
    updateAllAuthUI(session);

    supabase.auth.onAuthStateChange((_event, session) => {
        updateAllAuthUI(session);
    });
}

function updateAllAuthUI(session) {
    // Header Elements
    const navLoginBtn = document.getElementById('nav-login-btn');
    const navProfileBtn = document.getElementById('nav-profile-btn');
    const mobileLoginLink = document.getElementById('mobile-login-link');
    const mobileProfileLink = document.getElementById('mobile-profile-link');

    // Footer Elements
    const footerAuth = document.getElementById('footer-auth');
    const userName = document.getElementById('footer-user-name');
    const userEmail = document.getElementById('footer-user-email');

    if (session?.user) {
        // Update Header
        if (navLoginBtn) navLoginBtn.classList.add('hidden');
        if (navProfileBtn) navProfileBtn.classList.remove('hidden');
        if (mobileLoginLink) mobileLoginLink.classList.add('hidden');
        if (mobileProfileLink) mobileProfileLink.classList.remove('hidden');

        // Update Footer
        if (footerAuth) footerAuth.classList.remove('hidden');
        if (userName) userName.textContent = session.user.user_metadata?.full_name || 'Welcome Back';
        if (userEmail) userEmail.textContent = session.user.email;
    } else {
        // Update Header
        if (navLoginBtn) navLoginBtn.classList.remove('hidden');
        if (navProfileBtn) navProfileBtn.classList.add('hidden');
        if (mobileLoginLink) mobileLoginLink.classList.remove('hidden');
        if (mobileProfileLink) mobileProfileLink.classList.add('hidden');

        // Update Footer
        if (footerAuth) footerAuth.classList.add('hidden');
    }
}

export function handleLogoutFooter() {
    supabase.auth.signOut().then(() => {
        window.location.reload();
    });
}

function renderCourses(courses) {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    grid.innerHTML = courses.map(course => `
        <div class="course-card bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden flex flex-col group h-full shadow-sm" data-category="${course.category}">
            <!-- Image Area -->
            <div class="h-56 relative flex items-center justify-center overflow-hidden" 
                 style="background: ${course.image_visual || course.color || 'linear-gradient(45deg, #2563eb, #db2777)'};">
                
                ${course.image_url
                    ? `<img src="${course.image_url}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="${course.title}">`
                    : `<span class="text-white text-3xl font-black italic tracking-tighter drop-shadow-lg">${course.image_text || course.title[0]}</span>`
                }

                <!-- Badge -->
                <div class="absolute top-6 left-6">
                    <span class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg" 
                          style="background-color: white; color: ${course.color || '#2563eb'};">
                        ${course.category}
                    </span>
                </div>
            </div>

            <div class="p-8 flex-grow flex flex-col">
                <h3 class="text-xl font-heading font-bold text-slate-900 mb-4 line-clamp-2">${course.title}</h3>
                <p class="text-sm text-slate-500 leading-relaxed mb-8 line-clamp-3">${course.description}</p>
                
                <div class="mt-auto">
                    ${course.is_live
                        ? `<a href="${course.details_link || '#'}" 
                                  class="block w-full py-4 text-center bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition shadow-xl shadow-slate-100 flex items-center justify-center gap-2">
                                  View Details <i data-lucide="chevron-right" class="w-4 h-4"></i>
                               </a>`
                        : `<div class="block w-full py-4 text-center bg-slate-100 text-slate-400 rounded-2xl font-bold uppercase tracking-widest text-[10px] cursor-not-allowed">
                                  Coming Soon
                               </div>`
                    }
                </div>
            </div>
        </div>
    `).join('');

    // Re-initialize Lucide icons after rendering
    if (typeof window !== 'undefined' && typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function renderFilters(courses) {
    const categories = ['All', ...new Set(courses.map(c => c.category))];
    const filterContainer = document.getElementById('category-filters');
    if (!filterContainer) return;

    filterContainer.innerHTML = categories.map(cat => `
        <button onclick="window.filterCourses && window.filterCourses('${cat}')" 
                class="px-5 py-2 rounded-full text-xs font-bold border border-slate-200 hover:border-primary hover:text-primary transition-all duration-300">
            ${cat}
        </button>
    `).join('');
}

export function filterCourses(category) {
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
        if (category === 'All' || card.dataset.category === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

export function setupMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const menuOverlay = document.getElementById('mobile-menu');
    
    if (toggleBtn && menuOverlay) {
        toggleBtn.onclick = () => menuOverlay.classList.toggle('hidden');
    }
}

export function initCourses() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupMobileMenu();
            init();
        });
    } else {
        setupMobileMenu();
        init();
    }

    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn-footer');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogoutFooter);
    }

    // Expose functions to window for onclick handlers
    if (typeof window !== 'undefined') {
        window.filterCourses = filterCourses;
    }
}