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
const metaDescription = document.querySelector('meta[name="description"]');
const languageToggle = document.getElementById("language-toggle");
const translatableTextElements = document.querySelectorAll("[data-i18n]");
const translatableAriaElements = document.querySelectorAll("[data-i18n-aria-label]");
const translatablePlaceholderElements = document.querySelectorAll("[data-i18n-placeholder]");
const translatableAltElements = document.querySelectorAll("[data-i18n-alt]");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const defaultTitle = document.title;
const defaultMetaDescription = metaDescription?.getAttribute("content") ?? "";

const translations = {
    fr: {
        "meta.title": "Saad Belhaj | Portfolio",
        "meta.description": "Portfolio de Saad Belhaj, etudiant en Techniques de l'informatique au Cegep Garneau. Developpement web, mobile, logiciel et support technique.",
        "language.switchToEnglish": "Ouvrir la version anglaise",
        "language.switchToFrench": "Ouvrir la version française",
        "header.homeAria": "Retour a l'accueil",
        "header.navAria": "Navigation principale",
        "header.nav.home": "Accueil",
        "header.nav.about": "A propos",
        "header.nav.skills": "Competences",
        "header.nav.projects": "Projets",
        "header.nav.experience": "Experience",
        "header.nav.contact": "Contact",
        "header.social.emailAria": "Envoyer un courriel a Saad Belhaj",
        "header.social.linkedinAria": "Profil LinkedIn",
        "header.social.githubAria": "Profil GitHub",
        "header.social.instagramAria": "Profil Instagram",
        "hero.subtitle": "Etudiant en Techniques de l'informatique au Cegep Garneau",
        "hero.lead": "Je developpe des applications web, mobiles et desktop, avec un interet marque pour le developpement logiciel, le support technique et les solutions concretes pour les utilisateurs.",
        "hero.cta.projects": "Voir mes projets",
        "hero.cta.contact": "Me contacter",
        "hero.metrics.webTitle": "Web",
        "hero.metrics.webBody": "Applications CRUD, API REST, authentification et interfaces utiles.",
        "hero.metrics.mobileTitle": "Mobile & Desktop",
        "hero.metrics.mobileBody": "Flutter, WPF, MVVM et conception orientee usage reel.",
        "hero.metrics.supportTitle": "Orientation terrain",
        "hero.metrics.supportBody": "Support technique, resolution de problemes et communication utilisateur.",
        "hero.panel.positioning": "Positionnement",
        "hero.panel.title": "Un profil technique polyvalent deja operationnel",
        "hero.panel.body": "Je construis des projets concrets en web, mobile, logiciel et base de donnees, avec une approche serieuse, autonome et orientee resultats.",
        "hero.panel.focus": "Focus actuel",
        "hero.panel.focusItem1": "Developpement logiciel et web avec architecture claire",
        "hero.panel.focusItem2": "Experience utilisateur simple, fiable et utile",
        "hero.panel.focusItem3": "Recherche d'un stage ou d'un emploi etudiant en TI",
        "about.kicker": "A propos",
        "about.title": "Pourquoi moi ?",
        "about.body": "Un profil en formation, mais deja centre sur la qualite d'execution, l'autonomie et la valeur livree aux utilisateurs.",
        "about.paragraph1": "Mon parcours en Techniques de l'informatique au Cegep Garneau me permet de toucher autant au developpement web qu'au logiciel, au mobile, aux bases de donnees et aux reseaux. J'aime construire des applications bien structurees, relier la logique metier a une interface claire et transformer un besoin concret en solution fonctionnelle.",
        "about.paragraph2": "Je me demarque par une approche serieuse, curieuse et autonome. Mes projets scolaires et personnels me donnent deja une base pratique solide, tandis que mon experience en environnement technique et en service a la clientele renforce ma communication, mon sens des priorites et ma capacite a resoudre des problemes reels.",
        "about.highlight1.title": "Formation appliquee",
        "about.highlight1.body": "Des projets qui couvrent deja le web, le desktop, le mobile et les bases de donnees.",
        "about.highlight2.title": "Rigueur technique",
        "about.highlight2.body": "Code structure, logique orientee objet, tests et souci de maintenabilite.",
        "about.highlight3.title": "Vision utilisateur",
        "about.highlight3.body": "Je vise des solutions concretes, simples a utiliser et reellement utiles au terrain.",
        "about.highlight4.title": "Autonomie professionnelle",
        "about.highlight4.body": "Je suis a l'aise pour apprendre vite, documenter, deboguer et collaborer efficacement.",
        "skills.kicker": "Competences techniques",
        "skills.title": "Un socle polyvalent, organise par domaine",
        "skills.body": "Mes competences couvrent le developpement applicatif, les interfaces, les bases de donnees et les outils utilises en contexte professionnel.",
        "skills.languages": "Langages",
        "skills.web": "Developpement web",
        "skills.webAuthentication": "Authentification",
        "skills.software": "Developpement logiciel",
        "skills.softwareOop": "POO",
        "skills.softwareDataStructures": "Structures de donnees",
        "skills.softwareTesting": "Tests unitaires",
        "skills.mobile": "Mobile",
        "skills.databases": "Base de donnees",
        "skills.tools": "Outils",
        "projects.kicker": "Projets",
        "projects.title": "Des projets concrets qui montrent ce que je sais livrer",
        "projects.body": "Chaque projet presente le contexte, les technologies utilisees, ma contribution et les apprentissages tires du travail realise.",
        "projects.bistro.alt": "Apercu de l'application Bistro Garneau",
        "projects.bistro.type": "Projet mobile",
        "projects.bistro.body": "Application mobile de commande pensee pour la cafeteria du cegep, avec un parcours utilisateur rapide, clair et oriente action.",
        "projects.bistro.architecture": "Architecture mobile",
        "projects.bistro.didTitle": "Ce que j'ai fait",
        "projects.bistro.didBody": "Conception des ecrans, structuration du flux de commande et integration de la logique applicative mobile.",
        "projects.bistro.learnedTitle": "Ce que j'ai appris",
        "projects.bistro.learnedBody": "Architecture d'application mobile, coherence UX et gestion d'un parcours utilisateur complet.",
        "projects.bistro.demo": "Demander une demo",
        "experience.kicker": "Experience",
        "experience.title": "Une base reelle en environnement technique et oriente utilisateur",
        "experience.body": "Meme au-dela du developpement pur, mes experiences renforcent ma capacite a communiquer, diagnostiquer et resoudre efficacement.",
        "experience.item1.tag": "Milieu gouvernemental",
        "experience.item1.title": "Technicien en informatique - MRNF",
        "experience.item1.point1": "Soutien aux utilisateurs et traitement des demandes techniques.",
        "experience.item1.point2": "Diagnostic de problemes logiciels, materiels ou lies a l'environnement de travail.",
        "experience.item1.point3": "Participation au debogage, a l'analyse et au suivi des incidents.",
        "experience.item1.point4": "Collaboration avec l'equipe pour maintenir un service fiable et structure.",
        "experience.item2.tag": "Milieu gouvernemental",
        "experience.item2.title": "Analyste de base de donnees - MAPAQ",
        "experience.item2.point1": "Analyser les donnees de la MAPAQ dans differentes bases de donnees.",
        "experience.item2.point2": "Transformer des bases de donnees Excel et Access vers PostgreSQL.",
        "experience.item2.point3": "Assurer la migration correcte des donnees d'une base de donnees a une autre.",
        "experience.item2.point4": "Trouver une solution pour utiliser la base de donnees PostgreSQL avec Power BI.",
        "experience.item3.tag": "Service et communication",
        "experience.item3.title": "Experience orientee client",
        "experience.item3.point1": "Communication claire avec des utilisateurs aux besoins varies.",
        "experience.item3.point2": "Priorisation rapide des demandes et gestion professionnelle des echanges.",
        "experience.item3.point3": "Recherche de solutions concretes avec un souci de qualite de service.",
        "experience.item3.point4": "Developpement d'un bon reflexe d'ecoute et d'accompagnement.",
        "experience.item4.tag": "Projets academiques",
        "experience.item4.title": "Travail d'equipe et livraison technique",
        "experience.item4.point1": "Analyse de besoins, conception et realisation de projets fonctionnels.",
        "experience.item4.point2": "Utilisation de Git, documentation technique et organisation du travail.",
        "experience.item4.point3": "Tests, debogage et amelioration continue des fonctionnalites developpees.",
        "experience.item4.point4": "Presentation de solutions et justification des choix techniques retenus.",
        "education.kicker": "Formation",
        "education.title": "Une progression structuree vers le developpement logiciel",
        "education.body": "Mon parcours combine theorie, pratique et projets appliques dans des contextes varies.",
        "education.programLabel": "Programme",
        "education.programTitle": "Techniques de l'informatique - Cegep Garneau",
        "education.programBody": "Formation axee sur la programmation, le developpement web, les bases de donnees, les reseaux, la securite et le developpement mobile.",
        "education.coursesLabel": "Cours pertinents",
        "education.course1": "Programmation avancee",
        "education.course2": "Developpement web",
        "education.course3": "Bases de donnees",
        "education.course4": "Reseaux",
        "education.course5": "Securite",
        "education.course6": "Developpement mobile",
        "learning.card1.title": "Support technique",
        "learning.card1.body": "Approfondissement des bases de diagnostic, du service utilisateur et des methodes de resolution.",
        "learning.card2.title": "Web et securite",
        "learning.card2.body": "Travail continu sur l'authentification, les sessions, les API et la protection des acces.",
        "learning.card3.title": "Outils professionnels",
        "learning.card3.body": "Veille sur Git, Docker, Postman et les pratiques de developpement plus structurees.",
        "goals.title": "J'apporte",
        "goals.point1": "Une base technique deja concrete sur plusieurs plateformes.",
        "goals.point2": "Une approche serieuse, autonome et orientee solution.",
        "goals.point3": "Une capacite a apprendre vite et a livrer avec methode.",
        "resume.kicker": "CV",
        "resume.title": "Telecharger mon CV",
        "resume.body": "Une version telechargeable est disponible pour un acces rapide a mon profil, mes projets et mes competences techniques.",
        "resume.download": "Telecharger mon CV",
        "contact.kicker": "Contact",
        "contact.title": "Parlons d'une opportunite ou d'un projet",
        "contact.body": "Je suis ouvert aux opportunites de stage, d'emploi etudiant et de collaboration sur des projets techniques.",
        "contact.email": "Courriel",
        "contact.nameLabel": "Nom",
        "contact.namePlaceholder": "Votre nom",
        "contact.emailLabel": "Courriel",
        "contact.emailPlaceholder": "votre@email.com",
        "contact.subjectLabel": "Sujet",
        "contact.subjectPlaceholder": "Objet du message",
        "contact.messageLabel": "Message",
        "contact.messagePlaceholder": "Decrivez votre besoin ou votre opportunite.",
        "contact.submit": "Ouvrir mon courriel",
        "contact.note": "Le formulaire prepare un courriel dans votre application mail par defaut.",
        "contact.mailto.name": "Nom",
        "contact.mailto.email": "Courriel",
        "footer.tagline": "Developpement web, mobile, logiciel et support technique.",
        "footer.projects": "Projets",
        "footer.resume": "CV",
        "footer.copy": "Saad Belhaj. Tous droits reserves.",
    },
    en: {
        "meta.title": "Saad Belhaj | Portfolio",
        "meta.description": "Portfolio of Saad Belhaj, Computer Technology student at Cegep Garneau. Web, mobile, software development, and technical support.",
        "language.switchToEnglish": "Open the English version",
        "language.switchToFrench": "Open the French version",
        "header.homeAria": "Back to home",
        "header.navAria": "Main navigation",
        "header.nav.home": "Home",
        "header.nav.about": "About",
        "header.nav.skills": "Skills",
        "header.nav.projects": "Projects",
        "header.nav.experience": "Experience",
        "header.nav.contact": "Contact",
        "header.social.emailAria": "Send an email to Saad Belhaj",
        "header.social.linkedinAria": "LinkedIn profile",
        "header.social.githubAria": "GitHub profile",
        "header.social.instagramAria": "Instagram profile",
        "hero.subtitle": "Computer Technology student at Cegep Garneau",
        "hero.lead": "I build web, mobile, and desktop applications, with a strong interest in software development, technical support, and practical solutions for users.",
        "hero.cta.projects": "View my projects",
        "hero.cta.contact": "Contact me",
        "hero.metrics.webTitle": "Web",
        "hero.metrics.webBody": "CRUD applications, REST APIs, authentication, and practical interfaces.",
        "hero.metrics.mobileTitle": "Mobile & Desktop",
        "hero.metrics.mobileBody": "Flutter, WPF, MVVM, and design focused on real-world use.",
        "hero.metrics.supportTitle": "Hands-on mindset",
        "hero.metrics.supportBody": "Technical support, problem solving, and user communication.",
        "hero.panel.positioning": "Positioning",
        "hero.panel.title": "A versatile technical profile that is already operational",
        "hero.panel.body": "I build practical projects in web, mobile, software, and databases, with a serious, autonomous, and results-oriented approach.",
        "hero.panel.focus": "Current focus",
        "hero.panel.focusItem1": "Software and web development with clear architecture",
        "hero.panel.focusItem2": "Simple, reliable, and useful user experience",
        "hero.panel.focusItem3": "Looking for an internship or student IT job",
        "about.kicker": "About",
        "about.title": "Why me?",
        "about.body": "Still in training, but already focused on execution quality, autonomy, and value delivered to users.",
        "about.paragraph1": "My Computer Technology program at Cegep Garneau gives me hands-on exposure to web, software, mobile, databases, and networking. I like building well-structured applications, connecting business logic to clear interfaces, and turning concrete needs into functional solutions.",
        "about.paragraph2": "What sets me apart is a serious, curious, and autonomous approach. My academic and personal projects already give me a strong practical base, while my technical environment and customer service experience strengthen my communication, prioritization, and ability to solve real problems.",
        "about.highlight1.title": "Applied training",
        "about.highlight1.body": "Projects already covering web, desktop, mobile, and databases.",
        "about.highlight2.title": "Technical rigor",
        "about.highlight2.body": "Structured code, object-oriented logic, testing, and maintainability.",
        "about.highlight3.title": "User focus",
        "about.highlight3.body": "I aim for practical solutions that are easy to use and genuinely useful in the field.",
        "about.highlight4.title": "Professional autonomy",
        "about.highlight4.body": "I am comfortable learning quickly, documenting, debugging, and collaborating effectively.",
        "skills.kicker": "Technical skills",
        "skills.title": "A versatile foundation organized by domain",
        "skills.body": "My skills cover application development, interfaces, databases, and the tools used in professional environments.",
        "skills.languages": "Languages",
        "skills.web": "Web development",
        "skills.webAuthentication": "Authentication",
        "skills.software": "Software development",
        "skills.softwareOop": "OOP",
        "skills.softwareDataStructures": "Data structures",
        "skills.softwareTesting": "Unit testing",
        "skills.mobile": "Mobile",
        "skills.databases": "Databases",
        "skills.tools": "Tools",
        "projects.kicker": "Projects",
        "projects.title": "Practical projects that show what I can deliver",
        "projects.body": "Each project presents the context, the technologies used, my contribution, and the lessons learned from the work completed.",
        "projects.bistro.alt": "Preview of the Bistro Garneau application",
        "projects.bistro.type": "Mobile project",
        "projects.bistro.body": "Mobile ordering app designed for the campus cafeteria, with a fast, clear, action-oriented user flow.",
        "projects.bistro.architecture": "Mobile architecture",
        "projects.bistro.didTitle": "What I built",
        "projects.bistro.didBody": "Designed the screens, structured the ordering flow, and integrated the mobile application logic.",
        "projects.bistro.learnedTitle": "What I learned",
        "projects.bistro.learnedBody": "Mobile application architecture, UX consistency, and end-to-end user flow management.",
        "projects.bistro.demo": "Request a demo",
        "experience.kicker": "Experience",
        "experience.title": "Real experience in technical and user-oriented environments",
        "experience.body": "Even beyond pure development, my experience strengthens how I communicate, diagnose issues, and solve problems efficiently.",
        "experience.item1.tag": "Government sector",
        "experience.item1.title": "IT Technician - MRNF",
        "experience.item1.point1": "Provided user support and handled technical requests.",
        "experience.item1.point2": "Diagnosed software, hardware, and workplace environment issues.",
        "experience.item1.point3": "Contributed to debugging, analysis, and incident follow-up.",
        "experience.item1.point4": "Worked with the team to maintain reliable, structured service.",
        "experience.item2.tag": "Government sector",
        "experience.item2.title": "Database Analyst - MAPAQ",
        "experience.item2.point1": "Analyzed MAPAQ data across multiple databases.",
        "experience.item2.point2": "Converted Excel and Access databases to PostgreSQL.",
        "experience.item2.point3": "Ensured accurate migration of data from one database to another.",
        "experience.item2.point4": "Found a solution to use the PostgreSQL database with Power BI.",
        "experience.item3.tag": "Service and communication",
        "experience.item3.title": "Client-focused experience",
        "experience.item3.point1": "Communicated clearly with users who had varied needs.",
        "experience.item3.point2": "Quickly prioritized requests and handled exchanges professionally.",
        "experience.item3.point3": "Searched for practical solutions with a strong service mindset.",
        "experience.item3.point4": "Developed strong listening and support reflexes.",
        "experience.item4.tag": "Academic projects",
        "experience.item4.title": "Teamwork and technical delivery",
        "experience.item4.point1": "Analyzed needs, designed, and built functional projects.",
        "experience.item4.point2": "Used Git, technical documentation, and organized workflows.",
        "experience.item4.point3": "Tested, debugged, and continuously improved developed features.",
        "experience.item4.point4": "Presented solutions and justified chosen technical decisions.",
        "education.kicker": "Education",
        "education.title": "A structured path toward software development",
        "education.body": "My background combines theory, hands-on practice, and applied projects in varied contexts.",
        "education.programLabel": "Program",
        "education.programTitle": "Computer Technology - Cegep Garneau",
        "education.programBody": "Training focused on programming, web development, databases, networking, security, and mobile development.",
        "education.coursesLabel": "Relevant courses",
        "education.course1": "Advanced programming",
        "education.course2": "Web development",
        "education.course3": "Databases",
        "education.course4": "Networking",
        "education.course5": "Security",
        "education.course6": "Mobile development",
        "learning.card1.title": "Technical support",
        "learning.card1.body": "Strengthening diagnostic fundamentals, user support, and problem-solving methods.",
        "learning.card2.title": "Web and security",
        "learning.card2.body": "Ongoing work on authentication, sessions, APIs, and access protection.",
        "learning.card3.title": "Professional tools",
        "learning.card3.body": "Continuous learning around Git, Docker, Postman, and more structured development practices.",
        "goals.title": "What I bring",
        "goals.point1": "A concrete technical foundation across multiple platforms.",
        "goals.point2": "A serious, autonomous, solution-oriented approach.",
        "goals.point3": "The ability to learn quickly and deliver with method.",
        "resume.kicker": "Resume",
        "resume.title": "Download my resume",
        "resume.body": "A downloadable version is available for quick access to my profile, projects, and technical skills.",
        "resume.download": "Download my resume",
        "contact.kicker": "Contact",
        "contact.title": "Let's talk about an opportunity or a project",
        "contact.body": "I am open to internship opportunities, student jobs, and collaboration on technical projects.",
        "contact.email": "Email",
        "contact.nameLabel": "Name",
        "contact.namePlaceholder": "Your name",
        "contact.emailLabel": "Email",
        "contact.emailPlaceholder": "you@example.com",
        "contact.subjectLabel": "Subject",
        "contact.subjectPlaceholder": "Message subject",
        "contact.messageLabel": "Message",
        "contact.messagePlaceholder": "Describe your need or opportunity.",
        "contact.submit": "Open my email",
        "contact.note": "The form prepares an email in your default mail application.",
        "contact.mailto.name": "Name",
        "contact.mailto.email": "Email",
        "footer.tagline": "Web, mobile, software development, and technical support.",
        "footer.projects": "Projects",
        "footer.resume": "Resume",
        "footer.copy": "Saad Belhaj. All rights reserved.",
    },
};

