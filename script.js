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

// Dark / Warm Light switch for the Mac screenshot.
const macWindow = document.querySelector(".mac-window");
document.querySelectorAll("[data-set-theme]").forEach((button) => {
    button.addEventListener("click", () => {
        macWindow.dataset.theme = button.dataset.setTheme;
        document.querySelectorAll("[data-set-theme]").forEach((b) => b.classList.toggle("is-active", b === button));
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
