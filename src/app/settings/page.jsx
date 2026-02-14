'use client';

import { useState, useEffect } from 'react';
import './settings.css';
import Script from 'next/script';
import { supabase } from '@/lib/supabase';
import {
    setCurrentUser,
    showToast,
    loadProfile,
    loadTargetRole,
    loadSkills,
    updateProfile,
    uploadAvatar,
    addSkill,
    removeSkill as removeSkillFromDB,
    updateCareerTargets,
    requestPasswordReset
} from '@/lib/pages/settings';

export default function SettingsPage() {
    const [user, setUser] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    
    // Profile state
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    
    // Career state
    const [targetRole, setTargetRole] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [newSkillInput, setNewSkillInput] = useState('');

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                window.location.href = '/login';
                return;
            }
            
            setUser(user);
            setCurrentUser(user);
            setEmail(user.email);

            // Load profile data
            const profile = await loadProfile();
            if (profile) {
                setFullName(profile.full_name || '');
                setBio(profile.bio || '');
                if (profile.avatar_url) {
                    setAvatarUrl(profile.avatar_url);
                }
            }

            // Load target role
            const role = await loadTargetRole();
            if (role) {
                setTargetRole(role.role_name || '');
                setRoleDescription(role.description || '');
            }

            // Load skills
            await refreshSkills();
        };

        checkUser();

        // Check for dark mode
        if (localStorage.getItem('theme') === 'dark') {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    useEffect(() => {
        // Initialize Lucide icons
        const timer = setTimeout(() => {
            if (typeof window !== 'undefined' && window.lucide) {
                window.lucide.createIcons();
            }
        }, 100);
        return () => clearTimeout(timer);
    });

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        document.documentElement.classList.toggle('dark', newDark);
        localStorage.setItem('theme', newDark ? 'dark' : 'light');
        
        setTimeout(() => {
            if (typeof window !== 'undefined' && window.lucide) {
                window.lucide.createIcons();
            }
        }, 100);
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
    };

    const refreshSkills = async () => {
        const skillsData = await loadSkills();
        setSkills(skillsData);
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const { error } = await updateProfile(fullName, bio);
        
        if (!error) {
            showToast('Profile updated successfully!');
        } else {
            console.error("Profile update error:", error);
            showToast('Failed to update profile. Check console for details.', 'error');
        }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        showToast('Uploading avatar...');
        
        const result = await uploadAvatar(file);
        
        if (result.error) {
            showToast('Upload failed.', 'error');
            return;
        }

        setAvatarUrl(result.avatar_url);
        showToast('Avatar updated!');
    };

    const handleAddSkill = async () => {
        const name = newSkillInput.trim();
        if (!name) return;

        const { error } = await addSkill(name);

        if (!error) {
            setNewSkillInput('');
            await refreshSkills();
        } else {
            showToast('Skill already exists or failed to add.', 'error');
        }
    };

    const handleRemoveSkill = async (id) => {
        const { error } = await removeSkillFromDB(id);
        if (!error) {
            await refreshSkills();
        }
    };

    const handleSaveCareer = async () => {
        const { error } = await updateCareerTargets(targetRole, roleDescription);

        if (!error) {
            showToast('Career targets synced!');
        } else {
            showToast('Update failed.', 'error');
        }
    };

    const handleResetPassword = async () => {
        if (!user) return;
        const { error } = await requestPasswordReset(user.email);
        if (!error) {
            showToast('Reset link sent to your email!');
        }
    };

    const handleDeleteAccount = () => {
        if (confirm("Are you absolutely sure? This cannot be undone.")) {
            showToast("Account deletion request initiated...", "error");
            // Note: Auth account deletion requires service role or Edge Function
        }
    };

    return (
        <>
            
            <Script src="https://unpkg.com/lucide@latest" strategy="afterInteractive" onLoad={() => {
                if (window.lucide) window.lucide.createIcons();
            }} />

            <div className="min-h-screen">
                {/* Toast Notification */}
                <div id="toast"
                    className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl transform translate-y-[-100px] transition-transform duration-500 flex items-center gap-3 font-bold text-sm">
                    <i id="toast-icon" className="w-4 h-4"></i>
                    <span id="toast-message"></span>
                </div>

                <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <a href="/profile"
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 transition">
                                <i data-lucide="chevron-left" className="w-5 h-5 text-slate-500"></i>
                            </a>
                            <h1 className="text-3xl font-black tracking-tight">Settings</h1>
                        </div>

                        <button onClick={toggleTheme}
                            className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400">
                            <i data-lucide={isDark ? "sun" : "moon"} id="theme-icon"></i>
                        </button>
                    </div>

                    {/* Settings Container */}
                    <div className="glass-card rounded-[2.5rem] overflow-hidden shadow-sm">
                        {/* Tabs */}
                        <div className="flex border-b border-slate-100 dark:border-white/5 px-8">
                            <button onClick={() => switchTab('profile')}
                                className={`tab-btn px-6 py-5 text-sm font-bold transition ${activeTab === 'profile' ? 'active text-primary' : 'text-slate-400'}`}>
                                Profile
                            </button>
                            <button onClick={() => switchTab('career')}
                                className={`tab-btn px-6 py-5 text-sm font-bold transition ${activeTab === 'career' ? 'active text-primary' : 'text-slate-400'}`}>
                                Career & Skills
                            </button>
                            <button onClick={() => switchTab('account')}
                                className={`tab-btn px-6 py-5 text-sm font-bold transition ${activeTab === 'account' ? 'active text-primary' : 'text-slate-400'}`}>
                                Account
                            </button>
                        </div>

                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="p-8 md:p-12 space-y-10">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/10 bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                                            {avatarUrl ? (
                                                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <i data-lucide="user" className="w-12 h-12 text-slate-300"></i>
                                            )}
                                        </div>
                                        <label htmlFor="avatar-input"
                                            className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition shadow-lg">
                                            <i data-lucide="camera" className="w-4 h-4"></i>
                                            <input 
                                                type="file" 
                                                id="avatar-input" 
                                                className="hidden" 
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                            />
                                        </label>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h3 className="text-xl font-bold">Your Avatar</h3>
                                        <p className="text-sm text-slate-500">JPG or PNG. Max size of 800K.</p>
                                    </div>
                                </div>

                                <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="input-field" 
                                            placeholder="e.g. John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address (Auth)</label>
                                        <input 
                                            type="email" 
                                            value={email}
                                            className="input-field opacity-60 cursor-not-allowed" 
                                            disabled
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Bio / Headline</label>
                                        <textarea 
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            rows="3" 
                                            className="input-field"
                                            placeholder="Briefly describe yourself..."
                                        />
                                    </div>
                                    <div className="md:col-span-2 pt-4">
                                        <button type="submit"
                                            className="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl transition flex items-center justify-center gap-2">
                                            Save Changes <i data-lucide="save" className="w-4 h-4"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Career Tab */}
                        {activeTab === 'career' && (
                            <div className="p-8 md:p-12 space-y-12">
                                <section className="space-y-6">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <i data-lucide="target" className="text-primary"></i> Target Career Goal
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Target Role</label>
                                            <input 
                                                type="text" 
                                                value={targetRole}
                                                onChange={(e) => setTargetRole(e.target.value)}
                                                className="input-field"
                                                placeholder="e.g. Full Stack Developer"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Role Description (AI context)</label>
                                            <textarea 
                                                value={roleDescription}
                                                onChange={(e) => setRoleDescription(e.target.value)}
                                                rows="3" 
                                                className="input-field"
                                                placeholder="What does this role mean to you?"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-6">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <i data-lucide="award" className="text-secondary"></i> My Skill Inventory
                                    </h3>
                                    <div className="flex flex-wrap gap-3 p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
                                        {skills.length === 0 ? (
                                            <p className="text-xs text-slate-400 italic">No skills listed in your profile.</p>
                                        ) : (
                                            skills.map(skill => (
                                                <div key={skill.id} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold shadow-sm">
                                                    {skill.skill_name}
                                                    <button onClick={() => handleRemoveSkill(skill.id)} className="text-slate-300 hover:text-red-500 transition">
                                                        <i data-lucide="x" className="w-3 h-3"></i>
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input 
                                            type="text" 
                                            value={newSkillInput}
                                            onChange={(e) => setNewSkillInput(e.target.value)}
                                            className="input-field flex-1"
                                            placeholder="Add a new skill (e.g. Python)"
                                        />
                                        <button onClick={handleAddSkill}
                                            className="px-8 py-4 bg-dark text-white rounded-2xl font-bold hover:bg-black transition">
                                            Add Skill
                                        </button>
                                    </div>
                                </section>

                                <div className="pt-6">
                                    <button onClick={handleSaveCareer}
                                        className="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-bold transition">
                                        Update Career Path
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Account Tab */}
                        {activeTab === 'account' && (
                            <div className="p-8 md:p-12 space-y-8">
                                <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-white/5 space-y-6">
                                    <h3 className="font-bold">Security</h3>
                                    <p className="text-sm text-slate-500">
                                        Changing passwords and two-factor authentication management is handled via secure email link.
                                    </p>
                                    <button onClick={handleResetPassword}
                                        className="px-6 py-3 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold hover:shadow-md transition">
                                        Request Password Reset
                                    </button>
                                </div>

                                <div className="p-8 rounded-[2rem] bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10 space-y-6">
                                    <h3 className="font-bold text-red-600">Danger Zone</h3>
                                    <p className="text-sm text-red-500/80">
                                        Deleting your account is permanent. All your analysis, roadmap data, and project history will be wiped.
                                    </p>
                                    <button onClick={handleDeleteAccount}
                                        className="px-6 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition">
                                        Delete Account Forever
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
