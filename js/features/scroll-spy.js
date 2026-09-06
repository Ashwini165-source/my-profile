// scroll-spy.js

function updateActiveNavLink() {
    var elements = window.portfolioElements;
    var state = window.portfolioState;

    if (
        !state ||
        !elements ||
        !elements.navLinks ||
        !elements.spySections ||
        elements.navLinks.length === 0 ||
        elements.spySections.length === 0
    ) return;

    var offsetThreshold = 120;
    var currentPosition = window.scrollY + offsetThreshold;
    var activeSectionId = "";

    var docHeight = document.documentElement.scrollHeight;
    var isAtBottom = Math.ceil(window.innerHeight + window.scrollY) >= docHeight - 5;

    if (isAtBottom) {
        activeSectionId = elements.spySections[elements.spySections.length - 1].id;
    } else {
        elements.spySections.forEach(function (section) {
            var rect = section.getBoundingClientRect();
            var sectionTop = rect.top + window.scrollY;

            if (currentPosition >= sectionTop) {
                activeSectionId = section.id;
            }
        });
    }

    elements.navLinks.forEach(function (link) {
        var targetId = (link.getAttribute("href") || "").replace("#", "");
        var isActive = targetId && targetId === activeSectionId;

        link.classList.toggle("nav-active", isActive);
    });
}

function scheduleScrollSpyUpdate() {
    var state = window.portfolioState;
    if (!state) return;

    if (state.spyRafId) return;

    state.spyRafId = requestAnimationFrame(function () {
        updateActiveNavLink();
        state.spyRafId = 0;
    });
}

function initScrollSpy() {
    var state = window.portfolioState;
    if (!state) return;

    state.spyRafId = 0;

    // Initial run
    updateActiveNavLink();

    // Scroll listener (passive for performance)
    window.addEventListener("scroll", scheduleScrollSpyUpdate, { passive: true });

    // Update on resize (layout shifts)
    window.addEventListener("resize", scheduleScrollSpyUpdate);
}