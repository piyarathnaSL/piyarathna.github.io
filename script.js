// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const progressBar = document.getElementById('progressBar');
const navLinks = document.querySelectorAll('.nav-link');
const skillLevels = document.querySelectorAll('.skill-level');
const projectsContainer = document.getElementById('projectsContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const contactForm = document.getElementById('contactForm');
const projectModal = document.getElementById('projectModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalTech = document.getElementById('modalTech');
const modalDescription = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');
const mainContent = document.getElementById('mainContent');

// Project Creation Form Elements
const projectCreationForm = document.getElementById('projectCreationForm');
const newProjectForm = document.getElementById('newProjectForm');
const cancelProjectBtn = document.getElementById('cancelProjectBtn');

// ==================== PARTICLE.JS ====================
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#3a86ff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#4361ee',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' }
            }
        },
        retina_detect: true
    });
}

// ==================== THEME MANAGEMENT ====================
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// ==================== MOBILE MENU ====================
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1100) {
            sidebar.classList.remove('active');
        }
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});

mainContent.addEventListener('click', () => {
    if (window.innerWidth <= 1100 && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});

// ==================== SCROLL PROGRESS BAR ====================
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// ==================== ANIMATE SKILL BARS ====================
const animateSkills = () => {
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        skill.style.width = '0%';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        skill.style.width = level + '%';
                    }, 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skill);
    });

    // Add level percentage to skill bars for hover display
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        const skillBar = skill.parentElement;
        skillBar.setAttribute('data-level', level + '%');
    });

};

// Initialize skills animation
window.addEventListener('load', animateSkills);

// ==================== PROJECTS MANAGEMENT ====================
const projectsData = [
    {
        title: "ParkMate - Smart Parking System",
        description: "A desktop-based parking management system built with Java and Object-Oriented Principles to track vehicles, calculate fees, and improve administrative efficiency.",
        tech: ["Java", "OOP", "Swing GUI"],
        features: [
            "Add/remove car entries with automatic time tracking",
            "Calculate parking fees based on configurable hourly rates",
            "Real-time display of parked vehicles in a GUI table",
            "Input validation and error handling",
            "In-memory data storage for small/medium parking lots"
        ]
    },
    {
        title: "Smart Study Planner",
        description: "An AI-powered web application that generates personalized study schedules using Prolog reasoning, Flask backend, and MySQL database.",
        tech: ["Python", "Flask", "Prolog", "MySQL", "HTML/CSS/JS"],
        features: [
            "AI-based timetable generation using SWI-Prolog",
            "Web interface for inputting subjects, difficulty, and exam dates",
            "MySQL database for storing student data and schedules",
            "Responsive design for all devices",
            "Integration of Python, Prolog, and web technologies"
        ]
    },
    {
        title: "Personal Portfolio Website",
        description: "A responsive, interactive portfolio website showcasing projects and skills with dark/light mode, particle effects, and modern design.",
        tech: ["HTML5", "CSS3", "JavaScript", "Particle.js"],
        features: [
            "Fully responsive design for all screen sizes",
            "Dark/light mode toggle with localStorage memory",
            "Interactive particle.js background in hero section",
            "Animated skill bars and project modals",
            "Form validation and smooth scrolling navigation"
        ]
    }
];

// Render Projects
function renderProjects() {
    projectsContainer.innerHTML = '';

    const iconClasses = [
        'fas fa-car',
        'fas fa-calendar-check',
        'fas fa-laptop-code',
        'fas fa-globe',
        'fas fa-mobile-alt',
        'fas fa-server',
        'fas fa-robot',
        'fas fa-database'
    ];

    projectsData.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        const iconClass = iconClasses[index] || 'fas fa-project-diagram';

        projectCard.innerHTML = `
            <div class="project-img">
                <i class="${iconClass}"></i>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <button class="btn-primary view-details" data-index="${index}">View Details</button>
            </div>
        `;

        projectsContainer.appendChild(projectCard);
    });

    // Re-attach event listeners to View Details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            openProjectModal(index);
        });
    });
}

// Open Project Modal
function openProjectModal(index) {
    const project = projectsData[index];
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    modalTech.innerHTML = `
        <div class="project-tech">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
    `;

    modalFeatures.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeatures.appendChild(li);
    });

    projectModal.style.display = 'flex';
}

// Close Modal
closeModal.addEventListener('click', () => {
    projectModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.style.display = 'none';
    }
});

// ==================== PROJECT CREATION FORM ====================
// Toggle between "Add More" button and form
loadMoreBtn.addEventListener('click', function () {
    loadMoreBtn.style.display = 'none';
    projectCreationForm.style.display = 'block';
});

// Cancel adding project
cancelProjectBtn.addEventListener('click', function () {
    loadMoreBtn.style.display = 'inline-block';
    projectCreationForm.style.display = 'none';
    newProjectForm.reset();
});

// Handle new project submission
newProjectForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const title = document.getElementById('projectTitle').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const tech = document.getElementById('projectTech').value.split(',').map(t => t.trim()).filter(t => t !== '');
    const features = document.getElementById('projectFeatures').value.split('\n').map(f => f.trim()).filter(f => f !== '');

    // Basic validation
    if (!title || !description || tech.length === 0 || features.length === 0) {
        alert('Please fill all fields correctly!');
        return;
    }

    // Create new project object
    const newProject = {
        title: title,
        description: description,
        tech: tech,
        features: features
    };

    // Add to projects array
    projectsData.push(newProject);

    // Re-render all projects to include the new one
    renderProjects();

    // Reset and hide form, show button again
    newProjectForm.reset();
    projectCreationForm.style.display = 'none';
    loadMoreBtn.style.display = 'inline-block';

    // Scroll to the new project
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

// ==================== CONTACT FORM VALIDATION ====================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    let isValid = true;

    // Reset errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formSuccess.textContent = '';

    // Name validation
    if (!name.value.trim()) {
        nameError.textContent = 'Name is required';
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Message validation
    if (!message.value.trim()) {
        messageError.textContent = 'Message is required';
        isValid = false;
    } else if (message.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        isValid = false;
    }

    if (isValid) {
        formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
        contactForm.reset();

        setTimeout(() => {
            formSuccess.textContent = '';
        }, 5000);
    }
});

// ==================== NAVIGATION ACTIVE STATE ====================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ==================== INITIALIZE EVERYTHING ====================
renderProjects();