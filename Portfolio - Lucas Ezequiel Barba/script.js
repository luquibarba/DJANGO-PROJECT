document.addEventListener("DOMContentLoaded", function () {
    // --- Lógica de navegación principal (entre secciones) ---
    document.body.classList.add('loaded');

    const navDots = document.querySelectorAll('.nav-dot');
    const contentSections = document.querySelectorAll('.content-section');
    const mainContentWrapper = document.querySelector('.main-content-wrapper');
    const footer = document.querySelector('footer');
    const codeTypewriters = document.querySelector('.code-typewriters');

    let currentSectionIndex = 0;
    let isTransitioning = false;

    function showSection(index) {
        if (isTransitioning || index === currentSectionIndex) {
            return;
        }

        isTransitioning = true;

        contentSections[currentSectionIndex].classList.remove('active');
        navDots[currentSectionIndex].classList.remove('active');

        if (index === 0) {
            footer.classList.remove('small');
            if (codeTypewriters) {
                codeTypewriters.classList.add('show-code-typewriters');
            }
        } else {
            footer.classList.add('small');
            if (codeTypewriters) {
                codeTypewriters.classList.remove('show-code-typewriters');
            }
        }

        currentSectionIndex = index;

        contentSections[currentSectionIndex].classList.add('active');
        navDots[currentSectionIndex].classList.add('active');

        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSection(index);
        });
    });

    let lastScrollTime = 0;
    const scrollThreshold = 700;

    mainContentWrapper.addEventListener('wheel', (event) => {
        const currentTime = new Date().getTime();

        if (currentTime - lastScrollTime < scrollThreshold) {
            return;
        }

        lastScrollTime = currentTime;

        if (event.deltaY > 0) {
            if (currentSectionIndex < contentSections.length - 1) {
                showSection(currentSectionIndex + 1);
            }
        } else {
            if (currentSectionIndex > 0) {
                showSection(currentSectionIndex - 1);
            }
        }

        event.preventDefault();
    }, { passive: false });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'PageDown') {
            if (currentSectionIndex < contentSections.length - 1) {
                showSection(currentSectionIndex + 1);
                event.preventDefault();
            }
        } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
            if (currentSectionIndex > 0) {
                showSection(currentSectionIndex - 1);
                event.preventDefault();
            }
        }
    });

    showSection(0);


    // --- Lógica para el carrusel de "Sobre mi" (section2) ---
    const aboutWrapper = document.querySelector('.about-wrapper');
    const aboutItems = document.querySelectorAll('.about-item');
    const prevAboutBtn = document.getElementById('prevAbout');
    const nextAboutBtn = document.getElementById('nextAbout');
    const aboutDots = document.querySelectorAll('.about-dot');

    let currentAboutIndex = 0;
    let aboutWidth = 0;

    function showAboutSlide(index) {
        if (aboutItems.length === 0) return;

        if (index < 0) {
            currentAboutIndex = aboutItems.length - 1;
        } else if (index >= aboutItems.length) {
            currentAboutIndex = 0;
        } else {
            currentAboutIndex = index;
        }

        if (aboutItems[0]) {
            aboutWidth = aboutItems[0].clientWidth;
        }

        const offset = -currentAboutIndex * aboutWidth;
        aboutWrapper.style.transform = `translateX(${offset}px)`;

        aboutDots.forEach((dot, idx) => {
            if (idx === currentAboutIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    if (prevAboutBtn) {
        prevAboutBtn.addEventListener('click', () => {
            showAboutSlide(currentAboutIndex - 1);
        });
    }

    if (nextAboutBtn) {
        nextAboutBtn.addEventListener('click', () => {
            showAboutSlide(currentAboutIndex + 1);
        });
    }

    aboutDots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const aboutTarget = event.target.dataset.about;
            const targetIndex = Array.from(aboutItems).findIndex(item => item.id === aboutTarget);
            if (targetIndex !== -1) {
                showAboutSlide(targetIndex);
            }
        });
    });

    if (aboutItems.length > 0) {
        showAboutSlide(0);

        window.addEventListener('resize', () => {
            showAboutSlide(currentAboutIndex);
        });
    }


    // --- Lógica para el carrusel de "Proyectos Destacados" (section4) ---
    const projectWrapper = document.querySelector('.project-wrapper');
    const projectItems = document.querySelectorAll('.project-item');
    const prevProjectArrow = document.querySelector('.project-arrow-dot.left');
    const nextProjectArrow = document.querySelector('.project-arrow-dot.right');
    const projectDots = document.querySelectorAll('.project-dots-indicators .project-dot');

    let currentProjectIndex = 0;
    let projectItemWidth = 0;

    function showProject(index) {
        if (projectItems.length === 0) return;

        if (index < 0) {
            currentProjectIndex = projectItems.length - 1;
        } else if (index >= projectItems.length) {
            currentProjectIndex = 0;
        } else {
            currentProjectIndex = index;
        }

        if (projectItems[0]) {
            projectItemWidth = projectItems[0].clientWidth;
        }

        const offset = -currentProjectIndex * projectItemWidth;
        projectWrapper.style.transform = `translateX(${offset}px)`;

        projectDots.forEach((dot, idx) => {
            if (idx === currentProjectIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    if (prevProjectArrow) {
        prevProjectArrow.addEventListener('click', () => {
            showProject(currentProjectIndex - 1);
        });
    }

    if (nextProjectArrow) {
        nextProjectArrow.addEventListener('click', () => {
            showProject(currentProjectIndex + 1);
        });
    }

    projectDots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const projectTarget = event.target.dataset.project;
            const targetIndex = Array.from(projectItems).findIndex(item => item.id === projectTarget);
            if (targetIndex !== -1) {
                showProject(targetIndex);
            }
        });
    });

    if (projectItems.length > 0) {
        showProject(0);

        window.addEventListener('resize', () => {
            showProject(currentProjectIndex);
        });
    }

    // Lógica para el logoLink (desplazamiento al inicio)
    const logoLink = document.getElementById('logo-link');

    if (logoLink) {
        logoLink.addEventListener('click', function(event) {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Lógica para el Modal de Contacto
    const googleButton = document.querySelector('.wrapper ul li.google a');
    const contactModal = document.getElementById('contactModal');
    const closeButton = document.querySelector('.contact-modal-content .close-button');

    if (googleButton) {
        googleButton.addEventListener('click', function(event) {
            event.preventDefault();
            contactModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            contactModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    if (contactModal) {
        contactModal.addEventListener('click', function(event) {
            if (event.target === contactModal) {
                contactModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Formulario enviado (simulado). ¡Gracias por tu mensaje!');
            contactModal.classList.remove('show');
            document.body.style.overflow = '';
            contactForm.reset();
        });
    }
});