const supportedLanguages = new Set(Object.keys(translations));
let currentLanguage = "fr";
let scrollFrame = 0;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

translatableTextElements.forEach((element) => {
    element.dataset.i18nDefault = element.textContent;
});

translatableAriaElements.forEach((element) => {
    element.dataset.i18nAriaDefault = element.getAttribute("aria-label") ?? "";
});

translatablePlaceholderElements.forEach((element) => {
    element.dataset.i18nPlaceholderDefault = element.getAttribute("placeholder") ?? "";
});

translatableAltElements.forEach((element) => {
    element.dataset.i18nAltDefault = element.getAttribute("alt") ?? "";
});

const getLanguageFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");

    return supportedLanguages.has(lang) ? lang : "fr";
};

const getTranslation = (lang, key) => translations[lang]?.[key] ?? translations.fr[key] ?? "";

const buildLanguageUrl = (lang) => {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    return `${url.pathname}${url.search}${url.hash}`;
};

const updateLanguageToggle = () => {
    if (!languageToggle) {
        return;
    }

    const nextLanguage = currentLanguage === "fr" ? "en" : "fr";
    const nextLanguageLabel = nextLanguage === "en" ? "ENG" : "FR";
    const nextLanguageAriaKey = nextLanguage === "en" ? "language.switchToEnglish" : "language.switchToFrench";

    languageToggle.textContent = nextLanguageLabel;
    languageToggle.href = buildLanguageUrl(nextLanguage);
    languageToggle.setAttribute("lang", nextLanguage);
    languageToggle.setAttribute("hreflang", nextLanguage);
    languageToggle.setAttribute("aria-label", getTranslation(currentLanguage, nextLanguageAriaKey));
};

