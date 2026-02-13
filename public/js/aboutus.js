
    // Setup Scene
    const scene = new THREE.Scene();
    // Add fog for depth
    scene.fog = new THREE.FogExp2(0x0f172a, 0.002);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    const container = document.getElementById("canvas-container");
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create Particles (Nodes)
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color(0x6366f1); // Indigo
    const color2 = new THREE.Color(0x2dd4bf); // Teal

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Spread particles in a wide space
      posArray[i] = (Math.random() - 0.5) * 25; // x
      posArray[i + 1] = (Math.random() - 0.5) * 25; // y
      posArray[i + 2] = (Math.random() - 0.5) * 25; // z

      // Mix colors
      const mixedColor = Math.random() > 0.5 ? color1 : color2;
      colorsArray[i] = mixedColor.r;
      colorsArray[i + 1] = mixedColor.g;
      colorsArray[i + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));

    // Material for particles
    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    // Create the particle system (Mesh)
    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // Add geometric shapes (Torus knots to represent "Loops")
    const loopGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const loopMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    });
    const loopMesh = new THREE.Mesh(loopGeometry, loopMaterial);
    scene.add(loopMesh);

    camera.position.z = 5;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    });

    // Scroll Interaction
    let scrollY = 0;
    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
      const elapsedTime = clock.getElapsedTime();

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      // Rotate entire particle system slowly
      particlesMesh.rotation.y = 0.1 * elapsedTime;
      particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
      particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);

      // Rotate the background "Loop"
      loopMesh.rotation.z = -0.1 * elapsedTime;
      loopMesh.rotation.x = scrollY * 0.0005; // Rotate based on scroll

      // Gentle wave effect on particles
      // Note: Mutating position attribute directly is expensive, so we do simpler transformations

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    // Handle Resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Scroll Reveal Logic (Intersection Observer)
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });
 

//   <!-- Supabase Registration Logic -->
 
    const SUPABASE_URL = "https://tjqsmkaiajdpotmafqvw.supabase.co";
    const SUPABASE_ANON_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqcXNta2FpYWpkcG90bWFmcXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5ODA3NDIsImV4cCI6MjA3MTU1Njc0Mn0.9710q9W5EFfCagj340AizUSKiOXYApy0xkTFszFjO8o";

    const { createClient } = supabase;
    const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const hustlerForm = document.getElementById("hustler-form");
    const hustlerMessage = document.getElementById("hustler-message");

    if (hustlerForm) {
      hustlerForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        hustlerMessage.classList.add("hidden");

        // 1. Basic Validation
        if (!e.target.checkValidity()) {
          hustlerMessage.textContent =
            "Please fill out all required fields correctly.";
          hustlerMessage.style.color = "#ef4444";
          hustlerMessage.classList.remove("hidden");
          return;
        }

        // 2. Collect Data
        const formData = new FormData(hustlerForm);
        const data = {
          full_name: formData.get("name"),
          college_name: formData.get("college"),
          email_id: formData.get("email"),
          contact_number: formData.get("contact"),
          core_technology: formData.get("tech"),
          course_year: formData.get("year"),
          semester: parseInt(formData.get("semester"), 10),
          roll_no: formData.get("roll"),
        };

        // 3. Show Loading State
        hustlerMessage.textContent = "Registering...";
        hustlerMessage.style.color = "var(--color-primary)";
        hustlerMessage.classList.remove("hidden");

        try {
          // --- THE FIX STARTS HERE ---
          // 4. Safe Auth Check: We wrap this in a try/catch so it doesn't crash the whole script
          let userId = null;
          try {
            const authResponse = await _supabase.auth.getUser();
            if (authResponse && authResponse.data && authResponse.data.user) {
              userId = authResponse.data.user.id;
            }
          } catch (authError) {
            console.warn(
              "Auth check failed (proceeding as guest):",
              authError
            );
          }

          if (userId) {
            data.user_id = userId;
          }
          // --- THE FIX ENDS HERE ---

          // 5. Insert Data
          const { error } = await _supabase
            .from("hybrid_hustler_registrations")
            .insert([data]);

          if (error) {
            console.error("Supabase Insert Error:", error);

            // 6. Better Error Messages
            if (
              error.code === "23505" &&
              error.details.includes("email_id")
            ) {
              hustlerMessage.textContent =
                "Registration failed: This email address is already registered.";
            } else if (error.code === "42P01") {
              hustlerMessage.textContent =
                'System Error: The table "hybrid_hustler_registrations" does not exist.';
            } else if (error.code === "42501") {
              hustlerMessage.textContent =
                "Permission Error: RLS policy is blocking the insert. Check Supabase settings.";
            } else {
              hustlerMessage.textContent = `Registration failed: ${error.message}`;
            }
            hustlerMessage.style.color = "#ef4444";
          } else {
            // 7. Success
            const firstName = data.full_name.split(" ")[0];
            hustlerMessage.textContent = `Success! Thank you, ${firstName}! Your registration has been saved.`;
            hustlerMessage.style.color = "var(--color-primary)";
            hustlerForm.reset();
          }
        } catch (e) {
          console.error("Unexpected Registration Error:", e);
          hustlerMessage.textContent =
            "An unexpected network error occurred. Try with a different Email ID.";
          hustlerMessage.style.color = "#ef4444";
        }
      });
    }
 