document.addEventListener("DOMContentLoaded", () => {
	const body = document.body;
	const myModal = new HystModal({
		linkAttributeName: "data-hystmodal"
	});

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
			/* Удалить якорь из урла */
			const hash = location.hash.replace("#","");

			if(hash != "") {
				location.hash = "";
			}

			/* Клик по атомам в оглавлении */
			const topAnchors = document.querySelectorAll("[data-anchortop]");

			topAnchors.forEach(el => {
				el.addEventListener("click", function () {
					$.fn.pagepiling.moveTo(el.getAttribute("data-anchortop"));
				});
			});

			/* Открытие инфографики */
			const graphicPreview = document.querySelector(".article__preview");
			const graphic = document.querySelector(".article__window");
			const closeButton = document.querySelector(".article__close");

			if (graphicPreview) {
				graphicPreview.addEventListener("click", () => {
					graphic.classList.add("open");
					body.style.overflow = "hidden";

					/* Анимация мигания атомов при открытии */
					topAnchors.forEach((el, index) => {
						setTimeout(() => {
							el.style.animation = "blinkOpacity 0.6s ease";
						}, index * 100);
					});
				});
			}

			if (closeButton) {
				closeButton.addEventListener("click", () => {
					graphic.classList.remove("open");
					body.style.overflow = "auto";

					/* После закрытия перемещаем на первый блок */
					setTimeout(() => {
						$.fn.pagepiling.moveTo(1);
					}, 400);

					/* Убрать анимацию мигания атомов */
					topAnchors.forEach(el => {
						el.style.animation = "none";
					});
				});
			}
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
