/* ==========================================================================
   Aurélien Talbot — interactions du site
   Vanilla JS, sans dépendance. Progressive enhancement.
   ========================================================================== */
(function () {
    "use strict";

    /* ---------- Menu volet flottant ---------- */
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".menu-panel");
    if (toggle && menu) {
        const setOpen = (open) => {
            menu.classList.toggle("open", open);
            toggle.classList.toggle("is-open", open);
            toggle.setAttribute("aria-expanded", String(open));
            menu.setAttribute("aria-hidden", String(!open));
        };
        toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
        menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
        document.addEventListener("click", (e) => {
            if (menu.classList.contains("open") && !menu.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
        });
    }

    /* ---------- Animations au scroll (reveal) ---------- */
    const revealEls = document.querySelectorAll("[data-reveal]");
    if (revealEls.length) {
        if ("IntersectionObserver" in window) {
            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
                    });
                },
                { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
            );
            revealEls.forEach((el) => io.observe(el));
        } else {
            revealEls.forEach((el) => el.classList.add("is-visible"));
        }
    }


})();