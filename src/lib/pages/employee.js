import { supabase } from '../supabase';

let currentUser = null;
let profile = null;

// ==========================
// FACE API & CAMERA
// ==========================
async function loadFaceModels() {
    const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
    try {
        if (typeof faceapi !== 'undefined') {
            await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
            await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
            await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
            console.log("FaceAPI Models Loaded");
        }
    } catch (e) {
        console.error("Model Load Error", e);
    }
}

async function startCamera() {
    const video = document.getElementById('video');
    const msg = document.getElementById('status-msg');
    const btn = document.getElementById('capture-btn');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        if (video) {
            video.srcObject = stream;
            if (msg) msg.textContent = "Please wait for video...";

            video.onplay = () => {
                if (msg) msg.textContent = "Ensure your face is clearly visible.";
                if (btn) {
                    btn.disabled = false;
                    btn.classList.replace('btn-secondary', 'btn-primary');
                }
            };
        }
    } catch (err) {
        console.error(err);
        showToast("Camera access denied.", "error");
        closeModal('camera-modal');
    }
}

function stopCamera() {
    const video = document.getElementById('video');
    if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
}

async function fetchNotifications() {
    if (!profile) return;

    const list = document.getElementById('notif-list');
    const badge = document.getElementById('notif-count');

    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('recipient_role', 'employee')
        .eq('recipient_id', profile.employee_id)
        .eq('is_read', false)
        .order('created_at', { ascending: false });

    if (error) return console.error(error);

    if (badge) {
        if (data.length > 0) {
            badge.textContent = data.length;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    if (list) {
        if (data.length === 0) {
            list.innerHTML = '<li style="padding:10px; color:#666;">No new notifications</li>';
            return;
        }

        list.innerHTML = '';
        data.forEach(n => {
            const li = document.createElement('li');
            li.textContent = n.message;
            li.className = 'unread';
            list.appendChild(li);
        });
    }
}

export function toggleNotifications() {
    const dropdown = document.getElementById('notif-dropdown');
    if (dropdown) dropdown.classList.toggle('hidden');
}

export async function markAllRead() {
    if (!profile) return;

    await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('recipient_id', profile.employee_id);

    fetchNotifications();
}

export function showSection(sectionId) {
    // Sidebar active state
    document.querySelectorAll('.nav-links button').forEach(btn => btn.classList.remove('active'));

    // Hide all
    ['dashboard', 'tasks', 'leaves'].forEach(id => {
        const section = document.getElementById(`${id}-section`);
        if (section) section.classList.add('hidden');
    });

    const currentSection = document.getElementById(`${sectionId}-section`);
    if (currentSection) currentSection.classList.remove('hidden');

    if (sectionId === 'dashboard') loadDashboardStats();
    if (sectionId === 'tasks') loadMyTasks();
    if (sectionId === 'leaves') loadMyLeaves();
}

// ==========================
// DASHBOARD & ATTENDANCE
// ==========================
async function loadDashboardStats() {
    if (!profile) return;

    // Recent Attendance
    const { data: attData } = await supabase
        .from('attendance')
        .select('*')
        .eq('employee_id', profile.employee_id)
        .order('date', { ascending: false })
        .limit(5);

    const attBody = document.querySelector('#recent-attendance-table tbody');
    if (attBody) {
        attBody.innerHTML = '';

        // Check if marked today (Local Time)
        const now = new Date();
        const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

        const presentToday = attData?.find(a => a.date === todayStr);

        const attendanceStatus = document.getElementById('attendance-status');
        const markAttendanceBtn = document.getElementById('mark-attendance-btn');

        if (presentToday) {
            if (attendanceStatus) attendanceStatus.textContent = `Checked in at ${presentToday.check_in_time}`;
            if (markAttendanceBtn) {
                markAttendanceBtn.disabled = true;
                markAttendanceBtn.innerHTML = '✅ Present';
                markAttendanceBtn.classList.replace('btn-primary', 'btn-secondary');
            }
        } else {
            if (markAttendanceBtn) markAttendanceBtn.disabled = false;
        }

        if (attData) {
            attData.forEach(r => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${formatDate(r.date)}</td>
                    <td>${r.check_in_time}</td>
                    <td>${r.status}</td>
                    <td>${r.face_verified ? '✅ Verified' : '⚠️ Manual'}</td>
                `;
                attBody.appendChild(tr);
            });
        }
    }

    // Stats: Pending Tasks
    const { count: taskCount, error: taskError } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true })
        .eq('employee_id', profile.employee_id)
        .eq('status', 'Pending');

    if (!taskError) {
        const statPendingTasks = document.getElementById('stat-pending-tasks');
        if (statPendingTasks) statPendingTasks.textContent = taskCount || 0;
    }

    // Stats: Leaves Taken (Approved)
    const { count: leaveCount, error: leaveError } = await supabase
        .from('leaves')
        .select('*', { count: 'exact', head: true })
        .eq('employee_id', profile.employee_id)
        .eq('status', 'Approved');

    if (!leaveError) {
        const statLeaves = document.getElementById('stat-leaves');
        if (statLeaves) statLeaves.textContent = leaveCount || 0;
    }

    // Stats: Attendance % (Current Month)
    const todayDate = new Date();
    const startOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
    const startOfMonthStr = `${startOfMonth.getFullYear()}-${String(startOfMonth.getMonth() + 1).padStart(2, '0')}-${String(startOfMonth.getDate()).padStart(2, '0')}`;

    const { count: presentCount, error: attError } = await supabase
        .from('attendance')
        .select('*', { count: 'exact', head: true })
        .eq('employee_id', profile.employee_id)
        .gte('date', startOfMonthStr)
        .eq('status', 'Present');

    if (!attError) {
        const today = todayDate.getDate();
        const percentage = today > 0 ? Math.round((presentCount / today) * 100) : 0;
        const statAttendance = document.getElementById('stat-attendance');
        if (statAttendance) statAttendance.textContent = `${percentage}%`;
    }
}

export async function markAttendance() {
    const modal = document.getElementById('camera-modal');
    if (modal) modal.classList.remove('hidden');
    startCamera();
}

export async function verifyAndMarkAttendance() {
    const video = document.getElementById('video');
    const statusMsg = document.getElementById('status-msg');

    if (statusMsg) statusMsg.textContent = "Analyzing face... Hold still.";

    try {
        if (typeof faceapi === 'undefined') {
            if (statusMsg) statusMsg.textContent = "Face API not loaded.";
            return;
        }

        // 1. Detect Face
        const detection = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();

        if (!detection) {
            if (statusMsg) statusMsg.textContent = "No face detected. Please try again.";
            return;
        }

        // 2. Fetch Stored Data
        const { data: facialData, error } = await supabase
            .from('facial_data')
            .select('descriptor')
            .eq('employee_id', profile.employee_id)
            .single();

        if (error || !facialData) {
            if (statusMsg) statusMsg.textContent = "No registered face data found. Contact HR.";
            return;
        }

        // 3. Compare Descriptors
        const storedDescriptor = new Float32Array(facialData.descriptor);
        const distance = faceapi.euclideanDistance(detection.descriptor, storedDescriptor);

        console.log("Face Distance:", distance);

        if (distance < 0.6) {
            if (statusMsg) statusMsg.textContent = "✅ Verified! Marking attendance...";
            await completeAttendanceMarking();
            closeModal('camera-modal');
        } else {
            if (statusMsg) statusMsg.textContent = "❌ Face mismatch! Authentication failed.";
        }

    } catch (err) {
        console.error(err);
        if (statusMsg) statusMsg.textContent = "Error during verification: " + err.message;
    }
}

async function completeAttendanceMarking() {
    if (!profile) return;

    const now = new Date();
    const localDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const { error } = await supabase.from('attendance').insert([{
        employee_id: profile.employee_id,
        date: localDateStr,
        check_in_time: now.toLocaleTimeString(),
        face_verified: true,
        status: 'Present'
    }]);

    if (error) {
        showToast(error.message, 'error');
    } else {
        await supabase.from('notifications').insert([{
            recipient_role: 'admin',
            recipient_id: null,
            type: 'attendance',
            message: `${profile.full_name} has marked attendance.`
        }]);

        showToast('Attendance Marked Successfully!', 'success');
        loadDashboardStats();
    }
}

// ==========================
// TASKS
// ==========================
async function loadMyTasks() {
    if (!profile) return;

    console.log("Loading tasks for:", profile.employee_id);
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('employee_id', profile.employee_id)
        .order('assigned_at', { ascending: false });

    console.log("Tasks Data:", data, "Error:", error);

    const tbody = document.querySelector('#my-tasks-table tbody');
    if (tbody) {
        tbody.innerHTML = '';

        if (data) {
            data.forEach(task => {
                const action = task.status === 'Pending' || task.status === 'Rejected'
                    ? `<button class="btn-primary" style="font-size:0.8rem; padding: 0.25rem 0.5rem;" onclick="window.openSubmitTask(${task.id})">Submit</button>`
                    : '-';

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${task.title}</td>
                    <td style="max-width: 200px; white-space: normal;">${task.description || '-'}</td>
                    <td>${formatDate(task.assigned_at)}</td>
                    <td>${formatDate(task.deadline)}</td>
                    <td>${task.priority}</td>
                    <td><span class="status-badge status-${task.status.toLowerCase()}">${task.status}</span></td>
                    <td>${action}</td>
                `;
                tbody.appendChild(tr);
            });
        }
    }
}

export function openSubmitTask(id) {
    const taskIdInput = document.getElementById('submit-task-id');
    const modal = document.getElementById('submit-task-modal');

    if (taskIdInput) taskIdInput.value = id;
    if (modal) modal.classList.remove('hidden');
}

export async function handleSubmitTask(e) {
    e.preventDefault();

    const id = document.getElementById('submit-task-id')?.value;
    const notes = document.getElementById('submission-link')?.value;

    const { error } = await supabase.from('tasks').update({
        status: 'Submitted',
        submission_link: notes,
        submitted_at: new Date().toISOString()
    }).eq('id', id);

    if (error) {
        showToast(error.message, 'error');
    } else {
        await supabase.from('notifications').insert([{
            recipient_role: 'admin',
            recipient_id: null,
            type: 'submission',
            message: `${profile.full_name} submitted task (ID: ${id})`
        }]);

        showToast('Task Submitted!', 'success');
        closeModal('submit-task-modal');
        loadMyTasks();
    }
}

export function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('active');
}

