// photo gallery
$('[data-fancybox="gallery"]').fancybox({
  loop: true,
  animationDuration: 500,
  protect: true
});

// IMPORTING GALLERY DATA:
if(gallerySource) {
  loadGalleryContent(gallerySource);
};


function loadGalleryContent(galleryData) {
  // CLONE GALLERY CONTENT TEMPLATE:
  let galleryTemplate = document.getElementById("photo-gallery-content");
  let galleryParent = document.getElementById("gallery-parent");
  galleryParent.textContent = "";
  galleryData.forEach(element => {
    let cloneGallery = galleryTemplate.content.cloneNode(true);
    let bigPhoto = cloneGallery.getElementById("big-photo");
    bigPhoto.href = element.photoBig;
    let smallPhoto = cloneGallery.getElementById("small-photo");
    smallPhoto.src = element.photoSmall;
    galleryParent.appendChild(cloneGallery);
  });
  
};
