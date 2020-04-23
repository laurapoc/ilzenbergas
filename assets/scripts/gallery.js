import { waitForElement } from "./functions.js";

// photo gallery
$('[data-fancybox="gallery"]').fancybox({
  loop: true,
  animationDuration: 500,
  protect: true,
});

console.warn("must remove global scope usage, call loadGalleryContent directly");

export function loadGalleryContent(galleryData) {
  // CLONE GALLERY CONTENT TEMPLATE:
  let galleryParent = document.getElementById("gallery-parent");
  waitForElement("#photo-gallery-content", document.body).then(() => {
    let galleryTemplate = document.getElementById("photo-gallery-content");
    if (galleryData) {
      galleryData.forEach((element) => {
        let cloneGallery = galleryTemplate.content.cloneNode(true);
        let bigPhoto = cloneGallery.getElementById("big-photo");
        bigPhoto.href = element.sizes.large;
        let smallPhoto = cloneGallery.getElementById("small-photo");
        smallPhoto.src = element.sizes.medium;
        galleryParent.appendChild(cloneGallery);
      });
    }
  });
}
