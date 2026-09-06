function initProjectFilter() {
    var elements = window.portfolioElements;
    var state = window.portfolioState;

    if (!elements.filterButtons) return;

    elements.filterButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            state.categoryFilter = btn.getAttribute("data-category");

            // safe cache reset
            if (state._projectFilterCache) {
                state._projectFilterCache.result = null;
            }

            renderProjects();
        });
    });
}