// project-sort.js

function initProjectSort() {
    var elements = window.portfolioElements;
    var state = window.portfolioState;

    // Guard checks
    if (!elements || !elements.projectSort || !state) return;

    elements.projectSort.addEventListener("change", function () {
        var newSort = elements.projectSort.value;

        // Prevent unnecessary re-render
        if (state.sortOrder === newSort) return;

        // Update state
        state.sortOrder = newSort;

        // Reset cache safely
        resetProjectCache();

        // Re-render
        renderProjects();
    });
}

/**
 * Reset project filter cache safely
 */
function resetProjectCache() {
    var state = window.portfolioState;
    if (!state) return;

    if (!state._projectFilterCache) {
        state._projectFilterCache = {
            query: "",
            category: "",
            sort: "",
            result: null
        };
    } else {
        state._projectFilterCache.result = null;
    }
}