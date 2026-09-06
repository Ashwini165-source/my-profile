function initBackToTop() {
    var elements = window.portfolioElements;
    if (!elements.backToTop) return;

    elements.backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", function () {
        if (!elements.backToTop) return;

        if (window.scrollY > 300) {
            elements.backToTop.classList.add("show-btn");
        } else {
            elements.backToTop.classList.remove("show-btn");
        }
    }, { passive: true });
}