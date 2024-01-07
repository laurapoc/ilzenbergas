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

export function loadCamera(cameraUrl) {
  waitForElement("#photo-gallery-content", document.body).then(() => {
    let streamCamParent = document.getElementById("stream-cam-parent");
    if (cameraUrl && cameraUrl != "" && streamCamParent) {
      let options = {
        controls: true,
        autoplay: false,
        preload: "auto",
        width: "640",
        height: "360",
        experimentalSvgIcons: true,
      };

      let streamCamElement = document.createElement("video-js");
      streamCamElement.id = "stream-cam";
      streamCamElement.classList.add("vjs-big-play-centered");
      streamCamParent.appendChild(streamCamElement);

      let streamCam = videojs("stream-cam", options);
      streamCam.src({
        type: "application/x-mpegURL",
        src: cameraUrl
      });
      streamCam.ready(function () {
        console.log("Video component ready");
        streamCam.play();
      });
    }
  });
}
