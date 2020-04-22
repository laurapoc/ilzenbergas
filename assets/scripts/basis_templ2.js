//loadBasisTempl2(subTemplateData);

import { waitForElement } from "./functions.js";

export function loadBasisTempl2(sidebarData, pageName) {
  // CLONEBASIS_TEMPL2 TEMPLATE:
  waitForElement("#basis_templ2_template").then(() => {
    let basisTemplate2 = document.getElementById("basis_templ2_template");
    let basisTemplate2Parent = document.getElementById("subtemplate");
    console.log("data, template, parent:", sidebarData, basisTemplate2, basisTemplate2Parent);
    // basisTemplate2Parent.textContent = "";
    let cloneTemplate2 = basisTemplate2.content.cloneNode(true);
    let mainTemplate2eading = cloneTemplate2.querySelector(".main-heading");
    mainTemplate2eading.innerHTML = sidebarData.mainHeading;
    let template2ContentHeading = cloneTemplate2.querySelector(".page-content-heading");
    template2ContentHeading.innerHTML = sidebarData.pageContentHeading;
    let template2Subheading = cloneTemplate2.querySelector(".subheading");
    template2Subheading.innerHTML = sidebarData.subheading;

    let lineImageCards = cloneTemplate2.getElementById("open-seasons");
    let paragraphParent = cloneTemplate2.getElementById("template2-content");

    sidebarData.paragraphArray.forEach((element) => {
      let paragraph = document.createElement("p");
      paragraph.innerHTML = element.paragraph;
      paragraphParent.insertBefore(paragraph, lineImageCards);
    });

    if (sidebarData.lineCardArray) {
      loadOrnamentedCards(sidebarData, cloneTemplate2);
    }
    if (sidebarData.largeLineCardArray) {
      loadLargeOrnamentedCards(sidebarData, cloneTemplate2, pageName);
    }

    loadHeadedParagraphs(sidebarData, cloneTemplate2);

    basisTemplate2Parent.appendChild(cloneTemplate2);
  });

  //   let heightsArray = [];
  //   document.querySelectorAll(".flip-card-front").forEach(cardFront => {
  //     // console.log("front", cardFront, cardFront.offsetHeight);
  //     heightsArray.push(cardFront.offsetHeight);
  //   });

  //   document.querySelectorAll(".flip-card-back").forEach(cardFront => {
  //     console.log("back", cardFront, cardFront.offsetHeight);
  //   });
  // console.log(heightsArray);
}

function loadHeadedParagraphs(sidebarData, cloneTemplate2) {
  sidebarData.headedParagraphArray.forEach((headedP) => {
    let clone = cloneTemplate2.getElementById("headed-paragraph-template").content.cloneNode(true);
    let paragraphParent = cloneTemplate2.getElementById("headed-paragraph-block");
    clone.querySelector(".paragraph-heading").innerHTML = headedP.paragrapHeading;
    clone.querySelector(".paragraph-to-extend-content").innerHTML = headedP.paragraphToExtendContent;
    paragraphParent.appendChild(clone);
  });
}

function loadOrnamentedCards(sidebarData, cloneTemplate2) {
  sidebarData.lineCardArray.forEach((element) => {
    let clone = cloneTemplate2.getElementById("ornamented-card").content.cloneNode(true);
    let parent = cloneTemplate2.getElementById("open-seasons");
    clone.querySelector(".card-top-image").src = element.topLineImage;
    clone.querySelector(".card-heading").textContent = element.cardHeading;
    let cardStrongParParent = clone.querySelector(".season-card-content");
    clone.querySelector(".card-paragraph-content").innerHTML = element.paragraph;


    clone.querySelector(".card-bottom-line").src = element.bottomLineImage;

    parent.appendChild(clone);
  });
}

function loadLargeOrnamentedCards(sidebarData, cloneTemplate2, pageName) {
  sidebarData.largeLineCardArray.forEach((element) => {
    let clone = cloneTemplate2.getElementById("large-ornamented-card").content.cloneNode(true);
    let parent = cloneTemplate2.getElementById("large-card");
    // if (pageName.includes("water")) {
    //   // clone.querySelector(".flip-card").style = "width: 30%";
    //   console.log(clone.querySelector(".flip-card"));
    // }
    clone.querySelector(".card-top-image").src = element.largeTopLineImage;
    clone.querySelector(".card-heading").textContent = element.largeCardHeading;
    let cardStrongParParent = clone.querySelector(".season-card-content");
    if (pageName.includes("tasting")) {
      parent.style = "font-size: 1rem";
      cardStrongParParent.style = "min-height: 290px";
      clone.querySelector(".flip-card").style = "min-height: 350px";
    }
    let insertBefore = clone.querySelector(".card-paragraph");
    element.largeStrongParagraphArray.forEach((paragraph) => {
      let parEl = document.createElement("p");
      parEl.innerHTML = paragraph.largeStrongParagraph;
      if (pageName.includes("tasting")) {
        parEl.classList.add("text-justify");
        parEl.classList.add("px-2");
      }
      // parEl.classList.add("text-center");
      parEl.classList.add("mb-0");
      cardStrongParParent.insertBefore(parEl, insertBefore);
    });
    clone.querySelector(".card-paragraph").innerHTML = element.largeCardParagraph;
    clone.querySelector(".bottom-strong-paragraph").innerHTML = element.largeBottomStrongParagraph;
    clone.querySelector(".bottom-strong-paragraph").classList.add("font-weight-bold");
    clone.querySelector(".card-bottom-line").src = element.largeBottomLineImage;

    // back card content:
    clone.getElementById("back-heading").textContent = element.backCardHeading;
    let backCardStrongParParent = clone.querySelector(".flip-card-back");
    let insertParBefore = clone.getElementById("back-large-paragraph");

    element.backCardParagraphArray.forEach((paragraph) => {
      let backParEl = document.createElement("p");
      backParEl.innerHTML = paragraph.backStrongParagraph;
      if (pageName.includes("tasting")) {
        backParEl.classList.add("text-justify");
        backParEl.classList.add("px-2");
      }

      backParEl.classList.add("mb-0");

      backCardStrongParParent.insertBefore(backParEl, insertParBefore);
    });
    clone.getElementById("back-large-paragraph").innerHTML = element.backCardParagraph;
    clone.getElementById("experiment-link").href = element.videoLinkHref;
    clone.getElementById("link-to-experiment").innerHTML = element.linkToVideo;

    clone.getElementById("back-bottom-strong-info").textContent = element.backBottomStrongParagraph;
    clone.getElementById("back-bottom-strong-info").classList.add("font-weight-bold");

    let flipCardDiv = clone.querySelector(".flip-card");
    flipCardDiv.id = element.id;
    flipCardDiv.addEventListener("click", (event) => {
      flipCard(element.id);
    });
    parent.appendChild(clone);
    //heights are known here
    // console.log("clone", clone.offsetHeight);
  });
}

// CARD FLIP TOGGLE:
function flipCard(id) {
  let element = document.getElementById(id).querySelector(".flip-card-inner");
  element.classList.toggle("active-flip");
}
