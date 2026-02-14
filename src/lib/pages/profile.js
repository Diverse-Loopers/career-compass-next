// lib/pages/dashboard.js

import { supabase } from '../supabase';

// Theme Management
export function setTheme(isDark) {
    const dot = document.getElementById('theme-toggle-dot');
    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');
    
    if (isDark) {
        document.documentElement.classList.add('dark');
        if (dot) dot.classList.add('translate-x-5');
        if (icon) icon.setAttribute('data-lucide', 'sun');
        if (text) text.textContent = 'Light Mode';
    } else {
        document.documentElement.classList.remove('dark');
        if (dot) dot.classList.remove('translate-x-5');
        if (icon) icon.setAttribute('data-lucide', 'moon');
        if (text) text.textContent = 'Dark Mode';
    }
    
    if (typeof window !== 'undefined' && window.lucide) {
        window.lucide.createIcons();
    }
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

export function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.onclick = () => {
            const isDark = !document.documentElement.classList.contains('dark');
            setTheme(isDark);
        };
    }
    
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        setTheme(true);
    }
}

// Sidebar Management
export function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const openBtn = document.getElementById('open-sidebar');
    const closeBtn = document.getElementById('close-sidebar');

    if (openBtn) {
        openBtn.onclick = () => {
            if (sidebar) sidebar.classList.add('open');
            if (overlay) {
                overlay.classList.remove('hidden');
                overlay.classList.add('visible');
            }
        };
    }

    [closeBtn, overlay].forEach(el => {
        if (el) {
            el.onclick = () => {
                if (sidebar) sidebar.classList.remove('open');
                if (overlay) {
                    overlay.classList.add('hidden');
                    overlay.classList.remove('visible');
                }
            };
        }
    });
}

// Hustler Modal
export function toggleHustlerModal(show) {
    const modal = document.getElementById('hustler-modal-overlay');
    if (modal) {
        modal.style.display = show ? 'flex' : 'none';
    }
    
    if (show) {
        // Pre-fill email if user is logged in
        supabase.auth.getUser().then(({ data: { user } }) => {
            const emailInput = document.getElementById('hustler-email');
            if (user && emailInput) {
                emailInput.value = user.email;
            }
        });
    }
}

export async function handleHustlerFormSubmit(event) {
    event.preventDefault();
    
    const btn = document.getElementById('hustler-submit-btn');
    const status = document.getElementById('hustler-form-status');

    if (btn) {
        btn.disabled = true;
        btn.textContent = "Submitting...";
    }
    if (status) status.classList.add('hidden');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        alert("Session expired. Please login again.");
        if (btn) btn.disabled = false;
        return;
    }

    const payload = {
        user_id: user.id,
        full_name: document.getElementById('hustler-name')?.value,
        registration_id: document.getElementById('hustler-reg-id')?.value,
        course_name: document.getElementById('hustler-course')?.value,
        email_id: document.getElementById('hustler-email')?.value
    };

    const { error } = await supabase.from('hustler_id_applications').insert([payload]);

    if (status) {
        if (error) {
            status.textContent = "Error: " + error.message;
            status.className = "text-center text-xs font-bold mt-4 text-red-500 block";
        } else {
            status.textContent = "Application Submitted Successfully! We will review it shortly.";
            status.className = "text-center text-xs font-bold mt-4 text-green-500 block";
            setTimeout(() => toggleHustlerModal(false), 2000);
        }
    }
    
    if (btn) {
        btn.disabled = false;
        btn.innerHTML = `Submit Application <i data-lucide="send" class="w-4 h-4"></i>`;
        if (typeof window !== 'undefined' && window.lucide) {
            window.lucide.createIcons();
        }
    }
}

// Roadmap Rendering
export function renderCompactRoadmap(roadmap) {
    const container = document.getElementById('roadmap-items-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    roadmap.forEach((item, i) => {
        const isEven = i % 2 === 0;
        const node = document.createElement('div');
        node.className = `roadmap-item relative flex items-center md:justify-center w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`;
        node.innerHTML = `
            <div class="flex-1 ml-16 md:ml-0 ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}">
                <div class="glass-card p-4 rounded-2xl group hover:border-primary/50">
                    <h4 class="text-sm font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">${item.skill_name}</h4>
                    <p class="text-[10px] text-slate-500 leading-tight line-clamp-1 group-hover:line-clamp-none transition-all">${item.description}</p>
                </div>
            </div>
            <div class="absolute left-10 md:left-1/2 step-node rounded-xl -translate-x-1/2 transform scale-90 md:scale-100 font-black text-[10px] text-primary">
                ${i + 1}
            </div>
            <div class="hidden md:block flex-1"></div>
        `;
        container.appendChild(node);
    });
    
    if (typeof window !== 'undefined' && window.lucide) {
        window.lucide.createIcons();
    }
}

