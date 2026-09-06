function renderParticipations() {
    var elements = window.portfolioElements;

    if (
        !elements?.participationsContainer ||
        typeof participationsData === "undefined" ||
        !Array.isArray(participationsData)
    ) return;

    elements.participationsContainer.innerHTML = "";

    // Use fragment for performance
    var fragment = document.createDocumentFragment();

    participationsData.forEach(function (part) {
        var card = document.createElement("div");
        card.setAttribute("data-hover-type", "scale");
        card.style.cssText =
            "padding:24px; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,0.12); " +
            "background:linear-gradient(to right, #34d399, #14b8a6); color:#fff; " +
            "transition:transform 0.3s ease, box-shadow 0.3s ease; cursor:default;";

        // Title
        var title = document.createElement("h3");
        title.style.cssText =
            "font-size:18px; font-weight:700; margin-bottom:6px;";
        title.textContent = part.title;

        // Optional Role (future-ready)
        if (part.role) {
            var role = document.createElement("p");
            role.style.cssText = "font-size:13px; opacity:0.9;";
            role.textContent = part.role;
            card.appendChild(role);
        }

        // Year
        var year = document.createElement("p");
        year.style.cssText =
            "font-size:12px; font-weight:600; margin-top:6px; opacity:0.85;";
        year.textContent = part.year;

        // Optional Achievement / highlight
        if (part.highlight) {
            var highlight = document.createElement("p");
            highlight.style.cssText =
                "font-size:12px; margin-top:6px; opacity:0.9;";
            highlight.textContent = part.highlight;
            card.appendChild(highlight);
        }

        // Optional badge
        var badge = document.createElement("span");
        badge.style.cssText =
            "display:inline-block; margin-top:10px; padding:4px 10px; " +
            "font-size:11px; border-radius:9999px; background:rgba(255,255,255,0.2);";
        badge.textContent = "Participation";

        // Optional link
        if (part.link) {
            var link = document.createElement("a");
            link.href = part.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "View Details";
            link.style.cssText =
                "display:block; margin-top:8px; font-size:12px; text-decoration:underline; color:#ecfeff;";
            card.appendChild(link);
        }

        card.appendChild(title);
        card.appendChild(year);
        card.appendChild(badge);

        fragment.appendChild(card);
    });

    elements.participationsContainer.appendChild(fragment);
}