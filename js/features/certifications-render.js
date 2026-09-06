(function () {

    // ─────────────────────────────────────────────
    // OPEN CERTIFICATE MODAL (GLOBAL FUNCTION)
    // ─────────────────────────────────────────────
    window.openCertificate = function (imageSrc) {
        var modal = document.getElementById("cert-modal");
        var img = document.getElementById("cert-image");

        if (!modal || !img) return;

        if (!imageSrc) {
            console.warn("No certificate image provided");
            return;
        }

        img.src = imageSrc;
        modal.classList.remove("hidden");
    };

    // ─────────────────────────────────────────────
    // CLOSE MODAL (click outside or reuse)
    // ─────────────────────────────────────────────
    window.closeCertificate = function () {
        var modal = document.getElementById("cert-modal");
        var img = document.getElementById("cert-image");

        if (!modal) return;

        modal.classList.add("hidden");
        if (img) img.src = "";
    };

    // Close when clicking background
    document.addEventListener("click", function (e) {
        var modal = document.getElementById("cert-modal");
        if (!modal) return;

        if (e.target === modal) {
            window.closeCertificate();
        }
    });

    // ─────────────────────────────────────────────
    // RENDER CERTIFICATIONS
    // ─────────────────────────────────────────────
    function renderCertifications() {
        var elements = window.portfolioElements;

        if (!elements.certificationsContainer ||
            typeof certificationsData === "undefined" ||
            !Array.isArray(certificationsData)) return;

        elements.certificationsContainer.innerHTML = "";

        certificationsData.forEach(function (cert) {

            var card = document.createElement("div");
            card.setAttribute("data-hover-type", "scale");

            card.style.cssText =
                "padding:24px;border-radius:16px;" +
                "box-shadow:0 4px 20px rgba(0,0,0,0.12);" +
                "background:linear-gradient(to right,#3b82f6,#6366f1);" +
                "color:#fff;text-align:center;";

            var title = document.createElement("h3");
            title.textContent = cert.title;

            var issuer = document.createElement("p");
            issuer.textContent = "Issuer: " + cert.issuer;

            var year = document.createElement("p");
            year.textContent = "Year: " + cert.year;

            var btn = document.createElement("button");
            btn.textContent = "View Certificate";

            btn.style.cssText =
                "margin-top:12px;padding:6px 14px;" +
                "background:#fff;color:#3b82f6;" +
                "border:none;border-radius:6px;" +
                "font-weight:600;cursor:pointer;";

            btn.addEventListener("click", function (e) {
                e.stopPropagation();

                if (cert.image) {
                    window.openCertificate(cert.image);
                } else {
                    alert("Certificate image not added in data!");
                }
            });

            card.appendChild(title);
            card.appendChild(issuer);
            card.appendChild(year);
            card.appendChild(btn);

            elements.certificationsContainer.appendChild(card);
        });
    }

    // expose globally if needed
    window.renderCertifications = renderCertifications;

})();