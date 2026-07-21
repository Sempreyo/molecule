document.addEventListener("DOMContentLoaded", () => {
	const myModal = new HystModal({
		linkAttributeName: "data-hystmodal"
	});

	// Массив для хранения активных таймеров анимации
	let animationTimeouts = [];

	$("#pagepiling").pagepiling({
		sectionSelector: ".graphic",
		direction: "vertical",
		sectionsColor: [
			"transparent",
			"#403f4d",
			"#403f4d",
			"#403f4d",
			"#403f4d",
			"#403f4d",
			"#403f4d",
			"#403f4d",
			"#403f4d",
			"#403f4d",
			"#403f4d"
		],
		navigation: false,
		anchors: ["page1", "page2", "page3", "page4", "page5", "page6", "page7", "page8", "page9", "page10", "page11"],
		menu: ".graphic-menu",
		afterRender: function() {
			// После инициализации показываем страницу
			document.getElementById("pagepiling").classList.add("pp-initialized");

			// Удалить якорь из урла
			if (location.hash !== "") {
				history.replaceState(null, null, window.location.pathname + window.location.search);
			}

			// Клик по атомам в оглавлении
			const topAnchors = document.querySelectorAll("[data-anchortop]");

			topAnchors.forEach(el => {
				el.addEventListener("click", function () {
					$.fn.pagepiling.moveTo(el.getAttribute("data-anchortop"));
				});
			});

			// Анимация мигания атомов при открытии
			topAnchors.forEach((el, index) => {
				setTimeout(() => {
					el.style.animation = "blinkOpacity 0.6s ease";
				}, index * 100);
			});
		},
		afterLoad: function(anchorLink, index) {
			const activeSection = document.querySelector(".graphic.active");
			const tabText = document.querySelectorAll(".graphic .desc__title-text, .graphic .desc__text");
			const activeTabText = activeSection.querySelectorAll(".desc__title-text, .desc__text");
			const tabContent = document.querySelectorAll(".desc__content");
			const activeTabContent = activeSection.querySelector(".desc__content");

			tabText.forEach(el => {
				el.style.opacity = "0";
				el.style.transform = "translateY(5px)";
			});

			tabContent.forEach(el => {
				el.style.opacity = "0";
			});

			activeTabText.forEach((el, i) => {
				setTimeout(() => {
					el.style.opacity = "1";
					el.style.transform = "translateY(0)";
				}, 250 * i);

				if (i === activeTabText.length - 1) {
					setTimeout(() => {
						activeTabContent.style.opacity = "1";
					}, 250 * (i + 1));
				}
			});
		}
	});
});
