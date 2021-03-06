/*jshint esversion: 6 */
import { waitForElement } from "./functions.js";

export function loadBasisTempl2(sidebarData, pageName) {
  // CLONEBASIS_TEMPL2 TEMPLATE:
  waitForElement("#basis_templ2_template").then(() => {
    let basisTemplate2 = document.getElementById("basis_templ2_template");
    let basisTemplate2Parent = document.getElementById("subtemplate");
    let cloneTemplate2 = basisTemplate2.content.cloneNode(true);
    let mainTemplate2eading = cloneTemplate2.querySelector(".main-heading");
    mainTemplate2eading.innerHTML = sidebarData.mainHeading;
    let template2ContentHeading = cloneTemplate2.querySelector(".page-content-heading");
    template2ContentHeading.innerHTML = sidebarData.pageContentHeading;
    let template2Subheading = cloneTemplate2.querySelector(".subheading");
    template2Subheading.innerHTML = sidebarData.subheading;

    let lineImageCards = cloneTemplate2.getElementById("open-seasons");
    let paragraphParent = cloneTemplate2.getElementById("template2-content");

    sidebarData.t2_paragraphArray.forEach((element) => {
      let paragraph = document.createElement("p");
      paragraph.innerHTML = element.t2_paragraph;
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


}

function loadHeadedParagraphs(sidebarData, cloneTemplate2) {
  if (sidebarData.headedParagraphArray) {
    sidebarData.headedParagraphArray.forEach((headedP) => {
      let clone = cloneTemplate2.getElementById("headed-paragraph-template").content.cloneNode(true);
      let paragraphParent = cloneTemplate2.getElementById("headed-paragraph-block");
      clone.querySelector(".paragraph-heading").innerHTML = headedP.paragrapHeading;
      clone.querySelector(".paragraph-to-extend-content").innerHTML = headedP.paragraphToExtendContent;
      paragraphParent.appendChild(clone);
    });
  }
}

function loadOrnamentedCards(sidebarData, cloneTemplate2) {
  sidebarData.lineCardArray.forEach((element) => {
    let clone = cloneTemplate2.getElementById("ornamented-card").content.cloneNode(true);
    let parent = cloneTemplate2.getElementById("open-seasons");
    clone.querySelector(".card-top-image").src = element.topLineImage;
    clone.querySelector(".card-heading").textContent = element.cardHeading;
    let cardStrongParParent = clone.querySelector(".season-card-content");
    clone.querySelector(".card-paragraph-content").innerHTML = element.cardParagraph;
    clone.querySelector(".card-bottom-line").src = element.bottomLineImage;
    parent.appendChild(clone);
  });
}

function loadLargeOrnamentedCards(sidebarData, cloneTemplate2, pageName) {
  sidebarData.largeLineCardArray.forEach((element) => {
    let clone = cloneTemplate2.getElementById("large-ornamented-card").content.cloneNode(true);
    let parent = cloneTemplate2.getElementById("large-card");
    if (pageName == "water") {
      clone.querySelector(".flip-card").style = "width: 30%";
    }
    clone.querySelector(".card-top-image").src = element.largeTopLineImage;
    clone.querySelector(".card-heading").textContent = element.largeCardHeading;
    clone.querySelector(".repeated-strong-paragraph").innerHTML = element.largeStrongParagraph;
    let cardStrongParParent = clone.querySelector(".season-card-content");
    if (pageName == "tastings") {
      parent.style = "font-size: 1rem";
      cardStrongParParent.style = "min-height: 280px";
      clone.querySelector(".flip-card").style = "min-height: 350px";
    }
    clone.querySelector(".bottom-strong-paragraph").innerHTML = element.largeBottomStrongParagraph;
    clone.querySelector(".bottom-strong-paragraph").classList.add("font-weight-bold");
    clone.querySelector(".card-bottom-line").src = element.largeBottomLineImage;

    // back card content:
    clone.getElementById("back-heading").textContent = element.backCardHeading;
    clone.getElementById("back-strong-info").innerHTML = element.backStrongParagraph;
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
