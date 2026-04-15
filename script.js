// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(isDark) {
    if (isDark) {
        body.style.setProperty('--bg', '#0a0a0a');
        body.style.setProperty('--surface', '#121212');
        body.style.setProperty('--text', '#e0e0e0');
        if (themeToggle) themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        body.style.setProperty('--bg', '#f8fafc');
        body.style.setProperty('--surface', '#ffffff');
        body.style.setProperty('--text', '#1f2937');
        if (themeToggle) themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isCurrentlyDark = body.style.getPropertyValue('--bg') === '#0a0a0a' || !body.style.getPropertyValue('--bg');
        setTheme(!isCurrentlyDark);
    });

    // Load saved theme (default dark)
    if (localStorage.getItem('theme') === 'light') {
        setTheme(false);
    } else {
        setTheme(true);
    }
}

// Mobile Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#0a0a0a';
            navLinks.style.padding = '1.5rem';
            navLinks.style.gap = '1.2rem';
        }
    });
}

// Reading Progress Bar
const progressBar = document.getElementById('progress-bar');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 600 ? 'flex' : 'none';
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}