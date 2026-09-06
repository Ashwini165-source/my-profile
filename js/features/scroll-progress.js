// scroll-progress.js

function updateScrollMetrics() {
    var state = window.portfolioState;
    if (!state) return;

    var totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    state.totalScrollableHeight = totalHeight > 0 ? totalHeight : 0;
}

function renderScrollProgress() {
    var state = window.portfolioState;
    var elements = window.portfolioElements;

    if (!state || !elements || !elements.scrollProgressBar) {
        if (state) state.scrollRafId = 0;
        return;
    }

    var ratio = state.totalScrollableHeight === 0
        ? 0
        : Math.min(1, Math.max(0, window.scrollY / state.totalScrollableHeight));

    // Use transform instead of width for better performance
    elements.scrollProgressBar.style.transform = "scaleX(" + ratio + ")";

    state.scrollRafId = 0;
}

function scheduleScrollProgressRender() {
    var state = window.portfolioState;
    if (!state) return;

    if (state.scrollRafId) return;
    state.scrollRafId = requestAnimationFrame(renderScrollProgress);
}

function initScrollProgress() {
    var state = window.portfolioState;
    if (!state) return;

    state.scrollRafId = 0;
    state.totalScrollableHeight = 0;

    // Initial calculation
    updateScrollMetrics();
    renderScrollProgress();

    // Update on scroll (passive for performance)
    window.addEventListener("scroll", scheduleScrollProgressRender, { passive: true });

    // Update on resize
    window.addEventListener("resize", function () {
        updateScrollMetrics();
        scheduleScrollProgressRender();
    });

    // Optional: update after page fully loads (images/content may change height)
    window.addEventListener("load", function () {
        updateScrollMetrics();
        renderScrollProgress();
    });
}