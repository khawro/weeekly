document.documentElement.classList.remove("no-js");

// Frosted navigation once the page scrolls past the top of the hero.
const nav = document.getElementById("nav");
const updateNav = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
updateNav();
window.addEventListener("scroll", updateNav, { passive: true });

// Hero window: straightens up from a tilt as the page scrolls (see .window-frame in styles.css).
const windowFrame = document.querySelector(".window-frame");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let frameRequested = false;
const updateWindow = () => {
    frameRequested = false;
    const progress = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.55)));
    windowFrame.style.setProperty("--p", reduceMotion.matches ? 1 : progress.toFixed(3));
};
updateWindow();
window.addEventListener("scroll", () => {
    if (!frameRequested) {
        frameRequested = true;
        requestAnimationFrame(updateWindow);
    }
}, { passive: true });

// Fade elements in as they scroll into view.
const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }
    }
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal, .reveal-feature, .reveal-icon").forEach((el) => observer.observe(el));

// Meadow / Warm Light / Dark switch: changes the app theme in every screenshot on the page.
const themeButtons = document.querySelectorAll("[data-set-theme]");
themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const theme = button.dataset.setTheme;
        document.documentElement.dataset.appTheme = theme;
        themeButtons.forEach((b) => {
            const isActive = b.dataset.setTheme === theme;
            b.classList.toggle("is-active", isActive);
            b.setAttribute("aria-pressed", String(isActive));
        });
    });
});

// The app isn't on sale yet: the buy button shows a "coming soon" toast.
const toast = document.getElementById("toast");
let toastTimer;
document.querySelectorAll("[data-buy]").forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        toast.textContent = "Coming soon to the App Store ✨";
        toast.classList.add("is-visible");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
    });
});

// Hovering a device card lifts that device in the lineup.
const lineup = document.getElementById("lineup");
document.querySelectorAll(".device-card").forEach((card) => {
    const device = lineup.querySelector(`.lu[data-device="${card.dataset.device}"]`);
    card.addEventListener("mouseenter", () => device.classList.add("is-focused"));
    card.addEventListener("mouseleave", () => device.classList.remove("is-focused"));
});