// Dashboard Data Fetching
export async function fetchDashboardData(userId) {
    try {
        // Profile
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
        if (profile) {
            const welcomeMsg = document.getElementById('welcome-message');
            if (welcomeMsg && profile.full_name) {
                const firstName = profile.full_name.split(' ')[0];
                welcomeMsg.textContent = `Welcome back, ${firstName}!`;
            }
            
            if (profile.avatar_url) {
                const desktopAvatar = document.getElementById('desktop-avatar-img');
                const mobileAvatar = document.getElementById('mobile-nav-img');
                const desktopContainer = document.getElementById('desktop-profile-avatar');
                const mobileContainer = document.getElementById('mobile-nav-avatar');
                
                if (desktopAvatar) desktopAvatar.src = profile.avatar_url;
                if (mobileAvatar) mobileAvatar.src = profile.avatar_url;
                if (desktopContainer) desktopContainer.classList.remove('hidden');
                if (mobileContainer) mobileContainer.classList.remove('hidden');
            }
            
            // Prefill modal name
            const hustlerNameInput = document.getElementById('hustler-name');
            if (hustlerNameInput && profile.full_name) {
                hustlerNameInput.value = profile.full_name;
            }
        }

        // Skills
        const { data: skills } = await supabase.from('user_skills').select('skill_name').eq('user_id', userId);
        const skillContainer = document.getElementById('skills-container');
        if (skillContainer) {
            skillContainer.innerHTML = (skills?.length) 
                ? skills.map(s => `<span class="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-[10px] font-bold uppercase">${s.skill_name}</span>`).join('') 
                : '<p class="text-xs text-slate-400">Add skills...</p>';
        }

        // Target Role
        const { data: role } = await supabase.from('target_roles').select('*').eq('user_id', userId).single();
        if (role) {
            const roleNameEl = document.getElementById('target-role-name');
            const roleDescEl = document.getElementById('target-role-desc');
            const roadmapTitleEl = document.getElementById('roadmap-title');
            
            if (roleNameEl) roleNameEl.textContent = role.role_name;
            if (roleDescEl) roleDescEl.textContent = role.description;
            if (roadmapTitleEl) roadmapTitleEl.innerHTML = `Path to <span class="text-primary">${role.role_name}</span>`;
        }

        // Latest Analysis
        const { data: latest } = await supabase.from('analyses').select('id, match_percentage').eq('user_id', userId).order('created_at', { ascending: false }).limit(1).single();
        if (latest) {
            const matchText = document.getElementById('analysis-match-text');
            const circleFg = document.getElementById('analysis-circle-fg');
            
            if (matchText) matchText.textContent = `${latest.match_percentage}%`;
            if (circleFg) circleFg.style.strokeDasharray = `${latest.match_percentage}, 100`;

            // Roadmap
            const { data: roadmap } = await supabase.from('skill_gaps').select('*').eq('analysis_id', latest.id);
            if (roadmap?.length) {
                renderCompactRoadmap(roadmap);
            }
        }

        // Enrollments
        const { data: enroll } = await supabase.from('enrollments').select('*, courses(title)').eq('user_id', userId);
        if (enroll?.length) {
            const mainCourse = enroll[0];
            
            const courseBadge = document.getElementById('course-count-badge');
            const attendanceValue = document.getElementById('attendance-value');
            const attendanceBar = document.getElementById('attendance-bar');
            const performanceValue = document.getElementById('performance-value');
            const performanceBar = document.getElementById('performance-bar');
            const suggestionsText = document.getElementById('suggestions-text');
            
            if (courseBadge) courseBadge.textContent = `${enroll.length} Tracks`;
            if (attendanceValue) attendanceValue.textContent = `${mainCourse.attendance_percentage}%`;
            if (attendanceBar) attendanceBar.style.width = `${mainCourse.attendance_percentage}%`;
            if (performanceValue) performanceValue.textContent = `${mainCourse.performance_score}%`;
            if (performanceBar) performanceBar.style.width = `${mainCourse.performance_score}%`;
            if (suggestionsText) suggestionsText.textContent = mainCourse.suggestions || "Focus on building proof projects.";

            // Projects
            const { data: proj } = await supabase.from('course_projects').select('*').eq('enrollment_id', mainCourse.id);
            const projectsList = document.getElementById('projects-list');
            if (projectsList) {
                projectsList.innerHTML = proj?.map(p => `<div class="p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-xs font-bold">${p.project_name}</div>`).join('') || '<p class="text-xs text-slate-400">None started.</p>';
            }

            // Exams
            const { data: exams } = await supabase.from('course_exams').select('*').eq('enrollment_id', mainCourse.id);
            const examsList = document.getElementById('exams-list');
            if (examsList) {
                examsList.innerHTML = exams?.map(e => `<div class="flex justify-between p-2 text-xs font-bold border-b border-slate-50 dark:border-white/5 last:border-0"><span>${e.exam_title}</span><span class="text-secondary">${e.result_grade || 'Pending'}</span></div>`).join('') || '<p class="text-xs text-slate-400">No exams.</p>';
            }
        }

    } catch (e) {
        console.error('Dashboard data fetch error:', e);
    }
}

// Main Initialization
export async function initDashboard() {
    // Set current date
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        dateEl.textContent = new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    // Initialize Lucide icons
    if (typeof window !== 'undefined' && window.lucide) {
        window.lucide.createIcons();
    }

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        window.location.href = '/login';
        return;
    }

    // Setup logout
    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) {
        logoutBtn.onclick = async () => {
            await supabase.auth.signOut();
            window.location.href = '/';
        };
    }

    // Initialize components
    initTheme();
    initSidebar();

    // Setup hustler form
    const hustlerForm = document.getElementById('hustler-id-form');
    if (hustlerForm) {
        hustlerForm.onsubmit = handleHustlerFormSubmit;
    }

    // Expose toggleHustlerModal to window for onclick handlers
    if (typeof window !== 'undefined') {
        window.toggleHustlerModal = toggleHustlerModal;
    }

    // Fetch dashboard data
    await fetchDashboardData(user.id);
}