// ==========================
// LEAVES
// ==========================
async function loadMyLeaves() {
    if (!profile) return;

    const { data, error } = await supabase
        .from('leaves')
        .select('*')
        .eq('employee_id', profile.employee_id)
        .order('created_at', { ascending: false });

    const tbody = document.querySelector('#my-leaves-table tbody');
    if (tbody) {
        tbody.innerHTML = '';

        if (data) {
            data.forEach(leave => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${formatDate(leave.start_date)}</td>
                    <td>${formatDate(leave.end_date)}</td>
                    <td>${leave.reason}</td>
                    <td><span class="status-badge status-${leave.status.toLowerCase()}">${leave.status}</span></td>
                    <td>${leave.admin_remarks || '-'}</td>
                `;
                tbody.appendChild(tr);
            });
        }
    }
}

export function openLeaveModal() {
    const modal = document.getElementById('apply-leave-modal');
    if (modal) modal.classList.remove('hidden');
}

export async function handleApplyLeave(e) {
    e.preventDefault();

    const start = document.getElementById('leave-start')?.value;
    const end = document.getElementById('leave-end')?.value;
    const reason = document.getElementById('leave-reason')?.value;

    const { error } = await supabase.from('leaves').insert([{
        employee_id: profile.employee_id,
        start_date: start,
        end_date: end,
        reason: reason,
        status: 'Pending'
    }]);

    if (error) {
        showToast(error.message, 'error');
    } else {
        await supabase.from('notifications').insert([{
            recipient_role: 'admin',
            recipient_id: null,
            type: 'leave_application',
            message: `${profile.full_name} applied for leave (${start} to ${end})`
        }]);

        showToast('Leave Application Sent!', 'success');
        closeModal('apply-leave-modal');
        loadMyLeaves();
    }
}

// ==========================
// UTILS
// ==========================
export function logoutUser() {
    supabase.auth.signOut().then(() => window.location.href = '/');
}

export function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
    
    if (id === 'camera-modal') {
        stopCamera();
    }
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
}

function showToast(message, type = 'info') {
    // Simple toast implementation
    console.log(`[${type.toUpperCase()}] ${message}`);
    alert(message); // Replace with actual toast UI
}

// ==========================
// INITIALIZATION
// ==========================
export async function initEmployeeDashboard() {
    // 1. Check Session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
        window.location.href = '/';
        return;
    }

    // 2. Derive Employee ID from the Auth Email
    const magicEmail = session.user.email;
    const derivedEmpId = magicEmail.split('@')[0].toUpperCase();

    // 3. Fetch Profile
    const { data: empData, error: dbError } = await supabase
        .from('employees')
        .select('*')
        .or(`email.eq.${session.user.email},employee_id.eq.${derivedEmpId}`)
        .maybeSingle();

    if (dbError || !empData) {
        console.error("Fetch Error:", dbError);
        alert(`Employee profile not found.\nSession Email: ${session.user.email}\nDerived ID: ${derivedEmpId}`);
        await supabase.auth.signOut();
        window.location.href = '/';
        return;
    }

    profile = empData;
    currentUser = session.user;

    // 4. Update UI
    const welcomeName = document.getElementById('welcome-name');
    const sidebarName = document.getElementById('sidebar-user-name');
    const sidebarId = document.getElementById('sidebar-user-id');

    if (welcomeName) welcomeName.textContent = profile.full_name;
    if (sidebarName) sidebarName.textContent = profile.full_name;
    if (sidebarId) sidebarId.textContent = profile.employee_id;

    // 5. Load Data
    showSection('dashboard');
    fetchNotifications();
    setInterval(fetchNotifications, 30000);

    // 6. Load AI Models
    loadFaceModels();
}

export function initEmployeeListeners() {
    // Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            console.log('Sidebar toggled:', sidebar.classList.contains('active'));
        });

        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            });
        }
    }

    // Notification Button Listener
    const notifBtn = document.getElementById('notif-btn');
    if (notifBtn) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleNotifications();
        });
    }

    // Close notifications when clicking elsewhere
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('notif-dropdown');
        if (dropdown && !dropdown.classList.contains('hidden') && !e.target.closest('.notification-wrapper')) {
            dropdown.classList.add('hidden');
        }
    });

    // Capture Button Listener
    const captureBtn = document.getElementById('capture-btn');
    if (captureBtn) {
        captureBtn.addEventListener('click', verifyAndMarkAttendance);
    }

    // Expose functions to window for inline onclick handlers
    if (typeof window !== 'undefined') {
        window.openSubmitTask = openSubmitTask;
        window.showSection = showSection;
        window.markAttendance = markAttendance;
        window.toggleSidebar = toggleSidebar;
        window.openLeaveModal = openLeaveModal;
        window.logoutUser = logoutUser;
        window.closeModal = closeModal;
        window.markAllRead = markAllRead;
    }
}