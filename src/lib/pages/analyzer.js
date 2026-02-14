import { supabase } from '../supabase';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let currentAnalysisPayload = null;

const roleOptions = {
    "Computer Science (CSE)": `
        <optgroup label="Software Development & Engineering">
            <option>Software Developer</option>
            <option>Front-End Developer</option>
            <option>Back-End Developer</option>
            <option>Full-Stack Developer</option>
            <option>Mobile Application Developer (iOS/Android)</option>
            <option>Game Developer</option>
            <option>Software Architect</option>
            <option>Embedded Systems Engineer</option>
            <option>Software Development Engineer in Test (SDET)</option>
        </optgroup>
        <optgroup label="Artificial Intelligence & Machine Learning">
            <option>AI/ML Engineer</option>
            <option>Data Scientist</option>
            <option>Data Analyst</option>
            <option>Computer Vision Engineer</option>
            <option>Natural Language Processing (NLP) Scientist</option>
            <option>Prompt Engineer</option>
        </optgroup>
        <optgroup label="Cloud, DevOps & Infrastructure">
            <option>Cloud Engineer</option>
            <option>DevOps Engineer</option>
            <option>Site Reliability Engineer (SRE)</option>
            <option>Infrastructure Engineer</option>
            <option>Network Engineer</option>
        </optgroup>
        <optgroup label="Cybersecurity">
            <option>Cybersecurity Analyst</option>
            <option>Security Engineer</option>
            <option>Penetration Tester (Ethical Hacker)</option>
        </optgroup>
        <optgroup label="Product & Project Management">
            <option>Product Manager</option>
            <option>Technical Program Manager (TPM)</option>
        </optgroup>
    `,
    "Information Technology (IT)": `
        <optgroup label="IT Support & Operations">
            <option>IT Support Specialist</option>
        </optgroup>
        <optgroup label="Infrastructure & Networking">
            <option>Network Administrator</option>
            <option>Systems Administrator (SysAdmin)</option>
            <option>Cloud Administrator</option>
        </optgroup>
        <optgroup label="Security & Compliance">
            <option>Security Administrator</option>
        </optgroup>
    `,
    "Electronics & Communication (ECE)": `
        <optgroup label="Core Hardware & Electronics">
            <option>Hardware Engineer</option>
        </optgroup>
        <optgroup label="Embedded Systems & IoT">
            <option>Embedded Systems Engineer</option>
        </optgroup>
        <optgroup label="Semiconductors & VLSI">
            <option>VLSI Design Engineer</option>
        </optgroup>
    `
};

export function updateTargetRoles() {
    const branchSelect = document.getElementById('branch');
    const targetRoleSelect = document.getElementById('targetRole');
    
    if (branchSelect && targetRoleSelect) {
        const selectedBranch = branchSelect.value;
        targetRoleSelect.innerHTML = roleOptions[selectedBranch] || '';
    }
}

export async function handleFormSubmit(event) {
    event.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        alert("Please log in to use the analyzer.");
        window.location.href = '/login';
        return;
    }

    const analysisForm = document.getElementById('analysis-form');
    const formData = new FormData(analysisForm);
    
    const analysisData = {
        user_id: user.id,
        full_name: formData.get('fullName'),
        email: formData.get('email'),
        college_name: formData.get('collegeName'),
        target_company: formData.get('targetCompany'),
        branch: formData.get('branch'),
        target_role: formData.get('targetRole')
    };

    const formContainer = document.getElementById('form-container');
    const loader = document.getElementById('loader');
    const errorContainer = document.getElementById('error-message-container');
    const resultsDisplay = document.getElementById('results-display');

    formContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');
    resultsDisplay.classList.add('hidden');
    loader.classList.remove('hidden');

    try {
        await supabase.from('analysis_requests').insert([analysisData]);

        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                branch: analysisData.branch, 
                targetRole: analysisData.target_role 
            }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Server unreachable.');

        currentAnalysisPayload = {
            analysisResult: data,
            targetRole: analysisData.target_role,
            userName: analysisData.full_name
        };

        renderResults(data, analysisData.full_name, analysisData.target_role);
        resultsDisplay.classList.remove('hidden');
        resultsDisplay.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Error:', error);
        errorContainer.innerHTML = `<div class="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold mt-4"><strong>Error:</strong> ${error.message}</div>`;
        errorContainer.classList.remove('hidden');
        formContainer.classList.remove('hidden');
    } finally {
        loader.classList.add('hidden');
    }
}

