function initModal() {
    var elements = window.portfolioElements;

    if (
        !elements?.modal ||
        !elements?.modalContent ||
        !elements?.modalTrigger ||
        !elements?.modalClose ||
        !elements?.formCancel
    ) return;

    var lastFocusedElement = null;

    // ── Open Modal ────────────────────────────────────────────────────────────
    function openModal() {
        lastFocusedElement = document.activeElement;

        elements.modal.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // prevent background scroll

        setTimeout(function () {
            elements.modalContent.classList.remove("scale-95", "opacity-0");
            elements.modalContent.setAttribute("tabindex", "-1");
            elements.modalContent.focus();
        }, 10);
    }

    // ── Close Modal ───────────────────────────────────────────────────────────
    function closeModal() {
        elements.modalContent.classList.add("scale-95", "opacity-0");

        setTimeout(function () {
            elements.modal.classList.add("hidden");
            document.body.style.overflow = "";

            // Restore focus
            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        }, 200);
    }

    // ── Event Bindings ────────────────────────────────────────────────────────
    elements.modalTrigger.addEventListener("click", openModal);
    elements.modalClose.addEventListener("click", closeModal);
    elements.formCancel.addEventListener("click", closeModal);

    // Click outside to close
    elements.modal.addEventListener("click", function (event) {
        if (event.target === elements.modal) {
            closeModal();
        }
    });

    // ESC key support
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !elements.modal.classList.contains("hidden")) {
            closeModal();
        }
    });

    // Optional: expose globally (useful for other features)
    window.openModal = openModal;
    window.closeModal = closeModal;
}