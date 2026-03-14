const root = document.documentElement;
const navLinks = document.querySelectorAll(".nav-link");
const sections = Array.from(document.querySelectorAll("main section[id]")).filter((section) =>
    document.querySelector(`.nav-link[href="#${section.id}"]`)
);
const revealElements = Array.from(document.querySelectorAll(".reveal"));
const yearElement = document.getElementById("year");
const contactForm = document.getElementById("contact-form");
const hero = document.querySelector(".hero");
const heroCopy = document.querySelector(".hero-copy");
const heroPanel = document.querySelector(".hero-panel");
const backdropVideo = document.querySelector(".backdrop-video");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let scrollFrame = 0;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

document.querySelectorAll("main section").forEach((section) => {
    Array.from(section.querySelectorAll(".reveal")).forEach((element, index) => {
        element.style.setProperty("--reveal-order", String(index));
    });
});

const markRevealsVisible = () => {
    revealElements.forEach((element) => element.classList.add("is-visible"));
};

if (reducedMotionQuery.matches) {
    markRevealsVisible();
} else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -48px 0px",
        }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    markRevealsVisible();
}

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach((link) => {
                    link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            });
        },
        {
            threshold: 0.45,
            rootMargin: "-20% 0px -45% 0px",
        }
    );

    sections.forEach((section) => sectionObserver.observe(section));
}

const resetMotion = () => {
    root.style.setProperty("--hero-progress", "0");
    root.style.setProperty("--header-progress", "0");

    if (backdropVideo) {
        backdropVideo.style.setProperty("--backdrop-shift", "0px");
        backdropVideo.style.setProperty("--backdrop-scale", "1.04");
    }

    [heroCopy, heroPanel].forEach((element) => {
        if (!element) {
            return;
        }

        element.style.setProperty("--parallax-y", "0px");
        element.style.setProperty("--motion-scale", "1");
    });
};

const updateMotion = () => {
    scrollFrame = 0;

    if (reducedMotionQuery.matches) {
        resetMotion();
        return;
    }

    const scrollTop = window.scrollY || window.pageYOffset || 0;
    const viewportHeight = window.innerHeight || 1;

    root.style.setProperty("--header-progress", clamp(scrollTop / 240, 0, 1).toFixed(3));

    if (hero && heroCopy && heroPanel) {
        const heroRect = hero.getBoundingClientRect();
        const heroProgress = clamp((viewportHeight * 0.2 - heroRect.top) / Math.max(heroRect.height * 0.9, 1), 0, 1);

        root.style.setProperty("--hero-progress", heroProgress.toFixed(3));
        heroCopy.style.setProperty("--parallax-y", `${(-34 * heroProgress).toFixed(1)}px`);
        heroCopy.style.setProperty("--motion-scale", `${(1 - heroProgress * 0.018).toFixed(3)}`);
        heroPanel.style.setProperty("--parallax-y", `${(22 * heroProgress).toFixed(1)}px`);
        heroPanel.style.setProperty("--motion-scale", `${(1 - heroProgress * 0.012).toFixed(3)}`);

        if (backdropVideo) {
            backdropVideo.style.setProperty("--backdrop-shift", `${(heroProgress * 12).toFixed(1)}px`);
            backdropVideo.style.setProperty("--backdrop-scale", `${(1.04 + heroProgress * 0.04).toFixed(3)}`);
        }
    }
};

const queueMotionUpdate = () => {
    if (scrollFrame) {
        return;
    }

    scrollFrame = window.requestAnimationFrame(updateMotion);
};

window.addEventListener("scroll", queueMotionUpdate, { passive: true });
window.addEventListener("resize", queueMotionUpdate);
window.addEventListener("load", queueMotionUpdate);
queueMotionUpdate();

const handleReducedMotionChange = () => {
    if (reducedMotionQuery.matches) {
        markRevealsVisible();
        resetMotion();
        return;
    }

    queueMotionUpdate();
};

if ("addEventListener" in reducedMotionQuery) {
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
} else if ("addListener" in reducedMotionQuery) {
    reducedMotionQuery.addListener(handleReducedMotionChange);
}

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("contact-name")?.value.trim() ?? "";
        const email = document.getElementById("contact-email")?.value.trim() ?? "";
        const subject = document.getElementById("contact-subject")?.value.trim() ?? "";
        const message = document.getElementById("contact-message")?.value.trim() ?? "";

        const body = [`Nom: ${name}`, `Courriel: ${email}`, "", message].join("\n");
        const mailtoUrl = `mailto:saad74874@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoUrl;
    });
}
