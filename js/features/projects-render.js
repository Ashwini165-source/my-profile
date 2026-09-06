function renderProjects() {
    var state = window.portfolioState;
    var elements = window.portfolioElements;

    if (!elements.projectsContainer || !Array.isArray(state.projectsData)) return;

    var result = [];
    var q = state.searchQuery.toLowerCase();

    var validCategories = ["All"];
    if (elements.filterButtons && elements.filterButtons.length > 0) {
        validCategories = elements.filterButtons.map(function (b) {
            return b.getAttribute("data-category");
        });
    }
    if (!validCategories.includes(state.categoryFilter)) {
        state.categoryFilter = "All";
    }

    var c = state.categoryFilter;
    var s = state.sortOrder;
    var cache = state._projectFilterCache;

    if (cache && cache.query === q && cache.category === c && cache.sort === s && cache.result) {
        result = cache.result;
    } else {
        result = [].concat(state.projectsData);

        if (q) {
            result = result.filter(function (project) {
                return project.name.toLowerCase().includes(q) ||
                    project.description.toLowerCase().includes(q) ||
                    project.category.toLowerCase().includes(q) ||
                    project.technologies.some(function (tech) {
                        return tech.toLowerCase().includes(q);
                    });
            });
        }

        if (c !== "All") {
            result = result.filter(function (project) {
                return project.category === c;
            });
        }

        if (s === "az") {
            result.sort(function (a, b) { return a.name.localeCompare(b.name); });
        } else if (s === "za") {
            result.sort(function (a, b) { return b.name.localeCompare(a.name); });
        }

        if (cache) {
            cache.query = q;
            cache.category = c;
            cache.sort = s;
            cache.result = result;
        }
    }

    // Update UI
    if (elements.projectCount) {
        elements.projectCount.textContent =
            result.length + " project" + (result.length === 1 ? "" : "s") + " found";
    }

    elements.projectsContainer.innerHTML = "";

    if (result.length === 0) {
        var msg = document.createElement("p");
        msg.style.cssText = "grid-column:1/-1;text-align:center;color:#94a3b8;padding:48px;font-size:18px;";
        msg.textContent = "No projects found.";
        elements.projectsContainer.appendChild(msg);
        return;
    }

    var fragment = document.createDocumentFragment();

    result.forEach(function (project) {

        // 🌟 MAIN CARD (3D GLASS STYLE)
        var card = document.createElement("div");
        card.style.cssText = `
            padding:28px;
            border-radius:20px;
            background: linear-gradient(145deg, #0f172a, #1e293b);
            color:#e2e8f0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            transition: all 0.4s ease;
            cursor:pointer;
            transform-style: preserve-3d;
        `;

        // ✨ 3D hover effect
        card.addEventListener("mousemove", function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            var rotateX = (y / rect.height - 0.5) * 10;
            var rotateY = (x / rect.width - 0.5) * -10;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "rotateX(0) rotateY(0) scale(1)";
        });

        card.addEventListener("click", function () {
            recordProjectView(project.name);
        });

        // 🏷 CATEGORY
        var badge = document.createElement("span");
        badge.style.cssText = `
            display:inline-block;
            margin-bottom:12px;
            padding:5px 14px;
            font-size:12px;
            font-weight:700;
            border-radius:999px;
            background:rgba(59,130,246,0.15);
            color:#60a5fa;
        `;
        badge.textContent = project.category;

        // 🧠 NAME
        var projectName = document.createElement("h3");
        projectName.style.cssText = `
            font-size:20px;
            font-weight:700;
            margin-bottom:10px;
            color:#f1f5f9;
        `;
        projectName.textContent = project.name;

        // 📄 DESCRIPTION
        var projectDescription = document.createElement("p");
        projectDescription.style.cssText = `
            font-size:13px;
            color:#cbd5f5;
            margin-bottom:12px;
            line-height:1.6;
        `;

        if (project.description.length > 100) {
            var isExpanded = !!state.expandedProjects[project.name];

            var textSpan = document.createElement("span");
            textSpan.textContent = isExpanded
                ? project.description
                : project.description.slice(0, 100) + "...";

            var toggleBtn = document.createElement("button");
            toggleBtn.textContent = isExpanded ? "View Less" : "View More";
            toggleBtn.style.cssText = `
                color:#38bdf8;
                font-weight:600;
                background:none;
                border:none;
                cursor:pointer;
                margin-left:5px;
            `;

            toggleBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                state.expandedProjects[project.name] = !isExpanded;
                renderProjects();
            });

            projectDescription.appendChild(textSpan);
            projectDescription.appendChild(toggleBtn);
        } else {
            projectDescription.textContent = project.description;
        }

        // ⚙️ TECH STACK
        var techDiv = document.createElement("div");
        techDiv.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;";

        project.technologies.forEach(function (tech) {
            var tag = document.createElement("span");
            tag.style.cssText = `
                padding:3px 10px;
                font-size:11px;
                border-radius:6px;
                background:#020617;
                color:#38bdf8;
                border:1px solid rgba(56,189,248,0.2);
            `;
            tag.textContent = tech;
            techDiv.appendChild(tag);
        });

        // 🚦 STATUS
        var statusBadge = document.createElement("span");
        statusBadge.style.cssText = project.status === "Live"
            ? "padding:4px 12px;font-size:12px;border-radius:999px;background:#16a34a;color:white;"
            : "padding:4px 12px;font-size:12px;border-radius:999px;background:#f59e0b;color:white;";
        statusBadge.textContent = project.status;

        // 🔗 LINKS
        var linksDiv = document.createElement("div");
        linksDiv.style.cssText = "display:flex;gap:16px;margin-top:14px;";

        function createLink(text, url, color) {
            var link = document.createElement("a");
            link.href = url;
            link.textContent = text;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.style.cssText = `
                font-size:13px;
                font-weight:600;
                color:${color};
                text-decoration:none;
                transition:0.3s;
            `;
            link.onmouseover = function () {
                link.style.textDecoration = "underline";
            };
            link.onmouseout = function () {
                link.style.textDecoration = "none";
            };
            return link;
        }

        linksDiv.appendChild(createLink("GitHub", project.github, "#94a3b8"));

        // 🧩 APPEND
        card.appendChild(badge);
        card.appendChild(projectName);
        card.appendChild(projectDescription);
        card.appendChild(techDiv);
        card.appendChild(statusBadge);
        card.appendChild(linksDiv);

        fragment.appendChild(card);
    });

    elements.projectsContainer.appendChild(fragment);
}