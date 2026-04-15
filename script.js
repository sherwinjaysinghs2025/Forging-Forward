// Shared UI behavior for all Forge Forward pages.
(function () {
    const THEME_KEY = "forge-forward-theme";
    const body = document.body;
    const nav = document.querySelector(".nav");
    const navLinks = Array.from(document.querySelectorAll("#nav-links a"));
    const hamburger = document.getElementById("hamburger");
    const themeToggle = document.getElementById("theme-toggle");
    const progressBar = document.getElementById("progress-bar");
    const backToTop = document.getElementById("back-to-top");

    function updateThemeButton(theme) {
        if (!themeToggle) {
            return;
        }

        const icon = themeToggle.querySelector(".theme-toggle-icon");
        const label = themeToggle.querySelector(".theme-toggle-text");

        if (theme === "dark") {
            if (icon) {
                icon.textContent = "SUN";
            }
            if (label) {
                label.textContent = "Light";
            }
            themeToggle.setAttribute("aria-label", "Switch to light theme");
        } else {
            if (icon) {
                icon.textContent = "MOON";
            }
            if (label) {
                label.textContent = "Dark";
            }
            themeToggle.setAttribute("aria-label", "Switch to dark theme");
        }
    }

    function applyTheme(theme) {
        body.setAttribute("data-theme", theme);
        localStorage.setItem(THEME_KEY, theme);
        updateThemeButton(theme);
    }

    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        const theme = savedTheme === "light" ? "light" : "dark";
        applyTheme(theme);

        if (themeToggle) {
            themeToggle.addEventListener("click", function () {
                const nextTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
                applyTheme(nextTheme);
            });
        }
    }

    function closeMenu() {
        if (!nav || !hamburger) {
            return;
        }

        nav.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
    }

    function initMobileMenu() {
        if (!nav || !hamburger) {
            return;
        }

        hamburger.addEventListener("click", function () {
            const isOpen = nav.classList.toggle("is-open");
            hamburger.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", function (event) {
            if (!nav.classList.contains("is-open")) {
                return;
            }

            if (event.target instanceof Node && !nav.contains(event.target)) {
                closeMenu();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }

    function highlightCurrentNavLink() {
        let fileName = window.location.pathname.split("/").pop();
        if (!fileName) {
            fileName = "index.html";
        }

        navLinks.forEach(function (link) {
            const href = link.getAttribute("href");
            if (!href) {
                return;
            }

            const normalizedHref = href.replace("./", "");
            if (normalizedHref === fileName) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            }
        });
    }

    // Update the reading progress based on total scrollable height.
    function updateReadingProgress() {
        if (!progressBar) {
            return;
        }

        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;
        const clamped = Math.min(100, Math.max(0, progress));
        progressBar.style.width = clamped + "%";
    }

    function updateBackToTopVisibility() {
        if (!backToTop) {
            return;
        }

        if (window.scrollY > 420) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    }

    function initScrollingUI() {
        updateReadingProgress();
        updateBackToTopVisibility();

        window.addEventListener(
            "scroll",
            function () {
                updateReadingProgress();
                updateBackToTopVisibility();
            },
            { passive: true }
        );

        if (backToTop) {
            backToTop.addEventListener("click", function () {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    }

    initTheme();
    initMobileMenu();
    highlightCurrentNavLink();
    initScrollingUI();
})();