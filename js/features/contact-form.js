function initContactForm() {
    var elements = window.portfolioElements;

    if (!elements.contactForm) return;

    elements.contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var name = elements.contactName.value.trim();
        var email = elements.contactEmail.value.trim();
        var message = elements.contactMessage.value.trim();
        var msgBox = elements.formMessage;

        msgBox.textContent = "";
        msgBox.className = "text-sm";

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // NAME
        if (name.length < 3) {
            msgBox.textContent = "Enter a valid name (min 3 chars)";
            msgBox.classList.add("text-red-500");
            elements.contactName.focus();
            return;
        }

        // EMAIL
        if (!emailPattern.test(email)) {
            msgBox.textContent = "Enter a valid email";
            msgBox.classList.add("text-red-500");
            elements.contactEmail.focus();
            return;
        }

        // MESSAGE
        if (message.length < 5) {
            msgBox.textContent = "Message should be at least 5 characters";
            msgBox.classList.add("text-red-500");
            elements.contactMessage.focus();
            return;
        }

        // SUCCESS
        msgBox.textContent = "Message sent successfully 🚀";
        msgBox.classList.add("text-green-500");

        elements.contactForm.reset();
    });
}