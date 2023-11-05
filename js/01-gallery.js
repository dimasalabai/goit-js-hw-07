import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const galleryList = document.querySelector(".gallery");

galleryList.insertAdjacentHTML("beforeend", createMarkup(galleryItems));

galleryList.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.target === e.currentTarget) {
		return;
	}
	const currentImage =
		e.target.closest(".gallery__item").firstElementChild.firstElementChild;

	const currentImageId = currentImage.dataset.source;
	const image = galleryItems.find(
		({ original }) => original === currentImageId //Отримуємо об'єкт картинки
	);
	const instance = basicLightbox.create(`
	    <img src="${image.original}">
	`);
	instance.show();

	document.addEventListener("keyup", (e) => {
		if (e.code === "Escape" && instance.visible()) {
			instance.close();
		}
	});
});

function createMarkup(arr) {
	return arr
		.map(
			({ preview, description, original }) =>
				`<li class="gallery__item">
  				<a class="gallery__link" href="large-image.jpg">
    			<img
					class="gallery__image"
					src="${preview}"
					data-source="${original}"
					alt="${description}"
				/>
				</a>
			</li>`
		)
		.join("");
}
