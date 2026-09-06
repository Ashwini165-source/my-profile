// project-search.js

function initProjectSearch() {
    var elements = window.portfolioElements;
    var state = window.portfolioState;

    // Guard checks
    if (!elements || !elements.projectSearch || !state) return;

    var searchTimeout;

    elements.projectSearch.addEventListener("input", function () {
        clearTimeout(searchTimeout); // Cancel previous debounce

        searchTimeout = setTimeout(function () {
            var newQuery = elements.projectSearch.value.trim();

            // Avoid unnecessary re-render
            if (state.searchQuery === newQuery) return;

            // Update state
            state.searchQuery = newQuery;

            // Reset cache safely
            resetProjectCache();

            // Re-render
            renderProjects();
        }, 300); // Debounce delay
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