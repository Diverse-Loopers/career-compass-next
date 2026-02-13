
        lucide.createIcons();

        // --- Supabase Config ---
        const SUPABASE_URL = 'https://tjqsmkaiajdpotmafqvw.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqcXNta2FpYWpkcG90bWFmcXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5ODA3NDIsImV4cCI6MjA3MTU1Njc0Mn0.9710q9W5EFfCagj340AizUSKiOXYApy0xkTFszFjO8o';
        const { createClient } = supabase;
        const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        // --- Mobile Menu Logic ---
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) {
                mobileMenu.classList.add('hidden');
            }
        });

        // --- FORM SUBMISSION Logic (Preserved) ---
        const uniForm = document.getElementById('uni-contact-form');
        const uniMessage = document.getElementById('uni-message');

        if (uniForm) {
            uniForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                uniMessage.classList.remove('hidden');
                uniMessage.textContent = "Processing Inquiry...";
                uniMessage.className = "block p-4 rounded-xl text-sm font-bold bg-blue-50 text-primary animate-pulse mt-4";

                const formData = new FormData(uniForm);
                const data = {
                    university_name: formData.get('university_name'),
                    contact_person_name: formData.get('contact_person'),
                    designation: formData.get('designation'),
                    email_id: formData.get('email'),
                    contact_number: formData.get('phone'),
                    message: formData.get('message'),
                };

                try {
                    const { error } = await _supabase.from('university_contacts').insert([data]);
                    if (error) throw error;

                    uniMessage.textContent = "Success! We have received your inquiry.";
                    uniMessage.className = "block p-4 rounded-xl text-sm font-bold bg-green-50 text-green-600 mt-4";
                    uniForm.reset();
                } catch (err) {
                    uniMessage.textContent = "Submission failed. Please try again.";
                    uniMessage.className = "block p-4 rounded-xl text-sm font-bold bg-red-50 text-red-600 mt-4";
                }
            });
        }

        // --- Animations & Particles ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        const canvas = document.getElementById('hero-canvas');
        const ctx = canvas.getContext('2d');
        const heroSection = document.getElementById('hero-section');
        let pts = [];

        function resize() {
            if (!heroSection) return;
            canvas.width = window.innerWidth;
            canvas.height = heroSection.offsetHeight;
        }

        function create() {
            pts = [];
            for (let i = 0; i < 40; i++) pts.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                s: Math.random() * 2
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#3b82f6';
            pts.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', () => { resize(); create(); });
        resize(); create(); draw();


    