// lib/pages/analyzer.js

import { supabase } from '../supabase';

export const roleOptions = {
    "Computer Science (CSE)": [
        { label: "Software Development & Engineering", options: [
            "Software Developer",
            "Front-End Developer",
            "Back-End Developer",
            "Full-Stack Developer",
            "Mobile Application Developer (iOS/Android)",
            "Game Developer",
            "Software Architect",
            "Embedded Systems Engineer",
            "Software Development Engineer in Test (SDET)"
        ]},
        { label: "Artificial Intelligence & Machine Learning", options: [
            "AI/ML Engineer",
            "Data Scientist",
            "Data Analyst",
            "Computer Vision Engineer",
            "Natural Language Processing (NLP) Scientist",
            "Prompt Engineer"
        ]},
        { label: "Cloud, DevOps & Infrastructure", options: [
            "Cloud Engineer",
            "DevOps Engineer",
            "Site Reliability Engineer (SRE)",
            "Infrastructure Engineer",
            "Network Engineer"
        ]},
        { label: "Cybersecurity", options: [
            "Cybersecurity Analyst",
            "Security Engineer",
            "Penetration Tester (Ethical Hacker)"
        ]},
        { label: "Product & Project Management", options: [
            "Product Manager",
            "Technical Program Manager (TPM)"
        ]}
    ],
    "Information Technology (IT)": [
        { label: "IT Support & Operations", options: [
            "IT Support Specialist"
        ]},
        { label: "Infrastructure & Networking", options: [
            "Network Administrator",
            "Systems Administrator (SysAdmin)",
            "Cloud Administrator"
        ]},
        { label: "Security & Compliance", options: [
            "Security Administrator"
        ]}
    ],
    "Electronics & Communication (ECE)": [
        { label: "Core Hardware & Electronics", options: [
            "Hardware Engineer"
        ]},
        { label: "Embedded Systems & IoT", options: [
            "Embedded Systems Engineer"
        ]},
        { label: "Semiconductors & VLSI", options: [
            "VLSI Design Engineer"
        ]}
    ]
};

export let currentAnalysisPayload = null;

export function updateTargetRoles(branchValue, selectElement, setFirstAsDefault = false) {
    if (!selectElement) return null;
    
    selectElement.innerHTML = '';
    const groups = roleOptions[branchValue] || [];
    
    let firstOption = null;
    
    groups.forEach(group => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = group.label;
        
        group.options.forEach((option, index) => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            optgroup.appendChild(opt);
            
            if (!firstOption) {
                firstOption = option;
            }
        });
        
        selectElement.appendChild(optgroup);
    });
    
    return firstOption;
}

export async function handleFormSubmit(event, formData) {
    event.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        alert("Please log in to use the analyzer.");
        window.location.href = '/login';
        return;
    }

    const analysisData = {
        user_id: user.id,
        full_name: formData.fullName,
        email: formData.email,
        college_name: formData.collegeName,
        target_company: formData.targetCompany,
        branch: formData.branch,
        target_role: formData.targetRole
    };

    try {
        await supabase.from('analysis_requests').insert([analysisData]);

        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ branch: analysisData.branch, targetRole: analysisData.target_role }),
        });

        const data = await response.json();
        console.log('API Response:', data);
        
        if (!response.ok) throw new Error(data.error || 'Server unreachable.');

        currentAnalysisPayload = {
            analysisResult: data,
            targetRole: analysisData.target_role,
            userName: analysisData.full_name
        };

        return { success: true, data, userName: analysisData.full_name, targetRole: analysisData.target_role };

    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error.message };
    }
}

export function renderResults(data, userName, targetRole) {
    // Use setTimeout to ensure DOM elements are ready
    setTimeout(() => {
        const userNameEl = document.getElementById('user-name-result');
        const userRoleEl = document.getElementById('user-role-result');
        
        if (userNameEl) userNameEl.textContent = userName;
        if (userRoleEl) userRoleEl.textContent = targetRole;

        const coreSkillsCount = Object.values(data.coreFocusBySemester || {}).flat().length;
        const roadmapItemsCount = (data.personalizedRoadmap || []).length;
        const matchPercentage = Math.round((coreSkillsCount / (coreSkillsCount + roadmapItemsCount)) * 100) || 0;

        const matchText = document.getElementById('result-match-text');
        const matchCircle = document.getElementById('result-match-circle');
        
        if (matchText) matchText.textContent = `${matchPercentage}%`;
        if (matchCircle) {
            // Animate the circle
            setTimeout(() => {
                matchCircle.style.strokeDasharray = `${matchPercentage}, 100`;
            }, 100);
        }
        
        if (currentAnalysisPayload) {
            currentAnalysisPayload.confidence = matchPercentage;
        }

        const focusList = document.getElementById('core-focus-list');
        if (focusList) {
            focusList.innerHTML = '';
            Object.entries(data.coreFocusBySemester || {}).forEach(([sem, subjects]) => {
                const div = document.createElement('div');
                div.innerHTML = `<h4 class="text-[10px] font-black text-primary uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-white/5 pb-2">${sem}</h4>
                    <div class="grid gap-3 mb-6">${subjects.map(s => `
                        <div class="flex justify-between items-center p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                            <span class="text-sm font-bold">${s.name}</span>
                            <div class="flex gap-3">
                                <a href="${s.youtube}" target="_blank" rel="noopener noreferrer" class="text-red-500 opacity-60 hover:opacity-100 transition"><i class="fa-brands fa-youtube"></i></a>
                                <a href="${s.article}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-primary transition"><i class="fa-solid fa-file-lines"></i></a>
                            </div>
                        </div>`).join('')}</div>`;
                focusList.appendChild(div);
            });
        }

        const missingSkillsList = document.getElementById('missing-skills-list');
        if (missingSkillsList) {
            missingSkillsList.innerHTML = (data.criticalMissingSkills || []).map(s => 
                `<span class="px-4 py-2 bg-pink-50 dark:bg-pink-900/20 text-secondary rounded-full text-[10px] font-black uppercase border border-pink-100 dark:border-transparent">${s}</span>`
            ).join('');
        }

        const roadmapList = document.getElementById('roadmap-list');
        if (roadmapList) {
            roadmapList.innerHTML = (data.personalizedRoadmap || []).map((item, i) => `
                <div class="flex items-center justify-between p-5 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-primary/40 transition">
                    <div class="flex items-center gap-4">
                        <span class="w-8 h-8 flex items-center justify-center bg-white dark:bg-white/10 rounded-xl text-primary font-black text-[10px] shadow-sm">${i + 1}</span>
                        <p class="font-bold text-sm">${item.name}</p>
                    </div>
                    <div class="flex gap-4 text-xs font-bold">
                        <a href="${item.youtube}" target="_blank" rel="noopener noreferrer" class="text-red-500 hover:scale-105 transition">Video</a>
                        <a href="${item.article}" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-primary transition">Read</a>
                    </div>
                </div>
            `).join('');
        }

        // Reinitialize Lucide icons
        if (typeof window !== 'undefined' && window.lucide) {
            window.lucide.createIcons();
        }
    }, 200); // Small delay to ensure DOM is ready

    return true;
}

export async function saveAnalysisToSupabase() {
    if (!currentAnalysisPayload) return { success: false, error: 'No analysis data' };

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

        return { success: true };

    } catch (error) {
        console.error("Save Error:", error);
        return { success: false, error: error.message };
    }
}

export function resetCurrentAnalysis() {
    currentAnalysisPayload = null;
}