// skills-render.js

function renderSkills() {
    var state = window.portfolioState;
    var elements = window.portfolioElements;

    // Guard checks
    if (
        !state ||
        !elements ||
        !elements.skillsContainer ||
        !Array.isArray(state.skillsData)
    ) return;

    // Update filter button UI
    if (elements.skillFilterButtons) {
        elements.skillFilterButtons.forEach(function (b) {
            var isActive = b.getAttribute("data-category") === state.skillCategory;

            b.className = isActive
                ? "skill-filter-btn px-6 py-2 rounded-full border-2 border-blue-500 bg-blue-500 text-white font-bold transition-all"
                : "skill-filter-btn px-6 py-2 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-bold transition-all";
        });
    }

    elements.skillsContainer.innerHTML = "";

    var category = state.skillCategory || "All";

    var filtered = state.skillsData.filter(function (skill) {
        return category === "All" || skill.category === category;
    });

    // Empty state
    if (filtered.length === 0) {
        var msg = document.createElement("p");
        msg.style.cssText = "text-align:center; color:#9ca3af; padding:32px; font-size:16px;";
        msg.textContent = "No skills found.";
        elements.skillsContainer.appendChild(msg);
        return;
    }

    // Use fragment for performance
    var fragment = document.createDocumentFragment();

    filtered.forEach(function (skill) {
        var card = document.createElement("div");
        card.setAttribute("data-hover-type", "lift");
        card.style.cssText =
            "padding:32px; text-align:center; background:#fff; border-radius:24px; " +
            "box-shadow:0 4px 16px rgba(0,0,0,0.08); transition:box-shadow 0.3s, transform 0.3s; cursor:default;";

        var iconBox = document.createElement("div");
        iconBox.style.cssText =
            "width:80px; height:80px; margin:0 auto 16px auto; background:#14532d; " +
            "border-radius:16px; display:flex; align-items:center; justify-content:center;";

        var iconText = document.createElement("span");
        iconText.style.cssText = "font-size:24px; color:#fff; font-weight:700;";
        iconText.textContent = skill.shortLabel || "NA";
        iconBox.appendChild(iconText);

        var badge = document.createElement("span");
        badge.style.cssText =
            "display:inline-block; margin-bottom:12px; padding:4px 12px; font-size:11px; " +
            "font-weight:700; border-radius:9999px; background:#e0f2fe; color:#0369a1;";
        badge.textContent = skill.category || "General";

        var skillName = document.createElement("h3");
        skillName.style.cssText =
            "font-size:18px; font-weight:700; margin-bottom:8px; color:#1f2937;";
        skillName.textContent = skill.name || "Unnamed Skill";

        var skillDescription = document.createElement("p");
        skillDescription.style.cssText =
            "font-size:13px; color:#6b7280; line-height:1.5;";
        skillDescription.textContent = skill.description || "";

        card.appendChild(iconBox);
        card.appendChild(badge);
        card.appendChild(skillName);
        card.appendChild(skillDescription);

        fragment.appendChild(card);
    });

    elements.skillsContainer.appendChild(fragment);
}

function initSkillsFilter() {
    var elements = window.portfolioElements;
    var state = window.portfolioState;

    if (!elements || !elements.skillFilterButtons || !state) return;

    elements.skillFilterButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var selectedCategory = btn.getAttribute("data-category");

            // Prevent unnecessary re-render
            if (state.skillCategory === selectedCategory) return;

            state.skillCategory = selectedCategory;

            renderSkills();
        });
    });
}