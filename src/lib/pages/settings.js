import { supabase } from '../supabase';

export let currentUser = null;

export function setCurrentUser(user) {
    currentUser = user;
}

export function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = document.getElementById('toast-icon');
    
    if (!toast || !icon) return;
    
    toast.className = `fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl transform transition-all duration-500 flex items-center gap-3 font-bold text-sm ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`;
    icon.setAttribute('data-lucide', type === 'success' ? 'check-circle' : 'alert-circle');
    
    const messageEl = document.getElementById('toast-message');
    if (messageEl) {
        messageEl.textContent = message;
    }
    
    if (typeof window !== 'undefined' && window.lucide) {
        window.lucide.createIcons();
    }
    
    toast.style.transform = 'translate(-50%, 0)';
    setTimeout(() => {
        toast.style.transform = 'translate(-50%, -100px)';
    }, 3000);
}

export async function loadProfile() {
    if (!currentUser) return null;

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

    if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile load error:', profileError);
        return null;
    }

    return profile;
}

export async function loadTargetRole() {
    if (!currentUser) return null;

    const { data: role, error } = await supabase
        .from('target_roles')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Target role load error:', error);
        return null;
    }

    return role;
}

export async function loadSkills() {
    if (!currentUser) return [];

    const { data: skills, error } = await supabase
        .from('user_skills')
        .select('*')
        .eq('user_id', currentUser.id);

    if (error) {
        console.error('Skills load error:', error);
        return [];
    }

    return skills || [];
}

export async function updateProfile(fullName, bio) {
    if (!currentUser) return { error: 'No user' };

    const { error } = await supabase.from('profiles').upsert({
        id: currentUser.id,
        full_name: fullName,
        bio,
        updated_at: new Date().toISOString()
    });

    return { error };
}

export async function uploadAvatar(file) {
    if (!currentUser) return { error: 'No user' };

    const fExt = file.name.split('.').pop();
    const fPath = `${currentUser.id}/${Date.now()}.${fExt}`;

    const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fPath, file);

    if (uploadError) {
        return { error: uploadError };
    }

    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(fPath);
    const avatar_url = urlData.publicUrl;

    const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url })
        .eq('id', currentUser.id);

    if (updateError) {
        return { error: updateError };
    }

    return { avatar_url };
}

export async function addSkill(skillName) {
    if (!currentUser) return { error: 'No user' };

    const { error } = await supabase.from('user_skills').insert({
        user_id: currentUser.id,
        skill_name: skillName
    });

    return { error };
}

export async function removeSkill(skillId) {
    const { error } = await supabase.from('user_skills').delete().eq('id', skillId);
    return { error };
}

export async function updateCareerTargets(roleName, description) {
    if (!currentUser) return { error: 'No user' };

    const { error } = await supabase.from('target_roles').upsert({
        user_id: currentUser.id,
        role_name: roleName,
        description
    }, { onConflict: 'user_id' });

    return { error };
}

export async function requestPasswordReset(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/settings',
    });

    return { error };
}