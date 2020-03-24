loadBasisTemplate3(subTemplateData);

function loadBasisTemplate3(sidebarData) {
  let cloneCarouselTemplate = document.getElementById("carousel-template").content.cloneNode(true);
  let caraouselParent = document.getElementById("carousel-parent");
  caraouselParent.textContent = "";
  cloneCarouselTemplate.getElementById("main-heading").textContent = sidebarData.mainHeading;
  cloneCarouselTemplate.getElementById("subheading").textContent = sidebarData.subheading;

  loadSlidePictures(sidebarData.carouselItemArray, cloneCarouselTemplate);

  caraouselParent.appendChild(cloneCarouselTemplate);
}

function loadSlidePictures(carouselItemArray, cloneCarouselTemplate) {
    carouselItemArray.forEach((element, i) => {
        
        let clone = document.getElementById("slide-picture-template").content.cloneNode(true);
        let slidePictureParent = cloneCarouselTemplate.getElementById("slide-picture-parent");
        clone.getElementById("slide-picture").src = element.slidepicture;
        clone.getElementById("slide-description").textContent = element.slideDescription;
        if(i == 0) {
            clone.querySelector(".carousel-item").classList.add("active");
        }
        slidePictureParent.appendChild(clone);  
    });
}
    
