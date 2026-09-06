function initTypingAnimation() {
    var elements = window.portfolioElements;
    if (!elements || !elements.typingText) return;

    var roles = [
        "Full-Stack Developer",
        "MERN Enthusiast",
        "Competitive Programmer"
    ];

    var roleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function typeEffect() {
        if (!elements.typingText) return;

        var currentRole = roles[roleIndex];

        // Update text
        elements.typingText.textContent = currentRole.substring(0, charIndex);

        // Control speed
        var typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting) {
            charIndex++;

            // Finished typing word
            if (charIndex > currentRole.length) {
                isDeleting = true;
                typingSpeed = 1500; // pause before deleting
            }
        } else {
            charIndex--;

            // Finished deleting word
            if (charIndex < 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                charIndex = 0;
                typingSpeed = 500; // pause before next word
            }
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start with slight delay for smoother load
    setTimeout(typeEffect, 600);
}