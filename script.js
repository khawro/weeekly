document.documentElement.classList.remove("no-js");

// Frosted navigation once the page scrolls past the top of the hero.
const nav = document.getElementById("nav");
const updateNav = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
updateNav();
window.addEventListener("scroll", updateNav, { passive: true });

// Fade elements in as they scroll into view.
const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }
    }
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Warm Light / Dark switch: changes the app theme in every screenshot on the page.
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
    button.addEventListener("click", () => {
        toast.textContent = "Coming soon to the App Store ✨";
        toast.classList.add("is-visible");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
    });
});

// Hovering a device card highlights that device in the lineup.
const lineup = document.getElementById("lineup");
document.querySelectorAll(".device-card").forEach((card) => {
    const device = lineup.querySelector(`.lu[data-device="${card.dataset.device}"]`);
    card.addEventListener("mouseenter", () => {
        lineup.classList.add("has-focus");
        device.classList.add("is-focused");
    });
    card.addEventListener("mouseleave", () => {
        lineup.classList.remove("has-focus");
        device.classList.remove("is-focused");
    });
});
