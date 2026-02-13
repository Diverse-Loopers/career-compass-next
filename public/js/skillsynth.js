
        lucide.createIcons();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.fade-in, .reveal').forEach(el => observer.observe(el));

        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileToggle.onclick = () => mobileMenu.classList.toggle('hidden');
        mobileMenu.onclick = (e) => { if(e.target.closest('a')) mobileMenu.classList.add('hidden'); };

        // --- Supabase Config ---
        const SUPABASE_URL = 'https://tjqsmkaiajdpotmafqvw.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqcXNta2FpYWpkcG90bWFmcXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5ODA3NDIsImV4cCI6MjA3MTU1Njc0Mn0.9710q9W5EFfCagj340AizUSKiOXYApy0xkTFszFjO8o';
        const { createClient } = supabase;
        const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        // --- Load Wall of Fame Achievers (Latest 10) ---
        async function loadAchievers() {
            const grid = document.getElementById('achiever-grid');
            try {
                const { data: achievers, error } = await _supabase
                    .from('wall_of_fame')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(10);

                if (error || !achievers || achievers.length === 0) {
                    grid.innerHTML = `<div class="col-span-full py-10 text-center text-slate-400 italic font-medium">Achievers are currently being updated. Check back soon!</div>`;
                    return;
                }

                grid.innerHTML = achievers.map(a => `
                    <div class="achiever-card reveal group">
                        <img src="${a.image_url }" class="achiever-img grayscale-0 group-hover:grayscale-0" alt="${a.name}">
                        <div class="achiever-overlay">
                            <h4 class="text-2xl font-heading font-black text-white italic tracking-tight">${a.name}</h4>
                            <p class="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">${a.role_track}</p>
                            
                            <div class="achiever-details">
                                <p class="text-xs text-slate-300 leading-relaxed mb-6 font-medium">${a.project_description}</p>
                                <div class="flex gap-3">
                                    <a href="${a.project_link || '#'}" target="_blank" class="flex-1 py-3 bg-white text-dark text-center rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition">View Project</a>
                                    <a href="${a.linkedin_url || '#'}" target="_blank" class="w-12 h-12 flex items-center justify-center bg-white/10 text-white rounded-xl hover:bg-blue-600 transition"><i data-lucide="linkedin" class="w-4 h-4"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                lucide.createIcons();
                document.querySelectorAll('#achiever-grid .reveal').forEach(el => observer.observe(el));

            } catch (err) {
                console.error(err);
                grid.innerHTML = `<div class="col-span-full text-center text-red-400 italic">Failed to synchronize achievers.</div>`;
            }
        }

        // --- Load Dynamic Events (From Admin) ---
        async function loadEvents() {
            const grid = document.getElementById('dynamic-events-grid');
            try {
                const { data: events, error } = await _supabase
                    .from('events')
                    .select('*')
                    .order('date', { ascending: true });

                if (error || !events || events.length === 0) {
                    grid.innerHTML = `<div class="col-span-full py-10 text-center text-slate-400 italic font-medium">No upcoming events found.</div>`;
                    return;
                }

                grid.innerHTML = events.map(e => {
                    const eventDate = new Date(e.date);
                    const now = new Date();
                    const isPassed = eventDate < now;
                    const statusBadge = isPassed 
                        ? `<span class="px-3 py-1 bg-red-50 text-red-600 text-[9px] font-bold rounded-lg uppercase tracking-wider">Passed</span>`
                        : `<span class="px-3 py-1 bg-green-50 text-green-600 text-[9px] font-bold rounded-lg uppercase tracking-wider">Upcoming</span>`;

                    return `
                    <div class="bg-white p-8 md:p-10 rounded-[3.5rem] border border-slate-200 reveal flex flex-col md:flex-row gap-8 group hover:border-primary transition duration-500">
                        <div class="w-16 h-16 shrink-0 bg-indigo-50 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition duration-500">
                            <i data-lucide="${getIconForEvent(e.title)}"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex justify-between items-start mb-2">
                                <span class="text-[10px] font-black uppercase text-primary tracking-widest">${eventDate.toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'})}</span>
                                ${statusBadge}
                            </div>
                            <h4 class="font-bold text-xl mb-3 text-slate-900">${e.title}</h4>
                            <p class="text-sm text-slate-500 leading-relaxed mb-6 font-medium italic line-clamp-2">${e.description}</p>
                            <a href="events.html?id=${e.id}" class="inline-flex items-center gap-2 text-xs font-black uppercase text-primary hover:gap-3 transition-all">
                                Get Details <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </a>
                        </div>
                    </div>
                `}).join('');
                
                lucide.createIcons();
                document.querySelectorAll('#dynamic-events-grid .reveal').forEach(el => observer.observe(el));

            } catch (err) {
                console.error(err);
                grid.innerHTML = `<div class="col-span-full text-center text-red-400 italic">Event sync error.</div>`;
            }
        }

        function getIconForEvent(title) {
            const t = title.toLowerCase();
            if(t.includes('game')) return 'gamepad-2';
            if(t.includes('ai') || t.includes('ml')) return 'brain-circuit';
            if(t.includes('web') || t.includes('code')) return 'code';
            if(t.includes('ar') || t.includes('vr')) return 'box';
            if(t.includes('career') || t.includes('webinar')) return 'compass';
            return 'calendar';
        }

        // --- Hiring Form Submission ---
        const hiringForm = document.getElementById('talent-request-form');
        const formMsg = document.getElementById('form-msg');

        hiringForm.onsubmit = async (e) => {
            e.preventDefault();
            formMsg.classList.remove('hidden');
            formMsg.textContent = "Processing talent request...";
            formMsg.className = "block p-4 rounded-xl text-sm font-bold bg-indigo-50 text-primary animate-pulse mt-4";
            
            const formData = new FormData(hiringForm);
            const payload = Object.fromEntries(formData);

            try {
                const { error } = await _supabase.from('hiring_inquiries').insert([payload]);
                if (error) throw error;
                formMsg.textContent = "Success! Our talent team will contact you shortly.";
                formMsg.className = "block p-4 rounded-xl text-sm font-bold bg-green-50 text-green-600 mt-4 animate-none";
                hiringForm.reset();
            } catch (err) {
                formMsg.textContent = "Submission failed. Please check connection.";
                formMsg.className = "block p-4 rounded-xl text-sm font-bold bg-red-50 text-red-600 mt-4 animate-none";
            }
        };

        // Initialize Page
        loadAchievers();
        loadEvents();
   