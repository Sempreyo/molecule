document.addEventListener("DOMContentLoaded", () => {
	$("#pagepiling").pagepiling({
		sectionSelector: ".graphic",
		direction: "vertical",
		sectionsColor: [
			"#000000",
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
			const topAnchors = $("[data-anchortop]");

			topAnchors.on("click", function () {
				$.fn.pagepiling.moveTo($(this).attr("data-anchortop"));
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

	/* Открытие инфографики */
	const graphicPreview = document.querySelector(".article__preview");
	const graphic = document.querySelector(".article__window");
	const closeButton = document.querySelector(".article__close");

	if (graphicPreview) {
		graphicPreview.addEventListener("click", () => {
			graphic.classList.add("open");
		});
	}

	if (closeButton) {
		closeButton.addEventListener("click", () => {
			graphic.classList.remove("open");
		});
	}
});
