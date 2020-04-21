// loadBasisTemplate3(subTemplateData);

export function loadBasisTempl3(sidebarData) {
  let cloneCarouselTemplate = document.getElementById("carousel-template").content.cloneNode(true);
  let caraouselParent = document.getElementById("subtemplate");
  cloneCarouselTemplate.querySelector("#main-heading").textContent = sidebarData.mainHeading;
  cloneCarouselTemplate.querySelector("#subheading").textContent = sidebarData.subheading;

  loadSlidePictures(sidebarData.carouselItemArray, cloneCarouselTemplate);

  caraouselParent.appendChild(cloneCarouselTemplate);
}

function loadSlidePictures(carouselItemArray, cloneCarouselTemplate) {
    carouselItemArray.forEach((element, i) => {
        
        let clone = document.getElementById("slide-picture-template").content.cloneNode(true);
        let slidePictureParent = cloneCarouselTemplate.querySelector("#slide-picture-parent");
        clone.querySelector("#slide-picture").src = element.slidepicture;
        clone.querySelector("#slide-description").textContent = element.slideDescription;
        if(i == 0) {
            clone.querySelector(".carousel-item").classList.add("active");
        }
        slidePictureParent.appendChild(clone);  
    });
}
    
