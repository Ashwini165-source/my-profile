(() => {
	const navToggle = document.getElementById("nav-toggle");
	const mobileMenu = document.getElementById("mobile-menu");
	const openIcon = document.getElementById("nav-icon-open");
	const closeIcon = document.getElementById("nav-icon-close");

	const themeToggle = document.getElementById("theme-toggle");
	const themeToggleMobile = document.getElementById("theme-toggle-mobile");

	const modalTrigger = document.getElementById("modal-trigger");
	const modalTriggerMobile = document.getElementById("modal-trigger-mobile");

	let lastFocusedElement = null;

	// ─────────────────────────────────────────────
	// MENU ACCESSIBILITY
	// ─────────────────────────────────────────────
	function setAriaExpanded(isOpen) {
		if (!navToggle) return;
		navToggle.setAttribute("aria-expanded", String(isOpen));
		navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
	}

	function swapIcons(isOpen) {
		if (!openIcon || !closeIcon) return;
		openIcon.classList.toggle("hidden", isOpen);
		closeIcon.classList.toggle("hidden", !isOpen);
	}

	function openMenu() {
		if (!mobileMenu) return;

		lastFocusedElement = document.activeElement;

		mobileMenu.classList.add("open");
		document.body.classList.add("overflow-hidden");

		swapIcons(true);
		setAriaExpanded(true);

		const firstLink = mobileMenu.querySelector("a, button");
		if (firstLink) firstLink.focus();
	}

	function closeMenu() {
		if (!mobileMenu) return;

		mobileMenu.classList.remove("open");
		document.body.classList.remove("overflow-hidden");

		swapIcons(false);
		setAriaExpanded(false);

		if (lastFocusedElement) lastFocusedElement.focus();
	}

	function toggleMenu() {
		if (!mobileMenu) return;
		mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
	}

	// ─────────────────────────────────────────────
	// EVENTS (MENU)
	// ─────────────────────────────────────────────
	if (navToggle) {
		navToggle.addEventListener("click", toggleMenu);
	}

	window.addEventListener("resize", () => {
		if (window.innerWidth >= 768) closeMenu();
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeMenu();
	});

	if (mobileMenu) {
		mobileMenu.addEventListener("click", (e) => {
			if (e.target.closest("a[href^='#']")) {
				closeMenu();
			}
		});
	}

	// click outside closes menu
	document.addEventListener("click", (e) => {
		if (
			mobileMenu &&
			mobileMenu.classList.contains("open") &&
			!mobileMenu.contains(e.target) &&
			!navToggle.contains(e.target)
		) {
			closeMenu();
		}
	});

	// ─────────────────────────────────────────────
	// THEME SYSTEM (FIXED + PERSISTENT)
	// ─────────────────────────────────────────────
	function applyTheme(theme) {
		const isDark = theme === "dark";

		document.body.classList.toggle("dark-mode", isDark);
		localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");

		const text = isDark ? "☀ Light" : "🌙 Dark";

		if (themeToggle) themeToggle.textContent = text;
		if (themeToggleMobile) themeToggleMobile.textContent = text;
	}

	function loadTheme() {
		const saved = localStorage.getItem("portfolio-theme") || "light";
		applyTheme(saved);
	}

	function toggleTheme() {
		const isDark = document.body.classList.contains("dark-mode");
		applyTheme(isDark ? "light" : "dark");
	}

	if (themeToggle) {
		themeToggle.addEventListener("click", toggleTheme);
	}

	if (themeToggleMobile) {
		themeToggleMobile.addEventListener("click", toggleTheme);
	}

	// ─────────────────────────────────────────────
	// MODAL SYNC
	// ─────────────────────────────────────────────
	if (modalTrigger && modalTriggerMobile) {
		modalTriggerMobile.addEventListener("click", () => modalTrigger.click());
	}

	// ─────────────────────────────────────────────
	// INIT
	// ─────────────────────────────────────────────
	loadTheme();
})();