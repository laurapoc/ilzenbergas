/*jshint esversion: 6 */
import { waitForElement } from "./functions.js";

// photo gallery
$('[data-fancybox="gallery"]').fancybox({
  loop: true,
  animationDuration: 500,
  protect: true,
});

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
        bigPhoto.setAttribute("alt", element.alt);
        let smallPhoto = cloneGallery.getElementById("small-photo");
        smallPhoto.src = element.sizes.medium;
        smallPhoto.alt = element.alt;
        galleryParent.appendChild(cloneGallery);
      });
    }
  });
}
