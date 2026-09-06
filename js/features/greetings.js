function getGreetingData(hour) {
    if (hour >= 5 && hour < 12) {
        return { text: "Good morning", emoji: "☀️" };
    }
    if (hour >= 12 && hour < 17) {
        return { text: "Good afternoon", emoji: "☕" };
    }
    if (hour >= 17 && hour < 21) {
        return { text: "Good evening", emoji: "🌆" };
    }
    return { text: "Good night", emoji: "🌙" };
}

function getUserName() {
    try {
        var saved = localStorage.getItem("portfolio-contact-form");
        if (!saved) return null;

        var data = JSON.parse(saved);
        return data.name ? data.name.split(" ")[0] : null; // first name only
    } catch (e) {
        return null;
    }
}

function renderGreeting() {
    var elements = window.portfolioElements;
    if (!elements?.heroGreeting) return;

    var hour = new Date().getHours();
    var greetingData = getGreetingData(hour);
    var name = getUserName();

    var text = greetingData.text + " " + greetingData.emoji;

    // Personalization (if user filled contact form before)
    if (name) {
        text += ", " + name + " 👋";
    } else {
        text += ",";
    }

    elements.heroGreeting.textContent = text;
}