function renderEducation() {
    var container = document.getElementById("education-container");
    if (!container || typeof educationData === "undefined") return;

    container.innerHTML = "";

    educationData.forEach(function (edu) {
        var card = document.createElement("div");
        card.className = "glass p-6 rounded card-3d";

        var title = document.createElement("h3");
        title.className = "font-bold";
        title.textContent = edu.title;

        var details = document.createElement("p");
        details.textContent = edu.details;

        card.appendChild(title);
        card.appendChild(details);
        container.appendChild(card);
    });
}