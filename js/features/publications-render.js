// publications-render.js

function renderPublications() {
    var elements = window.portfolioElements;

    // Guard checks
    if (
        !elements ||
        !elements.publicationsContainer ||
        typeof publicationsData === "undefined" ||
        !Array.isArray(publicationsData)
    ) return;

    // Clear container
    elements.publicationsContainer.innerHTML = "";

    // Handle empty state
    if (publicationsData.length === 0) {
        var msg = document.createElement("p");
        msg.style.cssText = "text-align:center; color:#9ca3af; padding:32px; font-size:16px;";
        msg.textContent = "No publications available.";
        elements.publicationsContainer.appendChild(msg);
        return;
    }

    // Use fragment for better performance
    var fragment = document.createDocumentFragment();

    publicationsData.forEach(function (pub) {
        var card = document.createElement("div");
        card.setAttribute("data-hover-type", "scale");
        card.style.cssText =
            "padding:24px; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,0.12); " +
            "background:linear-gradient(to right, #ec4899, #9333ea); color:#fff; " +
            "transition:transform 0.3s; cursor:default;";

        var title = document.createElement("h3");
        title.style.cssText =
            "font-size:16px; font-weight:700; margin-bottom:8px; line-height:1.4;";
        title.textContent = pub.title || "Untitled";

        var publisher = document.createElement("p");
        publisher.style.cssText = "font-size:13px;";
        publisher.textContent = "Publisher: " + (pub.publisher || "N/A");

        var year = document.createElement("p");
        year.style.cssText =
            "font-size:13px; font-weight:600; margin-top:4px;";
        year.textContent = "Year: " + (pub.year || "N/A");
        var btn = document.createElement("button");
        btn.textContent = "View Publication";

        btn.style.cssText =
            "margin-top:12px;padding:6px 14px;" +
            "background:#fff;color:#9333ea;" +
            "border:none;border-radius:6px;" +
            "font-weight:600;cursor:pointer;";

        btn.addEventListener("click", function (e) {
            e.stopPropagation();

            if (pub.pdf) {
                window.open(pub.pdf, "_blank");
            } else {
                alert("Publication PDF not added!");
            }
        });

        card.appendChild(title);
        card.appendChild(publisher);
        card.appendChild(year);
        card.appendChild(btn);

        fragment.appendChild(card);
    });

    // Single DOM paint
    elements.publicationsContainer.appendChild(fragment);
}