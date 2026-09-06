var GEO_CACHE_KEY = "portfolio-user-location";
var GEO_CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours

function setLocationText(text) {
    var el = window.portfolioElements?.heroLocation;
    if (el) el.textContent = text;
}

function getCachedLocation() {
    try {
        var cached = localStorage.getItem(GEO_CACHE_KEY);
        if (!cached) return null;

        var parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp > GEO_CACHE_TTL) return null;

        return parsed.value;
    } catch (e) {
        return null;
    }
}

function setCachedLocation(value) {
    try {
        localStorage.setItem(
            GEO_CACHE_KEY,
            JSON.stringify({
                value: value,
                timestamp: Date.now()
            })
        );
    } catch (e) { }
}

function extractLocation(address) {
    return (
        address.city ||
        address.town ||
        address.village ||
        address.county ||
        address.state ||
        address.country ||
        "your region"
    );
}

function fetchUserLocation() {
    var elements = window.portfolioElements;
    if (!elements?.heroLocation) return;

    // 1️⃣ Use cached location (fast path)
    var cached = getCachedLocation();
    if (cached) {
        setLocationText("Visiting from " + cached + " 🌍");
        return;
    }

    setLocationText("Locating you...");

    // 2️⃣ Check support
    if (!("geolocation" in navigator)) {
        setLocationText("Thanks for visiting! 🌟");
        return;
    }

    // 3️⃣ Get coordinates
    navigator.geolocation.getCurrentPosition(
        function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            var url =
                "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
                lat +
                "&lon=" +
                lon +
                "&zoom=10";

            // 4️⃣ Fetch location with timeout
            var controller = new AbortController();
            var timeout = setTimeout(function () {
                controller.abort();
            }, 8000);

            fetch(url, { signal: controller.signal })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                    clearTimeout(timeout);

                    if (data && data.address) {
                        var place = extractLocation(data.address);
                        setCachedLocation(place);
                        setLocationText("Visiting from " + place + " 🌍");
                    } else {
                        setLocationText("Thanks for visiting! 🌍");
                    }
                })
                .catch(function (err) {
                    console.warn("Geocoding failed:", err);
                    setLocationText("Thanks for visiting! 🌍");
                });
        },
        function (error) {
            console.warn("Geolocation denied/failed:", error);
            setLocationText("Thanks for visiting! 🌟");
        },
        {
            timeout: 10000,
            maximumAge: 300000, // reuse recent location (5 min)
            enableHighAccuracy: false
        }
    );
}