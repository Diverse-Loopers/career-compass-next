 
        lucide.createIcons();

        const SUPABASE_URL = 'https://tjqsmkaiajdpotmafqvw.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqcXNta2FpYWpkcG90bWFmcXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5ODA3NDIsImV4cCI6MjA3MTU1Njc0Mn0.9710q9W5EFfCagj340AizUSKiOXYApy0xkTFszFjO8o';
        const { createClient } = supabase;
        const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        let currentUser = null;

        // --- Theme Management ---
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');

        function setTheme(isDark) {
            if (isDark) {
                document.documentElement.classList.add('dark');
                themeIcon.setAttribute('data-lucide', 'sun');
                themeText.textContent = 'Light Mode';
            } else {
                document.documentElement.classList.remove('dark');
                themeIcon.setAttribute('data-lucide', 'moon');
                themeText.textContent = 'Dark Mode';
            }
            lucide.createIcons();
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

        themeToggle.onclick = () => setTheme(!document.documentElement.classList.contains('dark'));
        if (localStorage.getItem('theme') === 'dark') setTheme(true);

        // --- Tab Management ---
        window.switchTab = (tab) => {
            ['profile', 'career', 'account'].forEach(t => {
                document.getElementById(`view-${t}`).classList.add('hidden');
                document.getElementById(`tab-${t}`).classList.remove('active', 'text-primary');
                document.getElementById(`tab-${t}`).classList.add('text-slate-400');
            });
            document.getElementById(`view-${tab}`).classList.remove('hidden');
            document.getElementById(`tab-${tab}`).classList.add('active', 'text-primary');
            document.getElementById(`tab-${tab}`).classList.remove('text-slate-400');
        };

        // --- UI Helpers ---
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const icon = document.getElementById('toast-icon');
            toast.className = `fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl transform transition-all duration-500 flex items-center gap-3 font-bold text-sm ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`;
            icon.setAttribute('data-lucide', type === 'success' ? 'check-circle' : 'alert-circle');
            document.getElementById('toast-message').textContent = message;
            lucide.createIcons();
            toast.style.transform = 'translate(-50%, 0)';
            setTimeout(() => toast.style.transform = 'translate(-50%, -100px)', 3000);
        }

        // --- Data Loading ---
        async function init() {
            const { data: { user } } = await db.auth.getUser();
            if (!user) { window.location.href = 'login.html'; return; }
            currentUser = user;

            document.getElementById('email').value = user.email;

            // Fetch Profile
            const { data: profile, error: profileError } = await db.from('profiles').select('*').eq('id', user.id).single();

            if (profile) {
                document.getElementById('full-name').value = profile.full_name || '';
                document.getElementById('bio').value = profile.bio || '';
                if (profile.avatar_url) {
                    const img = document.getElementById('avatar-preview');
                    img.src = profile.avatar_url;
                    img.classList.remove('hidden');
                    document.getElementById('avatar-placeholder').classList.add('hidden');
                }
            }

            // Fetch Target Role
            const { data: role } = await db.from('target_roles').select('*').eq('user_id', user.id).single();
            if (role) {
                document.getElementById('target-role').value = role.role_name || '';
                document.getElementById('role-description').value = role.description || '';
            }

            loadSkills();
        }

        async function loadSkills() {
            const { data: skills } = await db.from('user_skills').select('*').eq('user_id', currentUser.id);
            const container = document.getElementById('skills-list');
            if (!skills?.length) {
                container.innerHTML = '<p class="text-xs text-slate-400 italic">No skills listed in your profile.</p>';
                return;
            }
            container.innerHTML = skills.map(s => `
                <div class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold shadow-sm">
                    ${s.skill_name}
                    <button onclick="removeSkill('${s.id}')" class="text-slate-300 hover:text-red-500 transition"><i data-lucide="x" class="w-3 h-3"></i></button>
                </div>
            `).join('');
            lucide.createIcons();
        }

        // --- Actions ---
        document.getElementById('profile-form').onsubmit = async (e) => {
            e.preventDefault();
            const full_name = document.getElementById('full-name').value;
            const bio = document.getElementById('bio').value;

            // FIX: Ensure timestamp is formatted correctly as ISO string
            const { error } = await db.from('profiles').upsert({
                id: currentUser.id,
                full_name,
                bio,
                updated_at: new Date().toISOString()
            });

            if (!error) showToast('Profile updated successfully!');
            else {
                console.error("Profile update error:", error);
                showToast('Failed to update profile. Check console for details.', 'error');
            }
        };

        document.getElementById('avatar-input').onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            showToast('Uploading avatar...');
            const fExt = file.name.split('.').pop();
            const fPath = `${currentUser.id}/${Date.now()}.${fExt}`;

            const { data, error: uploadError } = await db.storage.from('avatars').upload(fPath, file);

            if (uploadError) { showToast('Upload failed.', 'error'); return; }

            const { data: urlData } = db.storage.from('avatars').getPublicUrl(fPath);
            const avatar_url = urlData.publicUrl;

            await db.from('profiles').update({ avatar_url }).eq('id', currentUser.id);

            const preview = document.getElementById('avatar-preview');
            preview.src = avatar_url;
            preview.classList.remove('hidden');
            document.getElementById('avatar-placeholder').classList.add('hidden');
            showToast('Avatar updated!');
        };

        document.getElementById('add-skill-btn').onclick = async () => {
            const input = document.getElementById('new-skill-input');
            const name = input.value.trim();
            if (!name) return;

            const { error } = await db.from('user_skills').insert({
                user_id: currentUser.id,
                skill_name: name
            });

            if (!error) { input.value = ''; loadSkills(); }
            else showToast('Skill already exists or failed to add.', 'error');
        };

        window.removeSkill = async (id) => {
            const { error } = await db.from('user_skills').delete().eq('id', id);
            if (!error) loadSkills();
        };

        document.getElementById('save-career-btn').onclick = async () => {
            const role_name = document.getElementById('target-role').value;
            const description = document.getElementById('role-description').value;

            // FIX: Explicitly handle conflict on user_id for non-primary-key upsert
            const { error } = await db.from('target_roles').upsert({
                user_id: currentUser.id,
                role_name,
                description
            }, { onConflict: 'user_id' });

            if (!error) showToast('Career targets synced!');
            else showToast('Update failed.', 'error');
        };

        window.resetPassword = async () => {
            const { error } = await db.auth.resetPasswordForEmail(currentUser.email, {
                redirectTo: window.location.origin + '/settings.html',
            });
            if (!error) showToast('Reset link sent to your email!');
        };

        document.getElementById('delete-account-btn').onclick = () => {
            if (confirm("Are you absolutely sure? This cannot be undone.")) {
                showToast("Account deletion request initiated...", "error");
                // Note: Auth account deletion requires service role or Edge Function
            }
        };

        init();
    