const applyLanguage = (lang) => {
    currentLanguage = supportedLanguages.has(lang) ? lang : "fr";
    root.lang = currentLanguage;
    document.title = currentLanguage === "fr" ? defaultTitle : getTranslation(currentLanguage, "meta.title");

    if (metaDescription) {
        metaDescription.setAttribute(
            "content",
            currentLanguage === "fr" ? defaultMetaDescription : getTranslation(currentLanguage, "meta.description")
        );
    }

    translatableTextElements.forEach((element) => {
        element.textContent =
            currentLanguage === "fr" ? element.dataset.i18nDefault ?? "" : getTranslation(currentLanguage, element.dataset.i18n);
    });

    translatableAriaElements.forEach((element) => {
        element.setAttribute(
            "aria-label",
            currentLanguage === "fr"
                ? element.dataset.i18nAriaDefault ?? ""
                : getTranslation(currentLanguage, element.dataset.i18nAriaLabel)
        );
    });

    translatablePlaceholderElements.forEach((element) => {
        element.setAttribute(
            "placeholder",
            currentLanguage === "fr"
                ? element.dataset.i18nPlaceholderDefault ?? ""
                : getTranslation(currentLanguage, element.dataset.i18nPlaceholder)
        );
    });

    translatableAltElements.forEach((element) => {
        element.setAttribute(
            "alt",
            currentLanguage === "fr" ? element.dataset.i18nAltDefault ?? "" : getTranslation(currentLanguage, element.dataset.i18nAlt)
        );
    });

    updateLanguageToggle();
};

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

currentLanguage = getLanguageFromUrl();
applyLanguage(currentLanguage);

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
window.addEventListener("hashchange", updateLanguageToggle);
queueMotionUpdate();

if (languageToggle) {
    languageToggle.addEventListener("click", (event) => {
        event.preventDefault();

        const nextLanguage = currentLanguage === "fr" ? "en" : "fr";
        window.history.pushState({ lang: nextLanguage }, "", buildLanguageUrl(nextLanguage));
        applyLanguage(nextLanguage);
    });
}

window.addEventListener("popstate", () => {
    applyLanguage(getLanguageFromUrl());
});

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

        const body = [
            `${getTranslation(currentLanguage, "contact.mailto.name")}: ${name}`,
            `${getTranslation(currentLanguage, "contact.mailto.email")}: ${email}`,
            "",
            message,
        ].join("\n");
        const mailtoUrl = `mailto:saad74874@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoUrl;
    });
}
