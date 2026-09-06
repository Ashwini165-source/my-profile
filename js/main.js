// ── 1. GLOBAL STATE ───────────────────────────────────────────────
window.portfolioState = {
    projectsData: typeof projectsData !== "undefined" ? projectsData : [],
    skillsData: typeof skillsData !== "undefined" ? skillsData : [],
    theme: "light",
    searchQuery: "",
    categoryFilter: "All",
    sortOrder: "default",
    skillCategory: "All",
    totalScrollableHeight: 0,
    scrollRafId: 0,
    spyThrottleTimer: 0,
    expandedProjects: {},
    _projectFilterCache: { query: null, category: null, sort: null, result: null }
};

// ── 2. DOM CACHE ───────────────────────────────────────────────
window.portfolioElements = {};

function cacheElements() {
    var e = window.portfolioElements;

    e.skillsContainer = document.getElementById("skills-container");
    e.certificationsContainer = document.getElementById("certifications-container");
    e.participationsContainer = document.getElementById("participations-container");
    e.publicationsContainer = document.getElementById("publications-container");

    // ❌ IMPORTANT FIX: only keep if you actually created it in HTML
    e.educationContainer = document.getElementById("education-container");

    e.projectsContainer = document.getElementById("projects-container");

    e.projectSearch = document.getElementById("project-search");
    e.projectSort = document.getElementById("project-sort");

    e.typingText = document.getElementById("hero-typing-text");
    e.heroGreeting = document.getElementById("hero-greeting");
    e.heroLocation = document.getElementById("hero-location");

    e.filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
    e.skillFilterButtons = Array.from(document.querySelectorAll(".skill-filter-btn"));

    e.scrollProgressBar = document.getElementById("scroll-progress-bar");

    e.themeToggle = document.getElementById("theme-toggle");
    e.themeToggleMobile = document.getElementById("theme-toggle-mobile");

    e.backToTop = document.getElementById("back-to-top");
}

// ── 3. INIT ───────────────────────────────────────────────
function init() {
    cacheElements();

    // HERO
    renderGreeting();
    fetchUserLocation();
    initTypingAnimation();

    // THEME
    initThemeToggle();

    // RENDER SECTIONS
    renderSkills();
    renderCertifications();
    renderParticipations();
    renderPublications();

    // ⚠️ ONLY CALL IF FUNCTION EXISTS
    if (typeof renderEducation === "function") {
        renderEducation();
    }

    renderProjects();

    // FEATURES
    initSkillsFilter();
    initProjectSearch();
    initProjectFilter();
    initProjectSort();

    if (typeof initContactForm === "function") {
        initContactForm();
    }

    initBackToTop();

    updateScrollMetrics();
    scheduleScrollProgressRender();

    window.addEventListener("scroll", scheduleScrollProgressRender, { passive: true });
}

// START
window.addEventListener("DOMContentLoaded", init);