loadBasisTempl2(subTemplateData);

// IMPORTING GALLERY
gallerySource = subTemplateData.photoGallery;
importTemplate("./gallery.html", "#gallery", "./assets/scripts/gallery.js");

function loadBasisTempl2(sidebarData) {
  // CLONEBASIS_TEMPL2 TEMPLATE:
  let basisTemplate2 = document.getElementById("basis_templ2_template");
  let basisTemplate2Parent = document.getElementById("basis_templ2");
  basisTemplate2Parent.textContent = "";
  let cloneTemplate2 = basisTemplate2.content.cloneNode(true);
  let mainTemplate2eading = cloneTemplate2.querySelector(".main-heading");
  mainTemplate2eading.textContent = sidebarData.mainHeading;
  let template2ContentHeading = cloneTemplate2.querySelector(".page-content-heading");
  template2ContentHeading.textContent = sidebarData.pageContentHeading;
  let template2Subheading = cloneTemplate2.querySelector(".subheading");
  template2Subheading.textContent = sidebarData.subheading;

  let lineImageCards = cloneTemplate2.getElementById("open-seasons");
  let paragraphParent = cloneTemplate2.getElementById("template2-content");

  sidebarData.paragraphArray.forEach(element => {
    let paragraph = document.createElement("p");
    paragraph.textContent = element.paragraph;
    paragraphParent.insertBefore(paragraph, lineImageCards);
  });

  if (sidebarData.lineCardArray) {
    loadOrnamentedCards(sidebarData, cloneTemplate2);
  };
  if (sidebarData.largeLineCardArray) {
    loadLargeOrnamentedCards(sidebarData, cloneTemplate2);
  };

  loadHeadedParagraphs(sidebarData, cloneTemplate2);


  basisTemplate2Parent.appendChild(cloneTemplate2);
}


function loadHeadedParagraphs(sidebarData, cloneTemplate2) {
    sidebarData.headedParagraphArray.forEach(headedP => {
        let clone = cloneTemplate2.getElementById("headed-paragraph-template").content.cloneNode(true);
        let paragraphParent = cloneTemplate2.getElementById("headed-paragraph-block");
        clone.querySelector(".paragraph-heading").textContent = headedP.paragrapHeading;
        clone.querySelector(".paragraph-to-extend-content").textContent = headedP.paragraphToExtendContent;
        paragraphParent.appendChild(clone);
    });
}

function loadOrnamentedCards(sidebarData, cloneTemplate2) {
    sidebarData.lineCardArray.forEach(element => {
        let clone = cloneTemplate2.getElementById("ornamented-card").content.cloneNode(true);
        let parent = cloneTemplate2.getElementById("open-seasons");
        clone.querySelector(".card-top-image").src = element.topLineImage;
        clone.querySelector(".card-heading").textContent = element.cardHeading;
        let cardStrongParParent = clone.querySelector(".season-card-content");
        let insertBefore = clone.querySelector(".card-paragraph");
        element.strongParagraphArray.forEach(paragraph => {
            let parEl = document.createElement("p");
            parEl.textContent = paragraph.strongParagraph;
            parEl.classList.add("text-center");
            parEl.classList.add("mb-0");
            parEl.classList.add("font-weight-bold");
            cardStrongParParent.insertBefore(parEl, insertBefore);
        });
        clone.querySelector(".card-paragraph").textContent = element.cardParagraph;
        clone.querySelector(".bottom-strong-paragraph").textContent = element.bottomStrongParagraph;
        clone.querySelector(".bottom-strong-paragraph").classList.add("font-weight-bold");
        clone.querySelector(".card-bottom-line").src = element.bottomLineImage;
        console.log(clone.querySelector(".card-bottom-line").src);
        parent.appendChild(clone);
    });
}

function loadLargeOrnamentedCards(sidebarData, cloneTemplate2) {
  sidebarData.largeLineCardArray.forEach(element => {
      let clone = cloneTemplate2.getElementById("large-ornamented-card").content.cloneNode(true);
      let parent = cloneTemplate2.getElementById("large-card");
      clone.querySelector(".card-top-image").src = element.largeTopLineImage;
      clone.querySelector(".card-heading").textContent = element.largeCardHeading;
      let cardStrongParParent = clone.querySelector(".season-card-content");
      let insertBefore = clone.querySelector(".card-paragraph");
      element.largeStrongParagraphArray.forEach(paragraph => {
          let parEl = document.createElement("p");
          parEl.textContent = paragraph.largeStrongParagraph;
          parEl.classList.add("text-center");
          parEl.classList.add("mb-0");
          parEl.classList.add("font-weight-bold");
          cardStrongParParent.insertBefore(parEl, insertBefore);
      });
      clone.querySelector(".card-paragraph").textContent = element.largeCardParagraph;
      clone.querySelector(".bottom-strong-paragraph").textContent = element.largeBottomStrongParagraph;
      clone.querySelector(".bottom-strong-paragraph").classList.add("font-weight-bold");
      clone.querySelector(".card-bottom-line").src = element.largeBottomLineImage;
      console.log(clone.querySelector(".card-bottom-line").src);
      parent.appendChild(clone);
  });
}

// CARD FLIP TOGGLE:
function myFunction() {
  let element = document.querySelector(".flip-card-inner");
  element.classList.toggle("active-flip");
}