export function renderResults(data, userName, targetRole) {
    document.getElementById('user-name-result').textContent = userName;
    document.getElementById('user-role-result').textContent = targetRole;

    const coreSkillsCount = Object.values(data.coreFocusBySemester || {}).flat().length;
    const roadmapItemsCount = (data.personalizedRoadmap || []).length;
    const matchPercentage = Math.round((coreSkillsCount / (coreSkillsCount + roadmapItemsCount)) * 100) || 0;

    document.getElementById('result-match-text').textContent = `${matchPercentage}%`;
    document.getElementById('result-match-circle').style.strokeDasharray = `${matchPercentage}, 100`;
    
    if (currentAnalysisPayload) {
        currentAnalysisPayload.confidence = matchPercentage;
    }

    const focusList = document.getElementById('core-focus-list');
    focusList.innerHTML = '';
    
    Object.entries(data.coreFocusBySemester).forEach(([sem, subjects]) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h4 class="text-[10px] font-black text-primary uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-white/5 pb-2">${sem}</h4>
            <div class="grid gap-3 mb-6">
                ${subjects.map(s => `
                    <div class="flex justify-between items-center p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                        <span class="text-sm font-bold">${s.name}</span>
                        <div class="flex gap-3">
                            <a href="${s.youtube}" target="_blank" class="text-red-500 opacity-60 hover:opacity-100 transition">
                                <i class="fa-brands fa-youtube"></i>
                            </a>
                            <a href="${s.article}" target="_blank" class="text-slate-400 hover:text-primary transition">
                                <i class="fa-solid fa-file-lines"></i>
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        focusList.appendChild(div);
    });

    document.getElementById('missing-skills-list').innerHTML = data.criticalMissingSkills.map(s => 
        `<span class="px-4 py-2 bg-pink-50 dark:bg-pink-900/20 text-secondary rounded-full text-[10px] font-black uppercase border border-pink-100 dark:border-transparent">${s}</span>`
    ).join('');

    document.getElementById('roadmap-list').innerHTML = data.personalizedRoadmap.map((item, i) => `
        <div class="flex items-center justify-between p-5 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-primary/40 transition">
            <div class="flex items-center gap-4">
                <span class="w-8 h-8 flex items-center justify-center bg-white dark:bg-white/10 rounded-xl text-primary font-black text-[10px] shadow-sm">${i + 1}</span>
                <p class="font-bold text-sm">${item.name}</p>
            </div>
            <div class="flex gap-4 text-xs font-bold">
                <a href="${item.youtube}" target="_blank" class="text-red-500 hover:scale-105 transition">Video</a>
                <a href="${item.article}" target="_blank" class="text-slate-500 hover:text-primary transition">Read</a>
            </div>
        </div>
    `).join('');

    if (typeof window !== 'undefined' && window.lucide) {
        window.lucide.createIcons();
    }

    const savePathBtn = document.getElementById('save-path-btn');
    const savePathNotification = document.getElementById('save-path-notification');
    
    if (savePathBtn) {
        savePathBtn.classList.remove('hidden');
        savePathBtn.disabled = false;
        savePathBtn.textContent = 'Save Results to Profile';
    }
    
    if (savePathNotification) {
        savePathNotification.classList.add('hidden');
    }
}

export async function saveAnalysisToSupabase() {
    if (!currentAnalysisPayload) return;

    const savePathBtn = document.getElementById('save-path-btn');
    const savePathNotification = document.getElementById('save-path-notification');

    if (savePathBtn) {
        savePathBtn.disabled = true;
        savePathBtn.textContent = 'Syncing...';
    }

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Auth required");

        const { analysisResult, targetRole, confidence } = currentAnalysisPayload;

        await supabase.from('target_roles').upsert({
            user_id: user.id,
            role_name: targetRole,
            description: 'Set from Path Analyzer.'
        }, { onConflict: 'user_id' });

        const { data: newAnalysis, error: analError } = await supabase.from('analyses').insert({
            user_id: user.id,
            match_percentage: confidence
        }).select('id').single();

        if (analError) throw analError;

        const roadmapItems = analysisResult.personalizedRoadmap || [];
        if (roadmapItems.length > 0) {
            const gaps = roadmapItems.map(item => ({
                user_id: user.id,
                analysis_id: newAnalysis.id,
                skill_name: item.name,
                description: `Critical skill for ${targetRole}.`
            }));
            await supabase.from('skill_gaps').insert(gaps);
        }

        if (savePathBtn) {
            savePathBtn.textContent = 'Saved! ✅';
            savePathBtn.className = "w-full md:w-auto px-8 py-3 bg-green-600 text-white rounded-xl font-bold transition";
        }
        
        if (savePathNotification) {
            savePathNotification.innerHTML = `Success! View results in your <a href="/profile" class="underline">Dashboard</a>.`;
            savePathNotification.classList.remove('hidden');
        }

    } catch (error) {
        console.error("Save Error:", error);
        if (savePathBtn) {
            savePathBtn.disabled = false;
            savePathBtn.textContent = 'Retry Saving';
        }
    }
}

export function resetView() {
    const resultsDisplay = document.getElementById('results-display');
    const formContainer = document.getElementById('form-container');
    
    if (resultsDisplay) resultsDisplay.classList.add('hidden');
    if (formContainer) formContainer.classList.remove('hidden');
    
    currentAnalysisPayload = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function setTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    const icons = document.querySelectorAll('#theme-icon, #mobile-theme-toggle i');
    icons.forEach(icon => icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon'));
    
    if (typeof window !== 'undefined' && window.lucide) {
        window.lucide.createIcons();
    }
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

export async function initAnalyzerPage() {
    if (typeof window !== 'undefined' && window.lucide) {
        window.lucide.createIcons();
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        document.getElementById('profile-btn')?.classList.remove('hidden');
        document.getElementById('footer-auth')?.classList.remove('hidden');
        document.getElementById('login-btn')?.classList.add('hidden');
        document.getElementById('mobile-profile-btn')?.classList.remove('hidden');
        document.getElementById('mobile-login-btn')?.classList.add('hidden');

        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (profile) {
            const fullNameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const footerUserName = document.getElementById('footer-user-name');
            const footerUserEmail = document.getElementById('footer-user-email');
            
            if (fullNameInput) fullNameInput.value = profile.full_name || '';
            if (emailInput) emailInput.value = user.email || '';
            if (footerUserName) footerUserName.textContent = profile.full_name;
            if (footerUserEmail) footerUserEmail.textContent = user.email;
            
            if (profile.avatar_url) {
                const avatarImgs = [
                    document.getElementById('nav-avatar-img'), 
                    document.getElementById('footer-avatar-img')
                ];
                avatarImgs.forEach(img => {
                    if (img) {
                        img.src = profile.avatar_url;
                        img.classList.remove('hidden');
                    }
                });
            }
        }
    }

    // Theme initialization
    if (localStorage.getItem('theme') === 'dark') {
        setTheme(true);
    }

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.onclick = () => mobileMenu.classList.toggle('hidden');
        mobileMenu.onclick = (e) => {
            if (e.target.closest('a')) {
                mobileMenu.classList.add('hidden');
            }
        };
    }

    // Initialize target roles
    updateTargetRoles();

    // Event listeners
    const analysisForm = document.getElementById('analysis-form');
    const backBtn = document.getElementById('back-btn');
    const branchSelect = document.getElementById('branch');
    const savePathBtn = document.getElementById('save-path-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const logoutBtn = document.getElementById('logout-btn-footer');

    if (analysisForm) {
        analysisForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', resetView);
    }
    
    if (branchSelect) {
        branchSelect.addEventListener('change', updateTargetRoles);
    }
    
    if (savePathBtn) {
        savePathBtn.addEventListener('click', saveAnalysisToSupabase);
    }
    
    if (themeToggle) {
        themeToggle.onclick = () => setTheme(!document.documentElement.classList.contains('dark'));
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.onclick = () => setTheme(!document.documentElement.classList.contains('dark'));
    }
    
    if (logoutBtn) {
        logoutBtn.onclick = async () => {
            await supabase.auth.signOut();
            window.location.reload();
        };
    }

    // Expose functions to window for inline handlers if needed
    if (typeof window !== 'undefined') {
        window.updateTargetRoles = updateTargetRoles;
        window.handleFormSubmit = handleFormSubmit;
        window.saveAnalysisToSupabase = saveAnalysisToSupabase;
        window.resetView = resetView;
        window.setTheme = setTheme;
    }
}