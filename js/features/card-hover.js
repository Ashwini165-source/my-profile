function handleCardHover(event, isEnter) {
    // Disable hover effects on touch devices
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }

    var target = event.target;
    if (!(target instanceof Element)) return;

    var card = target.closest("[data-hover-type]");
    if (!card) return;

    var hoverType = card.getAttribute("data-hover-type");

    // 🌟 LIFT (Enhanced 3D)
    if (hoverType === "lift") {
        if (isEnter) {
            card.style.transform = "translateY(-10px) scale(1.02)";
            card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.35)";
        } else {
            card.style.transform = "translateY(0) scale(1)";
            card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
        }
        return;
    }

    // 🔍 SCALE (Smooth zoom)
    if (hoverType === "scale") {
        card.style.transform = isEnter ? "scale(1.07)" : "scale(1)";
        card.style.boxShadow = isEnter
            ? "0 15px 30px rgba(0,0,0,0.25)"
            : "0 6px 15px rgba(0,0,0,0.12)";
        return;
    }

    // ✨ GLOW (for premium cards)
    if (hoverType === "glow") {
        if (isEnter) {
            card.style.transform = "translateY(-6px) scale(1.02)";
            card.style.boxShadow = "0 0 25px rgba(59,130,246,0.5)";
        } else {
            card.style.transform = "translateY(0) scale(1)";
            card.style.boxShadow = "0 6px 15px rgba(0,0,0,0.15)";
        }
        return;
    }

    // 🧊 TILT (3D mouse tracking)
    if (hoverType === "tilt") {
        if (isEnter) {
            card.addEventListener("mousemove", tiltEffect);
        } else {
            card.removeEventListener("mousemove", tiltEffect);
            card.style.transform = "rotateX(0deg) rotateY(0deg)";
        }
        return;
    }

    function tiltEffect(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        var rotateX = (y / rect.height - 0.5) * 12;
        var rotateY = (x / rect.width - 0.5) * -12;

        card.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale(1.03)";
    }
}